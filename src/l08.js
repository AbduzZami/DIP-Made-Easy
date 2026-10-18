/* ===== Lecture 08 · Mathematical tools ===== */
(()=>{
const bin=(w,f)=>mk(w,w,(x,y)=>f(x,y)?1:0);
lecture({id:"l08",no:"08",title:{en:"Mathematical Tools in DIP",bn:"DIP-এর গাণিতিক টুল"},book:{en:"Ch. 2 · Digital Image Fundamentals",bn:"চ্যাপ্টার ২ · ডিজিটাল ইমেজ ফান্ডামেন্টালস"},
chapters:[
/* 1 */
{id:"arraymat",slides:"2–4",title:{en:"Array versus matrix operations",bn:"অ্যারে বনাম ম্যাট্রিক্স অপারেশন"},
svg:`<g id="am-a"></g><text class="lg c" x="210" y="190">×</text><g id="am-b"></g><text class="lg c" x="380" y="190">=</text><g id="am-c"></g>
<text id="am-h" class="h" x="40" y="60"></text><text id="am-f" class="mono am c" x="400" y="340"></text><text id="am-n" class="dim c sm" x="400" y="380"></text>`,
init(svg,_){_.A=mat($$(svg,"#am-a"),{x:60,y:120,cs:60,data:[[1,2],[3,4]],label:"A"});_.B=mat($$(svg,"#am-b"),{x:230,y:120,cs:60,data:[[5,6],[7,8]],label:"B"});_.C=mat($$(svg,"#am-c"),{x:410,y:120,cs:60,data:[["",""],["",""]],fs:18})},
steps:[
 {k:0,fx:(svg,_)=>{$$(svg,"#am-h").textContent="ARRAY PRODUCT · PIXEL BY PIXEL";$$(svg,"#am-n").textContent="we assume array operations throughout the course";
   const L=[[0,0],[0,1],[1,0],[1,1]].map(([r,c])=>[900,()=>{_.A.clear("a");_.B.clear("a");_.C.clear("a");_.A.cls(r,c,"a");_.B.cls(r,c,"a");_.C.cls(r,c,"a");const v=_.A.data[r][c]*_.B.data[r][c];_.C.set(r,c,v);$$(svg,"#am-f").textContent=`${_.A.data[r][c]} × ${_.B.data[r][c]} = ${v}`}]);
   L.reset=()=>{_.C.clear("a");[0,1].forEach(r=>[0,1].forEach(c=>_.C.set(r,c,"")))};return seq(L,true,2000)},
   en:"Images can be viewed as arrays of pixels, or as matrices. An array operation is carried out pixel by pixel. For the array product, each pixel of A is multiplied by the corresponding pixel of B. Throughout this course we assume array operations. Raising an image to a power means raising each pixel to that power.",
   bn:"ইমেজকে পিক্সেলের অ্যারে বা ম্যাট্রিক্স হিসেবে দেখা যায়। অ্যারে অপারেশন হয় পিক্সেল ধরে ধরে। অ্যারে গুণফলে A-এর প্রতিটি পিক্সেল B-এর সংশ্লিষ্ট পিক্সেলের সাথে গুণ হয়। এই কোর্সে আমরা সবসময় অ্যারে অপারেশন ধরে নেব। ইমেজকে কোনো ঘাতে তোলা মানে প্রতিটি পিক্সেলকে সেই ঘাতে তোলা।"},
 {k:0,fx:(svg,_)=>{$$(svg,"#am-h").textContent="MATRIX PRODUCT · ROW × COLUMN";$$(svg,"#am-n").textContent="used when operations follow matrix theory";
   const L=[[0,0],[0,1],[1,0],[1,1]].map(([r,c])=>[1100,()=>{_.A.clear("a");_.B.clear("a");_.C.clear("a");[0,1].forEach(k=>{_.A.cls(r,k,"a");_.B.cls(k,c,"b")});_.C.cls(r,c,"a");
     const v=_.A.data[r][0]*_.B.data[0][c]+_.A.data[r][1]*_.B.data[1][c];_.C.set(r,c,v);$$(svg,"#am-f").textContent=`${_.A.data[r][0]}×${_.B.data[0][c]} + ${_.A.data[r][1]}×${_.B.data[1][c]} = ${v}`}]);
   L.reset=()=>{_.C.clear("a");[0,1].forEach(r=>[0,1].forEach(c=>_.C.set(r,c,"")))};return seq(L,true,2000)},
   en:"A matrix product is different: each output element is a row of A times a column of B. The same two images give a completely different result.",
   bn:"ম্যাট্রিক্স গুণফল আলাদা: প্রতিটি আউটপুট উপাদান হলো A-এর একটি সারি গুণ B-এর একটি কলাম। একই দুটি ইমেজ থেকে সম্পূর্ণ ভিন্ন ফলাফল আসে।"}
],
points:[{en:"<b>Array operation</b>: pixel by pixel (assumed throughout the course).",bn:"<b>অ্যারে অপারেশন</b>: পিক্সেল ধরে ধরে (পুরো কোর্সে এটি ধরে নেওয়া হয়)।"},{en:"<b>Matrix operation</b>: follows matrix theory (row × column).",bn:"<b>ম্যাট্রিক্স অপারেশন</b>: ম্যাট্রিক্স তত্ত্ব মেনে (সারি × কলাম)।"}]},
/* 2 */
{id:"linear",slides:"5–9",title:{en:"Linear versus nonlinear operations",bn:"রৈখিক বনাম অরৈখিক অপারেশন"},
svg:`<text class="mono lg am c" x="400" y="60">H[a₁f₁ + a₂f₂] = a₁H[f₁] + a₂H[f₂] ?</text>
<g id="ln-1"></g><g id="ln-2"></g><text class="mono c" x="400" y="150">f₁ = [0 2; 2 3]   f₂ = [6 5; 4 7]   a₁ = 1, a₂ = −1</text>
<text id="ln-l" class="mono lg" x="60" y="240"></text><text id="ln-r" class="mono lg" x="60" y="290"></text><text id="ln-v" class="lg" x="60" y="360"></text>`,
steps:[
 {k:0,fx:svg=>{$$(svg,"#ln-l").textContent="";$$(svg,"#ln-r").textContent="";$$(svg,"#ln-v").textContent=""},
   en:"Consider an operator H that turns an input image f into an output image g. H is linear if applying it to a weighted sum of two images gives the same weighted sum of the individual outputs. This includes two properties: additivity and homogeneity.",
   bn:"ধরো একটি অপারেটর H ইনপুট ইমেজ f থেকে আউটপুট ইমেজ g তৈরি করে। H রৈখিক হবে যদি দুটি ইমেজের ওজনযুক্ত যোগফলে H প্রয়োগ করলে আলাদা আলাদা আউটপুটের একই ওজনযুক্ত যোগফল পাওয়া যায়। এর মধ্যে দুটি বৈশিষ্ট্য আছে: অ্যাডিটিভিটি ও হোমোজেনিটি।"},
 {k:0,fx:svg=>seq([[300,()=>{$$(svg,"#ln-l").textContent="Σ[f₁ − f₂] = Σ[−6 −3; −2 −4] = −15";$$(svg,"#ln-r").textContent="";$$(svg,"#ln-v").textContent=""}],[1400,()=>$$(svg,"#ln-r").textContent="Σf₁ − Σf₂ = 7 − 22 = −15"],[1000,()=>{$$(svg,"#ln-v").textContent="Equal → sum is a linear operator";$$(svg,"#ln-v").setAttribute("class","lg gn")}]]),
   en:"Let H be the sum of all pixels. On the left, the sum of 1 times f1 minus f2 is minus 15. On the right, the sum of f1 is 7, the sum of f2 is 22, and 7 minus 22 is also minus 15. Both sides match, so summation is linear.",
   bn:"ধরো H হলো সব পিক্সেলের যোগফল। বাঁ পাশে, ১ গুণ f1 বিয়োগ f2-এর যোগফল বিয়োগ ১৫। ডান পাশে, f1-এর যোগফল ৭, f2-এর যোগফল ২২, আর ৭ বিয়োগ ২২-ও বিয়োগ ১৫। দুই পাশ মিলে যায়, তাই যোগফল রৈখিক অপারেটর।"},
 {k:0,fx:svg=>seq([[300,()=>{$$(svg,"#ln-l").textContent="max[f₁ − f₂] = max[−6 −3; −2 −4] = −2";$$(svg,"#ln-r").textContent="";$$(svg,"#ln-v").textContent=""}],[1400,()=>$$(svg,"#ln-r").textContent="max f₁ − max f₂ = 3 − 7 = −4"],[1000,()=>{$$(svg,"#ln-v").textContent="Not equal → max is nonlinear";$$(svg,"#ln-v").setAttribute("class","lg rd")}]]),
   en:"Now let H be the max operation. On the left, the maximum of f1 minus f2 is minus 2. On the right, 3 minus 7 is minus 4. They differ, so max is a nonlinear operator.",
   bn:"এবার H হলো max অপারেশন। বাঁ পাশে, f1 বিয়োগ f2-এর সর্বোচ্চ মান বিয়োগ ২। ডান পাশে, ৩ বিয়োগ ৭ হলো বিয়োগ ৪। মান আলাদা, তাই max একটি অরৈখিক অপারেটর।"},
 {k:0,fx:svg=>{$$(svg,"#ln-v").textContent="Linear: well understood · Nonlinear: sometimes far better";$$(svg,"#ln-v").setAttribute("class","lg am")},
   en:"Linear operations are very important because a large body of theory applies to them. Nonlinear systems are less well understood, but some nonlinear operations perform far better than their linear counterparts.",
   bn:"রৈখিক অপারেশন খুব গুরুত্বপূর্ণ, কারণ এদের জন্য অনেক তাত্ত্বিক ও ব্যবহারিক ফলাফল প্রযোজ্য। অরৈখিক সিস্টেম কম বোঝা গেছে, তবে কিছু অরৈখিক অপারেশন রৈখিক অপারেশনের চেয়ে অনেক ভালো কাজ করে।"}
],
points:[{en:"Linear: H[a₁f₁ + a₂f₂] = a₁H[f₁] + a₂H[f₂] (additivity + homogeneity).",bn:"রৈখিক: H[a₁f₁ + a₂f₂] = a₁H[f₁] + a₂H[f₂] (অ্যাডিটিভিটি + হোমোজেনিটি)।"},{en:"Sum is linear (−15 = −15). Max is nonlinear (−2 ≠ −4).",bn:"যোগফল রৈখিক (−১৫ = −১৫)। max অরৈখিক (−২ ≠ −৪)।"}]},
/* 3 */
{id:"arith",slides:"10–12",title:{en:"Arithmetic operations between images",bn:"ইমেজের মধ্যে গাণিতিক অপারেশন"},
svg:`<text class="mono sm dim" x="40" y="40">s = f + g   d = f − g   p = f × g   v = f ÷ g   (pixel by pixel)</text>
<g id="ar-a"></g><text id="ar-op" class="lg c" x="232" y="190"></text><g id="ar-b"></g><text class="lg c" x="474" y="190">=</text><g id="ar-c"></g>
<text id="ar-f" class="mono am c" x="400" y="350"></text><text id="ar-n" class="sm c" x="400" y="384"></text>
<text class="dim xs c" x="400" y="420">round off · above 255 → 255 · below 0 → 0 · infinity → 0</text>`,
init(svg,_){const A=[[0,100,10],[4,0,10],[8,0,5]],B=[[10,100,5],[2,0,0],[0,10,10]];_.A=mat($$(svg,"#ar-a"),{x:50,y:110,cs:54,data:A,label:"A"});_.B=mat($$(svg,"#ar-b"),{x:292,y:110,cs:54,data:B,label:"B"});
  _.C=mat($$(svg,"#ar-c"),{x:534,y:110,cs:54,data:[["","",""],["","",""],["","",""]]});
  _.run=(svg,op,sym)=>{$$(svg,"#ar-op").textContent=sym;const L=[];for(let r=0;r<3;r++)for(let c=0;c<3;c++)L.push([650,()=>{_.A.clear("a");_.B.clear("a");_.C.clear("a");_.A.cls(r,c,"a");_.B.cls(r,c,"a");
      const a=A[r][c],b=B[r][c];const[v,note,bad]=op(a,b);_.C.set(r,c,v);_.C.cls(r,c,bad?"d":"c");$$(svg,"#ar-f").textContent=`${a} ${sym} ${b} → ${v}`;$$(svg,"#ar-n").textContent=note;$$(svg,"#ar-n").setAttribute("class",bad?"sm c rd":"sm c dim")}]);
    L.reset=()=>{_.C.clear("a","c","d");for(let r=0;r<3;r++)for(let c=0;c<3;c++)_.C.set(r,c,"")};return seq(L,true,2200)}},
steps:[
 {k:0,fx:(svg,_)=>_.run(svg,(a,b)=>{const v=a+b;return v>255?[255,"above 255: clipped",1]:[v,""]},"+"),en:"Arithmetic operations between images are array operations, done between corresponding pixel pairs. The images must be the same size, and so is the result. Here is addition of two 8-bit images A and B.",
   bn:"ইমেজের মধ্যে গাণিতিক অপারেশন হলো অ্যারে অপারেশন, যা সংশ্লিষ্ট পিক্সেল জোড়ার মধ্যে হয়। ইমেজগুলোর সাইজ একই হতে হয়, ফলাফলও একই সাইজের। এখানে দুটি ৮-বিট ইমেজ A ও B যোগ করা হচ্ছে।"},
 {k:0,fx:(svg,_)=>_.run(svg,(a,b)=>{const v=a-b;return v<0?[0,"below 0: set to 0",1]:[v,""]},"−"),en:"For subtraction, any result below zero is set to the minimum, zero. So 0 minus 10 and 0 minus 5 both become zero.",
   bn:"বিয়োগের ক্ষেত্রে শূন্যের নিচের যেকোনো ফলাফলকে সর্বনিম্ন মান শূন্য ধরা হয়। তাই ০ বিয়োগ ১০ ও ০ বিয়োগ ৫ দুটোই শূন্য হয়।"},
 {k:0,fx:(svg,_)=>_.run(svg,(a,b)=>{const v=a*b;return v>255?[255,`${v} is above 255: clipped to 255`,1]:[v,""]},"×"),en:"For multiplication, any result above the range is set to the maximum, 255. So 100 times 100, which is 10,000, becomes 255.",
   bn:"গুণের ক্ষেত্রে পরিসরের উপরের যেকোনো ফলাফলকে সর্বোচ্চ মান ২৫৫ ধরা হয়। তাই ১০০ গুণ ১০০, অর্থাৎ ১০,০০০ হয়ে যায় ২৫৫।"},
 {k:0,fx:(svg,_)=>_.run(svg,(a,b)=>{if(b===0)return[0,a===0?"0 ÷ 0: undefined → 0":"division by 0 = infinity → 0",1];const v=a/b;return v%1?[Math.floor(v),`${v} → ${Math.floor(v)} (as on the slide)`,1]:[v,""]},"÷"),en:"For division, a result of infinity, from dividing by zero, is written as zero. Fractions are rounded; the slide's example writes 5 divided by 10, which is 0.5, as 0.",
   bn:"ভাগের ক্ষেত্রে শূন্য দিয়ে ভাগ করে অসীম পেলে তা শূন্য লেখা হয়। ভগ্নাংশ রাউন্ড করা হয়; স্লাইডের উদাহরণে ৫ ভাগ ১০, অর্থাৎ ০.৫-কে ০ লেখা হয়েছে।"}
],
points:[{en:"s = f + g, d = f − g, p = f × g, v = f ÷ g, element by element, all M × N.",bn:"s = f + g, d = f − g, p = f × g, v = f ÷ g, উপাদান ধরে, সবই M × N।"},{en:"Round off; clip above 255 to 255 and below 0 to 0; infinity → 0.",bn:"রাউন্ড করো; ২৫৫-এর বেশি → ২৫৫, ০-এর কম → ০; অসীম → ০।"}]},
/* 4 */
{id:"add",slides:"13–17",title:{en:"Addition: averaging noisy images",bn:"যোগ: নয়েজযুক্ত ইমেজের গড়"},
svg:`<g data-scene="avg"><g data-s="0"><g id="av-i"></g><text class="mono c am" x="400" y="40">g(x, y) = f(x, y) + η(x, y)</text></g></g>
<g data-scene="sd"><g data-s="0"><g id="sd-g"></g></g></g>`,
init(svg,_){const I=gen("galaxy",128);_.av=[1,10,50,100].map((K,i)=>{const q=img2($$(svg,"#av-i"),30+i*190,90,170,170,`average of ${K}`);q.show(noiseG(I,.35/Math.sqrt(K),K));return q});
  const g=$$(svg,"#sd-g");const P=(set,y,col,name,sd)=>{txt(g,40,y+6,name,"mono");el(g,"line",{x1:200,x2:700,y1:y,y2:y,class:"axis"});[0,5,10,15,20].forEach(v=>txt(g,200+v*25,y+28,String(v),"dim xs mono c"));
    el(g,"line",{x1:450,x2:450,y1:y-26,y2:y+14,style:"stroke:#F2A93B;stroke-width:2;stroke-dasharray:4 3"});set.forEach(v=>el(g,"circle",{cx:200+v*25,cy:y,r:9,style:`fill:${col}`}));
    el(g,"rect",{x:450-sd*25,y:y-8,width:sd*50,height:16,rx:8,style:`fill:${col};fill-opacity:.2`});txt(g,720,y+6,`σ ≈ ${sd}`,"mono")};
  P([0,8,12,20],120,"#7FA8FF","X = [0 8 12 20]",8.33);P([8,9,11,12],250,"#4CC489","Y = [8 9 11 12]",1.83);txt(g,450,60,"both means = 10","c am");txt(g,400,360,"σ = √( Σ(Xᵢ − X̄)² / (n − 1) )","mono c");txt(g,400,394,"n − 1 because we usually have a sample, not the whole population","c dim xs")},
steps:[
 {scene:"avg",k:0,en:"Image addition is used to reduce noise. A corrupted image g is the noiseless image f plus noise eta. If we add, or average, many noisy images of the same scene, the random noise cancels out. This is used in astronomy. Here, averaging 10, 50 and 100 noisy images of a galaxy gives steadily cleaner results.",
   bn:"ইমেজ যোগ ব্যবহার করে নয়েজ কমানো হয়। নষ্ট ইমেজ g হলো নয়েজমুক্ত ইমেজ f যোগ নয়েজ ইটা। একই দৃশ্যের অনেকগুলো নয়েজযুক্ত ইমেজ যোগ বা গড় করলে এলোমেলো নয়েজ কাটাকাটি হয়ে যায়। জ্যোতির্বিজ্ঞানে এটি ব্যবহৃত হয়। এখানে একটি গ্যালাক্সির ১০, ৫০ ও ১০০টি নয়েজযুক্ত ইমেজের গড় নিলে ক্রমশ পরিষ্কার ফল পাওয়া যায়।"},
 {scene:"sd",k:0,en:"To measure noise we need statistics. The mean alone says little. X and Y both have a mean of 10. The standard deviation shows the difference: about 8.33 for X, and about 1.83 for Y. We divide by n minus 1 because we usually have a sample, not the whole population. Smaller spread means less noise.",
   bn:"নয়েজ মাপতে পরিসংখ্যান লাগে। শুধু গড় দিয়ে বেশি কিছু বোঝা যায় না। X ও Y দুটোর গড়ই ১০। স্ট্যান্ডার্ড ডেভিয়েশন পার্থক্য দেখায়: X-এর প্রায় ৮.৩৩, আর Y-এর প্রায় ১.৮৩। আমরা n বিয়োগ ১ দিয়ে ভাগ করি, কারণ সাধারণত পুরো জনসংখ্যা নয়, একটি নমুনা থাকে। ছড়ানো যত কম, নয়েজ তত কম।"}
],
panel:()=>`<h3>${tr({en:"Try it: number of images averaged",bn:"নিজে করো: কতগুলো ইমেজের গড়"})}</h3><div class="prow"><label>K <input type="range" id="ak" min="0" max="10" value="0"><output id="ako"></output></label></div><img id="aim" alt="" width="256" height="256" style="border-radius:6px;max-width:100%">`,
bind(root){const I=gen("galaxy",128);const f=()=>{const K=Math.round(2**(+root.querySelector("#ak").value));root.querySelector("#ako").textContent=K;root.querySelector("#aim").src=toURL(noiseG(I,.35/Math.sqrt(K),K))};root.querySelector("#ak").oninput=f;f()},
points:[{en:"g = f + η; averaging many noisy images reduces noise (astronomy).",bn:"g = f + η; অনেক নয়েজযুক্ত ইমেজের গড় নয়েজ কমায় (জ্যোতির্বিজ্ঞান)।"},{en:"X = [0 8 12 20], Y = [8 9 11 12]: same mean 10; σ ≈ 8.33 vs 1.83 (n − 1).",bn:"X = [০ ৮ ১২ ২০], Y = [৮ ৯ ১১ ১২]: গড় ১০; σ ≈ ৮.৩৩ বনাম ১.৮৩ (n − ১)।"}]},
/* 5 */
{id:"sub",slides:"18–21",title:{en:"Subtraction: differences and mask mode radiography",bn:"বিয়োগ: পার্থক্য ও মাস্ক মোড রেডিওগ্রাফি"},
svg:`<g data-scene="diff"><g data-s="0"><g id="sb-d"></g></g></g><g data-scene="dsa"><g data-s="0"><g id="sb-x"></g><text class="mono c am" x="400" y="40">g(x, y) = f(x, y) − h(x, y)</text></g></g>`,
init(svg,_){const I=gen("scene",128);const R=mapI(I,v=>v);for(let y=60;y<74;y++)for(let x=96;x<112;x++)R.a[y*128+x]=.95;
  const g=$$(svg,"#sb-d");img2(g,30,90,220,220,"original").show(I);img2(g,290,90,220,220,"reference (changed)").show(R);img2(g,550,90,220,220,"difference, scaled").show({w:128,h:128,a:R.a.map((v,i)=>Math.abs(v-I.a[i]))},1);
  const M=gen("xray",128),V=gen("angio",128);const live=mapI(M,(v,i)=>v-.35*Math.max(0,V.a[i]-.7)*3);const x=$$(svg,"#sb-x");
  img2(x,30,90,220,220,"mask h (before contrast)").show(M);img2(x,290,90,220,220,"live image f").show(live);img2(x,550,90,220,220,"difference g, enhanced").show({w:128,h:128,a:M.a.map((v,i)=>v-live.a[i])},1)},
steps:[
 {scene:"diff",k:0,en:"Image subtraction is used to enhance differences, correct uneven illumination, and compare two images. Here the reference image has one small change. Subtracting the images makes everything identical disappear, and only the change stands out.",
   bn:"ইমেজ বিয়োগ ব্যবহৃত হয় পার্থক্য স্পষ্ট করতে, অসম আলো ঠিক করতে এবং দুটি ইমেজ তুলনা করতে। এখানে রেফারেন্স ইমেজে একটি ছোট পরিবর্তন আছে। ইমেজ দুটি বিয়োগ করলে যা একই তা মুছে যায়, শুধু পরিবর্তনটি ফুটে ওঠে।"},
 {scene:"dsa",k:0,en:"In medicine this is called mask mode radiography. The mask h is an X-ray image of a region, captured before injecting a contrast material. Then live images f are taken after the injection. Subtracting the mask from each live image leaves only what changed: the blood vessels filled with contrast. This is digital subtraction angiography.",
   bn:"চিকিৎসায় একে বলে মাস্ক মোড রেডিওগ্রাফি। মাস্ক h হলো কনট্রাস্ট উপাদান ইনজেক্ট করার আগে তোলা একটি অঞ্চলের এক্স-রে ইমেজ। তারপর ইনজেকশনের পরে লাইভ ইমেজ f তোলা হয়। প্রতিটি লাইভ ইমেজ থেকে মাস্ক বিয়োগ করলে শুধু পরিবর্তিত অংশ থাকে: কনট্রাস্টে ভরা রক্তনালি। একে বলে ডিজিটাল সাবট্রাকশন অ্যানজিওগ্রাফি।"}
],
points:[{en:"Subtraction enhances differences, corrects uneven illumination, compares images.",bn:"বিয়োগ পার্থক্য স্পষ্ট করে, অসম আলো ঠিক করে, ইমেজ তুলনা করে।"},{en:"<b>Mask mode radiography</b>: g = f − h; mask before contrast, live images after.",bn:"<b>মাস্ক মোড রেডিওগ্রাফি</b>: g = f − h; কনট্রাস্টের আগে মাস্ক, পরে লাইভ ইমেজ।"}]},
/* 6 */
{id:"mul",slides:"22–25",title:{en:"Multiplication and division: shading and ROI",bn:"গুণ ও ভাগ: শেডিং ও ROI"},
svg:`<g data-scene="sh"><g data-s="0"><g id="ml-s"></g><text class="mono c am" x="400" y="40">g = f × h  →  f = g × (1 / h)</text></g></g><g data-scene="roi"><g data-s="0"><g id="ml-r"></g></g></g>`,
init(svg){const f=mk(128,128,(x,y)=>((Math.floor(x*8)+Math.floor(y*8))%2)?.9:.15),h=mk(128,128,(x,y)=>.25+.75*Math.exp(-((x-.25)**2+(y-.25)**2)/.35)),g=mapI(f,(v,i)=>v*h.a[i]);
  const s=$$(svg,"#ml-s");img2(s,30,90,220,220,"sensed g (shaded)").show(g);img2(s,290,90,220,220,"shading pattern h").show(h);img2(s,550,90,220,220,"g ÷ h: corrected").show(mapI(g,(v,i)=>v/h.a[i]));
  const D=gen("dental",128),M=mapI(D,v=>v>.9?1:0),Mk=morph(morph(M,"dilate"),"dilate");const r=$$(svg,"#ml-r");
  img2(r,30,90,220,220,"dental X-ray").show(D);img2(r,290,90,220,220,"ROI mask (1 inside)").show(Mk);img2(r,550,90,220,220,"product").show(mapI(D,(v,i)=>v*Mk.a[i]))},
steps:[
 {scene:"sh",k:0,en:"An important use of multiplication and division is shading correction. Suppose a sensor produces g, the perfect image f times a shading function h. If h is known, we recover f by multiplying g by the inverse of h, that is, dividing g by h.",
   bn:"গুণ ও ভাগের একটি গুরুত্বপূর্ণ ব্যবহার হলো শেডিং সংশোধন। ধরো, সেন্সর g তৈরি করে, যা নিখুঁত ইমেজ f গুণ একটি শেডিং ফাংশন h। h জানা থাকলে g-কে h-এর বিপরীত দিয়ে গুণ করে, অর্থাৎ g-কে h দিয়ে ভাগ করে f ফিরে পাওয়া যায়।"},
 {scene:"roi",k:0,en:"Another common use of multiplication is masking, also called region of interest, or ROI, operations. We multiply the image by a mask that is 1 inside the region of interest and 0 elsewhere. Here only the teeth with fillings remain.",
   bn:"গুণের আরেকটি প্রচলিত ব্যবহার হলো মাস্কিং, যাকে রিজিয়ন অব ইন্টারেস্ট বা ROI অপারেশনও বলে। ইমেজকে এমন একটি মাস্ক দিয়ে গুণ করা হয় যা আগ্রহের অঞ্চলে ১ আর বাকি জায়গায় ০। এখানে শুধু ফিলিং করা দাঁতগুলো থেকে গেছে।"}
],
points:[{en:"Shading correction: g = f·h, so f = g/h if h is known.",bn:"শেডিং সংশোধন: g = f·h, তাই h জানা থাকলে f = g/h।"},{en:"ROI masking: multiply by a mask of 1s inside the region and 0s elsewhere.",bn:"ROI মাস্কিং: অঞ্চলের ভেতরে ১ ও বাইরে ০ এমন মাস্ক দিয়ে গুণ।"}]},
/* 7 */
{id:"setlogic",slides:"26–28",title:{en:"Set and logical operations",bn:"সেট ও লজিক্যাল অপারেশন"},
svg:`<g data-scene="neg"><g data-s="0"><text class="mono am c" x="400" y="50">Aᶜ = { (x, y, K − z) | (x, y, z) ∈ A },  K = 2ᵏ − 1</text><g id="sl-n"></g></g></g>
<g data-scene="log"><g data-s="0"><g id="sl-l"></g></g></g>`,
init(svg,_){const I=gen("scene",128);const n=$$(svg,"#sl-n");img2(n,120,90,250,250,"A").show(I);img2(n,430,90,250,250,"Aᶜ (negative), K = 255").show(mapI(I,v=>1-v));
  const A=bin(64,(x,y)=>Math.hypot(x-.4,y-.5)<.3),B=bin(64,(x,y)=>Math.abs(x-.62)<.24&&Math.abs(y-.5)<.24);const l=$$(svg,"#sl-l");
  const O=[["A",A],["B",B],["A OR B",mapI(A,(v,i)=>Math.max(v,B.a[i]))],["A AND B",mapI(A,(v,i)=>v*B.a[i])],["A AND NOT B",mapI(A,(v,i)=>v*(1-B.a[i]))],["NOT A",mapI(A,v=>1-v)],["A XOR B",mapI(A,(v,i)=>v!==B.a[i]?1:0)]];
  _.L=O.map(([t,im],i)=>{const q=imgEl(l,24+(i%4)*194,30+Math.floor(i/4)*200,150,150,t);q.show(im);return q})},
steps:[
 {scene:"neg",k:0,en:"Set operations can involve intensities. Treat a gray image as a set A of triplets x, y, z, where z is the intensity. Its complement replaces each z by K minus z, where K is 2 to the k minus 1. For an 8-bit image K is 255, and the complement is the image negative.",
   bn:"সেট অপারেশনে তীব্রতাও যুক্ত হতে পারে। একটি গ্রে ইমেজকে x, y, z ত্রয়ীর একটি সেট A ধরো, যেখানে z হলো তীব্রতা। এর কমপ্লিমেন্টে প্রতিটি z-এর জায়গায় K বিয়োগ z বসে, যেখানে K হলো ২-এর k ঘাত বিয়োগ ১। ৮-বিট ইমেজে K হলো ২৫৫, আর কমপ্লিমেন্ট হলো ইমেজ নেগেটিভ।"},
 {scene:"log",k:0,fx:(svg,_)=>{_.L.forEach(q=>q.g.style.opacity=.2);let i=0;return every(1100,()=>{_.L.forEach((q,j)=>q.g.style.opacity=j<=i%7?1:.2);i++})},
   en:"Logical operations work on true and false values, written 1 and 0. In binary images, foreground pixels are 1 and background pixels are 0. Union, intersection and complement are then the OR, AND and NOT operations. Combining them gives results like A AND NOT B, or exclusive OR.",
   bn:"লজিক্যাল অপারেশন সত্য ও মিথ্যা মান নিয়ে কাজ করে, যা ১ ও ০ লেখা হয়। বাইনারি ইমেজে ফোরগ্রাউন্ড পিক্সেল ১ আর ব্যাকগ্রাউন্ড পিক্সেল ০। তখন ইউনিয়ন, ইন্টারসেকশন ও কমপ্লিমেন্ট হলো OR, AND ও NOT অপারেশন। এগুলো মিলিয়ে পাওয়া যায় A AND NOT B বা এক্সক্লুসিভ OR-এর মতো ফলাফল।"}
],
points:[{en:"Complement: (x, y, K − z), K = 2ᵏ − 1 → image negative.",bn:"কমপ্লিমেন্ট: (x, y, K − z), K = ২ᵏ − ১ → ইমেজ নেগেটিভ।"},{en:"Binary images: union = <b>OR</b>, intersection = <b>AND</b>, complement = <b>NOT</b>.",bn:"বাইনারি ইমেজ: ইউনিয়ন = <b>OR</b>, ইন্টারসেকশন = <b>AND</b>, কমপ্লিমেন্ট = <b>NOT</b>।"}]},
/* 8 */
{id:"spatial",slides:"29–34",title:{en:"Spatial operations: single pixel and neighbourhood",bn:"স্পেশাল অপারেশন: একক পিক্সেল ও নেইবারহুড"},
svg:`<g data-scene="sp"><g data-s="0"><text class="h" x="40" y="50">SINGLE PIXEL · NOT OPERATION</text><g id="sp-a"></g><text class="lg c" x="380" y="230">→</text><g id="sp-b"></g></g></g>
<g data-scene="nh"><g data-s="0"><g id="nh-a"></g><g id="nh-k"></g><g id="nh-b"></g><text id="nh-f" class="mono am c" x="590" y="420"></text></g></g>`,
init(svg,_){const B=[[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]];const a=mat($$(svg,"#sp-a"),{x:120,y:90,cs:56,data:B});const b=mat($$(svg,"#sp-b"),{x:470,y:90,cs:56,data:B.map(r=>r.map(v=>1-v))});
  B.forEach((r,i)=>r.forEach((v,j)=>{if(v)a.cls(i,j,"w");else b.cls(i,j,"w")}));
  const D=[[7,5,2,7,2,1,5],[1,5,2,9,2,8,8],[7,4,1,8,1,4,5],[6,4,2,7,2,2,5],[6,5,2,4,2,1,5],[5,5,2,5,2,8,4],[5,4,2,2,2,5,5],[5,4,3,4,3,6,2]];
  const P=Array.from({length:10},(_,r)=>Array.from({length:9},(_,c)=>r>0&&r<9&&c>0&&c<8?D[r-1][c-1]:0));_.P=P;
  _.A=mat($$(svg,"#nh-a"),{x:30,y:50,cs:36,fs:13,data:P,label:"zero-padded input"});for(let r=0;r<10;r++)for(let c=0;c<9;c++)if(r===0||c===0||r===9||c===8)_.A.cls(r,c,"k");
  _.K=kbox($$(svg,"#nh-k"),_.A,3);_.O=mat($$(svg,"#nh-b"),{x:440,y:90,cs:40,fs:13,data:D.map(r=>r.map(()=>""))});txt($$(svg,"#nh-b"),580,80,"3 × 3 average","c dim sm")},
steps:[
 {scene:"sp",k:0,en:"Spatial operations work directly on the pixels of an image. There are three kinds: single pixel operations, neighbourhood operations, and geometric spatial transformations. A single pixel operation changes each pixel based only on its own value. The NOT operation and the image negative are examples.",
   bn:"স্পেশাল অপারেশন সরাসরি ইমেজের পিক্সেলের উপর কাজ করে। এটি তিন ধরনের: একক পিক্সেল অপারেশন, নেইবারহুড অপারেশন এবং জ্যামিতিক স্পেশাল ট্রান্সফরমেশন। একক পিক্সেল অপারেশনে প্রতিটি পিক্সেল শুধু নিজের মানের উপর ভিত্তি করে বদলায়। NOT অপারেশন ও ইমেজ নেগেটিভ এর উদাহরণ।"},
 {scene:"nh",k:0,fx:(svg,_)=>{const L=[];for(let r=0;r<8;r++)for(let c=0;c<7;c++)L.push([260,()=>{_.K.at(r,c);let s=0;for(let i=0;i<3;i++)for(let j=0;j<3;j++)s+=_.P[r+i][c+j];_.O.set(r,c,Math.round(s/9));_.O.clear("a");_.O.cls(r,c,"a");$$(svg,"#nh-f").textContent=`sum ${s} ÷ 9 = ${(s/9).toFixed(2)} → ${Math.round(s/9)}`}]);
   L.reset=()=>{for(let r=0;r<8;r++)for(let c=0;c<7;c++)_.O.set(r,c,"");_.O.clear("a")};return seq(L,true,2500)},
   en:"A neighbourhood operation computes each output pixel from a neighbourhood around it. Here each pixel becomes the average of its 3 by 3 neighbours. For border pixels, part of the neighbourhood is outside the image, so we pad with zeros. The net effect is local blurring.",
   bn:"নেইবারহুড অপারেশনে প্রতিটি আউটপুট পিক্সেল তার চারপাশের একটি নেইবারহুড থেকে হিসাব করা হয়। এখানে প্রতিটি পিক্সেল তার ৩ বাই ৩ প্রতিবেশীর গড় হয়ে যায়। কিনারার পিক্সেলের ক্ষেত্রে নেইবারহুডের কিছু অংশ ইমেজের বাইরে থাকে, তাই শূন্য দিয়ে প্যাডিং করা হয়। এর ফলে স্থানীয়ভাবে ইমেজ ঝাপসা হয়।"}
],
points:[{en:"Spatial operations: <b>single pixel</b>, <b>neighbourhood</b>, <b>geometric</b>.",bn:"স্পেশাল অপারেশন: <b>একক পিক্সেল</b>, <b>নেইবারহুড</b>, <b>জ্যামিতিক</b>।"},{en:"Neighbourhood averaging with <b>zero padding</b> at the border → local blurring.",bn:"কিনারায় <b>জিরো প্যাডিং</b> দিয়ে নেইবারহুড গড় → স্থানীয় ঝাপসা।"}]},
/* 9 */
{id:"geometric",slides:"35–41",title:{en:"Geometric transformations and registration",bn:"জ্যামিতিক ট্রান্সফরমেশন ও রেজিস্ট্রেশন"},
svg:`<g data-scene="aff"><g data-s="0"><text class="mono c dim" x="400" y="34">(v, w) = T{(x, y)}</text>
  <line class="axis" x1="60" y1="400" x2="440" y2="400"/><line class="axis" x1="60" y1="400" x2="60" y2="60"/>
  <g id="gt-ghost" style="opacity:.25"></g><g id="gt-obj"></g><text id="gt-n" class="lg am" x="500" y="100"></text><g id="gt-m"></g><text id="gt-e" class="sm dim" x="500" y="330"></text></g></g>
<g data-scene="reg"><g data-s="0"><g id="rg-a"></g><g id="rg-b"></g><text class="c dim sm" x="400" y="420">align the input image with the reference image</text></g></g>`,
init(svg,_){const mkObj=g=>{const im=el(g,"image",{x:0,y:-100,width:130,height:100,preserveAspectRatio:"none"});im.setAttribute("href",land(130,100));el(g,"rect",{x:0,y:-100,width:130,height:100,class:"frame"})};
  mkObj($$(svg,"#gt-ghost"));mkObj($$(svg,"#gt-obj"));$$(svg,"#gt-ghost").setAttribute("transform","translate(60,400)");
  _.M=mat($$(svg,"#gt-m"),{x:500,y:140,cs:54,fs:13,data:[[1,0,0],[0,1,0],[0,0,1]]});
  _.T=(name,m,expl,css)=>{$$(svg,"#gt-n").textContent=name;for(let r=0;r<3;r++)for(let c=0;c<3;c++)_.M.set(r,c,m[r][c]);$$(svg,"#gt-e").textContent=expl;
    const o=$$(svg,"#gt-obj");o.style.transition="transform 1.2s ease";o.style.transformBox="view-box";o.style.transformOrigin="60px 400px";o.style.transform="translate(60px,400px)";requestAnimationFrame(()=>requestAnimationFrame(()=>o.style.transform=css))};
  const a=img2($$(svg,"#rg-a"),70,80,280,280,"reference");a.show(gen("xray",128));const b=$$(svg,"#rg-b");el(b,"rect",{x:450,y:80,width:280,height:280,class:"frame"});
  const cl=el(b,"clipPath",{id:"rgc"});el(cl,"rect",{x:450,y:80,width:280,height:280});const gg=el(b,"g",{"clip-path":"url(#rgc)"});
  _.ref=el(gg,"image",{x:450,y:80,width:280,height:280,preserveAspectRatio:"none",style:"opacity:.55"});_.ref.setAttribute("href",toURL(gen("xray",128)));
  _.inp=el(gg,"image",{x:450,y:80,width:280,height:280,preserveAspectRatio:"none",style:"opacity:.6;mix-blend-mode:screen"});_.inp.setAttribute("href",rgbURL(128,128,(x,y)=>{const v=gen("xray",128).a[Math.floor(y*128)*128+Math.floor(x*128)];return[255*v,90*v,30*v]}));
  txt(b,590,390,"input overlaid on reference","c dim sm")},
steps:[
 {scene:"aff",k:0,fx:(svg,_)=>_.T("Translation",[[1,0,"tx"],[0,1,"ty"],[0,0,1]],"shift by (tx, ty), e.g. (0,0) → (15,13)","translate(160px,340px)"),
   en:"A geometric transformation changes the coordinate system of the image: each point x, y moves to a new point v, w. Using homogeneous coordinates, every transformation is a 3 by 3 matrix. Translation shifts the object, for example from 0, 0 to 15, 13.",
   bn:"জ্যামিতিক ট্রান্সফরমেশন ইমেজের স্থানাঙ্ক ব্যবস্থা বদলায়: প্রতিটি বিন্দু x, y নতুন বিন্দু v, w-তে সরে যায়। হোমোজিনিয়াস স্থানাঙ্ক ব্যবহার করলে প্রতিটি ট্রান্সফরমেশন একটি ৩ বাই ৩ ম্যাট্রিক্স। ট্রান্সলেশন বস্তুকে সরিয়ে দেয়, যেমন ০, ০ থেকে ১৫, ১৩-তে।"},
 {scene:"aff",k:0,fx:(svg,_)=>_.T("Rotation",[["cos θ","−sin θ",0],["sin θ","cos θ",0],[0,0,1]],"rotate by θ about the origin","translate(60px,400px) rotate(-30deg)"),
   en:"Rotation turns the image by a given angle theta, using cosine and sine of theta in the matrix.",
   bn:"রোটেশন ইমেজকে একটি নির্দিষ্ট কোণ থিটা পরিমাণ ঘোরায়, ম্যাট্রিক্সে থিটার কোসাইন ও সাইন ব্যবহার করে।"},
 {scene:"aff",k:0,fx:(svg,_)=>_.T("Scaling",[["sx",0,0],[0,"sy",0],[0,0,1]],"300 × 400 → 600 × 200: sx = 2, sy = 1/2","translate(60px,400px) scale(2,.5)"),
   en:"Scaling resizes the image by scale factors. To turn a 300 by 400 image into 600 by 200, the scale is 2 in x and one half in y.",
   bn:"স্কেলিং স্কেল ফ্যাক্টর দিয়ে ইমেজের সাইজ বদলায়। ৩০০ বাই ৪০০ ইমেজকে ৬০০ বাই ২০০ করতে x-এ স্কেল ২ আর y-এ অর্ধেক।"},
 {scene:"aff",k:0,fx:(svg,_)=>_.T("Shearing",[[1,"sh",0],[0,1,0],[0,0,1]],"horizontal shear: upper part right, lower part left","translate(60px,400px) skewX(-25deg)"),
   en:"Shearing shifts pixel values horizontally or vertically. A horizontal shear moves the upper part to one side and the lower part to the other.",
   bn:"শিয়ারিং পিক্সেলগুলোকে আনুভূমিক বা উল্লম্বভাবে সরায়। আনুভূমিক শিয়ারে উপরের অংশ এক দিকে আর নিচের অংশ অন্য দিকে সরে যায়।"},
 {scene:"reg",k:0,fx:(svg,_)=>{const i=_.inp;return rafLoop(t=>{const u=Math.min(1,(t%5)/3.2);const e=1-u;i.setAttribute("transform",`translate(${30*e},${-22*e}) rotate(${12*e} 590 220) scale(${1+.12*e})`)})},
   en:"Image registration aligns two or more images of the same scene. We have an input image and a reference image, and we transform the input geometrically until it lines up with the reference. A key use is fusing medical images, such as SPECT with MRI, or CT with MRI.",
   bn:"ইমেজ রেজিস্ট্রেশন একই দৃশ্যের দুই বা ততোধিক ইমেজকে সারিবদ্ধ করে। একটি ইনপুট ইমেজ ও একটি রেফারেন্স ইমেজ থাকে, আর ইনপুটকে জ্যামিতিকভাবে বদলানো হয় যতক্ষণ না সেটি রেফারেন্সের সাথে মিলে যায়। এর একটি গুরুত্বপূর্ণ ব্যবহার হলো মেডিক্যাল ইমেজ একত্র করা, যেমন SPECT-এর সাথে MRI বা CT-এর সাথে MRI।"}
],
points:[{en:"(v, w) = T{(x, y)}: translation, rotation, scaling, shearing (3 × 3 matrices).",bn:"(v, w) = T{(x, y)}: ট্রান্সলেশন, রোটেশন, স্কেলিং, শিয়ারিং (৩ × ৩ ম্যাট্রিক্স)।"},{en:"<b>Registration</b>: align an input image to a reference (e.g. SPECT–MRI fusion).",bn:"<b>রেজিস্ট্রেশন</b>: ইনপুট ইমেজকে রেফারেন্সের সাথে মেলানো (যেমন SPECT–MRI একত্রকরণ)।"}]}
],
quiz:[
 {q:{en:"In this course, 'multiplying two images' means…",bn:"এই কোর্সে 'দুটি ইমেজ গুণ' মানে…"},o:[{en:"matrix product",bn:"ম্যাট্রিক্স গুণফল"},{en:"pixel-by-pixel product",bn:"পিক্সেল ধরে গুণফল"},{en:"dot product of rows",bn:"সারির ডট গুণফল"},{en:"convolution",bn:"কনভোলিউশন"}],a:1,w:{en:"We assume array operations.",bn:"আমরা অ্যারে অপারেশন ধরে নিই।"}},
 {q:{en:"The max operator is…",bn:"max অপারেটর…"},o:[{en:"linear",bn:"রৈখিক"},{en:"nonlinear",bn:"অরৈখিক"},{en:"both",bn:"দুটোই"},{en:"undefined",bn:"অসংজ্ঞায়িত"}],a:1,w:{en:"−2 ≠ −4 in the example.",bn:"উদাহরণে −২ ≠ −৪।"}},
 {q:{en:"For 8-bit images, 100 × 100 gives…",bn:"৮-বিট ইমেজে ১০০ × ১০০ দেয়…"},o:[{en:"10,000",bn:"১০,০০০"},{en:"255",bn:"২৫৫"},{en:"0",bn:"০"},{en:"100",bn:"১০০"}],a:1,w:{en:"Results above 255 are clipped to 255.",bn:"২৫৫-এর বেশি ফলাফল ২৫৫-এ কেটে যায়।"}},
 {q:{en:"Averaging many noisy images of the same scene…",bn:"একই দৃশ্যের অনেক নয়েজযুক্ত ইমেজের গড়…"},o:[{en:"increases noise",bn:"নয়েজ বাড়ায়"},{en:"reduces noise",bn:"নয়েজ কমায়"},{en:"sharpens edges",bn:"কিনারা তীক্ষ্ণ করে"},{en:"changes the scene",bn:"দৃশ্য বদলায়"}],a:1,w:{en:"Random noise cancels out.",bn:"এলোমেলো নয়েজ কাটাকাটি হয়।"}},
 {q:{en:"Mask mode radiography uses…",bn:"মাস্ক মোড রেডিওগ্রাফি ব্যবহার করে…"},o:[{en:"addition",bn:"যোগ"},{en:"subtraction",bn:"বিয়োগ"},{en:"multiplication",bn:"গুণ"},{en:"thresholding",bn:"থ্রেশহোল্ডিং"}],a:1,w:{en:"g = f − h.",bn:"g = f − h।"}},
 {q:{en:"Shading correction recovers f from g = f·h by…",bn:"শেডিং সংশোধনে g = f·h থেকে f পাওয়া যায়…"},o:[{en:"g − h",bn:"g − h"},{en:"g + h",bn:"g + h"},{en:"g ÷ h",bn:"g ÷ h"},{en:"g × h",bn:"g × h"}],a:2,w:{en:"Multiply by the inverse of h.",bn:"h-এর বিপরীত দিয়ে গুণ।"}},
 {q:{en:"Scaling a 300 × 400 image to 600 × 200 needs…",bn:"৩০০ × ৪০০ ইমেজকে ৬০০ × ২০০ করতে লাগে…"},o:[{en:"sx = 2, sy = 1/2",bn:"sx = ২, sy = ১/২"},{en:"sx = 1/2, sy = 2",bn:"sx = ১/২, sy = ২"},{en:"sx = sy = 2",bn:"sx = sy = ২"},{en:"sx = 3, sy = 4",bn:"sx = ৩, sy = ৪"}],a:0,w:{en:"600/300 = 2, 200/400 = 1/2.",bn:"৬০০/৩০০ = ২, ২০০/৪০০ = ১/২।"}}
]});
})();
