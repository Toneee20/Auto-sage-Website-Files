/* ═══ STARS ═══ */
(function(){
  const c=document.getElementById('sf'),x=c.getContext('2d');
  let W,H,S=[];
  const init=()=>{W=c.width=innerWidth;H=c.height=innerHeight;S=[];
    for(let i=0;i<200;i++)S.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.1+.15,
      vx:(Math.random()-.5)*.024,vy:(Math.random()-.5)*.024,
      ph:Math.random()*Math.PI*2,sp:Math.random()*.004+.001,
      t:Math.random()<.06?'c':Math.random()<.04?'p':'w'});};
  let f=0;
  const draw=()=>{f++;x.clearRect(0,0,W,H);S.forEach(s=>{
    s.x+=s.vx;s.y+=s.vy;
    if(s.x<0)s.x=W;if(s.x>W)s.x=0;if(s.y<0)s.y=H;if(s.y>H)s.y=0;
    const b=.15+.65*Math.abs(Math.sin(f*s.sp+s.ph));
    x.beginPath();x.arc(s.x,s.y,s.r,0,Math.PI*2);
    if(s.t==='c'){x.fillStyle=`rgba(79,195,247,${b*.7})`;if(b>.65){x.shadowColor='#4FC3F7';x.shadowBlur=5;}}
    else if(s.t==='p'){x.fillStyle=`rgba(149,117,205,${b*.55})`;if(b>.65){x.shadowColor='#9575CD';x.shadowBlur=5;}}
    else x.fillStyle=`rgba(176,190,197,${b*.28})`;
    x.fill();x.shadowBlur=0;});requestAnimationFrame(draw);};
  window.addEventListener('resize',init);init();draw();
})();

/* ═══ HISTORY & NAVIGATION ═══ */
const HIST=[];let HPOS=-1;
function gP(p){
  if(HPOS<0||HIST[HPOS]!==p){HIST.splice(HPOS+1);HIST.push(p);HPOS=HIST.length-1;}
  _show(p);
}
function navBack(){if(HPOS>0){HPOS--;_show(HIST[HPOS]);}}
function navFwd(){if(HPOS<HIST.length-1){HPOS++;_show(HIST[HPOS]);}}
function _show(p){
  document.querySelectorAll('.page').forEach(el=>el.classList.remove('active'));
  const pg=document.getElementById('page-'+p);
  if(pg)pg.classList.add('active');
  document.querySelectorAll('.nlink').forEach(l=>l.classList.remove('on'));
  if(p==='home')document.getElementById('nl-home').classList.add('on');
  if(p==='contact')document.getElementById('nl-con').classList.add('on');
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(rvAll,80);
  setTimeout(animBars,300);
  // Arrows
  const arr=document.getElementById('navArrows');
  arr.style.display=HIST.length>1?'flex':'none';
  document.getElementById('backBtn').disabled=HPOS<=0;
  document.getElementById('fwdBtn').disabled=HPOS>=HIST.length-1;
  // Catalogue page hook: re-bind reveal animations for its cards
  if(p==='catalogue' && typeof initCatalogueAnims==='function'){setTimeout(initCatalogueAnims,60);}
}
function gS(id){
  gP('home');
  setTimeout(()=>{const el=document.getElementById(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});},140);
}
function togMob(){document.getElementById('mobMenu').classList.toggle('open');}

/* ═══ REVEAL ═══ */
function rvAll(){
  const o=new IntersectionObserver(e=>{e.forEach(el=>{if(el.isIntersecting)el.target.classList.add('vis');});},{threshold:.08});
  document.querySelectorAll('.rv:not(.vis)').forEach(el=>o.observe(el));
}
rvAll();

/* ═══ BAR CHARTS ═══ */
function animBars(){
  document.querySelectorAll('.bar-f').forEach(b=>{
    b.style.width='0';
    setTimeout(()=>{b.style.width=b.getAttribute('data-w')+'%';},100);
  });
}
animBars();

/* ═══ CAREER DATA ═══ */
const CAREERS=[
  {dept:'Engineering',title:'AI Workflow Architect',tags:['Make.com','Claude API','Remote'],
   desc:'Design, structure, and deploy intelligent workflow systems for operational clients across South African industries. You think in systems, not features. You build for scale, not for demos.',
   reqs:['2+ years experience with Make.com, Zapier, or n8n workflow platforms','Solid understanding of REST APIs and webhook-based integrations','Experience with AI language model APIs (Claude, OpenAI, or similar)','Ability to map and document business processes before building solutions','Strong communication skills — you explain complex systems simply and clearly'],
   role:'AI Workflow Architect'},
  {dept:'Engineering',title:'Automation Specialist',tags:['APIs','Airtable','Make.com','Remote'],
   desc:'Implement and maintain modular automation systems across client environments. You are precise, reliable, and understand that broken automation is worse than no automation.',
   reqs:['Hands-on experience building automations with no-code/low-code platforms','Comfortable with Airtable, Google Sheets, and cloud database structures','Solid understanding of JSON data structures and API calls','Methodical testing approach — you break things deliberately before they break in production','Available for client-facing technical handover sessions'],
   role:'Automation Specialist'},
  {dept:'Strategy',title:'Systems Analyst',tags:['Process Mapping','Consulting','Remote / Field'],
   desc:'Diagnose operational inefficiencies and translate business reality into structured system designs. You see what others overlook and communicate it with precision.',
   reqs:['Experience in business process mapping or operational consulting','Ability to conduct structured interviews with business owners and staff','Strong documentation skills — you write clear, specific system specifications','Understanding of automation principles even without deep technical coding background','South African informal business context knowledge is a strong advantage'],
   role:'Systems Analyst'},
  {dept:'Operations',title:'Operations Coordinator',tags:['Client Relations','Account Management','Remote'],
   desc:'Own client relationships through the deployment lifecycle. Ensure every system performs as designed and every client understands how to operate it.',
   reqs:['Experience in client-facing account management or operations roles','Comfortable running onboarding sessions and system training for non-technical users','Organised, detail-oriented approach to managing multiple client relationships simultaneously','Ability to identify upsell opportunities naturally through genuine client care','WhatsApp-native communication style — most client contact happens on WhatsApp'],
   role:'Operations Coordinator'},
];
function buildCareers(){
  const g=document.getElementById('careerGrid');
  if(!g)return;
  g.innerHTML=CAREERS.map((c,i)=>`
  <div class="crc rv${i>0?' d'+i:''}">
    <div class="cr-dept">${c.dept}</div>
    <div class="cr-title">${c.title}</div>
    <div class="cr-tags">${c.tags.map(t=>`<span class="cr-tag${t.includes('Remote')?' r':''}">${t}</span>`).join('')}</div>
    <div class="cr-dtog" onclick="togDesc(this,'${i}')" id="tog-${i}">
      <span class="arr">&#9658;</span> View Job Description &amp; Requirements
    </div>
    <div class="cr-desc" id="desc-${i}">${c.desc}</div>
    <div class="cr-reqs" id="reqs-${i}">
      <div class="cr-rt">Requirements</div>
      <ul class="cr-rl">${c.reqs.map(r=>`<li>${r}</li>`).join('')}</ul>
    </div>
    <div class="cr-as">
      <button class="cr-ab" onclick="openApply('${c.title}','${c.role}')">Apply for This Role &#8594;</button>
    </div>
  </div>`).join('');
}
buildCareers();
function togDesc(el,i){
  const d=document.getElementById('desc-'+i),r=document.getElementById('reqs-'+i);
  const open=el.classList.contains('open');
  el.classList.toggle('open',!open);
  d.style.display=open?'none':'block';
  r.style.display=open?'none':'block';
}

/* ═══ APPLY MODAL ═══ */
function openApply(title,role){
  document.getElementById('arolTitle').textContent=title;
  document.getElementById('ap-r').value=role;
  document.getElementById('applyModal').classList.add('open');
  document.getElementById('applyForm').style.display='';
  document.getElementById('applyOk').style.display='none';
  document.getElementById('cvFN').textContent='';
  document.body.style.overflow='hidden';
}
function closeApply(){
  document.getElementById('applyModal').classList.remove('open');
  document.body.style.overflow='';
}
document.getElementById('applyModal').addEventListener('click',function(e){if(e.target===this)closeApply();});
function cvSel(input){
  const file=input.files[0];
  if(file)document.getElementById('cvFN').textContent='✓ '+file.name;
}
function submitApply(e){
  e.preventDefault();
  const name=document.getElementById('ap-n').value;
  const email=document.getElementById('ap-e').value;
  const phone=document.getElementById('ap-p').value;
  const role=document.getElementById('ap-r').value;
  const why=document.getElementById('ap-w').value;
  const exp=document.getElementById('ap-x').value;
  const cv=document.getElementById('cvFile').files[0];
  const sub=encodeURIComponent('AutoSageAI Application: '+role+' — '+name);
  const body=encodeURIComponent(
    'AUTOSAGEAI JOB APPLICATION\n\nName: '+name+'\nEmail: '+email+'\nPhone: '+phone+
    '\nRole: '+role+'\n\nWhy AutoSageAI:\n'+why+'\n\nExperience:\n'+exp+
    (cv?'\n\nCV File: '+cv.name+' (please request if needed)':'\n\nNo CV uploaded'));
  window.open('mailto:tonybuthel@gmail.com?subject='+sub+'&body='+body,'_blank');
  setTimeout(()=>{
    const wa=encodeURIComponent('Hi Anthony, I just applied for the '+role+' role at AutoSageAI. My name is '+name+', email: '+email);
    window.open('https://wa.me/27660018931?text='+wa,'_blank');
  },900);
  document.getElementById('applyForm').style.display='none';
  document.getElementById('applyOk').style.display='block';
}

/* ═══ CONTACT FORM ═══ */
function submitCon(e){
  e.preventDefault();
  const name=document.getElementById('cf-n').value;
  const email=document.getElementById('cf-e').value;
  const phone=document.getElementById('cf-p').value;
  const biz=document.getElementById('cf-b').value;
  const challenge=document.getElementById('cf-c').value;
  const goal=document.getElementById('cf-g').value;
  const sub=encodeURIComponent('AutoSageAI Engagement Request — '+name);
  const body=encodeURIComponent(
    'AUTOSAGEAI ENGAGEMENT REQUEST\n\nName: '+name+'\nEmail: '+email+'\nPhone: '+phone+
    '\nBusiness: '+biz+'\n\nChallenge:\n'+challenge+'\n\n90-Day Goal:\n'+goal);
  window.open('mailto:tonybuthel@gmail.com?subject='+sub+'&body='+body,'_blank');
  setTimeout(()=>{
    const wa=encodeURIComponent('Hi AutoSageAI, I just submitted an engagement request.\nName: '+name+'\nBusiness: '+(biz||'Not specified'));
    window.open('https://wa.me/27660018931?text='+wa,'_blank');
  },900);
  document.getElementById('conForm').style.display='none';
  document.getElementById('conOk').style.display='block';
}

/* ═══ DISCOVERY ═══ */
const DQ=[
  {type:'opts',label:'Question 1 of 6',text:'What type of business do you run?',opts:['Car Dealership','Panel Beater / Auto Repair','Mechanic Workshop','Manufacturing / Factory','Retail Store','Professional Services','Executive / Personal','Other']},
  {type:'opts',label:'Question 2 of 6',text:'What is your biggest operational challenge right now?',opts:['Slow customer response times','Manual admin consuming hours daily','Missing leads and follow-ups','No online visibility','Disorganised data or records at risk','Staff stuck on repetitive tasks','Poor workflow visibility','All of the above']},
  {type:'opts',label:'Question 3 of 6',text:'How many people work in your business?',opts:['Just me','2–5 people','6–15 people','16–50 people','50+ people']},
  {type:'opts',label:'Question 4 of 6',text:'How much revenue do you estimate is lost monthly to inefficiency?',opts:['Under R5,000','R5,000–R15,000','R15,000–R40,000','R40,000–R100,000','More than R100,000','Not sure yet']},
  {type:'opts',label:'Question 5 of 6',text:'When do you want your AI system live?',opts:['ASAP — within 48 hours','Within 1 week','Within 2–4 weeks','Within 2–3 months','Just exploring options']},
  {type:'text',label:'Question 6 of 6',text:'In one sentence — what would change in your business if this problem was solved?',ph:'e.g. I could focus on growing instead of firefighting all day...'},
];
let DA=[],DS=0;
function buildDisco(){
  const prog=document.getElementById('dprog');
  const qw=document.getElementById('dqw');
  if(!prog||!qw)return;
  prog.innerHTML=DQ.map((_,i)=>`<div class="dpdot" id="dp-${i}"></div>`).join('')+'<div class="dpdot" id="dp-email"></div>';
  qw.innerHTML=DQ.map((q,i)=>`
  <div class="dq${i===0?' act':''}" id="dq-${i}">
    <div class="dql">${q.label}</div>
    <div class="dqt">${q.text}</div>
    ${q.type==='opts'?
      `<div class="dopts">${q.opts.map(o=>`<button class="dopt" onclick="dSel(this,${i},'${o.replace(/'/g,"\\'")}')">${o}</button>`).join('')}</div>
       <div class="dnav">${i>0?`<button class="dbk" onclick="dGo(${i-1})">← Back</button>`:''}
         <button class="dnxt" id="dnxt-${i}" onclick="dGo(${i+1})" disabled>Continue →</button></div>`:
      `<input class="dinp" type="text" id="dinp-${i}" placeholder="${q.ph}" oninput="dTxt(${i})">
       <div class="dnav"><button class="dbk" onclick="dGo(${i-1})">← Back</button>
         <button class="dnxt" id="dnxt-${i}" onclick="dGo(${i+1})" disabled>Continue →</button></div>`
    }
  </div>`).join('');
  updDots();
}
buildDisco();
function dSel(el,step,val){
  el.closest('.dopts').querySelectorAll('.dopt').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');DA[step]=val;
  document.getElementById('dnxt-'+step).disabled=false;
}
function dTxt(step){
  const v=document.getElementById('dinp-'+step).value.trim();
  DA[step]=v;document.getElementById('dnxt-'+step).disabled=v.length<3;
}
function dGo(next){
  if(next<0||next>DQ.length)return;
  document.querySelectorAll('.dq').forEach(q=>q.classList.remove('act'));
  if(next===DQ.length){
    document.getElementById('demail').style.display='block';
    document.getElementById('dqw').style.display='none';
  } else {
    document.getElementById('demail').style.display='none';
    document.getElementById('dqw').style.display='block';
    document.getElementById('dq-'+next).classList.add('act');
  }
  DS=next;updDots();
}
function updDots(){
  DQ.forEach((_,i)=>{const d=document.getElementById('dp-'+i);if(!d)return;d.className='dpdot'+(i<DS?' done':i===DS?' act':'');});
  const de=document.getElementById('dp-email');
  if(de)de.className='dpdot'+(DS>=DQ.length?' act':'');
}
function submitDisco(){
  const name=document.getElementById('dname').value.trim();
  const email=document.getElementById('demail2').value.trim();
  if(!email){alert('Please enter your email so we can send your blueprint.');return;}
  const sub=encodeURIComponent('AutoSageAI New Lead: '+name);
  const body=encodeURIComponent(
    'NEW AUTOSAGEAI LEAD\n\nName: '+name+'\nEmail: '+email+'\n\n'+
    'Discovery Answers:\n'+DQ.map((q,i)=>q.text+'\n→ '+(DA[i]||'Skipped')).join('\n\n'));
  window.open('mailto:tonybuthel@gmail.com?subject='+sub+'&body='+body,'_blank');
  document.getElementById('demail').style.display='none';
  document.getElementById('dqw').style.display='none';
  document.getElementById('dprog').style.display='none';
  document.getElementById('ddone').style.display='block';
  document.getElementById('dMainH').style.display='none';
  document.getElementById('dMainS').style.display='none';
}

/* ═══ CHAT ═══ */
let chatOpen=false;
const T=()=>new Date().toLocaleTimeString('en-ZA',{hour:'2-digit',minute:'2-digit'});
function togChat(){
  chatOpen=!chatOpen;
  document.getElementById('chatModal').classList.toggle('open',chatOpen);
  if(chatOpen)document.getElementById('chatBadge').classList.add('hid');
}
const BOT={
  services:["AutoSageAI operates across four disciplines:\n\n01 — Operational Structuring\nDesigning clear system flows for predictable execution.\n\n02 — Automation Deployment\nModular systems that reduce manual dependency and increase speed.\n\n03 — Intelligence Coordination\nAligning AI outputs with human decision-making.\n\n04 — Workflow Optimisation\nRestructuring processes for maximum performance.","Which discipline fits your situation best?"],
  process:["Five structured stages:\n\n01 Discovery\n02 Diagnostic Mapping\n03 System Design\n04 Build & Deployment\n05 Optimisation\n\nWe begin with structure — not technology. Every step is documented before we build.","Ready to begin? Click Get Started in the navigation."],
  timeline:["Delivery times:\n\n⚡ Basic automation — 48 hours live\n🔨 Complex operational builds — 14 days\n\nEvery engagement begins with a diagnostic consultation scheduled within 48 hours of submission.","Would you like to start the engagement?"],
  cases:["Five verified operational deployments:\n\n🚗 Car Dealership — Communication workflow restructuring\n🔧 Mechanic Workshop — Job tracking automation\n🔨 Panel Beater — Repair workflow visibility\n🏭 Factory — Production coordination systems\n👤 Executive PA — Scheduling and communication automation\n\nEvery system was structured before it was automated.","Which case is most relevant to your business?"],
  started:["To begin:\n\n1. Click 'Get Started' in the navigation bar\n2. Answer 6 quick questions\n3. We send your personalised blueprint within 2 hours\n\nOr reach Anthony directly via the Contact page.","Ready to get your blueprint?"],
  default:["AutoSageAI is a coordination system that aligns people, processes, and intelligent automation into one synchronised operational flow.\n\nFor direct contact, use the Contact page — we respond within 24 hours.","Is there a specific operational challenge I can help clarify?"],
};
function addMsg(t,tp){
  const m=document.getElementById('chatMsgs');
  const d=document.createElement('div');d.className='msg '+tp;
  d.innerHTML=t.replace(/\n/g,'<br>')+'<div class="msg-t">'+T()+'</div>';
  m.appendChild(d);m.scrollTop=m.scrollHeight;
}
function qS(q){document.getElementById('chatQ').style.display='none';addMsg(q,'usr');procBot(q);}
function sendChat(){const i=document.getElementById('chatInput'),v=i.value.trim();if(!v)return;i.value='';addMsg(v,'usr');procBot(v);}
function procBot(m){
  const ty=document.getElementById('chatTyp');ty.classList.add('show');
  const ml=m.toLowerCase();
  let k='default';
  if(ml.includes('service')||ml.includes('offer')||ml.includes('what do'))k='services';
  else if(ml.includes('process')||ml.includes('how')||ml.includes('method')||ml.includes('work'))k='process';
  else if(ml.includes('fast')||ml.includes('time')||ml.includes('48')||ml.includes('14')||ml.includes('deliver'))k='timeline';
  else if(ml.includes('case')||ml.includes('example')||ml.includes('result')||ml.includes('client'))k='cases';
  else if(ml.includes('start')||ml.includes('begin')||ml.includes('ready')||ml.includes('contact'))k='started';
  let d=1000;BOT[k].forEach((r,i)=>{setTimeout(()=>{if(i===0)ty.classList.remove('show');addMsg(r,'bot');},d);d+=850;});
}

/* INIT */
gP('home');

/* ═══ CATALOGUE FUNCTIONS ═══ */
// ── TAB SWITCH ──
function switchTab(t){
  document.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
  document.getElementById('panel-'+t).classList.add('active');
  document.getElementById('btn-auto').className='ntab'+(t==='auto'?' active-auto':'');
  document.getElementById('btn-digi').className='ntab'+(t==='digi'?' active-digi':'');
  window.scrollTo({top:0,behavior:'smooth'});
}

// ── CATEGORY FILTER ──
function filterCat(tab,cat,btn){
  var panel=document.getElementById('panel-'+tab);
  var isAuto=tab==='auto';
  panel.querySelectorAll('.cfbtn').forEach(b=>{b.className=b.className.replace(' fa','').replace(' fd','')});
  btn.className+=(isAuto?' fa':' fd');
  var prefix=isAuto?'auto-':'digi-';
  panel.querySelectorAll('.cat-sec').forEach(s=>{
    if(cat==='all'){s.classList.remove('hidden')}
    else if(s.id===prefix+cat){s.classList.remove('hidden');setTimeout(()=>s.scrollIntoView({behavior:'smooth',block:'start'}),60)}
    else{s.classList.add('hidden')}
  });
}

// ── LEAD FORM ──
var A={};
function selOpt(b){
  var s=b.dataset.s;
  document.querySelectorAll('[data-s="'+s+'"]').forEach(x=>x.classList.remove('sel'));
  b.classList.add('sel');
  A['s'+s]=b.dataset.v;
}
function setDots(n){for(var i=1;i<=3;i++){document.getElementById('lp'+i).className='lp'+(i<=n?' done':'')}}
function nextStep(to){
  var from=to-1;
  if(!A['s'+from]){document.querySelectorAll('[data-s="'+from+'"]')[0].click()}
  document.getElementById('ls'+from).classList.remove('on');
  document.getElementById('ls'+to).classList.add('on');
  setDots(to);
}
function prevStep(to){
  var from=to+1;
  document.getElementById('ls'+from).classList.remove('on');
  document.getElementById('ls'+to).classList.add('on');
  setDots(to);
}
function showResult(){
  if(!A.s3)A.s3='mid';
  var r=getRec(A.s1||'small',A.s2||'leads',A.s3);
  document.getElementById('rn').innerHTML=r.name;
  document.getElementById('rs').innerHTML=r.sub;
  document.getElementById('rp').innerHTML='<span class="res-pp s">'+r.setup+' setup</span>'+(r.mo?'<span class="res-pp m">'+r.mo+'/mo</span>':'');
  document.getElementById('rw').innerHTML=r.why;
  document.getElementById('rwa').href='https://wa.me/27660018931?text='+encodeURIComponent('Hi! Package finder recommended: '+r.name+' ('+r.setup+'). Can we chat?');
  document.getElementById('ls3').classList.remove('on');
  document.getElementById('lf-res').classList.add('show');
  setDots(3);
}
function getRec(sz,ch,bu){
  if(sz==='multi')return{name:'Operations OS',sub:'Your entire business from one proprietary system',setup:'R59,999 – R180,000+',mo:'R4,999 – R12,000',why:'Multi-location businesses need a single source of truth. A custom Operations OS gives you one system, your rules, running everything in real time.'};
  if(bu==='ent'){
    if(ch==='leads'||ch==='communication')return{name:'Full Digital Workforce',sub:'Near-full automation — scale without hiring',setup:'R14,999 – R29,999',mo:'R2,999 – R6,999',why:'With serious budget and a customer communication challenge, a full AI team handles service, sales, inventory and admin — 24/7, no extra headcount.'};
    return{name:'Full Operations Automation',sub:'We automate how your entire business operates',setup:'R49,999 – R120,000+',mo:'R3,999 – R9,999',why:'Established businesses with complex admin need enterprise-grade automation spanning departments with real-time executive dashboards.'};
  }
  if(sz==='established'){
    if(ch==='visibility')return{name:'Workflow Manager',sub:'Control how work flows through your business',setup:'R19,999 – R49,999',mo:'R1,999 – R4,999',why:"You need one system that shows exactly what's happening in real time — every job, client, order and status tracked automatically."};
    if(ch==='admin')return{name:'Business Automation Engine',sub:'Your business runs even when you\'re offline',setup:'R14,999 – R39,999',mo:'R1,499 – R3,999',why:'For established businesses drowning in cross-department admin, a connected automation stack eliminates repetitive work so your team can focus on growth.'};
    return{name:'Sales Assistant System',sub:'Automated selling, upselling & lead gen — 24/7',setup:'R4,999 – R9,999',mo:'R999 – R1,999',why:'Established businesses with good traffic but poor conversion need automated selling agents that qualify, follow up and close — missing zero leads.'};
  }
  if(sz==='growing'){
    if(bu==='high')return{name:'Automation App',sub:'Automate operations and capture every customer',setup:'R14,999 – R39,999',mo:'R999 – R2,999',why:'Growing teams need a proper operational app — not just a website. Login management, booking/order systems, AI chatbot and owner dashboard in one place.'};
    if(ch==='admin')return{name:'Process Fixer',sub:'Remove daily repetitive admin tasks — once and forever',setup:'R3,999 – R9,999',mo:'R499 – R999',why:'Growing businesses get stuck in admin loops. A Process Fixer automates lead responses, booking confirmations and daily tasks permanently.'};
    return{name:'Sales Assistant System',sub:'Automated selling, upselling & lead gen — 24/7',setup:'R4,999 – R9,999',mo:'R999 – R1,999',why:'For growing businesses missing leads, a WhatsApp AI agent qualifies prospects, answers questions and captures details — 24/7, automatically.'};
  }
  if(bu==='low')return{name:'Smart Reception',sub:'Your business answers every customer — 24/7',setup:'R1,499 – R2,999',mo:'R299 – R599',why:'For small businesses starting with automation, Smart Reception is the highest-ROI entry. One AI agent answers every WhatsApp message — even at 2am.'};
  return{name:'Smart Reception',sub:'Your business answers every customer — 24/7',setup:'R1,499 – R2,999',mo:'R299 – R599',why:'The fastest fix for missed leads: an AI agent that responds to every WhatsApp in under 60 seconds — 24/7, zero manual effort.'};
}
function restartForm(){
  A={};
  document.getElementById('lf-res').classList.remove('show');
  document.querySelectorAll('.lf-step').forEach(s=>s.classList.remove('on'));
  document.querySelectorAll('.lf-opt').forEach(b=>b.classList.remove('sel'));
  document.getElementById('ls1').classList.add('on');
  setDots(1);
}

// ── CATALOGUE SCROLL ANIMATIONS (bind when page becomes visible) ──
var _catObs = null;
function initCatalogueAnims(){
  var root = document.getElementById('page-catalogue');
  if(!root) return;
  if(_catObs){_catObs.disconnect();}
  _catObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){
        e.target.style.opacity='1';
        e.target.style.transform='translateY(0)';
        _catObs.unobserve(e.target);
      }
    });
  },{threshold:0.06});
  root.querySelectorAll('.pc,.cat-head,.intro-block,.lead-form').forEach(function(el){
    el.style.opacity='0';
    el.style.transform='translateY(14px)';
    el.style.transition='opacity .5s ease,transform .5s ease';
    _catObs.observe(el);
  });
}
// ─// ── TERMS & CONDITIONS INJECTION v2 ──────────────────────────────────────────
(function(){

  // ── PAGE DATA ────────────────────────────────────────────────────────────────
  var PAGES = {
    tc: {
      badge: 'Legal Agreement',
      title: 'Terms & Conditions',
      subtitle: 'Please read these terms carefully before purchasing any product or service from AutoSageAI. By proceeding with any purchase or engagement, you agree to all terms set out below.',
      effective: 'Effective Date: 1 June 2026 · AutoSageAI (Pty) Ltd',
      sections: [
        ['1','Services Provided','AutoSageAI provides digital business solutions including AI-powered websites, AI automation systems and WhatsApp agents, business workflow automation, digital marketing, custom software development, subscription-based hosting, maintenance and SEO services, and domain registration and Google Business Profile management. All services are delivered digitally unless otherwise agreed in writing.'],
        ['2','Subscription Packages','Subscription fees are charged automatically on your selected billing cycle. Monthly subscriptions renew automatically unless cancelled before the next billing date. Annual subscriptions renew automatically unless cancelled before the renewal date. Pricing may change with 30 days prior written notice to existing customers. Failure of payment may result in immediate suspension or termination of service.'],
        ['3','Service Delivery Timeline','Basic websites are delivered within <span style="color:#FFB300;font-weight:600;">24–72 hours</span> of receiving all required content. Basic automation systems are deployed within <span style="color:#FFB300;font-weight:600;">48 hours</span>. Full operational builds take up to <span style="color:#FFB300;font-weight:600;">14 days</span>. Timelines are good-faith estimates, not guaranteed completion dates. Delays caused by the client\'s failure to provide required information, approvals, or content will extend timelines accordingly and do not constitute a breach by AutoSageAI.<br><br><div style="background:rgba(79,195,247,.05);border-left:3px solid #4FC3F7;padding:12px 16px;border-radius:0 8px 8px 0;font-size:13px;margin-top:12px;"><strong style="color:#4FC3F7;">Note:</strong> DNS propagation for newly registered domains takes 2–24 hours and is an automatic internet process entirely outside of AutoSageAI\'s control. This does not constitute a delay in service delivery.</div>'],
        ['4','Refund Policy','Please refer to our <a href="#" onclick="switchPage(\'refund\');return false;" style="color:#4FC3F7;">Refund Policy</a> for full details on refund eligibility, conditions, and the request process.'],
        ['5','Cancellation Policy','Please refer to our <a href="#" onclick="switchPage(\'cancel\');return false;" style="color:#4FC3F7;">Cancellation Policy</a> for full details on how to cancel subscription services and the conditions that apply.'],
        ['6','Customer Responsibilities','Customers agree to: provide accurate and complete business information and content when requested; respond promptly during active project development (within 48 hours); supply all required content, branding materials, credentials, and approvals when requested; use all AutoSageAI services legally, ethically, and in full compliance with South African law; and not use AutoSageAI platforms or systems for any unlawful, harmful, fraudulent, or deceptive purpose.'],
        ['7','Intellectual Property','All custom work including websites, content, and design becomes the customer\'s property upon <strong style="color:#fff;">receipt of final payment in full</strong>. Proprietary systems, frameworks, automation engines, and methodologies developed by AutoSageAI remain the exclusive intellectual property of AutoSageAI. Customers may not resell, sublicense, reverse-engineer, or redistribute AutoSageAI\'s proprietary systems or frameworks without prior written consent.'],
        ['8','Payment Processing','All payments are processed through approved third-party payment processors including PayFast. AutoSageAI does not store, access, or retain any customer banking or card details. All payment data is handled exclusively by the respective payment processor in accordance with their security standards and privacy policies. Accepted payment methods include EFT, bank transfer, and PayFast.'],
        ['9','Limitation of Liability','AutoSageAI shall not be liable for any indirect, incidental, or consequential loss or damage arising from third-party software outages, hosting provider failures, DNS propagation delays, payment processor issues, or losses resulting from misuse of our services. AutoSageAI\'s total aggregate liability to any customer is limited to the total amount paid by that customer for the specific service giving rise to the claim.'],
        ['10','Fraud Prevention','AutoSageAI reserves the right to refuse, reverse, or void any transaction it reasonably suspects to be fraudulent, to verify customer identity prior to processing, to cancel fraudulent orders without refund, and to report suspected fraud to the South African Police Service or relevant financial authorities.'],
        ['11','Governing Law','These Terms and Conditions are governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising from these terms shall be subject to the jurisdiction of the South African courts.'],
        ['12','Changes to These Terms','AutoSageAI reserves the right to update or amend these Terms at any time. Updated versions will be published on our website and take effect immediately upon publication. Continued use of our services following any update constitutes your acceptance of the revised Terms.'],
        ['13','Contact','For questions, disputes, or support: <strong style="color:#fff;">Email:</strong> <a href="mailto:tonybuthel@gmail.com" style="color:#4FC3F7;">tonybuthel@gmail.com</a> &nbsp;·&nbsp; <strong style="color:#fff;">WhatsApp:</strong> <a href="https://wa.me/27660018931" style="color:#4FC3F7;">066 001 8931</a> &nbsp;·&nbsp; <strong style="color:#fff;">Location:</strong> Johannesburg, South Africa']
      ]
    },
    refund: {
      badge: 'Refund Policy',
      title: 'Refund Policy',
      subtitle: 'At AutoSageAI we strive to deliver high-quality digital services. We take every engagement seriously and are committed to client satisfaction. Refund requests are reviewed fairly and in good faith.',
      effective: 'Effective Date: 1 June 2026 · AutoSageAI (Pty) Ltd',
      sections: [
        ['1','Refund Eligibility','A refund request may be considered under the following conditions:<br><br>• The request is submitted within <strong style="color:#FFB300;">7 calendar days</strong> of confirmed service delivery<br>• The customer clearly explains in writing why the delivered work is unsatisfactory<br>• The customer allows AutoSageAI a reasonable opportunity to correct or revise the issue before a refund is approved<br>• The delivered work materially differs from what was agreed in writing, or quality falls substantially below the agreed standard'],
        ['2','Refund Request Process','To submit a refund request:<br><br>1. Contact us within 7 days of delivery via email or WhatsApp<br>2. Clearly describe the issue and how the work differs from what was agreed<br>3. Allow us 48–72 hours to review and respond<br>4. If a correction is offered, allow reasonable time for it to be completed before escalating to a refund<br><br><strong style="color:#fff;">Email:</strong> <a href="mailto:tonybuthel@gmail.com" style="color:#4FC3F7;">tonybuthel@gmail.com</a><br><strong style="color:#fff;">WhatsApp:</strong> <a href="https://wa.me/27660018931" style="color:#4FC3F7;">066 001 8931</a>'],
        ['3','Non-Refundable Situations','Refunds will <strong style="color:#e53935;">NOT</strong> be approved in the following circumstances:<br><br>• Work has been fully reviewed and approved by the customer<br>• The customer changes project scope or requirements after work has commenced<br>• Delays were caused by the customer\'s failure to provide required materials, content, or approvals<br>• Subscription fees already consumed during an active service period<br>• Fully completed custom development work that has been approved by the client<br>• Digital products, source code, or completed automation systems that have been delivered and accepted<br>• The customer changes their mind after work has already begun<br>• DNS propagation delays, third-party platform outages, or payment processor issues occurring after correct setup by AutoSageAI'],
        ['4','PayFast Payments','Payments processed through PayFast are subject to PayFast\'s own terms and refund policies in addition to AutoSageAI\'s refund policy. In the event of a chargeback or payment dispute initiated through PayFast, AutoSageAI reserves the right to suspend all active services pending resolution. Fraudulent chargebacks will be reported to the relevant authorities.'],
        ['5','Refund Processing','Approved refunds will be processed within <strong style="color:#fff;">5–10 business days</strong> of approval confirmation. Refunds are returned via the original payment method where possible. AutoSageAI is not responsible for delays caused by banking institutions or payment processors after a refund has been initiated.']
      ]
    },
    cancel: {
      badge: 'Cancellation Policy',
      title: 'Cancellation Policy',
      subtitle: 'AutoSageAI offers flexible subscription services. This policy explains how to cancel, when cancellations take effect, and what happens to payments already processed.',
      effective: 'Effective Date: 1 June 2026 · AutoSageAI (Pty) Ltd',
      sections: [
        ['1','How to Cancel','To cancel any AutoSageAI subscription or service, submit your cancellation request in writing via:<br><br><strong style="color:#fff;">Email:</strong> <a href="mailto:tonybuthel@gmail.com" style="color:#4FC3F7;">tonybuthel@gmail.com</a><br><strong style="color:#fff;">WhatsApp:</strong> <a href="https://wa.me/27660018931" style="color:#4FC3F7;">066 001 8931</a><br><br>Verbal or informal cancellations are not accepted. All cancellations must be confirmed in writing and acknowledged by AutoSageAI to take effect.'],
        ['2','Monthly Subscriptions','Monthly subscriptions must be cancelled <strong style="color:#FFB300;">before the next billing date</strong> to avoid being charged for the following month. Cancellations received after billing has already processed for the next period will take effect at the end of that period. No partial-month refunds are provided.'],
        ['3','Annual Subscriptions','Annual subscriptions must be cancelled <strong style="color:#FFB300;">before the annual renewal date</strong> to prevent automatic renewal. Cancellation of an annual subscription mid-term does not entitle the customer to a pro-rata refund of the unused portion unless otherwise agreed in writing at the time of purchase.'],
        ['4','Effect of Cancellation','Cancellation stops all future billing from the effective cancellation date. Cancellation does not entitle the customer to a refund of any payments already processed. All services delivered and work completed prior to the cancellation date remain payable in full and are subject to the Refund Policy. Upon cancellation, AutoSageAI may suspend access to platforms, dashboards, or systems provided as part of the subscription.'],
        ['5','Active Services at Cancellation','Any active services in progress at the time of cancellation will be handled as follows:<br><br>• Work already completed and delivered remains payable<br>• Work in progress will be paused — the customer may choose to pay for work completed to date or forfeit it<br>• AutoSageAI will provide a written breakdown of work completed versus outstanding within 5 business days of cancellation'],
        ['6','Reactivation','Cancelled subscriptions may be reactivated at the then-current pricing. AutoSageAI does not guarantee that previously cancelled services can be restored at the original price or with the same configuration.']
      ]
    }
  };

  // ── BUILD OVERLAY ─────────────────────────────────────────────────────────────
  var overlay = document.createElement('div');
  overlay.id = 'tc-overlay';
  overlay.style.cssText = 'display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,8,.93);backdrop-filter:blur(12px);overflow-y:auto;';
  overlay.innerHTML = `
    <div style="max-width:820px;margin:0 auto;padding:24px 16px 60px;font-family:'Space Grotesk',sans-serif;">
      <div style="position:sticky;top:0;z-index:10;background:rgba(0,0,8,.97);border-bottom:1px solid rgba(176,190,197,.12);padding:14px 0;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-family:'Orbitron',sans-serif;font-size:12px;font-weight:700;color:#fff;letter-spacing:1px;">AutoSageAI</div>
          <div id="tc-header-sub" style="font-size:10px;color:#4FC3F7;letter-spacing:2px;text-transform:uppercase;margin-top:2px;">Legal Documents</div>
        </div>
        <button id="tc-close" style="background:transparent;border:1px solid rgba(176,190,197,.3);color:#b0bec5;font-size:18px;width:36px;height:36px;border-radius:6px;cursor:pointer;flex-shrink:0;">✕</button>
      </div>
      <div style="display:flex;gap:8px;margin:20px 0 28px;flex-wrap:wrap;">
        <button class="tc-tab" data-page="tc" style="flex:1;min-width:120px;padding:10px 8px;background:rgba(79,195,247,.12);border:1px solid rgba(79,195,247,.3);color:#4FC3F7;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:8px;cursor:pointer;">Terms &amp; Conditions</button>
        <button class="tc-tab" data-page="refund" style="flex:1;min-width:120px;padding:10px 8px;background:transparent;border:1px solid rgba(176,190,197,.2);color:#b0bec5;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:8px;cursor:pointer;">Refund Policy</button>
        <button class="tc-tab" data-page="cancel" style="flex:1;min-width:120px;padding:10px 8px;background:transparent;border:1px solid rgba(176,190,197,.2);color:#b0bec5;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;border-radius:8px;cursor:pointer;">Cancellation Policy</button>
      </div>
      <div id="tc-content"></div>
      <div style="background:rgba(79,195,247,.05);border:1px solid rgba(79,195,247,.15);border-radius:12px;padding:24px;text-align:center;margin-top:36px;">
        <h3 style="font-family:'Orbitron',sans-serif;font-size:13px;color:#fff;margin-bottom:8px;">Questions about our policies?</h3>
        <p style="font-size:13px;color:#b0bec5;margin-bottom:16px;">We respond within 24 hours.</p>
        <a href="https://wa.me/27660018931?text=Hi%20AutoSageAI%2C%20I%20have%20a%20question%20about%20your%20policies" target="_blank" style="display:inline-block;padding:11px 26px;background:#4FC3F7;color:#000008;font-weight:700;font-size:13px;border-radius:8px;text-decoration:none;">WhatsApp Us Now</a>
      </div>
      <div style="text-align:center;padding:24px 0 0;margin-top:24px;border-top:1px solid rgba(176,190,197,.1);">
        <p style="color:#78909c;font-size:12px;margin-bottom:8px;">© 2026 AutoSageAI · Structured Intelligence. Delivered.</p>
        <button id="tc-close2" style="background:transparent;border:1px solid rgba(176,190,197,.25);color:#b0bec5;font-size:12px;padding:7px 18px;border-radius:6px;cursor:pointer;">Close</button>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  // ── RENDER PAGE ───────────────────────────────────────────────────────────────
  function renderPage(key){
    var p = PAGES[key];
    var html = '<div style="text-align:center;padding:32px 0 28px;border-bottom:1px solid rgba(176,190,197,.1);margin-bottom:4px;">'
      +'<div style="display:inline-block;background:rgba(79,195,247,.1);border:1px solid rgba(79,195,247,.2);color:#4FC3F7;font-size:11px;font-weight:700;letter-spacing:3px;padding:5px 14px;border-radius:20px;text-transform:uppercase;margin-bottom:14px;">'+p.badge+'</div>'
      +'<h2 style="font-family:\'Orbitron\',sans-serif;font-size:clamp(18px,4vw,28px);font-weight:700;color:#fff;margin-bottom:10px;">'+p.title+'</h2>'
      +'<p style="color:#b0bec5;font-size:14px;max-width:600px;margin:0 auto;line-height:1.6;">'+p.subtitle+'</p>'
      +'<div style="margin-top:10px;font-size:12px;color:#78909c;">'+p.effective+'</div></div>';
    p.sections.forEach(function(s){
      html += '<div style="padding:24px 0;border-bottom:1px solid rgba(176,190,197,.08);">'
        +'<h3 style="font-family:\'Orbitron\',sans-serif;font-size:11px;font-weight:700;color:#4FC3F7;letter-spacing:1px;text-transform:uppercase;margin-bottom:12px;display:flex;align-items:center;gap:10px;">'
        +'<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:rgba(79,195,247,.12);border:1px solid rgba(79,195,247,.25);font-size:10px;flex-shrink:0;">'+s[0]+'</span>'+s[1]+'</h3>'
        +'<p style="margin:0;font-size:14px;color:#b0bec5;line-height:1.75;">'+s[2]+'</p></div>';
    });
    document.getElementById('tc-content').innerHTML = html;
    document.getElementById('tc-header-sub').textContent = p.title;
    document.querySelectorAll('.tc-tab').forEach(function(btn){
      var active = btn.getAttribute('data-page') === key;
      btn.style.background = active ? 'rgba(79,195,247,.12)' : 'transparent';
      btn.style.border = active ? '1px solid rgba(79,195,247,.3)' : '1px solid rgba(176,190,197,.2)';
      btn.style.color = active ? '#4FC3F7' : '#b0bec5';
    });
    overlay.scrollTop = 0;
  }

  window.switchPage = function(key){ renderPage(key); };

  document.querySelectorAll('.tc-tab').forEach(function(btn){
    btn.addEventListener('click', function(){ renderPage(this.getAttribute('data-page')); });
  });

  renderPage('tc');

  // ── CLOSE HANDLERS ────────────────────────────────────────────────────────────
  function closeTC(){ overlay.style.display='none'; document.body.style.overflow=''; }
  document.getElementById('tc-close').onclick = closeTC;
  document.getElementById('tc-close2').onclick = closeTC;
  overlay.addEventListener('click', function(e){ if(e.target===this) closeTC(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') closeTC(); });

  // ── GLOBAL OPEN ───────────────────────────────────────────────────────────────
  window.openTerms = function(e, page){
    if(e) e.preventDefault();
    renderPage(page||'tc');
    overlay.style.display='block';
    document.body.style.overflow='hidden';
  };

  // ── FOOTER LINKS ──────────────────────────────────────────────────────────────
  function addFooterLinks(){
    document.querySelectorAll('.ftlinks').forEach(function(fl){
      if(!fl.querySelector('.tc-ftl')){
        var div = document.createElement('div');
        div.className = 'ftl tc-ftl';
        div.style.cursor = 'pointer';
        div.textContent = 'Legal';
        div.onclick = function(){ window.openTerms(null,'tc'); };
        fl.appendChild(div);
      }
    });
  }
  if(document.readyState==='complete'||document.readyState==='interactive'){ addFooterLinks(); }
  else { document.addEventListener('DOMContentLoaded', addFooterLinks); }

})();
// ── END LEGAL INJECTION v2 ────────────────────────────────────────────────────
// ── PORTFOLIO PAGE INJECTION ──────────────────────────────────────────────────
(function(){

  var SITES = [
    {url:'mmagha-final-website.vercel.app', live:'https://mmagha-final-website.vercel.app/', iframe:true,
     tag:'Automotive · Vereeniging', name:'MMAGHA Auto Mags, Rims &amp; Tyres',
     desc:'Full service site for a Vaal Triangle wheel &amp; tyre workshop — service catalogue, gallery, blog, and WhatsApp-first contact flow.'},
    {url:'fmdelectrical.co.za', live:'https://fmdelectrical.co.za/', iframe:false, icon:'⚡', label:'FMD Electrical',
     tag:'Electrical · Solar · Security', name:'FMD Electrical (Pty) Ltd',
     desc:'Custom domain build for a Vereeniging electrical, solar, and security specialist — credentials, services, and direct-call CTAs front and center.'},
    {url:'mammies-beauty-palace.vercel.app', live:'https://mammies-beauty-palace.vercel.app/', iframe:true,
     tag:'Beauty &amp; Wellness', name:"Mammie's Beauty Palace",
     desc:'Luxury-positioned beauty salon site covering hair, nails, facials, brows &amp; lashes, and body treatments — built around WhatsApp bookings.'},
    {url:'dynamicspecs-files.vercel.app', live:'https://dynamicspecs-files.vercel.app/', iframe:true,
     tag:'Healthcare · Optometry', name:'Dynamicspecs Optometrists',
     desc:'Professional practice site for an optometrist in Vanderbijlpark CBD — clear service info and easy ways for patients to get in touch.'},
    {url:'bob-hardware.vercel.app', live:'https://bob-hardware.vercel.app/', iframe:true,
     tag:'Hardware &amp; Building Materials', name:"Bob's Hardware",
     desc:'Full e-commerce-style catalogue site for a Vaal Region hardware store — product categories, offers, and a built-in WhatsApp chat assistant for quotes.'},
    {url:'mobbed-funeral-parlor.vercel.app', live:'https://mobbed-funeral-parlor.vercel.app/', iframe:true,
     tag:'Memorial Services', name:'Mobbed Funeral Parlor',
     desc:'A dignified, calm digital presence for a funeral services provider — built for families to find information and reach the team without friction.'}
  ];

  function cardHTML(s){
    var preview = s.iframe
      ? '<iframe src="'+s.live+'" loading="lazy" style="width:250%;height:850px;border:0;transform:scale(0.4);transform-origin:top left;pointer-events:none;"></iframe>'
      : '<div style="position:static;height:100%;background:linear-gradient(160deg,#0c1420,#0a0f18);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;color:#90a4ae;font-size:13px;text-align:center;padding:20px;">'
        +'<span style="font-size:1.8rem;">'+s.icon+'</span>'
        +'<span style="color:#fff;font-weight:600;font-size:1rem;">'+s.label+'</span>'
        +'<span>This site blocks in-page previews<br>for security — view it directly.</span>'
        +'<a href="'+s.live+'" target="_blank" rel="noopener" style="color:#FFB300;font-weight:600;font-size:.85rem;border:1px solid rgba(255,179,0,.4);padding:8px 18px;border-radius:6px;margin-top:4px;">Open Site →</a></div>';
    return '<div style="background:#0d1420;border:1px solid rgba(176,190,197,.12);border-radius:14px;overflow:hidden;transition:border-color .25s ease,transform .25s ease;">'
      +'<div style="display:flex;align-items:center;gap:10px;padding:12px 16px;background:#101826;border-bottom:1px solid rgba(176,190,197,.1);">'
      +'<div style="display:flex;gap:6px;"><span style="width:9px;height:9px;border-radius:50%;background:#2a3441;display:inline-block;"></span><span style="width:9px;height:9px;border-radius:50%;background:#2a3441;display:inline-block;"></span><span style="width:9px;height:9px;border-radius:50%;background:#2a3441;display:inline-block;"></span></div>'
      +'<div style="flex:1;font-family:\'Space Grotesk\',monospace;font-size:11px;color:#90a4ae;background:rgba(0,0,0,.3);padding:5px 10px;border-radius:5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+s.url+'</div>'
      +'<span style="width:7px;height:7px;border-radius:50%;background:#3DDC84;flex-shrink:0;"></span></div>'
      +'<div style="position:relative;width:100%;height:280px;overflow:hidden;background:#000;">'+preview+'</div>'
      +'<div style="padding:20px 22px 24px;">'
      +'<div style="font-family:\'Space Grotesk\',monospace;font-size:11px;color:#4FC3F7;text-transform:uppercase;letter-spacing:.08em;">'+s.tag+'</div>'
      +'<h3 style="font-size:18px;margin-top:8px;font-weight:600;color:#fff;font-family:\'Orbitron\',sans-serif;">'+s.name+'</h3>'
      +'<p style="color:#90a4ae;font-size:13.5px;margin-top:8px;line-height:1.6;">'+s.desc+'</p>'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-top:18px;">'
      +'<a href="'+s.live+'" target="_blank" rel="noopener" style="font-size:13px;font-weight:600;color:#FFB300;display:flex;align-items:center;gap:6px;">Open Live Site →</a>'
      +'<span style="font-size:11px;color:#90a4ae;font-family:\'Space Grotesk\',monospace;">Live</span></div></div></div>';
  }

  function buildPage(){
    var cards = SITES.map(cardHTML).join('');
    var page = document.createElement('div');
    page.className = 'page';
    page.id = 'page-portfolio';
    page.style.cssText = 'display:none;';
    page.innerHTML =
      '<div style="position:sticky;top:0;z-index:40;display:flex;justify-content:space-between;align-items:center;padding:14px 6%;background:rgba(0,0,8,.9);backdrop-filter:blur(12px);border-bottom:1px solid rgba(176,190,197,.1);">'
      +'<button onclick="gP(\'home\')" style="padding:8px 14px;border-radius:24px;background:rgba(79,195,247,.08);border:1px solid rgba(79,195,247,.25);color:#4FC3F7;font-family:\'Space Grotesk\',sans-serif;font-weight:600;font-size:13px;cursor:pointer;">← Back to Home</button>'
      +'<a href="https://wa.me/27660018931?text=Hi%2C%20I%27m%20browsing%20the%20portfolio" target="_blank" style="padding:8px 14px;border-radius:24px;background:#25d366;color:#fff;font-family:\'Space Grotesk\',sans-serif;font-weight:700;font-size:13px;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">WhatsApp</a></div>'

      +'<section style="padding:60px 6% 50px;max-width:1100px;">'
      +'<div style="font-family:\'Space Grotesk\',monospace;font-size:11px;color:#FFB300;letter-spacing:.12em;text-transform:uppercase;display:flex;align-items:center;gap:10px;margin-bottom:22px;"><span style="width:7px;height:7px;border-radius:50%;background:#3DDC84;display:inline-block;"></span>6 live builds · Vaal Triangle &amp; beyond</div>'
      +'<h1 style="font-family:\'Orbitron\',sans-serif;font-size:clamp(28px,5.5vw,46px);font-weight:700;line-height:1.1;color:#fff;max-width:780px;">Websites that turn <span style="background:linear-gradient(90deg,#FFB300,#FFD54F);-webkit-background-clip:text;background-clip:text;color:transparent;">missed calls</span> into booked customers.</h1>'
      +'<p style="margin-top:22px;font-size:16px;color:#90a4ae;max-width:580px;line-height:1.65;">A working portfolio of sites built and shipped for South African small businesses — auto parts, electrical, beauty, optometry, hardware, and memorial services. Every card below is a real, live site.</p>'
      +'<div style="display:flex;gap:44px;margin-top:42px;flex-wrap:wrap;">'
      +'<div><strong style="display:block;font-family:\'Orbitron\',sans-serif;font-size:30px;font-weight:700;color:#fff;">6</strong><span style="font-size:12px;color:#90a4ae;text-transform:uppercase;letter-spacing:.05em;">Sites Shipped</span></div>'
      +'<div><strong style="display:block;font-family:\'Orbitron\',sans-serif;font-size:30px;font-weight:700;color:#fff;">6</strong><span style="font-size:12px;color:#90a4ae;text-transform:uppercase;letter-spacing:.05em;">Industries Served</span></div>'
      +'<div><strong style="display:block;font-family:\'Orbitron\',sans-serif;font-size:30px;font-weight:700;color:#fff;">100%</strong><span style="font-size:12px;color:#90a4ae;text-transform:uppercase;letter-spacing:.05em;">Mobile-Ready</span></div></div></section>'

      +'<section style="padding:30px 6% 60px;max-width:1300px;margin:0 auto;">'
      +'<div style="margin-bottom:36px;max-width:600px;"><div style="font-family:\'Space Grotesk\',monospace;font-size:11px;color:#4FC3F7;letter-spacing:.1em;text-transform:uppercase;margin-bottom:12px;">The Work</div>'
      +'<h2 style="font-family:\'Orbitron\',sans-serif;font-size:clamp(22px,3.5vw,30px);font-weight:600;color:#fff;">Live sites, not mockups</h2>'
      +'<p style="color:#90a4ae;margin-top:12px;font-size:14px;">Each preview below loads the actual deployed site. Open any of them full-screen to explore.</p></div>'
      +'<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;">'+cards+'</div></section>'

      +'<section style="padding:50px 6% 70px;text-align:center;">'
      +'<div style="background:rgba(79,195,247,.05);border:1px solid rgba(79,195,247,.15);border-radius:16px;padding:44px 28px;max-width:680px;margin:0 auto;">'
      +'<h3 style="font-family:\'Orbitron\',sans-serif;font-size:20px;color:#fff;margin-bottom:12px;">Want your business looking like this?</h3>'
      +'<p style="color:#90a4ae;font-size:14px;margin-bottom:24px;">Basic sites delivered in 24–72 hours. Full systems in 14 days.</p>'
      +'<button onclick="gP(\'discovery\')" style="padding:13px 30px;background:#4FC3F7;color:#000008;font-weight:700;font-size:14px;border-radius:8px;border:none;cursor:pointer;font-family:\'Space Grotesk\',sans-serif;">Get Started →</button></div></section>'

      +'<footer style="text-align:center;padding:28px 6%;border-top:1px solid rgba(176,190,197,.1);font-size:12px;color:#78909c;">AutoSageAI · Vaal Triangle, South Africa · www.autosageai.co.za</footer>';

    document.body.appendChild(page);
  }

  if(document.readyState==='complete'||document.readyState==='interactive'){ buildPage(); }
  else { document.addEventListener('DOMContentLoaded', buildPage); }

  // Add "Portfolio" links to desktop nav, mobile nav, and footers
  function addNavLinks(){
    // Desktop nav — insert before Contact link if present, else before Let's Meet
    document.querySelectorAll('.nlink').forEach(function(el){
      if(el.id==='nl-con' && !document.getElementById('nl-portfolio')){
        var link = document.createElement('div');
        link.className = 'nlink';
        link.id = 'nl-portfolio';
        link.textContent = 'Portfolio';
        link.onclick = function(){ gP('portfolio'); };
        el.parentNode.insertBefore(link, el);
      }
    });
    // Mobile nav
    document.querySelectorAll('.mml').forEach(function(el){
      if(el.textContent.trim()==='Contact' && !document.getElementById('mml-portfolio')){
        var link = document.createElement('div');
        link.className = 'mml';
        link.id = 'mml-portfolio';
        link.textContent = 'Portfolio';
        link.onclick = function(){ gP('portfolio'); togMob(); };
        el.parentNode.insertBefore(link, el);
      }
    });
    // Footers
    document.querySelectorAll('.ftlinks').forEach(function(fl){
      if(!fl.querySelector('.ftl-portfolio')){
        var div = document.createElement('div');
        div.className = 'ftl ftl-portfolio';
        div.style.cursor = 'pointer';
        div.textContent = 'Portfolio';
        div.onclick = function(){ gP('portfolio'); };
        fl.insertBefore(div, fl.firstChild.nextSibling);
      }
    });
  }
  if(document.readyState==='complete'||document.readyState==='interactive'){ addNavLinks(); }
  else { document.addEventListener('DOMContentLoaded', addNavLinks); }

})();
// ── END PORTFOLIO INJECTION ───────────────────────────────────────────────────
