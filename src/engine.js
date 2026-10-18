/* ================= engine ================= */
const LECT=[];const lecture=o=>LECT.push(o);
const UI={
  play:{en:"Play",bn:"চালাও"},pause:{en:"Pause",bn:"থামাও"},prev:{en:"Back",bn:"আগে"},next:{en:"Next",bn:"পরে"},
  step:{en:"Step",bn:"ধাপ"},of:{en:"of",bn:"/"},notes:{en:"From the slides",bn:"স্লাইড থেকে"},
  speed:{en:"Speed",bn:"গতি"},voice:{en:"Voice",bn:"কণ্ঠ"},next2:{en:"Next",bn:"পরবর্তী"},
  slides:{en:"Slides",bn:"স্লাইড"},chapter:{en:"Chapter",bn:"অধ্যায়"},lecture:{en:"Lecture",bn:"লেকচার"},
  course:{en:"Digital Image Processing",bn:"ডিজিটাল ইমেজ প্রসেসিং"},quiz:{en:"Check yourself",bn:"নিজেকে যাচাই করো"},
  noBn:{en:"",bn:"<b>এই ডিভাইসে বাংলা ভয়েস পাওয়া যায়নি।</b> ক্যাপশন নিজে নিজেই এগোবে। বাংলা শুনতে Microsoft Edge ব্রাউজার ব্যবহার করো (বাংলা ভয়েস আগে থেকেই আছে), অথবা Android-এ Google Text-to-speech সেটিংসে বাংলা ভয়েস ইনস্টল করো।"},
  noVoice:{en:"<b>No speech voice is available in this browser.</b> Captions will still advance on their own.",bn:"<b>এই ব্রাউজারে কোনো ভয়েস নেই।</b> ক্যাপশন নিজে নিজেই এগোবে।"},
  quizScore:{en:"Score",bn:"স্কোর"},reset:{en:"Try again",bn:"আবার চেষ্টা করো"},excellent:{en:" · Excellent!",bn:" · চমৎকার!"}
};
const S={li:0,ci:0,step:0,lang:"en",playing:false,rate:1,voiceName:{en:"",bn:""},seen:new Set()};
try{const v=JSON.parse(localStorage.getItem("dipme")||"{}");if(v.lang)S.lang=v.lang;if(v.seen)S.seen=new Set(v.seen);if(v.rate)S.rate=v.rate;if(v.li!=null){S.li=v.li;S.ci=v.ci||0}}catch(e){}
const save=()=>{try{localStorage.setItem("dipme",JSON.stringify({lang:S.lang,seen:[...S.seen],rate:S.rate,li:S.li,ci:S.ci}))}catch(e){}};
const tr=o=>o==null?"":typeof o==="string"?o:(o[S.lang]??o.en);
const bnNum=s=>S.lang==="bn"?String(s).replace(/\d/g,d=>"০১২৩৪৫৬৭৮৯"[d]):String(s);
const $=s=>document.querySelector(s);
const L=()=>LECT[S.li],CHS=()=>L().chapters,CUR=()=>CHS()[S.ci];
const chKey=(li,ci)=>LECT[li].id+"-"+LECT[li].chapters[ci].id;

/* ---------- speech ---------- */
const synth=window.speechSynthesis||null;let voices=[];
function loadVoices(){if(!synth)return;voices=synth.getVoices();fillVoices()}
if(synth){loadVoices();synth.onvoiceschanged=loadVoices}
const langVoices=l=>voices.filter(v=>v.lang&&v.lang.toLowerCase().startsWith(l));
function pickVoice(l){const list=langVoices(l);if(!list.length)return null;const named=list.find(v=>v.name===S.voiceName[l]);if(named)return named;
  const pref=l==="en"?["en-US","en-GB","en-IN"]:["bn-BD","bn-IN"];
  return list.find(v=>/natural|online|google/i.test(v.name)&&v.lang.startsWith(pref[0]))||list.find(v=>v.lang===pref[0])||list.find(v=>v.lang===pref[1])||list[0]}
let sid=0,timers=[];
const clearTimers=()=>{timers.forEach(clearTimeout);timers=[]};
function stopSpeech(){sid++;clearTimers();if(synth)synth.cancel();document.querySelectorAll(".cap .s").forEach(e=>e.classList.remove("act"))}
const sentences=t=>t.replace(/([.!?।])\s+/g,"$1|").split("|").filter(Boolean);
const spoken=t=>t.replace(/<[^>]+>/g,"");
function speakStep(){stopSpeech();const ch=CUR();if(ch.quiz||!S.playing)return;
  const my=++sid,parts=sentences(ch.steps[S.step][S.lang]).map(spoken),spans=[...document.querySelectorAll(".cap .s")];
  const v=pickVoice(S.lang);const est=p=>Math.max(1600,p.length*(S.lang==="bn"?75:62)/S.rate);
  const hl=i=>{spans.forEach(e=>e.classList.remove("act"));spans[i]&&spans[i].classList.add("act")};
  const finish=()=>{if(my!==sid)return;spans.forEach(e=>e.classList.remove("act"));timers.push(setTimeout(()=>{if(my===sid&&S.playing)advance()},800))};
  if(!synth||!v){let acc=0;parts.forEach((p,i)=>{timers.push(setTimeout(()=>{if(my===sid)hl(i)},acc));acc+=est(p)});timers.push(setTimeout(finish,acc));return}
  let total=0;parts.forEach((p,i)=>{const u=new SpeechSynthesisUtterance(p);u.voice=v;u.lang=v.lang;u.rate=S.rate*(S.lang==="bn"?.95:1);
    u.onstart=()=>{if(my===sid)hl(i)};if(i===parts.length-1){u.onend=finish;u.onerror=finish}
    total+=est(p);timers.push(setTimeout(()=>{if(my===sid)synth.speak(u)},60))});
  timers.push(setTimeout(()=>{if(my===sid&&S.playing&&!synth.speaking)finish()},total*2.2+4000))}
function advance(){const ch=CUR();if(S.step<ch.steps.length-1){S.step++;applyStep();speakStep()}else{S.playing=false;syncCtrl();const n=$("#nextch");n&&(n.hidden=false)}}

/* ---------- navigation ---------- */
function nextPos(){if(S.ci<CHS().length-1)return[S.li,S.ci+1];if(S.li<LECT.length-1)return[S.li+1,0];return null}
function go(li,ci){S.playing=false;stopSpeech();S.li=li;S.ci=ci;S.step=0;try{history.replaceState(null,"","#"+chKey(li,ci))}catch(e){}render();window.scrollTo({top:0,behavior:"smooth"})}
function renderNav(){
  $("#navhead").textContent=tr(UI.course);
  $("#lecs").innerHTML=LECT.map((l,li)=>`<li class="lec-item${li===S.li?" open":""}"><button class="lecbtn" data-l="${li}"><span class="n">${bnNum(l.no)}</span><span>${tr(l.title)}</span></button>
    <ol class="chs">${l.chapters.map((c,ci)=>`<li><button class="chbtn${S.seen.has(chKey(li,ci))?" seen":""}" data-l="${li}" data-c="${ci}" aria-current="${li===S.li&&ci===S.ci}"><span class="n">${c.quiz?"✓":bnNum(ci+1)}</span><span>${tr(c.title)}</span><span class="dot"></span></button></li>`).join("")}</ol></li>`).join("");
  document.querySelectorAll(".lecbtn").forEach(b=>b.onclick=()=>{const li=+b.dataset.l;if(li!==S.li)go(li,0);else b.parentElement.classList.toggle("open")});
  document.querySelectorAll(".chbtn").forEach(b=>b.onclick=()=>go(+b.dataset.l,+b.dataset.c));
  const cur=document.querySelector('.chbtn[aria-current="true"]');cur&&cur.scrollIntoView({block:"nearest"});
  $("#mob").innerHTML=`<select id="lecsel" aria-label="${tr(UI.lecture)}">${LECT.map((l,li)=>`<option value="${li}"${li===S.li?" selected":""}>${tr(UI.lecture)} ${bnNum(l.no)} · ${tr(l.title)}</option>`).join("")}</select>
    <ul class="chips2">${CHS().map((c,ci)=>`<li><button data-c="${ci}" aria-current="${ci===S.ci}">${c.quiz?"✓":bnNum(ci+1)} · ${tr(c.title)}</button></li>`).join("")}</ul>`;
  $("#lecsel").onchange=e=>go(+e.target.value,0);
  document.querySelectorAll(".chips2 button").forEach(b=>b.onclick=()=>go(S.li,+b.dataset.c));
  const cc=document.querySelector('.chips2 [aria-current="true"]');cc&&cc.scrollIntoView({block:"nearest",inline:"center"});
  $("#hdrsub").textContent=`${tr(UI.lecture)} ${bnNum(L().no)} · ${tr(L().book)}`}

/* ---------- render ---------- */
let cleanup=null,panelClean=null;
function render(){if(cleanup){cleanup();cleanup=null}if(panelClean){panelClean();panelClean=null}
  const ch=CUR();S.seen.add(chKey(S.li,S.ci));save();renderNav();
  document.documentElement.lang=S.lang==="bn"?"bn":"en";
  const np=nextPos();
  const head=`<div class="eyebrow">${tr(UI.lecture)} ${bnNum(L().no)} · ${ch.quiz?tr(UI.quiz):tr(UI.chapter)+" "+bnNum(S.ci+1)}${ch.slides?` · ${tr(UI.slides)} ${bnNum(ch.slides)}`:""}</div><h1>${tr(ch.title)}</h1>`;
  const nextBtn=np?`<button class="btn nextch" id="nextch" hidden>${tr(UI.next2)}: ${tr(LECT[np[0]].chapters[np[1]].title)} →</button>`:"";
  if(ch.quiz){$("#main").innerHTML=head+renderQuiz(ch)+(np?`<button class="btn nextch" id="nextch">${tr(UI.next2)}: ${tr(LECT[np[0]].title)} →</button>`:"");bindQuiz(ch);$("#nextch")&&($("#nextch").onclick=()=>go(...np));return}
  $("#main").innerHTML=head+`
   <div class="stage"><svg class="st" viewBox="0 0 800 440" role="img" aria-label="${tr(ch.title)}">${typeof ch.svg==="function"?ch.svg():ch.svg||""}</svg><div class="stepbar" id="stepbar"></div><button class="fsbtn" id="fsbtn" aria-label="Enlarge animation"><svg viewBox="0 0 16 16"><path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" fill="none" stroke="currentColor" stroke-width="1.8"/></svg></button></div>
   <p class="mhint">${tr({en:"Tip: tap ⤢ or turn your phone sideways for a bigger view.",bn:"টিপ: বড় করে দেখতে ⤢ চাপো অথবা ফোন আড়াআড়ি করো।"})}</p>
   <div class="cap" id="cap"><p id="capp"></p><div class="warn" id="warn" hidden></div></div>
   <div class="ctrl">
     <button class="btn" id="prev"><svg viewBox="0 0 16 16"><path d="M10 3 5 8l5 5z"/></svg><span></span></button>
     <button class="btn play" id="play"></button>
     <button class="btn" id="next"><span></span><svg viewBox="0 0 16 16"><path d="m6 3 5 5-5 5z"/></svg></button>
     <span class="count" id="count"></span><span class="sp"></span>
     <label for="rate">${tr(UI.speed)} <select id="rate"><option value=".8">0.8×</option><option value="1">1×</option><option value="1.2">1.2×</option></select></label>
     <label for="voice">${tr(UI.voice)} <select id="voice"></select></label>
   </div>${nextBtn}
   ${ch.panel?`<section class="panel" id="panel">${ch.panel()}</section>`:""}
   ${ch.points?`<section class="notes"><h3>${tr(UI.notes)} ${ch.slides?`<span class="ref">${tr(UI.slides)} ${bnNum(ch.slides)}</span>`:""}</h3><ul>${ch.points.map(p=>`<li>${tr(p)}</li>`).join("")}</ul></section>`:""}`;
  const svg=$("#main svg.st");ch._={};ch.init&&ch.init(svg,ch._,ch);
  $("#stepbar").innerHTML=ch.steps.map((_,i)=>`<i data-i="${i}"></i>`).join("");
  document.querySelectorAll("#stepbar i").forEach(e=>e.onclick=()=>{S.step=+e.dataset.i;applyStep();speakStep()});
  $("#prev").onclick=()=>{if(S.step>0){S.step--;applyStep();speakStep()}};
  $("#next").onclick=()=>{if(S.step<ch.steps.length-1){S.step++;applyStep();speakStep()}else if(np)go(...np)};
  $("#play").onclick=togglePlay;
  $("#fsbtn").onclick=toggleFull;
  $("#rate").value=String(S.rate);$("#rate").onchange=e=>{S.rate=+e.target.value;save();if(S.playing)speakStep()};
  $("#voice").onchange=e=>{S.voiceName[S.lang]=e.target.value;if(S.playing)speakStep()};
  $("#nextch")&&($("#nextch").onclick=()=>go(...np));
  if(ch.bind)panelClean=ch.bind($("#panel"),svg,ch._,ch)||null;
  fillVoices();applyStep()}
function applyStep(){const ch=CUR(),st=ch.steps[S.step],svg=$("#main svg.st");if(!svg)return;
  if(cleanup){cleanup();cleanup=null}
  svg.querySelectorAll("[data-scene]").forEach(g=>g.classList.toggle("off",g.dataset.scene!==st.scene));
  const scope=st.scene?svg.querySelector(`[data-scene="${st.scene}"]`):svg;
  scope&&scope.querySelectorAll("[data-s]").forEach(e=>e.classList.toggle("on",+e.dataset.s<=st.k));
  if(st.fx){const r=st.fx(svg,ch._,ch);if(typeof r==="function")cleanup=r}
  $("#capp").innerHTML=sentences(st[S.lang]).map(s=>`<span class="s">${s}</span> `).join("");
  document.querySelectorAll("#stepbar i").forEach((e,i)=>e.classList.toggle("on",i<=S.step));
  $("#count").textContent=`${tr(UI.step)} ${bnNum(S.step+1)} ${tr(UI.of)} ${bnNum(ch.steps.length)}`;
  $("#prev").disabled=S.step===0;
  const n=$("#nextch");n&&(n.hidden=!(S.step===ch.steps.length-1&&!S.playing));
  syncCtrl()}
function syncCtrl(){const p=$("#play");if(!p)return;
  p.innerHTML=S.playing?`<svg viewBox="0 0 16 16"><path d="M4 3h3v10H4zM9 3h3v10H9z"/></svg>${tr(UI.pause)}`:`<svg viewBox="0 0 16 16"><path d="M4 2.5v11l9-5.5z"/></svg>${tr(UI.play)}`;
  $("#prev span").textContent=tr(UI.prev);$("#next span").textContent=tr(UI.next);
  $("#cap")&&$("#cap").classList.toggle("still",!S.playing)}
function togglePlay(){S.playing=!S.playing;const ch=CUR();
  if(S.playing){if(S.step===ch.steps.length-1&&$("#nextch")&&!$("#nextch").hidden){S.step=0;applyStep()}$("#nextch")&&($("#nextch").hidden=true);speakStep()}
  else stopSpeech();syncCtrl()}
function fillVoices(){const sel=$("#voice"),w=$("#warn");if(!sel)return;const list=langVoices(S.lang),cur=pickVoice(S.lang);
  sel.innerHTML=list.length?list.map(v=>`<option value="${v.name.replace(/"/g,"&quot;")}"${cur&&v.name===cur.name?" selected":""}>${v.name.replace(/^(Microsoft|Google)\s+/,"").slice(0,34)}</option>`).join(""):`<option>—</option>`;
  sel.disabled=!list.length;
  if(!synth||!voices.length){w.innerHTML=tr(UI.noVoice);w.hidden=false}else if(S.lang==="bn"&&!list.length){w.innerHTML=UI.noBn.bn;w.hidden=false}else w.hidden=true}

/* ---------- enlarge stage ---------- */
function toggleFull(){const st=document.querySelector(".stage");if(!st)return;
  if(document.fullscreenElement){document.exitFullscreen().catch(()=>{});return}
  if(st.classList.contains("max")){st.classList.remove("max");document.body.style.overflow="";return}
  const p=st.requestFullscreen?st.requestFullscreen():Promise.reject();
  p.then(()=>{try{screen.orientation.lock("landscape").catch(()=>{})}catch(e){}}).catch(()=>{st.classList.add("max");document.body.style.overflow="hidden"})}
document.addEventListener("keydown",e=>{if(e.key==="Escape"){const st=document.querySelector(".stage.max");if(st){st.classList.remove("max");document.body.style.overflow=""}}});
/* ---------- quiz ---------- */
const QZ={};
function renderQuiz(ch){const k=L().id;QZ[k]=QZ[k]||{};return `<div class="quiz">${ch.questions.map((q,i)=>`<div class="q" data-q="${i}"><h4><span>${bnNum(i+1)}.</span>${tr(q.q)}</h4>
  <div class="opts">${q.o.map((o,j)=>`<button class="opt" data-j="${j}">${tr(o)}</button>`).join("")}</div><p class="why" hidden></p></div>`).join("")}
  <div class="ctrl"><span class="score" id="score"></span><span class="sp"></span><button class="btn" id="qreset">${tr(UI.reset)}</button></div></div>`}
function bindQuiz(ch){const A=QZ[L().id];const upd=()=>{const n=Object.keys(A).length,c=Object.entries(A).filter(([i,j])=>ch.questions[i].a===j).length;
    $("#score").textContent=`${tr(UI.quizScore)}: ${bnNum(c)} / ${bnNum(ch.questions.length)}`+(n===ch.questions.length&&c===n?tr(UI.excellent):"")};
  document.querySelectorAll(".q").forEach(qe=>{const i=+qe.dataset.q,q=ch.questions[i];
    const show=j=>{qe.querySelectorAll(".opt").forEach(b=>{b.disabled=true;const k=+b.dataset.j;if(k===q.a)b.classList.add("ok");else if(k===j)b.classList.add("no")});
      const w=qe.querySelector(".why");w.innerHTML=tr(q.w);w.hidden=false};
    if(A[i]!==undefined)show(A[i]);qe.querySelectorAll(".opt").forEach(b=>b.onclick=()=>{A[i]=+b.dataset.j;show(A[i]);upd()})});
  $("#qreset").onclick=()=>{for(const k in A)delete A[k];render()};upd()}

/* ---------- boot ---------- */
function setLang(l){S.lang=l;save();$("#lang-en").setAttribute("aria-pressed",l==="en");$("#lang-bn").setAttribute("aria-pressed",l==="bn");
  const was=S.playing,st=S.step;stopSpeech();render();if(!CUR().quiz&&st<CUR().steps.length){S.step=st;applyStep()}S.playing=was&&!CUR().quiz;syncCtrl();if(S.playing)speakStep()}
function boot(){
  LECT.forEach(l=>{if(l.quiz&&!l.chapters.some(c=>c.quiz))l.chapters.push({id:"quiz",quiz:true,title:UI.quiz,questions:l.quiz})});
  $("#lang-en").onclick=()=>setLang("en");$("#lang-bn").onclick=()=>setLang("bn");
  document.addEventListener("keydown",e=>{if(e.target.closest("select,input,textarea"))return;if(CUR().quiz)return;
    if(e.key===" "){e.preventDefault();togglePlay()}else if(e.key==="ArrowRight")$("#next").click();else if(e.key==="ArrowLeft")$("#prev").click()});
  const fromHash=()=>{const h=(location.hash||"").slice(1);for(let li=0;li<LECT.length;li++)for(let ci=0;ci<LECT[li].chapters.length;ci++)if(chKey(li,ci)===h)return[li,ci];return null};
  const hp=fromHash();if(hp){S.li=hp[0];S.ci=hp[1]}
  if(!LECT[S.li]||!LECT[S.li].chapters[S.ci]){S.li=0;S.ci=0}
  $("#lang-en").setAttribute("aria-pressed",S.lang==="en");$("#lang-bn").setAttribute("aria-pressed",S.lang==="bn");
  window.addEventListener("hashchange",()=>{const p=fromHash();if(p&&(p[0]!==S.li||p[1]!==S.ci))go(...p)});
  render()}
