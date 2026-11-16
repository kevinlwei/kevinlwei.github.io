"""Check deployed AI resources using HTTP only, without JavaScript or a browser."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import re
import sys
import urllib.error
import urllib.parse
import urllib.request


ROOT = Path(__file__).resolve().parents[1]


def check_resource(url: str, format_name: str, *, require_noindex: bool) -> list[str]:
    request = urllib.request.Request(
        url, headers={"Accept": "text/plain, application/json;q=0.9, */*;q=0.1"}
    )
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            status = response.status
            content_type = response.headers.get_content_type()
            robots = ",".join(response.headers.get_all("X-Robots-Tag", []))
            body = response.read().decode("utf-8")
    except (urllib.error.URLError, UnicodeDecodeError, TimeoutError) as exc:
        return [str(exc)]

    errors = []
    if status != 200:
        errors.append(f"expected HTTP 200, got {status}")
    if format_name == "text" and content_type != "text/plain":
        errors.append(f"expected text/plain, got {content_type}")
    if not body.strip():
        errors.append("empty response")
    if content_type == "text/html" or re.search(
        r"<!doctype\s+html|<html\b|<script\b", body, re.IGNORECASE
    ):
        errors.append("received an HTML UI or challenge instead of a direct resource")
    if format_name == "json":
        if content_type != "application/json":
            errors.append(f"expected application/json, got {content_type}")
        try:
            manifest = json.loads(body)
            if manifest != json.loads((ROOT / "ai/index.json").read_text()):
                errors.append("deployed resource manifest does not match this checkout")
        except json.JSONDecodeError:
            errors.append("invalid JSON manifest")
    if require_noindex and not {"noindex", "none"}.intersection(
        directive.strip().lower() for directive in robots.split(",")
    ):
        errors.append("missing X-Robots-Tag: noindex (hosting/CDN configuration required)")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--base-url", default="https://kevinlwei.com/")
    parser.add_argument(
        "--content-only", action="store_true",
        help="Check raw HTTP access only; explicitly skip the production noindex check.",
    )
    args = parser.parse_args()
    manifest = json.loads((ROOT / "ai/index.json").read_text())
    failures = 0
    for resource in manifest["resources"]:
        path = urllib.parse.urlparse(resource["url"]).path.lstrip("/")
        url = urllib.parse.urljoin(args.base_url.rstrip("/") + "/", path)
        errors = check_resource(url, resource["format"], require_noindex=not args.content_only)
        if errors:
            failures += 1
            print(f"FAIL {url}: {'; '.join(errors)}", file=sys.stderr)
        else:
            print(f"PASS {url}")
    if args.content_only:
        print("Content-only check: search-index exclusion was NOT verified.")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
