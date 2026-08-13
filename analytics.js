// SoloBizKit Step 13 — GA4 + consent-aware event tracking
// Measurement ID: G-HQQWQXMQ99

(function () {
  const GA_ID = "G-HQQWQXMQ99";
  const CONSENT_KEY = "solobizkit_analytics_consent";

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function(){ dataLayer.push(arguments); };

  // Consent Mode defaults: analytics off until the visitor accepts.
  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500
  });

  function loadGA() {
    if (document.querySelector('script[data-solobizkit-ga]')) return;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    s.dataset.solobizkitGa = "1";
    document.head.appendChild(s);

    gtag("js", new Date());
    gtag("config", GA_ID, {
      anonymize_ip: true,
      send_page_view: true
    });
  }

  function updateConsent(value) {
    const granted = value === "granted";
    gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    localStorage.setItem(CONSENT_KEY, value);
    if (granted) loadGA();
  }

  function banner() {
    if (localStorage.getItem(CONSENT_KEY)) return;

    const box = document.createElement("div");
    box.id = "sbk-consent";
    box.innerHTML = `
      <div class="sbk-consent-inner">
        <div>
          <strong>Analytics cookies</strong>
          <p>We use optional Google Analytics cookies to understand which SoloBizKit tools are useful. You can accept or decline.</p>
        </div>
        <div class="sbk-consent-actions">
          <button id="sbk-decline" type="button">Decline</button>
          <button id="sbk-accept" type="button">Accept analytics</button>
        </div>
      </div>`;
    document.body.appendChild(box);

    document.getElementById("sbk-accept").onclick = function() {
      updateConsent("granted");
      box.remove();
    };
    document.getElementById("sbk-decline").onclick = function() {
      updateConsent("denied");
      box.remove();
    };
  }

  // Load only when consent was already granted on a previous visit.
  if (localStorage.getItem(CONSENT_KEY) === "granted") {
    gtag("consent", "update", { analytics_storage: "granted" });
    loadGA();
  }

  // Generic event helper for current and future tools.
  window.sbkTrack = function(eventName, params) {
    if (localStorage.getItem(CONSENT_KEY) !== "granted") return;
    gtag("event", eventName, Object.assign({
      page_path: location.pathname,
      page_title: document.title
    }, params || {}));
  };

  // Automatically track useful interactions without collecting form values.
  document.addEventListener("click", function(e) {
    const el = e.target.closest("a,button");
    if (!el) return;

    const text = (el.textContent || "").trim().toLowerCase();
    const href = el.getAttribute("href") || "";

    if (href.includes("/qr-code-generator")) sbkTrack("open_qr_tool");
    if (href.includes("/invoice-generator")) sbkTrack("open_invoice_tool");
    if (href.includes("/business-name-generator")) sbkTrack("open_name_generator");
    if (href.includes("/paycheck-calculator")) sbkTrack("open_paycheck_calculator");
    if (href.includes("/hourly-rate-calculator")) sbkTrack("open_rate_calculator");
    if (href.includes("/profit-margin-calculator")) sbkTrack("open_profit_calculator");
    if (href.includes("/tools/")) sbkTrack("open_tools_directory");

    if (/generate|create|calculate|download|print|copy/.test(text)) {
      sbkTrack("tool_action", {
        action_label: text.slice(0, 80)
      });
    }
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", banner);
  } else {
    banner();
  }
})();
