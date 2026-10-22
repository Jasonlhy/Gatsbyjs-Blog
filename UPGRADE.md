# Gatsby Upgrade Report — 5.9.1 → 5.16.1

Date: 2026-10-23

## Summary

Upgraded Gatsby and all official Gatsby plugins to the latest stable release line.
**Gatsby 5.16.1 is the latest stable (LTS) version** — it is the `latest` tag on npm,
and there is no Gatsby v6. The v5 line is the final maintenance/LTS line of the framework.

## Version changes

| Package | Before | After |
| --- | --- | --- |
| gatsby | ^5.9.1 | ^5.16.1 |
| gatsby-plugin-image | ^3.8.0 | ^3.16.0 |
| gatsby-plugin-manifest | ^5.8.0 | ^5.16.0 |
| gatsby-plugin-react-helmet | ^6.8.0 | ^6.16.0 |
| gatsby-plugin-sharp | ^5.8.1 | ^5.16.0 |
| gatsby-remark-autolink-headers | ^6.8.0 | ^6.16.0 |
| gatsby-remark-images | ^7.8.0 | ^7.16.0 |
| gatsby-remark-prismjs | ^7.8.0 | ^7.16.0 |
| gatsby-source-filesystem | ^5.8.0 | ^5.16.0 |
| gatsby-transformer-remark | ^6.8.0 | ^6.16.0 |
| gatsby-transformer-sharp | ^5.8.0 | ^5.16.0 |

All plugin versions are the latest published releases and are compatible with `gatsby@5.16.1`.

## Additional change: msgpackr override

Added to `package.json`:

```json
"overrides": {
  "msgpackr": "^1.11.2"
}
```

**Why:** Gatsby 5 depends on `lmdb@2.5.x`, which pins an old `msgpackr` (1.9.x).
That version crashes on modern Node.js (22+) during the "source and transform nodes"
step with:

```
Error: RangeError [ERR_BUFFER_OUT_OF_BOUNDS]: "length" is outside of buffer bounds
    at Packr.encodeUtf8 (msgpackr/dist/node.cjs)
```

msgpackr 1.10.2+ fixed the buffer-encoding incompatibility with newer Node versions,
so the override forces `msgpackr@1.12.1` across all dependents. No other code changes
were required — `gatsby-config.js`, `gatsby-node.js`, `gatsby-browser.js`,
`gatsby-ssr.js`, and all `src/` files work unchanged.

## Environment

This machine had no Node.js installed, so Node 24 LTS (v24.22.1, darwin-arm64) was
installed locally to `~/.local/node` (no sudo, no system changes). To use it:

```sh
export PATH="$HOME/.local/node/bin:$PATH"
```

## Validation

### Production build

`npm run clean && npm run build` — exit code 0. All 94 pages generated:
blog posts, paginated `/blogs` listing, tag pages, 404, and the SSR page
(`/using-ssr/`).

The log contains one `ERROR UNKNOWN` line; it is Gatsby mislabeling a harmless
Node 24 deprecation warning (`The 'punycode' module is deprecated`) raised by a
transitive dependency during static HTML generation. It does not affect the build.

### Production serve (`gatsby serve`)

All checked routes return HTTP 200:

- `/`
- `/blogs/` (paginated blog list)
- `/404/`
- `/using-ssr/` (server-side rendered page)
- `/tags/c/` (tag pages)
- `/新主題第一貼/`, `/中英夾雜問題/` (blog posts with Chinese titles)

Rendered HTML contains correct `<title>` content and `page-data` JSON is generated.

### Development server (`gatsby develop`)

Compiles and serves successfully. Only 9 pre-existing ESLint warnings
(`no-unused-vars`, `react/jsx-pascal-case`, `react-hooks/exhaustive-deps`) that
existed before the upgrade and are unrelated to it.
