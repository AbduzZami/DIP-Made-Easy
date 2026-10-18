/* ===== Lecture 12 · Morphological image processing ===== */
(()=>{
const parse=s=>s.trim().split("\n").map(r=>r.trim().split(/\s+/).map(Number));
const showBin=(M,A,cls="w")=>{for(let r=0;r<M.R;r++)for(let c=0;c<M.C;c++)M.cls(r,c,cls,!!A[r][c])};
const SQ=[[1,1,1],[1,1,1],[1,1,1]],CR=[[0,1,0],[1,1,1],[0,1,0]];
const AND=(A,B)=>A.map((r,i)=>r.map((v,j)=>v&&B[i][j]?1:0)),NOT=A=>A.map(r=>r.map(v=>v?0:1)),MINUS=(A,B)=>A.map((r,i)=>r.map((v,j)=>v&&!B[i][j]?1:0)),OR=(A,B)=>A.map((r,i)=>r.map((v,j)=>v||B[i][j]?1:0));
const same=(A,B)=>A.every((r,i)=>r.every((v,j)=>v===B[i][j]));
const seImg=n=>new Array(n*n).fill(1);
function hitTemplate(A,T){const R=A.length,C=A[0].length,g=(r,c)=>A[Math.min(R-1,Math.max(0,r))][Math.min(C-1,Math.max(0,c))];
  return A.map((row,r)=>row.map((_,c)=>{for(let i=0;i<3;i++)for(let j=0;j<3;j++){const t=T[i][j];if(t==="X")continue;if(+t!==g(r+i-1,c+j-1))return 0}return 1}))}
lecture({id:"l12",no:"12",title:{en:"Morphological Image Processing",bn:"মরফোলজিক্যাল ইমেজ প্রসেসিং"},book:{en:"Ch. 9 · Morphological Image Processing",bn:"চ্যাপ্টার ৯ · মরফোলজিক্যাল ইমেজ প্রসেসিং"},
chapters:[
/* 1 */
{id:"intro",slides:"2–9",title:{en:"Sets, reflection, translation and structuring elements",bn:"সেট, রিফ্লেকশন, ট্রান্সলেশন ও স্ট্রাকচারিং এলিমেন্ট"},
svg:`<g data-scene="set"><g data-s="0"><g id="in-a"></g><text class="sm" x="430" y="140">Morphology: the study of form and structure.</text><text class="sm" x="430" y="170">Here it extracts components that describe shape:</text><text class="sm" x="430" y="196">boundaries, skeletons, the convex hull.</text>
  <text class="sm am" x="430" y="250">The set of white pixels is a complete</text><text class="sm am" x="430" y="276">morphological description of the object.</text></g></g>
<g data-scene="rt"><g data-s="0"><line class="axis" x1="400" y1="40" x2="400" y2="420"/><line class="axis" x1="60" y1="230" x2="740" y2="230"/><circle cx="400" cy="230" r="5" class="node"/><text class="xs dim" x="408" y="250">origin</text>
  <g id="rt-b"></g><g id="rt-o"></g><text id="rt-t" class="mono lg am" x="60" y="70"></text><text id="rt-t2" class="sm dim" x="60" y="98"></text></g></g>
<g data-scene="se"><g data-s="0"><g id="se-g"></g><text class="c dim sm" x="400" y="400">SEs are padded with background (gray) to form rectangular arrays · dot = origin</text></g></g>`,
init(svg,_){const A=parse(`0 0 0 0 0 0 0 0 0 0
0 0 1 1 1 0 0 0 0 0
0 1 1 1 1 1 0 0 0 0
0 1 1 1 1 1 1 1 0 0
0 0 1 1 1 1 1 1 0 0
0 0 0 1 1 1 1 0 0 0
0 0 0 0 1 1 0 0 0 0
0 0 0 0 0 0 0 0 0 0`);const m=mat($$(svg,"#in-a"),{x:40,y:80,cs:36,data:A,notext:1});showBin(m,A);
  const pts=[[0,0],[1,0],[1,-1],[2,-1]],s=40;_.B=el($$(svg,"#rt-b"),"g");pts.forEach(([x,y])=>el(_.B,"rect",{x:400+x*s,y:230+y*s-s,width:s,height:s,class:"cell b"}));
  _.O=el($$(svg,"#rt-o"),"g",{style:"transition:transform 1.2s ease;transform-box:view-box;transform-origin:400px 230px"});pts.forEach(([x,y])=>el(_.O,"rect",{x:400+x*s,y:230+y*s-s,width:s,height:s,class:"cell a",style:"opacity:.75"}));
  const g=$$(svg,"#se-g");const E=[[[0,1,0],[1,1,1],[0,1,0]],[[1,1,1],[1,1,1],[1,1,1]],[[1,1,1,1,1]],[[0,0,1],[0,1,0],[1,0,0]]];let x=60;
  E.forEach(e=>{const M=mat(g,{x,y:140,cs:38,data:e,notext:1});e.forEach((r,i)=>r.forEach((v,j)=>M.cls(i,j,v?"b":"on")));const R=e.length,C=e[0].length;el(g,"circle",{cx:x+(C>>1)*38+19,cy:140+(R>>1)*38+19,r:5,class:"node",style:"fill:#0B1420"});x+=C*38+50})},
steps:[
 {scene:"set",k:0,en:"Morphology is a branch of biology dealing with form and structure. In image processing, mathematical morphology extracts image components useful for describing region shape, such as boundaries, skeletons and the convex hull. It is also used for pre- and post-processing, especially in segmentation. It uses set theory: the set of white pixels in a binary image fully describes the object.",
   bn:"মরফোলজি জীববিজ্ঞানের একটি শাখা যা গঠন ও আকৃতি নিয়ে কাজ করে। ইমেজ প্রসেসিংয়ে গাণিতিক মরফোলজি এমন অংশ বের করে যা অঞ্চলের আকৃতি বর্ণনায় কাজে লাগে, যেমন বাউন্ডারি, স্কেলেটন ও কনভেক্স হাল। প্রিপ্রসেসিং ও পোস্টপ্রসেসিংয়েও এটি ব্যবহৃত হয়, বিশেষ করে সেগমেন্টেশনে। এটি সেট তত্ত্ব ব্যবহার করে: বাইনারি ইমেজের সাদা পিক্সেলের সেট বস্তুটিকে পুরোপুরি বর্ণনা করে।"},
 {scene:"rt",k:0,fx:(svg,_)=>{$$(svg,"#rt-t").textContent="B̂ = { w | w = −b, b ∈ B }";$$(svg,"#rt-t2").textContent="reflection: every point mirrored through the origin";_.O.style.transform="rotate(0deg)";requestAnimationFrame(()=>requestAnimationFrame(()=>_.O.style.transform="rotate(180deg)"))},
   en:"Two basic set operations are used. The reflection of a set B, written B hat, replaces every point b by minus b, so the set is mirrored through its origin.",
   bn:"দুটি মৌলিক সেট অপারেশন ব্যবহৃত হয়। সেট B-এর রিফ্লেকশন, যা B হ্যাট লেখা হয়, প্রতিটি বিন্দু b-কে বিয়োগ b দিয়ে বদলায়, ফলে সেটটি তার মূলবিন্দুর সাপেক্ষে প্রতিফলিত হয়।"},
 {scene:"rt",k:0,fx:(svg,_)=>{$$(svg,"#rt-t").textContent="(B)z = { c | c = b + z, b ∈ B }";$$(svg,"#rt-t2").textContent="translation: every point shifted by z";_.O.style.transform="rotate(0deg)";requestAnimationFrame(()=>requestAnimationFrame(()=>_.O.style.transform="translate(-200px,120px)"))},
   en:"The translation of B by a point z, written B sub z, adds z to every point, so the whole set shifts.",
   bn:"একটি বিন্দু z দিয়ে B-এর ট্রান্সলেশন, যা B সাব z লেখা হয়, প্রতিটি বিন্দুর সাথে z যোগ করে, ফলে পুরো সেটটি সরে যায়।"},
 {scene:"se",k:0,en:"Reflection and translation are used with structuring elements, or SEs: small sets used to probe an image for properties of interest, similar to spatial filter masks. Each SE has an origin, shown by the dot. For images, SEs must be rectangular arrays, so they are padded with the smallest number of background elements.",
   bn:"রিফ্লেকশন ও ট্রান্সলেশন ব্যবহৃত হয় স্ট্রাকচারিং এলিমেন্ট বা SE-এর সাথে: ছোট সেট, যা দিয়ে ইমেজে আগ্রহের বৈশিষ্ট্য খোঁজা হয়, অনেকটা স্পেশাল ফিল্টার মাস্কের মতো। প্রতিটি SE-এর একটি মূলবিন্দু থাকে, যা বিন্দু দিয়ে দেখানো। ইমেজের জন্য SE অবশ্যই আয়তাকার অ্যারে হতে হয়, তাই সবচেয়ে কম সংখ্যক ব্যাকগ্রাউন্ড এলিমেন্ট দিয়ে প্যাড করা হয়।"}
],
points:[{en:"Reflection <b>B̂ = {w | w = −b}</b>; translation <b>(B)z = {b + z}</b>.",bn:"রিফ্লেকশন <b>B̂ = {w | w = −b}</b>; ট্রান্সলেশন <b>(B)z = {b + z}</b>।"},{en:"Structuring elements: small probe sets with an origin, padded to rectangular arrays.",bn:"স্ট্রাকচারিং এলিমেন্ট: মূলবিন্দুসহ ছোট সেট, আয়তাকার অ্যারেতে প্যাড করা।"}]},
/* 2 */
{id:"erosion",slides:"10–16",title:{en:"Erosion",bn:"ইরোশন"},
svg:`<g data-scene="g"><g data-s="0"><text class="mono am lg" x="40" y="44">A ⊖ B = { z | (B)z ⊆ A }</text><g id="er-a"></g><g id="er-k"></g><g id="er-o"></g><text id="er-t" class="sm" x="40" y="420"></text></g></g>
<g data-scene="im"><g data-s="0"><g id="er-i"></g></g></g>`,
init(svg,_){const A=parse(`0 0 0 0 0 0 0 0 0 0
0 1 1 1 1 0 0 0 0 0
0 1 1 1 1 0 0 1 0 0
0 1 1 1 1 1 1 1 1 0
0 1 1 1 1 0 0 1 0 0
0 0 0 0 0 0 0 0 0 0
0 0 1 1 1 0 1 1 0 0
0 0 1 1 1 0 1 1 0 0
0 0 1 1 1 0 0 0 0 0`);_.A=A;_.E=gErode(A,SQ);_.M=mat($$(svg,"#er-a"),{x:40,y:70,cs:34,data:A,notext:1,label:"A"});showBin(_.M,A,"on");_.K=kbox($$(svg,"#er-k"),_.M,3);
  _.O=mat($$(svg,"#er-o"),{x:430,y:70,cs:34,data:A,notext:1,label:"A ⊖ B (B = 3 × 3 square)"});
  const W=mk(128,128,(x,y)=>{if(Math.abs(x-.5)<.14&&Math.abs(y-.5)<.14)return 1;const pads=[[.12,.12],[.88,.12],[.12,.88],[.88,.88],[.5,.08],[.08,.5]];for(const[a,b]of pads)if(Math.abs(x-a)<.06&&Math.abs(y-b)<.06)return 1;
    for(const[a,b]of pads){const t=Math.max(0,Math.min(1,((x-a)*(.5-a)+(y-b)*(.5-b))/((.5-a)**2+(.5-b)**2)));if(Math.hypot(x-a-t*(.5-a),y-b-t*(.5-b))<.012)return 1}return 0});
  const g=$$(svg,"#er-i");[[0,"wire-bond mask"],[3,"3 × 3"],[9,"9 × 9"],[23,"23 × 23"]].forEach(([n,l],i)=>imgEl(g,30+i*190,90,170,170,l).show(n?morph(W,"erode",seImg(n)):W));
  txt(g,400,330,"thin lines vanish first, then the pads, then only the large centre remains","c dim sm")},
steps:[
 {scene:"g",k:0,fx:(svg,_)=>{const L=[];for(let r=0;r<7;r++)for(let c=0;c<8;c++)L.push([170,()=>{_.K.at(r,c);const fit=_.E[r+1][c+1];if(fit)_.O.cls(r+1,c+1,"w");$$(svg,"#er-t").textContent=fit?`(B)z fits inside A at (${r+1},${c+1}) → keep`:`(B)z does not fit at (${r+1},${c+1})`}]);
   L.reset=()=>_.O.clear("w");return seq(L,true,2500)},
   en:"Erosion of A by B is the set of all points z such that B, translated by z, is contained in A. In other words, place the structuring element at every pixel. If it fits completely inside the object, the pixel is kept. Otherwise it is removed.",
   bn:"B দিয়ে A-এর ইরোশন হলো এমন সব বিন্দু z-এর সেট, যেখানে z দিয়ে সরানো B পুরোপুরি A-এর ভেতরে থাকে। অর্থাৎ স্ট্রাকচারিং এলিমেন্টকে প্রতিটি পিক্সেলে বসাও। যদি এটি পুরোপুরি বস্তুর ভেতরে এঁটে যায়, পিক্সেলটি থাকে। না হলে বাদ যায়।"},
 {scene:"g",k:0,fx:(svg,_)=>{_.K.el.style.opacity=0;showBin(_.O,_.E);$$(svg,"#er-t").textContent="thin parts and small objects disappear; the object shrinks"},
   en:"Erosion shrinks, or thins, objects. Details smaller than the structuring element, like the thin line and the small blocks here, are removed completely. It acts as a morphological filter.",
   bn:"ইরোশন বস্তুকে ছোট বা সরু করে। স্ট্রাকচারিং এলিমেন্টের চেয়ে ছোট খুঁটিনাটি, যেমন এখানে সরু রেখা ও ছোট ব্লকগুলো, পুরোপুরি মুছে যায়। এটি একটি মরফোলজিক্যাল ফিল্টার হিসেবে কাজ করে।"},
 {scene:"im",k:0,en:"Erosion can remove unwanted components. In this wire-bond mask, we want to remove the lines connecting the centre to the pads. A small square removes the thin lines. A bigger one also removes the pads. A very large one leaves only the centre region. The slides use 11, 15 and 45 pixel squares on a 486 by 486 image.",
   bn:"ইরোশন দিয়ে অনাকাঙ্ক্ষিত অংশ সরানো যায়। এই ওয়্যার-বন্ড মাস্কে আমরা মাঝখান থেকে প্যাড পর্যন্ত সংযোগকারী রেখাগুলো সরাতে চাই। ছোট বর্গ সরু রেখাগুলো সরিয়ে দেয়। বড় বর্গ প্যাডগুলোও সরায়। খুব বড় বর্গ শুধু মাঝের অঞ্চলটি রেখে দেয়। স্লাইডে ৪৮৬ বাই ৪৮৬ ইমেজে ১১, ১৫ ও ৪৫ পিক্সেলের বর্গ ব্যবহার করা হয়েছে।"}
],
points:[{en:"<b>A ⊖ B = {z | (B)z ⊆ A}</b>: keep z where the SE fits inside A.",bn:"<b>A ⊖ B = {z | (B)z ⊆ A}</b>: যেখানে SE A-এর ভেতরে এঁটে যায় সেখানে z রাখো।"},{en:"Shrinks or thins objects; removes details smaller than the SE.",bn:"বস্তুকে ছোট বা সরু করে; SE-এর চেয়ে ছোট খুঁটিনাটি সরায়।"}]},
/* 3 */
{id:"dilation",slides:"17–23",title:{en:"Dilation",bn:"ডাইলেশন"},
svg:`<g data-scene="g"><g data-s="0"><text class="mono am lg" x="40" y="44">A ⊕ B = { z | (B̂)z ∩ A ≠ ∅ }</text><g id="dl-a"></g><g id="dl-k"></g><g id="dl-o"></g><text id="dl-t" class="sm" x="40" y="420"></text></g></g>
<g data-scene="im"><g data-s="0"><g id="dl-i"></g></g></g>`,
init(svg,_){const A=parse(`0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 1 1 1 0 0 0 0 0
0 0 1 1 1 0 0 1 0 0
0 0 1 1 1 0 0 1 0 0
0 0 0 0 0 0 0 1 0 0
0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0`);_.A=A;_.D=gDilate(A,CR);_.M=mat($$(svg,"#dl-a"),{x:40,y:70,cs:34,data:A,notext:1,label:"A"});showBin(_.M,A,"on");_.K=kbox($$(svg,"#dl-k"),_.M,3);
  _.O=mat($$(svg,"#dl-o"),{x:430,y:70,cs:34,data:A,notext:1,label:"A ⊕ B (B = 3 × 3 cross)"});
  const T=gen("text",160);const g=$$(svg,"#dl-i");imgEl(g,60,80,300,300,"broken characters").show(T);imgEl(g,440,80,300,300,"dilated with a 3 × 3 cross").show(morph(T,"dilate",[0,1,0,1,1,1,0,1,0]))},
steps:[
 {scene:"g",k:0,fx:(svg,_)=>{const L=[];for(let r=0;r<7;r++)for(let c=0;c<8;c++)L.push([170,()=>{_.K.at(r,c);const hit=_.D[r+1][c+1];if(hit)_.O.cls(r+1,c+1,"w");$$(svg,"#dl-t").textContent=hit?`(B̂)z overlaps A at (${r+1},${c+1}) → set`:`no overlap at (${r+1},${c+1})`}]);
   L.reset=()=>_.O.clear("w");return seq(L,true,2500)},
   en:"Dilation of A by B is the set of all points z such that the reflected B, translated by z, overlaps A in at least one element. Place the reflected structuring element at every pixel. If it touches the object anywhere, the pixel becomes part of the output.",
   bn:"B দিয়ে A-এর ডাইলেশন হলো এমন সব বিন্দু z-এর সেট, যেখানে প্রতিফলিত B-কে z দিয়ে সরালে A-এর সাথে অন্তত একটি এলিমেন্টে মিলে যায়। প্রতিফলিত স্ট্রাকচারিং এলিমেন্টকে প্রতিটি পিক্সেলে বসাও। এটি যদি বস্তুর কোথাও স্পর্শ করে, পিক্সেলটি আউটপুটের অংশ হয়।"},
 {scene:"g",k:0,fx:(svg,_)=>{_.K.el.style.opacity=0;showBin(_.O,_.D);$$(svg,"#dl-t").textContent="objects grow or thicken by the shape of B"},
   en:"Dilation grows, or thickens, objects. How much, and in what shape, is controlled by the structuring element.",
   bn:"ডাইলেশন বস্তুকে বড় বা মোটা করে। কতটা এবং কোন আকারে, তা নিয়ন্ত্রণ করে স্ট্রাকচারিং এলিমেন্ট।"},
 {scene:"im",k:0,en:"One of the simplest uses of dilation is bridging gaps. Poor resolution text has broken characters. Dilating with a small 3 by 3 cross joins the broken segments.",
   bn:"ডাইলেশনের সবচেয়ে সহজ ব্যবহারগুলোর একটি হলো ফাঁক জোড়া লাগানো। কম রেজোলিউশনের লেখায় অক্ষরগুলো ভাঙা থাকে। ছোট একটি ৩ বাই ৩ ক্রস দিয়ে ডাইলেট করলে ভাঙা অংশগুলো জোড়া লেগে যায়।"}
],
points:[{en:"<b>A ⊕ B = {z | (B̂)z ∩ A ≠ ∅}</b>: set z where the reflected SE touches A.",bn:"<b>A ⊕ B = {z | (B̂)z ∩ A ≠ ∅}</b>: যেখানে প্রতিফলিত SE A-কে ছোঁয় সেখানে z।"},{en:"Grows or thickens objects; bridges gaps in broken characters.",bn:"বস্তুকে বড় বা মোটা করে; ভাঙা অক্ষরের ফাঁক জোড়ে।"}]},
/* 4 */
{id:"duality",slides:"24–25",title:{en:"Duality of erosion and dilation",bn:"ইরোশন ও ডাইলেশনের দ্বৈততা"},
svg:`<text class="mono am lg c" x="400" y="50">(A ⊖ B)ᶜ = Aᶜ ⊕ B̂        (A ⊕ B)ᶜ = Aᶜ ⊖ B̂</text><g id="du-i"></g>`,
init(svg){const A=gen("text",128),S=seImg(5);const g=$$(svg,"#du-i");const L=[["A",A],["(A ⊖ B)ᶜ",mapI(morph(A,"erode",S),v=>1-v)],["Aᶜ",mapI(A,v=>1-v)],["Aᶜ ⊕ B̂",morph(mapI(A,v=>1-v),"dilate",S)]];
  L.forEach(([t,im],i)=>imgEl(g,30+i*190,100,170,170,t).show(im));txt(g,400,330,"the second and fourth images are identical","c am");txt(g,400,356,"(B is symmetric here, so B̂ = B)","c dim sm")},
steps:[
 {k:0,en:"Erosion and dilation are duals of each other with respect to set complement and reflection. The complement of A eroded by B equals the complement of A dilated by B hat. So eroding the object is the same as dilating the background. This means we can compute either operation using the other.",
   bn:"সেট কমপ্লিমেন্ট ও রিফ্লেকশনের সাপেক্ষে ইরোশন ও ডাইলেশন একে অপরের দ্বৈত। B দিয়ে A-এর ইরোশনের কমপ্লিমেন্ট সমান A-এর কমপ্লিমেন্টকে B হ্যাট দিয়ে ডাইলেশন। অর্থাৎ বস্তুকে ইরোড করা আর ব্যাকগ্রাউন্ডকে ডাইলেট করা একই। তাই একটি অপারেশন দিয়ে অন্যটিও হিসাব করা যায়।"}
],
points:[{en:"<b>(A ⊖ B)ᶜ = Aᶜ ⊕ B̂</b> and <b>(A ⊕ B)ᶜ = Aᶜ ⊖ B̂</b>.",bn:"<b>(A ⊖ B)ᶜ = Aᶜ ⊕ B̂</b> এবং <b>(A ⊕ B)ᶜ = Aᶜ ⊖ B̂</b>।"}]},
/* 5 */
{id:"openclose",slides:"26–31",title:{en:"Opening and closing",bn:"ওপেনিং ও ক্লোজিং"},
svg:`<g data-scene="ball"><g data-s="0"><text id="oc-t" class="mono am lg" x="40" y="50"></text><path id="oc-s" d="M120 330 L120 140 Q120 110 150 110 L330 110 L345 160 L360 110 L520 110 L520 200 L610 200 L610 330 Z" style="fill:#3A5578;stroke:#DDE6F0;stroke-width:2"/>
  <circle id="oc-b" r="26" style="fill:none;stroke:#F2A93B;stroke-width:3"/><path id="oc-r" style="fill:#4CC489;fill-opacity:.35"/><text id="oc-n" class="sm dim" x="40" y="400"></text></g></g>
<g data-scene="fp"><g data-s="0"><g id="oc-i"></g></g></g>`,
init(svg,_){const F=gen("fingerprint",128),S=seImg(3);const e=morph(F,"erode",S),o=morph(e,"dilate",S),d=morph(o,"dilate",S),c=morph(d,"erode",S);const g=$$(svg,"#oc-i");
  [["noisy A",F],["A ⊖ B",e],["opening A ∘ B",o],["(A ∘ B) ⊕ B",d],["closing of the opening",c]].forEach(([t,im],i)=>imgEl(g,15+i*157,110,145,145,t).show(im));
  txt(g,400,330,"opening removes the noise specks · closing fills the small breaks","c am")},
steps:[
 {scene:"ball",k:0,fx:svg=>{$$(svg,"#oc-t").textContent="A ∘ B = (A ⊖ B) ⊕ B";$$(svg,"#oc-n").textContent="union of all positions where B fits inside A: the narrow notch and sharp corners are lost";const b=$$(svg,"#oc-b");
   const P=[[146,304],[146,136],[310,136],[310,136],[380,136],[494,136],[494,226],[584,226],[584,304],[146,304]];return rafLoop(t=>{const u=(t*.25)%(P.length-1),i=Math.floor(u),f=u-i;b.setAttribute("cx",P[i][0]+(P[i+1][0]-P[i][0])*f);b.setAttribute("cy",P[i][1]+(P[i+1][1]-P[i][1])*f)})},
   en:"Opening is erosion followed by dilation with the same structuring element. Picture the structuring element as a ball rolling inside the boundary of the object. The opening is everything the ball can reach. It smooths the contour, breaks narrow joins, and removes small objects and thin protrusions, while keeping the shape and size of larger objects.",
   bn:"ওপেনিং হলো একই স্ট্রাকচারিং এলিমেন্ট দিয়ে প্রথমে ইরোশন, তারপর ডাইলেশন। স্ট্রাকচারিং এলিমেন্টকে একটি বল ভাবো, যা বস্তুর বাউন্ডারির ভেতর দিয়ে গড়িয়ে চলে। বলটি যতদূর পৌঁছাতে পারে, সবটাই ওপেনিং। এটি কনট্যুর মসৃণ করে, সরু সংযোগ ভেঙে দেয়, ছোট বস্তু ও সরু উঁচু অংশ সরায়, কিন্তু বড় বস্তুর আকৃতি ও আকার বজায় রাখে।"},
 {scene:"ball",k:0,fx:svg=>{$$(svg,"#oc-t").textContent="A • B = (A ⊕ B) ⊖ B";$$(svg,"#oc-n").textContent="the ball rolls outside: narrow breaks, gulfs and small holes are filled";const b=$$(svg,"#oc-b");
   const P=[[94,356],[94,84],[330,84],[345,104],[360,84],[546,84],[546,174],[636,174],[636,356],[94,356]];return rafLoop(t=>{const u=(t*.25)%(P.length-1),i=Math.floor(u),f=u-i;b.setAttribute("cx",P[i][0]+(P[i+1][0]-P[i][0])*f);b.setAttribute("cy",P[i][1]+(P[i+1][1]-P[i][1])*f)})},
   en:"Closing is dilation followed by erosion. Now the ball rolls on the outside of the boundary. Closing also smooths the contour, but it fuses narrow breaks, fills long thin gulfs, and removes small holes.",
   bn:"ক্লোজিং হলো প্রথমে ডাইলেশন, তারপর ইরোশন। এবার বলটি বাউন্ডারির বাইরে দিয়ে গড়ায়। ক্লোজিংও কনট্যুর মসৃণ করে, তবে এটি সরু ফাটল জোড়া দেয়, লম্বা সরু খাঁজ ভরিয়ে দেয় এবং ছোট গর্ত দূর করে।"},
 {scene:"fp",k:0,en:"Together they make a good noise filter. Opening a noisy fingerprint removes the background specks. Closing the result then fills the small breaks in the ridges. Applying opening or closing a second time has no further effect: both are idempotent.",
   bn:"দুটি মিলে একটি ভালো নয়েজ ফিল্টার হয়। নয়েজযুক্ত ফিঙ্গারপ্রিন্টে ওপেনিং করলে ব্যাকগ্রাউন্ডের দাগগুলো চলে যায়। তারপর ফলাফলে ক্লোজিং করলে রেখার ছোট ফাঁকগুলো ভরে যায়। ওপেনিং বা ক্লোজিং দ্বিতীয়বার করলে আর কোনো পরিবর্তন হয় না: দুটোই আইডেমপোটেন্ট।"}
],
points:[{en:"<b>Opening A ∘ B = (A ⊖ B) ⊕ B</b>: removes small objects, thin lines, internal noise.",bn:"<b>ওপেনিং A ∘ B = (A ⊖ B) ⊕ B</b>: ছোট বস্তু, সরু রেখা, ভেতরের নয়েজ সরায়।"},{en:"<b>Closing A • B = (A ⊕ B) ⊖ B</b>: fuses narrow breaks, fills small holes. Both are idempotent; (A • B)ᶜ = Aᶜ ∘ B̂.",bn:"<b>ক্লোজিং A • B = (A ⊕ B) ⊖ B</b>: সরু ফাটল জোড়ে, ছোট গর্ত ভরে। দুটোই আইডেমপোটেন্ট; (A • B)ᶜ = Aᶜ ∘ B̂।"}]},
/* 6 */
{id:"hitmiss",slides:"32–37",title:{en:"Hit-or-miss transform",bn:"হিট-অর-মিস ট্রান্সফর্ম"},
svg:`<text class="mono am lg" x="40" y="44">A ⊛ B = (A ⊖ B₁) ∩ (Aᶜ ⊖ B₂)</text><g id="hm-a"></g><g id="hm-k"></g><g id="hm-b1"></g><g id="hm-b2"></g><text id="hm-t" class="sm" x="430" y="350"></text><text class="sm dim" x="430" y="380">B₁ probes the foreground, B₂ the background</text>`,
init(svg,_){const A=parse(`0 0 0 0 0 0 0 0 0 0
0 1 0 0 0 1 1 1 0 0
0 0 0 0 0 1 1 1 0 0
0 0 0 1 0 1 1 1 0 0
0 1 0 0 0 0 0 0 0 0
0 1 1 0 0 0 1 0 0 0
0 0 0 0 0 0 0 0 1 0
0 0 1 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0`);_.A=A;_.M=mat($$(svg,"#hm-a"),{x:40,y:70,cs:34,data:A,notext:1});showBin(_.M,A,"on");_.K=kbox($$(svg,"#hm-k"),_.M,3);
  const b1=mat($$(svg,"#hm-b1"),{x:440,y:110,cs:40,data:[[0,0,0],[0,1,0],[0,0,0]],label:"B₁ (foreground)"});b1.cls(1,1,"b");const b2=mat($$(svg,"#hm-b2"),{x:620,y:110,cs:40,data:[[1,1,1],[1,0,1],[1,1,1]],label:"B₂ (background)"});[[0,0],[0,1],[0,2],[1,0],[1,2],[2,0],[2,1],[2,2]].forEach(([r,c])=>b2.cls(r,c,"a"));
  _.H=AND(gErode(A,[[0,0,0],[0,1,0],[0,0,0]]),gErode(NOT(A),[[1,1,1],[1,0,1],[1,1,1]]))},
steps:[
 {k:0,fx:(svg,_)=>{_.M.clear("c");$$(svg,"#hm-t").textContent="pattern: a single isolated pixel"},en:"The hit-or-miss transform looks for a particular pattern of foreground and background pixels, so it is a basic tool for shape detection. It uses two structuring elements: B1 must fit in the foreground, and B2 must fit in the background. Here B1 is a single pixel and B2 is the ring around it, so the pattern is an isolated point.",
   bn:"হিট-অর-মিস ট্রান্সফর্ম ফোরগ্রাউন্ড ও ব্যাকগ্রাউন্ড পিক্সেলের একটি নির্দিষ্ট প্যাটার্ন খোঁজে, তাই এটি আকৃতি শনাক্তের একটি মৌলিক টুল। এতে দুটি স্ট্রাকচারিং এলিমেন্ট লাগে: B1 ফোরগ্রাউন্ডে এঁটে যেতে হবে, আর B2 ব্যাকগ্রাউন্ডে। এখানে B1 একটি পিক্সেল আর B2 তার চারপাশের বলয়, তাই প্যাটার্নটি হলো একটি একক বিচ্ছিন্ন বিন্দু।"},
 {k:0,fx:(svg,_)=>{_.M.clear("c");const L=[];for(let r=0;r<7;r++)for(let c=0;c<8;c++)L.push([150,()=>{_.K.at(r,c);if(_.H[r+1][c+1]){_.M.cls(r+1,c+1,"c");$$(svg,"#hm-t").textContent=`match at (${r+1},${c+1})`}}]);L.reset=()=>_.M.clear("c");return seq(L,true,2500)},
   en:"The output is the intersection of A eroded by B1 and the complement of A eroded by B2. A pixel is marked only when both conditions hold. The isolated points are found, while pixels that belong to larger shapes are rejected, because their neighbourhood is not all background.",
   bn:"আউটপুট হলো B1 দিয়ে A-এর ইরোশন এবং B2 দিয়ে A-এর কমপ্লিমেন্টের ইরোশনের ইন্টারসেকশন। দুটি শর্তই পূরণ হলে তবেই একটি পিক্সেল চিহ্নিত হয়। বিচ্ছিন্ন বিন্দুগুলো খুঁজে পাওয়া যায়, আর বড় আকৃতির অংশ যে পিক্সেলগুলো, সেগুলো বাদ পড়ে, কারণ তাদের চারপাশ পুরোপুরি ব্যাকগ্রাউন্ড নয়।"}
],
points:[{en:"<b>A ⊛ B = (A ⊖ B₁) ∩ (Aᶜ ⊖ B₂)</b>; B₁ for foreground, B₂ for background.",bn:"<b>A ⊛ B = (A ⊖ B₁) ∩ (Aᶜ ⊖ B₂)</b>; B₁ ফোরগ্রাউন্ডের জন্য, B₂ ব্যাকগ্রাউন্ডের জন্য।"},{en:"A basic tool for shape (pattern) detection.",bn:"আকৃতি (প্যাটার্ন) শনাক্তের একটি মৌলিক টুল।"}]},
/* 7 */
{id:"boundary",slides:"38–43",title:{en:"Boundary extraction and hole filling",bn:"বাউন্ডারি এক্সট্র্যাকশন ও হোল ফিলিং"},
svg:`<g data-scene="bd"><g data-s="0"><text class="mono am lg" x="40" y="44">β(A) = A − (A ⊖ B)</text><g id="bd-a"></g><g id="bd-e"></g><g id="bd-b"></g></g></g>
<g data-scene="hf"><g data-s="0"><text class="mono am lg" x="40" y="44">X_k = (X_{k−1} ⊕ B) ∩ Aᶜ</text><g id="hf-a"></g><text id="hf-t" class="mono" x="460" y="200"></text><text class="sm dim" x="460" y="240">B = 3 × 3 cross · start X₀ inside the hole</text><text class="sm dim" x="460" y="266">stop when X_k = X_{k−1}; result = X_k ∪ A</text></g></g>`,
init(svg,_){const A=parse(`0 0 0 0 0 0 0 0
0 1 1 1 1 1 0 0
0 1 1 1 1 1 1 0
0 1 1 1 1 1 1 0
0 1 1 1 1 1 1 0
0 0 1 1 1 1 1 0
0 0 0 1 1 1 0 0
0 0 0 0 0 0 0 0`);const E=gErode(A,SQ),B=MINUS(A,E);
  [["A",A,"#bd-a",30],["A ⊖ B",E,"#bd-e",290],["boundary",B,"#bd-b",550]].forEach(([l,X,id,x])=>{const m=mat($$(svg,id),{x,y:110,cs:28,data:X,notext:1,label:l});showBin(m,X,l==="boundary"?"a":"w")});
  const H=parse(`0 0 0 0 0 0 0 0 0
0 0 1 1 1 1 0 0 0
0 1 1 0 0 1 1 0 0
0 1 0 0 0 0 1 0 0
0 1 0 0 0 0 1 1 0
0 1 1 0 0 0 0 1 0
0 0 1 1 0 0 1 1 0
0 0 0 1 1 1 1 0 0
0 0 0 0 0 0 0 0 0`);_.H=H;_.HM=mat($$(svg,"#hf-a"),{x:40,y:80,cs:36,data:H,notext:1});showBin(_.HM,H,"on");
  const X=[H.map(r=>r.map(()=>0))];X[0][4][4]=1;while(true){const n=AND(gDilate(X[X.length-1],CR),NOT(H));if(same(n,X[X.length-1]))break;X.push(n)}_.X=X},
steps:[
 {scene:"bd",k:0,en:"The boundary of a set A is obtained by eroding A with a structuring element B, then subtracting the result from A. With a 3 by 3 square of 1s, the boundary is one pixel thick.",
   bn:"একটি সেট A-এর বাউন্ডারি পাওয়া যায় স্ট্রাকচারিং এলিমেন্ট B দিয়ে A-কে ইরোড করে, তারপর ফলাফলটি A থেকে বিয়োগ করে। ১ দিয়ে ভরা ৩ বাই ৩ বর্গ ব্যবহার করলে বাউন্ডারি এক পিক্সেল মোটা হয়।"},
 {scene:"hf",k:0,fx:(svg,_)=>{const L=_.X.map((x,k)=>[700,()=>{_.HM.clear("a");x.forEach((row,r)=>row.forEach((v,c)=>v&&_.HM.cls(r,c,"a")));$$(svg,"#hf-t").textContent=`X${k}: ${x.flat().filter(Boolean).length} pixels`}]);
   L.push([900,()=>$$(svg,"#hf-t").textContent=`converged after ${_.X.length-1} steps → fill = X ∪ A`]);L.reset=()=>_.HM.clear("a");return seq(L,true,2000)},
   en:"Hole filling starts from a point inside the hole, X zero. Each step dilates the current set and intersects it with the complement of A, so the growth stays inside the hole and cannot cross the boundary. When nothing changes, the union of X and A is the filled region.",
   bn:"হোল ফিলিং শুরু হয় গর্তের ভেতরের একটি বিন্দু X শূন্য থেকে। প্রতিটি ধাপে বর্তমান সেটকে ডাইলেট করে A-এর কমপ্লিমেন্টের সাথে ইন্টারসেক্ট করা হয়, ফলে বৃদ্ধি গর্তের ভেতরেই থাকে, বাউন্ডারি পার হতে পারে না। যখন আর কিছু বদলায় না, X ও A-এর ইউনিয়নই ভরাট অঞ্চল।"}
],
points:[{en:"<b>β(A) = A − (A ⊖ B)</b>.",bn:"<b>β(A) = A − (A ⊖ B)</b>।"},{en:"Hole filling: <b>X_k = (X_{k−1} ⊕ B) ∩ Aᶜ</b> until stable; result X_k ∪ A.",bn:"হোল ফিলিং: স্থির না হওয়া পর্যন্ত <b>X_k = (X_{k−1} ⊕ B) ∩ Aᶜ</b>; ফলাফল X_k ∪ A।"}]},
/* 8 */
{id:"components",slides:"44–51",title:{en:"Extraction of connected components",bn:"কানেক্টেড কম্পোনেন্ট এক্সট্র্যাকশন"},
svg:`<text class="mono am lg" x="40" y="44">X_k = (X_{k−1} ⊕ B) ∩ A</text><g id="cc-a"></g><g id="cc-x"></g><text id="cc-t" class="mono" x="460" y="380"></text><text class="sm dim" x="460" y="410">B = 3 × 3 square of 1s</text>`,
init(svg,_){const A=parse(`0 0 0 0 0 0 1 1
0 0 0 0 0 0 1 1
0 1 1 1 1 0 0 0
0 1 1 1 0 1 1 0
0 1 1 1 1 1 0 0
0 1 1 0 1 1 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0`);_.A=A;const m=mat($$(svg,"#cc-a"),{x:40,y:80,cs:40,data:A,label:"input A"});showBin(m,A,"on");
  _.XM=mat($$(svg,"#cc-x"),{x:460,y:80,cs:34,data:A.map(r=>r.map(()=>0)),label:"X_k"});
  const X=[A.map(r=>r.map(()=>0))];X[0][4][2]=1;while(true){const n=AND(gDilate(X[X.length-1],SQ),A);if(same(n,X[X.length-1]))break;X.push(n)}_.X=X},
steps:[
 {k:0,fx:(svg,_)=>{const L=_.X.map((x,k)=>[900,()=>{for(let r=0;r<8;r++)for(let c=0;c<8;c++){_.XM.set(r,c,x[r][c]);_.XM.cls(r,c,"a",!!x[r][c])}$$(svg,"#cc-t").textContent=`k = ${k}: ${x.flat().filter(Boolean).length} pixels`}]);
   L.push([1000,()=>$$(svg,"#cc-t").textContent=`stable at k = ${_.X.length-1}: one connected component`]);L.reset=()=>{};return seq(L,true,2200)},
   en:"To extract a connected component, start with one known point of it, X zero, here inside the large object. Each step dilates X with a 3 by 3 square and intersects the result with A, so growth only follows pixels of A. Repeat until X stops changing. The result is the whole component containing the starting point. The separate block at the top right is not included.",
   bn:"একটি কানেক্টেড কম্পোনেন্ট বের করতে তার একটি জানা বিন্দু X শূন্য দিয়ে শুরু করো, এখানে বড় বস্তুটির ভেতরে। প্রতিটি ধাপে X-কে ৩ বাই ৩ বর্গ দিয়ে ডাইলেট করে A-এর সাথে ইন্টারসেক্ট করা হয়, ফলে বৃদ্ধি শুধু A-এর পিক্সেল ধরে এগোয়। X বদলানো বন্ধ না হওয়া পর্যন্ত চালিয়ে যাও। ফলাফল হলো শুরুর বিন্দুসহ পুরো কম্পোনেন্ট। উপরে ডানের আলাদা ব্লকটি এতে আসে না।"}
],
points:[{en:"<b>X_k = (X_{k−1} ⊕ B) ∩ A</b>, starting from a point in the component; stop when X_k = X_{k−1}.",bn:"<b>X_k = (X_{k−1} ⊕ B) ∩ A</b>, কম্পোনেন্টের একটি বিন্দু থেকে শুরু; X_k = X_{k−1} হলে থামো।"}]},
/* 9 */
{id:"thinning",slides:"52–64",title:{en:"Thinning and thickening",bn:"থিনিং ও থিকেনিং"},
svg:`<g data-scene="se"><g data-s="0"><text class="mono am lg" x="40" y="44">A ⊗ B = A − (A ⊛ B)</text><g id="th-s"></g><text class="sm dim" x="40" y="400">X = don't care · if the template matches completely, the centre pixel becomes 0</text></g></g>
<g data-scene="run"><g data-s="0"><g id="th-a"></g><g id="th-k"></g><text id="th-t" class="mono am lg" x="440" y="140"></text><text id="th-t2" class="sm" x="440" y="176"></text><g id="th-cur"></g></g></g>
<g data-scene="thick"><g data-s="0"><text class="mono am lg" x="40" y="44">A ⊙ B = A ∪ (A ⊛ B)</text><g id="tk-s"></g>
  <text class="sm" x="40" y="330">Thickening is the morphological dual of thinning: a complete match sets the centre to 1.</text><text class="sm dim" x="40" y="360">It grows selected foreground regions, like dilation or closing, e.g. to approximate the convex hull.</text></g></g>`,
init(svg,_){const T=["0 0 0 X 1 X 1 1 1","0 X 1 0 1 1 0 X 1","1 1 X 1 1 0 X 0 0","1 1 1 X 1 X 0 0 0","X 1 1 0 1 1 0 0 X","X 0 0 1 1 0 1 1 X","1 X 0 1 1 0 1 X 0","0 0 X 0 1 1 X 1 1"].map(s=>{const v=s.split(" ");return[v.slice(0,3),v.slice(3,6),v.slice(6,9)]});_.T=T;
  const sh=(g,list,thick)=>list.forEach((t,i)=>{const x=40+(i%4)*186,y=90+Math.floor(i/4)*150;const m=mat(g,{x,y,cs:34,fs:13,data:thick?t.map((r,a)=>r.map((v,b)=>a===1&&b===1?"0":v)):t,label:`B${i+1}`});t.forEach((r,a)=>r.forEach((v,b)=>{if(v==="1"&&!(thick&&a===1&&b===1))m.cls(a,b,"b");if(v==="0"||(thick&&a===1&&b===1))m.cls(a,b,"k")}))});
  sh($$(svg,"#th-s"),T,0);sh($$(svg,"#tk-s"),T.slice(0,4),1);
  const A=parse(`0 0 0 0 0 0 1 1
1 0 0 0 0 0 1 1
1 1 1 1 1 0 0 0
1 1 1 1 0 1 1 0
1 1 1 1 1 1 0 0
1 1 1 0 1 1 0 0
0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0`);_.A=A;_.M=mat($$(svg,"#th-a"),{x:40,y:70,cs:40,data:A,label:"A"});
  let cur=A.map(r=>r.slice());_.steps=[{A:cur,ch:[]}];T.forEach(t=>{const h=hitTemplate(cur,t);const ch=[];h.forEach((r,i)=>r.forEach((v,j)=>{if(v&&cur[i][j])ch.push([i,j])}));const n=cur.map(r=>r.slice());ch.forEach(([i,j])=>n[i][j]=0);cur=n;_.steps.push({A:cur,ch})});
  _.cur=mat($$(svg,"#th-cur"),{x:560,y:230,cs:36,fs:13,data:T[0]});_.show=k=>{const s=_.steps[k];for(let r=0;r<8;r++)for(let c=0;c<8;c++){_.M.set(r,c,s.A[r][c]);_.M.cls(r,c,"w",!!s.A[r][c]);_.M.cls(r,c,"d",false)}s.ch.forEach(([r,c])=>_.M.cls(r,c,"d"))}},
steps:[
 {scene:"se",k:0,en:"Thinning removes selected foreground pixels from a binary image, somewhat like erosion or opening. It is especially useful for skeletonization, and for tidying up edge detector output by reducing lines to single-pixel thickness. Thinning A by B is A minus the hit-or-miss transform of A by B. A sequence of eight structuring elements is used, B1 to B8, where X means don't care.",
   bn:"থিনিং বাইনারি ইমেজ থেকে বাছাই করা ফোরগ্রাউন্ড পিক্সেল সরায়, অনেকটা ইরোশন বা ওপেনিংয়ের মতো। এটি বিশেষ করে স্কেলেটনাইজেশনে কাজে লাগে, আর এজ ডিটেক্টরের আউটপুটে রেখাগুলোকে এক পিক্সেল মোটা করে পরিষ্কার করতে। B দিয়ে A-এর থিনিং হলো A বিয়োগ B দিয়ে A-এর হিট-অর-মিস ট্রান্সফর্ম। আটটি স্ট্রাকচারিং এলিমেন্টের একটি ক্রম ব্যবহার হয়, B1 থেকে B8, যেখানে X মানে যেকোনো মান।"},
 {scene:"run",k:0,fx:(svg,_)=>{const L=[[900,()=>{_.show(0);$$(svg,"#th-t").textContent="start: A";$$(svg,"#th-t2").textContent="borders handled by pixel replication"}]];
   _.T.forEach((t,i)=>L.push([1700,()=>{_.show(i+1);for(let a=0;a<3;a++)for(let b=0;b<3;b++){_.cur.set(a,b,t[a][b]);_.cur.cls(a,b,"b",t[a][b]==="1");_.cur.cls(a,b,"k",t[a][b]==="0")}
     const n=_.steps[i+1].ch.length;$$(svg,"#th-t").textContent=`B${i+1}`;$$(svg,"#th-t2").textContent=n?`${n} pixel${n>1?"s":""} removed (red)`:"no change"}]));return seq(L,true,3000)},
   en:"Apply B1 to the whole image: wherever the template matches completely, the centre pixel is set to 0. Then apply B2 to the result, then B3, and so on through B8. Borders are handled by pixel replication. The red pixels are the ones removed at each step. Repeating the whole cycle until nothing changes gives the thinned shape.",
   bn:"পুরো ইমেজে B1 প্রয়োগ করো: যেখানে টেমপ্লেট পুরোপুরি মিলে যায়, সেখানে মাঝের পিক্সেল ০ হয়। তারপর ফলাফলে B2, তারপর B3, এভাবে B8 পর্যন্ত। কিনারা সামলানো হয় পিক্সেল রেপ্লিকেশন দিয়ে। লাল পিক্সেলগুলো প্রতিটি ধাপে সরানো পিক্সেল। কিছু না বদলানো পর্যন্ত পুরো চক্রটি পুনরাবৃত্তি করলে থিন করা আকৃতি পাওয়া যায়।"},
 {scene:"thick",k:0,en:"Thickening is the dual of thinning. Thickening A by B is A union the hit-or-miss transform of A by B: when a template matches completely, the centre pixel becomes 1. It grows selected foreground regions, somewhat like dilation or closing, and can be used to find an approximate convex hull. Like thinning, it is applied to binary images and produces a binary image.",
   bn:"থিকেনিং হলো থিনিংয়ের দ্বৈত। B দিয়ে A-এর থিকেনিং হলো A ইউনিয়ন B দিয়ে A-এর হিট-অর-মিস ট্রান্সফর্ম: টেমপ্লেট পুরোপুরি মিললে মাঝের পিক্সেল ১ হয়। এটি বাছাই করা ফোরগ্রাউন্ড অঞ্চলকে বড় করে, অনেকটা ডাইলেশন বা ক্লোজিংয়ের মতো, এবং আনুমানিক কনভেক্স হাল খুঁজতে ব্যবহার করা যায়। থিনিংয়ের মতোই এটি বাইনারি ইমেজে প্রয়োগ হয় এবং বাইনারি ইমেজ দেয়।"}
],
points:[{en:"<b>Thinning A ⊗ B = A − (A ⊛ B)</b>, applied with B1…B8 in turn; used for skeletons.",bn:"<b>থিনিং A ⊗ B = A − (A ⊛ B)</b>, B1…B8 পরপর প্রয়োগ; স্কেলেটনে ব্যবহৃত।"},{en:"<b>Thickening A ⊙ B = A ∪ (A ⊛ B)</b>: the dual; grows regions (approximate convex hull).",bn:"<b>থিকেনিং A ⊙ B = A ∪ (A ⊛ B)</b>: দ্বৈত; অঞ্চল বড় করে (আনুমানিক কনভেক্স হাল)।"}]}
],
quiz:[
 {q:{en:"Erosion A ⊖ B keeps the points z where…",bn:"ইরোশন A ⊖ B সেই বিন্দু z রাখে যেখানে…"},o:[{en:"(B)z touches A",bn:"(B)z A-কে ছোঁয়"},{en:"(B)z is contained in A",bn:"(B)z পুরোপুরি A-এর ভেতরে"},{en:"(B)z is outside A",bn:"(B)z A-এর বাইরে"},{en:"B is reflected",bn:"B প্রতিফলিত"}],a:1,w:{en:"The SE must fit completely inside the object.",bn:"SE পুরোপুরি বস্তুর ভেতরে এঁটে যেতে হবে।"}},
 {q:{en:"Which operation bridges gaps in broken characters?",bn:"কোন অপারেশন ভাঙা অক্ষরের ফাঁক জোড়ে?"},o:[{en:"Erosion",bn:"ইরোশন"},{en:"Dilation",bn:"ডাইলেশন"},{en:"Thinning",bn:"থিনিং"},{en:"Boundary extraction",bn:"বাউন্ডারি এক্সট্র্যাকশন"}],a:1,w:{en:"Dilation grows objects and joins nearby pieces.",bn:"ডাইলেশন বস্তু বড় করে কাছের অংশ জোড়ে।"}},
 {q:{en:"Opening is…",bn:"ওপেনিং হলো…"},o:[{en:"dilation then erosion",bn:"ডাইলেশন তারপর ইরোশন"},{en:"erosion then dilation",bn:"ইরোশন তারপর ডাইলেশন"},{en:"two erosions",bn:"দুটি ইরোশন"},{en:"A − (A ⊖ B)",bn:"A − (A ⊖ B)"}],a:1,w:{en:"A ∘ B = (A ⊖ B) ⊕ B.",bn:"A ∘ B = (A ⊖ B) ⊕ B।"}},
 {q:{en:"Closing is mainly used to…",bn:"ক্লোজিং মূলত ব্যবহৃত হয়…"},o:[{en:"remove small objects",bn:"ছোট বস্তু সরাতে"},{en:"fill small holes and narrow breaks",bn:"ছোট গর্ত ও সরু ফাটল ভরাতে"},{en:"detect isolated points",bn:"বিচ্ছিন্ন বিন্দু খুঁজতে"},{en:"compress images",bn:"ইমেজ কমপ্রেস করতে"}],a:1,w:{en:"The SE rolls outside the boundary.",bn:"SE বাউন্ডারির বাইরে গড়ায়।"}},
 {q:{en:"The boundary of A is…",bn:"A-এর বাউন্ডারি হলো…"},o:[{en:"A ⊕ B",bn:"A ⊕ B"},{en:"A − (A ⊖ B)",bn:"A − (A ⊖ B)"},{en:"Aᶜ ∩ B",bn:"Aᶜ ∩ B"},{en:"(A ⊕ B) ⊖ B",bn:"(A ⊕ B) ⊖ B"}],a:1,w:{en:"Subtract the eroded set from A.",bn:"A থেকে ইরোড করা সেট বিয়োগ।"}},
 {q:{en:"Hit-or-miss uses B₂ to probe the…",bn:"হিট-অর-মিসে B₂ পরীক্ষা করে…"},o:[{en:"foreground",bn:"ফোরগ্রাউন্ড"},{en:"background",bn:"ব্যাকগ্রাউন্ড"},{en:"histogram",bn:"হিস্টোগ্রাম"},{en:"boundary only",bn:"শুধু বাউন্ডারি"}],a:1,w:{en:"A ⊛ B = (A ⊖ B₁) ∩ (Aᶜ ⊖ B₂).",bn:"A ⊛ B = (A ⊖ B₁) ∩ (Aᶜ ⊖ B₂)।"}},
 {q:{en:"Connected component extraction iterates…",bn:"কানেক্টেড কম্পোনেন্ট এক্সট্র্যাকশনে পুনরাবৃত্তি হয়…"},o:[{en:"X_k = (X_{k−1} ⊕ B) ∩ A",bn:"X_k = (X_{k−1} ⊕ B) ∩ A"},{en:"X_k = (X_{k−1} ⊕ B) ∩ Aᶜ",bn:"X_k = (X_{k−1} ⊕ B) ∩ Aᶜ"},{en:"X_k = X_{k−1} ⊖ B",bn:"X_k = X_{k−1} ⊖ B"},{en:"X_k = A − X_{k−1}",bn:"X_k = A − X_{k−1}"}],a:0,w:{en:"Intersecting with Aᶜ is hole filling instead.",bn:"Aᶜ-এর সাথে ইন্টারসেকশন হলো হোল ফিলিং।"}}
]});
})();
