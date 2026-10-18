/* ===== Lecture 10 · Spatial filtering ===== */
(()=>{
const SC=()=>gen("scene",128);
const sl=(id,lab,min,max,step,val)=>`<label>${lab} <input type="range" id="${id}" min="${min}" max="${max}" step="${step}" value="${val}"><output id="${id}o"></output></label>`;
const pad=(A)=>{const R=A.length,C=A[0].length;return Array.from({length:R+2},(_,r)=>Array.from({length:C+2},(_,c)=>A[Math.min(R-1,Math.max(0,r-1))][Math.min(C-1,Math.max(0,c-1))]))};
const apply3=(P,K,r,c)=>{let s=0;for(let i=0;i<3;i++)for(let j=0;j<3;j++)s+=K[i][j]*P[r+i][c+j];return s};
const sharp=(I,K,c)=>{const L=conv(I,K.flat());return mapI(I,(v,i)=>Math.max(0,Math.min(1,v+c*L.a[i])))};
lecture({id:"l10",no:"10",title:{en:"Spatial Filtering: Smoothing and Sharpening",bn:"স্পেশাল ফিল্টারিং: স্মুথিং ও শার্পেনিং"},book:{en:"Ch. 3 · Spatial Filtering",bn:"চ্যাপ্টার ৩ · স্পেশাল ফিল্টারিং"},
chapters:[
/* 1 */
{id:"mechanics",slides:"2–8",title:{en:"Mechanics of linear spatial filtering",bn:"লিনিয়ার স্পেশাল ফিল্টারিংয়ের কৌশল"},
svg:`<g id="mc-a"></g><g id="mc-k"></g><g id="mc-w"></g><g id="mc-o"></g><text id="mc-f" class="mono am sm" x="40" y="420"></text>
<text class="mono xs dim" x="40" y="44">g(x,y) = w(−1,−1)f(x−1,y−1) + w(−1,0)f(x−1,y) + … + w(0,0)f(x,y) + … + w(1,1)f(x+1,y+1)</text>`,
init(svg,_){const I=SC();const A=Array.from({length:6},(_,r)=>Array.from({length:6},(_,c)=>Math.round(I.a[(66+r*3)*128+20+c*3]*9)));_.A=A;
  _.M=mat($$(svg,"#mc-a"),{x:40,y:80,cs:46,data:A,label:"image f"});_.K=kbox($$(svg,"#mc-k"),_.M,3);
  const L=[["w(−1,−1)","w(−1,0)","w(−1,1)"],["w(0,−1)","w(0,0)","w(0,1)"],["w(1,−1)","w(1,0)","w(1,1)"]];_.W=mat($$(svg,"#mc-w"),{x:360,y:80,cs:58,fs:10,data:L,label:"kernel w (1/9 each)"});_.W.cls(1,1,"a");
  _.O=mat($$(svg,"#mc-o"),{x:580,y:120,cs:46,data:Array.from({length:4},()=>Array(4).fill("")),label:"output g"})},
steps:[
 {k:0,fx:(svg,_)=>{_.K.at(0,0);$$(svg,"#mc-f").textContent=""},en:"In spatial filtering we do not work on a single pixel. We take a neighbourhood around it, combine the neighbours, and put the result at the centre pixel. The name filter comes from the frequency domain, where filters pass or reject frequency components. A low-pass filter, for example, smooths by blurring, and the same can be done directly on the image with a spatial filter, also called a mask or kernel.",
   bn:"স্পেশাল ফিল্টারিংয়ে আমরা একটি পিক্সেল নিয়ে কাজ করি না। এর চারপাশের একটি নেইবারহুড নিয়ে প্রতিবেশীদের একত্র করে ফলাফল মাঝের পিক্সেলে বসাই। ফিল্টার নামটি এসেছে ফ্রিকোয়েন্সি ডোমেইন থেকে, যেখানে ফিল্টার কিছু ফ্রিকোয়েন্সি পার হতে দেয় বা আটকায়। যেমন লো-পাস ফিল্টার ঝাপসা করে মসৃণ করে, আর একই কাজ সরাসরি ইমেজে স্পেশাল ফিল্টার দিয়ে করা যায়, যাকে মাস্ক বা কার্নেলও বলে।"},
 {k:0,fx:(svg,_)=>{const Ls=[];for(let r=0;r<4;r++)for(let c=0;c<4;c++)Ls.push([650,()=>{_.K.at(r,c);let s=0;const t=[];for(let i=0;i<3;i++)for(let j=0;j<3;j++){s+=_.A[r+i][c+j];t.push(_.A[r+i][c+j])}_.O.set(r,c,(s/9).toFixed(1));_.O.clear("a");_.O.cls(r,c,"a");$$(svg,"#mc-f").textContent=`(${t.join("+")}) / 9 = ${(s/9).toFixed(2)}`}]);
   Ls.reset=()=>{for(let r=0;r<4;r++)for(let c=0;c<4;c++)_.O.set(r,c,"");_.O.clear("a")};return seq(Ls,true,2500)},
   en:"A linear spatial filter computes a sum of products. The centre coefficient w of 0, 0 sits on the pixel at x, y. Each kernel coefficient is multiplied by the pixel under it, the products are added, and the sum becomes g of x y. Then the kernel moves to the next pixel, and the process repeats across the whole image.",
   bn:"লিনিয়ার স্পেশাল ফিল্টার গুণফলের যোগফল হিসাব করে। কার্নেলের মাঝের সহগ w(০, ০) বসে x, y পিক্সেলের উপর। প্রতিটি সহগ তার নিচের পিক্সেলের সাথে গুণ হয়, গুণফলগুলো যোগ হয়, আর যোগফলটি হয় g(x, y)। তারপর কার্নেল পরের পিক্সেলে সরে যায়, এবং পুরো ইমেজ জুড়ে একই কাজ চলে।"}
],
points:[{en:"Kernel (mask, filter) centre w(0,0) aligned with f(x,y); output = <b>sum of products</b>; then move to the next pixel.",bn:"কার্নেলের (মাস্ক, ফিল্টার) কেন্দ্র w(০,০) f(x,y)-এর উপর; আউটপুট = <b>গুণফলের যোগফল</b>; তারপর পরের পিক্সেলে।"},{en:"If the operation on the neighbourhood is linear → linear spatial filtering.",bn:"নেইবারহুডের অপারেশন রৈখিক হলে → লিনিয়ার স্পেশাল ফিল্টারিং।"}]},
/* 2 */
{id:"corrconv",slides:"9–15",title:{en:"Correlation and convolution",bn:"কোরিলেশন ও কনভোলিউশন"},
svg:`<text class="h" x="40" y="50">1-D EXAMPLE · f IS AN IMPULSE</text><g id="cc-f"></g><g id="cc-w"></g><g id="cc-o"></g><text id="cc-t" class="lg am" x="40" y="110"></text><text id="cc-n" class="sm dim" x="40" y="420"></text>`,
init(svg,_){const f=[0,0,0,0,1,0,0,0,0],w=[1,2,4,2,8];_.f=f;_.w=w;_.F=mat($$(svg,"#cc-f"),{x:130,y:180,cs:52,data:[f],label:"f (zero padded)"});
  _.Wg=el($$(svg,"#cc-w"),"g");_.Wm=mat(_.Wg,{x:130,y:260,cs:52,data:[w]});_.O=mat($$(svg,"#cc-o"),{x:234,y:350,cs:52,data:[Array(5).fill("")],label:"output"});
  _.run=(svg,ker,name)=>{for(let i=0;i<5;i++)_.Wm.set(0,i,ker[i]);$$(svg,"#cc-t").textContent=name;const L=[];for(let s=0;s<5;s++)L.push([800,()=>{_.Wg.setAttribute("transform",`translate(${s*52},0)`);let v=0;for(let i=0;i<5;i++)v+=ker[i]*f[s+i];_.O.set(0,s,v);_.O.clear("a");_.O.cls(0,s,"a")}]);
    L.reset=()=>{for(let i=0;i<5;i++)_.O.set(0,i,"");_.O.clear("a");_.Wg.setAttribute("transform","")};return seq(L,true,2200)}},
steps:[
 {k:0,fx:(svg,_)=>{$$(svg,"#cc-n").textContent="result: w reversed (8 2 4 2 1)";return _.run(svg,_.w,"Correlation")},en:"Correlation moves the kernel over the image and computes the sum of products at each location. When f is a single impulse, correlation gives a copy of the kernel, but reversed: 8, 2, 4, 2, 1.",
   bn:"কোরিলেশনে কার্নেলকে ইমেজের উপর সরিয়ে প্রতিটি জায়গায় গুণফলের যোগফল হিসাব করা হয়। f যখন একটি মাত্র ইমপালস, কোরিলেশন কার্নেলের একটি কপি দেয়, কিন্তু উল্টো: ৮, ২, ৪, ২, ১।"},
 {k:0,fx:(svg,_)=>{$$(svg,"#cc-n").textContent="result: an exact copy of w (1 2 4 2 8)";return _.run(svg,_.w.slice().reverse(),"Convolution: rotate w by 180° first")},en:"Convolution is the same process, except the kernel is first rotated by 180 degrees. Now the impulse produces an exact copy of the kernel. In two dimensions, rotating by 180 degrees means flipping the kernel both horizontally and vertically. For symmetric kernels, correlation and convolution give the same result.",
   bn:"কনভোলিউশনও একই প্রক্রিয়া, শুধু আগে কার্নেলকে ১৮০ ডিগ্রি ঘুরিয়ে নেওয়া হয়। এখন ইমপালস থেকে কার্নেলের হুবহু কপি পাওয়া যায়। দ্বিমাত্রায় ১৮০ ডিগ্রি ঘোরানো মানে কার্নেলকে আনুভূমিক ও উল্লম্ব দুই দিকেই উল্টানো। প্রতিসম কার্নেলে কোরিলেশন ও কনভোলিউশন একই ফল দেয়।"}
],
points:[{en:"<b>Correlation</b>: slide the kernel, sum of products. <b>Convolution</b>: same, after rotating the kernel by 180°.",bn:"<b>কোরিলেশন</b>: কার্নেল সরাও, গুণফলের যোগফল। <b>কনভোলিউশন</b>: একই, কার্নেল ১৮০° ঘুরিয়ে।"},{en:"Impulse in → correlation gives w reversed; convolution gives w.",bn:"ইমপালস ইনপুট → কোরিলেশন দেয় উল্টো w; কনভোলিউশন দেয় w।"}]},
/* 3 */
{id:"smoothing",slides:"16–26",title:{en:"Linear smoothing filters",bn:"লিনিয়ার স্মুথিং ফিল্টার"},
svg:`<g data-scene="tree"><g data-s="0" id="sf-t"></g></g>
<g data-scene="box"><g data-s="0"><g id="sb-k"></g><g id="sb-k2"></g><g id="sb-e"></g><text class="mono am" x="470" y="380">1/9 (1+5+7+2+4+8+3+6+9) = 45/9 = 5</text></g></g>
<g data-scene="demo"><g data-s="0"><g id="sd-i"></g></g></g>
<g data-scene="hub"><g data-s="0"><g id="sh-i"></g></g></g>`,
init(svg,_){const t=$$(svg,"#sf-t");const N=(x,y,s,c)=>{el(t,"rect",{x:x-80,y:y-22,width:160,height:44,rx:10,class:c||"box"});txt(t,x,y+5,s,"c sm")};
  [[220,150],[580,150]].forEach(([x,y])=>el(t,"line",{x1:400,y1:72,x2:x,y2:y-22,class:"link"}));[[120,260,220],[320,260,220],[480,260,580],[680,260,580]].forEach(([x,y,p])=>el(t,"line",{x1:p,y1:172,x2:x,y2:y-22,class:"link"}));
  N(400,50,"Spatial filter","boxa");N(220,150,"Smoothing","boxb");N(580,150,"Sharpening","boxb");N(120,260,"Linear");N(320,260,"Non-linear");N(480,260,"2nd derivative");N(680,260,"1st derivative");
  txt(t,120,310,"box, weighted average","c dim xs");txt(t,320,310,"median, min, max","c dim xs");txt(t,480,310,"Laplacian, unsharp","c dim xs");txt(t,680,310,"gradient (Sobel)","c dim xs");
  mat($$(svg,"#sb-k"),{x:60,y:110,cs:52,data:[[1,1,1],[1,1,1],[1,1,1]],label:"box: 1/9 ×"});mat($$(svg,"#sb-k2"),{x:260,y:110,cs:52,data:[[1,2,1],[2,4,2],[1,2,1]],label:"weighted: 1/16 ×"});
  const e=mat($$(svg,"#sb-e"),{x:520,y:110,cs:52,data:[[1,5,7],[2,4,8],[3,6,9]],label:"image"});e.cls(1,1,"d");
  txt($$(svg,"#sb-e"),60,320,"weighted average: bigger weight near the centre → less blurring","sm dim");
  const I=SC();[[3,"3 × 3"],[11,"11 × 11"],[21,"21 × 21"]].forEach(([n,l],i)=>img2($$(svg,"#sd-i"),30+(i+1)*190,90,170,170,l).show(boxBlur(I,n)));img2($$(svg,"#sd-i"),30,90,170,170,"original").show(I);
  const r=rng(4);const H=mk(128,128,(x,y)=>{let v=.03;[[.3,.35,.08],[.7,.6,.11],[.45,.75,.06]].forEach(([a,b,s])=>v+=.9*Math.exp(-((x-a)**2+(y-b)**2)/(2*s*s)));return v});for(let i=0;i<260;i++){const x=r()*128|0,y=r()*128|0;H.a[y*128+x]=.6+r()*.4}
  const Hb=boxBlur(H,9);img2($$(svg,"#sh-i"),30,90,220,220,"image with many small stars").show(H);img2($$(svg,"#sh-i"),290,90,220,220,"averaged (large mask)").show(Hb);img2($$(svg,"#sh-i"),550,90,220,220,"thresholded").show(mapI(Hb,v=>v>.3?1:0))},
steps:[
 {scene:"tree",k:0,en:"Spatial filters fall into two groups: smoothing and sharpening. Smoothing filters can be linear, like the box and weighted average filters, or non-linear, like median, min and max. Sharpening uses derivatives.",
   bn:"স্পেশাল ফিল্টার দুই দলে ভাগ: স্মুথিং ও শার্পেনিং। স্মুথিং ফিল্টার লিনিয়ার হতে পারে, যেমন বক্স ও ওয়েটেড অ্যাভারেজ ফিল্টার, অথবা নন-লিনিয়ার, যেমন মিডিয়ান, মিন ও ম্যাক্স। শার্পেনিংয়ে ডেরিভেটিভ ব্যবহৃত হয়।"},
 {scene:"box",k:0,en:"Smoothing, or averaging, filters reduce sharp transitions in intensity. Since random noise consists of sharp transitions, the main use is noise reduction. They are also called low-pass filters. The standard average, or box, filter replaces each pixel by the average of its 3 by 3 neighbours. For this example, the sum is 45, and 45 over 9 is 5. The weighted average filter gives more weight to the centre to reduce blurring.",
   bn:"স্মুথিং বা অ্যাভারেজিং ফিল্টার তীব্রতার আকস্মিক পরিবর্তন কমায়। এলোমেলো নয়েজ যেহেতু আকস্মিক পরিবর্তন দিয়ে তৈরি, তাই এর প্রধান ব্যবহার নয়েজ কমানো। এদের লো-পাস ফিল্টারও বলে। স্ট্যান্ডার্ড অ্যাভারেজ বা বক্স ফিল্টার প্রতিটি পিক্সেলকে তার ৩ বাই ৩ প্রতিবেশীর গড় দিয়ে বদলায়। এই উদাহরণে যোগফল ৪৫, আর ৪৫ ভাগ ৯ হলো ৫। ওয়েটেড অ্যাভারেজ ফিল্টার ঝাপসা কমাতে মাঝের পিক্সেলকে বেশি ওজন দেয়।"},
 {scene:"demo",k:0,en:"The drawback of averaging is that it blurs edges. Larger kernels, like 11 by 11 and 21 by 21, blur more and more.",
   bn:"অ্যাভারেজিংয়ের অসুবিধা হলো এটি কিনারা ঝাপসা করে। বড় কার্নেল, যেমন ১১ বাই ১১ ও ২১ বাই ২১, আরও বেশি ঝাপসা করে।"},
 {scene:"hub",k:0,en:"Blurring can be useful. To extract large objects, average with a large mask so small objects blend into the background, then threshold. This is how the brightest large objects are picked out of a Hubble telescope image. Smoothing also removes small objects and bridges small gaps in lines and curves.",
   bn:"ঝাপসা করাও কাজে লাগতে পারে। বড় বস্তু আলাদা করতে বড় মাস্ক দিয়ে গড় নিলে ছোট বস্তুগুলো ব্যাকগ্রাউন্ডে মিশে যায়, তারপর থ্রেশহোল্ড করা হয়। এভাবেই হাবল টেলিস্কোপের ছবি থেকে সবচেয়ে উজ্জ্বল বড় বস্তুগুলো আলাদা করা হয়। স্মুথিং ছোট বস্তু দূর করে এবং রেখা ও বক্ররেখার ছোট ফাঁকও জোড়া লাগায়।"}
],
points:[{en:"Smoothing (averaging, low-pass): noise reduction, blurring, removing small objects, bridging gaps.",bn:"স্মুথিং (অ্যাভারেজিং, লো-পাস): নয়েজ কমানো, ঝাপসা করা, ছোট বস্তু সরানো, ফাঁক জোড়া।"},{en:"Box filter: 1/9 of all ones; example average = 45/9 = 5. Weighted average: the standard 3 × 3 kernel is 1/16 [1 2 1; 2 4 2; 1 2 1].",bn:"বক্স ফিল্টার: সব ১, ভাগ ৯; উদাহরণের গড় = ৪৫/৯ = ৫। ওয়েটেড অ্যাভারেজ: আদর্শ ৩ × ৩ কার্নেল ১/১৬ [১ ২ ১; ২ ৪ ২; ১ ২ ১]।"}]},
/* 4 */
{id:"nonlinear",slides:"27–29",title:{en:"Non-linear filters: median, min, max",bn:"নন-লিনিয়ার ফিল্টার: মিডিয়ান, মিন, ম্যাক্স"},
svg:`<g data-scene="sp"><g data-s="0"><g id="nl-i"></g></g></g>
<g data-scene="ex"><g data-s="0"><g id="nl-m"></g><g id="nl-s"></g><text id="nl-r" class="mono" x="430" y="300"></text><text id="nl-r2" class="mono" x="430" y="330"></text><text id="nl-r3" class="mono" x="430" y="360"></text><text id="nl-r4" class="mono" x="430" y="390"></text></g></g>`,
init(svg,_){const B=gen("board",128),N=noiseSP(B,.2);const g=$$(svg,"#nl-i");img2(g,30,90,220,220,"salt and pepper noise").show(N);img2(g,290,90,220,220,"3 × 3 average").show(boxBlur(N,3));img2(g,550,90,220,220,"3 × 3 median").show(rankF(N,1,"med"));
  const D=[[1,8,8,0,7],[4,7,9,5,7],[5,4,6,8,6],[4,2,0,1,5],[0,1,0,2,0]];_.D=D;_.M=mat($$(svg,"#nl-m"),{x:40,y:90,cs:56,data:D,label:"centre pixel: 6"});_.M.cls(2,2,"d");for(let r=1;r<4;r++)for(let c=1;c<4;c++)if(r!==2||c!==2)_.M.cls(r,c,"on");
  _.S=mat($$(svg,"#nl-s"),{x:430,y:120,cs:36,data:[Array(9).fill("")],label:"neighbourhood values"})},
steps:[
 {scene:"sp",k:0,en:"Non-linear smoothing filters are based on ordering the pixels in the neighbourhood. They are mainly used for impulse, or salt and pepper, noise. The median filter replaces each pixel by the median of its neighbours. Averaging smears the noise dots, but the median removes them almost completely.",
   bn:"নন-লিনিয়ার স্মুথিং ফিল্টার নেইবারহুডের পিক্সেলগুলো সাজানোর উপর ভিত্তি করে কাজ করে। এগুলো প্রধানত ইমপালস বা সল্ট অ্যান্ড পেপার নয়েজের জন্য ব্যবহৃত হয়। মিডিয়ান ফিল্টার প্রতিটি পিক্সেলকে তার প্রতিবেশীদের মিডিয়ান দিয়ে বদলায়। অ্যাভারেজিং নয়েজের বিন্দুগুলো ছড়িয়ে দেয়, কিন্তু মিডিয়ান এগুলো প্রায় পুরোপুরি দূর করে।"},
 {scene:"ex",k:0,fx:(svg,_)=>{const v=[];for(let r=1;r<4;r++)for(let c=1;c<4;c++)v.push(_.D[r][c]);const s=v.slice().sort((a,b)=>a-b);const W=[[1,2,1],[2,4,2],[1,2,1]];let ws=0;for(let r=0;r<3;r++)for(let c=0;c<3;c++)ws+=W[r][c]*_.D[r+1][c+1];
   ["#nl-r","#nl-r2","#nl-r3","#nl-r4"].forEach(q=>$$(svg,q).textContent="");
   return seq([[200,()=>v.forEach((x,i)=>{_.S.set(0,i,x);_.S.clear("a")})],[1400,()=>{s.forEach((x,i)=>_.S.set(0,i,x));_.S.cls(0,4,"a")}],
     [900,()=>$$(svg,"#nl-r").textContent=`mean = ${v.reduce((a,b)=>a+b,0)}/9 = ${(v.reduce((a,b)=>a+b,0)/9).toFixed(2)} ≈ ${Math.round(v.reduce((a,b)=>a+b,0)/9)}`],
     [900,()=>$$(svg,"#nl-r2").textContent=`weighted (1/16) = ${ws}/16 = ${(ws/16).toFixed(2)} ≈ ${Math.round(ws/16)}`],
     [900,()=>$$(svg,"#nl-r3").textContent=`median = ${s[4]}`],[900,()=>$$(svg,"#nl-r4").textContent=`max = ${s[8]}   min = ${s[0]}`]],true,3000)},
   en:"Let's compute all five for the centre pixel, 6. Its 3 by 3 neighbourhood holds 7, 9, 5, 4, 6, 8, 2, 0 and 1. The mean is 42 over 9, about 4.67, which rounds to 5. The weighted average is 81 over 16, about 5. Sorting the values, the middle one, the median, is 5. The max is 9 and the min is 0. Max filters find the brightest points, and min filters find the darkest.",
   bn:"চলো মাঝের পিক্সেল ৬-এর জন্য পাঁচটিই হিসাব করি। এর ৩ বাই ৩ নেইবারহুডে আছে ৭, ৯, ৫, ৪, ৬, ৮, ২, ০ ও ১। গড় হলো ৪২ ভাগ ৯, প্রায় ৪.৬৭, রাউন্ড করে ৫। ওয়েটেড অ্যাভারেজ ৮১ ভাগ ১৬, প্রায় ৫। মানগুলো সাজালে মাঝেরটি, অর্থাৎ মিডিয়ান, হলো ৫। ম্যাক্স ৯ আর মিন ০। ম্যাক্স ফিল্টার সবচেয়ে উজ্জ্বল বিন্দু খোঁজে, আর মিন ফিল্টার সবচেয়ে অন্ধকার।"}
],
points:[{en:"Median, min, max: order-statistic filters; median is best for <b>salt and pepper</b> noise.",bn:"মিডিয়ান, মিন, ম্যাক্স: অর্ডার-স্ট্যাটিস্টিক ফিল্টার; <b>সল্ট অ্যান্ড পেপার</b> নয়েজে মিডিয়ান সেরা।"},{en:"Example (centre 6): mean ≈ 5, weighted ≈ 5, median = 5, max = 9, min = 0.",bn:"উদাহরণ (কেন্দ্র ৬): গড় ≈ ৫, ওয়েটেড ≈ ৫, মিডিয়ান = ৫, ম্যাক্স = ৯, মিন = ০।"}]},
/* 5 */
{id:"derivatives",slides:"30–36",title:{en:"Sharpening foundations: first and second derivatives",bn:"শার্পেনিংয়ের ভিত্তি: প্রথম ও দ্বিতীয় ডেরিভেটিভ"},
svg:`<g id="dv-g"></g>`,
init(svg,_){const f=[5,5,4,3,2,1,0,0,0,6,0,0,0,0,1,3,1,0,0,0,0,7,7,7,7];const n=f.length,cw=29;const d1=f.map((v,i)=>i<n-1?f[i+1]-v:null),d2=f.map((v,i)=>i>0&&i<n-1?f[i+1]+f[i-1]-2*v:null);
  const g=$$(svg,"#dv-g");const row=(arr,y,h,cls,name,sc)=>{const q=el(g,"g",{style:"transition:opacity .5s"});txt(q,20,y+4,name,"sm mono");el(q,"line",{x1:110,x2:110+n*cw,y1:y,y2:y,class:"axis"});
    arr.forEach((v,i)=>{if(v==null)return;const hh=v*sc;el(q,"rect",{x:110+i*cw+5,y:hh>0?y-hh:y,width:cw-10,height:Math.abs(hh)||1.5,class:cls});txt(q,110+i*cw+cw/2,y+(v>=0?16:-Math.abs(hh)-6)+(v>=0?0:0),String(v),"c xs mono")});return q};
  _.r0=row(f,150,0,"hbar","f(x)",12);_.r1=row(d1,268,0,"hbar2","∂f/∂x",6);_.r2=row(d2,388,0,"hbar","∂²f/∂x²",4);
  [["ramp",2,5],["point",9,9],["line",14,16],["step",20,22]].forEach(([t,a,b])=>{el(g,"rect",{x:110+a*cw,y:16,width:(b-a+1)*cw,height:20,rx:4,style:"fill:none;stroke:#7D8FA6;stroke-dasharray:3 3"});txt(g,110+(a+b+1)/2*cw,31,t,"c xs")})},
steps:[
 {k:0,fx:(svg,_)=>{_.r1.style.opacity=.1;_.r2.style.opacity=.1},en:"Smoothing averages pixels, which is like integration. So sharpening can be done by differentiation. A derivative responds strongly to intensity discontinuities, such as edges and noise, and weakly to slowly varying areas. Here is a scan line containing a ramp, an isolated point, a thin line and a step.",
   bn:"স্মুথিং পিক্সেলের গড় নেয়, যা ইন্টিগ্রেশনের মতো। তাই শার্পেনিং করা যায় ডিফারেনশিয়েশন দিয়ে। ডেরিভেটিভ তীব্রতার আকস্মিক পরিবর্তনে, যেমন কিনারা ও নয়েজে জোরালো সাড়া দেয়, আর ধীরে বদলানো অঞ্চলে দুর্বল সাড়া দেয়। এখানে একটি স্ক্যান লাইন আছে, যাতে একটি র‍্যাম্প, একটি একক বিন্দু, একটি সরু রেখা ও একটি ধাপ রয়েছে।"},
 {k:0,fx:(svg,_)=>{_.r1.style.opacity=1;_.r2.style.opacity=.1},en:"The first derivative uses a look-ahead difference: f of x plus 1 minus f of x. It must be zero in constant areas, nonzero at the onset of a step or ramp, and nonzero along ramps. Notice the long run of minus ones along the ramp.",
   bn:"প্রথম ডেরিভেটিভ সামনের পার্থক্য ব্যবহার করে: f(x যোগ ১) বিয়োগ f(x)। সমান অঞ্চলে এটি অবশ্যই শূন্য, ধাপ বা র‍্যাম্পের শুরুতে অশূন্য, এবং র‍্যাম্প বরাবর অশূন্য। দেখো, র‍্যাম্প বরাবর একটানা বিয়োগ এক।"},
 {k:0,fx:(svg,_)=>{_.r1.style.opacity=1;_.r2.style.opacity=1},en:"The second derivative is f of x plus 1, plus f of x minus 1, minus 2 f of x. It is zero in constant areas, nonzero at the onset and end of steps and ramps, and zero along ramps. At the step it gives a positive and a negative value: the line joining them crosses zero midway, a zero crossing, useful for locating edges. Because edges are usually ramps, the second derivative enhances fine detail much better than the first.",
   bn:"দ্বিতীয় ডেরিভেটিভ হলো f(x যোগ ১) যোগ f(x বিয়োগ ১) বিয়োগ ২ f(x)। সমান অঞ্চলে এটি শূন্য, ধাপ ও র‍্যাম্পের শুরু ও শেষে অশূন্য, আর র‍্যাম্প বরাবর শূন্য। ধাপে এটি একটি ধনাত্মক ও একটি ঋণাত্মক মান দেয়: এদের সংযোগকারী রেখা মাঝখানে শূন্য ছেদ করে, একে বলে জিরো ক্রসিং, যা কিনারা খুঁজতে কাজে লাগে। কিনারা সাধারণত র‍্যাম্পের মতো হয়, তাই দ্বিতীয় ডেরিভেটিভ সূক্ষ্ম খুঁটিনাটি প্রথমটির চেয়ে অনেক ভালোভাবে স্পষ্ট করে।"}
],
points:[{en:"∂f/∂x = f(x+1) − f(x): zero in flat areas, nonzero at onset of steps/ramps and <b>along ramps</b>.",bn:"∂f/∂x = f(x+১) − f(x): সমান অঞ্চলে শূন্য, ধাপ/র‍্যাম্পের শুরুতে ও <b>র‍্যাম্প বরাবর</b> অশূন্য।"},{en:"∂²f/∂x² = f(x+1) + f(x−1) − 2f(x): zero along ramps; <b>zero crossing</b> at steps; better for fine detail.",bn:"∂²f/∂x² = f(x+১) + f(x−১) − ২f(x): র‍্যাম্প বরাবর শূন্য; ধাপে <b>জিরো ক্রসিং</b>; সূক্ষ্ম খুঁটিনাটিতে ভালো।"}]},
/* 6 */
{id:"laplacian",slides:"37–45",title:{en:"The Laplacian",bn:"ল্যাপ্লাসিয়ান"},
svg:`<g data-scene="mk"><g data-s="0"><text class="mono am" x="40" y="50">∇²f = f(x+1,y) + f(x−1,y) + f(x,y+1) + f(x,y−1) − 4f(x,y)</text><g id="lp-k"></g>
  <text class="mono sm" x="40" y="400">g(x,y) = f(x,y) + c·∇²f(x,y)    c = −1 if the centre is negative, +1 if positive</text></g></g>
<g data-scene="ex"><g data-s="0"><g id="lp-p"></g><g id="lp-b"></g><g id="lp-l"></g><g id="lp-g"></g><text id="lp-f" class="mono am sm" x="40" y="420"></text></g></g>
<g data-scene="im"><g data-s="0"><g id="lp-i"></g></g></g>`,
init(svg,_){const K=[[[0,1,0],[1,-4,1],[0,1,0]],[[0,-1,0],[-1,4,-1],[0,-1,0]],[[1,1,1],[1,-8,1],[1,1,1]],[[-1,-1,-1],[-1,8,-1],[-1,-1,-1]]];
  K.forEach((k,i)=>mat($$(svg,"#lp-k"),{x:40+i*190,y:110,cs:50,data:k,label:i<2?"4-neighbour":"with diagonals"}));txt($$(svg,"#lp-k"),400,320,"coefficients of every Laplacian mask sum to 0","c dim");
  const F=[[50,60,90,100],[50,60,90,100],[50,60,90,100],[50,60,90,100]];_.P=pad(F);_.Pm=mat($$(svg,"#lp-p"),{x:30,y:70,cs:40,fs:12,data:_.P,label:"pixel replication"});_.Kb=kbox($$(svg,"#lp-b"),_.Pm,3);
  _.L=mat($$(svg,"#lp-l"),{x:330,y:110,cs:44,fs:13,data:F.map(r=>r.map(()=>"")),label:"Laplacian (centre +4)"});_.G=mat($$(svg,"#lp-g"),{x:560,y:110,cs:44,fs:13,data:F.map(r=>r.map(()=>"")),label:"sharpened f + ∇²"});
  const I=boxBlur(SC(),3);img2($$(svg,"#lp-i"),30,90,220,220,"slightly blurred").show(I);img2($$(svg,"#lp-i"),290,90,220,220,"sharpened, 4-neighbour").show(sharp(I,[[0,-1,0],[-1,4,-1],[0,-1,0]],1));img2($$(svg,"#lp-i"),550,90,220,220,"sharpened, with diagonals").show(sharp(I,[[-1,-1,-1],[-1,8,-1],[-1,-1,-1]],1))},
steps:[
 {scene:"mk",k:0,en:"The Laplacian is the simplest isotropic second derivative operator. In discrete form it adds the four neighbours and subtracts 4 times the centre. Masks can include the diagonals too, with minus 8 at the centre, and the signs can be reversed. The coefficients of every Laplacian mask sum to zero. To sharpen, add the Laplacian image to the original, with c equal to minus 1 when the centre coefficient is negative.",
   bn:"ল্যাপ্লাসিয়ান হলো সবচেয়ে সরল আইসোট্রপিক দ্বিতীয় ডেরিভেটিভ অপারেটর। বিচ্ছিন্ন রূপে এটি চারটি প্রতিবেশী যোগ করে মাঝের পিক্সেলের ৪ গুণ বিয়োগ করে। মাস্কে কোণাকুণি প্রতিবেশীও থাকতে পারে, তখন মাঝে বিয়োগ ৮, এবং চিহ্নগুলো উল্টেও নেওয়া যায়। প্রতিটি ল্যাপ্লাসিয়ান মাস্কের সহগের যোগফল শূন্য। শার্পেন করতে ল্যাপ্লাসিয়ান ইমেজ মূল ইমেজের সাথে যোগ করা হয়, মাঝের সহগ ঋণাত্মক হলে c সমান বিয়োগ ১।"},
 {scene:"ex",k:0,fx:(svg,_)=>{const K=[[0,-1,0],[-1,4,-1],[0,-1,0]];const Ls=[];for(let r=0;r<4;r++)for(let c=0;c<4;c++)Ls.push([420,()=>{_.Kb.at(r,c);const l=apply3(_.P,K,r,c);_.L.set(r,c,l);_.G.set(r,c,_.P[r+1][c+1]+l);_.G.clear("a");_.G.cls(r,c,"a");$$(svg,"#lp-f").textContent=`4×${_.P[r+1][c+1]} − (${_.P[r][c+1]}+${_.P[r+2][c+1]}+${_.P[r+1][c]}+${_.P[r+1][c+2]}) = ${l};  g = ${_.P[r+1][c+1]} + ${l} = ${_.P[r+1][c+1]+l}`}]);
   Ls.reset=()=>{for(let r=0;r<4;r++)for(let c=0;c<4;c++){_.L.set(r,c,"");_.G.set(r,c,"")}_.G.clear("a")};return seq(Ls,true,3000)},
   en:"Worked example: apply the mask with plus 4 at the centre to a blurred edge, 50, 60, 90, 100, using pixel replication at the border. The Laplacian is minus 10, minus 20, 20 and 10. Adding it to the original gives 40, 40, 110, 110. The contrast rises from 100 minus 50, which is 50, to 110 minus 40, which is 70. The edge is sharper.",
   bn:"উদাহরণ: একটি ঝাপসা কিনারা ৫০, ৬০, ৯০, ১০০-এ মাঝে যোগ ৪ থাকা মাস্কটি প্রয়োগ করো, কিনারায় পিক্সেল রেপ্লিকেশন ব্যবহার করে। ল্যাপ্লাসিয়ান হয় বিয়োগ ১০, বিয়োগ ২০, ২০ ও ১০। মূল ইমেজের সাথে যোগ করলে পাওয়া যায় ৪০, ৪০, ১১০, ১১০। কনট্রাস্ট ১০০ বিয়োগ ৫০, অর্থাৎ ৫০ থেকে বেড়ে ১১০ বিয়োগ ৪০, অর্থাৎ ৭০ হয়। কিনারা আরও তীক্ষ্ণ হয়েছে।"},
 {scene:"im",k:0,en:"On a real image, the Laplacian highlights edges and fine detail. The mask that also uses the diagonal directions gives a noticeably sharper result, because it adds differentiation in those directions too.",
   bn:"বাস্তব ইমেজে ল্যাপ্লাসিয়ান কিনারা ও সূক্ষ্ম খুঁটিনাটি স্পষ্ট করে। যে মাস্ক কোণাকুণি দিকও ব্যবহার করে তা লক্ষণীয়ভাবে বেশি তীক্ষ্ণ ফল দেয়, কারণ সেই দিকেও ডিফারেনশিয়েশন যোগ হয়।"}
],
points:[{en:"Laplacian masks: [0 1 0; 1 −4 1; 0 1 0], with diagonals −8; signs may be reversed; coefficients sum to 0.",bn:"ল্যাপ্লাসিয়ান মাস্ক: [০ ১ ০; ১ −৪ ১; ০ ১ ০], কোণাকুণিসহ −৮; চিহ্ন উল্টানো যায়; যোগফল ০।"},{en:"Example: 50 60 90 100 → Laplacian −10 −20 20 10 → sharpened 40 40 110 110; contrast 50 → 70.",bn:"উদাহরণ: ৫০ ৬০ ৯০ ১০০ → ল্যাপ্লাসিয়ান −১০ −২০ ২০ ১০ → শার্প ৪০ ৪০ ১১০ ১১০; কনট্রাস্ট ৫০ → ৭০।"}]},
/* 7 */
{id:"unsharp",slides:"46–49",title:{en:"Unsharp masking and high-boost filtering",bn:"আনশার্প মাস্কিং ও হাই-বুস্ট ফিল্টারিং"},
svg:`<g data-scene="st"><g data-s="0"><text class="h" x="40" y="50">THREE STEPS</text><text class="mono lg" x="40" y="110">1 · blur:          f̄(x,y)</text><text class="mono lg" x="40" y="160">2 · mask:   g_mask = f − f̄</text><text class="mono lg am" x="40" y="210">3 · add:    g = f + k · g_mask</text>
  <text class="sm" x="40" y="280">k = 1 → unsharp masking</text><text class="sm" x="40" y="310">k &gt; 1 → high-boost filtering</text><g id="us-row"></g></g></g>
<g data-scene="im"><g data-s="0"><g id="us-i"></g></g></g>`,
init(svg,_){const f=[50,60,90,100],b=[53,67,83,97],m=[-3,-7,7,3];const g=$$(svg,"#us-row");
  [["f",f],["f̄ (1/9 box)",b],["mask",m],["k = 1",f.map((v,i)=>v+m[i])],["k = 3",f.map((v,i)=>v+3*m[i])]].forEach(([n,a],r)=>{txt(g,430,95+r*56,n,"mono sm");mat(g,{x:560,y:72+r*56,cs:44,fs:13,data:[a]})});
  const I=boxBlur(SC(),3),B=boxBlur(I,5);_.I=I;_.B=B;const q=$$(svg,"#us-i");img2(q,30,90,220,220,"original (soft)").show(I);img2(q,290,90,220,220,"mask f − f̄ (scaled)").show({w:128,h:128,a:I.a.map((v,i)=>v-B.a[i])},1);_.o=img2(q,550,90,220,220,"k = 1");_.o.show(mapI(I,(v,i)=>v+(v-B.a[i])))},
steps:[
 {scene:"st",k:0,en:"Unsharp masking, a technique long used in printing, sharpens in three steps. Blur the original. Subtract the blurred image from the original to get the mask. Then add the mask back, multiplied by k. With k equal to 1 it is unsharp masking. With k greater than 1 it is high-boost filtering. In the example, the blurred row is 53, 67, 83, 97, the mask is minus 3, minus 7, 7, 3, and k equal to 1 gives 47, 53, 97, 103.",
   bn:"আনশার্প মাস্কিং, যা ছাপাখানায় বহুদিন ধরে ব্যবহৃত, তিন ধাপে শার্পেন করে। মূল ইমেজকে ঝাপসা করো। মূল ইমেজ থেকে ঝাপসা ইমেজ বিয়োগ করে মাস্ক পাও। তারপর মাস্ককে k দিয়ে গুণ করে আবার যোগ করো। k সমান ১ হলে আনশার্প মাস্কিং। k ১-এর বেশি হলে হাই-বুস্ট ফিল্টারিং। উদাহরণে ঝাপসা সারি ৫৩, ৬৭, ৮৩, ৯৭, মাস্ক বিয়োগ ৩, বিয়োগ ৭, ৭, ৩, আর k সমান ১ দিলে পাওয়া যায় ৪৭, ৫৩, ৯৭, ১০৩।"},
 {scene:"im",k:0,fx:(svg,_)=>{const K=[1,2,3];let i=0;return every(1500,()=>{const k=K[i%3];_.o.show(mapI(_.I,(v,j)=>v+k*(v-_.B.a[j])));_.o.lb.textContent=k===1?"k = 1 · unsharp masking":`k = ${k} · high-boost`;i++})},
   en:"On a soft image, the mask holds the edges. Adding it back with k equal to 1, 2 and 3 makes the image progressively sharper. With k equal to 3, the example row becomes 41, 39, 111, 109. Too large a k exaggerates edges and noise. Try it with the slider below.",
   bn:"নরম একটি ইমেজে মাস্কের মধ্যে কিনারাগুলো থাকে। k সমান ১, ২ ও ৩ দিয়ে এটি আবার যোগ করলে ইমেজ ক্রমশ আরও তীক্ষ্ণ হয়। k সমান ৩ হলে উদাহরণের সারি হয় ৪১, ৩৯, ১১১, ১০৯। k খুব বড় হলে কিনারা ও নয়েজ অতিরিক্ত হয়ে যায়। নিচের স্লাইডারে চেষ্টা করো।"}
],
panel:()=>`<h3>${tr({en:"Try it: k",bn:"নিজে করো: k"})}</h3><div class="prow">${sl("uk","k",0,5,.1,1)}</div><img id="uim" alt="" width="256" height="256" style="border-radius:6px;max-width:100%">`,
bind(root){const I=boxBlur(SC(),3),B=boxBlur(I,5);const f=()=>{const k=+root.querySelector("#uk").value;root.querySelector("#uko").textContent=k.toFixed(1);root.querySelector("#uim").src=toURL(mapI(I,(v,j)=>v+k*(v-B.a[j])))};root.querySelector("#uk").oninput=f;f()},
points:[{en:"g_mask = f − f̄; <b>g = f + k·g_mask</b>. k = 1 unsharp masking; k &gt; 1 high-boost.",bn:"g_mask = f − f̄; <b>g = f + k·g_mask</b>। k = ১ আনশার্প মাস্কিং; k &gt; ১ হাই-বুস্ট।"},{en:"Example: f = 50 60 90 100, f̄ = 53 67 83 97, mask = −3 −7 7 3 → k=1: 47 53 97 103; k=3: 41 39 111 109.",bn:"উদাহরণ: f = ৫০ ৬০ ৯০ ১০০, f̄ = ৫৩ ৬৭ ৮৩ ৯৭, মাস্ক = −৩ −৭ ৭ ৩ → k=১: ৪৭ ৫৩ ৯৭ ১০৩; k=৩: ৪১ ৩৯ ১১১ ১০৯।"}]},
/* 8 */
{id:"gradient",slides:"50–60",title:{en:"The gradient: Roberts and Sobel",bn:"গ্রেডিয়েন্ট: রবার্টস ও সোবেল"},
svg:`<g data-scene="def"><g data-s="0"><text class="mono am lg" x="40" y="60">∇f = [g_x, g_y],   M(x,y) = √(g_x² + g_y²) ≈ |g_x| + |g_y|</text>
  <g id="gd-k"></g></g></g>
<g data-scene="ex"><g data-s="0"><g id="gd-a"></g><g id="gd-b"></g><text id="gd-f" class="mono" x="440" y="300"></text><text id="gd-f2" class="mono" x="440" y="330"></text><text id="gd-f3" class="mono am" x="440" y="364"></text></g></g>
<g data-scene="im"><g data-s="0"><g id="gd-i"></g></g></g>`,
init(svg,_){const k=$$(svg,"#gd-k");mat(k,{x:40,y:130,cs:50,data:[[-1,0],[0,1]],label:"Roberts g_x"});mat(k,{x:170,y:130,cs:50,data:[[0,-1],[1,0]],label:"Roberts g_y"});
  mat(k,{x:330,y:130,cs:50,data:[[-1,-2,-1],[0,0,0],[1,2,1]],label:"Sobel g_x"});mat(k,{x:530,y:130,cs:50,data:[[-1,0,1],[-2,0,2],[-1,0,1]],label:"Sobel g_y"});
  txt(k,40,340,"first derivative, non-linear because of the magnitude","dim sm");txt(k,40,366,"Sobel weights the centre row and column by 2 for some smoothing","dim sm");
  const A=[[10,10,10,200,200,200],[10,10,10,200,200,200],[10,10,10,200,200,200],[100,100,100,20,20,20],[100,100,100,20,20,20],[100,100,100,20,20,20]];_.A=A;
  _.M=mat($$(svg,"#gd-a"),{x:40,y:80,cs:52,fs:13,data:A});[["p1",1,1],["p2",1,2],["p3",2,1],["p4",2,2]].forEach(([n,r,c])=>{_.M.cls(r,c,"on");txt(_.M.g,40+c*52+4,80+r*52+12,n,"xs am")});_.Kb=kbox($$(svg,"#gd-b"),_.M,3);
  const I=SC();img2($$(svg,"#gd-i"),110,90,250,250,"image").show(I);img2($$(svg,"#gd-i"),440,90,250,250,"Sobel magnitude |g_x| + |g_y|").show(sobel(I),1)},
steps:[
 {scene:"def",k:0,en:"First derivatives in image processing are implemented with the magnitude of the gradient. The gradient is the vector of partial derivatives g x and g y, and its magnitude is the square root of g x squared plus g y squared, often approximated by the sum of absolute values. Roberts cross masks use 2 by 2 differences on the diagonals. Sobel masks are 3 by 3 and give the centre row or column a weight of 2.",
   bn:"ইমেজ প্রসেসিংয়ে প্রথম ডেরিভেটিভ প্রয়োগ করা হয় গ্রেডিয়েন্টের মান দিয়ে। গ্রেডিয়েন্ট হলো আংশিক ডেরিভেটিভ g x ও g y-এর ভেক্টর, আর এর মান হলো g x-এর বর্গ যোগ g y-এর বর্গের বর্গমূল, যা প্রায়ই পরম মানের যোগফল দিয়ে আনুমানিক ধরা হয়। রবার্টস ক্রস মাস্ক কোণাকুণি ২ বাই ২ পার্থক্য ব্যবহার করে। সোবেল মাস্ক ৩ বাই ৩, এবং মাঝের সারি বা কলামকে ২ ওজন দেয়।"},
 {scene:"ex",k:0,fx:(svg,_)=>{const Kx=[[-1,-2,-1],[0,0,0],[1,2,1]],Ky=[[-1,0,1],[-2,0,2],[-1,0,1]];const P=[["p1",1,1],["p2",1,2],["p3",2,1],["p4",2,2]];
   const Ls=P.map(([n,r,c])=>[1800,()=>{_.Kb.at(r-1,c-1);const gx=apply3(_.A,Kx,r-1,c-1),gy=apply3(_.A,Ky,r-1,c-1);$$(svg,"#gd-f").textContent=`${n}: g_x = ${gx}`;$$(svg,"#gd-f2").textContent=`     g_y = ${gy}`;$$(svg,"#gd-f3").textContent=`|g_x| + |g_y| = ${Math.abs(gx)+Math.abs(gy)}`}]);return seq(Ls,true,2000)},
   en:"Let's apply the Sobel masks to the shaded pixels. At p1, everything under the mask is 10, so both gradients are zero: a flat region. At p2 the mask straddles the vertical edge, and g y is large. At p3 it straddles the horizontal edge, and g x is large. At p4, near the corner, both are nonzero. The magnitude is large exactly at edges.",
   bn:"চলো চিহ্নিত পিক্সেলগুলোতে সোবেল মাস্ক প্রয়োগ করি। p1-এ মাস্কের নিচে সবই ১০, তাই দুটো গ্রেডিয়েন্টই শূন্য: একটি সমান অঞ্চল। p2-তে মাস্ক উল্লম্ব কিনারার দুই পাশে পড়ে, তাই g y বড়। p3-তে মাস্ক আনুভূমিক কিনারার দুই পাশে পড়ে, তাই g x বড়। কোণের কাছে p4-এ দুটোই অশূন্য। ঠিক কিনারাতেই মান বড় হয়।"},
 {scene:"im",k:0,en:"On a full image, the Sobel gradient magnitude lights up the edges and leaves flat regions dark. It is widely used for edge enhancement, for example in industrial inspection.",
   bn:"পুরো ইমেজে সোবেল গ্রেডিয়েন্টের মান কিনারাগুলোকে উজ্জ্বল করে আর সমান অঞ্চল অন্ধকার রাখে। কিনারা স্পষ্ট করতে এটি ব্যাপকভাবে ব্যবহৃত হয়, যেমন শিল্প পরিদর্শনে।"}
],
points:[{en:"M(x,y) = √(g_x² + g_y²) ≈ |g_x| + |g_y|.",bn:"M(x,y) = √(g_x² + g_y²) ≈ |g_x| + |g_y|।"},{en:"Roberts: 2 × 2 diagonal differences. Sobel: [−1 −2 −1; 0 0 0; 1 2 1] and [−1 0 1; −2 0 2; −1 0 1].",bn:"রবার্টস: ২ × ২ কোণাকুণি পার্থক্য। সোবেল: [−১ −২ −১; ০ ০ ০; ১ ২ ১] ও [−১ ০ ১; −২ ০ ২; −১ ০ ১]।"}]}
],
quiz:[
 {q:{en:"Convolution differs from correlation because the kernel is…",bn:"কনভোলিউশন কোরিলেশন থেকে আলাদা কারণ কার্নেল…"},o:[{en:"normalised",bn:"নর্মালাইজ করা হয়"},{en:"rotated by 180°",bn:"১৮০° ঘোরানো হয়"},{en:"squared",bn:"বর্গ করা হয়"},{en:"made larger",bn:"বড় করা হয়"}],a:1,w:{en:"Flip both horizontally and vertically.",bn:"আনুভূমিক ও উল্লম্ব দুই দিকে উল্টানো।"}},
 {q:{en:"Box filter output for [1 5 7; 2 4 8; 3 6 9] is…",bn:"[১ ৫ ৭; ২ ৪ ৮; ৩ ৬ ৯]-এ বক্স ফিল্টারের আউটপুট…"},o:[{en:"4",bn:"৪"},{en:"5",bn:"৫"},{en:"6",bn:"৬"},{en:"45",bn:"৪৫"}],a:1,w:{en:"45 / 9 = 5.",bn:"৪৫ / ৯ = ৫।"}},
 {q:{en:"Best filter for salt and pepper noise?",bn:"সল্ট অ্যান্ড পেপার নয়েজের জন্য সেরা ফিল্টার?"},o:[{en:"Box",bn:"বক্স"},{en:"Median",bn:"মিডিয়ান"},{en:"Laplacian",bn:"ল্যাপ্লাসিয়ান"},{en:"Sobel",bn:"সোবেল"}],a:1,w:{en:"The median ignores extreme values.",bn:"মিডিয়ান চরম মান উপেক্ষা করে।"}},
 {q:{en:"Along an intensity ramp, the second derivative is…",bn:"তীব্রতার র‍্যাম্প বরাবর দ্বিতীয় ডেরিভেটিভ…"},o:[{en:"zero",bn:"শূন্য"},{en:"constant nonzero",bn:"অশূন্য ধ্রুবক"},{en:"maximum",bn:"সর্বোচ্চ"},{en:"undefined",bn:"অসংজ্ঞায়িত"}],a:0,w:{en:"Nonzero only at the onset and end.",bn:"শুধু শুরু ও শেষে অশূন্য।"}},
 {q:{en:"Sum of the coefficients of a Laplacian mask is…",bn:"ল্যাপ্লাসিয়ান মাস্কের সহগের যোগফল…"},o:[{en:"0",bn:"০"},{en:"1",bn:"১"},{en:"9",bn:"৯"},{en:"−4",bn:"−৪"}],a:0,w:{en:"So flat regions give zero response.",bn:"তাই সমান অঞ্চলে সাড়া শূন্য।"}},
 {q:{en:"High-boost filtering uses g = f + k·g_mask with…",bn:"হাই-বুস্ট ফিল্টারিংয়ে g = f + k·g_mask যেখানে…"},o:[{en:"k = 0",bn:"k = ০"},{en:"k = 1",bn:"k = ১"},{en:"k > 1",bn:"k > ১"},{en:"k < 0",bn:"k < ০"}],a:2,w:{en:"k = 1 is unsharp masking.",bn:"k = ১ হলো আনশার্প মাস্কিং।"}},
 {q:{en:"The gradient magnitude is often approximated by…",bn:"গ্রেডিয়েন্টের মান প্রায়ই আনুমানিক ধরা হয়…"},o:[{en:"g_x · g_y",bn:"g_x · g_y"},{en:"|g_x| + |g_y|",bn:"|g_x| + |g_y|"},{en:"g_x − g_y",bn:"g_x − g_y"},{en:"max(g_x, 0)",bn:"max(g_x, ০)"}],a:1,w:{en:"Cheaper than the square root.",bn:"বর্গমূলের চেয়ে সহজ।"}}
]});
})();
