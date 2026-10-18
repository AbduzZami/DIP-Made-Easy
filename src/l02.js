/* ===== Lecture 02 · Origins of DIP ===== */
(()=>{
const tones=(I,n)=>mapI(I,v=>Math.round(Math.max(0,Math.min(1,v))*(n-1))/(n-1));
lecture({id:"l02",no:"02",title:{en:"The Origins of Digital Image Processing",bn:"ডিজিটাল ইমেজ প্রসেসিংয়ের সূচনা"},book:{en:"Ch. 1 · Introduction",bn:"চ্যাপ্টার ১ · পরিচিতি"},
chapters:[
/* 1 */
{id:"bartlane",slides:"2–3",title:{en:"1920s: pictures by submarine cable",bn:"১৯২০-এর দশক: সাবমেরিন ক্যাবলে ছবি"},
svg:`
<g data-s="0">
  <text class="h" x="40" y="44">BARTLANE CABLE PICTURE TRANSMISSION</text>
  <rect class="boxb" x="40" y="80" width="150" height="56" rx="10"/><text class="c" x="115" y="114">London</text>
  <rect class="boxb" x="610" y="80" width="150" height="56" rx="10"/><text class="c" x="685" y="114">New York</text>
  <path id="b-cable" class="rail" d="M190 108 C 320 190, 480 30, 610 108"/>
  <text class="c dim sm" x="400" y="160">submarine cable under the Atlantic</text>
  <g id="b-tape"><rect x="-26" y="-9" width="52" height="18" rx="3" style="fill:#E8EEF5"/><circle cx="-14" cy="0" r="3" class="node" style="fill:#0B1420"/><circle cx="0" cy="0" r="3" style="fill:#0B1420"/><circle cx="12" cy="0" r="3" style="fill:#0B1420"/></g>
  <text class="c dim xs" x="400" y="186">picture coded on tape → reconstructed by a telegraph printer</text>
</g>
<g data-s="1"><g id="b-5"></g></g>
<g data-s="2"><g id="b-15"></g></g>`,
init(svg){const sc=gen("xray",96);const a=img2($$(svg,"#b-5"),150,214,170,170,"1921 · 5 tones");a.show(tones(gen("scene",128),5));
  const b=img2($$(svg,"#b-15"),480,214,170,170,"late 1920s · 15 tones");b.show(tones(gen("scene",128),15))},
steps:[
 {k:0,fx:svg=>{const p=$$(svg,"#b-cable"),t=$$(svg,"#b-tape"),L=p.getTotalLength();return rafLoop(s=>{const q=p.getPointAtLength(((s*.25)%1)*L);t.setAttribute("transform",`translate(${q.x},${q.y})`)})},
   en:"One of the first uses of digital images was in the newspaper industry in the early 1920s. The Bartlane cable picture service sent pictures by submarine cable between London and New York. Pictures were coded for the cable and rebuilt at the other end on a telegraph printer.",
   bn:"ডিজিটাল ইমেজের প্রথম দিকের ব্যবহারগুলোর একটি ছিল ১৯২০-এর দশকের শুরুতে সংবাদপত্র শিল্পে। বার্টলেন ক্যাবল পিকচার সার্ভিস লন্ডন ও নিউ ইয়র্কের মধ্যে সাবমেরিন ক্যাবল দিয়ে ছবি পাঠাত। ছবিগুলো ক্যাবলের জন্য কোড করা হতো, আর অন্য প্রান্তে টেলিগ্রাফ প্রিন্টারে আবার তৈরি করা হতো।"},
 {k:1,en:"Those first images had only five tones, that is, five discrete intensity levels. Notice how coarse the shading looks.",
   bn:"প্রথম দিকের ছবিগুলোতে মাত্র পাঁচটি টোন ছিল, অর্থাৎ পাঁচটি আলাদা ইনটেনসিটি লেভেল। দেখো, শেডিং কতটা মোটা দাগের দেখাচ্ছে।"},
 {k:2,en:"By the mid to late 1920s, improvements based on photographic techniques raised this to fifteen tones. A 1929 picture of Generals Pershing and Foch was sent this way. More tones means smoother, more natural pictures.",
   bn:"১৯২০-এর দশকের মাঝামাঝি থেকে শেষ দিকে ফটোগ্রাফিক কৌশলের উন্নতিতে টোন বেড়ে পনেরোটি হয়। ১৯২৯ সালে জেনারেল পার্শিং ও ফশের একটি ছবি এভাবে পাঠানো হয়েছিল। টোন যত বেশি, ছবি তত মসৃণ ও স্বাভাবিক।"}
],
points:[
 {en:"Early 1920s: <b>Bartlane</b> cable picture transmission, London ↔ New York; <b>5 tones</b>.",bn:"১৯২০-এর শুরু: <b>বার্টলেন</b> ক্যাবল পিকচার ট্রান্সমিশন, লন্ডন ↔ নিউ ইয়র্ক; <b>৫টি টোন</b>।"},
 {en:"Mid to late 1920s: photographic reproduction, <b>15 tones</b>.",bn:"১৯২০-এর মাঝামাঝি থেকে শেষ: ফটোগ্রাফিক পুনরুৎপাদন, <b>১৫টি টোন</b>।"}
]},
/* 2 */
{id:"timeline",slides:"4–6",title:{en:"1960s–1980s: space, medicine and beyond",bn:"১৯৬০–১৯৮০: মহাকাশ, চিকিৎসা ও তার পরে"},
svg:`<line class="axis" x1="40" y1="250" x2="760" y2="250" style="stroke-width:3"/><g id="tl"></g><circle id="tl-dot" cx="40" cy="250" r="9" class="spot"/>
<g id="tl-card"><rect class="boxa" x="140" y="300" width="520" height="110" rx="12"/><text id="tl-t1" class="c lg" x="400" y="340"></text><text id="tl-t2" class="c dim sm" x="400" y="368"></text><text id="tl-t3" class="c dim sm" x="400" y="390"></text></g>`,
init(svg,_){const E=[[1895,"1895 · X-rays discovered","Wilhelm Conrad Roentgen","Nobel Prize in Physics, 1901"],[1921,"1921 · Bartlane pictures","5 tones by cable",""],[1964,"1964 · Ranger 7","computers improve pictures of the moon","later used on Apollo missions"],
  [1979,"1979 · Nobel Prize for tomography","Godfrey Hounsfield and Allan Cormack","the technology behind CAT scans"],[1985,"1980s · DIP everywhere","enhancement, restoration, art, medicine,","inspection, law enforcement, HCI"]];
  const X=y=>40+(y-1890)/(1990-1890)*720;_.E=E.map(e=>[X(e[0]),...e.slice(1)]);const g=$$(svg,"#tl");
  [1900,1920,1940,1960,1980].forEach(y=>{el(g,"line",{x1:X(y),x2:X(y),y1:244,y2:256,class:"axis"});txt(g,X(y),280,String(y),"dim c xs mono")});
  E.forEach(e=>{el(g,"circle",{cx:X(e[0]),cy:250,r:6,class:"node"});});
  [[60,90,"Ranger 7 · moon"],[200,90,"CAT head slice"]].forEach(()=>0);
  _.show=i=>{const[x,a,b,c]=_.E[i];$$(svg,"#tl-dot").setAttribute("cx",x);$$(svg,"#tl-t1").textContent=a;$$(svg,"#tl-t2").textContent=b;$$(svg,"#tl-t3").textContent=c;
    $$(svg,"#tl-card").classList.remove("pop");void $$(svg,"#tl-card").getBBox();$$(svg,"#tl-card").classList.add("pop")};
  const ic=el(g,"g");
  el(ic,"circle",{cx:X(1964),cy:150,r:56,style:"fill:#9AA3AE"});[[-20,-14,12],[18,8,9],[-6,24,7],[26,-22,6]].forEach(([dx,dy,r])=>el(ic,"circle",{cx:X(1964)+dx,cy:150+dy,r,style:"fill:#6E7783"}));
  el(ic,"ellipse",{cx:X(1979),cy:150,rx:46,ry:56,style:"fill:#2B3B50;stroke:#C9A88C;stroke-width:6"});el(ic,"ellipse",{cx:X(1979),cy:150,rx:30,ry:40,style:"fill:#6E7783"});
  el(ic,"rect",{x:X(1895)-30,y:110,width:60,height:80,rx:8,style:"fill:#1B2433;stroke:#7FA8FF"});[0,1,2,3].forEach(k=>el(ic,"line",{x1:X(1895)-18,x2:X(1895)+18,y1:128+k*14,y2:128+k*14,style:"stroke:#DDE6F0;stroke-width:3"}))},
steps:[
 {fx:(svg,_)=>_.show(0),en:"Some history first. X-rays were discovered in 1895 by Wilhelm Conrad Roentgen, who received the 1901 Nobel Prize in Physics.",
   bn:"শুরুতে কিছু ইতিহাস। ১৮৯৫ সালে উইলহেম কনরাড রন্টজেন এক্স-রে আবিষ্কার করেন, এবং ১৯০১ সালে পদার্থবিজ্ঞানে নোবেল পুরস্কার পান।"},
 {fx:(svg,_)=>_.show(2),en:"In the 1960s, better computers and the space race led to a surge of work in digital image processing. In 1964, computers were used to improve pictures of the moon taken by the Ranger 7 probe. Such techniques were later used on the Apollo missions.",
   bn:"১৯৬০-এর দশকে উন্নত কম্পিউটার আর মহাকাশ প্রতিযোগিতার কারণে ডিজিটাল ইমেজ প্রসেসিংয়ে কাজ অনেক বেড়ে যায়। ১৯৬৪ সালে রেঞ্জার ৭ প্রোবের তোলা চাঁদের ছবি উন্নত করতে কম্পিউটার ব্যবহার করা হয়। পরে অ্যাপোলো মিশনেও এই কৌশল ব্যবহৃত হয়।"},
 {fx:(svg,_)=>_.show(3),en:"In the 1970s, image processing entered medicine. In 1979, Godfrey Hounsfield and Allan Cormack shared the Nobel Prize in Medicine for inventing tomography, the technology behind CAT scans. X-rays and tomography, nearly a hundred years apart, led to some of today's most important applications.",
   bn:"১৯৭০-এর দশকে ইমেজ প্রসেসিং চিকিৎসাক্ষেত্রে প্রবেশ করে। ১৯৭৯ সালে গডফ্রে হাউন্সফিল্ড ও অ্যালান করম্যাক টোমোগ্রাফি আবিষ্কারের জন্য চিকিৎসায় নোবেল পুরস্কার ভাগ করে নেন, যা CAT স্ক্যানের মূল প্রযুক্তি। প্রায় একশো বছরের ব্যবধানে আবিষ্কৃত এক্স-রে ও টোমোগ্রাফি আজকের অনেক গুরুত্বপূর্ণ প্রয়োগের ভিত্তি।"},
 {fx:(svg,_)=>_.show(4),en:"From the 1980s, the use of digital image processing exploded: image enhancement and restoration, artistic effects, medical visualization, industrial inspection, law enforcement, and human computer interfaces.",
   bn:"১৯৮০-এর দশক থেকে ডিজিটাল ইমেজ প্রসেসিংয়ের ব্যবহার ব্যাপকভাবে বেড়ে যায়: ইমেজ এনহ্যান্সমেন্ট ও রিস্টোরেশন, শৈল্পিক ইফেক্ট, মেডিক্যাল ভিজুয়ালাইজেশন, ইন্ডাস্ট্রিয়াল ইন্সপেকশন, আইন প্রয়োগ এবং হিউম্যান কম্পিউটার ইন্টারফেস।"}
].map(s=>Object.assign({k:0},s)),
points:[
 {en:"<b>1964</b>: computers improve Ranger 7 moon images; later Apollo.",bn:"<b>১৯৬৪</b>: কম্পিউটার রেঞ্জার ৭-এর চাঁদের ছবি উন্নত করে; পরে অ্যাপোলো।"},
 {en:"<b>1979</b>: Hounsfield and Cormack, Nobel Prize for tomography (CAT). X-rays: Roentgen, <b>1895</b>.",bn:"<b>১৯৭৯</b>: হাউন্সফিল্ড ও করম্যাক, টোমোগ্রাফির জন্য নোবেল (CAT)। এক্স-রে: রন্টজেন, <b>১৮৯৫</b>।"},
 {en:"<b>1980s</b>: enhancement, restoration, art, medical visualization, inspection, law enforcement, HCI.",bn:"<b>১৯৮০-এর দশক</b>: এনহ্যান্সমেন্ট, রিস্টোরেশন, শিল্প, মেডিক্যাল ভিজুয়ালাইজেশন, ইন্সপেকশন, আইন প্রয়োগ, HCI।"}
]},
/* 3 */
{id:"spectrum",slides:"7–8",title:{en:"Sources of images and the EM spectrum",bn:"ইমেজের উৎস ও তড়িৎচৌম্বক বর্ণালি"},
svg:`
<g data-s="0">
  <text class="h" x="40" y="44">SOURCES OF IMAGES</text>
  <g id="sp-src"></g>
</g>
<g data-s="1"><g id="sp-bar"></g>
  <line class="arrw" x1="720" y1="300" x2="80" y2="300" marker-end="url(#ahw)"/><text class="c dim sm" x="400" y="292">energy per photon increases</text>
  <rect id="sp-hl" class="hl" x="40" y="186" width="120" height="70" rx="6"/>
  <text id="sp-use" class="c am" x="400" y="350"></text><text id="sp-use2" class="c dim sm" x="400" y="378"></text>
</g>`,
init(svg,_){const s=$$(svg,"#sp-src");["Electromagnetic","Acoustic","Ultrasonic","Electronic","Synthetic (computer)"].forEach((t,i)=>{el(s,"rect",{x:40+i*148,y:70,width:136,height:44,rx:22,class:i?"box":"boxa"});txt(s,108+i*148,97,t,"c xs")});
  const B=[["Gamma","#B07CFF"],["X-ray","#7FA8FF"],["Ultraviolet","#6BD3FF"],["Visible","url(#spv)"],["Infrared","#F07A62"],["Microwave","#E2A04A"],["Radio","#9AA3AE"]];
  const g=$$(svg,"#sp-bar");const d=el(g,"defs");const lg=el(d,"linearGradient",{id:"spv"});["#8B5CF6","#3B82F6","#22C55E","#EAB308","#EF4444"].forEach((c,i)=>el(lg,"stop",{offset:i/4,"stop-color":c}));
  B.forEach(([n,c],i)=>{el(g,"rect",{x:40+i*103,y:190,width:100,height:62,style:`fill:${c};fill-opacity:.85`});txt(g,90+i*103,276,n,"c xs")});
  _.U=[["Gamma rays","nuclear medicine, astronomy"],["X-rays","medical diagnosis, industrial inspection, astronomy"],["Ultraviolet","lithography, fluorescence microscopy, astronomy"],["Visible","light microscopy, remote sensing, law enforcement"],["Infrared","remote sensing, astronomy, industry"],["Microwave","radar"],["Radio","MRI in medicine, astronomy"]]},
steps:[
 {k:0,en:"Images come from many sources: electromagnetic energy, acoustic, ultrasonic, electronic, and synthetic images produced by computer. The electromagnetic spectrum is the most important.",
   bn:"ইমেজ নানা উৎস থেকে আসে: তড়িৎচৌম্বক শক্তি, শব্দতরঙ্গ, আল্ট্রাসনিক, ইলেকট্রনিক, এবং কম্পিউটারে তৈরি কৃত্রিম ইমেজ। এদের মধ্যে তড়িৎচৌম্বক বর্ণালি সবচেয়ে গুরুত্বপূর্ণ।"},
 {k:1,fx:(svg,_)=>{let i=0;return every(2400,()=>{const k=i%7;$$(svg,"#sp-hl").setAttribute("x",38+k*103);$$(svg,"#sp-use").textContent=_.U[k][0];$$(svg,"#sp-use2").textContent=_.U[k][1];i++})},
   en:"The spectrum runs from gamma rays, with the highest energy, through X-rays, ultraviolet, visible light, infrared and microwaves, to radio waves. Each band has its own uses, from nuclear medicine to radar and MRI.",
   bn:"বর্ণালিটি সবচেয়ে বেশি শক্তির গামা রশ্মি থেকে শুরু হয়ে এক্স-রে, অতিবেগুনি, দৃশ্যমান আলো, অবলোহিত ও মাইক্রোওয়েভ পেরিয়ে রেডিও তরঙ্গে শেষ হয়। প্রতিটি ব্যান্ডের নিজস্ব ব্যবহার আছে, নিউক্লিয়ার মেডিসিন থেকে রাডার ও MRI পর্যন্ত।"}
],
points:[
 {en:"Sources: EM spectrum, acoustic, ultrasonic, electronic, synthetic.",bn:"উৎস: তড়িৎচৌম্বক বর্ণালি, শব্দ, আল্ট্রাসনিক, ইলেকট্রনিক, কৃত্রিম।"},
 {en:"Gamma: nuclear medicine, astronomy. X-ray: diagnostics, inspection. UV and IR: microscopy, remote sensing, industry. Microwave: radar. Radio: MRI, astronomy.",bn:"গামা: নিউক্লিয়ার মেডিসিন, জ্যোতির্বিজ্ঞান। এক্স-রে: রোগনির্ণয়, ইন্সপেকশন। অতিবেগুনি ও অবলোহিত: মাইক্রোস্কোপি, রিমোট সেন্সিং, শিল্প। মাইক্রোওয়েভ: রাডার। রেডিও: MRI, জ্যোতির্বিজ্ঞান।"}
]},
/* 4 */
{id:"gamma",slides:"9–11",title:{en:"Gamma-ray imaging",bn:"গামা-রে ইমেজিং"},
svg:`
<g id="g-ring"></g>
<ellipse cx="260" cy="225" rx="70" ry="100" class="body"/><circle cx="260" cy="150" r="34" class="body"/>
<g data-s="0"><g id="g-iso"></g><text class="c dim sm" x="260" y="420">radioactive isotope emits gamma rays</text></g>
<g data-s="1"><g id="g-pet"></g></g>
<g data-s="2"><g id="g-ex"></g></g>`,
init(svg,_){const r=$$(svg,"#g-ring");for(let k=0;k<36;k++){const a=k/36*6.283,x=260+175*Math.cos(a),y=225+175*Math.sin(a);el(r,"rect",{x:x-10,y:y-5,width:20,height:10,rx:2,class:"ringseg",transform:`rotate(${a*57.3+90} ${x} ${y})`})}
  txt(r,260,30,"ring of gamma-ray detectors","c dim sm");
  const ex=$$(svg,"#g-ex");[["Bone scan","locate infections, tumours"],["PET image","tumours: small white masses"],["Cygnus Loop","astronomy"],["Reactor valve","strong radiation spot"]].forEach(([a,b],i)=>{el(ex,"rect",{x:490,y:60+i*88,width:280,height:76,rx:10,class:"boxb"});txt(ex,506,92+i*88,a);txt(ex,506,116+i*88,b,"dim xs")})},
steps:[
 {k:0,fx:svg=>{const g=$$(svg,"#g-iso");g.innerHTML="";return every(700,()=>{const a=Math.random()*6.283;const l=el(g,"line",{x1:260,y1:225,x2:260+165*Math.cos(a),y2:225+165*Math.sin(a),class:"xray",style:"stroke:#B07CFF"});setTimeout(()=>l.remove(),900)})},
   en:"In nuclear medicine, the patient is injected with a radioactive isotope that emits gamma rays as it decays. Images are produced from the emissions collected by gamma-ray detectors.",
   bn:"নিউক্লিয়ার মেডিসিনে রোগীর শরীরে একটি তেজস্ক্রিয় আইসোটোপ ইনজেক্ট করা হয়, যা ক্ষয় হওয়ার সময় গামা রশ্মি ছড়ায়। গামা-রে ডিটেক্টরে ধরা পড়া এই নির্গমন থেকেই ইমেজ তৈরি হয়।"},
 {k:1,fx:svg=>{const g=$$(svg,"#g-pet");g.innerHTML="";let cx=260,cy=225,a=0,cyc=-1;
   const e=el(g,"circle",{r:7,style:"fill:#F07A62"}),p=el(g,"circle",{r:7,style:"fill:#6BD3FF"}),te=txt(g,0,0,"e⁻","c xs"),tp=txt(g,0,0,"e⁺","c xs"),f=el(g,"circle",{r:12,class:"core"});
   const l1=el(g,"line",{class:"xray",style:"stroke:#B07CFF;stroke-width:4"}),l2=el(g,"line",{class:"xray",style:"stroke:#B07CFF;stroke-width:4"});
   return rafLoop(t=>{const c=Math.floor(t/1.8),u=(t%1.8)/1.8;if(c!==cyc){cyc=c;cx=230+Math.random()*60;cy=190+Math.random()*80;a=Math.random()*3.14}
     const d=u<.4?40*(1-u/.4):0,vis=u<.4;[e,te].forEach(q=>q.style.opacity=vis?1:0);[p,tp].forEach(q=>q.style.opacity=vis?1:0);
     e.setAttribute("cx",cx-d);e.setAttribute("cy",cy);p.setAttribute("cx",cx+d);p.setAttribute("cy",cy);te.setAttribute("x",cx-d);te.setAttribute("y",cy-12);tp.setAttribute("x",cx+d);tp.setAttribute("y",cy-12);
     f.setAttribute("cx",cx);f.setAttribute("cy",cy);f.style.opacity=u>=.4&&u<.55?1:0;const L=u<.4?0:Math.min(1,(u-.4)/.4)*175;
     [[l1,1],[l2,-1]].forEach(([l,sg])=>{l.setAttribute("x1",cx);l.setAttribute("y1",cy);l.setAttribute("x2",cx+sg*L*Math.cos(a));l.setAttribute("y2",cy+sg*L*Math.sin(a));l.style.opacity=u<.4?0:1})})},
   en:"Positron emission tomography, or PET, works differently. The patient is given an isotope that emits positrons. When a positron meets an electron, both are annihilated and two gamma rays fly off in opposite directions. Detectors catch the pair, and a tomography image is built.",
   bn:"পজিট্রন এমিশন টোমোগ্রাফি বা PET একটু ভিন্নভাবে কাজ করে। রোগীকে এমন আইসোটোপ দেওয়া হয় যা পজিট্রন ছড়ায়। পজিট্রন যখন একটি ইলেকট্রনের সাথে মিলিত হয়, দুটোই বিলুপ্ত হয় এবং বিপরীত দিকে দুটি গামা রশ্মি ছুটে যায়। ডিটেক্টর এই জোড়া ধরে, আর তা থেকে টোমোগ্রাফি ইমেজ তৈরি হয়।"},
 {k:2,en:"Examples include bone scans to locate infections or tumours, PET images showing tumours as small white masses, the Cygnus Loop in astronomy, and gamma radiation from a reactor valve.",
   bn:"উদাহরণ: সংক্রমণ বা টিউমার খুঁজতে বোন স্ক্যান, PET ইমেজে টিউমার ছোট সাদা দাগের মতো দেখায়, জ্যোতির্বিজ্ঞানে সিগনাস লুপ, আর রিঅ্যাক্টর ভালভ থেকে গামা বিকিরণ।"}
],
points:[
 {en:"Nuclear medicine: inject a radioactive isotope; detect its <b>gamma-ray emissions</b>.",bn:"নিউক্লিয়ার মেডিসিন: তেজস্ক্রিয় আইসোটোপ ইনজেক্ট করে তার <b>গামা নির্গমন</b> শনাক্ত করা।"},
 {en:"PET: positron + electron → annihilation → <b>two gamma rays</b> in opposite directions → tomography.",bn:"PET: পজিট্রন + ইলেকট্রন → বিলুপ্তি → বিপরীত দিকে <b>দুটি গামা রশ্মি</b> → টোমোগ্রাফি।"}
]},
/* 5 */
{id:"xray",slides:"12–13",title:{en:"X-ray imaging",bn:"এক্স-রে ইমেজিং"},
svg:`
<g data-s="0">
  <rect x="120" y="90" width="460" height="170" rx="80" style="fill:#16263A;stroke:#7D8FA6;stroke-width:2"/>
  <text class="c dim sm" x="350" y="80">vacuum tube</text>
  <rect x="160" y="150" width="40" height="50" rx="6" style="fill:#F07A62"/><path d="M168 160 q6 8 0 16 q-6 8 0 16" style="stroke:#FFF4D2;stroke-width:3;fill:none"/>
  <text class="c" x="180" y="232">cathode</text><text class="c dim xs" x="180" y="250">heated filament</text>
  <polygon points="500,130 540,130 540,220 470,220" style="fill:#7FA8FF"/><text class="c" x="510" y="246">anode (+)</text>
  <g id="x-e"></g>
</g>
<g data-s="1"><g id="x-ray"></g><text class="dim sm" x="560" y="330">X-rays</text></g>
<g data-s="2"><text class="dim sm" x="120" y="300">voltage across anode → penetrating power</text><text class="dim sm" x="120" y="322">filament current → number of electrons</text></g>
<g data-s="3"><g id="x-ex"></g></g>`,
init(svg){const ex=$$(svg,"#x-ex");[["Chest X-ray","bone fractures"],["Angiogram","blood vessels, with contrast medium"],["Head CT","CAT scans"],["Circuit board","manufacturing flaws"]].forEach(([a,b],i)=>{el(ex,"rect",{x:40+i*186,y:350,width:176,height:72,rx:10,class:"boxb"});txt(ex,52+i*186,380,a,"sm");txt(ex,52+i*186,402,b,"dim xs")})},
steps:[
 {k:0,fx:svg=>{const g=$$(svg,"#x-e");g.innerHTML="";const D=[];for(let i=0;i<6;i++)D.push(el(g,"circle",{r:5,cy:160+i*7,cx:205,style:"fill:#6BD3FF"}));return rafLoop(t=>D.forEach((d,i)=>{const p=((t*.6+i/6)%1);d.setAttribute("cx",205+p*290)}))},
   en:"X-rays for medical and industrial imaging come from an X-ray tube, a vacuum tube with a cathode and an anode. The cathode is heated, which releases free electrons. They race at high speed toward the positively charged anode.",
   bn:"মেডিক্যাল ও ইন্ডাস্ট্রিয়াল কাজের এক্স-রে তৈরি হয় এক্স-রে টিউবে, যা একটি ভ্যাকুয়াম টিউব, এতে একটি ক্যাথোড ও একটি অ্যানোড থাকে। ক্যাথোড গরম করলে মুক্ত ইলেকট্রন বের হয়। এগুলো খুব দ্রুত ধনাত্মক অ্যানোডের দিকে ছুটে যায়।"},
 {k:1,fx:svg=>{const g=$$(svg,"#x-ray");g.innerHTML="";const D=[];for(let i=0;i<6;i++)D.push(el(g,"circle",{r:5,cy:160+i*7,cx:205,style:"fill:#6BD3FF"}));
   const L=[0,1,2,3,4].map(i=>el(g,"line",{x1:505,y1:200,x2:505,y2:200,class:"xray"}));
   return rafLoop(t=>{D.forEach((d,i)=>{const p=((t*.6+i/6)%1);d.setAttribute("cx",205+p*290)});L.forEach((l,i)=>{const p=((t*.8+i/5)%1);const a=1.2+i*.12;l.setAttribute("x1",505+30*p*Math.cos(a));l.setAttribute("y1",210+30*p*Math.sin(a));l.setAttribute("x2",505+150*p*Math.cos(a)+10);l.setAttribute("y2",210+150*p*Math.sin(a))})})},
   en:"When the electrons strike nuclei in the anode, energy is released as X-ray radiation.",
   bn:"ইলেকট্রনগুলো অ্যানোডের নিউক্লিয়াসে আঘাত করলে শক্তি এক্স-রে বিকিরণ হিসেবে বের হয়।"},
 {k:2,en:"The energy, or penetrating power, of the X-rays is controlled by the voltage across the anode, and by the current through the cathode filament.",
   bn:"এক্স-রের শক্তি বা ভেদন ক্ষমতা নিয়ন্ত্রণ করা হয় অ্যানোডের ভোল্টেজ এবং ক্যাথোড ফিলামেন্টের কারেন্ট দিয়ে।"},
 {k:3,en:"Uses include chest X-rays to find fractures, angiography, where a contrast medium is injected to show blood vessels, CAT scans, inspecting circuit boards for flaws, and astronomy.",
   bn:"এর ব্যবহার: হাড় ভাঙা খুঁজতে বুকের এক্স-রে, রক্তনালি দেখতে কনট্রাস্ট মিডিয়াম দিয়ে অ্যানজিওগ্রাফি, CAT স্ক্যান, সার্কিট বোর্ডের ত্রুটি খোঁজা এবং জ্যোতির্বিজ্ঞান।"}
],
points:[
 {en:"X-ray tube: heated <b>cathode</b> releases electrons → strike the <b>anode</b> → X-rays.",bn:"এক্স-রে টিউব: গরম <b>ক্যাথোড</b> থেকে ইলেকট্রন → <b>অ্যানোডে</b> আঘাত → এক্স-রে।"},
 {en:"Energy controlled by <b>anode voltage</b> and <b>filament current</b>.",bn:"শক্তি নিয়ন্ত্রিত হয় <b>অ্যানোড ভোল্টেজ</b> ও <b>ফিলামেন্ট কারেন্ট</b> দিয়ে।"},
 {en:"Examples: chest X-ray, aortic angiogram, head CT, circuit boards, Cygnus Loop.",bn:"উদাহরণ: বুকের এক্স-রে, অ্যাওর্টিক অ্যানজিওগ্রাম, হেড CT, সার্কিট বোর্ড, সিগনাস লুপ।"}
]},
/* 6 */
{id:"uvvis",slides:"14–22",title:{en:"Ultraviolet, visible and infrared imaging",bn:"অতিবেগুনি, দৃশ্যমান ও অবলোহিত ইমেজিং"},
svg:`
<g data-scene="uv"><g data-s="0">
  <text class="h" x="40" y="44">FLUORESCENCE MICROSCOPY</text>
  <g id="uv-c"></g>
  <text class="dim sm" x="40" y="400">uses: lithography, inspection, fluorescence microscopy, lasers, biology, astronomy</text>
</g></g>
<g data-scene="ir"><g data-s="0"><text class="h" x="40" y="44">NIGHTTIME LIGHTS · LANDSAT BANDS</text><g id="ir-c"></g></g></g>
<g data-scene="ind"><g data-s="0"><text class="h" x="40" y="44">INDUSTRIAL INSPECTION</text>
  <line class="rail" x1="20" y1="330" x2="780" y2="330"/><g id="ind-b"></g><rect class="hl" x="350" y="120" width="100" height="220" rx="8"/><text class="c dim sm" x="400" y="110">camera checks fill level</text>
  <text class="dim sm" x="40" y="390">also: missing parts on boards, missing pills, bubbles in plastic, burned cereal flakes, faulty lenses</text></g></g>`,
init(svg){const c=$$(svg,"#uv-c");
  const corn=(x,y,sick)=>{const g=el(c,"g");el(g,"rect",{x,y,width:220,height:220,rx:8,style:"fill:#05080F"});const r=rng(sick?4:2);
    for(let i=0;i<70;i++){const px=x+20+r()*180,py=y+20+r()*180,rr=sick?6+r()*14:4+r()*5;el(g,"circle",{cx:px,cy:py,r:rr,style:`fill:${sick?"#7CFFB0":"#5BC0FF"};fill-opacity:${sick?.55:.8}`})}
    txt(g,x+110,y+246,sick?"corn infected by smut":"normal corn","c dim sm")};corn(80,80,0);corn(420,80,1);
  const ir=$$(svg,"#ir-c");el(ir,"rect",{x:40,y:70,width:330,height:250,rx:8,style:"fill:#03060C"});const r=rng(8);
  for(let i=0;i<160;i++){const cl=r()<.5;const px=60+r()*290,py=90+r()*210;el(ir,"circle",{cx:px+(cl?(r()-.5)*10:0),cy:py,r:cl?1.5+r()*3:1,style:"fill:#FFD27A;fill-opacity:.9"})}
  txt(ir,205,344,"cities, towns, gas flares and fires seen at night","c dim xs");
  [["1","visible blue"],["2","visible green"],["3","visible red"],["4","near infrared"],["5","middle infrared"],["6","thermal infrared"],["7","middle infrared"]].forEach(([n,t],i)=>{el(ir,"rect",{x:420,y:70+i*36,width:330,height:30,rx:6,class:i<3?"boxa":"boxb"});txt(ir,436,90+i*36,"Band "+n+" · "+t,"sm")});
  txt(ir,585,340,"LANDSAT thematic bands","c dim xs")},
steps:[
 {scene:"uv",k:0,en:"Ultraviolet light is used in fluorescence microscopy. Here, normal corn is compared with corn infected by smut, a disease caused by more than 700 species of parasitic fungi. The infected grains glow very differently. UV imaging is also used in astronomy, such as the Cygnus Loop.",
   bn:"অতিবেগুনি আলো ফ্লুরোসেন্স মাইক্রোস্কোপিতে ব্যবহৃত হয়। এখানে স্বাভাবিক ভুট্টার সাথে স্মাট রোগে আক্রান্ত ভুট্টা তুলনা করা হয়েছে, যে রোগ ৭০০টিরও বেশি প্রজাতির পরজীবী ছত্রাক থেকে হয়। আক্রান্ত দানাগুলো একদম ভিন্নভাবে জ্বলে ওঠে। জ্যোতির্বিজ্ঞানেও অতিবেগুনি ইমেজিং ব্যবহৃত হয়, যেমন সিগনাস লুপ।"},
 {scene:"ir",k:0,en:"Visible and infrared bands are used in light microscopy, astronomy, remote sensing, law enforcement and industry. Satellites map the nighttime lights of the world, a global inventory of human settlements. LANDSAT satellites image the earth in seven thematic bands, from visible blue to thermal infrared.",
   bn:"দৃশ্যমান ও অবলোহিত ব্যান্ড ব্যবহৃত হয় লাইট মাইক্রোস্কোপি, জ্যোতির্বিজ্ঞান, রিমোট সেন্সিং, আইন প্রয়োগ ও শিল্পে। স্যাটেলাইট রাতের পৃথিবীর আলো মানচিত্রে তোলে, যা মানুষের বসতির একটি বৈশ্বিক তালিকা। LANDSAT স্যাটেলাইট দৃশ্যমান নীল থেকে থার্মাল অবলোহিত পর্যন্ত সাতটি থিম্যাটিক ব্যান্ডে পৃথিবীর ছবি তোলে।"},
 {scene:"ind",k:0,fx:svg=>{const g=$$(svg,"#ind-b");g.innerHTML="";const B=[];for(let i=0;i<9;i++){const b=el(g,"g");el(b,"rect",{x:-24,y:-150,width:48,height:150,rx:10,style:"fill:none;stroke:#BFD6F5;stroke-width:2"});
     const lv=i===3||i===7?60:118;el(b,"rect",{x:-21,y:-lv,width:42,height:lv-3,rx:6,style:"fill:#7FA8FF;fill-opacity:.7"});const t=txt(b,0,-160,"","c sm");B.push([b,lv,t])}
   return rafLoop(s=>B.forEach(([b,lv,t],i)=>{const x=((s*60+i*95)%855)-40;b.setAttribute("transform",`translate(${x},328)`);const inCam=x>350&&x<450;t.textContent=inCam?(lv<100?"✗ low":"✓"):"";t.setAttribute("class",lv<100?"c sm rd":"c sm gn")}))},
   en:"Visible-light imaging is everywhere in industrial inspection. Cameras check bottles that are not filled to an acceptable level, look for missing parts on circuit boards, missing pills, bubbles in plastic, burned cereal flakes, and faulty lenses.",
   bn:"শিল্প পরিদর্শনে দৃশ্যমান আলোর ইমেজিং সব জায়গায় ব্যবহৃত হয়। ক্যামেরা পরীক্ষা করে কোন বোতল ঠিকমতো ভরা হয়নি, সার্কিট বোর্ডে কোনো অংশ বাদ গেছে কিনা, প্যাকেটে ওষুধ কম আছে কিনা, প্লাস্টিকে বুদবুদ, পোড়া সিরিয়াল ফ্লেক এবং ত্রুটিপূর্ণ লেন্স।"}
],
points:[
 {en:"UV: fluorescence microscopy (normal vs smut-infected corn), astronomy.",bn:"অতিবেগুনি: ফ্লুরোসেন্স মাইক্রোস্কোপি (স্বাভাবিক বনাম স্মাট-আক্রান্ত ভুট্টা), জ্যোতির্বিজ্ঞান।"},
 {en:"Visible and IR: light microscopy, nighttime lights, LANDSAT thematic bands, industrial inspection.",bn:"দৃশ্যমান ও অবলোহিত: লাইট মাইক্রোস্কোপি, রাতের আলো, LANDSAT ব্যান্ড, শিল্প পরিদর্শন।"}
]},
/* 7 */
{id:"radio",slides:"23–25",title:{en:"Microwave (radar) and radio (MRI) imaging",bn:"মাইক্রোওয়েভ (রাডার) ও রেডিও (MRI) ইমেজিং"},
svg:`
<g data-scene="radar"><g data-s="0">
  <rect class="dev" x="320" y="50" width="160" height="34" rx="6"/><rect x="250" y="58" width="60" height="18" style="fill:#7FA8FF"/><rect x="490" y="58" width="60" height="18" style="fill:#7FA8FF"/>
  <text class="c dim sm" x="400" y="40">radar satellite</text>
  <g id="rd-cl"></g>
  <path d="M0 400 L120 330 L200 370 L300 290 L380 350 L470 270 L560 340 L650 300 L800 380 L800 440 L0 440Z" style="fill:#3B4B5F"/>
  <g id="rd-p"></g>
  <text class="c dim sm" x="400" y="430">works day or night, through clouds, in any weather</text>
</g></g>
<g data-scene="mri"><g data-s="0">
  <rect x="200" y="110" width="400" height="220" rx="110" style="fill:none;stroke:#7FA8FF;stroke-width:26"/>
  <text class="c dim sm" x="400" y="90">powerful magnet</text>
  <rect x="170" y="210" width="460" height="22" rx="8" style="fill:#2C3E57"/><ellipse cx="400" cy="205" rx="150" ry="20" class="body"/><circle cx="255" cy="200" r="20" class="body"/>
  <g id="mri-w"></g>
  <text class="c dim sm" x="400" y="380">radio pulses in → tissues answer with radio pulses → computer builds a slice</text>
</g></g>`,
steps:[
 {scene:"radar",k:0,fx:svg=>{const cl=$$(svg,"#rd-cl");cl.innerHTML="";for(let i=0;i<4;i++){const g=el(cl,"g");[0,24,48].forEach(d=>el(g,"circle",{cx:d,cy:0,r:22,style:"fill:#C7D2E0;fill-opacity:.8"}));g.dataset.i=i}
   const p=$$(svg,"#rd-p");p.innerHTML="";const P=[];for(let i=0;i<4;i++)P.push(el(p,"path",{class:"wave",d:""}));
   return rafLoop(t=>{[...cl.children].forEach((g,i)=>g.setAttribute("transform",`translate(${((t*30+i*220)%900)-80},${170+i%2*40})`));
     P.forEach((q,i)=>{const s=((t*.5+i/4)%1);const down=s<.5;const y=down?84+s*2*240:84+(1-s)*2*240;q.setAttribute("d",`M${330+i*45} ${y} q8 -10 16 0 t16 0`);q.style.stroke=down?"#F2A93B":"#7FA8FF"})})},
   en:"The main use of the microwave band is radar. A radar sends microwave pulses to illuminate the scene, and an antenna receives the reflected energy, which is recorded by a computer. Radar can see through clouds, ice and vegetation, at any time, regardless of weather or lighting. One example is a spaceborne radar image of the mountains of southeast Tibet.",
   bn:"মাইক্রোওয়েভ ব্যান্ডের প্রধান ব্যবহার হলো রাডার। রাডার মাইক্রোওয়েভ পালস পাঠিয়ে দৃশ্য আলোকিত করে, আর অ্যান্টেনা প্রতিফলিত শক্তি গ্রহণ করে যা কম্পিউটারে রেকর্ড হয়। রাডার মেঘ, বরফ ও গাছপালা ভেদ করে দেখতে পারে, যেকোনো সময়ে, আবহাওয়া বা আলো যাই হোক। একটি উদাহরণ হলো দক্ষিণ-পূর্ব তিব্বতের পাহাড়ি অঞ্চলের মহাকাশ থেকে তোলা রাডার ইমেজ।"},
 {scene:"mri",k:0,fx:svg=>{const g=$$(svg,"#mri-w");g.innerHTML="";return every(900,()=>{const a=el(g,"path",{class:"wave",d:"M400 130 q8 -12 16 0 t16 0 t16 0",style:"stroke:#F2A93B"});
   setTimeout(()=>{const b=el(g,"path",{class:"wave",d:"M380 250 q8 12 16 0 t16 0 t16 0",style:"stroke:#7FA8FF"});setTimeout(()=>b.remove(),600)},350);setTimeout(()=>a.remove(),500)})},
   en:"Radio waves are used in medicine and astronomy. In magnetic resonance imaging, the patient lies in a powerful magnet while short radio pulses pass through the body. Each pulse makes the tissues send back a radio pulse. A computer finds where these signals come from and how strong they are, and builds a two-dimensional picture of a section of the patient.",
   bn:"রেডিও তরঙ্গ চিকিৎসা ও জ্যোতির্বিজ্ঞানে ব্যবহৃত হয়। ম্যাগনেটিক রেজোন্যান্স ইমেজিংয়ে রোগী একটি শক্তিশালী চুম্বকের ভেতরে শুয়ে থাকে, আর শরীরের ভেতর দিয়ে ছোট ছোট রেডিও পালস পাঠানো হয়। প্রতিটি পালসের জবাবে টিস্যু থেকে একটি রেডিও পালস ফিরে আসে। কম্পিউটার নির্ণয় করে সংকেতগুলো কোথা থেকে আসছে এবং কতটা শক্তিশালী, তারপর রোগীর একটি অংশের দ্বিমাত্রিক ছবি তৈরি করে।"}
],
points:[
 {en:"<b>Radar</b>: microwave pulses, reflected energy recorded; works through clouds, any time, any weather.",bn:"<b>রাডার</b>: মাইক্রোওয়েভ পালস, প্রতিফলিত শক্তি রেকর্ড; মেঘ ভেদ করে, যেকোনো সময়, যেকোনো আবহাওয়ায়।"},
 {en:"<b>MRI</b>: magnet + radio pulses; tissues respond; computer builds a 2-D section.",bn:"<b>MRI</b>: চুম্বক + রেডিও পালস; টিস্যু সাড়া দেয়; কম্পিউটার দ্বিমাত্রিক অংশের ছবি তৈরি করে।"}
]}
],
quiz:[
 {q:{en:"The first Bartlane cable pictures (early 1920s) had how many tones?",bn:"প্রথম বার্টলেন ক্যাবল ছবিতে (১৯২০-এর শুরু) কয়টি টোন ছিল?"},o:[{en:"2",bn:"২"},{en:"5",bn:"৫"},{en:"15",bn:"১৫"},{en:"256",bn:"২৫৬"}],a:1,w:{en:"Five tones at first; fifteen by the late 1920s.",bn:"প্রথমে পাঁচটি; ১৯২০-এর শেষে পনেরোটি।"}},
 {q:{en:"Computers improved images of the moon from which probe in 1964?",bn:"১৯৬৪ সালে কোন প্রোবের চাঁদের ছবি কম্পিউটার দিয়ে উন্নত করা হয়?"},o:[{en:"Apollo 11",bn:"অ্যাপোলো ১১"},{en:"Ranger 7",bn:"রেঞ্জার ৭"},{en:"Voyager 1",bn:"ভয়েজার ১"},{en:"Sputnik",bn:"স্পুটনিক"}],a:1,w:{en:"Ranger 7, July 1964.",bn:"রেঞ্জার ৭, জুলাই ১৯৬৪।"}},
 {q:{en:"Hounsfield and Cormack won the 1979 Nobel Prize for…",bn:"হাউন্সফিল্ড ও করম্যাক ১৯৭৯ সালে নোবেল পান…"},o:[{en:"discovering X-rays",bn:"এক্স-রে আবিষ্কারের জন্য"},{en:"inventing tomography (CAT)",bn:"টোমোগ্রাফি (CAT) উদ্ভাবনের জন্য"},{en:"inventing radar",bn:"রাডার উদ্ভাবনের জন্য"},{en:"the JPEG format",bn:"JPEG ফরম্যাটের জন্য"}],a:1,w:{en:"Tomography is the technology behind CAT scans.",bn:"টোমোগ্রাফিই CAT স্ক্যানের প্রযুক্তি।"}},
 {q:{en:"In PET, two gamma rays are produced when…",bn:"PET-এ দুটি গামা রশ্মি তৈরি হয় যখন…"},o:[{en:"a positron meets an electron",bn:"পজিট্রন ইলেকট্রনের সাথে মেলে"},{en:"electrons hit the anode",bn:"ইলেকট্রন অ্যানোডে আঘাত করে"},{en:"radio pulses hit tissue",bn:"রেডিও পালস টিস্যুতে লাগে"},{en:"light reflects from skin",bn:"ত্বক থেকে আলো প্রতিফলিত হয়"}],a:0,w:{en:"Annihilation gives two gamma rays in opposite directions.",bn:"বিলুপ্তিতে বিপরীত দিকে দুটি গামা রশ্মি তৈরি হয়।"}},
 {q:{en:"Which band can image through clouds at any time of day?",bn:"কোন ব্যান্ড দিনের যেকোনো সময় মেঘ ভেদ করে ছবি তুলতে পারে?"},o:[{en:"Ultraviolet",bn:"অতিবেগুনি"},{en:"Visible",bn:"দৃশ্যমান"},{en:"Microwave (radar)",bn:"মাইক্রোওয়েভ (রাডার)"},{en:"Gamma",bn:"গামা"}],a:2,w:{en:"Radar brings its own illumination and penetrates clouds.",bn:"রাডার নিজেই আলোকসজ্জা দেয় ও মেঘ ভেদ করে।"}},
 {q:{en:"MRI uses which part of the spectrum?",bn:"MRI বর্ণালির কোন অংশ ব্যবহার করে?"},o:[{en:"X-rays",bn:"এক্স-রে"},{en:"Radio waves",bn:"রেডিও তরঙ্গ"},{en:"Gamma rays",bn:"গামা রশ্মি"},{en:"Infrared",bn:"অবলোহিত"}],a:1,w:{en:"Radio pulses in a strong magnetic field.",bn:"শক্তিশালী চুম্বকক্ষেত্রে রেডিও পালস।"}}
]});
})();
