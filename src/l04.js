/* ===== Lecture 04 ===== */
(()=>{

const ILL=[{en:"Full moon",bn:"পূর্ণিমার রাত",v:.1},{en:"Office",bn:"অফিস কক্ষ",v:1000},{en:"Cloudy day",bn:"মেঘলা দিন",v:10000},{en:"Sunny day",bn:"রৌদ্রোজ্জ্বল দিন",v:90000}];
const MAT=[{en:"Black velvet",bn:"কালো ভেলভেট",v:.01},{en:"Stainless steel",bn:"স্টেইনলেস স্টিল",v:.65},{en:"White wall paint",bn:"সাদা দেয়াল রং",v:.80},{en:"Silver-plated metal",bn:"সিলভার প্লেটেড ধাতু",v:.90},{en:"Snow",bn:"বরফ",v:.93}];
const LB={i:3,r:4};const fmtN=x=>x>=1?Math.round(x).toLocaleString("en-US"):String(+x.toFixed(4));
function labHTML(){return `<h3>${tr({en:"Try it: f = i × r",bn:"নিজে করে দেখো: f = i × r"})}</h3>
  <div><div class="k">${tr({en:"Illumination i(x,y)",bn:"ইলুমিনেশন i(x,y)"})}</div><div class="chips" id="ill">${ILL.map((o,i)=>`<button class="chip" data-i="${i}" aria-pressed="${i===LB.i}">${tr(o)}<small>${fmtN(o.v)}</small></button>`).join("")}</div></div>
  <div><div class="k">${tr({en:"Reflectance r(x,y)",bn:"রিফ্লেক্ট্যান্স r(x,y)"})}</div><div class="chips" id="mat">${MAT.map((o,i)=>`<button class="chip" data-i="${i}" aria-pressed="${i===LB.r}">${tr(o)}<small>${o.v.toFixed(2)}</small></button>`).join("")}</div></div>
  <div class="out"><div class="sw" id="sw"></div><div class="eq" id="eq"></div></div>
  <p class="fine">${tr({en:"Typical values from Gonzalez & Woods, Digital Image Processing. Units: lumens per square metre (lm/m²). The patch on the stage above updates too.",bn:"মানগুলো Gonzalez & Woods-এর Digital Image Processing বই থেকে নেওয়া। একক: লুমেন প্রতি বর্গমিটার (lm/m²)। উপরের স্টেজের প্যাচটিও বদলাবে।"})}</p>`}
function labBind(root,svg){const upd=()=>{const i=ILL[LB.i].v,r=MAT[LB.r].v,f=i*r,b=Math.max(0,Math.min(1,Math.log10(f*10+1)/Math.log10(900001)));
  const col=`hsl(215 10% ${Math.round(4+b*90)}%)`;
  root.querySelectorAll("#ill .chip").forEach(e=>e.setAttribute("aria-pressed",+e.dataset.i===LB.i));
  root.querySelectorAll("#mat .chip").forEach(e=>e.setAttribute("aria-pressed",+e.dataset.i===LB.r));
  root.querySelector("#sw").style.background=col;const p=svg.querySelector("#patch");p&&(p.style.fill=col);
  const ir=svg.querySelector("#inrays");ir&&ir.querySelectorAll(".ray").forEach(e=>e.style.opacity=.25+.75*(Math.log10(i*10+1)/Math.log10(900001)));
  root.querySelector("#eq").innerHTML=`f = ${fmtN(i)} × ${r.toFixed(2)} = <b>${fmtN(f)}</b> lm/m²`};
  root.querySelectorAll("#ill .chip").forEach(b=>b.onclick=()=>{LB.i=+b.dataset.i;upd()});
  root.querySelectorAll("#mat .chip").forEach(b=>b.onclick=()=>{LB.r=+b.dataset.i;upd()});upd()}

const CH4=[
/* 1 ------------------------------------------------------------------ */
{id:"illum",slides:"2",title:{en:"Illumination meets the scene",bn:"আলো ও দৃশ্যের মিলন"},
svg:`
<g data-s="0">
  <text class="h" x="30" y="40">REFLECTION</text>
  ${SUN(80,100)}
  <text x="124" y="92">Illumination source</text>
  <polygon class="plane" points="70,400 320,400 360,350 110,350"/>
  <path class="obj" transform="translate(222,312) scale(.8)" d="${BLOB}"/>
  <text class="dim" x="70" y="428">Scene</text>
</g>
<line class="divider" x1="400" y1="20" x2="400" y2="420"/>
<g data-s="1">
  <line class="ray" x1="100" y1="120" x2="186" y2="282" marker-end="url(#ah)"/>
  <line class="ray" x1="110" y1="114" x2="238" y2="272" marker-end="url(#ah)"/>
  <line class="ray" x1="90" y1="128" x2="142" y2="356" marker-end="url(#ah)"/>
  <text class="dim" x="26" y="250">energy</text>
</g>
<g data-s="2">
  <line class="ray" x1="244" y1="276" x2="316" y2="200" marker-end="url(#ah)"/>
  <line class="ray" x1="196" y1="292" x2="312" y2="212" marker-end="url(#ah)"/>
  <g transform="translate(320,172)"><rect class="dev" x="0" y="0" width="56" height="40" rx="6"/><circle class="lens" cx="0" cy="20" r="11"/></g>
  <text x="318" y="160">Camera</text>
  <text class="am" x="40" y="66" style="font-size:14px">Light reflected from a surface</text>
</g>
<g data-s="3">
  <text class="h" x="430" y="40">TRANSMISSION</text>
  <text class="bl" x="430" y="66" style="font-size:14px">X-rays pass through the body</text>
  <line class="xray" x1="600" y1="96" x2="470" y2="372" marker-end="url(#ahx)"/>
  <line class="xray" x1="600" y1="96" x2="535" y2="372" marker-end="url(#ahx)"/>
  <line class="xray" x1="600" y1="96" x2="600" y2="372" marker-end="url(#ahx)"/>
  <line class="xray" x1="600" y1="96" x2="665" y2="372" marker-end="url(#ahx)"/>
  <line class="xray" x1="600" y1="96" x2="730" y2="372" marker-end="url(#ahx)"/>
  <rect class="dev" x="560" y="78" width="80" height="26" rx="5"/>
  <text x="650" y="97">X-ray source</text>
  <ellipse class="body" cx="600" cy="238" rx="122" ry="62"/>
  <ellipse class="air" cx="556" cy="234" rx="38" ry="34"/><ellipse class="air" cx="646" cy="234" rx="38" ry="34"/>
  <rect class="bone" x="592" y="250" width="16" height="40" rx="4"/>
  <text class="dim" x="728" y="196">Patient</text>
  <rect class="film" x="455" y="380" width="290" height="22" fill="url(#filmg)"/>
  <text class="dim" x="455" y="428">X-ray film</text>
</g>
<g data-s="4">
  <rect class="hl" x="303" y="160" width="88" height="64" rx="8"/>
  <rect class="hl" x="447" y="372" width="306" height="38" rx="8"/>
  <text x="400" y="18" text-anchor="middle" class="am" style="font-size:14px">Either way, a sensor must capture the energy</text>
</g>`,
steps:[
 {k:0,en:"Most images we care about are created by two things working together. An illumination source, and a scene that interacts with its energy.",
      bn:"আমরা যেসব ইমেজ নিয়ে কাজ করি, তার বেশিরভাগই তৈরি হয় দুটি জিনিস মিলে। একটি ইলুমিনেশন বা আলোক উৎস, আর সেই উৎসের এনার্জির সাথে ইন্টার‍্যাক্ট করা একটি সিন বা দৃশ্য।"},
 {k:1,en:"The source sends out energy. The elements of the scene then either reflect that energy, or absorb it.",
      bn:"উৎস থেকে এনার্জি বের হয়। তারপর দৃশ্যের বস্তুগুলো সেই এনার্জি হয় প্রতিফলিত করে, নয়তো শোষণ করে।"},
 {k:2,en:"First category: reflection. Light falls on a surface and bounces back toward the camera. An ordinary photograph is formed this way.",
      bn:"প্রথম ধরন হলো রিফ্লেকশন বা প্রতিফলন। আলো একটি তলের উপর পড়ে ক্যামেরার দিকে ফিরে আসে। সাধারণ ছবি এভাবেই তৈরি হয়।"},
 {k:3,en:"Second category: transmission. X-rays pass through a patient's body. The energy that gets through reaches the film, and produces a diagnostic X-ray image.",
      bn:"দ্বিতীয় ধরন হলো ট্রান্সমিশন। এক্স-রে রোগীর শরীরের ভেতর দিয়ে পার হয়ে যায়। যে এনার্জিটুকু পার হয়ে ফিল্মে পৌঁছায়, তা দিয়েই ডায়াগনস্টিক এক্স-রে ইমেজ তৈরি হয়।"},
 {k:4,en:"So, depending on the source, energy is either reflected from objects, or transmitted through them. Either way, a sensor must capture it. Let's see how.",
      bn:"তাহলে উৎসের ধরন অনুযায়ী এনার্জি হয় বস্তু থেকে প্রতিফলিত হয়, নয়তো বস্তুর ভেতর দিয়ে পার হয়। দুই ক্ষেত্রেই একটি সেন্সরকে সেই এনার্জি ধরতে হয়। চলো দেখি কীভাবে।"}
],
points:[
 {en:"Images come from an <b>illumination</b> source plus the reflection or absorption of its energy by the <b>scene</b>.",bn:"ইমেজ তৈরি হয় <b>ইলুমিনেশন</b> উৎস এবং <b>দৃশ্যের</b> দ্বারা সেই এনার্জির প্রতিফলন বা শোষণ থেকে।"},
 {en:"Energy is either <b>reflected from</b> objects (light off a planar surface) or <b>transmitted through</b> them (X-rays through a patient).",bn:"এনার্জি হয় বস্তু থেকে <b>প্রতিফলিত</b> হয় (তল থেকে আলো), নয়তো বস্তুর ভেতর দিয়ে <b>পার হয়</b> (রোগীর শরীরের ভেতর দিয়ে এক্স-রে)।"}
]},

/* 2 ------------------------------------------------------------------ */
{id:"single",slides:"3–6",title:{en:"The single sensor",bn:"সিঙ্গেল সেন্সর"},
svg:`
<g data-scene="anat">
 <g data-s="0">
  <text x="400" y="52" text-anchor="middle">Energy</text>
  <line class="ray" x1="330" y1="68" x2="330" y2="148" marker-end="url(#ah)"/>
  <line class="ray" x1="365" y1="68" x2="365" y2="148" marker-end="url(#ah)"/>
  <line class="ray" x1="400" y1="68" x2="400" y2="148" marker-end="url(#ah)"/>
  <line class="ray" x1="435" y1="68" x2="435" y2="148" marker-end="url(#ah)"/>
  <line class="ray" x1="470" y1="68" x2="470" y2="148" marker-end="url(#ah)"/>
  <rect class="dev" x="300" y="160" width="200" height="120" rx="6"/>
  <rect class="filter" x="296" y="155" width="208" height="10" rx="3"/>
  <line class="lead" x1="252" y1="160" x2="294" y2="160"/><text x="200" y="166">Filter</text>
  <line class="lead" x1="526" y1="286" x2="502" y2="272"/><text x="530" y="294">Housing</text>
 </g>
 <g data-s="1">
  <rect class="mat" x="335" y="192" width="130" height="56" rx="4"/>
  <line class="lead" x1="526" y1="212" x2="467" y2="218"/><text x="530" y="217">Sensing material</text>
  <line class="wire" x1="232" y1="230" x2="300" y2="230"/><circle class="node" cx="232" cy="230" r="5"/><text x="150" y="236">Power in</text>
  <path class="wire" d="M400 280 V330 H470"/>
  <path class="wave" d="M470 330 q12 -28 24 0 t24 0 t24 0 t24 0 t24 0 t24 0 t24 0"/>
  <text x="470" y="380">Voltage waveform out</text>
 </g>
</g>
<g data-scene="drum">
 <g data-s="0">
  <text x="230" y="116" text-anchor="middle">Film wrapped on a drum</text>
  <rect class="drum" x="80" y="130" width="300" height="140"/>
  <g clip-path="url(#drumclip)"><g class="spin">
    <line class="drumline" x1="80" x2="380" y1="110" y2="110"/><line class="drumline" x1="80" x2="380" y1="130" y2="130"/>
    <line class="drumline" x1="80" x2="380" y1="150" y2="150"/><line class="drumline" x1="80" x2="380" y1="170" y2="170"/>
    <line class="drumline" x1="80" x2="380" y1="190" y2="190"/><line class="drumline" x1="80" x2="380" y1="210" y2="210"/>
    <line class="drumline" x1="80" x2="380" y1="230" y2="230"/><line class="drumline" x1="80" x2="380" y1="250" y2="250"/>
    <line class="drumline" x1="80" x2="380" y1="270" y2="270"/>
  </g></g>
  <ellipse class="drumend" cx="80" cy="200" rx="22" ry="70"/>
  <ellipse class="drumend" cx="380" cy="200" rx="22" ry="70" style="fill-opacity:.35"/>
  <path class="arrw" d="M408 145 A 26 70 0 0 1 408 255" marker-end="url(#ahw)"/>
  <text x="420" y="205">Rotation</text>
  <line class="rail" x1="80" y1="322" x2="380" y2="322"/>
  <g id="d-head"><line class="beam" x1="80" y1="304" x2="80" y2="272"/><rect class="sbox" x="71" y="304" width="18" height="18" rx="3"/></g>
  <line class="arrw" x1="170" y1="352" x2="290" y2="352" marker-end="url(#ahw)"/>
  <text x="230" y="378" text-anchor="middle">Linear motion</text>
  <text class="dim" x="230" y="410" text-anchor="middle">One image line per turn · sensor steps sideways</text>
 </g>
 <g data-s="1"><text x="608" y="98" text-anchor="middle">Image being built</text><g id="d-grid"></g></g>
</g>
<g data-scene="flat">
 <g data-s="0">
  <text x="250" y="96" text-anchor="middle">Flat bed</text>
  <rect class="dev" x="70" y="110" width="360" height="230" rx="8"/>
  <rect class="paper" x="95" y="130" width="310" height="190" rx="3"/>
  <path class="objflat" transform="translate(255,228) scale(1.15)" d="${BLOB}"/>
  <g id="f-head" transform="translate(110,145)"><circle class="sbox" r="9"/></g>
  <text class="dim" x="250" y="372" text-anchor="middle">Sensor moves in two linear directions (x and y)</text>
  <text x="608" y="98" text-anchor="middle">Microdensitometer output</text><g id="f-grid"></g>
 </g>
</g>
<g data-scene="laser">
 <g data-s="0">
  <path class="surf" d="M120 392 H300 q30 -40 60 0 H470 q40 -60 80 0 H720"/>
  <rect class="dev" x="50" y="118" width="130" height="64" rx="6"/>
  <text x="115" y="210" text-anchor="middle">Laser + sensor</text>
  <line class="laserb" x1="180" y1="136" x2="370" y2="136"/>
  <line class="ret" x1="366" y1="162" x2="186" y2="162" marker-end="url(#ahw)"/>
  <g class="sweep"><line class="laserb" x1="372" y1="142" x2="372" y2="386"/><circle class="spot" cx="372" cy="386" r="6"/></g>
  <g class="mirror"><rect class="mface" x="366" y="118" width="12" height="48" rx="2"/></g>
  <text x="392" y="112">Moving mirror</text>
  <text class="am" x="560" y="300">Scanning pattern</text>
  <text class="dim" x="400" y="428" text-anchor="middle">Also used with strip and array sensors</text>
 </g>
</g>`,
init(svg){CH2grids(svg)},
steps:[
 {scene:"anat",k:0,en:"This is a single imaging sensor. Energy arrives from the top and passes through a filter. The filter keeps only the band we want, for example only green light.",
   bn:"এটি একটি সিঙ্গেল ইমেজিং সেন্সর। এনার্জি উপর থেকে এসে একটি ফিল্টারের ভেতর দিয়ে যায়। ফিল্টার শুধু দরকারি অংশটুকু রাখে, যেমন শুধু সবুজ আলো।"},
 {scene:"anat",k:1,en:"The sensing material converts the incoming energy into an electrical voltage. With power in, the output is a voltage waveform whose strength follows the light received.",
   bn:"সেন্সিং ম্যাটেরিয়াল আগত এনার্জিকে ইলেকট্রিক্যাল ভোল্টেজে রূপান্তর করে। পাওয়ার দিলে আউটপুট হিসেবে একটি ভোল্টেজ ওয়েভফর্ম পাওয়া যায়, যার মান নির্ভর করে কতটা আলো পড়েছে তার উপর।"},
 {scene:"drum",k:0,en:"But one sensor sees only one point. To build a 2-D image, there must be relative motion in both x and y, between the sensor and the area being imaged.",
   bn:"কিন্তু একটি সেন্সর একবারে মাত্র একটি বিন্দু দেখে। তাই টু-ডি ইমেজ তৈরি করতে সেন্সর আর ইমেজ করা জায়গার মধ্যে x এবং y দুই দিকেই আপেক্ষিক নড়াচড়া থাকতে হবে।"},
 {scene:"drum",k:1,fx:"drum",en:"Here the film is wrapped on a rotating drum, which gives motion in one direction. The sensor moves sideways, which gives the other. One pixel at a time, the image fills in.",
   bn:"এখানে ফিল্মটি একটি ঘূর্ণায়মান ড্রামে মোড়ানো, যা এক দিকের নড়াচড়া দেয়। আর সেন্সরটি পাশে সরে, যা অন্য দিকের নড়াচড়া দেয়। এভাবে একটি একটি পিক্সেল করে ইমেজ তৈরি হয়।"},
 {scene:"flat",k:0,fx:"flat",en:"Other arrangements use a flat bed, with the sensor moving in two linear directions. These mechanical digitizers are called microdensitometers.",
   bn:"অন্য কিছু ব্যবস্থায় একটি ফ্ল্যাট বেড ব্যবহার করা হয়, যেখানে সেন্সর দুটি সরলরৈখিক দিকে চলে। এই ধরনের মেকানিক্যাল ডিজিটাইজারকে মাইক্রোডেনসিটোমিটার বলা হয়।"},
 {scene:"laser",k:0,en:"Another design places a laser source right next to the sensor. Moving mirrors steer the beam in a scanning pattern, and send the reflected signal back to the sensor. The same idea also works with strip and array sensors.",
   bn:"আরেকটি ব্যবস্থায় সেন্সরের ঠিক পাশেই একটি লেজার সোর্স থাকে। নড়তে থাকা আয়না লেজার বিমকে স্ক্যানিং প্যাটার্নে চালায়, আর প্রতিফলিত সিগন্যালকে আবার সেন্সরে ফিরিয়ে আনে। এই একই পদ্ধতি স্ট্রিপ ও অ্যারে সেন্সরেও কাজ করে।"}
],
points:[
 {en:"A single sensor: energy → <b>filter</b> → <b>sensing material</b> → voltage waveform out.",bn:"সিঙ্গেল সেন্সর: এনার্জি → <b>ফিল্টার</b> → <b>সেন্সিং ম্যাটেরিয়াল</b> → ভোল্টেজ ওয়েভফর্ম আউট।"},
 {en:"A 2-D image needs <b>relative displacement in both x and y</b> between sensor and scene.",bn:"টু-ডি ইমেজের জন্য সেন্সর ও দৃশ্যের মধ্যে <b>x ও y দুই দিকেই আপেক্ষিক নড়াচড়া</b> লাগে।"},
 {en:"Flat-bed digitizers with the sensor moving in two linear directions are called <b>microdensitometers</b>.",bn:"যেসব ফ্ল্যাট-বেড ডিজিটাইজারে সেন্সর দুই সরলরৈখিক দিকে চলে, সেগুলোকে <b>মাইক্রোডেনসিটোমিটার</b> বলে।"},
 {en:"A <b>laser</b> source next to the sensor plus <b>moving mirrors</b> gives a scanning pattern.",bn:"সেন্সরের পাশে <b>লেজার</b> সোর্স আর <b>নড়তে থাকা আয়না</b> দিয়ে স্ক্যানিং প্যাটার্ন তৈরি হয়।"}
]},

/* 3 ------------------------------------------------------------------ */
{id:"strip",slides:"7–8",title:{en:"The sensor strip",bn:"সেন্সর স্ট্রিপ"},
svg:`
<g data-scene="strip">
 <g data-s="0">
  <path class="area" d="M60 190 C120 120 320 110 410 160 C450 190 440 300 380 330 C300 370 120 360 70 300 C40 270 40 220 60 190Z"/>
  <text class="dim" x="160" y="108">Imaged area</text>
  <g id="s-strip"></g>
  <text x="60" y="404">Sensor strip</text>
  <line class="arrw" x1="170" y1="398" x2="270" y2="398" marker-end="url(#ahw)"/>
  <text class="dim" x="280" y="404">Linear motion</text>
 </g>
 <g data-s="1"><text x="608" y="98" text-anchor="middle">One line per step</text><g id="s-grid"></g></g>
</g>
<g data-scene="ring">
 <g data-s="0">
  <g id="r-ring"></g>
  <circle class="cyl" cx="250" cy="230" r="62"/><circle class="bone" cx="230" cy="214" r="13"/><circle class="air" cx="272" cy="246" r="20"/>
  <g class="orbit"><polygon class="fan" points="250,94 172,360 328,360"/><circle class="src" cx="250" cy="86" r="10"/></g>
  <text class="dim" x="250" y="420" text-anchor="middle">Rotating X-ray source · ring of sensor strips</text>
 </g>
 <g data-s="1">
  <text x="545" y="92">Cross-sectional slices</text>
  <g transform="translate(545,106)"><polygon class="slice" points="0,30 150,30 180,0 30,0"/><ellipse class="slicex" cx="90" cy="15" rx="34" ry="9"/></g>
  <g transform="translate(545,150)"><polygon class="slice" points="0,30 150,30 180,0 30,0"/><ellipse class="slicex" cx="90" cy="15" rx="38" ry="10"/></g>
  <g transform="translate(545,194)"><polygon class="slice" points="0,30 150,30 180,0 30,0"/><ellipse class="slicex" cx="90" cy="15" rx="36" ry="10"/></g>
  <g transform="translate(545,238)"><polygon class="slice" points="0,30 150,30 180,0 30,0"/><ellipse class="slicex" cx="90" cy="15" rx="30" ry="8"/></g>
  <text class="am" x="520" y="318">✓ CAT  computerized axial tomography</text>
  <text class="am" x="520" y="346">✓ MRI  magnetic resonance imaging</text>
  <text class="am" x="520" y="374">✓ PET  positron emission tomography</text>
 </g>
</g>`,
init(svg){CH3build(svg)},
steps:[
 {scene:"strip",k:0,en:"A sensor strip is a row of sensors placed in a line. It captures one whole line of the image at once.",
   bn:"সেন্সর স্ট্রিপ হলো এক লাইনে সাজানো অনেকগুলো সেন্সর। এটি একবারে ইমেজের একটি পুরো লাইন ধরে ফেলে।"},
 {scene:"strip",k:1,fx:"strip",en:"As the strip moves across the imaged area, it adds one line per step. Motion is needed in only one direction, so it is much faster than a single sensor. Flatbed scanners work this way.",
   bn:"স্ট্রিপটি যখন ইমেজ করা জায়গার উপর দিয়ে সরে, প্রতি ধাপে একটি করে লাইন যোগ হয়। মাত্র এক দিকে নড়াচড়া লাগে, তাই এটি সিঙ্গেল সেন্সরের চেয়ে অনেক দ্রুত। ফ্ল্যাটবেড স্ক্যানার এভাবেই কাজ করে।"},
 {scene:"ring",k:0,en:"Sensor strips can also be mounted in a ring. In CAT imaging, a rotating X-ray source shines through the object, and the ring of sensors records what comes out on the other side.",
   bn:"সেন্সর স্ট্রিপকে একটি রিং আকারেও বসানো যায়। যেমন CAT ইমেজিংয়ে একটি ঘূর্ণায়মান এক্স-রে সোর্স বস্তুর ভেতর দিয়ে রশ্মি পাঠায়, আর রিংয়ের সেন্সরগুলো অন্য পাশ থেকে বের হওয়া এনার্জি রেকর্ড করে।"},
 {scene:"ring",k:1,en:"This gives cross-sectional slice images of a 3-D object. Stack the slices and you get the full volume. This is the basis of CAT, MRI and PET imaging.",
   bn:"এর ফলে একটি থ্রি-ডি বস্তুর ক্রস-সেকশনাল বা স্লাইস ইমেজ পাওয়া যায়। স্লাইসগুলো একটার উপর আরেকটা সাজালে পুরো ভলিউম পাওয়া যায়। CAT, MRI এবং PET ইমেজিং এই নীতির উপর চলে।"}
],
points:[
 {en:"A linear strip captures a full line at a time; motion is needed in <b>one direction only</b>.",bn:"লিনিয়ার স্ট্রিপ একবারে একটি পুরো লাইন ধরে; নড়াচড়া লাগে <b>শুধু এক দিকে</b>।"},
 {en:"Strips in a <b>ring configuration</b> give cross-sectional (“slice”) images of 3-D objects in medical and industrial imaging.",bn:"<b>রিং আকারে</b> বসানো স্ট্রিপ মেডিক্যাল ও ইন্ডাস্ট্রিয়াল ইমেজিংয়ে থ্রি-ডি বস্তুর ক্রস-সেকশনাল (“স্লাইস”) ইমেজ দেয়।"},
 {en:"Examples: <b>CAT</b>, <b>MRI</b>, <b>PET</b>.",bn:"উদাহরণ: <b>CAT</b>, <b>MRI</b>, <b>PET</b>।"}
]},

/* 4 ------------------------------------------------------------------ */
{id:"array",slides:"9",title:{en:"The sensor array",bn:"সেন্সর অ্যারে"},
svg:`
<g data-scene="array">
 <g data-s="1">
  <polygon class="cone" points="150,200 310,165 310,305 150,272"/>
  <polygon class="cone" points="310,165 480,116 480,332 310,305"/>
  <path class="obj" transform="translate(112,238) scale(.9)" d="${BLOB}"/>
  <line class="ray" x1="160" y1="236" x2="296" y2="236" marker-end="url(#ah)"/>
  <line class="ray" x1="322" y1="180" x2="474" y2="128" marker-end="url(#ah)"/>
  <line class="ray" x1="322" y1="290" x2="474" y2="322" marker-end="url(#ah)"/>
  <ellipse class="lens2" cx="310" cy="235" rx="12" ry="72"/>
  <text x="310" y="150" text-anchor="middle">Lens</text>
  <text class="dim" x="230" y="400" text-anchor="middle">Whole pattern focused at once · no motion</text>
 </g>
 <g data-s="0"><text x="588" y="100" text-anchor="middle">2-D sensor array (12 × 12)</text><g id="a-grid"></g></g>
</g>
<g data-scene="cmp">
 <g data-s="0">
  <text class="dim" x="260" y="74">Exposures needed for a 12 × 12 image</text>
  <text x="40" y="150" style="font-size:18px">Single sensor</text><text class="dim" x="40" y="172">motion in x and y</text>
  <rect class="track" x="260" y="132" width="440" height="24" rx="12"/><rect class="bar" id="b1" x="260" y="132" width="0" height="24" rx="12"/>
  <text class="num" id="n1" x="714" y="151">0</text>
  <text x="40" y="250" style="font-size:18px">Sensor strip</text><text class="dim" x="40" y="272">motion in one direction</text>
  <rect class="track" x="260" y="232" width="440" height="24" rx="12"/><rect class="bar" id="b2" x="260" y="232" width="0" height="24" rx="12"/>
  <text class="num" id="n2" x="714" y="251">0</text>
  <text x="40" y="350" style="font-size:18px">Sensor array</text><text class="dim" x="40" y="372">no motion</text>
  <rect class="track" x="260" y="332" width="440" height="24" rx="12"/><rect class="bar" id="b3" x="260" y="332" width="0" height="24" rx="12"/>
  <text class="num" id="n3" x="714" y="351">0</text>
 </g>
</g>`,
init(svg){this._g=makeGrid(svg.querySelector("#a-grid"),480,116,18,12)},
steps:[
 {scene:"array",k:0,en:"A sensor array is a 2-D grid of sensors. Digital cameras use arrays like this, often with millions of elements.",
   bn:"সেন্সর অ্যারে হলো সেন্সরের একটি টু-ডি গ্রিড। ডিজিটাল ক্যামেরায় এমন অ্যারে থাকে, প্রায়ই লক্ষ লক্ষ সেন্সর নিয়ে।"},
 {scene:"array",k:1,fx:"array",en:"Its key advantage: the lens focuses the energy pattern onto the whole array at once. So a complete image is captured in a single shot.",
   bn:"এর মূল সুবিধা হলো, লেন্স পুরো এনার্জি প্যাটার্নটিকে একবারে অ্যারের উপর ফোকাস করে। তাই এক শটেই সম্পূর্ণ ইমেজ পাওয়া যায়।"},
 {scene:"cmp",k:0,fx:"cmp",en:"Motion is not necessary. Compare the three. For a 12 by 12 image, a single sensor needs 144 exposures, a strip needs 12, and an array needs just one.",
   bn:"এখানে কোনো নড়াচড়ার দরকার নেই। তিনটিকে তুলনা করো। ১২ বাই ১২ একটি ইমেজের জন্য সিঙ্গেল সেন্সরের লাগে ১৪৪টি এক্সপোজার, স্ট্রিপের লাগে ১২টি, আর অ্যারের লাগে মাত্র একটি।"}
],
points:[
 {en:"Key advantage: a complete image is obtained by <b>focusing the energy pattern onto the surface of the array</b>.",bn:"মূল সুবিধা: <b>এনার্জি প্যাটার্ন অ্যারের পৃষ্ঠে ফোকাস</b> করেই সম্পূর্ণ ইমেজ পাওয়া যায়।"},
 {en:"<b>Motion is not necessary.</b>",bn:"<b>কোনো নড়াচড়ার প্রয়োজন নেই।</b>"}
]},

/* 5 ------------------------------------------------------------------ */
{id:"acq",slides:"10–13",title:{en:"The digital image acquisition process",bn:"ডিজিটাল ইমেজ অ্যাকুইজিশন প্রক্রিয়া"},
svg:`
<g data-s="0">
  ${SUN(80,80)}
  <text class="tag" x="36" y="146">(a)</text><text x="70" y="146">Illumination source</text>
  <line class="ray" x1="96" y1="106" x2="134" y2="282" marker-end="url(#ah)"/>
  <line class="ray" x1="108" y1="100" x2="172" y2="288" marker-end="url(#ah)"/>
  <path class="obj" transform="translate(152,332) scale(.95)" d="${BLOB}"/>
  <text class="tag" x="60" y="420">(b)</text><text x="94" y="420">Scene element</text>
</g>
<g data-s="1">
  <line class="ray" x1="192" y1="312" x2="366" y2="236" marker-end="url(#ah)"/>
  <line class="ray" x1="186" y1="352" x2="366" y2="268" marker-end="url(#ah)"/>
  <ellipse class="lens2" cx="380" cy="250" rx="11" ry="56"/>
  <text class="tag" x="340" y="332">(c)</text><text x="372" y="332">Imaging</text><text x="372" y="352">system</text>
</g>
<g data-s="2">
  <polygon class="iplane" points="500,140 560,105 560,360 500,395"/>
  <line class="ray" x1="392" y1="222" x2="526" y2="318" marker-end="url(#ah)"/>
  <line class="ray" x1="392" y1="280" x2="526" y2="172" marker-end="url(#ah)"/>
  <path class="obj" transform="translate(530,250) scale(.38) rotate(180)" d="${BLOB}"/>
  <text class="tag" x="440" y="424">(d)</text><text x="474" y="424">Image (focal) plane</text>
</g>
<g data-s="3">
  <g id="p-dots" transform="translate(500,140) skewY(-30)"></g>
  <text class="dim" x="470" y="84">Sensor array</text>
</g>
<g data-s="4">
  <path class="wave" d="M566 250 q8 -18 16 0 t16 0 t16 0 t16 0"/>
  <text class="dim" x="572" y="232" style="font-size:12px">A → D</text>
  <g id="e-grid"></g>
  <text class="tag" x="640" y="350">(e)</text><text x="674" y="350">Digitized</text><text x="674" y="370">image</text>
</g>`,
init(svg){CH5build(svg,this)},
steps:[
 {k:0,en:"Now let's follow the full acquisition process. Energy from an illumination source, a, falls on a scene element, b, and is reflected.",
   bn:"এবার পুরো ইমেজ অ্যাকুইজিশন প্রক্রিয়াটি ধাপে ধাপে দেখি। ইলুমিনেশন সোর্স a থেকে এনার্জি একটি সিন এলিমেন্ট b-এর উপর পড়ে এবং প্রতিফলিত হয়।"},
 {k:1,en:"The first job of the imaging system, c, is to collect this incoming energy, and focus it onto an image plane.",
   bn:"ইমেজিং সিস্টেম c-এর প্রথম কাজ হলো এই আগত এনার্জি সংগ্রহ করে একটি ইমেজ প্লেনের উপর ফোকাস করা।"},
 {k:2,en:"When the illumination is light, the front end is an optical lens. It projects the scene onto the lens focal plane, d. Notice that the image appears upside down.",
   bn:"আলো যখন ইলুমিনেশন, তখন সিস্টেমের সামনের অংশটি হলো একটি অপটিক্যাল লেন্স। লেন্সটি দৃশ্যটিকে তার ফোকাল প্লেন d-এর উপর প্রজেক্ট করে। খেয়াল করো, ইমেজটি উল্টো দেখা যাচ্ছে।"},
 {k:3,en:"A sensor array sits on the focal plane. Each sensor outputs a value proportional to the total light it receives.",
   bn:"ফোকাল প্লেনের উপরেই একটি সেন্সর অ্যারে বসানো থাকে। প্রতিটি সেন্সর তার উপর পড়া মোট আলোর সমানুপাতিক একটি মান দেয়।"},
 {k:4,fx:"egrid",en:"Digital and analog circuits sweep these outputs into an analog signal, and another section digitizes it. The result, e, is the digital image: a grid of numbers.",
   bn:"ডিজিটাল ও অ্যানালগ সার্কিট এই আউটপুটগুলো পড়ে একটি অ্যানালগ সিগন্যাল তৈরি করে, আর সিস্টেমের আরেকটি অংশ সেটিকে ডিজিটাইজ করে। ফলাফল e হলো ডিজিটাল ইমেজ, অর্থাৎ সংখ্যার একটি গ্রিড।"}
],
points:[
 {en:"(a) Illumination source → (b) scene element reflects energy.",bn:"(a) ইলুমিনেশন সোর্স → (b) সিন এলিমেন্ট এনার্জি প্রতিফলিত করে।"},
 {en:"(c) The imaging system <b>collects</b> the energy and <b>focuses</b> it onto an image plane.",bn:"(c) ইমেজিং সিস্টেম এনার্জি <b>সংগ্রহ</b> করে ইমেজ প্লেনে <b>ফোকাস</b> করে।"},
 {en:"(d) For light, an optical lens projects the scene onto the <b>lens focal plane</b>.",bn:"(d) আলোর ক্ষেত্রে অপটিক্যাল লেন্স দৃশ্যটিকে <b>লেন্সের ফোকাল প্লেনে</b> প্রজেক্ট করে।"},
 {en:"The sensor array outputs values <b>proportional to the integral of the light</b> at each sensor; circuitry turns them into an analog signal that is then <b>digitized</b> (e).",bn:"সেন্সর অ্যারে প্রতিটি সেন্সরে পড়া <b>আলোর মোট পরিমাণের সমানুপাতিক</b> মান দেয়; সার্কিট এগুলোকে অ্যানালগ সিগন্যালে রূপ দেয়, তারপর তা <b>ডিজিটাইজ</b> হয় (e)।"}
]},

/* 6 ------------------------------------------------------------------ */
{id:"model",slides:"14–15",title:{en:"A simple image formation model",bn:"একটি সরল ইমেজ ফরমেশন মডেল"},panel:()=>labHTML(),bind:(root,svg)=>labBind(root,svg),
svg:`
<g data-s="0">
  <rect id="patch" x="80" y="320" width="220" height="44" rx="4" style="fill:hsl(215 12% 70%)"/>
  <text class="dim" x="80" y="392">Object surface</text>
  <text class="fx" x="420" y="160">f(x,y)</text>
  <text class="fxs" x="420" y="204">0 &lt; f(x,y) &lt; ∞</text>
  <text class="dim" x="420" y="110">image = brightness at each point</text>
</g>
<g data-s="1" id="inrays">
  ${SUN(110,88)}
  <text class="am" x="154" y="78">i(x,y)  illumination</text>
  <line class="ray" x1="124" y1="114" x2="150" y2="310" marker-end="url(#ah)"/>
  <line class="ray" x1="138" y1="106" x2="200" y2="310" marker-end="url(#ah)"/>
  <line class="ray" x1="108" y1="120" x2="104" y2="310" marker-end="url(#ah)"/>
  <text class="fx" x="514" y="160">=</text><text class="fx am" x="542" y="160">i(x,y)</text>
</g>
<g data-s="2">
  <line class="rayb" x1="214" y1="316" x2="318" y2="204" marker-end="url(#ahx)"/>
  <line class="rayb" x1="254" y1="316" x2="330" y2="214" marker-end="url(#ahx)"/>
  <g transform="translate(330,172)"><rect class="dev" x="0" y="0" width="52" height="36" rx="6"/><circle class="lens" cx="0" cy="18" r="10"/></g>
  <text class="bl" x="250" y="280">r(x,y)  reflectance</text>
  <text class="fx" x="636" y="160">·</text><text class="fx bl" x="656" y="160">r(x,y)</text>
</g>
<g data-s="3">
  <text class="fxs" x="542" y="240">0 &lt; i(x,y) &lt; ∞</text>
  <text class="fxs" x="542" y="272">0 &lt; r(x,y) &lt; 1</text>
  <rect class="hl" x="410" y="126" width="350" height="48" rx="8"/>
</g>
<g data-s="4">
  <line class="wire" x1="430" y1="360" x2="760" y2="360"/>
  <line class="wire" x1="433" y1="350" x2="433" y2="370"/><line class="wire" x1="760" y1="350" x2="760" y2="370"/>
  <line class="beam" x1="644" y1="352" x2="644" y2="368"/><line class="beam" x1="694" y1="352" x2="694" y2="368"/>
  <line class="beam" x1="727" y1="352" x2="727" y2="368"/><line class="beam" x1="737" y1="352" x2="737" y2="368"/>
  <text class="am" x="644" y="342" text-anchor="middle" style="font-size:12px">steel .65</text>
  <text class="am" x="740" y="332" text-anchor="middle" style="font-size:12px">snow .93</text>
  <text class="am" x="433" y="342" style="font-size:12px">velvet .01</text>
  <text class="dim" x="430" y="394" style="font-size:13px">0 = total absorption</text>
  <text class="dim" x="760" y="394" text-anchor="end" style="font-size:13px">1 = total reflectance</text>
</g>`,
steps:[
 {k:0,en:"We write an image as a two-dimensional function, f of x, y. Its value at each point is the brightness there, and it must be nonzero and finite.",
   bn:"আমরা একটি ইমেজকে টু-ডাইমেনশনাল ফাংশন f(x, y) দিয়ে প্রকাশ করি। প্রতিটি বিন্দুতে এর মান হলো সেই জায়গার উজ্জ্বলতা, এবং এই মান অবশ্যই শূন্য নয় এবং সসীম হতে হবে।"},
 {k:1,en:"f has two components. The first is illumination, i of x, y. It is the amount of source light falling on the scene.",
   bn:"f-এর দুটি অংশ আছে। প্রথমটি হলো ইলুমিনেশন i(x, y)। অর্থাৎ দৃশ্যের উপর উৎস থেকে কতটা আলো পড়ছে।"},
 {k:2,en:"The second is reflectance, r of x, y. It is the fraction of that light which the object reflects back.",
   bn:"দ্বিতীয়টি হলো রিফ্লেক্ট্যান্স r(x, y)। অর্থাৎ পড়া আলোর কত অংশ বস্তুটি ফিরিয়ে দিচ্ছে।"},
 {k:3,en:"The two combine as a product: f equals i times r. Illumination lies between zero and infinity, while reflectance lies between zero and one.",
   bn:"এই দুটি গুণফল আকারে মিলিত হয়: f সমান i গুণ r। ইলুমিনেশনের মান শূন্য থেকে অসীমের মধ্যে, আর রিফ্লেক্ট্যান্সের মান শূন্য থেকে একের মধ্যে।"},
 {k:4,en:"Zero means total absorption, and one means total reflectance. Illumination depends on the source, and reflectance depends on the object. Try the lab below to see how they combine.",
   bn:"শূন্য মানে সম্পূর্ণ শোষণ, আর এক মানে সম্পূর্ণ প্রতিফলন। ইলুমিনেশন নির্ভর করে উৎসের উপর, আর রিফ্লেক্ট্যান্স নির্ভর করে বস্তুর বৈশিষ্ট্যের উপর। নিচের ল্যাবে নিজে চেষ্টা করে দেখো।"}
],
points:[
 {en:"An image is a 2-D function <b>f(x,y)</b>, with 0 &lt; f(x,y) &lt; ∞.",bn:"ইমেজ হলো একটি টু-ডি ফাংশন <b>f(x,y)</b>, যেখানে 0 &lt; f(x,y) &lt; ∞।"},
 {en:"<b>f(x,y) = i(x,y) · r(x,y)</b>: illumination times reflectance.",bn:"<b>f(x,y) = i(x,y) · r(x,y)</b>: ইলুমিনেশন গুণ রিফ্লেক্ট্যান্স।"},
 {en:"0 &lt; i(x,y) &lt; ∞ is set by the <b>illumination source</b>; 0 &lt; r(x,y) &lt; 1 is set by the <b>imaged objects</b> (0 = total absorption, 1 = total reflectance).",bn:"0 &lt; i(x,y) &lt; ∞ নির্ভর করে <b>আলোক উৎসের</b> উপর; 0 &lt; r(x,y) &lt; 1 নির্ভর করে <b>বস্তুর বৈশিষ্ট্যের</b> উপর (0 = সম্পূর্ণ শোষণ, 1 = সম্পূর্ণ প্রতিফলন)।"}
]},

/* 7 ------------------------------------------------------------------ */
{id:"xray",slides:"16",title:{en:"Transmission: the chest X-ray",bn:"ট্রান্সমিশন: বুকের এক্স-রে"},
svg:`
<g data-s="1">
  <text class="fx" x="30" y="48" style="font-size:19px">f(x,y) = i(x,y) · <tspan class="bl">t(x,y)</tspan></text>
  <line class="xray" x1="190" y1="68" x2="190" y2="220"/><line class="xray" x1="290" y1="68" x2="290" y2="220"/>
  <line class="xray" x1="400" y1="68" x2="400" y2="220"/><line class="xray" x1="510" y1="68" x2="510" y2="220"/>
  <line class="xray" x1="610" y1="68" x2="610" y2="220"/>
</g>
<g data-s="0">
  <rect class="dev" x="340" y="34" width="120" height="30" rx="5"/>
  <text x="472" y="55">X-ray source</text>
  <ellipse class="body" cx="400" cy="222" rx="250" ry="94" style="fill-opacity:.95"/>
  <ellipse class="air" cx="292" cy="214" rx="76" ry="58"/><ellipse class="air" cx="508" cy="214" rx="76" ry="58"/>
  <ellipse class="soft" cx="425" cy="240" rx="42" ry="36"/>
  <circle class="bone" cx="400" cy="292" r="19"/><rect class="bone" x="391" y="132" width="18" height="30" rx="4"/>
  <circle class="bone" cx="196" cy="164" r="9"/><circle class="bone" cx="604" cy="164" r="9"/>
  <circle class="bone" cx="168" cy="252" r="9"/><circle class="bone" cx="632" cy="252" r="9"/>
  <text class="dim" x="292" y="219" text-anchor="middle" style="font-size:13px">lung (air)</text>
  <text class="dim" x="508" y="219" text-anchor="middle" style="font-size:13px">lung (air)</text>
</g>
<g data-s="2">
  <line class="xray" x1="190" y1="326" x2="190" y2="366" style="opacity:.55"/>
  <line class="xray" x1="290" y1="326" x2="290" y2="366" style="opacity:.95"/>
  <line class="xray" x1="400" y1="326" x2="400" y2="366" style="opacity:.18"/>
  <line class="xray" x1="510" y1="326" x2="510" y2="366" style="opacity:.95"/>
  <line class="xray" x1="610" y1="326" x2="610" y2="366" style="opacity:.55"/>
  <text class="bl" x="198" y="350" style="font-size:12px">t≈.5</text><text class="bl" x="298" y="350" style="font-size:12px">t≈.9</text>
  <text class="bl" x="408" y="350" style="font-size:12px">t≈.15 bone</text><text class="bl" x="518" y="350" style="font-size:12px">t≈.9</text>
  <text class="bl" x="618" y="350" style="font-size:12px">t≈.5</text>
</g>
<g data-s="3">
  <rect x="140" y="372" width="520" height="30" style="fill:#1E2836"/>
  <rect x="165" y="372" width="50" height="30" style="fill:hsl(215 10% 48%)"/>
  <rect x="255" y="372" width="70" height="30" style="fill:hsl(215 14% 14%)"/>
  <rect x="370" y="372" width="60" height="30" style="fill:hsl(40 20% 90%)"/>
  <rect x="475" y="372" width="70" height="30" style="fill:hsl(215 14% 14%)"/>
  <rect x="585" y="372" width="50" height="30" style="fill:hsl(215 10% 48%)"/>
  <text x="400" y="428" text-anchor="middle">Film: less energy behind bone → bone looks bright</text>
</g>`,
steps:[
 {k:0,en:"The same model works for images formed by transmission, such as a chest X-ray.",
   bn:"একই মডেল ট্রান্সমিশনের মাধ্যমে তৈরি ইমেজের ক্ষেত্রেও খাটে, যেমন বুকের এক্স-রে।"},
 {k:1,en:"Here we replace reflectance with transmissivity, t. It is the fraction of energy that passes through the medium. So f equals i times t.",
   bn:"এখানে রিফ্লেক্ট্যান্সের জায়গায় আমরা ট্রান্সমিসিভিটি t ব্যবহার করি। অর্থাৎ মাধ্যমের ভেতর দিয়ে এনার্জির কত অংশ পার হয়। তাই f সমান i গুণ t।"},
 {k:2,en:"Air in the lungs lets most X-rays through, so t is high. Soft tissue lets through less. Bone blocks the most, so t is low.",
   bn:"ফুসফুসের বাতাস প্রায় সব এক্স-রে পার হতে দেয়, তাই t বেশি। নরম টিস্যু কম পার হতে দেয়। আর হাড় সবচেয়ে বেশি আটকায়, তাই t কম।"},
 {k:3,en:"That is why bones look bright on an X-ray film. Less energy reaches the film behind them. The pattern of t across the body becomes the image.",
   bn:"এ কারণেই এক্স-রে ফিল্মে হাড় উজ্জ্বল দেখায়। হাড়ের পেছনে ফিল্মে কম এনার্জি পৌঁছায়। শরীর জুড়ে t-এর এই ভিন্নতাই ইমেজ হয়ে ওঠে।"}
],
points:[
 {en:"The same expressions apply to images formed by <b>transmission</b> through a medium, such as a chest X-ray.",bn:"একই সমীকরণ মাধ্যমের ভেতর দিয়ে <b>ট্রান্সমিশনে</b> তৈরি ইমেজেও খাটে, যেমন বুকের এক্স-রে।"},
 {en:"There we use a <b>transmissivity</b> function instead of a reflectivity function.",bn:"সেখানে রিফ্লেক্টিভিটির বদলে <b>ট্রান্সমিসিভিটি</b> ফাংশন ব্যবহার করা হয়।"}
]}
];

function pic(r,c,n){const x=(c+.5)/n,y=(r+.5)/n;let v=.1;
  if(Math.hypot(x-.56,y-.6)<.3)v=.95-.6*Math.min(1,Math.hypot(x-.46,y-.5)/.42);
  const d2=Math.hypot(x-.33,y-.3);if(d2<.15)v=Math.max(v,.85-2*d2);return Math.max(.06,Math.min(1,v))}
function makeGrid(g,x0,y0,cell,n){const cells=[];
  for(let r=0;r<n;r++)for(let c=0;c<n;c++){const e=document.createElementNS(NS,"rect");
    e.setAttribute("x",x0+c*cell);e.setAttribute("y",y0+r*cell);e.setAttribute("width",cell);e.setAttribute("height",cell);
    e.setAttribute("class","px");e.dataset.v=pic(r,c,n).toFixed(2);g.appendChild(e);cells.push(e)}
  const f=document.createElementNS(NS,"rect");f.setAttribute("class","gframe");f.setAttribute("x",x0);f.setAttribute("y",y0);
  f.setAttribute("width",cell*n);f.setAttribute("height",cell*n);g.appendChild(f);return{cells,n}}
const lit=(e,on)=>{e.style.fillOpacity=on?e.dataset.v:0};
function scan(grid,mode,on){let i=0,t;const n=grid.n,N=n*n,C=grid.cells;
  const per={pixel:45,row:300,col:300,all:2600}[mode],total=mode==="pixel"?N:mode==="all"?1:n;
  const clear=()=>C.forEach(e=>lit(e,false));clear();
  const tick=()=>{if(i>=total){t=setTimeout(()=>{clear();i=0;tick()},1300);return}
    if(mode==="pixel"){lit(C[i],true);on&&on(Math.floor(i/n),i%n)}
    else if(mode==="row"){for(let c=0;c<n;c++)lit(C[i*n+c],true);on&&on(i)}
    else if(mode==="col"){for(let r=0;r<n;r++)lit(C[r*n+i],true);on&&on(i)}
    else{C.forEach(e=>lit(e,true));on&&on(0)}
    i++;t=setTimeout(tick,per)};
  t=setTimeout(tick,350);return()=>clearTimeout(t)}

function CH2grids(svg){const ch=CH4[1];
  ch._d=makeGrid(svg.querySelector("#d-grid"),500,110,18,12);
  ch._f=makeGrid(svg.querySelector("#f-grid"),500,110,18,12)}
function CH3build(svg){const ch=CH4[2],s=svg.querySelector("#s-strip");
  for(let i=0;i<12;i++){const e=document.createElementNS(NS,"rect");e.setAttribute("class","sbox");
    e.setAttribute("x",82);e.setAttribute("y",122+i*20);e.setAttribute("width",12);e.setAttribute("height",16);e.setAttribute("rx",2);s.appendChild(e)}
  ch._s=makeGrid(svg.querySelector("#s-grid"),500,110,18,12);
  const ring=svg.querySelector("#r-ring");
  for(let k=0;k<40;k++){const a=k/40*Math.PI*2,x=250+150*Math.cos(a),y=230+150*Math.sin(a);
    const e=document.createElementNS(NS,"rect");e.setAttribute("class","ringseg");e.setAttribute("x",x-9);e.setAttribute("y",y-4);
    e.setAttribute("width",18);e.setAttribute("height",8);e.setAttribute("rx",2);
    e.setAttribute("transform",`rotate(${a*180/Math.PI+90} ${x} ${y})`);ring.appendChild(e)}}
function CH5build(svg,ch){const d=svg.querySelector("#p-dots");
  for(let r=0;r<24;r++)for(let c=0;c<5;c++){const e=document.createElementNS(NS,"rect");e.setAttribute("class","sdot");
    e.setAttribute("x",5+c*11);e.setAttribute("y",6+r*10.3);e.setAttribute("width",8);e.setAttribute("height",8);d.appendChild(e)}
  ch._e=makeGrid(svg.querySelector("#e-grid"),640,185,13,10)}

function animBars(svg){let raf,t0=null;const W=440,spec=[["b1","n1",144,7200],["b2","n2",12,600],["b3","n3",1,60]];
  const step=ts=>{if(t0===null)t0=ts;const el=ts-t0;let done=true;
    spec.forEach(([b,n,cnt,dur])=>{const p=Math.min(1,el/dur);if(p<1)done=false;
      svg.querySelector("#"+b).setAttribute("width",Math.max(p>0?24:0,W*cnt/144*p));
      svg.querySelector("#"+n).textContent=Math.round(cnt*p)});
    if(!done)raf=requestAnimationFrame(step);else raf=setTimeout(()=>{t0=null;raf=requestAnimationFrame(step)},2500)};
  raf=requestAnimationFrame(step);return()=>{cancelAnimationFrame(raf);clearTimeout(raf)}}

const FX4={
  drum(svg){const h=svg.querySelector("#d-head");return scan(CH4[1]._d,"pixel",r=>h.setAttribute("transform",`translate(${r*300/11},0)`))},
  flat(svg){const h=svg.querySelector("#f-head");return scan(CH4[1]._f,"pixel",(r,c)=>h.setAttribute("transform",`translate(${110+c*280/11},${145+r*160/11})`))},
  strip(svg){const s=svg.querySelector("#s-strip");return scan(CH4[2]._s,"col",c=>s.setAttribute("transform",`translate(${c*300/11},0)`))},
  array(){return scan(CH4[3]._g,"all")},
  cmp(svg){return animBars(svg)},
  egrid(){return scan(CH4[4]._e,"all")}
};


CH4.forEach(c=>c.steps.forEach(s=>{if(typeof s.fx==="string"){const k=s.fx;s.fx=svg=>FX4[k](svg)}}));
lecture({id:"l04",no:"04",title:{en:"Image Sensing and Acquisition",bn:"ইমেজ সেন্সিং ও অ্যাকুইজিশন"},book:{en:"Ch. 2 · Digital Image Fundamentals",bn:"চ্যাপ্টার ২ · ডিজিটাল ইমেজ ফান্ডামেন্টালস"},
chapters:CH4,quiz:[
 {q:{en:"Which sensor needs relative motion in both x and y to form a 2-D image?",bn:"টু-ডি ইমেজ তৈরিতে কোন সেন্সরের x ও y দুই দিকেই নড়াচড়া লাগে?"},
  o:[{en:"Single sensor",bn:"সিঙ্গেল সেন্সর"},{en:"Sensor strip",bn:"সেন্সর স্ট্রিপ"},{en:"Sensor array",bn:"সেন্সর অ্যারে"},{en:"None of them",bn:"কোনোটিই না"}],a:0,
  w:{en:"A single sensor sees one point, so it must be moved in both directions.",bn:"সিঙ্গেল সেন্সর একবারে একটি বিন্দু দেখে, তাই দুই দিকেই সরাতে হয়।"}},
 {q:{en:"What is the key advantage of a sensor array?",bn:"সেন্সর অ্যারের মূল সুবিধা কী?"},
  o:[{en:"It needs a laser",bn:"এতে লেজার লাগে"},{en:"A complete image in one shot, no motion",bn:"কোনো নড়াচড়া ছাড়াই এক শটে পূর্ণ ইমেজ"},{en:"It captures one line at a time",bn:"একবারে একটি লাইন ধরে"},{en:"It only works with X-rays",bn:"শুধু এক্স-রেতে কাজ করে"}],a:1,
  w:{en:"The energy pattern is focused onto the whole array at once.",bn:"পুরো এনার্জি প্যাটার্ন একবারে অ্যারের উপর ফোকাস হয়।"}},
 {q:{en:"Mechanical flat-bed digitizers whose sensor moves in two linear directions are called…",bn:"যেসব মেকানিক্যাল ফ্ল্যাট-বেড ডিজিটাইজারে সেন্সর দুই সরলরৈখিক দিকে চলে, তাদের বলে…"},
  o:[{en:"Microdensitometers",bn:"মাইক্রোডেনসিটোমিটার"},{en:"Photomultipliers",bn:"ফটোমাল্টিপ্লায়ার"},{en:"Tomographs",bn:"টোমোগ্রাফ"},{en:"Spectrometers",bn:"স্পেকট্রোমিটার"}],a:0,
  w:{en:"Slide 5: these are referred to as microdensitometers.",bn:"স্লাইড ৫: এগুলোকে মাইক্রোডেনসিটোমিটার বলা হয়।"}},
 {q:{en:"Sensor strips mounted in a ring are used to obtain…",bn:"রিং আকারে বসানো সেন্সর স্ট্রিপ দিয়ে পাওয়া যায়…"},
  o:[{en:"Colour photographs",bn:"রঙিন ছবি"},{en:"Barcode readings",bn:"বারকোড রিডিং"},{en:"Cross-sectional slice images (CAT, MRI, PET)",bn:"ক্রস-সেকশনাল স্লাইস ইমেজ (CAT, MRI, PET)"},{en:"Laser scans",bn:"লেজার স্ক্যান"}],a:2,
  w:{en:"Ring configurations give slices of 3-D objects.",bn:"রিং কনফিগারেশন থ্রি-ডি বস্তুর স্লাইস দেয়।"}},
 {q:{en:"In the acquisition process, what is labelled (d)?",bn:"অ্যাকুইজিশন প্রক্রিয়ায় (d) দিয়ে কী বোঝানো হয়?"},
  o:[{en:"Illumination source",bn:"ইলুমিনেশন সোর্স"},{en:"Scene element",bn:"সিন এলিমেন্ট"},{en:"Digitized image",bn:"ডিজিটাইজড ইমেজ"},{en:"The (internal) image plane, the lens focal plane",bn:"(অভ্যন্তরীণ) ইমেজ প্লেন, অর্থাৎ লেন্সের ফোকাল প্লেন"}],a:3,
  w:{en:"a source, b scene, c imaging system, d image plane, e digitized image.",bn:"a সোর্স, b দৃশ্য, c ইমেজিং সিস্টেম, d ইমেজ প্লেন, e ডিজিটাইজড ইমেজ।"}},
 {q:{en:"In f(x,y) = i(x,y)·r(x,y), what does r = 1 mean?",bn:"f(x,y) = i(x,y)·r(x,y)-এ r = 1 মানে কী?"},
  o:[{en:"Total absorption",bn:"সম্পূর্ণ শোষণ"},{en:"Total reflectance",bn:"সম্পূর্ণ প্রতিফলন"},{en:"Infinite illumination",bn:"অসীম ইলুমিনেশন"},{en:"No image",bn:"কোনো ইমেজ নেই"}],a:1,
  w:{en:"r is bounded by 0 (total absorption) and 1 (total reflectance).",bn:"r-এর সীমা 0 (সম্পূর্ণ শোষণ) থেকে 1 (সম্পূর্ণ প্রতিফলন)।"}},
 {q:{en:"Under the same sunlight, which gives the larger f: snow (r ≈ 0.93) or black velvet (r ≈ 0.01)?",bn:"একই রোদে কোনটির f বেশি: বরফ (r ≈ 0.93) নাকি কালো ভেলভেট (r ≈ 0.01)?"},
  o:[{en:"Snow",bn:"বরফ"},{en:"Black velvet",bn:"কালো ভেলভেট"},{en:"Both equal",bn:"দুটিই সমান"},{en:"Cannot tell",bn:"বলা যায় না"}],a:0,
  w:{en:"Same i, larger r, so a larger product f.",bn:"i একই, r বড়, তাই গুণফল f বড়।"}},
 {q:{en:"For a chest X-ray, reflectance is replaced by…",bn:"বুকের এক্স-রের ক্ষেত্রে রিফ্লেক্ট্যান্সের জায়গায় ব্যবহার হয়…"},
  o:[{en:"Illumination",bn:"ইলুমিনেশন"},{en:"Focal length",bn:"ফোকাল লেংথ"},{en:"Transmissivity",bn:"ট্রান্সমিসিভিটি"},{en:"Resolution",bn:"রেজোলিউশন"}],a:2,
  w:{en:"Energy passes through the body, so we use a transmissivity function.",bn:"এনার্জি শরীরের ভেতর দিয়ে পার হয়, তাই ট্রান্সমিসিভিটি ফাংশন ব্যবহার করা হয়।"}}
]});
})();
