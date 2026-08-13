(() => {
  const $ = id => document.getElementById(id);
  const canvas = $('qrCanvas');
  const status = $('qrStatus');
  let activeType = 'url';
  let timer;
  const inputs = ['urlInput','textInput','emailInput','subjectInput','bodyInput','phoneInput','ssidInput','wifiPassword','wifiSecurity','wifiHidden','qrSize','qrMargin','darkColor','lightColor'].map($).filter(Boolean);
  function escapeWifi(value=''){ return value.replace(/([\\;,:"])/g,'\\$1'); }
  function payload(){
    if(activeType==='url'){let value=$('urlInput').value.trim();if(value&&!/^https?:\/\//i.test(value))value='https://'+value;return value;}
    if(activeType==='text')return $('textInput').value;
    if(activeType==='email'){const email=$('emailInput').value.trim();const params=new URLSearchParams();if($('subjectInput').value)params.set('subject',$('subjectInput').value);if($('bodyInput').value)params.set('body',$('bodyInput').value);return email?`mailto:${email}${params.toString()?'?'+params.toString():''}`:'';}
    if(activeType==='phone'){const phone=$('phoneInput').value.trim().replace(/\s+/g,'');return phone?`tel:${phone}`:'';}
    if(activeType==='wifi'){const ssid=escapeWifi($('ssidInput').value.trim());if(!ssid)return '';const security=$('wifiSecurity').value;const password=security==='nopass'?'':escapeWifi($('wifiPassword').value);return `WIFI:T:${security};S:${ssid};P:${password};H:${$('wifiHidden').checked?'true':'false'};;`;}
    return '';
  }
  function options(scale=true){return {width:scale?Number($('qrSize').value):undefined,margin:Number($('qrMargin').value),errorCorrectionLevel:'M',color:{dark:$('darkColor').value,light:$('lightColor').value}};}
  function render(){if(!window.QRCode){status.textContent='Loading…';setTimeout(render,120);return;}const value=payload();if(!value){const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);status.textContent='Add content';return;}status.textContent='Updating…';QRCode.toCanvas(canvas,value,options(true),err=>{status.textContent=err?'Could not generate':'Ready';});}
  function queueRender(){clearTimeout(timer);timer=setTimeout(render,100);}
  document.querySelectorAll('.type-tab').forEach(tab=>tab.addEventListener('click',()=>{activeType=tab.dataset.type;document.querySelectorAll('.type-tab').forEach(t=>t.classList.toggle('active',t===tab));document.querySelectorAll('.qr-panel').forEach(panel=>panel.classList.toggle('hidden',panel.dataset.panel!==activeType));queueRender();}));
  inputs.forEach(input=>{input.addEventListener('input',queueRender);input.addEventListener('change',queueRender);});
  $('darkColor').addEventListener('input',()=>{$('darkColorValue').textContent=$('darkColor').value.toUpperCase();});
  $('lightColor').addEventListener('input',()=>{$('lightColorValue').textContent=$('lightColor').value.toUpperCase();});
  $('downloadPng').addEventListener('click',()=>{if(!payload())return;QRCode.toDataURL(payload(),options(true),(err,url)=>{if(err)return;const a=document.createElement('a');a.download='solobizkit-qr-code.png';a.href=url;a.click();});});
  $('downloadSvg').addEventListener('click',()=>{if(!payload())return;QRCode.toString(payload(),{...options(false),type:'svg'},(err,svg)=>{if(err)return;const blob=new Blob([svg],{type:'image/svg+xml'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.download='solobizkit-qr-code.svg';a.href=url;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});});
  $('resetQr').addEventListener('click',()=>{$('qrSize').value='512';$('qrMargin').value='2';$('darkColor').value='#111827';$('lightColor').value='#ffffff';$('darkColorValue').textContent='#111827';$('lightColorValue').textContent='#FFFFFF';render();});
  window.addEventListener('load',render);
})();
