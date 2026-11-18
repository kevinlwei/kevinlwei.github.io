# KevinWei
Personal website for Kevin Wei. This website mimics a terminal, and implements fuzzy-search to identify misspelled commands.

## Shareable command links

The following clean URLs open the terminal and display the corresponding command:

- `/about`
- `/research`
- `/supervision`
- `/social`
- `/contact`
- `/pgp`
- `/help`

On GitHub Pages, `404.html` acts as the app shell for these known paths. Other
unknown URLs show a normal error page instead of launching the terminal.
Commands scroll to the cursor, except `research` and its aliases, which preserve
the viewport when printing the long publication list.

## Cat art credits

The `cats`, `cat`, and `meow` commands select a drawing that fits the terminal's
available width. Six compact additions (15–24 columns) are by Joan G. Stark
(`jgs`), from her [archived original gallery](https://oldcompcz.github.io/jgs/joan_stark/pets.html#cats).
Her [published reuse terms](https://oldcompcz.github.io/jgs/joan_stark/please.html)
permit personal use with her signature retained; they do not grant commercial
reuse. The signatures remain intact, with linked artist credits below each added
drawing. Reuse terms are recorded in the source metadata and AI text, rather than
displayed beneath the pictures. Only surrounding blank space was removed from these pieces.
The eight existing drawings remain in the collection; their original attribution
and licensing have not been reverified as part of these additions.

The JSON-compatible `cats` array in `js/prompts.js` is also the source of
`ai/cats.txt`, including the art, credits, and reuse terms.

## AI-readable content

The terminal prompts in `js/prompts.js`, curated identity data in
`data/identity.json`, publication records in `data/publications.json`, and
cached arXiv metadata generate the site's machine-readable text files.

Install the locked build environment and generate the files:

```sh
uv sync
uv run scripts/build_ai_content.py
```

Refresh canonical arXiv metadata before generating:

```sh
uv run scripts/build_ai_content.py --refresh-arxiv
```

Check that committed outputs are current without rewriting them:

```sh
uv run scripts/build_ai_content.py --check
```

Google Scholar is the reviewed publication inventory. The normal build does
not scrape Scholar or access the network; it uses the checked-in manifest and
arXiv cache for deterministic output.

The publication controls use `[A]` for academic research and `[P]` for policy
and public writing. When adding a Scholar work, update both the terminal list
in `js/prompts.js` and its record in `data/publications.json`, including its
Scholar citation URL. The build checks that every reviewed Scholar work is
listed in the terminal and that every terminal publication has an AI record.

The generated `ai/home.txt` mirrors the homepage introduction; the other AI
snapshots mirror their corresponding commands, including expanded publication
abstracts. Public contact details are preserved alongside the separate preferred
AI-agent contact directive. Regenerate these snapshots after changing site copy.

### Direct HTTP access

Agents can discover the files through `/llms.txt`, `/ai/index.txt`, or the
structured manifest at `/ai/index.json`. The HTML head links to these resources,
so discovery works even when the client does not execute JavaScript. All content
is public and can also be viewed as raw text in a browser; there is no User-Agent
gate, login, or graphical interface required to retrieve it.

Use `.txt`, not `.text`. For example:

```sh
curl --fail --silent --show-error https://kevinlwei.com/ai/research.txt
curl --fail --silent --show-error https://kevinlwei.com/ai/index.json
```

### Search indexing and hosting headers

The text files need the HTTP response header `X-Robots-Tag: noindex` to request
exclusion from search results. Keep them crawlable so clients can read that
header. `robots.txt` intentionally does not advertise the AI resource list as a
search sitemap or block access to it. `sitemap-ai.txt` remains a compatibility
URL list for existing clients.

**Publishing this repository to GitHub Pages does not install response-header
rules.** The ready-to-apply Cloudflare rule is in
`config/cloudflare-ai-headers.json`; it must be configured on the proxied custom
domain. It applies only to `/ai/`, `/llms.txt`, `/llms-full.txt`, and
`/sitemap-ai.txt`, leaving the human-facing site indexable.

In Cloudflare, select the `kevinlwei.com` domain:

1. Under **DNS → Records**, ensure the website records for `kevinlwei.com` and
   `www` (if used) are **Proxied** (orange cloud). DNS-only records cannot apply
   response-header rules.
2. Open **Rules → Overview → Create rule → Response Header Transform Rule**.
3. Name the rule `AI resources — noindex`. Under **When incoming requests match**,
   choose a custom filter expression and paste this into **Edit expression**:

```text
(http.host in {"kevinlwei.com" "www.kevinlwei.com"} and (
  starts_with(http.request.uri.path, "/ai/") or
  http.request.uri.path in {"/ai" "/llms.txt" "/llms-full.txt" "/sitemap-ai.txt"}
))
```

4. Under **Modify response header**, add **Set static** operations:
   `X-Robots-Tag` = `noindex`, and `X-Content-Type-Options` = `nosniff`.
   Enter the values without quotation marks. The second header prevents MIME
   sniffing; the first controls search indexing.
5. Select **Deploy**. This rule covers the AI resources while leaving `/`,
   `/research`, and the other human-facing routes indexable.
6. Verify the live response:

```sh
curl --fail --silent --show-error --location --dump-header - --output /dev/null https://kevinlwei.com/ai/research.txt
```

The final response should be HTTP 200 with `Content-Type: text/plain`,
`X-Robots-Tag: noindex`, and `X-Content-Type-Options: nosniff` (header names may
appear lowercase). Leave these URLs allowed in `robots.txt`: search crawlers
must fetch the files to discover the header. Already-indexed URLs are removed
after search engines recrawl them; the rule does not make the public files private.

Existing `.txt` responses already use `text/plain; charset=utf-8`. Do not rewrite
missing resources into successful HTML responses or put interactive challenges
in front of these public text endpoints. The rule deliberately does not relabel
HTML errors as plain text.

After publishing both the files and the hosting rule, verify every endpoint:

```sh
python3 scripts/check_ai_http.py
```

This uses only HTTP and checks successful responses, content types, the absence
of HTML/challenges, the resource manifest, and the noindex header. For a local
static server without CDN headers, check only direct access with:

```sh
python3 scripts/check_ai_http.py --base-url http://127.0.0.1:8000/ --content-only
```

References: [Google's non-HTML noindex guidance](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#xrobotstag)
and [Cloudflare response-header rules](https://developers.cloudflare.com/rules/transform/response-header-modification/create-dashboard/).

## Screenshot

![Screenshot](screenshots/screenshot.PNG)
