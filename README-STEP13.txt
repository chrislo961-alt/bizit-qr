SoloBizKit Step 13 — Google Analytics 4 + consent

GA4 Measurement ID
G-HQQWQXMQ99

FILES
analytics.js
analytics-consent.css
HEAD-SNIPPET.html
PRIVACY-POLICY-ADDITION.txt

IMPORTANT
This package is an integration patch, not a replacement for the complete website.

1. Upload analytics.js and analytics-consent.css to the repository root.
2. Add the two lines from HEAD-SNIPPET.html inside <head> on EVERY HTML page/template.
3. Add the text from PRIVACY-POLICY-ADDITION.txt to /privacy/.
4. Commit and wait for GitHub Pages to deploy.
5. Visit the live site in a private/incognito window.
6. Accept analytics in the banner.
7. In Google Analytics, open Realtime and verify your visit.
8. Then use Google's "Test installation" button if desired.

TRACKING INCLUDED
- Normal GA4 page_view after analytics consent
- open_qr_tool
- open_invoice_tool
- open_name_generator
- open_paycheck_calculator
- open_rate_calculator
- open_profit_calculator
- open_tools_directory
- tool_action for common Generate/Create/Calculate/Download/Print/Copy buttons

PRIVACY DESIGN
- Analytics storage defaults to denied.
- GA is loaded only after analytics consent is granted.
- Advertising storage remains denied.
- Form/input values are not sent by this script.
- Consent choice is stored locally in the visitor's browser.

NOTE
The generic tool_action event intentionally records only the clicked button label,
not calculator values or other form contents.
