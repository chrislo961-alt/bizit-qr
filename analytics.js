// SoloBizKit analytics + quality layer
// GA4 Measurement ID: G-HQQWQXMQ99
(function(){
  const GA_ID='G-HQQWQXMQ99';
  const CONSENT_KEY='solobizkit_analytics_consent';
  const state={searchTracked:false,errorShown:false};
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){dataLayer.push(arguments)};

  gtag('consent','default',{
    analytics_storage:'denied',
    ad_storage:'denied',
    ad_user_data:'denied',
    ad_personalization:'denied',
    wait_for_update:500
  });

  function loadGA(){
    if(document.querySelector('script[data-solobizkit-ga]'))return;
    const s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtag/js?id='+GA_ID;s.dataset.solobizkitGa='1';document.head.appendChild(s);
    gtag('js',new Date());
    gtag('config',GA_ID,{anonymize_ip:true,send_page_view:true});
  }
  function granted(){return localStorage.getItem(CONSENT_KEY)==='granted'}
  function updateConsent(value){
    const yes=value==='granted';
    gtag('consent','update',{
      analytics_storage:yes?'granted':'denied',
      ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'
    });
    localStorage.setItem(CONSENT_KEY,value);
    if(yes)loadGA();
  }
  function banner(){
    if(localStorage.getItem(CONSENT_KEY))return;
    const box=document.createElement('div');box.id='sbk-consent';box.innerHTML='<div class="sbk-consent-inner"><div><strong>Optional analytics</strong><p>We use optional Google Analytics cookies to learn which tools are useful. We do not send the values you type into tools as analytics event data.</p></div><div class="sbk-consent-actions"><button id="sbk-decline" type="button">Decline</button><button id="sbk-accept" type="button">Accept analytics</button></div></div>';
    document.body.appendChild(box);
    document.getElementById('sbk-accept').onclick=function(){updateConsent('granted');box.remove()};
    document.getElementById('sbk-decline').onclick=function(){updateConsent('denied');box.remove()};
  }
  if(granted()){gtag('consent','update',{analytics_storage:'granted'});loadGA()}

  // Never pass form values, filenames, QR contents, invoice contents or search text here.
  window.sbkTrack=function(eventName,params){
    if(!granted())return;
    gtag('event',eventName,Object.assign({page_path:location.pathname,page_title:document.title},params||{}));
  };
  window.sbkComplete=function(tool,extra){sbkTrack('tool_complete',Object.assign({tool_name:tool},extra||{}))};

  function classifyAction(el){
    const id=el.id||'';const text=(el.textContent||'').trim().toLowerCase();
    if(id==='png'||/download png/.test(text))return 'qr_download_png';
    if(id==='svg'||/download svg/.test(text))return 'qr_download_svg';
    if(id==='printBtn'||/print \/ save pdf/.test(text))return 'invoice_print_pdf';
    if(id==='convert'||/convert to word/.test(text))return 'pdf_convert_start';
    if(id==='copy'||/^copy/.test(text))return 'copy_result';
    if(/calculate/.test(text))return 'calculator_action';
    if(/download/.test(text))return 'download_action';
    if(/generate|create/.test(text))return 'generate_action';
    return null;
  }

  document.addEventListener('click',function(e){
    const el=e.target.closest('a,button');if(!el)return;
    const href=el.getAttribute('href')||'';
    const category=el.dataset&&el.dataset.filter;
    if(category)sbkTrack('tool_filter',{filter_name:category});
    if(href.includes('/pdf-to-word/'))sbkTrack('open_pdf_tool');
    if(href.includes('/qr-code-generator/'))sbkTrack('open_qr_tool');
    if(href.includes('/invoice-generator/'))sbkTrack('open_invoice_tool');
    if(href.includes('/business-name-generator/'))sbkTrack('open_name_generator');
    if(href.includes('/paycheck-calculator/'))sbkTrack('open_paycheck_calculator');
    if(href.includes('/hourly-rate-calculator/'))sbkTrack('open_rate_calculator');
    if(href.includes('/profit-margin-calculator/'))sbkTrack('open_profit_calculator');
    if(href.includes('/break-even-calculator/'))sbkTrack('open_break_even_calculator');
    if(href.includes('/tools/'))sbkTrack('open_tools_directory');
    const action=classifyAction(el);if(action)sbkTrack(action);
  });

  document.addEventListener('input',function(e){
    const el=e.target;
    if(el&&el.id==='toolSearch'&&!state.searchTracked&&String(el.value||'').length>1){
      state.searchTracked=true;sbkTrack('tool_search_used');
    }
  });

  document.addEventListener('change',function(e){
    const el=e.target;
    if(el&&el.type==='file'&&el.files){sbkTrack('file_selected',{file_count:Math.min(el.files.length,20)});}
  });

  function showDependencyError(){
    if(state.errorShown||document.getElementById('sbk-quality-error'))return;state.errorShown=true;
    const box=document.createElement('div');box.id='sbk-quality-error';box.setAttribute('role','status');box.style.cssText='position:fixed;left:16px;right:16px;bottom:16px;z-index:99998;max-width:620px;margin:auto;background:#fff8e8;border:1px solid #ddc98f;border-radius:12px;padding:12px 14px;color:#5d5236;font:13px/1.45 system-ui;box-shadow:0 12px 30px rgba(0,0,0,.08)';
    box.innerHTML='<strong>A required component did not load.</strong><br>Check your connection and reload the page. Your typed form values may still be available in this browser.<button type="button" aria-label="Close" style="float:right;border:0;background:transparent;font-size:18px;cursor:pointer">×</button>';
    box.querySelector('button').onclick=()=>box.remove();document.body.appendChild(box);
  }
  window.addEventListener('error',function(e){
    const t=e.target;
    if(t&&(t.tagName==='SCRIPT'||t.tagName==='LINK')){
      showDependencyError();
      let host='external';try{host=new URL(t.src||t.href,location.href).hostname}catch(_){}
      sbkTrack('dependency_load_error',{resource_host:host});
    }
  },true);
  window.addEventListener('unhandledrejection',function(){sbkTrack('tool_runtime_error')});

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',banner);else banner();
})();