/* ===== Lecture 03 · Elements of visual perception ===== */
(()=>{
const EYE=`
<circle cx="300" cy="220" r="150" style="fill:#16263A;stroke:#DDE6F0;stroke-width:3" id="e-sclera"/>
<circle cx="300" cy="220" r="141" style="fill:none;stroke:#8A4F4F;stroke-width:6" id="e-chor"/>
<path id="e-ret" d="M 205 110 A 141 141 0 1 1 205 330" style="fill:none;stroke:#F2A93B;stroke-width:5"/>
<path id="e-cor" d="M168 150 Q 112 220 168 290" style="fill:#9CC3FF;fill-opacity:.18;stroke:#9CC3FF;stroke-width:3"/>
<line id="e-ir1" x1="182" y1="140" x2="182" y2="200" style="stroke:#4C8BD6;stroke-width:9;stroke-linecap:round"/>
<line id="e-ir2" x1="182" y1="240" x2="182" y2="300" style="stroke:#4C8BD6;stroke-width:9;stroke-linecap:round"/>
<ellipse id="e-lens" cx="214" cy="220" rx="20" ry="46" style="fill:#BFD6F5;fill-opacity:.5;stroke:#BFD6F5;stroke-width:2"/>
<path id="e-cil" d="M214 174 L196 140 M214 266 L196 300" style="stroke:#C9A88C;stroke-width:5"/>
<circle id="e-fov" cx="441" cy="220" r="6" style="fill:#F2A93B"/>
<path id="e-nerve" d="M432 262 L520 300 L520 330 L425 290 Z" style="fill:#C9A88C"/>`;
lecture({id:"l03",no:"03",title:{en:"Elements of Visual Perception",bn:"দৃষ্টি-অনুভূতির উপাদান"},book:{en:"Ch. 2 · Digital Image Fundamentals",bn:"চ্যাপ্টার ২ · ডিজিটাল ইমেজ ফান্ডামেন্টালস"},
chapters:[
/* 1 */
{id:"eye",slides:"2–6",title:{en:"Structure of the human eye",bn:"মানুষের চোখের গঠন"},
svg:EYE+`<g id="e-lab"></g>`,
init(svg,_){const g=$$(svg,"#e-lab");_.L={};
  const lab=(id,x,y,tx,ty,s)=>{const q=el(g,"g",{style:"opacity:.25;transition:opacity .4s"});el(q,"line",{x1:x,y1:y,x2:tx-6,y2:ty-5,class:"lead"});txt(q,tx,ty,s,"sm");_.L[id]=q};
  lab("cor",140,190,40,120,"cornea");lab("scl",420,100,560,80,"sclera");lab("cho",432,150,560,120,"choroid");lab("ret",436,190,560,160,"retina");
  lab("iris",182,150,40,80,"iris");lab("pup",182,220,40,230,"pupil");lab("lens",230,232,40,280,"lens");lab("cil",198,300,40,340,"ciliary body");
  lab("fov",446,220,560,215,"fovea");lab("blind",470,280,560,300,"blind spot / optic nerve");
  _.on=ids=>{for(const k in _.L)_.L[k].style.opacity=ids.includes(k)?1:.25}},
steps:[
 {fx:(svg,_)=>_.on(["cor","scl","cho","ret"]),en:"The eye is nearly a sphere, with an average diameter of about 20 millimetres. Three membranes enclose it: the cornea and sclera on the outside, the choroid in the middle, and the retina inside.",
   bn:"চোখ প্রায় একটি গোলক, এর গড় ব্যাস প্রায় ২০ মিলিমিটার। তিনটি আবরণ চোখকে ঘিরে রাখে: বাইরে কর্নিয়া ও স্ক্লেরা, মাঝে কোরয়েড, আর ভেতরে রেটিনা।"},
 {fx:(svg,_)=>{_.on(["iris","pup","cil"]);const a=$$(svg,"#e-ir1"),b=$$(svg,"#e-ir2");return rafLoop(t=>{const h=10+30*(.5+.5*Math.sin(t*1.4));a.setAttribute("y2",220-h);b.setAttribute("y1",220+h)})},
   en:"At the front, the choroid divides into the ciliary body and the iris. The central opening of the iris, the pupil, changes from about 2 to 8 millimetres in diameter, controlling how much light enters.",
   bn:"সামনের দিকে কোরয়েড ভাগ হয়ে সিলিয়ারি বডি ও আইরিস তৈরি করে। আইরিসের মাঝের ছিদ্র, অর্থাৎ পিউপিলের ব্যাস প্রায় ২ থেকে ৮ মিলিমিটার পর্যন্ত বদলায়, এতে চোখে কতটা আলো ঢুকবে তা নিয়ন্ত্রিত হয়।"},
 {fx:(svg,_)=>_.on(["lens","cil"]),en:"The lens is made of concentric layers of fibrous cells, held by fibres attached to the ciliary body. It contains 60 to 70 percent water, about 6 percent fat, and more protein than any other tissue in the eye.",
   bn:"লেন্স তৈরি তন্তুময় কোষের সমকেন্দ্রিক স্তর দিয়ে, যা সিলিয়ারি বডির সাথে যুক্ত তন্তু দিয়ে ঝুলে থাকে। এতে ৬০ থেকে ৭০ শতাংশ পানি, প্রায় ৬ শতাংশ চর্বি এবং চোখের অন্য যেকোনো টিস্যুর চেয়ে বেশি প্রোটিন থাকে।"},
 {fx:(svg,_)=>_.on(["ret","fov","blind"]),en:"The retina lines the back of the eye. When the eye is focused, the image of an outside object falls on the retina. The fovea is the sharpest region. Where the optic nerve leaves, there are no receptors, which creates the blind spot.",
   bn:"রেটিনা চোখের পেছনের দেয়াল ঢেকে রাখে। চোখ ফোকাস করা থাকলে বাইরের বস্তুর প্রতিবিম্ব রেটিনায় পড়ে। ফোভিয়া হলো সবচেয়ে তীক্ষ্ণ দৃষ্টির অংশ। যেখানে অপটিক নার্ভ বের হয়, সেখানে কোনো রিসেপ্টর নেই, তাই সেখানে ব্লাইন্ড স্পট তৈরি হয়।"}
].map(s=>Object.assign({k:0},s)),
points:[
 {en:"Sphere, about <b>20 mm</b>; membranes: cornea and sclera, choroid, retina.",bn:"গোলক, প্রায় <b>২০ মিমি</b>; আবরণ: কর্নিয়া ও স্ক্লেরা, কোরয়েড, রেটিনা।"},
 {en:"Pupil diameter about <b>2 to 8 mm</b>. Lens: 60–70% water, about 6% fat, much protein.",bn:"পিউপিলের ব্যাস প্রায় <b>২ থেকে ৮ মিমি</b>। লেন্স: ৬০–৭০% পানি, প্রায় ৬% চর্বি, প্রচুর প্রোটিন।"}
]},
/* 2 */
{id:"receptors",slides:"5–7",title:{en:"Rods, cones and the blind spot",bn:"রড, কোন ও ব্লাইন্ড স্পট"},
svg:`
<g data-scene="rc"><g data-s="0"><g id="rc-m"></g>
  <polygon points="520,120 534,146 506,146" style="fill:#F2A93B"/><text x="550" y="140">Cones · 6–7 million</text><text class="dim sm" x="550" y="162">colour, bright light, fovea</text>
  <circle cx="520" cy="210" r="8" style="fill:#9AA3AE"/><text x="550" y="216">Rods · 75–150 million</text><text class="dim sm" x="550" y="238">very sensitive to dim light</text>
</g></g>
<g data-scene="scot"><g data-s="0"><g id="sc-i"></g><rect id="sc-n" x="200" y="70" width="400" height="280" style="fill:#000814;opacity:0"/>
  <text id="sc-t" class="c am" x="400" y="390">daylight · cones</text></g></g>
<g data-scene="dist"><g data-s="0"><g id="ds-p"></g></g></g>`,
init(svg,_){const m=$$(svg,"#rc-m");const r=rng(5);el(m,"circle",{cx:250,cy:220,r:180,style:"fill:#120F18"});
  for(let i=0;i<900;i++){const a=r()*6.283,d=Math.sqrt(r())*175,x=250+d*Math.cos(a),y=220+d*Math.sin(a);const pc=Math.exp(-d/28);
    if(r()<pc)el(m,"polygon",{points:`${x},${y-4} ${x+4},${y+3} ${x-4},${y+3}`,style:"fill:#F2A93B"});else if(d>20&&r()<.8)el(m,"circle",{cx:x,cy:y,r:2.4,style:"fill:#9AA3AE"})}
  txt(m,250,420,"fovea in the centre: cones packed tightly","c dim sm");
  _.im=img2($$(svg,"#sc-i"),200,70,400,280);_.im.src(land(400,280));_.gr=img2($$(svg,"#sc-i"),200,70,400,280);_.gr.src(land(400,280,"gray"));_.gr.g.style.opacity=0;
  const P=plot($$(svg,"#ds-p"),{x:120,y:60,w:600,h:300,xmax:160,ymax:180,xl:"degrees from fovea",yl:"receptors /mm² ×1000",grid:1});
  const cone=v=>{const d=v-80;return 150*Math.exp(-Math.abs(d)/2.2)+6},rod=v=>{const d=v-80;if(d>13&&d<20)return 0;const a=Math.abs(d);return a<1?0:a<20?160*(a/20):160-1.3*(a-20)};
  P.fn(rod,"curve2",320);P.fn(cone,"curve",320);[0,40,80,120,160].forEach(v=>txt(P.g,P.X(v),386,String(v-80)+"°","dim c xs mono"));
  txt(P.g,P.X(80),P.Y(170),"cones","c am sm");txt(P.g,P.X(118),P.Y(150),"rods","c bl sm");el(P.g,"rect",{x:P.X(93),y:60,width:P.X(100)-P.X(93),height:300,class:"hl"});txt(P.g,P.X(96),52,"blind spot","c sm")},
steps:[
 {scene:"rc",k:0,en:"The retina has two classes of receptors. About 6 to 7 million cones are sensitive to colour and work in bright light. About 75 to 150 million rods are highly sensitive to low levels of light.",
   bn:"রেটিনায় দুই ধরনের রিসেপ্টর আছে। প্রায় ৬০ থেকে ৭০ লক্ষ কোন রং চিনতে পারে এবং উজ্জ্বল আলোয় কাজ করে। আর প্রায় সাড়ে ৭ কোটি থেকে ১৫ কোটি রড খুব কম আলোতেও অত্যন্ত সংবেদনশীল।"},
 {scene:"scot",k:0,fx:(svg,_)=>{const n=$$(svg,"#sc-n"),t=$$(svg,"#sc-t");return rafLoop(s=>{const u=.5-.5*Math.cos(s*.9);_.gr.g.style.opacity=u;n.style.opacity=u*.45;t.textContent=u>.5?"moonlight · rods only":"daylight · cones"})},
   en:"In dim light, only the rods are stimulated. This is called scotopic, or dim-light, vision. Objects that look brightly coloured in daylight appear as colourless forms by moonlight.",
   bn:"কম আলোয় শুধু রড কাজ করে। একে বলে স্কোটোপিক বা ক্ষীণ-আলোর দৃষ্টি। দিনের আলোয় যে বস্তু উজ্জ্বল রঙিন দেখায়, চাঁদের আলোয় তা রঙহীন আকৃতির মতো দেখায়।"},
 {scene:"dist",k:0,en:"This graph shows receptor density against the angle from the fovea. Cones peak sharply at the fovea. Rods are absent there, rise to a peak around 20 degrees, then fall slowly. Where the optic nerve leaves, there are no receptors at all: the blind spot. Apart from that region, the distribution is radially symmetric about the fovea.",
   bn:"এই গ্রাফে ফোভিয়া থেকে কোণ অনুযায়ী রিসেপ্টরের ঘনত্ব দেখানো হয়েছে। কোন ফোভিয়াতে সবচেয়ে বেশি। সেখানে রড নেই, প্রায় ২০ ডিগ্রিতে রড সর্বোচ্চ, তারপর ধীরে কমে যায়। যেখানে অপটিক নার্ভ বের হয়, সেখানে কোনো রিসেপ্টরই নেই: এটাই ব্লাইন্ড স্পট। ওই অংশ বাদে বণ্টনটি ফোভিয়াকে ঘিরে বৃত্তাকারে প্রতিসম।"}
],
points:[
 {en:"<b>Cones</b>: 6–7 million, colour. <b>Rods</b>: 75–150 million, low light.",bn:"<b>কোন</b>: ৬০–৭০ লক্ষ, রং। <b>রড</b>: সাড়ে ৭–১৫ কোটি, কম আলো।"},
 {en:"<b>Scotopic</b> (dim-light) vision uses only rods, so colour disappears.",bn:"<b>স্কোটোপিক</b> (ক্ষীণ-আলোর) দৃষ্টিতে শুধু রড কাজ করে, তাই রং হারিয়ে যায়।"},
 {en:"No receptors where the optic nerve leaves: the <b>blind spot</b>.",bn:"অপটিক নার্ভ যেখানে বের হয় সেখানে রিসেপ্টর নেই: <b>ব্লাইন্ড স্পট</b>।"}
]},
/* 3 */
{id:"formation",slides:"8",title:{en:"Image formation in the eye",bn:"চোখে প্রতিবিম্ব গঠন"},
svg:`
<line class="axis" x1="40" y1="300" x2="760" y2="300"/>
<g data-s="0">
  <rect x="112" y="160" width="14" height="140" style="fill:#6B4F3A"/><circle cx="119" cy="140" r="40" style="fill:#3F8F5A"/>
  <text class="c dim sm" x="119" y="330">tree · 15 m tall</text>
  <circle cx="610" cy="300" r="80" style="fill:#16263A;stroke:#DDE6F0;stroke-width:2"/>
  <ellipse cx="545" cy="300" rx="10" ry="40" class="lens2"/><circle cx="545" cy="300" r="4" class="node"/><text class="sm" x="530" y="360">C</text>
  <line class="ray" x1="119" y1="100" x2="690" y2="341"/><line class="ray" x1="119" y1="300" x2="690" y2="300" style="opacity:.4"/>
  <line x1="690" y1="300" x2="690" y2="341" style="stroke:#3F8F5A;stroke-width:6"/>
  <text class="dim sm" x="300" y="395">100 m to the eye</text><line class="arrw" x1="130" y1="380" x2="535" y2="380" marker-end="url(#ahw)"/>
  <text class="dim sm" x="560" y="420">17 mm</text><line class="arrw" x1="548" y1="405" x2="688" y2="405" marker-end="url(#ahw)"/>
</g>
<g data-s="1"><text class="lg mono am" x="300" y="70">15 / 100 = h / 17</text><text class="lg mono" x="300" y="104">h = 2.55 mm on the retina</text></g>`,
steps:[
 {k:0,en:"The lens projects an inverted image onto the retina. Point C is the optical centre of the lens. Suppose a person looks at a tree 15 metres tall from 100 metres away. The distance from C to the retina is about 17 millimetres.",
   bn:"লেন্স রেটিনার উপর একটি উল্টো প্রতিবিম্ব তৈরি করে। C বিন্দু হলো লেন্সের আলোক কেন্দ্র। ধরো, একজন মানুষ ১০০ মিটার দূর থেকে ১৫ মিটার উঁচু একটি গাছ দেখছে। C থেকে রেটিনার দূরত্ব প্রায় ১৭ মিলিমিটার।"},
 {k:1,en:"By similar triangles, 15 over 100 equals h over 17. So the image of the tree on the retina is about 2.55 millimetres high.",
   bn:"সদৃশ ত্রিভুজ থেকে, ১৫ ভাগ ১০০ সমান h ভাগ ১৭। তাই রেটিনায় গাছের প্রতিবিম্বের উচ্চতা প্রায় ২.৫৫ মিলিমিটার।"}
],
points:[{en:"Similar triangles: <b>15/100 = h/17</b> → h ≈ 2.55 mm (inverted image on the retina).",bn:"সদৃশ ত্রিভুজ: <b>১৫/১০০ = h/১৭</b> → h ≈ ২.৫৫ মিমি (রেটিনায় উল্টো প্রতিবিম্ব)।"}]},
/* 4 */
{id:"adapt",slides:"9–10",title:{en:"Brightness adaptation",bn:"উজ্জ্বলতার সাথে খাপ খাওয়ানো"},
svg:`<g id="ad-p"></g>`,
init(svg,_){const P=plot($$(svg,"#ad-p"),{x:110,y:50,w:600,h:320,xmax:10,ymax:10,xl:"log of intensity (mL)",yl:"subjective brightness",grid:1});
  [-6,-4,-2,0,2,4].forEach(v=>txt(P.g,P.X(v+6),394,String(v),"dim c xs mono"));
  _.ph=P.fn(v=>v<3?NaN:1.2+(v-3)*1.12,"curve",200);_.sc=P.fn(v=>v>5?NaN:.3+v*.55,"curve2",200);
  _.ph.setAttribute("d",_.ph.getAttribute("d").replace(/NaN/g,"0"));
  P.upd(_.ph,v=>Math.max(0,1.2+(v-3)*1.12));P.upd(_.sc,v=>v>5.3?0:.3+v*.55);
  txt(P.g,P.X(8.2),P.Y(9.6),"glare limit","sm am");txt(P.g,P.X(1.5),P.Y(2.6),"scotopic","sm bl");txt(P.g,P.X(6.6),P.Y(5.4),"photopic","sm am");txt(P.g,P.X(.1),P.Y(.15),"scotopic threshold","xs dim");
  _.ba=el(P.g,"g");_.P=P},
steps:[
 {k:0,en:"The range of light intensities the eye can adapt to is enormous, on the order of ten to the power ten, from the scotopic threshold to the glare limit.",
   bn:"চোখ যে পরিসরের আলোর সাথে খাপ খাওয়াতে পারে তা বিশাল, প্রায় দশের দশ ঘাত গুণ, স্কোটোপিক থ্রেশহোল্ড থেকে গ্লেয়ার লিমিট পর্যন্ত।"},
 {k:0,en:"Experiments show that subjective brightness, the brightness we perceive, is a logarithmic function of the light intensity entering the eye. That is why the curve is nearly straight on a log scale.",
   bn:"পরীক্ষায় দেখা গেছে, সাবজেক্টিভ ব্রাইটনেস, অর্থাৎ আমরা যে উজ্জ্বলতা অনুভব করি, তা চোখে প্রবেশ করা আলোর তীব্রতার লগারিদমিক ফাংশন। তাই লগ স্কেলে বক্ররেখাটি প্রায় সরল।"},
 {k:0,fx:(svg,_)=>{const P=_.P,g=_.ba;g.innerHTML="";const pth=el(g,"path",{class:"curve3"});const dot=el(g,"circle",{r:6,style:"fill:#4CC489"});const lb=txt(g,0,0,"adaptation level","sm gn");
   return rafLoop(t=>{const a=4.5+3.5*(.5+.5*Math.sin(t*.7)),b=1.2+(a-3)*1.12;P.upd(pth,v=>Math.abs(v-a)>1.6?NaN:b+(v-a)*.55-(v<a?(a-v)**2*1.2:0));
     pth.setAttribute("d",pth.getAttribute("d").split("L").filter(s=>!s.includes("NaN")).join("L").replace(/^(?!M)/,"M"));dot.setAttribute("cx",P.X(a));dot.setAttribute("cy",P.Y(b));lb.setAttribute("x",P.X(a)+10);lb.setAttribute("y",P.Y(b)-12)})},
   en:"But the eye cannot handle the whole range at once. It adapts to a particular level, shown in green. Around that adaptation level, it can only distinguish a much smaller range of brightness. As the light changes, the adaptation level moves.",
   bn:"কিন্তু চোখ একসাথে পুরো পরিসর সামলাতে পারে না। এটি একটি নির্দিষ্ট লেভেলের সাথে খাপ খায়, যা সবুজ রঙে দেখানো হয়েছে। সেই অ্যাডাপ্টেশন লেভেলের চারপাশে চোখ অনেক ছোট পরিসরের উজ্জ্বলতা আলাদা করতে পারে। আলো বদলালে অ্যাডাপ্টেশন লেভেলও সরে যায়।"}
],
points:[
 {en:"Adaptation range is about <b>10¹⁰</b>, from scotopic threshold to glare limit.",bn:"অ্যাডাপ্টেশনের পরিসর প্রায় <b>১০¹⁰</b>, স্কোটোপিক থ্রেশহোল্ড থেকে গ্লেয়ার লিমিট পর্যন্ত।"},
 {en:"<b>Subjective brightness ∝ log(intensity)</b>; at any moment the eye works around one adaptation level.",bn:"<b>সাবজেক্টিভ ব্রাইটনেস ∝ log(তীব্রতা)</b>; যেকোনো মুহূর্তে চোখ একটি অ্যাডাপ্টেশন লেভেলের চারপাশে কাজ করে।"}
]},
/* 5 */
{id:"weber",slides:"11–12",title:{en:"Brightness discrimination and the Weber ratio",bn:"উজ্জ্বলতা পার্থক্য ও ওয়েবার অনুপাত"},
svg:`
<g data-scene="exp"><g data-s="0"><circle cx="240" cy="220" r="150" id="wb-bg" style="fill:hsl(0 0% 45%)"/><circle cx="240" cy="220" r="40" id="wb-f" style="fill:hsl(0 0% 45%)"/>
  <text class="c dim sm" x="240" y="410">field of intensity I, with a flash of I + ΔI</text>
  <text class="mono lg" x="450" y="170">Weber ratio = ΔI<tspan baseline-shift="sub" class="xs">c</tspan> / I</text>
  <text class="dim sm" x="450" y="210">ΔIc: the smallest change seen 50% of the time</text>
  <text class="gn sm" x="450" y="250">small ratio → good discrimination</text><text class="rd sm" x="450" y="276">large ratio → poor discrimination</text>
  <text id="wb-t" class="mono am" x="450" y="330"></text></g></g>
<g data-scene="plot"><g data-s="0"><g id="wb-p"></g></g></g>`,
init(svg,_){const P=plot($$(svg,"#wb-p"),{x:120,y:60,w:580,h:300,xmax:8,ymax:3,xl:"log I",yl:"log ΔIc / I",grid:1});
  [-4,-2,0,2,4].forEach(v=>txt(P.g,P.X(v+4),384,String(v),"dim c xs mono"));[1,0,-1,-2].forEach(v=>txt(P.g,P.X(0)-8,P.Y(v+2)+4,String(v),"dim e xs mono"));
  P.fn(v=>v<3.6?2.9-.22*v:NaN,"curve2");P.upd(P.g.lastChild,v=>v<3.6?2.9-.22*v:2.1);P.fn(v=>v<3.2?NaN:2.1-.65*(v-3.2)+.04*(v-3.2)**2,"curve");P.upd(P.g.lastChild,v=>v<3.2?2.1:Math.max(.4,2.1-.5*(v-3.2)));
  txt(P.g,P.X(1.4),P.Y(2.95),"rods","bl sm");txt(P.g,P.X(5.6),P.Y(1.25),"cones","am sm");
  txt(P.g,P.X(1),P.Y(.5),"poor discrimination at low light, better at high light","dim sm")},
steps:[
 {scene:"exp",k:0,fx:svg=>{const f=$$(svg,"#wb-f"),t=$$(svg,"#wb-t");return rafLoop(s=>{const d=Math.max(0,Math.sin(s*1.3))*12;f.style.fill=`hsl(0 0% ${45+d}%)`;t.textContent=`ΔI/I = ${(d/45).toFixed(2)}`})},
   en:"How well can we tell brightness apart? In the classic experiment, a person looks at a uniform field of intensity I, and a short flash adds a small increment, delta I, in the centre. The smallest increment noticed half the time is delta I c. The ratio delta I c over I is the Weber ratio.",
   bn:"আমরা কতটা ভালোভাবে উজ্জ্বলতার পার্থক্য বুঝি? ক্লাসিক পরীক্ষায় একজন মানুষ I তীব্রতার একটি সমান আলোকিত ক্ষেত্রের দিকে তাকায়, আর মাঝখানে হঠাৎ একটু বাড়তি আলো, ডেল্টা I যোগ করা হয়। যে সবচেয়ে ছোট বৃদ্ধি অর্ধেক সময় চোখে পড়ে, সেটি ডেল্টা I c। ডেল্টা I c ভাগ I হলো ওয়েবার অনুপাত।"},
 {scene:"plot",k:0,en:"A small Weber ratio means a small change is noticed, so discrimination is good. A large ratio means discrimination is poor. The plot shows poor discrimination at low light, where rods work, and much better discrimination at high light, where cones work.",
   bn:"ওয়েবার অনুপাত ছোট মানে সামান্য পরিবর্তনও চোখে পড়ে, অর্থাৎ পার্থক্য বোঝার ক্ষমতা ভালো। অনুপাত বড় মানে পার্থক্য বোঝার ক্ষমতা কম। গ্রাফে দেখা যাচ্ছে, কম আলোয় যেখানে রড কাজ করে সেখানে পার্থক্য বোঝা কঠিন, আর বেশি আলোয় যেখানে কোন কাজ করে সেখানে অনেক ভালো।"}
],
points:[{en:"<b>Weber ratio = ΔIc / I</b>. Small → good discrimination; large → poor.",bn:"<b>ওয়েবার অনুপাত = ΔIc / I</b>। ছোট → ভালো পার্থক্য; বড় → দুর্বল।"},{en:"Discrimination is poor at low intensity (rods) and improves at high intensity (cones).",bn:"কম তীব্রতায় (রড) পার্থক্য বোঝা দুর্বল, বেশি তীব্রতায় (কোন) ভালো।"}]},
/* 6 */
{id:"mach",slides:"13–14",title:{en:"Mach bands and simultaneous contrast",bn:"মাক ব্যান্ড ও যুগপৎ কনট্রাস্ট"},
svg:`
<g data-scene="mach"><g data-s="0"><g id="mc-s"></g></g><g data-s="1"><g id="mc-p"></g></g></g>
<g data-scene="sim"><g data-s="0"><g id="sm-s"></g><text id="sm-t" class="c dim" x="400" y="400">All three inner squares have exactly the same intensity</text></g></g>`,
init(svg,_){const s=$$(svg,"#mc-s");for(let i=0;i<8;i++)el(s,"rect",{x:80+i*80,y:50,width:80,height:170,style:`fill:hsl(0 0% ${12+i*10}%)`});
  const p=$$(svg,"#mc-p");const P=plot(p,{x:80,y:250,w:640,h:150,xmax:8,ymax:9});
  P.line([[0,1],...[1,2,3,4,5,6,7].flatMap(i=>[[i,i],[i,i+1]]),[8,8]],"curve2");
  const pts=[];for(let i=0;i<8;i++){const b=i+1;pts.push([i+.02,b+(i?-.6:0)],[i+.12,b],[i+.88,b],[i+.98,b+(i<7?.6:0)])}P.line(pts,"curve");
  txt(p,80,244,"actual intensity","bl sm");txt(p,240,244,"perceived intensity","am sm");
  const q=$$(svg,"#sm-s");_.bg=[];[15,50,85].forEach((v,i)=>{_.bg.push(el(q,"rect",{x:40+i*250,y:70,width:220,height:280,style:`fill:hsl(0 0% ${v}%);transition:opacity .6s`}));el(q,"rect",{x:110+i*250,y:170,width:80,height:80,style:"fill:hsl(0 0% 50%)"})})},
steps:[
 {scene:"mach",k:0,en:"Perceived brightness is not a simple function of actual intensity. Each strip here has a perfectly uniform gray, yet near every edge the strips seem to have scalloped bands, slightly brighter or darker.",
   bn:"আমরা যে উজ্জ্বলতা অনুভব করি তা প্রকৃত তীব্রতার সরল ফাংশন নয়। এখানে প্রতিটি স্ট্রিপ একদম সমান ধূসর, তবুও প্রতিটি কিনারার কাছে একটু উজ্জ্বল বা গাঢ় ঢেউখেলানো ব্যান্ড দেখা যায়।"},
 {scene:"mach",k:1,en:"These are called Mach bands, after Ernst Mach, who described them in 1865. The blue staircase is the actual intensity. The orange curve is what we perceive, with overshoots at each edge.",
   bn:"এদের বলে মাক ব্যান্ড, আর্নস্ট মাকের নামে, যিনি ১৮৬৫ সালে এটি বর্ণনা করেন। নীল সিঁড়িটি প্রকৃত তীব্রতা। কমলা বক্ররেখাটি আমরা যা অনুভব করি, যেখানে প্রতিটি কিনারায় বাড়তি ওঠানামা আছে।"},
 {scene:"sim",k:0,fx:(svg,_)=>{const t=$$(svg,"#sm-t");return rafLoop(s=>{const u=Math.sin(s*.8)>.3;_.bg.forEach(b=>b.style.opacity=u?.08:1);t.textContent=u?"Without the backgrounds: identical":"All three inner squares have exactly the same intensity"})},
   en:"The second effect is simultaneous contrast. A region's perceived brightness depends on its background. All three centre squares have exactly the same intensity, but they look darker as the background gets lighter. Remove the backgrounds and they match.",
   bn:"দ্বিতীয় প্রভাবটি হলো যুগপৎ কনট্রাস্ট। একটি অঞ্চলের অনুভূত উজ্জ্বলতা তার পটভূমির উপর নির্ভর করে। মাঝের তিনটি বর্গের তীব্রতা একদম সমান, কিন্তু পটভূমি যত উজ্জ্বল হয়, বর্গগুলো তত গাঢ় দেখায়। পটভূমি সরালে দেখা যায় এরা একই।"}
],
points:[{en:"<b>Mach bands</b> (Ernst Mach, 1865): perceived intensity overshoots at edges.",bn:"<b>মাক ব্যান্ড</b> (আর্নস্ট মাক, ১৮৬৫): কিনারায় অনুভূত তীব্রতা বাড়তি ওঠানামা করে।"},{en:"<b>Simultaneous contrast</b>: same intensity looks darker on a lighter background.",bn:"<b>যুগপৎ কনট্রাস্ট</b>: একই তীব্রতা উজ্জ্বল পটভূমিতে গাঢ় দেখায়।"}]},
/* 7 */
{id:"illusions",slides:"15",title:{en:"Optical illusions",bn:"দৃষ্টিভ্রম"},
svg:`<g id="il"></g>`,
init(svg,_){const g=$$(svg,"#il");_.P=[];const pan=(i,x,y)=>{const q=el(g,"g",{style:"transition:opacity .4s"});el(q,"rect",{x,y,width:370,height:200,rx:10,style:"fill:#E8EEF5"});_.P.push(q);return q};
  let q=pan(0,20,14);const S=[[110,64],[190,64],[110,144],[190,144]];S.forEach(([cx,cy],k)=>{const a0=[0,90,270,180][k];el(q,"path",{d:`M${cx} ${cy} L${cx+28*Math.cos((a0)*Math.PI/180)} ${cy+28*Math.sin(a0*Math.PI/180)} A28 28 0 1 1 ${cx+28*Math.cos((a0+90)*Math.PI/180)} ${cy+28*Math.sin((a0+90)*Math.PI/180)} Z`,style:"fill:#111"})});
  txt(q,300,110,"a square","c sm",{style:"fill:#333"});
  q=pan(1,410,14);for(let k=0;k<16;k++){const a=k/16*6.283;el(q,"line",{x1:530+40*Math.cos(a),y1:114+40*Math.sin(a),x2:530+90*Math.cos(a),y2:114+90*Math.sin(a),style:"stroke:#111;stroke-width:3"})}
  txt(q,700,110,"a circle","c sm",{style:"fill:#333"});
  q=pan(2,20,226);const ml=(y,out)=>{el(q,"line",{x1:80,y1:y,x2:260,y2:y,style:"stroke:#111;stroke-width:3"});const d=out?-1:1;[[80,1],[260,-1]].forEach(([x,s])=>{el(q,"line",{x1:x,y1:y,x2:x+s*d*22,y2:y-16,style:"stroke:#111;stroke-width:3"});el(q,"line",{x1:x,y1:y,x2:x+s*d*22,y2:y+16,style:"stroke:#111;stroke-width:3"})})};
  ml(276,0);ml(366,1);_.guide=el(q,"g",{style:"opacity:0;transition:opacity .4s"});[80,260].forEach(x=>el(_.guide,"line",{x1:x,y1:250,x2:x,y2:395,style:"stroke:#C2412D;stroke-width:2;stroke-dasharray:5 4"}));
  txt(q,330,325,"same length","c sm",{style:"fill:#333"});
  q=pan(3,410,226);const cl=el(q,"defs");const cp=el(cl,"clipPath",{id:"zc"});el(cp,"rect",{x:410,y:226,width:370,height:200,rx:10});const z=el(q,"g",{"clip-path":"url(#zc)"});
  for(let k=0;k<7;k++){const x0=380+k*60;el(z,"line",{x1:x0,y1:216,x2:x0+200,y2:436,style:"stroke:#111;stroke-width:3"});for(let j=0;j<9;j++){const t=j/9,px=x0+t*200,py=216+t*220,s=k%2?1:-1;el(z,"line",{x1:px-10,y1:py+s*10,x2:px+10,y2:py-s*10,style:"stroke:#111;stroke-width:2.5"})}}},
steps:[
 {fx:(s,_)=>_.P.forEach((p,i)=>p.style.opacity=i===0?1:.25),en:"Optical illusions show that the visual system fills in information that is not there. Here, the outline of a square is seen clearly, although no lines define it.",
   bn:"দৃষ্টিভ্রম দেখায় যে আমাদের দৃষ্টিব্যবস্থা এমন তথ্যও পূরণ করে নেয় যা আসলে নেই। এখানে একটি বর্গের আকৃতি স্পষ্ট দেখা যাচ্ছে, যদিও কোনো রেখা দিয়ে সেটি আঁকা হয়নি।"},
 {fx:(s,_)=>_.P.forEach((p,i)=>p.style.opacity=i===1?1:.25),en:"The same effect works with a circle. A few line segments are enough for us to see a complete circle.",
   bn:"বৃত্তের ক্ষেত্রেও একই ঘটনা ঘটে। কয়েকটি রেখাংশই আমাদের পুরো একটি বৃত্ত দেখানোর জন্য যথেষ্ট।"},
 {fx:(s,_)=>{_.P.forEach((p,i)=>p.style.opacity=i===2?1:.25);return every(1600,()=>{_.guide.style.opacity=_.guide.style.opacity==="1"?0:1})},en:"These two horizontal segments have the same length, but one looks shorter than the other. The dashed guides prove they are equal.",
   bn:"এই দুটি আনুভূমিক রেখাংশের দৈর্ঘ্য সমান, কিন্তু একটিকে অন্যটির চেয়ে ছোট দেখায়। ড্যাশ দেওয়া গাইড লাইন প্রমাণ করে এরা সমান।"},
 {fx:(s,_)=>_.P.forEach((p,i)=>p.style.opacity=i===3?1:.25),en:"Here all the long lines at 45 degrees are equally spaced and parallel. Yet the short crosshatching makes them look far from parallel. Optical illusions are a characteristic of the human visual system that is not fully understood.",
   bn:"এখানে ৪৫ ডিগ্রিতে থাকা লম্বা রেখাগুলো সমান দূরত্বে ও সমান্তরাল। তবুও ছোট আড়াআড়ি দাগগুলোর কারণে এদের মোটেও সমান্তরাল মনে হয় না। দৃষ্টিভ্রম মানুষের দৃষ্টিব্যবস্থার এমন একটি বৈশিষ্ট্য যা এখনো পুরোপুরি বোঝা যায়নি।"}
].map(s=>Object.assign({k:0},s)),
points:[{en:"Illusory square and circle; equal-length lines; parallel lines that look tilted.",bn:"কাল্পনিক বর্গ ও বৃত্ত; সমান দৈর্ঘ্যের রেখা; সমান্তরাল রেখা যা বাঁকা দেখায়।"},{en:"Illusions are a characteristic of the human visual system that is not fully understood.",bn:"দৃষ্টিভ্রম মানুষের দৃষ্টিব্যবস্থার এমন বৈশিষ্ট্য যা পুরোপুরি বোঝা যায়নি।"}]}
],
quiz:[
 {q:{en:"Which receptors are responsible for colour vision?",bn:"রং দেখার জন্য কোন রিসেপ্টর দায়ী?"},o:[{en:"Rods",bn:"রড"},{en:"Cones",bn:"কোন"},{en:"Iris",bn:"আইরিস"},{en:"Choroid",bn:"কোরয়েড"}],a:1,w:{en:"Cones (6–7 million) sense colour.",bn:"কোন (৬০–৭০ লক্ষ) রং শনাক্ত করে।"}},
 {q:{en:"Scotopic vision uses…",bn:"স্কোটোপিক দৃষ্টিতে কাজ করে…"},o:[{en:"only rods",bn:"শুধু রড"},{en:"only cones",bn:"শুধু কোন"},{en:"both equally",bn:"দুটোই সমানভাবে"},{en:"the blind spot",bn:"ব্লাইন্ড স্পট"}],a:0,w:{en:"Dim light stimulates only rods, so colour disappears.",bn:"কম আলোয় শুধু রড কাজ করে, তাই রং হারিয়ে যায়।"}},
 {q:{en:"A 15 m tree seen from 100 m (focal distance 17 mm) gives a retinal image of about…",bn:"১০০ মিটার দূরের ১৫ মিটার গাছের (ফোকাল দূরত্ব ১৭ মিমি) রেটিনায় প্রতিবিম্ব প্রায়…"},o:[{en:"0.17 mm",bn:"০.১৭ মিমি"},{en:"2.55 mm",bn:"২.৫৫ মিমি"},{en:"15 mm",bn:"১৫ মিমি"},{en:"25.5 mm",bn:"২৫.৫ মিমি"}],a:1,w:{en:"h = 17 × 15 / 100 = 2.55 mm.",bn:"h = ১৭ × ১৫ / ১০০ = ২.৫৫ মিমি।"}},
 {q:{en:"Subjective brightness is approximately a ___ function of intensity.",bn:"সাবজেক্টিভ ব্রাইটনেস তীব্রতার প্রায় একটি ___ ফাংশন।"},o:[{en:"linear",bn:"রৈখিক"},{en:"logarithmic",bn:"লগারিদমিক"},{en:"quadratic",bn:"দ্বিঘাত"},{en:"constant",bn:"ধ্রুবক"}],a:1,w:{en:"Brightness ∝ log(intensity).",bn:"উজ্জ্বলতা ∝ log(তীব্রতা)।"}},
 {q:{en:"A large Weber ratio means…",bn:"বড় ওয়েবার অনুপাত মানে…"},o:[{en:"good brightness discrimination",bn:"ভালো পার্থক্য বোঝা"},{en:"poor brightness discrimination",bn:"দুর্বল পার্থক্য বোঝা"},{en:"colour blindness",bn:"বর্ণান্ধতা"},{en:"a bigger pupil",bn:"বড় পিউপিল"}],a:1,w:{en:"A bigger change is needed before it is noticed.",bn:"চোখে পড়ার জন্য বড় পরিবর্তন লাগে।"}},
 {q:{en:"Squares of equal intensity look darker on lighter backgrounds. This is…",bn:"সমান তীব্রতার বর্গ উজ্জ্বল পটভূমিতে গাঢ় দেখায়। এটি…"},o:[{en:"Mach bands",bn:"মাক ব্যান্ড"},{en:"simultaneous contrast",bn:"যুগপৎ কনট্রাস্ট"},{en:"the blind spot",bn:"ব্লাইন্ড স্পট"},{en:"false contouring",bn:"ফলস কনট্যুরিং"}],a:1,w:{en:"Perceived brightness depends on the surround.",bn:"অনুভূত উজ্জ্বলতা চারপাশের উপর নির্ভর করে।"}}
]});
})();
