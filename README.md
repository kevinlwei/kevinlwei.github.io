# KevinWei
Personal website for Kevin Wei. This website mimics a terminal, and implements fuzzy-search to identify misspelled commands.

## Shareable command links

The following clean URLs open the terminal and display the corresponding command:

- `/about`
- `/research`
- `/social`
- `/contact`
- `/pgp`
- `/help`

On GitHub Pages, `404.html` acts as the app shell for these paths. The client-side terminal then reads the URL and renders the command output.

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

## Screenshot

![Screenshot](screenshots/screenshot.PNG)
