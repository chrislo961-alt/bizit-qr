SoloBizKit Step 15 — Analytics on all existing pages

Upload ALL contents of this ZIP to the ROOT of the GitHub repository and overwrite matching files.

This patch:
- Adds /analytics.js to the site root
- Adds /analytics-consent.css to the site root
- Adds consent-aware GA4 tracking to 36 existing HTML pages
- Uses GA4 Measurement ID G-HQQWQXMQ99
- Updates the Privacy page with an Analytics section
- Carries forward the latest sitemap.xml and robots.txt
- Does not intentionally send user-entered form values to Analytics

Consent behavior:
- Analytics storage defaults to denied
- Google Analytics loads only after the visitor accepts analytics
- Advertising storage remains denied
- The user's choice is stored locally in their browser

TEST AFTER DEPLOY
1. Open https://solobizkit.it.com/ in an incognito/private window.
2. Confirm the analytics consent banner appears.
3. Click Decline and confirm the site still works.
4. Open another incognito/private session.
5. Click Accept analytics.
6. In Google Analytics, open Realtime.
7. Navigate between a few tools and confirm activity appears.

IMPORTANT
The Contact page may still contain the support-email placeholder from Step 1. Replace that before treating the site as fully polished for launch.
