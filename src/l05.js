/* ===== Lecture 05 · Sampling and quantization ===== */
(()=>{
const SC=()=>gen("scene",256),ROW=174;
const prof=t=>{const I=SC(),x=t*(I.w-1),i=Math.floor(x),f=x-i;return I.a[ROW*I.w+i]*(1-f)+I.a[ROW*I.w+Math.min(I.w-1,i+1)]*f};
lecture({id:"l05",no:"05",title:{en:"Image Sampling and Quantization",bn:"ইমেজ স্যাম্পলিং ও কোয়ান্টাইজেশন"},book:{en:"Ch. 2 · Digital Image Fundamentals",bn:"চ্যাপ্টার ২ · ডিজিটাল ইমেজ ফান্ডামেন্টালস"},
chapters:[
/* 1 */
{id:"concept",slides:"2–4",title:{en:"Sampling and quantization along a scan line",bn:"একটি স্ক্যান লাইনে স্যাম্পলিং ও কোয়ান্টাইজেশন"},
svg:`
<g data-s="0"><g id="q-img"></g><line x1="40" y1="${40+ROW/256*200}" x2="240" y2="${40+ROW/256*200}" style="stroke:#F2A93B;stroke-width:2"/>
  <text class="am sm" x="28" y="${44+ROW/256*200}">A</text><text class="am sm" x="246" y="${44+ROW/256*200}">B</text>
  <text class="dim sm" x="40" y="270">continuous image</text><g id="q-plot"></g></g>
<g data-s="1"><g id="q-samp"></g></g>
<g data-s="2"><g id="q-lev"></g></g>
<g data-s="3"><g id="q-out"></g><text class="dim sm" x="40" y="300">digital scan line</text><g id="q-strip"></g></g>`,
init(svg,_){const im=img2($$(svg,"#q-img"),40,40,200,200);im.show(SC());
  const P=plot($$(svg,"#q-plot"),{x:300,y:40,w:460,h:330,xmax:1,ymax:1,xl:"A → B",yl:"intensity"});_.P=P;_.cur=P.fn(prof,"curve2",400);
  const N=24,Lv=8;_.N=N;_.S=[];const s=$$(svg,"#q-samp");for(let i=0;i<N;i++){const t=(i+.5)/N;el(s,"line",{x1:P.X(t),x2:P.X(t),y1:P.Y(0),y2:P.Y(1),class:"gl"});_.S.push(el(s,"circle",{cx:P.X(t),cy:P.Y(prof(t)),r:5,class:"spot"}))}
  const l=$$(svg,"#q-lev");for(let k=0;k<Lv;k++){el(l,"line",{x1:P.X(0),x2:P.X(1),y1:P.Y(k/(Lv-1)),y2:P.Y(k/(Lv-1)),style:"stroke:#4CC489;stroke-dasharray:3 4;stroke-width:1"});el(l,"rect",{x:P.X(1)+6,y:P.Y(k/(Lv-1))-8,width:16,height:16,style:`fill:hsl(0 0% ${k/(Lv-1)*100}%)`})}
  const q=$$(svg,"#q-strip");_.Q=[];for(let i=0;i<N;i++){const v=Math.round(prof((i+.5)/N)*(Lv-1))/(Lv-1);_.Q.push(v);el(q,"rect",{x:40+i*(200/N),y:310,width:200/N,height:30,style:`fill:hsl(0 0% ${v*100}%)`})}
  el(q,"rect",{x:40,y:310,width:200,height:30,class:"frame"})},
steps:[
 {k:0,fx:(svg,_)=>{_.cur.style.opacity=1;_.S.forEach((c,i)=>c.setAttribute("cy",_.P.Y(prof((i+.5)/_.N))))},
   en:"To create a digital image, continuous sensed data must be converted to digital form. An image can be continuous in its x and y coordinates and also in amplitude. This plot shows the intensity along the line A B of a continuous image.",
   bn:"ডিজিটাল ইমেজ তৈরি করতে হলে সেন্সরে পাওয়া অবিচ্ছিন্ন ডেটাকে ডিজিটাল রূপে আনতে হয়। একটি ইমেজ x ও y স্থানাঙ্কে এবং মানেও অবিচ্ছিন্ন হতে পারে। এই গ্রাফে একটি অবিচ্ছিন্ন ইমেজের A B রেখা বরাবর তীব্রতা দেখানো হয়েছে।"},
 {k:1,fx:(svg,_)=>{_.S.forEach((c,i)=>c.setAttribute("cy",_.P.Y(prof((i+.5)/_.N))))},
   en:"Digitizing the coordinate values is called sampling. We take equally spaced samples along A B. Each red dot is one sample.",
   bn:"স্থানাঙ্কের মানগুলো ডিজিটাইজ করাকে বলে স্যাম্পলিং। আমরা A B বরাবর সমান দূরত্বে নমুনা নিই। প্রতিটি লাল বিন্দু একটি নমুনা।"},
 {k:2,fx:(svg,_)=>{_.cur.style.opacity=.35;_.S.forEach((c,i)=>{c.style.transition="cy .6s";c.setAttribute("cy",_.P.Y(_.Q[i]))})},
   en:"Digitizing the amplitude values is called quantization. The intensity scale is divided into eight discrete levels, from black to white, and each sample snaps to the nearest level.",
   bn:"মানগুলো ডিজিটাইজ করাকে বলে কোয়ান্টাইজেশন। তীব্রতার স্কেলকে কালো থেকে সাদা পর্যন্ত আটটি আলাদা লেভেলে ভাগ করা হয়, আর প্রতিটি নমুনা সবচেয়ে কাছের লেভেলে চলে যায়।"},
 {k:3,fx:(svg,_)=>{_.cur.style.opacity=.35;_.S.forEach((c,i)=>c.setAttribute("cy",_.P.Y(_.Q[i])))},
   en:"After both sampling and quantization, the scan line becomes a short row of discrete gray values. Repeating this for every line gives a digital image.",
   bn:"স্যাম্পলিং ও কোয়ান্টাইজেশন দুটোই করার পর স্ক্যান লাইনটি কয়েকটি আলাদা ধূসর মানের একটি সারিতে পরিণত হয়। প্রতিটি লাইনের জন্য এটি করলে একটি ডিজিটাল ইমেজ পাওয়া যায়।"}
],
points:[{en:"<b>Sampling</b>: digitizing the coordinate values.",bn:"<b>স্যাম্পলিং</b>: স্থানাঙ্কের মান ডিজিটাইজ করা।"},{en:"<b>Quantization</b>: digitizing the amplitude (intensity) values.",bn:"<b>কোয়ান্টাইজেশন</b>: মান (তীব্রতা) ডিজিটাইজ করা।"}]},
/* 2 */
{id:"effect",slides:"5–9",title:{en:"Sensors, spatial resolution and gray levels",bn:"সেন্সর, স্পেশাল রেজোলিউশন ও গ্রে লেভেল"},
svg:`
<g data-scene="sens"><g data-s="0">
  <text class="h" x="40" y="50">SAMPLING DEPENDS ON THE SENSOR ARRANGEMENT</text>
  <rect class="boxa" x="40" y="90" width="230" height="120" rx="10"/><text class="c" x="155" y="130">Single sensor</text><text class="c dim sm" x="155" y="160">set by the motion</text>
  <rect class="boxa" x="285" y="90" width="230" height="120" rx="10"/><text class="c" x="400" y="130">Strip sensor</text><text class="c dim sm" x="400" y="160">number of sensors + motion</text>
  <rect class="boxa" x="530" y="90" width="230" height="120" rx="10"/><text class="c" x="645" y="130">Array sensor</text><text class="c dim sm" x="645" y="160">number of sensors</text></g>
 <g data-s="1"><g id="sn-a"></g><g id="sn-grid"></g><line class="arrw" x1="380" y1="335" x2="430" y2="335" marker-end="url(#ahw)"/><g id="sn-b"></g></g></g>
<g data-scene="res"><g data-s="0"><g id="rs-i"></g><text id="rs-t" class="c lg mono am" x="400" y="420"></text></g></g>`,
init(svg,_){const I=gen("scene",128);const a=img2($$(svg,"#sn-a"),150,240,190,190);a.show(I);
  const g=$$(svg,"#sn-grid");for(let i=0;i<=12;i++){el(g,"line",{x1:150+i*190/12,x2:150+i*190/12,y1:240,y2:430,class:"gl",style:"stroke:#F2A93B;stroke-opacity:.6"});el(g,"line",{y1:240+i*190/12,y2:240+i*190/12,x1:150,x2:340,class:"gl",style:"stroke:#F2A93B;stroke-opacity:.6"})}
  const b=imgEl($$(svg,"#sn-b"),460,240,190,190);b.show(quant(resizeNN(I,12,12),8));
  _.im=imgEl($$(svg,"#rs-i"),210,40,360,360)},
steps:[
 {scene:"sens",k:0,en:"In practice, the sensor arrangement decides how sampling is done. With a single sensor, sampling depends on the motion. With a strip, it depends on the number of sensors and the motion. With an array, it depends on the number of sensors.",
   bn:"বাস্তবে সেন্সরের বিন্যাসই ঠিক করে স্যাম্পলিং কীভাবে হবে। সিঙ্গেল সেন্সরে স্যাম্পলিং নির্ভর করে নড়াচড়ার উপর। স্ট্রিপে নির্ভর করে সেন্সরের সংখ্যা ও নড়াচড়ার উপর। আর অ্যারেতে নির্ভর করে সেন্সরের সংখ্যার উপর।"},
 {scene:"sens",k:1,en:"Here a continuous image is projected onto a 12 by 12 sensor array. Each sensor gives one sample, and its output is quantized. The result is a coarse digital image.",
   bn:"এখানে একটি অবিচ্ছিন্ন ইমেজ ১২ বাই ১২ সেন্সর অ্যারের উপর প্রজেক্ট করা হয়েছে। প্রতিটি সেন্সর একটি নমুনা দেয়, এবং তার আউটপুট কোয়ান্টাইজ করা হয়। ফলাফল একটি মোটা দাগের ডিজিটাল ইমেজ।"},
 {scene:"res",k:0,fx:(svg,_)=>{const I=gen("scene",128),N=[128,64,32,16,8];let i=0;return every(1500,()=>{const n=N[i%N.length];_.im.show(resizeNN(I,n,n));$$(svg,"#rs-t").textContent=`${n} × ${n} samples`;i++})},
   en:"Sampling determines the spatial resolution of the digital image. With fewer samples, details disappear and the image turns into blocks.",
   bn:"স্যাম্পলিং ডিজিটাল ইমেজের স্পেশাল রেজোলিউশন নির্ধারণ করে। নমুনা কম হলে খুঁটিনাটি হারিয়ে যায় এবং ইমেজ ব্লকের মতো হয়ে যায়।"},
 {scene:"res",k:0,fx:(svg,_)=>{const I=gen("scene",128),N=[256,32,8,4,2];let i=0;return every(1500,()=>{const n=N[i%N.length];_.im.show(quant(I,n));$$(svg,"#rs-t").textContent=`${n} gray levels`;i++})},
   en:"Quantization determines the number of gray levels. With fewer levels, smooth shading breaks into visible bands.",
   bn:"কোয়ান্টাইজেশন গ্রে লেভেলের সংখ্যা নির্ধারণ করে। লেভেল কম হলে মসৃণ শেডিং ভেঙে স্পষ্ট ব্যান্ডে পরিণত হয়।"}
],
panel:()=>`<h3>${tr({en:"Try it: samples and gray levels",bn:"নিজে করো: নমুনা ও গ্রে লেভেল"})}</h3>
 <div class="prow"><label>${tr({en:"Samples per side",bn:"প্রতি পাশে নমুনা"})} <input type="range" id="es" min="2" max="7" value="7"><output id="eso"></output></label>
 <label>${tr({en:"Gray levels",bn:"গ্রে লেভেল"})} <input type="range" id="el" min="1" max="8" value="8"><output id="elo"></output></label></div>
 <img id="eim" alt="" width="256" height="256" style="image-rendering:pixelated;border-radius:6px;max-width:100%">`,
bind(root){const I=gen("scene",128);const f=()=>{const n=2**+root.querySelector("#es").value,L=2**+root.querySelector("#el").value;root.querySelector("#eso").textContent=n;root.querySelector("#elo").textContent=L;root.querySelector("#eim").src=toURL(quant(resizeNN(I,n,n),L))};root.querySelectorAll("input").forEach(e=>e.oninput=f);f()},
points:[{en:"Single sensor: motion. Strip: number of sensors and motion. Array: number of sensors.",bn:"সিঙ্গেল সেন্সর: নড়াচড়া। স্ট্রিপ: সেন্সরের সংখ্যা ও নড়াচড়া। অ্যারে: সেন্সরের সংখ্যা।"},{en:"Sampling → <b>spatial resolution</b>. Quantization → <b>number of gray levels</b>.",bn:"স্যাম্পলিং → <b>স্পেশাল রেজোলিউশন</b>। কোয়ান্টাইজেশন → <b>গ্রে লেভেলের সংখ্যা</b>।"}]},
/* 3 */
{id:"repr",slides:"10–14",title:{en:"Three ways to represent a digital image",bn:"ডিজিটাল ইমেজ উপস্থাপনের তিনটি উপায়"},
svg:`<g data-scene="surf"><g data-s="0" id="rp-s"></g></g><g data-scene="arr"><g data-s="0" id="rp-a"></g></g><g data-scene="num"><g data-s="0" id="rp-n"></g></g>`,
init(svg,_){const N=12;const V=(r,c)=>{const d=Math.hypot(r-6.5,c-6.5);if(d<3.2)return 1;if(r+c<6)return 0;return .5};
  const g=$$(svg,"#rp-s");const proj=(r,c,z)=>[400+(c-r)*20,110+(c+r)*9-z*90];
  for(let r=0;r<N;r++){let d="";for(let c=0;c<N;c++){const[x,y]=proj(r,c,V(r,c));d+=(c?"L":"M")+x+" "+y}el(g,"path",{d,class:"curve2",style:"stroke-width:1.6"})}
  for(let c=0;c<N;c++){let d="";for(let r=0;r<N;r++){const[x,y]=proj(r,c,V(r,c));d+=(r?"L":"M")+x+" "+y}el(g,"path",{d,class:"curve2",style:"stroke-width:1.6"})}
  txt(g,400,410,"image plotted as a surface: x, y and f(x, y) as height","c dim sm");
  const a=$$(svg,"#rp-a");const I=mk(N,N,(x,y,c,r)=>V(r,c));const im=imgEl(a,250,50,300,300);im.show(I);txt(a,400,390,"visual intensity array: 0 black, 0.5 gray, 1 white","c dim sm");
  const n=$$(svg,"#rp-n");mat(n,{x:220,y:30,cs:30,fs:11,data:Array.from({length:N},(_,r)=>Array.from({length:N},(_,c)=>V(r,c))),fmt:v=>v===.5?".5":String(v)});txt(n,400,416,"2-D numerical array: the form used in processing","c dim sm")},
steps:[
 {scene:"surf",k:0,en:"There are three common ways to represent a digital image. First, as a surface: x and y are spatial coordinates and f of x y is the height. This is not always preferable, because complex images with many details become very hard to interpret.",
   bn:"ডিজিটাল ইমেজ উপস্থাপনের তিনটি প্রচলিত উপায় আছে। প্রথমত, একটি তল হিসেবে: x ও y স্থানাঙ্ক, আর f(x, y) হলো উচ্চতা। এটি সবসময় সুবিধাজনক নয়, কারণ অনেক খুঁটিনাটি থাকা জটিল ইমেজ এভাবে বোঝা খুব কঠিন।"},
 {scene:"arr",k:0,en:"Second, as a visual intensity array, the way it appears on a monitor or a photograph. Here there are only three intensities. Normalised to the interval zero to one, every point is 0, 0.5, or 1.",
   bn:"দ্বিতীয়ত, ভিজুয়াল ইনটেনসিটি অ্যারে হিসেবে, যেভাবে এটি মনিটর বা ছবিতে দেখা যায়। এখানে মাত্র তিনটি তীব্রতা আছে। শূন্য থেকে এক ব্যবধিতে নর্মালাইজ করলে প্রতিটি বিন্দুর মান ০, ০.৫ বা ১।"},
 {scene:"num",k:0,en:"Third, as a two-dimensional numerical array, or matrix. This is the most widely used representation in digital image processing, because algorithms work directly on these numbers.",
   bn:"তৃতীয়ত, দ্বিমাত্রিক সংখ্যার অ্যারে বা ম্যাট্রিক্স হিসেবে। ডিজিটাল ইমেজ প্রসেসিংয়ে এটিই সবচেয়ে বেশি ব্যবহৃত উপস্থাপন, কারণ অ্যালগরিদম সরাসরি এই সংখ্যাগুলোর উপর কাজ করে।"}
],
points:[{en:"<b>Surface plot</b>: hard to read for detailed images. <b>Intensity array</b>: as on a monitor. <b>Numerical array</b>: most widely used.",bn:"<b>সারফেস প্লট</b>: বিস্তারিত ইমেজে বোঝা কঠিন। <b>ইনটেনসিটি অ্যারে</b>: মনিটরে যেমন। <b>সংখ্যার অ্যারে</b>: সবচেয়ে বেশি ব্যবহৃত।"}]},
/* 4 */
{id:"matrix",slides:"10, 15–16",title:{en:"The image as a matrix and intensity levels",bn:"ম্যাট্রিক্স হিসেবে ইমেজ ও তীব্রতার লেভেল"},
svg:`
<g data-s="0"><text class="mono" x="40" y="60">f(s,t) → continuous image</text><text class="mono am" x="40" y="90">f(x,y) → M rows × N columns, x and y integers</text>
  <g id="mx-m"></g></g>
<g data-s="1"><text class="h" x="470" y="140">INTENSITY LEVELS</text><text class="mono lg am" x="470" y="180">L = 2^k</text><text class="mono" x="470" y="212">values in [0, L − 1]</text>
  <text class="mono sm" x="470" y="252">k = 1  →  L = 2</text><text class="mono sm" x="470" y="276">k = 8  →  L = 256</text><text class="mono sm" x="470" y="300">k = 16 →  L = 65,536</text></g>
<g data-s="2"><text class="mono lg" x="470" y="360">bits = M × N × k</text><text class="mono sm dim" x="470" y="388">e.g. 1024 × 1024 × 8 = 8,388,608 bits</text></g>`,
init(svg){const g=$$(svg,"#mx-m");const lab=[["f(0,0)","f(0,1)","…","f(0,N−1)"],["f(1,0)","f(1,1)","…","f(1,N−1)"],["⋮","⋮","","⋮"],["f(M−1,0)","f(M−1,1)","…","f(M−1,N−1)"]];
  lab.forEach((row,r)=>row.forEach((s,c)=>txt(g,70+c*92,160+r*56,s,"mono sm c")));el(g,"path",{d:"M30 128 v220 M410 128 v220",class:"wire"});
  txt(g,220,390,"each element: a pixel (pel, picture or image element)","c dim xs")},
steps:[
 {k:0,en:"A continuous image is a function of two continuous variables, s and t. After sampling and quantization, it becomes a two-dimensional array f of x y with M rows and N columns, where x and y are integers. The region spanned by these coordinates is called the spatial domain.",
   bn:"অবিচ্ছিন্ন ইমেজ হলো দুটি অবিচ্ছিন্ন চলক s ও t-এর ফাংশন। স্যাম্পলিং ও কোয়ান্টাইজেশনের পর এটি M সারি ও N কলামের একটি দ্বিমাত্রিক অ্যারে f(x, y) হয়ে যায়, যেখানে x ও y পূর্ণসংখ্যা। এই স্থানাঙ্কগুলো যে অঞ্চল জুড়ে থাকে তাকে বলে স্পেশাল ডোমেইন।"},
 {k:1,en:"Because of storage and quantizing hardware, the number of intensity levels is usually an integer power of two, L equals 2 to the k. The values lie in the interval zero to L minus one.",
   bn:"স্টোরেজ ও কোয়ান্টাইজিং হার্ডওয়্যারের কারণে তীব্রতার লেভেলের সংখ্যা সাধারণত দুইয়ের পূর্ণসংখ্যা ঘাত হয়, L সমান ২-এর k ঘাত। মানগুলো থাকে শূন্য থেকে L বিয়োগ এক পর্যন্ত।"},
 {k:2,en:"The number of bits needed to store the image is M times N times k.",
   bn:"ইমেজটি সংরক্ষণ করতে মোট বিট লাগে M গুণ N গুণ k।"}
],
points:[{en:"Digital image: <b>M × N</b> array f(x,y), x and y integers; the <b>spatial domain</b>.",bn:"ডিজিটাল ইমেজ: <b>M × N</b> অ্যারে f(x,y), x ও y পূর্ণসংখ্যা; <b>স্পেশাল ডোমেইন</b>।"},{en:"<b>L = 2^k</b> levels in [0, L−1]; storage <b>M × N × k</b> bits.",bn:"<b>L = 2^k</b> লেভেল, [0, L−1]; স্টোরেজ <b>M × N × k</b> বিট।"}]},
/* 5 */
{id:"dynamic",slides:"16–18",title:{en:"Dynamic range, saturation, noise and contrast",bn:"ডায়নামিক রেঞ্জ, স্যাচুরেশন, নয়েজ ও কনট্রাস্ট"},
svg:`
<g data-scene="dr"><g data-s="0">
  <rect x="80" y="60" width="640" height="60" style="fill:#F07A62;fill-opacity:.18"/><text class="rd sm" x="90" y="84">saturation: values above are clipped</text>
  <rect x="80" y="300" width="640" height="60" style="fill:#7D8FA6;fill-opacity:.2"/><text class="dim sm" x="90" y="348">noise floor: values below are not true intensities</text>
  <path id="dr-w" class="curve" d=""/>
  <line class="arrw" x1="750" y1="300" x2="750" y2="124" marker-end="url(#ahw)"/><line class="arrw" x1="750" y1="124" x2="750" y2="300" marker-end="url(#ahw)"/>
  <text class="sm" x="630" y="210" style="writing-mode:tb" transform="rotate(0)"></text>
  <text class="mono am c" x="400" y="400">dynamic range = max measurable ÷ min detectable</text></g></g>
<g data-scene="ct"><g data-s="0"><g id="ct-i"></g></g></g>`,
init(svg,_){const I=gen("scene",128);const lo=mapI(I,v=>.42+.16*v);const a=img2($$(svg,"#ct-i"),90,60,250,250,"high dynamic range · high contrast");a.show(I);
  const b=img2($$(svg,"#ct-i"),460,60,250,250,"low dynamic range · dull, washed-out gray");b.show(lo);
  txt($$(svg,"#ct-i"),400,380,"contrast = highest intensity − lowest intensity","mono c am")},
steps:[
 {scene:"dr",k:0,fx:svg=>{const w=$$(svg,"#dr-w");return rafLoop(t=>{let d="";for(let i=0;i<=200;i++){const x=80+i*3.2;let y=210-150*Math.sin(i/14+t)+(Math.random()-.5)*14;y=Math.max(120,Math.min(300,y));d+=(i?"L":"M")+x+" "+y.toFixed(1)}w.setAttribute("d",d)})},
   en:"The dynamic range of an imaging system is the ratio of the maximum measurable intensity to the minimum detectable intensity. The upper limit is set by saturation: anything brighter is clipped. The lower limit is set by noise: anything below it is not a true intensity.",
   bn:"একটি ইমেজিং সিস্টেমের ডায়নামিক রেঞ্জ হলো সর্বোচ্চ পরিমাপযোগ্য তীব্রতা আর সর্বনিম্ন শনাক্তযোগ্য তীব্রতার অনুপাত। উপরের সীমা ঠিক করে স্যাচুরেশন: এর চেয়ে উজ্জ্বল সব মান কেটে যায়। নিচের সীমা ঠিক করে নয়েজ: এর নিচের মান আসল তীব্রতা নয়।"},
 {scene:"ct",k:0,en:"Closely related is contrast: the difference between the highest and lowest intensity levels in an image. When many pixels span a high dynamic range, the image has high contrast. An image with a low dynamic range looks dull and washed-out gray.",
   bn:"এর সাথে ঘনিষ্ঠভাবে জড়িত হলো কনট্রাস্ট: ইমেজের সর্বোচ্চ ও সর্বনিম্ন তীব্রতার পার্থক্য। অনেক পিক্সেল যখন উঁচু ডায়নামিক রেঞ্জ জুড়ে থাকে, ইমেজের কনট্রাস্ট বেশি হয়। কম ডায়নামিক রেঞ্জের ইমেজ ম্লান ও ধোয়া-ধূসর দেখায়।"}
],
points:[{en:"<b>Dynamic range</b> = max measurable ÷ min detectable; upper limit <b>saturation</b>, lower limit <b>noise</b>.",bn:"<b>ডায়নামিক রেঞ্জ</b> = সর্বোচ্চ পরিমাপযোগ্য ÷ সর্বনিম্ন শনাক্তযোগ্য; উপরের সীমা <b>স্যাচুরেশন</b>, নিচের সীমা <b>নয়েজ</b>।"},{en:"<b>Contrast</b> = highest − lowest intensity. Low dynamic range → washed-out look.",bn:"<b>কনট্রাস্ট</b> = সর্বোচ্চ − সর্বনিম্ন তীব্রতা। কম ডায়নামিক রেঞ্জ → ম্লান চেহারা।"}]}
],
quiz:[
 {q:{en:"Digitizing the coordinate values is called…",bn:"স্থানাঙ্কের মান ডিজিটাইজ করাকে বলে…"},o:[{en:"quantization",bn:"কোয়ান্টাইজেশন"},{en:"sampling",bn:"স্যাম্পলিং"},{en:"interpolation",bn:"ইন্টারপোলেশন"},{en:"thresholding",bn:"থ্রেশহোল্ডিং"}],a:1,w:{en:"Sampling: coordinates. Quantization: amplitude.",bn:"স্যাম্পলিং: স্থানাঙ্ক। কোয়ান্টাইজেশন: মান।"}},
 {q:{en:"Quantization mainly determines…",bn:"কোয়ান্টাইজেশন মূলত নির্ধারণ করে…"},o:[{en:"spatial resolution",bn:"স্পেশাল রেজোলিউশন"},{en:"the number of gray levels",bn:"গ্রে লেভেলের সংখ্যা"},{en:"image width",bn:"ইমেজের প্রস্থ"},{en:"sensor motion",bn:"সেন্সরের নড়াচড়া"}],a:1,w:{en:"Fewer levels → visible bands.",bn:"কম লেভেল → স্পষ্ট ব্যান্ড।"}},
 {q:{en:"For an array sensor, sampling depends on…",bn:"অ্যারে সেন্সরে স্যাম্পলিং নির্ভর করে…"},o:[{en:"motion only",bn:"শুধু নড়াচড়া"},{en:"number of sensors",bn:"সেন্সরের সংখ্যা"},{en:"the lens colour",bn:"লেন্সের রং"},{en:"the number of gray levels",bn:"গ্রে লেভেলের সংখ্যা"}],a:1,w:{en:"No motion is needed for an array.",bn:"অ্যারেতে নড়াচড়া লাগে না।"}},
 {q:{en:"With k = 8 bits, the intensity range is…",bn:"k = ৮ বিট হলে তীব্রতার পরিসর…"},o:[{en:"[0, 7]",bn:"[০, ৭]"},{en:"[0, 255]",bn:"[০, ২৫৫]"},{en:"[1, 256]",bn:"[১, ২৫৬]"},{en:"[0, 1023]",bn:"[০, ১০২৩]"}],a:1,w:{en:"L = 2⁸ = 256, so [0, L−1] = [0, 255].",bn:"L = ২⁸ = ২৫৬, তাই [০, L−১] = [০, ২৫৫]।"}},
 {q:{en:"The lower limit of dynamic range is set by…",bn:"ডায়নামিক রেঞ্জের নিচের সীমা নির্ধারণ করে…"},o:[{en:"saturation",bn:"স্যাচুরেশন"},{en:"noise",bn:"নয়েজ"},{en:"contrast",bn:"কনট্রাস্ট"},{en:"the number of rows",bn:"সারির সংখ্যা"}],a:1,w:{en:"Saturation sets the upper limit; noise the lower.",bn:"স্যাচুরেশন উপরের সীমা; নয়েজ নিচের সীমা।"}},
 {q:{en:"The most widely used representation in DIP is the…",bn:"DIP-এ সবচেয়ে বেশি ব্যবহৃত উপস্থাপন হলো…"},o:[{en:"surface plot",bn:"সারফেস প্লট"},{en:"visual intensity array",bn:"ভিজুয়াল ইনটেনসিটি অ্যারে"},{en:"2-D numerical array",bn:"দ্বিমাত্রিক সংখ্যার অ্যারে"},{en:"histogram",bn:"হিস্টোগ্রাম"}],a:2,w:{en:"Algorithms operate on the matrix of numbers.",bn:"অ্যালগরিদম সংখ্যার ম্যাট্রিক্সে কাজ করে।"}}
]});
})();
