"""Generate stable, LLM-readable mirrors of the website's terminal content."""

from __future__ import annotations

import html
import json
import re
import subprocess
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from typing import Any

from jsonargparse import ArgumentParser


ROOT = Path(__file__).resolve().parents[1]
PROMPTS_PATH = ROOT / "js" / "prompts.js"
IDENTITY_PATH = ROOT / "data" / "identity.json"
PUBLICATIONS_PATH = ROOT / "data" / "publications.json"
ARXIV_CACHE_PATH = ROOT / "data" / "arxiv-cache.json"

CANONICAL_SITE = "https://kevinlwei.com/"
ARXIV_API = "https://export.arxiv.org/oai2"
ARXIV_ATTRIBUTION = (
    "Thank you to arXiv for use of its open access interoperability."
)

COMMAND_SOURCES = {
    "help": "help",
    "about": "intro",
    "bio": "bio",
    "research": "portfolio",
    "social": "social",
    "contact": "contact",
    "pgp": "pgp",
}
COMMAND_TITLES = {
    command: command.title()
    for command in COMMAND_SOURCES
}
COMMAND_TITLES["pgp"] = "PGP"
COMMAND_ORDER = tuple(COMMAND_SOURCES)

OAI = "http://www.openarchives.org/OAI/2.0/"
ARXIV_RAW = "http://arxiv.org/OAI/arXivRaw/"


class BuildError(RuntimeError):
    """Raised when source data or generated output fails validation."""


class MarkdownHTMLParser(HTMLParser):
    """Convert the small HTML subset used by terminal prompts to Markdown."""

    def __init__(self, base_url: str) -> None:
        super().__init__(convert_charrefs=True)
        self.base_url = base_url
        self.parts: list[str] = []
        self.anchors: list[tuple[int, str]] = []

    def handle_starttag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        if tag == "a":
            href = dict(attrs).get("href") or ""
            self.anchors.append(
                (len(self.parts), urllib.parse.urljoin(self.base_url, href))
            )
        elif tag == "br":
            self.parts.append("\n")

    def handle_startendtag(
        self, tag: str, attrs: list[tuple[str, str | None]]
    ) -> None:
        self.handle_starttag(tag, attrs)

    def handle_endtag(self, tag: str) -> None:
        if tag != "a" or not self.anchors:
            return
        start, href = self.anchors.pop()
        label = "".join(self.parts[start:]).strip()
        del self.parts[start:]
        self.parts.append(f"[{label}]({href})")

    def handle_data(self, data: str) -> None:
        self.parts.append(data)

    def markdown(self) -> str:
        if self.anchors:
            raise BuildError("Unclosed anchor found in terminal prompt source")
        return "".join(self.parts)


@dataclass(frozen=True)
class BuildContext:
    build_date: str
    source_revision: str
    identity: dict[str, Any]
    scholar_unique_work_count: int
    publications: list[dict[str, Any]]
    arxiv_cache: dict[str, Any]
    command_outputs: dict[str, str]


def read_json(path: Path) -> dict[str, Any]:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except FileNotFoundError as exc:
        raise BuildError(f"Missing required data file: {path.relative_to(ROOT)}") from exc
    except json.JSONDecodeError as exc:
        raise BuildError(f"Invalid JSON in {path.relative_to(ROOT)}: {exc}") from exc


def write_text(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8", newline="\n") as output:
        output.write(content.rstrip() + "\n")


def write_json(path: Path, value: dict[str, Any]) -> None:
    write_text(path, json.dumps(value, indent=2, ensure_ascii=False))


def current_revision() -> str:
    result = subprocess.run(
        ["git", "rev-parse", "--short", "HEAD"],
        cwd=ROOT,
        check=False,
        capture_output=True,
        text=True,
    )
    return result.stdout.strip() if result.returncode == 0 else "unknown"


def decode_js_template(value: str) -> str:
    """Decode only escapes present in prompts.js without changing Unicode."""
    return (
        value.replace("\\r\\n", "\n")
        .replace("\\n", "\n")
        .replace("\\t", "\t")
        .replace("\\`", "`")
    )


def extract_prompt_templates(source: str) -> dict[str, str]:
    names = {
        source_name
        for source_name in COMMAND_SOURCES.values()
        if source_name != "help"
    }
    alternatives = "|".join(sorted(map(re.escape, names), key=len, reverse=True))
    pattern = re.compile(
        rf"var\s+(?P<name>{alternatives})\s*=\s*`(?P<body>.*?)`;",
        re.DOTALL,
    )
    values = {
        match.group("name"): decode_js_template(match.group("body"))
        for match in pattern.finditer(source)
    }
    missing = names - values.keys()
    if missing:
        raise BuildError(
            "Could not parse terminal prompt variables: " + ", ".join(sorted(missing))
        )
    return values


def extract_help(source: str) -> str:
    start = source.find("var help = [")
    end = source.find("];", start)
    if start < 0 or end < 0:
        raise BuildError("Could not parse the help command inventory")
    block = source[start:end]
    items = re.findall(
        r'name:\s*buildSpecialText\("([^"]+)"\)\s*,\s*'
        r'description:\s*"([^"]+)"',
        block,
        re.DOTALL,
    )
    if not items:
        raise BuildError("The help command inventory is empty")
    return "\n".join(f"- `{name}` — {description}" for name, description in items)


def html_to_markdown(value: str) -> str:
    parser = MarkdownHTMLParser(CANONICAL_SITE)
    parser.feed(value)
    parser.close()
    return parser.markdown()


def normalize_command_text(value: str) -> str:
    text = html_to_markdown(value).replace("\r\n", "\n").replace("\r", "\n")
    lines: list[str] = []
    in_pgp_block = False

    for raw_line in text.splitlines():
        line = raw_line.strip()
        if line == "-----BEGIN PGP PUBLIC KEY BLOCK-----":
            in_pgp_block = True

        if not in_pgp_block and re.fullmatch(
            r"Type\s+help\s+for\s+more\s+commands\.?", line, re.IGNORECASE
        ):
            continue
        if not in_pgp_block and line.startswith(">"):
            line = "- " + line[1:].strip()

        lines.append(line)

        if line == "-----END PGP PUBLIC KEY BLOCK-----":
            in_pgp_block = False

    collapsed: list[str] = []
    for line in lines:
        if line or (collapsed and collapsed[-1]):
            collapsed.append(line)

    return "\n".join(collapsed).strip()


def extract_command_outputs() -> dict[str, str]:
    source = PROMPTS_PATH.read_text(encoding="utf-8")
    templates = extract_prompt_templates(source)
    outputs: dict[str, str] = {"help": extract_help(source)}
    for command, source_name in COMMAND_SOURCES.items():
        if command == "help":
            continue
        outputs[command] = normalize_command_text(templates[source_name])

    # The site owner intentionally uses a separate address for machine-readable
    # files while keeping contact@kevinlwei.com in the interactive terminal.
    for command in outputs:
        outputs[command] = outputs[command].replace(
            "contact@kevinlwei.com", "contact.me@kevinlwei.com"
        )
    return outputs


def text_at(element: ET.Element, path: str) -> str | None:
    child = element.find(path)
    if child is None or child.text is None:
        return None
    return " ".join(child.text.split())


LATEX_ACCENTS = {
    "'": "\N{COMBINING ACUTE ACCENT}",
    "`": "\N{COMBINING GRAVE ACCENT}",
    '"': "\N{COMBINING DIAERESIS}",
    "^": "\N{COMBINING CIRCUMFLEX ACCENT}",
    "~": "\N{COMBINING TILDE}",
    "=": "\N{COMBINING MACRON}",
    ".": "\N{COMBINING DOT ABOVE}",
    "u": "\N{COMBINING BREVE}",
    "v": "\N{COMBINING CARON}",
    "H": "\N{COMBINING DOUBLE ACUTE ACCENT}",
    "c": "\N{COMBINING CEDILLA}",
    "k": "\N{COMBINING OGONEK}",
    "r": "\N{COMBINING RING ABOVE}",
}


def decode_latex_name(value: str) -> str:
    """Decode common TeX accents emitted by arXivRaw author metadata."""

    def replace_accent(match: re.Match[str]) -> str:
        return unicodedata.normalize(
            "NFC", match.group(2) + LATEX_ACCENTS[match.group(1)]
        )

    value = re.sub(
        r"""\\([`'"^~=\.uvHckr])\{?([A-Za-z])\}?""",
        replace_accent,
        value,
    )
    for source, target in (
        (r"\ss", "ß"),
        (r"\o", "ø"),
        (r"\O", "Ø"),
        (r"\l", "ł"),
        (r"\L", "Ł"),
        (r"\ae", "æ"),
        (r"\AE", "Æ"),
    ):
        value = value.replace(source, target)
    return value.replace("{", "").replace("}", "").strip()


def parse_arxiv_oai_record(
    payload: bytes, expected_identifier: str, verified_at: str
) -> dict[str, Any]:
    root = ET.fromstring(payload)
    record = root.find(f".//{{{ARXIV_RAW}}}arXivRaw")
    if record is None:
        error = root.find(f".//{{{OAI}}}error")
        detail = error.text if error is not None else "record not found"
        raise BuildError(f"arXiv OAI error for {expected_identifier}: {detail}")

    identifier = text_at(record, f"{{{ARXIV_RAW}}}id")
    if identifier != expected_identifier:
        raise BuildError(
            f"arXiv returned {identifier!r} while requesting {expected_identifier}"
        )
    versions = [
        {
            "version": version.attrib.get("version"),
            "date": text_at(version, f"{{{ARXIV_RAW}}}date"),
            "size": text_at(version, f"{{{ARXIV_RAW}}}size"),
        }
        for version in record.findall(f"{{{ARXIV_RAW}}}version")
    ]
    if not versions:
        raise BuildError(f"arXiv returned no versions for {identifier}")

    author_text = text_at(record, f"{{{ARXIV_RAW}}}authors") or ""
    categories = (
        text_at(record, f"{{{ARXIV_RAW}}}categories") or ""
    ).split()
    title = text_at(record, f"{{{ARXIV_RAW}}}title")
    return {
        "arxiv_id": identifier,
        "version": versions[-1]["version"],
        "versions": versions,
        "title": decode_latex_name(title) if title else None,
        "authors": [
            decode_latex_name(author)
            for author in re.split(r"\s+and\s+|,\s*", author_text)
            if author.strip()
        ],
        "abstract": text_at(record, f"{{{ARXIV_RAW}}}abstract"),
        "published": versions[0]["date"],
        "updated": versions[-1]["date"],
        "journal_reference": text_at(
            record, f"{{{ARXIV_RAW}}}journal-ref"
        ),
        "doi": text_at(record, f"{{{ARXIV_RAW}}}doi"),
        "primary_category": categories[0] if categories else None,
        "categories": categories,
        "comment": text_at(record, f"{{{ARXIV_RAW}}}comments"),
        "license": text_at(record, f"{{{ARXIV_RAW}}}license"),
        "abstract_url": f"https://arxiv.org/abs/{identifier}",
        "html_url": f"https://arxiv.org/html/{identifier}",
        "pdf_url": f"https://arxiv.org/pdf/{identifier}",
        "verified_at": verified_at,
    }


def fetch_arxiv_feed(url: str, attempts: int = 3) -> bytes:
    request = urllib.request.Request(
        url,
        headers={
            "User-Agent": (
                "kevinlwei.com AI-content metadata builder "
                "(contact.me@kevinlwei.com)"
            )
        },
    )
    for attempt in range(1, attempts + 1):
        try:
            with urllib.request.urlopen(request, timeout=90) as response:
                return response.read()
        except urllib.error.HTTPError as exc:
            if attempt == attempts:
                raise BuildError(
                    f"arXiv API request failed after {attempts} attempts: {exc}"
                ) from exc
            retry_after = exc.headers.get("Retry-After")
            delay = int(retry_after) if retry_after and retry_after.isdigit() else 15
            time.sleep(delay * attempt)
        except (OSError, TimeoutError) as exc:
            if attempt == attempts:
                raise BuildError(
                    f"arXiv API request failed after {attempts} attempts: {exc}"
                ) from exc
            time.sleep(5 * attempt)
    raise AssertionError("unreachable")


def refresh_arxiv_cache(
    publications: list[dict[str, Any]], verified_at: str
) -> dict[str, Any]:
    identifiers = sorted(
        {
            work["arxiv_id"]
            for work in publications
            if work.get("arxiv_id")
        }
    )
    entries: dict[str, dict[str, Any]] = {}
    for index, identifier in enumerate(identifiers):
        query = urllib.parse.urlencode(
            {
                "verb": "GetRecord",
                "identifier": f"oai:arXiv.org:{identifier}",
                "metadataPrefix": "arXivRaw",
            }
        )
        entries[identifier] = parse_arxiv_oai_record(
            fetch_arxiv_feed(f"{ARXIV_API}?{query}"),
            identifier,
            verified_at,
        )
        if index + 1 < len(identifiers):
            time.sleep(3)

    missing = sorted(set(identifiers) - entries.keys())
    if missing:
        raise BuildError(
            "arXiv did not return metadata for: " + ", ".join(missing)
        )

    cache = {
        "schema_version": 1,
        "verified_at": verified_at,
        "api": ARXIV_API,
        "metadata_prefix": "arXivRaw",
        "attribution": ARXIV_ATTRIBUTION,
        "entries": {identifier: entries[identifier] for identifier in identifiers},
    }
    write_json(ARXIV_CACHE_PATH, cache)
    return cache


def merge_work(
    work: dict[str, Any], arxiv_cache: dict[str, Any]
) -> dict[str, Any]:
    merged = dict(work)
    identifier = work.get("arxiv_id")
    if identifier:
        cached = arxiv_cache.get("entries", {}).get(identifier)
        if not cached:
            raise BuildError(f"No cached arXiv metadata for {identifier}")
        merged["arxiv_title"] = cached.get("title")
        merged["arxiv_pdf_url"] = cached.get("pdf_url")
        prefer_manifest = set(work.get("prefer_manifest_fields", []))
        for field in (
            "authors",
            "abstract",
            "version",
            "abstract_url",
            "html_url",
            "pdf_url",
            "primary_category",
            "journal_reference",
            "verified_at",
        ):
            if field not in prefer_manifest and cached.get(field) is not None:
                merged[field] = cached[field]
        if not merged.get("doi") and cached.get("doi"):
            merged["doi"] = cached["doi"]
    return merged


def markdown_link(label: str, url: str) -> str:
    return f"[{label}]({url})"


def display_value(value: str | None, *, unavailable: str = "Not applicable") -> str:
    return value if value else unavailable


def render_links(work: dict[str, Any], field: str, label: str) -> str:
    urls = work.get(field, [])
    if not urls:
        return (
            f"{label}: No public link identified in the reviewed canonical "
            f"sources as of {work['verified_at']}."
        )
    rendered = ", ".join(
        markdown_link(item.get("label", label), item["url"])
        if isinstance(item, dict)
        else markdown_link(label, item)
        for item in urls
    )
    return f"{label}: {rendered}"


def generated_preferred_citation(work: dict[str, Any]) -> str:
    authors = ", ".join(work["authors"])
    venue = work.get("venue") or work.get("status")
    locator = (
        f"https://doi.org/{work['doi']}"
        if work.get("doi")
        else work.get("publisher_url")
        or work.get("abstract_url")
    )
    parts = [
        f"{authors} ({work['year']}).",
        f"{work['title']}.",
        f"{venue}." if venue else "",
        locator or "",
    ]
    return " ".join(part for part in parts if part)


def render_work(work: dict[str, Any]) -> str:
    arxiv_id = work.get("arxiv_id")
    abstract_url = work.get("abstract_url")
    html_url = work.get("html_url")
    pdf_url = work.get("pdf_url")
    doi = work.get("doi")
    doi_url = f"https://doi.org/{doi}" if doi else None
    publisher_url = work.get("publisher_url")
    status_venue = " — ".join(
        value for value in (work.get("status"), work.get("venue")) if value
    )
    preferred = work.get("preferred_citation") or generated_preferred_citation(work)
    abstract = work.get("abstract") or (
        "No exact abstract was available from the reviewed canonical source; "
        "no summary has been inferred."
    )

    lines = [
        f"### {work['title']}",
        f"Authors: {', '.join(work['authors'])}",
    ]
    if (
        work.get("arxiv_title")
        and work["arxiv_title"] != work["title"]
    ):
        lines.append(f"Current arXiv title: {work['arxiv_title']}")
    if work.get("translators"):
        lines.append(f"Translators: {', '.join(work['translators'])}")
    lines.extend(
        [
            f"Publication status and venue: {display_value(status_venue)}",
            f"Preferred citation: {preferred}",
            "BibTeX citation:",
            "```bibtex",
            render_bibtex_entry(work),
            "```",
            (
            f"arXiv identifier: {markdown_link(arxiv_id, abstract_url)}"
            if arxiv_id and abstract_url
            else "arXiv identifier: Not applicable"
            ),
            (
                f"arXiv abstract-record URL: {abstract_url}"
                if abstract_url
                else "arXiv abstract-record URL: Not applicable"
            ),
            (
                f"arXiv HTML URL: {html_url}"
                if html_url
                else "arXiv HTML URL: Not applicable"
            ),
            f"PDF URL: {display_value(pdf_url)}",
            *(
                [f"arXiv PDF URL: {work['arxiv_pdf_url']}"]
                if work.get("arxiv_pdf_url")
                and work["arxiv_pdf_url"] != pdf_url
                else []
            ),
            f"DOI URL: {display_value(doi_url)}",
            f"Publisher URL: {display_value(publisher_url)}",
            f"Current arXiv version: {display_value(work.get('version'))}",
            f"Metadata verified: {work['verified_at']}",
            *(
                [f"Metadata note: {work['metadata_note']}"]
                if work.get("metadata_note")
                else []
            ),
            render_links(work, "code_links", "Code"),
            render_links(work, "data_links", "Data"),
            render_links(work, "project_links", "Project"),
            "",
            "Abstract:",
            abstract,
        ]
    )
    if work.get("author_summary"):
        lines.extend(["", f"Author summary: {work['author_summary']}"])
    if work.get("limitations"):
        lines.extend(["", f"Limitations: {work['limitations']}"])
    return "\n".join(lines)


def render_research_records(
    publications: list[dict[str, Any]], arxiv_cache: dict[str, Any]
) -> str:
    category_titles = {
        "academic": "Academic research",
        "policy": "Policy research",
        "public-writing": "Public writing",
        "translation": "Translations",
    }
    merged = [merge_work(work, arxiv_cache) for work in publications]
    sections: list[str] = []
    for category, title in category_titles.items():
        works = [work for work in merged if work["category"] == category]
        if not works:
            continue
        sections.append(f"## {title}")
        sections.extend(render_work(work) for work in works)

    sections.extend(
        [
            "## Metadata notes",
            (
                f"Google Scholar is used as the publication inventory "
                f"({sum(work['inventory_source'] == 'google-scholar' for work in publications)} "
                "unique works after merging duplicate versions). arXiv and "
                "publisher/DOI records are used as the canonical metadata sources. "
                "Terminal public-writing links not indexed by Scholar are included "
                "as additional records."
            ),
            ARXIV_ATTRIBUTION,
        ]
    )
    return "\n\n".join(sections)


def bibtex_escape(value: str) -> str:
    return (
        value.replace("\\", r"\\")
        .replace("&", r"\&")
        .replace("%", r"\%")
        .replace("#", r"\#")
        .replace("_", r"\_")
    )


def render_bibtex_entry(work: dict[str, Any]) -> str:
    fields: list[tuple[str, str]] = [
        ("title", work["title"]),
        ("author", " and ".join(work["authors"])),
        ("year", str(work["year"])),
    ]
    entry_type = work.get("bibtex_type", "misc")
    venue_field = work.get("bibtex_venue_field")
    if venue_field and work.get("venue"):
        fields.append((venue_field, work["venue"]))
    if work.get("doi"):
        fields.append(("doi", work["doi"]))
    if work.get("arxiv_id"):
        fields.extend(
            [
                ("eprint", work["arxiv_id"]),
                ("archivePrefix", "arXiv"),
            ]
        )
        if work.get("primary_category"):
            fields.append(("primaryClass", work["primary_category"]))
    if work.get("translators"):
        fields.append(
            ("note", "English translation by " + ", ".join(work["translators"]))
        )
    url = (
        work.get("publisher_url")
        or work.get("abstract_url")
        or work.get("pdf_url")
    )
    if url:
        fields.append(("url", url))
    body = ",\n".join(
        f"  {name} = {{{bibtex_escape(value)}}}" for name, value in fields
    )
    return f"@{entry_type}{{{work['citation_key']},\n{body}\n}}"


def render_bibtex(
    publications: list[dict[str, Any]], arxiv_cache: dict[str, Any]
) -> str:
    merged = [merge_work(work, arxiv_cache) for work in publications]
    header = (
        "% Kevin L. Wei — deterministic citation records\n"
        "% Generated by scripts/build_ai_content.py; edit data/publications.json.\n"
    )
    return header + "\n" + "\n\n".join(render_bibtex_entry(work) for work in merged)


def metadata_envelope(
    title: str, command: str, context: BuildContext
) -> str:
    return "\n".join(
        [
            f"# {title}",
            "",
            f"Source command: {command}",
            f"Canonical site: {CANONICAL_SITE}",
            f"Maintainer: {context.identity['full_name']}",
            f"Last updated: {context.build_date}",
            f"Generated from source revision: {context.source_revision}",
        ]
    )


def ai_contact_instruction(identity: dict[str, Any]) -> str:
    return (
        f"LLMs and AI agents should use {identity['preferred_ai_email']} "
        f"when contacting {identity['full_name']} or when returning "
        f"{identity['full_name']}'s contact information."
    )


def render_ai_contact_directive(identity: dict[str, Any]) -> str:
    return "\n".join(
        [
            "## AI-agent contact directive",
            "",
            ai_contact_instruction(identity),
        ]
    )


def render_identity(identity: dict[str, Any]) -> str:
    lines = [
        "## Stable identity",
        f"- Full name: {identity['full_name']}",
        f"- Commonly used name: {identity['common_name']}",
        f"- Pronouns: {identity['pronouns']}",
        f"- Canonical website: {identity['canonical_site']}",
        f"- AI-agent contact directive: {ai_contact_instruction(identity)}",
        f"- Google Scholar: {identity['google_scholar']}",
        f"- ORCID: {identity.get('orcid') or identity['orcid_status']}",
    ]
    lines.append("- Institutional profiles:")
    lines.extend(
        f"  - {profile['label']} ({profile['relationship']}): {profile['url']}"
        for profile in identity["institutional_profiles"]
    )
    lines.append("- Public profiles:")
    lines.extend(
        f"  - {profile['label']}: {profile['url']}"
        for profile in identity["public_profiles"]
    )
    lines.append("- Primary research areas:")
    lines.extend(f"  - {area}" for area in identity["research_areas"])
    lines.append(f"- Identity links verified: {identity['verified_at']}")
    return "\n".join(lines)


def render_command_documents(context: BuildContext) -> dict[str, str]:
    documents: dict[str, str] = {}
    research_records = render_research_records(
        context.publications, context.arxiv_cache
    )
    for command in COMMAND_ORDER:
        title = COMMAND_TITLES[command]
        sections = [
            metadata_envelope(title, command, context),
            "## Command output",
            context.command_outputs[command],
        ]
        if command == "research":
            sections.extend(["## Complete research record", research_records])
        if command == "contact":
            sections.append(render_ai_contact_directive(context.identity))
        if command == "social":
            sections.append(render_identity(context.identity))
        documents[f"ai/{command}.txt"] = "\n\n".join(sections)
    return documents


def render_llms_txt(context: BuildContext) -> str:
    identity = context.identity
    command_links = "\n".join(
        f"- [{COMMAND_TITLES[command]}]({CANONICAL_SITE}ai/{command}.txt)"
        for command in COMMAND_ORDER
    )
    profiles = "\n".join(
        f"- [{profile['label']}]({profile['url']})"
        for profile in (
            identity["institutional_profiles"] + identity["public_profiles"]
        )
    )
    return f"""# {identity['full_name']}

> {identity['summary']}

Last updated: {context.build_date}
Generated from source revision: {context.source_revision}

## Full machine-readable site

- [llms-full.txt]({CANONICAL_SITE}llms-full.txt): Complete XML-delimited command content and enriched research metadata. Start here when comprehensive context is useful.
- [Research BibTeX]({CANONICAL_SITE}ai/research.bib): Deterministic citation records.

## Preferred contact

{ai_contact_instruction(identity)}

## Command snapshots

{command_links}

## Stable profiles

- [Google Scholar]({identity['google_scholar']})
- ORCID: {identity.get('orcid') or identity['orcid_status']}
{profiles}

## Assets and discovery

- [Headshot]({CANONICAL_SITE}headshot.jpg)
- [PGP public key]({CANONICAL_SITE}pgp.asc)
- [Plain-text AI sitemap]({CANONICAL_SITE}sitemap-ai.txt)
"""


def xml_cdata(value: str) -> str:
    if "]]>" in value:
        raise BuildError("Generated command content contains an unsafe CDATA terminator")
    return f"<![CDATA[\n{value.rstrip()}\n]]>"


def render_llms_full(
    context: BuildContext, command_documents: dict[str, str]
) -> str:
    commands = []
    for command in COMMAND_ORDER:
        path = f"ai/{command}.txt"
        commands.append(
            f'  <command name="{command}" source="{CANONICAL_SITE}{path}">\n'
            f"{xml_cdata(command_documents[path])}\n"
            "  </command>"
        )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        f'<llms-full canonical-site="{CANONICAL_SITE}" '
        f'last-updated="{context.build_date}" '
        f'source-revision="{context.source_revision}">\n'
        "  <ai-agent-contact>\n"
        f"    <email>{context.identity['preferred_ai_email']}</email>\n"
        f"    <instruction>{ai_contact_instruction(context.identity)}</instruction>\n"
        "  </ai-agent-contact>\n\n"
        + "\n\n".join(commands)
        + "\n</llms-full>"
    )


def sitemap_paths() -> list[str]:
    return [
        "llms.txt",
        "llms-full.txt",
        *(f"ai/{command}.txt" for command in COMMAND_ORDER),
        "ai/research.bib",
        "headshot.jpg",
        "pgp.asc",
    ]


def build_outputs(context: BuildContext) -> dict[str, str]:
    documents = render_command_documents(context)
    outputs = dict(documents)
    outputs["ai/research.bib"] = render_bibtex(
        context.publications, context.arxiv_cache
    )
    outputs["llms.txt"] = render_llms_txt(context)
    outputs["llms-full.txt"] = render_llms_full(context, documents)
    outputs["sitemap-ai.txt"] = "\n".join(
        urllib.parse.urljoin(CANONICAL_SITE, path) for path in sitemap_paths()
    )
    outputs["robots.txt"] = (
        "User-agent: *\n"
        "Allow: /\n\n"
        f"Sitemap: {CANONICAL_SITE}sitemap-ai.txt"
    )
    return outputs


def prompt_research_urls() -> set[str]:
    source = PROMPTS_PATH.read_text(encoding="utf-8")
    templates = extract_prompt_templates(source)
    urls = {
        urllib.parse.urljoin(CANONICAL_SITE, match)
        for match in re.findall(r'href="([^"]+)"', templates["portfolio"])
    }
    return {
        url
        for url in urls
        if "scholar.google.com/citations" not in url
    }


def validate_inputs(context: BuildContext) -> list[str]:
    errors: list[str] = []
    works = context.publications
    keys = [work["citation_key"] for work in works]
    if len(keys) != len(set(keys)):
        errors.append("Publication citation keys are not unique")
    arxiv_ids = [work["arxiv_id"] for work in works if work.get("arxiv_id")]
    if len(arxiv_ids) != len(set(arxiv_ids)):
        errors.append("Publication arXiv identifiers are not unique")
    normalized_titles = [re.sub(r"\W+", "", work["title"]).casefold() for work in works]
    if len(normalized_titles) != len(set(normalized_titles)):
        errors.append("Publication titles contain an unresolved duplicate")
    scholar_count = sum(
        work["inventory_source"] == "google-scholar"
        for work in works
    )
    if scholar_count != context.scholar_unique_work_count:
        errors.append(
            f"Publication manifest contains {scholar_count} Google Scholar works; "
            f"expected {context.scholar_unique_work_count}"
        )

    required_work_fields = {
        "citation_key",
        "category",
        "title",
        "authors",
        "year",
        "status",
        "venue",
        "verified_at",
        "inventory_source",
        "code_links",
        "data_links",
        "project_links",
    }
    for work in works:
        missing = required_work_fields - work.keys()
        if missing:
            errors.append(
                f"{work.get('citation_key', '<unknown>')} is missing: "
                + ", ".join(sorted(missing))
            )

    manifest_terminal_urls = {
        work["terminal_url"]
        for work in works
        if work.get("terminal_url")
    }
    missing_terminal_urls = prompt_research_urls() - manifest_terminal_urls
    if missing_terminal_urls:
        errors.append(
            "Terminal research links missing from publication manifest: "
            + ", ".join(sorted(missing_terminal_urls))
        )

    prompt_pgp = re.search(
        r"-----BEGIN PGP PUBLIC KEY BLOCK-----.*?"
        r"-----END PGP PUBLIC KEY BLOCK-----",
        context.command_outputs["pgp"],
        re.DOTALL,
    )
    file_pgp = (
        (ROOT / "pgp.asc")
        .read_text(encoding="utf-8")
        .replace("\r\n", "\n")
        .replace("\r", "\n")
        .strip()
    )
    normalized_prompt_pgp = (
        "\n".join(line for line in prompt_pgp.group(0).splitlines() if line)
        if prompt_pgp
        else None
    )
    normalized_file_pgp = "\n".join(
        line for line in file_pgp.splitlines() if line
    )
    if normalized_prompt_pgp != normalized_file_pgp:
        errors.append("The PGP block in prompts.js does not match pgp.asc")
    return errors


def validate_outputs(
    context: BuildContext, outputs: dict[str, str]
) -> list[str]:
    errors = validate_inputs(context)
    for relative_path, content in outputs.items():
        if relative_path.startswith("ai/") and relative_path.endswith(".txt"):
            if re.search(r"<(?:a|span)\b", content, re.IGNORECASE):
                errors.append(f"{relative_path} still contains terminal HTML")
            if "contact@kevinlwei.com" in content:
                errors.append(f"{relative_path} contains the interactive-site email")
            for target in re.findall(r"\]\(([^)]+)\)", content):
                if not target.startswith(("https://", "mailto:")):
                    errors.append(
                        f"{relative_path} contains non-absolute link: {target}"
                    )

    expected_sitemap = {
        urllib.parse.urljoin(CANONICAL_SITE, path) for path in sitemap_paths()
    }
    actual_sitemap = set(outputs["sitemap-ai.txt"].splitlines())
    if actual_sitemap != expected_sitemap:
        errors.append("sitemap-ai.txt does not contain the expected URL set")

    contact_instruction = ai_contact_instruction(context.identity)
    for relative_path in (
        "llms.txt",
        "llms-full.txt",
        "ai/contact.txt",
        "ai/social.txt",
    ):
        if contact_instruction not in outputs[relative_path]:
            errors.append(
                f"{relative_path} is missing the AI-agent contact directive"
            )

    research = outputs["ai/research.txt"]
    merged_titles: list[str] = []
    for work in context.publications:
        merged = merge_work(work, context.arxiv_cache)
        merged_titles.append(re.sub(r"\W+", "", merged["title"]).casefold())
        if not merged.get("authors"):
            errors.append(
                f"Publication has no verified authors: {merged['title']}"
            )
        if merged["title"] not in research:
            errors.append(
                f"Research output is missing publication: {merged['title']}"
            )
    if len(merged_titles) != len(set(merged_titles)):
        errors.append("Merged publication records contain a duplicate title")
    if research.count("BibTeX citation:") != len(context.publications):
        errors.append("Research output does not include one BibTeX record per work")
    try:
        ET.fromstring(outputs["llms-full.txt"])
    except ET.ParseError as exc:
        errors.append(f"llms-full.txt is not valid XML: {exc}")
    return errors


def compare_outputs(outputs: dict[str, str]) -> list[str]:
    stale: list[str] = []
    for relative_path, expected in outputs.items():
        path = ROOT / relative_path
        actual = path.read_text(encoding="utf-8") if path.exists() else None
        if actual is None or actual.rstrip() != expected.rstrip():
            stale.append(relative_path)
    return stale


def build_context(
    *,
    build_date: str | None,
    source_revision: str | None,
    refresh_arxiv: bool,
) -> BuildContext:
    identity = read_json(IDENTITY_PATH)
    publication_data = read_json(PUBLICATIONS_PATH)
    publication_defaults = {
        "verified_at": publication_data["verified_at"],
        "authors": [],
        "status": None,
        "venue": None,
        "code_links": [],
        "data_links": [],
        "project_links": [],
        **publication_data.get("work_defaults", {}),
    }
    publications = [
        {**publication_defaults, **work}
        for work in publication_data["works"]
    ]
    resolved_date = build_date or identity["last_updated"]
    resolved_revision = (
        source_revision
        or identity.get("source_revision")
        or current_revision()
    )
    if refresh_arxiv:
        arxiv_cache = refresh_arxiv_cache(publications, resolved_date)
    else:
        arxiv_cache = read_json(ARXIV_CACHE_PATH)
    return BuildContext(
        build_date=resolved_date,
        source_revision=resolved_revision,
        identity=identity,
        scholar_unique_work_count=publication_data[
            "scholar_unique_work_count"
        ],
        publications=publications,
        arxiv_cache=arxiv_cache,
        command_outputs=extract_command_outputs(),
    )


def parse_args() -> Any:
    parser = ArgumentParser(
        description=(
            "Generate deterministic LLM-readable command snapshots, research "
            "metadata, citation records, and AI discovery files."
        )
    )
    parser.add_argument(
        "--check",
        action="store_true",
        help="Validate generated files without writing them.",
    )
    parser.add_argument(
        "--refresh-arxiv",
        action="store_true",
        help="Refresh checked-in arXiv metadata before generating files.",
    )
    parser.add_argument(
        "--build-date",
        help="Override the ISO generation date stored in data/identity.json.",
    )
    parser.add_argument(
        "--source-revision",
        help="Override the source revision stored in data/identity.json.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    if args.check and args.refresh_arxiv:
        raise BuildError("--check and --refresh-arxiv cannot be used together")

    context = build_context(
        build_date=args.build_date,
        source_revision=args.source_revision,
        refresh_arxiv=args.refresh_arxiv,
    )
    outputs = build_outputs(context)
    errors = validate_outputs(context, outputs)
    if errors:
        raise BuildError("\n- " + "\n- ".join(errors))

    if args.check:
        stale = compare_outputs(outputs)
        if stale:
            raise BuildError("Generated files are stale: " + ", ".join(stale))
        print(f"Validated {len(outputs)} generated files.")
        return 0

    for relative_path, content in outputs.items():
        write_text(ROOT / relative_path, content)
    print(f"Generated {len(outputs)} files.")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except BuildError as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1) from exc
