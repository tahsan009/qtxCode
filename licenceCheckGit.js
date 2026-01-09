(async function () {

const SERVER_URL =  'https://qxbrokercanada.pythonanywhere.com/api/verify'   ;   
const SCRIPT_URL = 'https://qxbrokercanada.pythonanywhere.com/get-script' ;      
const PROJECT_NAME = 'Quotex'; 
let  isLicenseVerified = false;




/******************EXTRA MESSAGE POPUP************************************ */
 


function msgPopup(text, type = "ok") {

  // inject CSS once
  if (!document.getElementById("msg-style")) {
    const s = document.createElement("style");
    s.id = "msg-style";
    s.innerHTML = `
      .msg-toast{
        position:fixed;
        top:20px;
        left:50%;
        transform:translateX(-50%);
        background:#111;
        color:#fff;
        padding:12px 24px;
        border-radius:8px;
        font-size:14px;
        font-weight:600;
        border:2px solid;
        z-index:9999999;
      }
      .msg-ok{border-color:#22c55e}
      .msg-err{border-color:#ef4444}
      .msg-warn{border-color:#facc15}
    `;
    document.head.appendChild(s);
  }

  // remove old
  document.querySelector(".msg-toast")?.remove();

  // create toast
  const d = document.createElement("div");
  d.className = `msg-toast msg-${type}`;
  d.innerText = text;

  document.body.appendChild(d);

  // auto hide
  setTimeout(() => d.remove(), 2500);
}


 function openLicenceBox(){
  if(document.getElementById("ig-overlay")) return;

  /* ============ STYLE ============ */
  if(!document.getElementById("ig-style")){
    const s=document.createElement("style");
    s.id="ig-style";
    s.textContent=`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    :root{
      --accent:#22c55e;
      --bg:#0b0f14;
      --panel:#0f1622;
      --text:#e7ebf0;
      --muted:#8a94a3;
    }

    #ig-overlay{
      position:fixed;
      inset:0;
      background:radial-gradient(circle at top,#101827,#05080c);
      display:flex;
      align-items:center;
      justify-content:center;
      z-index:999999;
      font-family:Inter,sans-serif;
    }

    .ig-panel{
      width:95%;
      max-width:560px;
      background:var(--panel);
      border-radius:16px;
      padding:0 36px 34px;
      box-shadow:0 50px 140px rgba(0,0,0,.85);
      color:var(--text);
      overflow:hidden;
    }

    /* ===== LIVE BAR ===== */
    .ig-live{
      height:56px;
      background:#0b111c;
      border-bottom:1px solid rgba(255,255,255,.06);
      display:flex;
      align-items:center;
      padding:0 20px;
      font-size:13px;
      color:var(--muted);
      position:relative;
    }

    .ig-wave{
      position:absolute;
      bottom:0;
      left:0;
      width:100%;
      height:22px;
    }

    .ig-body{padding-top:9px}

    .ig-dev{
      font-size:13px;
      margin-bottom:10px;
      color:var(--muted);
    }

    .ig-dev b{color:#fff}
    .ig-dev a{
      color:var(--accent);
      text-decoration:none;
      font-weight:600;
    }

    .ig-title{
      font-size:26px;
      font-weight:700;
      margin:6px 0 6px;
    }

    .ig-desc{
      font-size:14px;
      color:var(--muted);
      margin-bottom:22px;
      line-height:1.5;
    }

    .ig-state{
      display:flex;
      justify-content:space-between;
      padding:14px 18px;
      border-radius:10px;
      background:#090e16;
      border:1px solid rgba(255,255,255,.05);
      margin-bottom:22px;
      font-size:13px;
    }

    .ig-state span:last-child{
      color:#f87171;
      font-weight:600;
    }

    .ig-select,
    .ig-input{
      width:100%;
      padding:15px 16px;
      border-radius:10px;
      background:#060a11;
      border:1px solid rgba(255,255,255,.08);
      color:#fff;
      font-size:14px;
      outline:none;
      margin-bottom:16px;
    }

    .ig-select:focus,
    .ig-input:focus{
      border-color:var(--accent);
      box-shadow:0 0 0 3px rgba(34,197,94,.25);
    }

    .ig-btn{
      width:100%;
      padding:16px;
      border-radius:10px;
      border:none;
      background:linear-gradient(135deg,#22c55e,#16a34a);
      color:#022c15;
      font-weight:700;
      letter-spacing:.4px;
      cursor:pointer;
      margin-top:8px;
    }

    .ig-close{
      margin-top:14px;
      text-align:center;
      font-size:13px;
      color:var(--muted);
      cursor:pointer;
    }

    /* ===== TOAST ===== */
    .ig-toast{
      position:fixed;
      top:22px;
      left:50%;
      transform:translateX(-50%) scale(.96);
      background:#0e1624;
      border:2px solid;
      padding:22px 40px;
      border-radius:14px;
      font-size:16px;
      font-weight:700;
      min-width:360px;
      max-width:92%;
      opacity:0;
      z-index:1000000;
      animation:toast .35s ease forwards;
      box-shadow:0 20px 70px rgba(0,0,0,.8);
    }

    @keyframes toast{
      to{opacity:1;transform:translateX(-50%) scale(1)}
    }

    .t-warn{color:#facc15;border-color:#facc15}
    .t-ok{color:#22c55e;border-color:#22c55e}
    .t-err{color:#f87171;border-color:#f87171}
    `;
    document.head.appendChild(s);
  }

  /* ============ HTML ============ */
  const o=document.createElement("div");
  o.id="ig-overlay";
  o.innerHTML=`
    <div class="ig-panel">
      <div class="ig-live">
        Enjoy Real Trading Experience..
        <canvas class="ig-wave"></canvas>
      </div>


       <div class="ig-title">License Verification</div>
        <div class="ig-desc">
          Select a premium plan and verify your license to unlock live trading access.
        </div>

      <div class="ig-body">
        <div class="ig-dev">
          Developed by <b>YOUR NAME</b> <br>
          Telegram: <a href="https://t.me/YOUR_USERNAME" target="_blank">@YOUR_USERNAME</a> <br>
        </div>

        
      <br>
        <div class="ig-state">
          <span><a href="https://t.me/YOUR_USERNAME" target="_blank"><b>GET LICENSE  </b> </a></span>
          <span>DEMO TO LIVE</span>
        </div>

        <select id="igPlan" class="ig-select">
          <option value="">Select Premium Plan</option>
          <option value="5">$5 — Starter Trader</option>
          <option value="10">$10 — Intermediate Trader</option>
          <option value="30">$30 — VIP Pro Trader </option>
        </select>

        <input id="igKey" class="ig-input" placeholder="Enter license key">

        <button id="igBtn" class="ig-btn">
          VERIFY & ENABLE LIVE
        </button>

        <div class="ig-close">Close</div>
      </div>
    </div>
  `;
  document.body.appendChild(o);

  /* ============ WAVE ANIMATION ============ */
  const c=o.querySelector(".ig-wave");
  const ctx=c.getContext("2d");
  let t=0;

  function resize(){
    c.width=c.offsetWidth;
    c.height=c.offsetHeight;
  }
  resize(); window.addEventListener("resize",resize);

  (function wave(){
    ctx.clearRect(0,0,c.width,c.height);
    ctx.beginPath();
    ctx.strokeStyle="#22c55e";
    ctx.lineWidth=2;

    for(let x=0;x<c.width;x++){
      const y=Math.sin((x+t)/28)*4 + c.height/2;
      x?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.stroke();
    t+=1.2;
    requestAnimationFrame(wave);
  })();

  /* ============ TOAST ============ */
  window.igToast=(m,t)=>{
    const old=document.querySelector(".ig-toast");
    if(old) old.remove();
    const d=document.createElement("div");
    d.className=`ig-toast t-${t}`;
    d.innerText=m;
    document.body.appendChild(d);
    setTimeout(()=>d.remove(),3200);
  };


/*===================VERIFY USER LICENCE FUNCTION============================ */
// Verify License Function if button click
async function verifyLicense(licenseKey){
  const result = await verifyActivation(licenseKey);

  if (result.valid) { 
    igToast("✓ Licence Verified Successfully","ok");
    checkExistingActivation();

  } else if (result.reason === 'wrong_project') {
    igToast("✗ Wrong Project License","err");

  } else if (result.reason === 'limit') {
    igToast("You have reached the maximum device limit.Contact Admin @","warn");

  } else if (result.reason === 'network') {
    igToast("✗ Network error. Try again","err");

  } else {
    igToast("✗ Invalid Licence. Licence not match","err");
  }
}



  /* ============ LOGIC ============ */
  document.getElementById("igBtn").onclick=()=>{
      const plan=igPlan.value;
      const licenseKey=igKey.value.trim();

      if(!plan){igToast("Please select a premium plan","warn");return;}
      if(!licenseKey){igToast("License key is required","warn");return;}

      igToast("Verifying license & plan…","warn");

      verifyLicense(licenseKey); // ✅ CALL

};

  o.querySelector(".ig-close").onclick=()=>o.remove();
}
 
 function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    let deviceType = 'Unknown';
    let browser = 'Unknown';
    let os = 'Unknown';

    if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('SamsungBrowser')) browser = 'Samsung Browser';
    else if (userAgent.includes('Opera') || userAgent.includes('OPR/')) browser = 'Opera';
    else if (userAgent.includes('Trident')) browser = 'Internet Explorer';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    else if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Safari')) browser = 'Safari';

    if (userAgent.includes('Android')) os = 'Android';
    else if (userAgent.includes('Linux')) os = 'Linux';
    else if (userAgent.includes('iPhone') || userAgent.includes('iPad') || userAgent.includes('iPod')) os = 'iOS';
    else if (userAgent.includes('Macintosh')) os = 'Mac OS';
    else if (userAgent.includes('Windows')) os = 'Windows';

    if (userAgent.includes('Mobile')) deviceType = 'Mobile';
    else if (userAgent.includes('Tablet')) deviceType = 'Tablet';
    else deviceType = 'Desktop';

    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const cpuClass = navigator.cpuClass || 'Unknown';

    return {
      deviceType,
      browser,
      os,
      userAgent,
      screenResolution,
      cpuClass,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      plugins: Array.from(navigator.plugins).map(p => p.name).join(', '),
      hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown'
    };
  }

  // Generate permanent unique device ID
  function getDeviceId() {
    let deviceId = localStorage.getItem('permanentDeviceId');
    if (!deviceId) {
      // Create truly unique device ID based on multiple factors
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.textBaseline = 'top';
      ctx.font = '14px Arial';
      ctx.fillText('Device Fingerprint', 2, 2);
      const canvasData = canvas.toDataURL();
      
      // Combine multiple device characteristics for unique ID
      const fingerprint = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        screen.colorDepth,
        new Date().getTimezoneOffset(),
        navigator.hardwareConcurrency || 0,
        navigator.deviceMemory || 0,
        navigator.maxTouchPoints || 0,
        canvasData.slice(0, 100) // Use part of canvas fingerprint
      ].join('|');
      
      // Generate hash-like ID
      let hash = 0;
      for (let i = 0; i < fingerprint.length; i++) {
        const char = fingerprint.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      
      deviceId = 'device_' + Math.abs(hash).toString(36) + '_' + Date.now().toString(36);
      localStorage.setItem('permanentDeviceId', deviceId);
    }
    return deviceId;
  }


//verify licence activation
async function verifyActivation(activationKey) {
    const deviceId = getDeviceId();
    const deviceInfo = getDeviceInfo();

    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          license_key: activationKey,
          device_id: deviceId,
          device_info: deviceInfo,
          project_type: PROJECT_NAME,
          is_recheck: !!localStorage.getItem('appActivation')
        })
      });


      const data = await response.json();
      // Check if license is valid AND belongs to correct project
      if (data.valid || data.status === 'success') {
        // Verify project type matches
        if (data.project_type && data.project_type !== PROJECT_NAME) {
          return {
            valid: false,
            reason: 'wrong_project',
            wrongProject: data.project_type,
            message: `This license belongs to "${data.project_type}" project. Please use a valid "${PROJECT_NAME}" license.`
          };
        }
        
        localStorage.setItem('appActivation', activationKey);
        localStorage.setItem('lastVerified', Date.now());
        isLicenseVerified = true;
        return { valid: true, key: activationKey };
      } else if (data.message && data.message.includes('device limit')) {
        return {
          valid: false,
          reason: 'limit',
          allowed: data.allowed_devices || 3,
          used: data.used_devices || 'unknown'
        };
      } else if (data.message && data.message.includes('wrong project')) {
        return {
          valid: false,
          reason: 'wrong_project',
          wrongProject: data.project_type || 'UNKNOWN',
          message: data.message || `This license does not belong to "${PROJECT_NAME}" project.`
        };
      } else {
        if (localStorage.getItem('appActivation') === activationKey) {
          localStorage.removeItem('appActivation');
          localStorage.removeItem('lastVerified');
          isLicenseVerified = false;
        }
        return { valid: false, reason: 'invalid' };
      }
    } catch (error) {
      console.error('Verification failed:', error);
      return { valid: false, reason: 'network' };
    }
  }



// check if user already verified
async function checkExistingActivation() {
    const savedKey = localStorage.getItem('appActivation');
    if (savedKey) {
      console.log('Found existing activation, verifying...');
      const verificationResult = await verifyActivation(savedKey);
           
      
      if (verificationResult.reason === 'wrong_project') {
                 msgPopup("✗ Wrong Project License","err");

      } else if (verificationResult.reason === 'limit') {
                msgPopup("You have reached the maximum device limit.Contact Admin @","warn");

      } else if (verificationResult.reason === 'network') {
                msgPopup("✗ Network error. Try again","err");

      } else { if(verificationResult.reason === 'invalid'){ msgPopup("✗ Invalid Licence. Licence not match","err");}}

      
      if (!verificationResult.valid) {
        localStorage.removeItem('appActivation');
        localStorage.removeItem('lastVerified');
        isLicenseVerified = false;
      } else {
        isLicenseVerified = true;  
        //demo to live => Live to demo
if (location.pathname == "/en/trade") {  location.replace("/en/demo-trade"); }
if (location.pathname == "/en/demo-trade") { history.pushState({}, "", "/en/trade"); }

        // main script run  
        runMainScript();
      }
      
      return verificationResult;
    }else{
        // show licence box 
        openLicenceBox();
    }
    
    isLicenseVerified = false;
    return { valid: false };    
  }


  // Main Script Function - Fetches QUOTEX.js from server
  async function runMainScript() {
    const savedKey = localStorage.getItem('appActivation');
    if (!savedKey) {
      console.error('❌ No license key found');
      igToast("❌ No license key found","err");
      return;
    }

    const deviceId = getDeviceId();
    const deviceInfo = getDeviceInfo();

    try {
      // Fetch main file QUOTEX.js script from server
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          license_key: savedKey,
          device_id: deviceId,
          device_info: deviceInfo,
          project_type: PROJECT_NAME
        })
      });

      if (response.ok) {
        const scriptCode = await response.text();
             
        // Check if response is JSON error message
        if (scriptCode.startsWith('{')) {
          const errorData = JSON.parse(scriptCode);
          console.log("SERVER RESPONSE:",errorData);
          if (errorData.reason === 'wrong_project') {
            showWrongProjectPopup(errorData.message, errorData.wrongProject);
          } else if (errorData.reason === 'limit') {
            showLimitPopup(errorData.allowed_devices, errorData.used_devices);
          } else {
            throw new Error(errorData.message || 'Failed to fetch script');
          }
          return;
        }
        
        
        // Execute the fetched script
        console.log('✅ Script fetched successfully from server');
        eval(scriptCode);


         // ✅ SAFE INJECTION
        //  injectScript(scriptCode);      

      }else {
        // Handle HTTP error responses
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          throw new Error('Server error: ' + response.status);
        }
        
        if (errorData.reason === 'wrong_project') {
          showWrongProjectPopup(errorData.message, errorData.wrongProject);
        } else if (errorData.reason === 'limit') {
          showLimitPopup(errorData.allowed_devices, errorData.used_devices);
        } else {
          throw new Error(errorData.message || 'Failed to fetch script');
        }
      }
    } catch (error) {
      console.error('❌ Error fetching script:', error);
      msgPopup("Could not fetch script from server.Error: Please check your license and try again.","err");
    }


  }

/* Execute fetched script safely (NO eval)
function injectScript(code) {
  const script = document.createElement("script");
  script.textContent = code;
  (document.head || document.documentElement).appendChild(script);
  script.remove();
}
*/



  //Initial check if license available for this user
 const initialCheck = await checkExistingActivation();




})();
