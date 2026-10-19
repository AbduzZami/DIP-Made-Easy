/* ===== Lecture 09 · Spatial and intensity transformation ===== */
(()=>{
const SC=()=>gen("scene",128),LOW=()=>mapI(SC(),v=>.36+.28*v);
const curveGamma=(g)=>r=>Math.pow(r,g);
const sl=(id,lab,min,max,step,val)=>`<label>${lab} <input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"><output id="${id}o"></output></label>`;
const twoImg=(svg,id,_,la,lb)=>{_.A=img2($$(svg,id),40,80,250,250,la);_.B=img2($$(svg,id),510,80,250,250,lb)};
function histEqTable(n,L,r2){const N=n.reduce((a,b)=>a+b,0);let c=0;return n.map((v,k)=>{const p=r2?Math.round(v/N*100)/100:v/N;c+=p;const s=(L-1)*c;return{k,n:v,p,cdf:c,s,r:Math.round(s)}})}
lecture({id:"l09",no:"09",title:{en:"Spatial and Intensity Transformation",bn:"স্পেশাল ও ইনটেনসিটি ট্রান্সফরমেশন"},book:{en:"Ch. 3 · Intensity Transformations",bn:"চ্যাপ্টার ৩ · ইনটেনসিটি ট্রান্সফরমেশন"},
chapters:[
/* 1 */
{id:"quality",slides:"2–7",title:{en:"Image quality factors",bn:"ইমেজের মানের উপাদান"},
svg:`<g id="qf-i"></g><text id="qf-t" class="lg am" x="470" y="110"></text><text id="qf-1" class="sm" x="470" y="150"></text><text id="qf-2" class="sm dim" x="470" y="176"></text><text id="qf-3" class="sm dim" x="470" y="202"></text>`,
init(svg,_){_.im=img2($$(svg,"#qf-i"),60,70,320,320);_.im.show(SC());_.say=(t,a,b,c)=>{$$(svg,"#qf-t").textContent=t;$$(svg,"#qf-1").textContent=a;$$(svg,"#qf-2").textContent=b||"";$$(svg,"#qf-3").textContent=c||""}},
steps:[
 {fx:(svg,_)=>{_.say("Contrast","difference between bright and dark","low contrast ↔ high contrast");const I=SC();return rafLoop(t=>{const c=.25+.75*(.5+.5*Math.sin(t*1.2));_.im.show(mapI(I,v=>.5+(v-.5)*c))})},
   en:"To improve an image, we first need to assess its quality. Several factors matter, but the essential ones are contrast, brightness, spatial resolution and noise. Contrast is the difference between the bright and dark parts.",
   bn:"ইমেজ উন্নত করতে হলে আগে এর মান যাচাই করতে হয়। অনেক উপাদান আছে, তবে মূল উপাদানগুলো হলো কনট্রাস্ট, ব্রাইটনেস, স্পেশাল রেজোলিউশন এবং নয়েজ। কনট্রাস্ট হলো উজ্জ্বল ও অন্ধকার অংশের পার্থক্য।"},
 {fx:(svg,_)=>{_.say("Brightness","average pixel intensity","g = f + c brightens · g = f − c darkens");const I=SC();return rafLoop(t=>{const b=.35*Math.sin(t*1.2);_.im.show(mapI(I,v=>Math.max(0,Math.min(1,v+b))))})},
   en:"Brightness is a relative term that depends on visual perception. It refers to the average pixel intensity, and it can be raised or lowered simply by adding or subtracting a constant to the image matrix.",
   bn:"ব্রাইটনেস একটি আপেক্ষিক বিষয়, যা দৃষ্টি-অনুভূতির উপর নির্ভর করে। এটি পিক্সেলের গড় তীব্রতা বোঝায়, আর ইমেজ ম্যাট্রিক্সে একটি ধ্রুবক যোগ বা বিয়োগ করেই একে বাড়ানো বা কমানো যায়।"},
 {fx:(svg,_)=>{_.say("Spatial resolution","pixel density per unit distance","dots per inch: printers, monitors","lines per inch: laser printers · pixels per inch: monitors");const I=SC(),N=[128,64,32,16];let i=0;return every(1300,()=>{_.im.show(resizeNN(resizeNN(I,N[i%4],N[i%4]),128,128));i++})},
   en:"Spatial resolution is the number of pixels, or pixel density, per unit distance. It depends on sampling and quantization. Different devices use different measures: dots per inch for printers and monitors, lines per inch for laser printers, and pixels per inch for monitors.",
   bn:"স্পেশাল রেজোলিউশন হলো প্রতি একক দূরত্বে পিক্সেলের সংখ্যা বা ঘনত্ব। এটি স্যাম্পলিং ও কোয়ান্টাইজেশনের উপর নির্ভর করে। বিভিন্ন যন্ত্রে বিভিন্ন একক ব্যবহৃত হয়: প্রিন্টার ও মনিটরে ডটস পার ইঞ্চি, লেজার প্রিন্টারে লাইনস পার ইঞ্চি, আর মনিটরে পিক্সেলস পার ইঞ্চি।"},
 {fx:(svg,_)=>{_.say("Noise","unwanted random fluctuations","a stochastic process: true value cannot be predicted","obeys statistical properties");const I=SC();let s=1;return every(200,()=>{_.im.show(noiseG(I,.12,s++))})},
   en:"Noise is an unwanted disturbance that makes pixel values fluctuate. It is a random, or stochastic, process, so its true value cannot be predicted exactly, but it obeys statistical properties.",
   bn:"নয়েজ হলো অনাকাঙ্ক্ষিত ব্যাঘাত, যা পিক্সেলের মান ওঠানামা করায়। এটি একটি এলোমেলো বা স্টোকাস্টিক প্রক্রিয়া, তাই এর সঠিক মান আগে থেকে বলা যায় না, তবে এটি পরিসংখ্যানের নিয়ম মেনে চলে।"}
].map(s=>Object.assign({k:0},s)),
panel:()=>`<h3>${tr({en:"Try it: brightness and contrast",bn:"নিজে করো: ব্রাইটনেস ও কনট্রাস্ট"})}</h3><div class="prow">${sl("qb",tr({en:"Brightness",bn:"ব্রাইটনেস"}),-100,100,1,0)}${sl("qc",tr({en:"Contrast",bn:"কনট্রাস্ট"}),10,300,1,100)}</div><img id="qim" alt="" width="256" height="256" style="border-radius:6px;max-width:100%">`,
bind(root){const I=SC();const f=()=>{const b=+root.querySelector("#qb").value/255,c=+root.querySelector("#qc").value/100;root.querySelector("#qbo").textContent=Math.round(b*255);root.querySelector("#qco").textContent=c.toFixed(2)+"×";root.querySelector("#qim").src=toURL(mapI(I,v=>Math.max(0,Math.min(1,.5+(v-.5)*c+b))))};root.querySelectorAll("input").forEach(e=>e.oninput=f);f()},
points:[{en:"Essential quality factors: <b>contrast</b>, <b>brightness</b>, <b>spatial resolution</b>, <b>noise</b>.",bn:"মানের মূল উপাদান: <b>কনট্রাস্ট</b>, <b>ব্রাইটনেস</b>, <b>স্পেশাল রেজোলিউশন</b>, <b>নয়েজ</b>।"},{en:"Brightness = average intensity; change it by adding or subtracting a constant.",bn:"ব্রাইটনেস = গড় তীব্রতা; ধ্রুবক যোগ বা বিয়োগ করে বদলানো যায়।"}]},
/* 2 */
{id:"domains",slides:"8–13, 18–19",title:{en:"Spatial domain, frequency domain, point and neighbourhood processing",bn:"স্পেশাল ডোমেইন, ফ্রিকোয়েন্সি ডোমেইন, পয়েন্ট ও নেইবারহুড প্রসেসিং"},
svg:`<g data-scene="fd"><g data-s="0"><text class="h" x="40" y="50">FREQUENCY DOMAIN PROCESSING</text><g id="dm-f"></g>
  <text class="sm" x="40" y="330">Spatial domain: work on the image plane itself, f(x, y)</text><text class="sm dim" x="40" y="360">easier and computationally more efficient than the frequency domain</text></g></g>
<g data-scene="pn"><g data-s="0"><g id="dm-g"></g><g id="dm-k"></g><text class="mono lg am" x="430" y="110">g(x, y) = T[ f(x, y) ]</text><text id="dm-t" class="lg" x="430" y="170"></text><text id="dm-t2" class="sm dim" x="430" y="200"></text><text id="dm-t3" class="sm dim" x="430" y="226"></text></g></g>`,
init(svg,_){const f=$$(svg,"#dm-f");[["Spatial image",40],["Fourier transform",225],["Process",410],["Inverse transform",595]].forEach(([t,x],i)=>{el(f,"rect",{x,y:120,width:165,height:80,rx:10,class:i%3?"boxb":"boxa"});txt(f,x+82,166,t,"c sm");if(i<3)arrow(f,x+167,160,x+222,160)});
  el(f,"path",{d:"M677 200 v40 H122 v-36",class:"link","marker-end":"url(#ahw)"});txt(f,400,262,"back to the spatial domain","c dim xs");
  _.G=mat($$(svg,"#dm-g"),{x:60,y:90,cs:42,fs:12,data:Array.from({length:7},(_,r)=>Array.from({length:7},(_,c)=>Math.round(SC().a[(40+r*6)*128+40+c*6]*255)))});
  for(let r=0;r<7;r++)for(let c=0;c<7;c++)_.G.gray(r,c,_.G.data[r][c]/255);_.K1=kbox($$(svg,"#dm-k"),_.G,1);_.K3=kbox($$(svg,"#dm-k"),_.G,3)},
steps:[
 {scene:"fd",k:0,en:"Images can be processed in two domains. In the frequency domain, we first convert the image with the Fourier transform, process the transform, and then apply the inverse Fourier transform to return to the spatial domain. In the spatial domain we work directly on the pixels, which is easier and computationally more efficient.",
   bn:"ইমেজ দুটি ডোমেইনে প্রসেস করা যায়। ফ্রিকোয়েন্সি ডোমেইনে প্রথমে ফুরিয়ার ট্রান্সফর্ম দিয়ে ইমেজ রূপান্তর করা হয়, তারপর সেটি প্রসেস করে ইনভার্স ফুরিয়ার ট্রান্সফর্ম দিয়ে আবার স্পেশাল ডোমেইনে ফেরা হয়। স্পেশাল ডোমেইনে সরাসরি পিক্সেলের উপর কাজ হয়, যা সহজ এবং গণনায় বেশি দক্ষ।"},
 {scene:"pn",k:0,fx:(svg,_)=>{_.K3.el.style.opacity=0;_.K1.el.style.opacity=1;$$(svg,"#dm-t").textContent="Point processing: 1 × 1";$$(svg,"#dm-t2").textContent="s = T(r): g depends only on f at (x, y)";$$(svg,"#dm-t3").textContent="contrast manipulation, thresholding";let i=0;return every(600,()=>{_.K1.at(i/7|0,i%7);i=(i+1)%49})},
   en:"Spatial domain processing is written g of x y equals T of f of x y, where T is an operator defined over a neighbourhood of x y. The smallest neighbourhood is 1 by 1. Then g depends only on f at that single point, and T becomes an intensity transformation, s equals T of r. This is point processing.",
   bn:"স্পেশাল ডোমেইন প্রসেসিং লেখা হয় g(x, y) সমান T[f(x, y)], যেখানে T হলো x, y-এর একটি নেইবারহুডের উপর সংজ্ঞায়িত অপারেটর। সবচেয়ে ছোট নেইবারহুড ১ বাই ১। তখন g শুধু সেই একটি বিন্দুর f-এর উপর নির্ভর করে, আর T হয়ে যায় একটি ইনটেনসিটি ট্রান্সফরমেশন, s সমান T(r)। একে বলে পয়েন্ট প্রসেসিং।"},
 {scene:"pn",k:0,fx:(svg,_)=>{_.K1.el.style.opacity=0;_.K3.el.style.opacity=1;$$(svg,"#dm-t").textContent="Neighbourhood processing: 3 × 3";$$(svg,"#dm-t2").textContent="the output uses all pixels under the window";$$(svg,"#dm-t3").textContent="spatial filtering, e.g. sharpening";let i=0;return every(600,()=>{_.K3.at(i/5|0,i%5);i=(i+1)%25})},
   en:"With a larger neighbourhood, such as 3 by 3, the window moves from pixel to pixel and the output depends on all the pixels under it. This is neighbourhood processing, or spatial filtering, used for operations like sharpening.",
   bn:"বড় নেইবারহুড, যেমন ৩ বাই ৩ হলে, উইন্ডোটি পিক্সেল থেকে পিক্সেলে সরে, আর আউটপুট তার নিচের সব পিক্সেলের উপর নির্ভর করে। একে বলে নেইবারহুড প্রসেসিং বা স্পেশাল ফিল্টারিং, যা শার্পেনিংয়ের মতো কাজে ব্যবহৃত হয়।"}
],
points:[{en:"Frequency domain: FT → process → inverse FT. Spatial domain: work on pixels directly; more efficient.",bn:"ফ্রিকোয়েন্সি ডোমেইন: FT → প্রসেস → ইনভার্স FT। স্পেশাল ডোমেইন: সরাসরি পিক্সেলে; বেশি দক্ষ।"},{en:"g(x,y) = T[f(x,y)]. 1 × 1 → <b>point processing</b>, s = T(r). Larger → <b>neighbourhood processing</b>.",bn:"g(x,y) = T[f(x,y)]। ১ × ১ → <b>পয়েন্ট প্রসেসিং</b>, s = T(r)। বড় → <b>নেইবারহুড প্রসেসিং</b>।"}]},
/* 3 */
{id:"threshold",slides:"14–17",title:{en:"Contrast stretching and thresholding",bn:"কনট্রাস্ট স্ট্রেচিং ও থ্রেশহোল্ডিং"},
svg:`<g data-scene="cv"><g data-s="0"><g id="th-p"></g><g id="th-i"></g></g></g>
<g data-scene="ex"><g data-s="0"><text class="h" x="40" y="50">EXAMPLE · 3-BIT IMAGE, k = 4</text><g id="th-a"></g><text class="lg c" x="400" y="230">→</text><g id="th-b"></g><text id="th-f" class="mono am c" x="400" y="420"></text></g></g>`,
init(svg,_){const P=plot($$(svg,"#th-p"),{x:70,y:60,w:300,h:300,xmax:1,ymax:1,xl:"r",yl:"s = T(r)",grid:1});txt(P.g,P.X(.5),P.Y(0)+18,"k","c am sm");_.P=P;_.c=P.fn(r=>r,"curve");_.im=img2($$(svg,"#th-i"),470,60,300,300);
  const A=[[4,3,5,2],[3,6,4,6],[2,2,6,5],[7,6,4,1]];_.A=mat($$(svg,"#th-a"),{x:110,y:110,cs:62,data:A,fs:18,label:"input"});_.B=mat($$(svg,"#th-b"),{x:440,y:110,cs:62,data:A.map(r=>r.map(()=>"")),fs:18,label:"output"})},
steps:[
 {scene:"cv",k:0,fx:(svg,_)=>{_.P.upd(_.c,r=>.5+.5*Math.tanh((r-.5)*9)/Math.tanh(4.5));const I=SC();_.im.show(mapI(I,r=>.5+.5*Math.tanh((r-.5)*9)/Math.tanh(4.5)))},
   en:"With T as a curve, we can produce higher contrast than the original. Intensities below k are darkened toward black, and intensities above k are brightened toward white. This is contrast stretching.",
   bn:"T-কে একটি বক্ররেখা হিসেবে নিলে মূল ইমেজের চেয়ে বেশি কনট্রাস্ট পাওয়া যায়। k-এর নিচের তীব্রতা কালোর দিকে গাঢ় হয়, আর k-এর উপরের তীব্রতা সাদার দিকে উজ্জ্বল হয়। একে বলে কনট্রাস্ট স্ট্রেচিং।"},
 {scene:"cv",k:0,fx:(svg,_)=>{_.P.upd(_.c,r=>r<.5?0:1,400);_.im.show(mapI(SC(),r=>r<.5?0:1))},
   en:"In the limit, T becomes a step. Every r up to k becomes black, and every r above k becomes white. The result is a two-level, or binary, image. This is thresholding.",
   bn:"চরম অবস্থায় T একটি ধাপের মতো হয়। k পর্যন্ত সব r কালো, আর k-এর উপরের সব r সাদা হয়ে যায়। ফলাফল একটি দুই-লেভেলের বা বাইনারি ইমেজ। একে বলে থ্রেশহোল্ডিং।"},
 {scene:"ex",k:0,fx:(svg,_)=>{const L=[];for(let r=0;r<4;r++)for(let c=0;c<4;c++)L.push([450,()=>{_.A.clear("a");_.A.cls(r,c,"a");const v=_.A.data[r][c],o=v>=4?7:0;_.B.set(r,c,o);_.B.cls(r,c,o?"w":"k");$$(svg,"#th-f").textContent=`${v} ${v>=4?"≥":"<"} 4 → ${o}`}]);
   L.reset=()=>{_.B.clear("w","k");_.A.clear("a");for(let r=0;r<4;r++)for(let c=0;c<4;c++)_.B.set(r,c,"")};return seq(L,true,2500)},
   en:"Here is the worked example with k equal to 4 on a 3-bit image. Pixels of 4 or more become 7, the brightest level, and pixels below 4 become 0.",
   bn:"এখানে ৩-বিট ইমেজে k সমান ৪ ধরে উদাহরণটি করা হলো। ৪ বা তার বেশি মানের পিক্সেল হয় ৭, অর্থাৎ সবচেয়ে উজ্জ্বল লেভেল, আর ৪-এর কম পিক্সেল হয় ০।"}
],
points:[{en:"<b>Contrast stretching</b>: darken below k, brighten above k.",bn:"<b>কনট্রাস্ট স্ট্রেচিং</b>: k-এর নিচে গাঢ়, উপরে উজ্জ্বল।"},{en:"<b>Thresholding</b>: r ≤ k → 0, r > k → white; example k = 4 gives a 0/7 image.",bn:"<b>থ্রেশহোল্ডিং</b>: r ≤ k → ০, r > k → সাদা; উদাহরণে k = ৪ দিলে ০/৭ ইমেজ।"}]},
/* 4 */
{id:"negative",slides:"20–23",title:{en:"Basic intensity functions and image negatives",bn:"মৌলিক ইনটেনসিটি ফাংশন ও ইমেজ নেগেটিভ"},
svg:`<g data-scene="fam"><g data-s="0"><g id="ng-f"></g></g></g>
<g data-scene="neg"><g data-s="0"><text class="mono lg am" x="40" y="50">s = L − 1 − r</text><g id="ng-m"></g><g id="ng-i"></g></g></g>`,
init(svg,_){const P=plot($$(svg,"#ng-f"),{x:180,y:40,w:440,h:340,xmax:1,ymax:1,xl:"input r",yl:"output s",grid:1});
  const F=[["identity",r=>r,"curve2"],["negative",r=>1-r,"curve4"],["log",r=>Math.log(1+255*r)/Math.log(256),"curve"],["inverse log",r=>(Math.pow(256,r)-1)/255,"curve3"],["nth root",r=>Math.pow(r,.33),"curve"],["nth power",r=>Math.pow(r,3),"curve3"]];
  _.F=F.map(([n,f,c],i)=>{const g=el(P.g,"g",{style:"opacity:0;transition:opacity .5s"});P.g.appendChild(g);const p=el(g,"path",{d:P.path(f),class:c,style:i>=4?"stroke-dasharray:6 5":""});const t=[.18,.82,.08,.85,.04,.9][i];txt(g,P.X(t)+6,P.Y(f(t))-6,n,"sm");return g});
  const m=$$(svg,"#ng-m");for(let r=0;r<8;r++){txt(m,60+r*40,120,String(r),"c mono");txt(m,60+r*40,240,String(7-r),"c mono am");el(m,"line",{x1:60+r*40,y1:128,x2:60+(7-r)*40,y2:222,class:"link",style:"stroke-opacity:.6"})}
  txt(m,30,124,"r","mono dim");txt(m,30,244,"s","mono dim");
  const x=gen("xray",128);img2($$(svg,"#ng-i"),420,70,160,160,"original").show(x);img2($$(svg,"#ng-i"),600,70,160,160,"negative").show(mapI(x,v=>1-v));
  txt($$(svg,"#ng-i"),590,300,"white or gray detail in large dark areas","c dim sm");txt($$(svg,"#ng-i"),590,322,"becomes easier to see (e.g. mammograms)","c dim sm")},
steps:[
 {scene:"fam",k:0,fx:(svg,_)=>{let i=0;return every(900,()=>{_.F.forEach((g,j)=>g.style.opacity=j<=i?1:0);i=Math.min(5,i+1)})},
   en:"There are three basic families of intensity transformation functions: linear, which includes the negative and identity; logarithmic, which includes log and inverse log; and power law, also called gamma correction, with nth root and nth power curves.",
   bn:"ইনটেনসিটি ট্রান্সফরমেশন ফাংশনের তিনটি মৌলিক পরিবার আছে: লিনিয়ার, যার মধ্যে নেগেটিভ ও আইডেন্টিটি; লগারিদমিক, যার মধ্যে লগ ও ইনভার্স লগ; এবং পাওয়ার ল বা গামা কারেকশন, যার মধ্যে nth রুট ও nth পাওয়ার বক্ররেখা।"},
 {scene:"neg",k:0,en:"The image negative uses s equals L minus 1 minus r. For a 3-bit image with L equal to 8, 0 becomes 7, 1 becomes 6, and so on. Negatives enhance white or gray detail embedded in dark regions, especially when black areas are large, as in digital mammograms.",
   bn:"ইমেজ নেগেটিভে ব্যবহার হয় s সমান L বিয়োগ ১ বিয়োগ r। L সমান ৮ এমন ৩-বিট ইমেজে ০ হয় ৭, ১ হয় ৬, এভাবে চলে। নেগেটিভ অন্ধকার অঞ্চলে লুকানো সাদা বা ধূসর খুঁটিনাটি স্পষ্ট করে, বিশেষ করে যখন কালো অংশ বড়, যেমন ডিজিটাল ম্যামোগ্রামে।"}
],
points:[{en:"Families: <b>linear</b> (negative, identity), <b>logarithmic</b> (log, inverse log), <b>power law</b> (nth root, nth power).",bn:"পরিবার: <b>লিনিয়ার</b> (নেগেটিভ, আইডেন্টিটি), <b>লগারিদমিক</b> (লগ, ইনভার্স লগ), <b>পাওয়ার ল</b> (nth রুট, nth পাওয়ার)।"},{en:"Negative: <b>s = L − 1 − r</b>; reveals detail in dark regions.",bn:"নেগেটিভ: <b>s = L − ১ − r</b>; অন্ধকার অঞ্চলের খুঁটিনাটি দেখায়।"}]},
/* 5 */
{id:"log",slides:"24–30",title:{en:"Log transformation",bn:"লগ ট্রান্সফরমেশন"},
svg:`<g data-scene="lc"><g data-s="0"><g id="lg-p"></g><text class="mono lg am" x="470" y="110">s = c · log(1 + r)</text><text class="sm" x="470" y="160">dark values: stretched (expanded)</text><text class="sm" x="470" y="186">bright values: compressed</text><text class="sm dim" x="470" y="230">the slope is steep at low r and flat at high r</text></g></g>
<g data-scene="ls"><g data-s="0"><g id="lg-i"></g></g></g>
<g data-scene="lb"><g data-s="0"><g id="lg-b"></g></g></g>`,
init(svg,_){const P=plot($$(svg,"#lg-p"),{x:80,y:60,w:320,h:320,xmax:1,ymax:1,xl:"r",yl:"s",grid:1});P.fn(r=>Math.log(1+255*r)/Math.log(256),"curve");P.fn(r=>r,"curve2");
  const S=gen("spectrum",128),c=1/Math.log(1001);img2($$(svg,"#lg-i"),70,70,280,280,"Fourier spectrum, linear display").show(S,1);img2($$(svg,"#lg-i"),450,70,280,280,"after log transform").show(mapI(S,v=>c*Math.log(1+1000*v)));
  const I=mapI(SC(),v=>.45+.55*v);img2($$(svg,"#lg-b"),70,70,280,280,"details mostly in bright values").show(I);img2($$(svg,"#lg-b"),450,70,280,280,"log: bright details lost").show(mapI(I,v=>Math.log(1+255*v)/Math.log(256)))},
steps:[
 {scene:"lc",k:0,en:"The log transformation is s equals c times log of 1 plus r. It maps dark pixel values to a wider range of outputs and compresses bright values into a narrower range. So it enhances detail in dark areas and reduces contrast in bright areas, because the log rises quickly at low values and slowly at high values.",
   bn:"লগ ট্রান্সফরমেশন হলো s সমান c গুণ log(১ যোগ r)। এটি অন্ধকার পিক্সেলের মানকে বড় পরিসরে ছড়িয়ে দেয় এবং উজ্জ্বল মানকে ছোট পরিসরে চেপে আনে। ফলে অন্ধকার অংশের খুঁটিনাটি স্পষ্ট হয় এবং উজ্জ্বল অংশের কনট্রাস্ট কমে, কারণ কম মানে লগ দ্রুত বাড়ে আর বেশি মানে ধীরে বাড়ে।"},
 {scene:"ls",k:0,en:"Its main use is when the dynamic range of an image is larger than the display can show, so low values get suppressed. A Fourier spectrum is the classic example. Displayed linearly, only a bright dot is visible. After the log transform, which compresses the dynamic range, much more detail appears.",
   bn:"এর প্রধান ব্যবহার হলো যখন ইমেজের ডায়নামিক রেঞ্জ ডিসপ্লের ক্ষমতার চেয়ে বড়, ফলে কম মানগুলো চাপা পড়ে যায়। ফুরিয়ার স্পেকট্রাম এর আদর্শ উদাহরণ। সরাসরি দেখালে শুধু একটি উজ্জ্বল বিন্দু দেখা যায়। ডায়নামিক রেঞ্জ চেপে আনা লগ ট্রান্সফর্মের পরে অনেক বেশি খুঁটিনাটি দেখা যায়।"},
 {scene:"lb",k:0,en:"But the log transform enhances low values at the expense of high values. If most of the detail is in the bright values, applying it loses information, as here.",
   bn:"কিন্তু লগ ট্রান্সফর্ম কম মান উন্নত করে বেশি মানের ক্ষতির বিনিময়ে। যদি বেশিরভাগ খুঁটিনাটি উজ্জ্বল মানে থাকে, তাহলে এটি প্রয়োগ করলে তথ্য হারিয়ে যায়, যেমন এখানে।"}
],
points:[{en:"<b>s = c·log(1 + r)</b>: expands dark values, compresses bright values.",bn:"<b>s = c·log(১ + r)</b>: অন্ধকার মান ছড়ায়, উজ্জ্বল মান চাপে।"},{en:"Use: compress large dynamic range (e.g. Fourier spectrum). Avoid when detail is in high values.",bn:"ব্যবহার: বড় ডায়নামিক রেঞ্জ চাপা (যেমন ফুরিয়ার স্পেকট্রাম)। উজ্জ্বল মানে খুঁটিনাটি থাকলে এড়িয়ে চলো।"}]},
/* 6 */
{id:"gamma",slides:"31–39",title:{en:"Power law (gamma) transformation",bn:"পাওয়ার ল (গামা) ট্রান্সফরমেশন"},
svg:`<g id="gm-p"></g><g id="gm-i"></g><text class="mono lg am" x="440" y="60">s = c · r^γ</text><text class="mono sm" x="440" y="88">c = (2ᵏ − 1) / (2ᵏ − 1)^γ</text><text id="gm-t" class="mono lg" x="440" y="410"></text>`,
init(svg,_){const P=plot($$(svg,"#gm-p"),{x:70,y:60,w:320,h:320,xmax:1,ymax:1,xl:"r",yl:"s",grid:1});_.P=P;[.04,.1,.2,.4,.67,1,1.5,2.5,5,10,25].forEach(g=>{const p=P.fn(curveGamma(g),"gl");p.style.stroke="#3A5578";p.style.strokeWidth=1.5});
  _.c=P.fn(r=>r,"curve");_.im=img2($$(svg,"#gm-i"),480,110,260,260)},
steps:[
 {k:0,fx:(svg,_)=>{const I=SC();return rafLoop(t=>{const g=Math.pow(10,Math.sin(t*.6)*.85);_.P.upd(_.c,curveGamma(g));_.im.show(mapI(I,curveGamma(g)));$$(svg,"#gm-t").textContent=`γ = ${g.toFixed(2)}`})},
   en:"The power law transformation is s equals c times r to the power gamma. For a k-bit image, c is 2 to the k minus 1, divided by 2 to the k minus 1 raised to gamma, so that the output stays in range. Watch the curve as gamma changes.",
   bn:"পাওয়ার ল ট্রান্সফরমেশন হলো s সমান c গুণ r-এর গামা ঘাত। k-বিট ইমেজের জন্য c হলো ২-এর k ঘাত বিয়োগ ১ ভাগ (২-এর k ঘাত বিয়োগ ১)-এর গামা ঘাত, যাতে আউটপুট পরিসরের মধ্যে থাকে। গামা বদলালে বক্ররেখা কীভাবে বদলায় দেখো।"},
 {k:0,fx:(svg,_)=>{_.P.upd(_.c,curveGamma(.4));_.im.show(mapI(SC(),curveGamma(.4)));$$(svg,"#gm-t").textContent="γ = 0.4 < 1"},
   en:"When gamma is less than 1, dark pixels are brightened more than bright pixels. The image looks brighter overall, and detail in dark regions becomes visible.",
   bn:"গামা ১-এর কম হলে অন্ধকার পিক্সেল উজ্জ্বল পিক্সেলের চেয়ে বেশি উজ্জ্বল হয়। পুরো ইমেজ উজ্জ্বল দেখায়, আর অন্ধকার অংশের খুঁটিনাটি দৃশ্যমান হয়।"},
 {k:0,fx:(svg,_)=>{_.P.upd(_.c,curveGamma(2.5));_.im.show(mapI(SC(),curveGamma(2.5)));$$(svg,"#gm-t").textContent="γ = 2.5 > 1"},
   en:"When gamma is greater than 1, dark regions get even darker and bright regions become less bright. The image looks darker overall. Remember, the real objective of gamma correction is a faithful display of the input image, even though a different gamma sometimes looks better to viewers.",
   bn:"গামা ১-এর বেশি হলে অন্ধকার অংশ আরও গাঢ় হয় আর উজ্জ্বল অংশ কম উজ্জ্বল হয়। পুরো ইমেজ গাঢ় দেখায়। মনে রেখো, গামা কারেকশনের আসল উদ্দেশ্য হলো ইনপুট ইমেজের বিশ্বস্ত প্রদর্শন, যদিও অন্য গামা কখনো কখনো দর্শকের কাছে বেশি ভালো লাগে।"}
],
panel:()=>`<h3>${tr({en:"Try it: gamma",bn:"নিজে করো: গামা"})}</h3><div class="prow">${sl("gg","γ",-1.4,1.4,.01,0)}</div><img id="gim" alt="" width="256" height="256" style="border-radius:6px;max-width:100%">`,
bind(root){const I=SC();const f=()=>{const g=Math.pow(10,+root.querySelector("#gg").value);root.querySelector("#ggo").textContent=g.toFixed(2);root.querySelector("#gim").src=toURL(mapI(I,curveGamma(g)))};root.querySelector("#gg").oninput=f;f()},
points:[{en:"<b>s = c·r^γ</b>, c = (2ᵏ−1)/(2ᵏ−1)^γ.",bn:"<b>s = c·r^γ</b>, c = (২ᵏ−১)/(২ᵏ−১)^γ।"},{en:"γ &lt; 1: brighter, dark detail revealed. γ &gt; 1: darker. Goal: faithful display.",bn:"γ &lt; ১: উজ্জ্বল, অন্ধকারের খুঁটিনাটি দৃশ্যমান। γ &gt; ১: গাঢ়। উদ্দেশ্য: বিশ্বস্ত প্রদর্শন।"}]},
/* 7 */
{id:"stretch",slides:"40–45",title:{en:"Piecewise linear: contrast stretching",bn:"পিসওয়াইজ লিনিয়ার: কনট্রাস্ট স্ট্রেচিং"},
svg:`<g id="cs-p"></g><g id="cs-i"></g><text id="cs-t" class="sm am" x="440" y="410"></text>`,
init(svg,_){const P=plot($$(svg,"#cs-p"),{x:70,y:60,w:300,h:300,xmax:1,ymax:1,xl:"r",yl:"s",grid:1});_.P=P;_.c=P.fn(r=>r,"curve");_.d1=el(P.g,"circle",{r:6,style:"fill:#4CC489"});_.d2=el(P.g,"circle",{r:6,style:"fill:#4CC489"});
  _.l1=txt(P.g,0,0,"(r₁, s₁)","sm gn");_.l2=txt(P.g,0,0,"(r₂, s₂)","sm gn");_.a=img2($$(svg,"#cs-i"),430,60,165,165,"low contrast");_.b=img2($$(svg,"#cs-i"),610,60,165,165,"stretched");_.a.show(LOW());
  _.set=(r1,s1,r2,s2)=>{const T=r=>r<=r1?(r1?s1*r/r1:0):r>=r2?(r2<1?s2+(1-s2)*(r-r2)/(1-r2):1):s1+(s2-s1)*(r-r1)/Math.max(1e-6,r2-r1);P.upd(_.c,T,300);
    _.d1.setAttribute("cx",P.X(r1));_.d1.setAttribute("cy",P.Y(s1));_.d2.setAttribute("cx",P.X(r2));_.d2.setAttribute("cy",P.Y(s2));_.l1.setAttribute("x",P.X(r1)+8);_.l1.setAttribute("y",P.Y(s1)-8);_.l2.setAttribute("x",P.X(r2)+8);_.l2.setAttribute("y",P.Y(s2)+18);
    _.b.show(mapI(LOW(),T));$$(svg,"#cs-t").textContent=`(r₁,s₁) = (${Math.round(r1*255)}, ${Math.round(s1*255)})   (r₂,s₂) = (${Math.round(r2*255)}, ${Math.round(s2*255)})`}},
steps:[
 {k:0,fx:(svg,_)=>_.set(.33,.33,.66,.66),en:"Low contrast images come from poor illumination, a limited dynamic range in the sensor, or a wrong lens aperture setting. Contrast stretching expands the range of intensities so that it fills the full dynamic range. It is controlled by two points, r1 s1 and r2 s2. If r1 equals s1 and r2 equals s2, the function is the identity and nothing changes.",
   bn:"কম কনট্রাস্টের ইমেজ আসে দুর্বল আলো, সেন্সরের সীমিত ডায়নামিক রেঞ্জ বা লেন্সের ভুল অ্যাপারচারের কারণে। কনট্রাস্ট স্ট্রেচিং তীব্রতার পরিসর বাড়িয়ে পুরো ডায়নামিক রেঞ্জ ভরিয়ে দেয়। এটি দুটি বিন্দু, r1 s1 ও r2 s2 দিয়ে নিয়ন্ত্রিত হয়। r1 সমান s1 ও r2 সমান s2 হলে ফাংশনটি আইডেন্টিটি, কিছুই বদলায় না।"},
 {k:0,fx:(svg,_)=>_.set(.36,0,.64,1),en:"With r1 s1 at r min, 0, and r2 s2 at r max, L minus 1, the levels are stretched linearly from their original range to the full range, 0 to L minus 1. This is min-max contrast stretching.",
   bn:"r1 s1 = (r min, ০) এবং r2 s2 = (r max, L বিয়োগ ১) নিলে লেভেলগুলো তাদের মূল পরিসর থেকে পুরো পরিসর ০ থেকে L বিয়োগ ১ পর্যন্ত সরলরৈখিকভাবে ছড়িয়ে যায়। একে বলে মিন-ম্যাক্স কনট্রাস্ট স্ট্রেচিং।"},
 {k:0,fx:(svg,_)=>_.set(.41,0,.59,1),en:"Percentile stretching moves the points inward by a constant C: r min plus C, and r max minus C. A few extreme pixels are clipped, and the rest get more contrast.",
   bn:"পার্সেন্টাইল স্ট্রেচিংয়ে বিন্দুগুলো একটি ধ্রুবক C পরিমাণ ভেতরে সরানো হয়: r min যোগ C, এবং r max বিয়োগ C। কয়েকটি চরম পিক্সেল কেটে যায়, আর বাকিগুলো বেশি কনট্রাস্ট পায়।"},
 {k:0,fx:(svg,_)=>_.set(.5,0,.5,1),en:"If r1 equals r2, s1 is 0 and s2 is L minus 1, the function becomes a thresholding function, and the result is a binary image.",
   bn:"r1 সমান r2, s1 সমান ০ এবং s2 সমান L বিয়োগ ১ হলে ফাংশনটি থ্রেশহোল্ডিং ফাংশন হয়ে যায়, আর ফলাফল হয় একটি বাইনারি ইমেজ।"}
],
panel:()=>`<h3>${tr({en:"Try it: move the control points",bn:"নিজে করো: কন্ট্রোল পয়েন্ট সরাও"})}</h3><div class="prow">${sl("r1","r₁",0,255,1,92)}${sl("r2","r₂",0,255,1,163)}</div><p class="fine">${tr({en:"s₁ = 0 and s₂ = 255. The stage above updates.",bn:"s₁ = ০ এবং s₂ = ২৫৫। উপরের স্টেজ বদলাবে।"})}</p>`,
bind(root,svg,_){const f=()=>{let a=+root.querySelector("#r1").value,b=+root.querySelector("#r2").value;if(b<a)[a,b]=[b,a];root.querySelector("#r1o").textContent=a;root.querySelector("#r2o").textContent=b;_.set(a/255,0,b/255,1)};root.querySelectorAll("input").forEach(e=>e.oninput=f)},
points:[{en:"Causes of low contrast: poor illumination, limited sensor dynamic range, wrong aperture.",bn:"কম কনট্রাস্টের কারণ: দুর্বল আলো, সেন্সরের সীমিত ডায়নামিক রেঞ্জ, ভুল অ্যাপারচার।"},{en:"Min-max: (r_min, 0), (r_max, L−1). Percentile: (r_min + C, 0), (r_max − C, L−1). r₁ = r₂ → thresholding.",bn:"মিন-ম্যাক্স: (r_min, ০), (r_max, L−১)। পার্সেন্টাইল: (r_min + C, ০), (r_max − C, L−১)। r₁ = r₂ → থ্রেশহোল্ডিং।"}]},
/* 8 */
{id:"slicing",slides:"46–49",title:{en:"Intensity level slicing",bn:"ইনটেনসিটি লেভেল স্লাইসিং"},
svg:`<g id="sc-p1"></g><g id="sc-p2"></g><g id="sc-i"></g>`,
init(svg,_){const A=.7,B=.92;_.A=A;_.B=B;const P1=plot($$(svg,"#sc-p1"),{x:50,y:40,w:150,h:150,xmax:1,ymax:1,xl:"r",yl:"s"});P1.fn(r=>r>=A&&r<=B?1:.08,"curve",300);txt(P1.g,125,232,"(a) binary result","c dim xs");
  const P2=plot($$(svg,"#sc-p2"),{x:50,y:260,w:150,h:150,xmax:1,ymax:1,xl:"r",yl:"s"});P2.fn(r=>r>=A&&r<=B?1:r,"curve",300);txt(P2.g,125,432,"(b) others unchanged","c dim xs");
  _.o=img2($$(svg,"#sc-i"),250,60,160,160,"angiogram");_.a=img2($$(svg,"#sc-i"),430,60,160,160,"(a) range → white");_.b=img2($$(svg,"#sc-i"),610,60,160,160,"(b) range → white, rest kept");
  const I=gen("angio",128);_.o.show(I);_.a.show(mapI(I,v=>v>=A&&v<=B?1:0));_.b.show(mapI(I,v=>v>=A&&v<=B?1:v));
  _.c=img2($$(svg,"#sc-i"),430,270,160,140,"mid-gray band set to black");_.c.show(mapI(I,v=>v>=.33&&v<=.48?0:v));_.c.g.style.opacity=0},
steps:[
 {k:0,fx:(svg,_)=>{_.c.g.style.opacity=0},en:"Intensity level slicing highlights a particular range of intensities that is of interest. It is used in medical images, for example to enhance flaws in X-rays, and in satellite images to highlight water bodies.",
   bn:"ইনটেনসিটি লেভেল স্লাইসিং আগ্রহের একটি নির্দিষ্ট তীব্রতার পরিসরকে স্পষ্ট করে। এটি মেডিক্যাল ইমেজে ব্যবহৃত হয়, যেমন এক্স-রের ত্রুটি স্পষ্ট করতে, আর স্যাটেলাইট ইমেজে জলাশয় চিহ্নিত করতে।"},
 {k:0,fx:(svg,_)=>{_.c.g.style.opacity=0},en:"There are two basic approaches. In the first, every value in the range of interest, A to B, becomes white and everything else becomes black, producing a binary image. In an aortic angiogram this shows the blood vessels and parts of the kidneys in white, useful for studying the shape of the contrast flow, for example to detect blockages.",
   bn:"দুটি মৌলিক পদ্ধতি আছে। প্রথমটিতে আগ্রহের পরিসর A থেকে B-এর সব মান সাদা আর বাকি সব কালো হয়, ফলে একটি বাইনারি ইমেজ তৈরি হয়। অ্যাওর্টিক অ্যানজিওগ্রামে এতে রক্তনালি ও কিডনির অংশ সাদা দেখায়, যা কনট্রাস্টের প্রবাহের আকৃতি দেখতে কাজে লাগে, যেমন ব্লকেজ খুঁজতে।"},
 {k:0,fx:(svg,_)=>{_.c.g.style.opacity=1},en:"In the second approach, the chosen range is brightened or darkened, and all other levels stay unchanged. Setting a mid-gray band to black, while keeping the rest, preserves the gray tones of the vessels and kidneys. This helps when measuring the actual flow of the contrast medium over time.",
   bn:"দ্বিতীয় পদ্ধতিতে নির্বাচিত পরিসর উজ্জ্বল বা গাঢ় করা হয়, আর বাকি সব লেভেল অপরিবর্তিত থাকে। মাঝারি ধূসর একটি ব্যান্ডকে কালো করে বাকিটা রেখে দিলে রক্তনালি ও কিডনির ধূসর টোন অক্ষত থাকে। সময়ের সাথে কনট্রাস্ট মিডিয়ামের প্রকৃত প্রবাহ মাপতে এটি কাজে লাগে।"}
],
points:[{en:"(a) Range [A, B] → one value (white), others → another (black): binary.",bn:"(ক) পরিসর [A, B] → একটি মান (সাদা), বাকি → অন্য মান (কালো): বাইনারি।"},{en:"(b) Brighten or darken [A, B], leave other levels unchanged.",bn:"(খ) [A, B] উজ্জ্বল বা গাঢ় করো, বাকি লেভেল অপরিবর্তিত।"}]},
/* 9 */
{id:"bitplane",slides:"50–58",title:{en:"Bit-plane slicing",bn:"বিট-প্লেন স্লাইসিং"},
svg:`<g data-scene="bin"><g data-s="0"><g id="bp-m"></g><g id="bp-c"></g><text id="bp-t" class="mono am" x="40" y="420"></text></g></g>
<g data-scene="sl"><g data-s="0"><g id="bp-c2"></g><g id="bp-p"></g><text id="bp-t2" class="mono am" x="40" y="420"></text></g></g>
<g data-scene="pl"><g data-s="0"><g id="bp-i"></g></g></g>
<g data-scene="rc"><g data-s="0"><g id="bp-r"></g></g></g>`,
init(svg,_){const V=[[167,133,111],[144,140,135],[159,154,148]];_.V=V;
  _.M=mat($$(svg,"#bp-m"),{x:40,y:110,cs:70,data:V,fs:18,label:"8-bit pixels"});
  const codes=(g,x0,y0,cw,ch,fs)=>{const T=[];for(let r=0;r<3;r++){T.push([]);for(let c=0;c<3;c++){const x=x0+c*cw,y=y0+r*ch;el(g,"rect",{x,y,width:cw,height:ch,class:"cell"});
      const t=el(g,"text",{x:x+cw/2,y:y+ch/2,class:"ctext",style:`font-size:${fs}px`});const bits=V[r][c].toString(2).padStart(8,"0").split("").map(b=>{const s=el(t,"tspan",{},b);return s});T[r].push({bits,t})}}
    return{T,hl(k){T.flat().forEach(o=>o.bits.forEach((s,j)=>{const on=k!=null&&j===8-k;s.style.fill=on?"#F2A93B":"";s.style.fontWeight=on?"700":""}))},show(on){T.flat().forEach(o=>o.t.style.opacity=on?1:0)}}};
  _.C=codes($$(svg,"#bp-c"),300,110,150,70,18);txt($$(svg,"#bp-c"),525,100,"binary (bit 8 … bit 1)","c dim sm");
  _.C2=codes($$(svg,"#bp-c2"),30,90,124,60,15);txt($$(svg,"#bp-c2"),216,80,"bit 8 … bit 1","c dim sm");
  const g=$$(svg,"#bp-p");_.PL=[];for(let b=8;b>=1;b--){const k=8-b;const P=mat(g,{x:432+(k%4)*90,y:90+Math.floor(k/4)*150,cs:26,fs:12,data:V.map(r=>r.map(()=>"")),label:`plane ${b}`});_.PL.push({b,P})}
  _.fill=b=>{const o=_.PL[8-b];V.forEach((row,r)=>row.forEach((v,c)=>{const bit=(v>>(b-1))&1;o.P.set(r,c,bit);o.P.cls(r,c,"w",!!bit)}))};
  _.clearPl=()=>_.PL.forEach(o=>{for(let r=0;r<3;r++)for(let c=0;c<3;c++){o.P.set(r,c,"");o.P.cls(r,c,"w",false)}});
  const r=rng(21),base=mk(128,128,(x,y)=>lum(landRGB(x,y))/255);const I=mapI(base,v=>Math.max(0,Math.min(1,v+(r()-.5)*.035)));_.I=I;
  const q8=I.a.map(v=>Math.round(v*255));const plane=b=>({w:128,h:128,a:Float32Array.from(q8,v=>(v>>(b-1))&1)});
  const gi=$$(svg,"#bp-i");_.P=[];for(let b=8;b>=1;b--){const k=8-b;const q=imgEl(gi,30+(k%4)*190,24,160,160,"");q.show(plane(b));txt(q.g,110+(k%4)*190,206,`plane ${b}`,"c dim sm");q.g.setAttribute("transform",`translate(0,${Math.floor(k/4)*205})`);_.P.push(q)}
  const recon=n=>({w:128,h:128,a:Float32Array.from(q8,v=>(v&(0xFF<<(8-n)&0xFF))/255)});const gr=$$(svg,"#bp-r");
  [[8,"original (all 8 planes)"],[1,"plane 8 only"],[2,"planes 8 + 7"],[4,"planes 8 to 5"]].forEach(([n,l],i)=>imgEl(gr,30+i*190,90,170,170,l).show(n===8?{w:128,h:128,a:Float32Array.from(q8,v=>v/255)}:recon(n)));
  txt(gr,400,330,"the top four planes already look almost like the original","c am")},
steps:[
 {scene:"bin",k:0,fx:(svg,_)=>{_.C.show(false);_.C.hl(null);const L=[];for(let r=0;r<3;r++)for(let c=0;c<3;c++)L.push([800,()=>{_.M.clear("a");_.M.cls(r,c,"a");_.C.T[r][c].t.style.opacity=1;$$(svg,"#bp-t").textContent=`${_.V[r][c]} = ${_.V[r][c].toString(2).padStart(8,"0")}`}]);
   L.reset=()=>{_.C.show(false);_.M.clear("a")};return seq(L,true,2500)},
   en:"In an 8-bit image, every pixel value from 0 to 255 is stored as 8 bits. First write each pixel of this 3 by 3 image in binary. For example, 167 is 1 0 1 0 0 1 1 1, and 133 is 1 0 0 0 0 1 0 1.",
   bn:"৮-বিট ইমেজে ০ থেকে ২৫৫ পর্যন্ত প্রতিটি পিক্সেলের মান ৮টি বিটে রাখা হয়। প্রথমে এই ৩ বাই ৩ ইমেজের প্রতিটি পিক্সেল বাইনারিতে লেখো। যেমন ১৬৭ হলো ১ ০ ১ ০ ০ ১ ১ ১, আর ১৩৩ হলো ১ ০ ০ ০ ০ ১ ০ ১।"},
 {scene:"sl",k:0,fx:(svg,_)=>{_.C2.show(true);const L=[];for(let b=8;b>=1;b--)L.push([1400,()=>{_.C2.hl(b);_.fill(b);_.PL.forEach(o=>o.P.g.style.opacity=o.b>=b?1:.25);$$(svg,"#bp-t2").textContent=`plane ${b}: bit ${b} of every pixel (2^${b-1} = ${2**(b-1)})`}]);
   L.reset=()=>{_.clearPl();_.C2.hl(null)};return seq(L,true,2500)},
   en:"Now slice. Bit plane 8 collects bit 8, the leftmost bit, of every pixel into a binary image of the same size. Bit plane 7 collects bit 7, and so on down to bit plane 1, which collects the rightmost bit. So one image becomes eight binary images. Plane 8 is the most significant, worth 128, and plane 1 the least significant, worth 1.",
   bn:"এবার ভাগ করো। বিট প্লেন ৮ প্রতিটি পিক্সেলের ৮ নম্বর বিট, অর্থাৎ সবচেয়ে বাঁয়ের বিট নিয়ে একই সাইজের একটি বাইনারি ইমেজ তৈরি করে। বিট প্লেন ৭ নেয় ৭ নম্বর বিট, এভাবে বিট প্লেন ১ পর্যন্ত, যা সবচেয়ে ডানের বিট নেয়। এভাবে একটি ইমেজ থেকে আটটি বাইনারি ইমেজ পাওয়া যায়। প্লেন ৮ সবচেয়ে গুরুত্বপূর্ণ, যার মান ১২৮, আর প্লেন ১ সবচেয়ে কম গুরুত্বপূর্ণ, যার মান ১।"},
 {scene:"pl",k:0,fx:(svg,_)=>{let i=0;_.P.forEach(q=>q.g.style.opacity=.15);return every(700,()=>{_.P.forEach((q,j)=>q.g.style.opacity=j<=i?1:.15);i=Math.min(7,i+1)})},
   en:"Here are the 8 bit planes of a real 8-bit image. The higher planes 8, 7 and 6 show the main shapes, because they carry most of the visual information. Going down, the planes lose structure. The lowest planes, 1 to 3, look like random noise, because they only hold tiny intensity changes.",
   bn:"এখানে একটি বাস্তব ৮-বিট ইমেজের ৮টি বিট প্লেন দেখানো হলো। উপরের প্লেন ৮, ৭ ও ৬-এ মূল আকৃতিগুলো দেখা যায়, কারণ এরাই বেশিরভাগ দৃশ্যমান তথ্য বহন করে। নিচের দিকে গেলে প্লেনগুলোর গঠন হারিয়ে যায়। সবচেয়ে নিচের প্লেন ১ থেকে ৩ এলোমেলো নয়েজের মতো দেখায়, কারণ এরা শুধু তীব্রতার খুব ছোট পরিবর্তন ধরে রাখে।"},
 {scene:"rc",k:0,en:"We can rebuild the image from only the higher planes. Plane 8 alone gives a two-level image. Adding plane 7 gives four levels. The top four planes already look almost like the original. This is why bit-plane slicing is useful in compression: the low planes can be dropped with little visible loss.",
   bn:"শুধু উপরের প্লেনগুলো দিয়েও ইমেজ আবার তৈরি করা যায়। শুধু প্লেন ৮ দিলে দুই লেভেলের ইমেজ পাওয়া যায়। প্লেন ৭ যোগ করলে চার লেভেল। উপরের চারটি প্লেনেই ইমেজটি প্রায় মূলের মতো দেখায়। এ কারণেই কমপ্রেশনে বিট-প্লেন স্লাইসিং কাজে লাগে: নিচের প্লেনগুলো বাদ দিলেও চোখে প্রায় পার্থক্য বোঝা যায় না।"}
],
points:[{en:"Plane k = bit k of every pixel: g_k(x,y) = (f(x,y) >> (k − 1)) AND 1. E.g. 167 = 10100111.",bn:"প্লেন k = প্রতিটি পিক্সেলের k নম্বর বিট: g_k(x,y) = (f(x,y) >> (k − ১)) AND ১। যেমন ১৬৭ = ১০১০০১১১।"},{en:"Planes 6–8: most significant information. Planes 1–5: least significant. Top planes alone reconstruct most of the image.",bn:"প্লেন ৬–৮: সবচেয়ে গুরুত্বপূর্ণ তথ্য। প্লেন ১–৫: কম গুরুত্বপূর্ণ। শুধু উপরের প্লেন দিয়েই ইমেজের বেশিরভাগ পুনর্গঠন হয়।"}]},
/* 10 */
{id:"histogram",slides:"59–62",title:{en:"Histograms",bn:"হিস্টোগ্রাম"},
svg:`<text class="mono am" x="40" y="44">h(r_k) = n_k      p(r_k) = n_k / MN</text><g id="hs-g"></g>`,
init(svg,_){const I=SC();const V=[["dark",mapI(I,v=>v*.4)],["light",mapI(I,v=>.6+v*.4)],["low contrast",mapI(I,v=>.4+v*.2)],["high contrast",I]];const g=$$(svg,"#hs-g");
  _.Q=V.map(([n,im],i)=>{const q=el(g,"g");const a=img2(q,30+i*190,70,170,170,"");a.show(im);const b=bars(q,{x:30+i*190,y:270,w:170,h:120,n:32,cls:"hbar"});const h=histo(im,32);b.set(h);txt(q,115+i*190,420,n,"c sm");return q})},
steps:[
 {k:0,en:"A histogram is the frequency of occurrence of each gray level in an image. For levels from 0 to L minus 1, h of r k equals n k, the number of pixels with level r k. Dividing by the total number of pixels, M times N, gives the normalised histogram, p of r k, an estimate of the probability of each level. Histograms are used in enhancement, compression and segmentation.",
   bn:"হিস্টোগ্রাম হলো ইমেজে প্রতিটি গ্রে লেভেল কতবার আছে তার হিসাব। ০ থেকে L বিয়োগ ১ লেভেলের জন্য h(r k) সমান n k, অর্থাৎ r k লেভেলের পিক্সেলের সংখ্যা। মোট পিক্সেল M গুণ N দিয়ে ভাগ করলে পাওয়া যায় নর্মালাইজড হিস্টোগ্রাম p(r k), যা প্রতিটি লেভেলের সম্ভাবনার অনুমান। হিস্টোগ্রাম এনহ্যান্সমেন্ট, কমপ্রেশন ও সেগমেন্টেশনে ব্যবহৃত হয়।"},
 {k:0,fx:(svg,_)=>{let i=0;return every(1300,()=>{_.Q.forEach((q,j)=>q.style.opacity=j===i%4?1:.3);i++})},
   en:"The shape of the histogram tells us about the image. A dark image has bars crowded at the low end. A light image has them at the high end. A low contrast image has a narrow histogram in the middle. A high contrast image spreads across the whole range.",
   bn:"হিস্টোগ্রামের আকার ইমেজ সম্পর্কে বলে দেয়। অন্ধকার ইমেজে বারগুলো নিচের প্রান্তে জমা থাকে। উজ্জ্বল ইমেজে থাকে উপরের প্রান্তে। কম কনট্রাস্টের ইমেজে মাঝখানে একটি সরু হিস্টোগ্রাম থাকে। বেশি কনট্রাস্টের ইমেজে বারগুলো পুরো পরিসর জুড়ে ছড়ানো থাকে।"}
],
points:[{en:"<b>h(r_k) = n_k</b>; normalised <b>p(r_k) = n_k / MN</b>.",bn:"<b>h(r_k) = n_k</b>; নর্মালাইজড <b>p(r_k) = n_k / MN</b>।"},{en:"Dark, light, low contrast and high contrast images have characteristic histograms.",bn:"অন্ধকার, উজ্জ্বল, কম ও বেশি কনট্রাস্টের ইমেজের নিজস্ব হিস্টোগ্রাম আকার আছে।"}]},
/* 11 */
{id:"histeq",slides:"63–81",title:{en:"Histogram equalization",bn:"হিস্টোগ্রাম ইকুয়ালাইজেশন"},
svg:`<g data-scene="eq"><g data-s="0"><text class="mono am" x="40" y="44">s_k = T(r_k) = (L − 1) Σⱼ₌₀ᵏ p_r(r_j)</text><g id="he-t"></g><g id="he-h1"></g><g id="he-h2"></g></g></g>
<g data-scene="im"><g data-s="0"><g id="he-i"></g></g></g>`,
init(svg,_){const n=[790,1023,850,656,329,245,122,81];const T=histEqTable(n,8,1);_.T=T;
  _.tb=table($$(svg,"#he-t"),{x:40,y:70,cw:[42,66,62,72,62],rh:34,fs:12,head:["r","n","p","(L−1)·cdf","s"],rows:T.map(t=>[t.k,t.n,t.p.toFixed(2),t.s.toFixed(2),t.r])});
  for(let r=0;r<8;r++)for(let c=2;c<5;c++)_.tb.cells[r][c].t.style.opacity=0;
  _.h1=bars($$(svg,"#he-h1"),{x:400,y:70,w:360,h:130,n:8,labels:[0,1,2,3,4,5,6,7],title:"original histogram (64 × 64, 3-bit)",values:1});_.h1.set(n,1100);
  _.h2=bars($$(svg,"#he-h2"),{x:400,y:270,w:360,h:130,n:8,labels:[0,1,2,3,4,5,6,7],title:"equalized histogram",cls:"hbar2",values:1});
  const I=LOW();img2($$(svg,"#he-i"),40,70,200,200,"low contrast").show(I);img2($$(svg,"#he-i"),300,70,200,200,"equalized").show(equalize(I));
  const b1=bars($$(svg,"#he-i"),{x:40,y:310,w:200,h:90,n:32});b1.set(histo(I,32));const b2=bars($$(svg,"#he-i"),{x:300,y:310,w:200,h:90,n:32,cls:"hbar2"});b2.set(histo(equalize(I),32));
  txt($$(svg,"#he-i"),640,140,"histogram spread over","c sm");txt($$(svg,"#he-i"),640,164,"the full range [0, L − 1]","c sm");txt($$(svg,"#he-i"),640,210,"fully automatic:","c dim sm");txt($$(svg,"#he-i"),640,234,"no parameters to choose","c dim sm")},
steps:[
 {scene:"eq",k:0,fx:(svg,_)=>{for(let r=0;r<8;r++)for(let c=2;c<5;c++)_.tb.cells[r][c].t.style.opacity=0;_.h2.set([0,0,0,0,0,0,0,0],1100);_.tb.clear()},
   en:"A good, high contrast image tends to have a flat, uniform histogram over the whole range. Histogram equalization aims for that. The transformation is the cumulative distribution: s k equals L minus 1 times the sum of p of r j, for j from 0 to k. Let's work the example: a 3-bit, 64 by 64 image, so 4096 pixels.",
   bn:"ভালো, বেশি কনট্রাস্টের ইমেজের হিস্টোগ্রাম সাধারণত পুরো পরিসর জুড়ে সমতল বা সুষম হয়। হিস্টোগ্রাম ইকুয়ালাইজেশন সেটাই চায়। ট্রান্সফরমেশনটি হলো ক্রমযোজিত বণ্টন: s k সমান L বিয়োগ ১ গুণ j = ০ থেকে k পর্যন্ত p(r j)-এর যোগফল। চলো উদাহরণটি করি: একটি ৩-বিট, ৬৪ বাই ৬৪ ইমেজ, অর্থাৎ ৪০৯৬ পিক্সেল।"},
 {scene:"eq",k:0,fx:(svg,_)=>{const L=[];for(let r=0;r<8;r++)L.push([900,()=>{_.tb.clear();_.tb.hl(r);for(let c=2;c<5;c++)_.tb.cells[r][c].t.style.opacity=1}]);
   L.reset=()=>{for(let r=0;r<8;r++)for(let c=2;c<5;c++)_.tb.cells[r][c].t.style.opacity=0;_.tb.clear()};return seq(L,true,2500)},
   en:"For each level, divide the count by 4096 to get p. Add up p cumulatively and multiply by L minus 1, which is 7. For level 0: 790 over 4096 is 0.19, times 7 is 1.33, which rounds to 1. For level 1, the running total gives 3.08, which rounds to 3. Continue down to level 7, which reaches 7.",
   bn:"প্রতিটি লেভেলের জন্য সংখ্যাকে ৪০৯৬ দিয়ে ভাগ করে p পাও। p-গুলো ক্রমে যোগ করে L বিয়োগ ১, অর্থাৎ ৭ দিয়ে গুণ করো। লেভেল ০-এর জন্য: ৭৯০ ভাগ ৪০৯৬ হলো ০.১৯, গুণ ৭ হলো ১.৩৩, রাউন্ড করে ১। লেভেল ১-এর জন্য ক্রমযোগফল দেয় ৩.০৮, রাউন্ড করে ৩। এভাবে লেভেল ৭ পর্যন্ত, যা ৭-এ পৌঁছায়।"},
 {scene:"eq",k:0,fx:(svg,_)=>{for(let r=0;r<8;r++)for(let c=2;c<5;c++)_.tb.cells[r][c].t.style.opacity=1;_.tb.clear();const o=[0,0,0,0,0,0,0,0];_.T.forEach(t=>o[t.r]+=t.n);_.h2.set(o,1100)},
   en:"Now move each pixel count to its new level. Levels 3 and 4 both map to 6, so 656 plus 329 gives 985. Levels 5, 6 and 7 all map to 7, giving 448. The result is spread more evenly across the range. In discrete images the histogram is not perfectly flat, but it covers a wider range.",
   bn:"এবার প্রতিটি লেভেলের পিক্সেল সংখ্যা তার নতুন লেভেলে সরাও। লেভেল ৩ ও ৪ দুটোই ৬-এ যায়, তাই ৬৫৬ যোগ ৩২৯ হয় ৯৮৫। লেভেল ৫, ৬ ও ৭ সবই ৭-এ যায়, তাতে হয় ৪৪৮। ফলাফল পুরো পরিসর জুড়ে বেশি সমানভাবে ছড়ানো। বিচ্ছিন্ন ইমেজে হিস্টোগ্রাম পুরোপুরি সমতল হয় না, তবে আরও বড় পরিসর জুড়ে থাকে।"},
 {scene:"im",k:0,en:"On a real image, equalization automatically spreads the histogram across the full range and greatly increases contrast. It needs no parameters, which makes it very convenient.",
   bn:"বাস্তব ইমেজে ইকুয়ালাইজেশন স্বয়ংক্রিয়ভাবে হিস্টোগ্রামকে পুরো পরিসরে ছড়িয়ে দেয় এবং কনট্রাস্ট অনেক বাড়িয়ে দেয়। এতে কোনো প্যারামিটার লাগে না, তাই এটি খুব সুবিধাজনক।"}
],
points:[{en:"<b>s_k = (L − 1) Σ p_r(r_j)</b>, j = 0…k (the CDF).",bn:"<b>s_k = (L − ১) Σ p_r(r_j)</b>, j = ০…k (CDF)।"},{en:"Example (L = 8, 4096 px): r → s = 1, 3, 5, 6, 6, 7, 7, 7; new counts at 1, 3, 5, 6, 7 = 790, 1023, 850, 985, 448.",bn:"উদাহরণ (L = ৮, ৪০৯৬ পিক্সেল): r → s = ১, ৩, ৫, ৬, ৬, ৭, ৭, ৭; নতুন সংখ্যা ১, ৩, ৫, ৬, ৭-এ = ৭৯০, ১০২৩, ৮৫০, ৯৮৫, ৪৪৮।"}]},
/* 12 */
{id:"histeq2",slides:"82–86",title:{en:"Histogram equalization: a 5 × 5 example",bn:"হিস্টোগ্রাম ইকুয়ালাইজেশন: ৫ × ৫ উদাহরণ"},
svg:`<g id="h2-a"></g><g id="h2-t"></g><g id="h2-b"></g><text id="h2-f" class="mono am c" x="400" y="420"></text>`,
init(svg,_){const A=[[1,2,1,1,1],[2,5,3,5,2],[2,5,5,5,2],[2,5,3,5,2],[1,5,1,2,1]];_.A=A;const n=new Array(8).fill(0);A.flat().forEach(v=>n[v]++);const T=histEqTable(n,8);_.map=T.map(t=>t.r);
  _.M=mat($$(svg,"#h2-a"),{x:30,y:90,cs:48,data:A,label:"input (L = 8)"});
  _.tb=table($$(svg,"#h2-t"),{x:300,y:60,cw:[34,40,56,50],rh:32,fs:12,head:["r","n","7·cdf","s"],rows:T.map(t=>[t.k,t.n,t.s.toFixed(2),t.r])});
  _.O=mat($$(svg,"#h2-b"),{x:530,y:90,cs:48,data:A.map(r=>r.map(()=>"")),label:"output"})},
steps:[
 {k:0,fx:(svg,_)=>{_.tb.clear();[1,2,3,5].forEach(r=>_.tb.hl(r));$$(svg,"#h2-f").textContent="25 pixels · counts: 1 → 7, 2 → 8, 3 → 2, 5 → 8"},
   en:"Here is a 5 by 5 image with maximum value 5, so we use 8 levels and L minus 1 equals 7. Counting the pixels: seven 1s, eight 2s, two 3s and eight 5s. The table gives 7 times the cumulative probability, rounded: 1 maps to 2, 2 maps to 4, 3 maps to 5, and 5 maps to 7.",
   bn:"এখানে একটি ৫ বাই ৫ ইমেজ, যার সর্বোচ্চ মান ৫, তাই আমরা ৮টি লেভেল নিই এবং L বিয়োগ ১ সমান ৭। পিক্সেল গুনলে: সাতটি ১, আটটি ২, দুটি ৩ এবং আটটি ৫। টেবিলে ৭ গুণ ক্রমযোজিত সম্ভাবনা রাউন্ড করে পাওয়া যায়: ১ যায় ২-এ, ২ যায় ৪-এ, ৩ যায় ৫-এ, আর ৫ যায় ৭-এ।"},
 {k:0,fx:(svg,_)=>{const L=[];for(let r=0;r<5;r++)for(let c=0;c<5;c++)L.push([280,()=>{_.M.clear("a");_.M.cls(r,c,"a");const v=_.A[r][c],o=_.map[v];_.O.set(r,c,o);_.O.gray(r,c,o/7);$$(svg,"#h2-f").textContent=`${v} → ${o}`}]);
   L.reset=()=>{for(let r=0;r<5;r++)for(let c=0;c<5;c++){_.O.set(r,c,"");_.O.cells[r][c].rect.style.fill=""}};return seq(L,true,2500)},
   en:"Now replace every pixel using the mapping. The output uses the wider range from 2 to 7, so the image has more contrast.",
   bn:"এবার ম্যাপিং ব্যবহার করে প্রতিটি পিক্সেল বদলাও। আউটপুট ২ থেকে ৭ পর্যন্ত বড় পরিসর ব্যবহার করে, তাই ইমেজের কনট্রাস্ট বেড়ে যায়।"}
],
points:[{en:"Counts: 1 → 7, 2 → 8, 3 → 2, 5 → 8 (25 pixels). Mapping: 1→2, 2→4, 3→5, 5→7.",bn:"সংখ্যা: ১ → ৭, ২ → ৮, ৩ → ২, ৫ → ৮ (২৫ পিক্সেল)। ম্যাপিং: ১→২, ২→৪, ৩→৫, ৫→৭।"}]},
/* 13 */
{id:"histmatch",slides:"87–112",title:{en:"Histogram matching (specification)",bn:"হিস্টোগ্রাম ম্যাচিং (স্পেসিফিকেশন)"},
svg:`<g data-scene="st"><g data-s="0"><text class="h" x="40" y="50">THREE STEPS</text>
  <rect class="boxa" x="40" y="90" width="230" height="100" rx="10"/><text class="c" x="155" y="132">1 · equalize the input</text><text class="c mono am" x="155" y="160">s = T(r)</text>
  <rect class="boxb" x="285" y="90" width="230" height="100" rx="10"/><text class="c" x="400" y="132">2 · equalize the target</text><text class="c mono bl" x="400" y="160">G(z)</text>
  <rect class="box" x="530" y="90" width="230" height="100" rx="10"/><text class="c" x="645" y="132">3 · relate the two</text><text class="c mono" x="645" y="160">z = G⁻¹(s)</text>
  <text class="sm dim" x="40" y="250">Equalization always aims for a flat histogram. Matching produces an output whose</text><text class="sm dim" x="40" y="274">histogram follows a specified (target) histogram instead.</text></g></g>
<g data-scene="ex"><g data-s="0"><g id="hm-t"></g><g id="hm-h"></g><text id="hm-f" class="mono am" x="40" y="420"></text></g></g>`,
init(svg,_){const n=[8,10,10,2,12,16,4,2],t=[0,0,0,0,20,20,16,8];const Ts=histEqTable(n,8).map(x=>x.r),G=histEqTable(t,8).map(x=>x.r);
  const Z=Ts.map(s=>{for(let z=0;z<8;z++)if(G[z]>=s)return z;return 7});_.Z=Z;
  _.tb=table($$(svg,"#hm-t"),{x:30,y:40,cw:[40,48,48,48,48,48],rh:36,fs:13,head:["r","n","s","z","G(z)","r→z"],rows:n.map((v,k)=>[k,v,Ts[k],k,G[k],""])});
  _.h1=bars($$(svg,"#hm-h"),{x:400,y:50,w:170,h:120,n:8,labels:[0,1,2,3,4,5,6,7],title:"original",values:1});_.h1.set(n,30);
  _.h2=bars($$(svg,"#hm-h"),{x:600,y:50,w:170,h:120,n:8,labels:[0,1,2,3,4,5,6,7],title:"target",cls:"hbar2",values:1});_.h2.set(t,30);
  _.h3=bars($$(svg,"#hm-h"),{x:480,y:250,w:220,h:130,n:8,labels:[0,1,2,3,4,5,6,7],title:"output (matched)",cls:"hbar2",values:1})},
steps:[
 {scene:"st",k:0,en:"Histogram equalization works on the whole image and always aims for a flat histogram, so it is not the best choice for every application. Histogram matching, or specification, produces an output whose histogram matches a specified target histogram. The mapping is found in three steps: equalize the input, equalize the target, then relate the two.",
   bn:"হিস্টোগ্রাম ইকুয়ালাইজেশন পুরো ইমেজে কাজ করে এবং সবসময় সমতল হিস্টোগ্রাম চায়, তাই সব কাজের জন্য এটি সেরা নয়। হিস্টোগ্রাম ম্যাচিং বা স্পেসিফিকেশন এমন আউটপুট তৈরি করে যার হিস্টোগ্রাম একটি নির্দিষ্ট টার্গেট হিস্টোগ্রামের সাথে মেলে। ম্যাপিং তিন ধাপে পাওয়া যায়: ইনপুট ইকুয়ালাইজ করো, টার্গেট ইকুয়ালাইজ করো, তারপর দুটোকে মেলাও।"},
 {scene:"ex",k:0,fx:(svg,_)=>{_.tb.clear();for(let r=0;r<8;r++)_.tb.set(r,5,"");_.h3.set([0,0,0,0,0,0,0,0],30);$$(svg,"#hm-f").textContent="s: equalized input · G(z): equalized target"},
   en:"Example: a 64-pixel, 3-bit image and a target histogram. Equalizing the input gives s equal to 1, 2, 3, 3, 5, 6, 7, 7. Equalizing the target gives G of z equal to 0, 0, 0, 0, 2, 4, 6, 7.",
   bn:"উদাহরণ: একটি ৬৪-পিক্সেলের ৩-বিট ইমেজ ও একটি টার্গেট হিস্টোগ্রাম। ইনপুট ইকুয়ালাইজ করলে s হয় ১, ২, ৩, ৩, ৫, ৬, ৭, ৭। টার্গেট ইকুয়ালাইজ করলে G(z) হয় ০, ০, ০, ০, ২, ৪, ৬, ৭।"},
 {scene:"ex",k:0,fx:(svg,_)=>{const L=[];for(let r=0;r<8;r++)L.push([900,()=>{_.tb.clear();_.tb.hl(r);_.tb.set(r,5,_.Z[r]);const s=+_.tb.cells[r][2].t.textContent;$$(svg,"#hm-f").textContent=`r = ${r}: s = ${s} → smallest z with G(z) ≥ ${s} is ${_.Z[r]}`}]);
   L.reset=()=>{_.tb.clear();for(let r=0;r<8;r++)_.tb.set(r,5,"")};return seq(L,true,2500)},
   en:"For each input level, take its s and find the target level z whose G of z is closest, taking the smallest z with G of z at least s. So 0 and 1 map to 4, 2 and 3 map to 5, 4 and 5 map to 6, and 6 and 7 map to 7.",
   bn:"প্রতিটি ইনপুট লেভেলের s নিয়ে এমন টার্গেট লেভেল z খোঁজো যার G(z) সবচেয়ে কাছে, অর্থাৎ যে সবচেয়ে ছোট z-এর G(z) কমপক্ষে s। তাই ০ ও ১ যায় ৪-এ, ২ ও ৩ যায় ৫-এ, ৪ ও ৫ যায় ৬-এ, আর ৬ ও ৭ যায় ৭-এ।"},
 {scene:"ex",k:0,fx:(svg,_)=>{const n=[8,10,10,2,12,16,4,2],o=new Array(8).fill(0);n.forEach((v,k)=>o[_.Z[k]]+=v);_.h3.set(o,30);for(let r=0;r<8;r++)_.tb.set(r,5,_.Z[r]);$$(svg,"#hm-f").textContent="output: 0 0 0 0 18 12 28 6"},
   en:"Moving the pixel counts gives the output histogram: 18 at level 4, 12 at level 5, 28 at level 6 and 6 at level 7. Its shape now follows the target, concentrated in the upper levels.",
   bn:"পিক্সেল সংখ্যা সরালে আউটপুট হিস্টোগ্রাম হয়: লেভেল ৪-এ ১৮, লেভেল ৫-এ ১২, লেভেল ৬-এ ২৮ এবং লেভেল ৭-এ ৬। এর আকার এখন টার্গেটের মতো, উপরের লেভেলগুলোতে কেন্দ্রীভূত।"}
],
points:[{en:"Steps: equalize input (s = T(r)); equalize target (G(z)); map r → z with G(z) ≈ s.",bn:"ধাপ: ইনপুট ইকুয়ালাইজ (s = T(r)); টার্গেট ইকুয়ালাইজ (G(z)); G(z) ≈ s ধরে r → z।"},{en:"Example output histogram: 0 0 0 0 18 12 28 6.",bn:"উদাহরণের আউটপুট হিস্টোগ্রাম: ০ ০ ০ ০ ১৮ ১২ ২৮ ৬।"}]},
/* 14 */
{id:"local",slides:"113–118",title:{en:"Local histogram processing",bn:"লোকাল হিস্টোগ্রাম প্রসেসিং"},
svg:`<g id="lh-i"></g><g id="lh-k"></g>`,
init(svg,_){const I=gen("squares",128);const g=$$(svg,"#lh-i");_.a=img2(g,30,80,230,230,"original");_.a.show(I);_.b=img2(g,285,80,230,230,"global equalization");_.c=img2(g,540,80,230,230,"local equalization");
  _.b.show(equalize(I));_.c.show(localEq(I,3));_.b.g.style.opacity=.15;_.c.g.style.opacity=.15;_.win=el($$(svg,"#lh-k"),"rect",{x:30,y:80,width:14,height:14,class:"kbox"})},
steps:[
 {k:0,fx:(svg,_)=>{_.b.g.style.opacity=.15;_.c.g.style.opacity=.15;_.win.style.opacity=0},en:"The methods so far are global: one transformation for the whole image, based on its overall intensity distribution. This works for overall enhancement but fails for details in small areas, because those few pixels barely affect the global histogram. This image has five dark squares with objects hidden inside, practically invisible.",
   bn:"এ পর্যন্ত পদ্ধতিগুলো গ্লোবাল: পুরো ইমেজের সামগ্রিক তীব্রতার বণ্টনের ভিত্তিতে একটি ট্রান্সফরমেশন। সামগ্রিক উন্নতির জন্য এটি কাজ করে, কিন্তু ছোট অঞ্চলের খুঁটিনাটির জন্য ব্যর্থ হয়, কারণ ওই অল্প পিক্সেল গ্লোবাল হিস্টোগ্রামে প্রায় প্রভাব ফেলে না। এই ইমেজে পাঁচটি অন্ধকার বর্গ আছে, যাদের ভেতরে বস্তু লুকানো, প্রায় দেখাই যায় না।"},
 {k:0,fx:(svg,_)=>{_.b.g.style.opacity=1;_.c.g.style.opacity=.15;_.win.style.opacity=0},en:"Global histogram equalization mostly enhances the noise in the smooth regions. It does not reveal any new significant detail.",
   bn:"গ্লোবাল হিস্টোগ্রাম ইকুয়ালাইজেশন মূলত মসৃণ অঞ্চলের নয়েজ বাড়িয়ে দেয়। এটি নতুন কোনো গুরুত্বপূর্ণ খুঁটিনাটি দেখায় না।"},
 {k:0,fx:(svg,_)=>{_.b.g.style.opacity=1;_.c.g.style.opacity=1;_.win.style.opacity=1;return rafLoop(t=>{const u=(t*.08)%1,row=Math.floor(u*8),col=(u*8%1);_.win.setAttribute("x",30+col*216);_.win.setAttribute("y",80+row*27)})},
   en:"Local histogram processing defines a small neighbourhood and moves its centre from pixel to pixel. At each location, the histogram of the neighbourhood is computed and used to map only the centre pixel. Now the details inside all the dark squares appear. Updating the histogram as the window slides one step is cheaper than recomputing it, and non-overlapping regions are faster but produce a blocky effect.",
   bn:"লোকাল হিস্টোগ্রাম প্রসেসিংয়ে একটি ছোট নেইবারহুড নিয়ে তার কেন্দ্র পিক্সেল থেকে পিক্সেলে সরানো হয়। প্রতিটি জায়গায় নেইবারহুডের হিস্টোগ্রাম হিসাব করে শুধু মাঝের পিক্সেলটি ম্যাপ করা হয়। এখন সব অন্ধকার বর্গের ভেতরের খুঁটিনাটি দেখা যাচ্ছে। উইন্ডো এক ধাপ সরলে হিস্টোগ্রাম নতুন করে না গুনে আপডেট করা সস্তা, আর না-ওভারল্যাপ করা অঞ্চল দ্রুত হলেও ব্লকের মতো প্রভাব তৈরি করে।"}
],
points:[{en:"Global methods fail for small regions; <b>local</b> methods compute the transform from each pixel's neighbourhood.",bn:"ছোট অঞ্চলের জন্য গ্লোবাল পদ্ধতি ব্যর্থ; <b>লোকাল</b> পদ্ধতি প্রতিটি পিক্সেলের নেইবারহুড থেকে ট্রান্সফর্ম হিসাব করে।"},{en:"The slides use a 3 × 3 neighbourhood; this demo uses 7 × 7 so the effect is visible on a small image.",bn:"স্লাইডে ৩ × ৩ নেইবারহুড; ছোট ইমেজে বোঝানোর জন্য এই ডেমোতে ৭ × ৭।"}]},
/* 15 */
{id:"stats",slides:"119–122",title:{en:"Histogram statistics: mean and variance",bn:"হিস্টোগ্রাম পরিসংখ্যান: গড় ও ভ্যারিয়েন্স"},
svg:`<g id="st-a"></g><g id="st-h"></g><text class="mono am" x="420" y="300">m = Σ r_k · p(r_k)</text><text class="mono am" x="420" y="330">σ² = Σ (r_k − m)² · p(r_k)</text><text id="st-m" class="mono lg" x="420" y="380"></text><text id="st-v" class="mono lg" x="420" y="414"></text>`,
init(svg,_){const A=[[0,0,1,1,2],[1,2,3,0,1],[3,3,2,2,0],[2,3,1,0,0],[1,1,3,2,2]];_.M=mat($$(svg,"#st-a"),{x:40,y:90,cs:56,data:A,label:"5 × 5 image, L = 4"});
  const n=[0,0,0,0];A.flat().forEach(v=>n[v]++);_.p=n.map(v=>v/25);_.H=bars($$(svg,"#st-h"),{x:440,y:70,w:300,h:160,n:4,labels:[0,1,2,3],title:"p(r_k)",values:1,fmtv:v=>v.toFixed(2)});_.H.set(_.p,.4)},
steps:[
 {k:0,fx:svg=>{$$(svg,"#st-m").textContent="";$$(svg,"#st-v").textContent=""},en:"Statistics from the histogram can guide enhancement. The mean, m, is the sum of each level times its probability. It measures average intensity. The variance, sigma squared, is the sum of the squared distance from the mean times the probability. It measures contrast.",
   bn:"হিস্টোগ্রাম থেকে পাওয়া পরিসংখ্যান এনহ্যান্সমেন্টে সাহায্য করে। গড় m হলো প্রতিটি লেভেল গুণ তার সম্ভাবনার যোগফল। এটি গড় তীব্রতা মাপে। ভ্যারিয়েন্স সিগমা স্কয়ার হলো গড় থেকে দূরত্বের বর্গ গুণ সম্ভাবনার যোগফল। এটি কনট্রাস্ট মাপে।"},
 {k:0,fx:(svg,_)=>{const m=_.p.reduce((s,p,k)=>s+k*p,0),v=_.p.reduce((s,p,k)=>s+(k-m)**2*p,0);return seq([[400,()=>$$(svg,"#st-m").textContent=`m = ${_.p.map((p,k)=>`${k}(${p.toFixed(2)})`).join(" + ")} = ${m.toFixed(2)}`],[1500,()=>$$(svg,"#st-v").textContent=`σ² = ${v.toFixed(4)}`]])},
   en:"For this 5 by 5 image with 4 levels, the probabilities are 0.24, 0.28, 0.28 and 0.20. The mean is 1.44, and the variance is about 1.13. Computing these locally, over each pixel's neighbourhood, lets us enhance only the regions that need it, for example dark areas with low contrast.",
   bn:"৪ লেভেলের এই ৫ বাই ৫ ইমেজে সম্ভাবনাগুলো ০.২৪, ০.২৮, ০.২৮ ও ০.২০। গড় ১.৪৪, আর ভ্যারিয়েন্স প্রায় ১.১৩। প্রতিটি পিক্সেলের নেইবারহুডে এগুলো স্থানীয়ভাবে হিসাব করলে শুধু দরকারি অঞ্চলগুলো উন্নত করা যায়, যেমন কম কনট্রাস্টের অন্ধকার অংশ।"}
],
points:[{en:"<b>m = Σ r_k p(r_k)</b> (average intensity); <b>σ² = Σ (r_k − m)² p(r_k)</b> (contrast).",bn:"<b>m = Σ r_k p(r_k)</b> (গড় তীব্রতা); <b>σ² = Σ (r_k − m)² p(r_k)</b> (কনট্রাস্ট)।"},{en:"Example: m = 1.44, σ² ≈ 1.13. Local statistics allow selective enhancement.",bn:"উদাহরণ: m = ১.৪৪, σ² ≈ ১.১৩। লোকাল পরিসংখ্যান দিয়ে বাছাই করে উন্নতি করা যায়।"}]}
],
quiz:[
 {q:{en:"Point processing uses a neighbourhood of size…",bn:"পয়েন্ট প্রসেসিংয়ে নেইবারহুডের সাইজ…"},o:[{en:"1 × 1",bn:"১ × ১"},{en:"3 × 3",bn:"৩ × ৩"},{en:"5 × 5",bn:"৫ × ৫"},{en:"the whole image",bn:"পুরো ইমেজ"}],a:0,w:{en:"s = T(r) depends only on the pixel itself.",bn:"s = T(r) শুধু পিক্সেলের নিজের উপর নির্ভর করে।"}},
 {q:{en:"The negative of a 3-bit pixel with value 2 is…",bn:"৩-বিট পিক্সেলের মান ২ হলে নেগেটিভ…"},o:[{en:"2",bn:"২"},{en:"5",bn:"৫"},{en:"6",bn:"৬"},{en:"253",bn:"২৫৩"}],a:1,w:{en:"s = L − 1 − r = 7 − 2 = 5.",bn:"s = L − ১ − r = ৭ − ২ = ৫।"}},
 {q:{en:"The log transform is best when…",bn:"লগ ট্রান্সফর্ম সবচেয়ে ভালো যখন…"},o:[{en:"details are in bright values",bn:"খুঁটিনাটি উজ্জ্বল মানে"},{en:"the dynamic range exceeds the display",bn:"ডায়নামিক রেঞ্জ ডিসপ্লের চেয়ে বড়"},{en:"the image is binary",bn:"ইমেজ বাইনারি"},{en:"γ > 1",bn:"γ > ১"}],a:1,w:{en:"It compresses dynamic range, e.g. Fourier spectra.",bn:"এটি ডায়নামিক রেঞ্জ চাপে, যেমন ফুরিয়ার স্পেকট্রাম।"}},
 {q:{en:"A gamma less than 1 makes an image…",bn:"গামা ১-এর কম হলে ইমেজ…"},o:[{en:"darker",bn:"গাঢ়"},{en:"brighter",bn:"উজ্জ্বল"},{en:"binary",bn:"বাইনারি"},{en:"unchanged",bn:"অপরিবর্তিত"}],a:1,w:{en:"Dark pixels are brightened more.",bn:"অন্ধকার পিক্সেল বেশি উজ্জ্বল হয়।"}},
 {q:{en:"Which bit planes carry most of the visual information?",bn:"কোন বিট প্লেন বেশিরভাগ দৃশ্যমান তথ্য বহন করে?"},o:[{en:"1–3",bn:"১–৩"},{en:"4–5",bn:"৪–৫"},{en:"6–8",bn:"৬–৮"},{en:"all equally",bn:"সব সমান"}],a:2,w:{en:"Higher order planes are most significant.",bn:"উচ্চ ক্রমের প্লেন সবচেয়ে গুরুত্বপূর্ণ।"}},
 {q:{en:"In the 4096-pixel example, level 0 (790 pixels) maps to…",bn:"৪০৯৬ পিক্সেলের উদাহরণে লেভেল ০ (৭৯০ পিক্সেল) যায়…"},o:[{en:"0",bn:"০"},{en:"1",bn:"১"},{en:"2",bn:"২"},{en:"3",bn:"৩"}],a:1,w:{en:"7 × 790/4096 = 1.33 → 1.",bn:"৭ × ৭৯০/৪০৯৬ = ১.৩৩ → ১।"}},
 {q:{en:"To enhance details in small dark regions, use…",bn:"ছোট অন্ধকার অঞ্চলের খুঁটিনাটি স্পষ্ট করতে ব্যবহার করো…"},o:[{en:"global equalization",bn:"গ্লোবাল ইকুয়ালাইজেশন"},{en:"local histogram processing",bn:"লোকাল হিস্টোগ্রাম প্রসেসিং"},{en:"image negative",bn:"ইমেজ নেগেটিভ"},{en:"bit-plane 1",bn:"বিট-প্লেন ১"}],a:1,w:{en:"The transform comes from each pixel's neighbourhood.",bn:"ট্রান্সফর্ম আসে প্রতিটি পিক্সেলের নেইবারহুড থেকে।"}}
]});
})();
