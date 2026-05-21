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
