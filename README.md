# Project1

A lightweight Cloudflare Pages starter using only browser standards:

- Plain semantic HTML
- Handwritten CSS
- Vanilla JavaScript ES modules
- Cloudflare Pages Functions
- No React, Next.js, Vite, bundler, or production dependencies

## Project structure

```text
public/                 Static files published by Cloudflare Pages
  assets/               Images and icons
  css/styles.css        Site styles
  js/main.js            Browser ES module
  index.html            Main page
  _headers              Production security and cache headers
  _routes.json          Limits Function invocation to /api/*
functions/              Cloudflare Pages Functions
  api/status.js         GET /api/status health endpoint
```

## Local frontend preview

Run the included dependency-free static preview server:

```sh
node scripts/serve.mjs
```

The static preview does not execute Pages Functions. The status button will show an explanatory offline state.

## Deploy with Cloudflare Pages

Connect `abyalex-ux/Project1` from **Workers & Pages → Create → Pages → Connect to Git**.

Use these settings:

- Framework preset: None
- Build command: leave blank
- Build output directory: `public`
- Root directory: `/`

The `functions/` directory is detected automatically and deploys `/api/status` with the site. No command-line deployment tool or build step is required.
