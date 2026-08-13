# SoloBizKit

Static, GitHub-ready website for SoloBizKit with three free tools:

- QR Code Generator
- Business Name Generator
- Paycheck Calculator

## Run locally

Just open `index.html`, or serve the folder with any static server.

Example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from this folder to the repository root.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.

## Notes

- The QR generator uses the `qrcode` library from jsDelivr CDN.
- The Business Name Generator runs fully in-browser and is currently rule-based, so it requires no API key.
- The Paycheck Calculator is intentionally a simplified estimate. For a production US payroll calculator, add federal/state/local tax logic and keep rates updated.
- Replace the newsletter alert with your email provider/form endpoint before launch.

## SEO next steps

Add canonical URLs after the final domain is set, Open Graph images, JSON-LD/FAQ schema, privacy/terms pages, sitemap.xml, robots.txt, and Google Search Console.
