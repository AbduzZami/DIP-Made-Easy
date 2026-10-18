/* ===== Lecture 11 · Image compression ===== */
(()=>{
function lzw(seq){const D=new Map();for(let i=0;i<256;i++)D.set(String(i),i);let next=256,cur="";const rows=[];
  for(const p of seq){const s=cur?cur+"-"+p:String(p);if(D.has(s)){rows.push([cur,p,"","",""]);cur=s}else{rows.push([cur,p,D.get(cur),next,s]);D.set(s,next++);cur=String(p)}}
  rows.push([cur,"",D.get(cur),"",""]);return rows}
lecture({id:"l11",no:"11",title:{en:"Image Compression",bn:"ইমেজ কমপ্রেশন"},book:{en:"Ch. 8 · Image Compression",bn:"চ্যাপ্টার ৮ · ইমেজ কমপ্রেশন"},
chapters:[
/* 1 */
{id:"basics",slides:"2–8",title:{en:"Data, information and compression ratio",bn:"ডেটা, তথ্য ও কমপ্রেশন অনুপাত"},
svg:`<g data-scene="ll"><g data-s="0">
  <rect class="boxb" x="40" y="80" width="340" height="250" rx="12"/><text class="lg c" x="210" y="120">Lossless</text><text class="c sm" x="210" y="160">information preserving</text><text class="c sm" x="210" y="186">reconstruction = original</text><text class="c sm dim" x="210" y="226">low compression ratios</text>
  <rect class="boxa" x="420" y="80" width="340" height="250" rx="12"/><text class="lg c" x="590" y="120">Lossy</text><text class="c sm" x="590" y="160">not information preserving</text><text class="c sm" x="590" y="186">reconstruction ≈ original</text><text class="c sm dim" x="590" y="226">high compression ratios</text>
  <text class="c am" x="400" y="380">trade-off: information loss vs compression ratio</text></g></g>
<g data-scene="di"><g data-s="0"><g id="cb-s"></g></g></g>
<g data-scene="cr"><g data-s="0"><text class="mono lg am" x="60" y="100">C = n₁ / n₂</text><text class="mono lg am" x="60" y="150">R = 1 − 1 / C</text>
  <text class="sm dim" x="60" y="190">n₁, n₂: information-carrying units in two representations of the same information</text>
  <rect class="bar" x="60" y="240" width="500" height="30" rx="6"/><text class="sm" x="580" y="261">n₁ = 100</text><rect class="hbar" x="60" y="290" width="50" height="30" rx="6"/><text class="sm" x="130" y="311">n₂ = 10</text>
  <text class="mono lg" x="60" y="380">C = 100 / 10 = 10 : 1     R = 1 − 1/10 = 0.9</text><text class="sm dim" x="60" y="410">90% of the data in the first set is redundant</text></g></g>`,
init(svg){const g=$$(svg,"#cb-s");const S=["Your wife, Helen, will meet you at Shah Mukhdam Airport in Rajshahi","at 5 minutes past 6:00 pm tomorrow night.","Your wife will meet you at Shah Mukhdam Airport","at 5 minutes past 6:00 pm tomorrow night.","Helen will meet you at Shah Mukhdam","at 6:00 pm tomorrow night."];
  [[0,1],[2,3],[4,5]].forEach(([a,b],i)=>{el(g,"rect",{x:40,y:60+i*110,width:720,height:90,rx:10,class:i===2?"boxa":"box"});txt(g,60,96+i*110,S[a],"sm");txt(g,60,122+i*110,S[b],"sm");txt(g,740,140+i*110,`${(S[a]+" "+S[b]).length} characters`,"e xs dim mono")});
  txt(g,400,410,"same information, less data: the rest was redundant","c am")},
steps:[
 {scene:"ll",k:0,en:"The objective of compression is to reduce the amount of data needed to represent an image, by removing redundant data. Reconstructing the image is decompression. If the reconstruction is identical to the original, the compression is lossless: information preserving, but with low compression ratios. If it is only an approximation, it is lossy, with much higher ratios. There is a trade-off between information loss and compression ratio.",
   bn:"কমপ্রেশনের উদ্দেশ্য হলো অপ্রয়োজনীয় ডেটা সরিয়ে একটি ইমেজ উপস্থাপনের জন্য দরকারি ডেটার পরিমাণ কমানো। ইমেজ আবার তৈরি করাকে বলে ডিকমপ্রেশন। পুনর্গঠিত ইমেজ যদি মূল ইমেজের হুবহু একই হয়, তাহলে কমপ্রেশন লসলেস: তথ্য অক্ষত থাকে, কিন্তু কমপ্রেশন অনুপাত কম। যদি শুধু কাছাকাছি হয়, তাহলে লসি, যার অনুপাত অনেক বেশি। তথ্য হারানো আর কমপ্রেশন অনুপাতের মধ্যে একটি ভারসাম্য আছে।"},
 {scene:"di",k:0,en:"Data and information are not the same. Data are the means by which information is conveyed. These three sentences carry the same information with different amounts of data. Representations that contain irrelevant or repeated information contain redundant data.",
   bn:"ডেটা আর তথ্য এক নয়। ডেটা হলো তথ্য পৌঁছানোর মাধ্যম। এই তিনটি বাক্য একই তথ্য বহন করে, কিন্তু ভিন্ন পরিমাণ ডেটা দিয়ে। অপ্রাসঙ্গিক বা পুনরাবৃত্ত তথ্য থাকলে সেই উপস্থাপনে রিডান্ড্যান্ট ডেটা থাকে।"},
 {scene:"cr",k:0,en:"If n1 and n2 are the numbers of information carrying units in two datasets that represent the same information, the compression ratio is C equals n1 over n2. For 100 and 10, C is 10 to 1. The relative data redundancy is R equals 1 minus 1 over C, here 0.9: ninety percent of the first dataset is redundant.",
   bn:"একই তথ্য উপস্থাপনকারী দুটি ডেটাসেটে তথ্য বহনকারী এককের সংখ্যা যদি n1 ও n2 হয়, তাহলে কমপ্রেশন অনুপাত C সমান n1 ভাগ n2। ১০০ ও ১০ হলে C হয় ১০ : ১। আপেক্ষিক ডেটা রিডান্ড্যান্সি R সমান ১ বিয়োগ ১ ভাগ C, এখানে ০.৯: অর্থাৎ প্রথম ডেটাসেটের নব্বই শতাংশ রিডান্ড্যান্ট।"}
],
points:[{en:"<b>Lossless</b>: information preserving, low ratios. <b>Lossy</b>: approximation, high ratios.",bn:"<b>লসলেস</b>: তথ্য অক্ষত, কম অনুপাত। <b>লসি</b>: আনুমানিক, বেশি অনুপাত।"},{en:"<b>C = n₁/n₂</b>; <b>R = 1 − 1/C</b>. Example 100/10 → 10:1, R = 0.9.",bn:"<b>C = n₁/n₂</b>; <b>R = ১ − ১/C</b>। উদাহরণ ১০০/১০ → ১০:১, R = ০.৯।"}]},
/* 2 */
{id:"redundancy",slides:"9–18",title:{en:"Three types of redundancy",bn:"তিন ধরনের রিডান্ড্যান্সি"},
svg:`<g id="rd-i"></g><text id="rd-t" class="lg am" x="40" y="370"></text><text id="rd-t2" class="sm" x="40" y="400"></text><text id="rd-t3" class="sm dim" x="40" y="424"></text>`,
init(svg,_){const g=$$(svg,"#rd-i");const r=rng(6);
  const A=mk(128,128,(x,y)=>{const d=Math.hypot(x-.5,y-.5);return d<.18?.75:d<.3?.5:d<.42?.3:.1});
  const rows=Array.from({length:128},()=>r());const B=mk(128,128,(x,y,c,rr)=>rows[rr]);
  const Cc=mk(128,128,()=>.5+(r()-.5)*.03);
  _.P=[["Coding",A,"few intensities, but stored with 8 bits each"],["Interpixel",B,"each line is constant: neighbours predict each other"],["Psycho-visual",Cc,"looks like uniform gray: the variation is invisible"]].map(([n,im,t],i)=>{const q=img2(g,40+i*250,40,220,220,n);q.show(im);txt(q.g,150+i*250,300,t,"c dim xs");return q});
  _.say=(i,a,b,c)=>{_.P.forEach((q,j)=>q.g.style.opacity=i<0||j===i?1:.25);$$(svg,"#rd-t").textContent=a;$$(svg,"#rd-t2").textContent=b;$$(svg,"#rd-t3").textContent=c}},
steps:[
 {fx:(s,_)=>_.say(-1,"Coding · interpixel · psycho-visual","Compression is achieved when one or more of these redundancies are reduced or removed.",""),en:"There are three types of redundancy in images: coding redundancy, interpixel redundancy and psycho-visual redundancy. Compression is achieved when one or more of them is reduced or eliminated.",
   bn:"ইমেজে তিন ধরনের রিডান্ড্যান্সি আছে: কোডিং রিডান্ড্যান্সি, ইন্টারপিক্সেল রিডান্ড্যান্সি এবং সাইকো-ভিজুয়াল রিডান্ড্যান্সি। এদের এক বা একাধিক কমালে বা দূর করলে কমপ্রেশন হয়।"},
 {fx:(s,_)=>_.say(0,"Coding redundancy","Natural binary gives every level the same number of bits,","even though some levels are far more probable than others."),en:"Coding redundancy is present when the codes do not take advantage of the probabilities of the intensities. Natural binary code assigns the same number of bits to the most and least probable values. Most histograms are not uniform, so this wastes bits.",
   bn:"কোডিং রিডান্ড্যান্সি থাকে যখন কোডগুলো তীব্রতার সম্ভাবনার সুবিধা নেয় না। ন্যাচারাল বাইনারি কোড সবচেয়ে বেশি ও সবচেয়ে কম সম্ভাব্য মান দুটোকেই সমান বিট দেয়। বেশিরভাগ হিস্টোগ্রাম সুষম নয়, তাই এতে বিট নষ্ট হয়।"},
 {fx:(s,_)=>_.say(1,"Interpixel redundancy","Neighbouring pixels are correlated, so a pixel can be predicted from its neighbours.","Here all 256 intensities are equally likely, yet each row is completely predictable."),en:"Interpixel redundancy comes from correlation between neighbouring pixels: a pixel can be predicted from its neighbours. In this image of random constant lines, the histogram is uniform, so coding cannot help. But pixels along each line are identical, so they are maximally correlated horizontally.",
   bn:"ইন্টারপিক্সেল রিডান্ড্যান্সি আসে পাশাপাশি পিক্সেলের পারস্পরিক সম্পর্ক থেকে: একটি পিক্সেল তার প্রতিবেশী দেখে অনুমান করা যায়। এলোমেলো সমান রেখার এই ইমেজে হিস্টোগ্রাম সুষম, তাই কোডিং কোনো সাহায্য করে না। কিন্তু প্রতিটি রেখার পিক্সেল একই, তাই আনুভূমিকভাবে তারা পুরোপুরি সম্পর্কিত।"},
 {fx:(s,_)=>_.say(2,"Psycho-visual redundancy","Information the eye ignores can be removed.","Store just one average value: 256 × 256 × 8 bits ÷ 8 bits = 65,536 : 1"),en:"Psycho-visual redundancy is information the human visual system ignores. This image looks like a uniform gray field, so it can be represented by its average intensity alone, a single 8-bit value. The compression is 256 times 256 times 8 bits over 8 bits, that is 65,536 to 1, with little or no visible loss.",
   bn:"সাইকো-ভিজুয়াল রিডান্ড্যান্সি হলো এমন তথ্য যা মানুষের চোখ উপেক্ষা করে। এই ইমেজটি একটি সমান ধূসর ক্ষেত্রের মতো দেখায়, তাই শুধু এর গড় তীব্রতা, অর্থাৎ একটি ৮-বিট মান দিয়েই উপস্থাপন করা যায়। কমপ্রেশন হয় ২৫৬ গুণ ২৫৬ গুণ ৮ বিট ভাগ ৮ বিট, অর্থাৎ ৬৫,৫৩৬ : ১, প্রায় কোনো দৃশ্যমান ক্ষতি ছাড়াই।"}
].map(s=>Object.assign({k:0},s)),
points:[{en:"<b>Coding</b>: codes ignore probabilities. <b>Interpixel</b>: neighbours are correlated. <b>Psycho-visual</b>: information the eye ignores.",bn:"<b>কোডিং</b>: কোড সম্ভাবনা উপেক্ষা করে। <b>ইন্টারপিক্সেল</b>: প্রতিবেশীরা সম্পর্কিত। <b>সাইকো-ভিজুয়াল</b>: চোখ যা উপেক্ষা করে।"},{en:"Uniform-looking 256 × 256 image → one 8-bit value: 65,536 : 1.",bn:"সমান দেখানো ২৫৬ × ২৫৬ ইমেজ → একটি ৮-বিট মান: ৬৫,৫৩৬ : ১।"}]},
/* 3 */
{id:"coding",slides:"11–14",title:{en:"Coding redundancy: variable-length codes",bn:"কোডিং রিডান্ড্যান্সি: ভেরিয়েবল-লেংথ কোড"},
svg:`<g id="cd-t"></g><text class="mono am" x="40" y="44">L_avg = Σ l(r_k) · p(r_k)</text><text id="cd-1" class="mono" x="40" y="330"></text><text id="cd-2" class="mono lg am" x="40" y="368"></text><text id="cd-3" class="mono" x="40" y="404"></text>`,
init(svg,_){_.tb=table($$(svg,"#cd-t"),{x:40,y:70,cw:[70,80,130,80,110,80],rh:40,fs:14,head:["r_k","p(r_k)","code 1","l₁","code 2","l₂"],rows:[[87,.25,"01010111",8,"01",2],[128,.47,"10000000",8,"1",1],[186,.25,"10111010",8,"000",3],[255,.03,"11111111",8,"001",3]]});
  _.tb.col(4,0);_.tb.col(5,0)},
steps:[
 {k:0,fx:(svg,_)=>{_.tb.col(4,0);_.tb.col(5,0);["#cd-1","#cd-2","#cd-3"].forEach(q=>$$(svg,q).textContent="");$$(svg,"#cd-1").textContent="code 1: L_avg = 8 bits"},
   en:"A code is a list of symbols, and a code word is a sequence of symbols that represents a gray level. Its length is the number of symbols. In this image only four intensities occur, with probabilities 0.25, 0.47, 0.25 and 0.03. Natural 8-bit binary, code 1, uses 8 bits for each.",
   bn:"কোড হলো প্রতীকের একটি তালিকা, আর কোড ওয়ার্ড হলো একটি গ্রে লেভেল বোঝাতে ব্যবহৃত প্রতীকের ক্রম। এর দৈর্ঘ্য হলো প্রতীকের সংখ্যা। এই ইমেজে মাত্র চারটি তীব্রতা আছে, যাদের সম্ভাবনা ০.২৫, ০.৪৭, ০.২৫ ও ০.০৩। ন্যাচারাল ৮-বিট বাইনারি, অর্থাৎ কোড ১, প্রতিটির জন্য ৮ বিট ব্যবহার করে।"},
 {k:0,fx:(svg,_)=>{_.tb.col(4,1);_.tb.col(5,1);return seq([[300,()=>$$(svg,"#cd-1").textContent="code 2: 0.25(2) + 0.47(1) + 0.25(3) + 0.03(3)"],[1400,()=>$$(svg,"#cd-2").textContent="L_avg = 1.81 bits"],[1200,()=>$$(svg,"#cd-3").textContent="C = 8 / 1.81 ≈ 4.42     R = 1 − 1/4.42 ≈ 0.774"]])},
   en:"Code 2 is a variable-length code: the most common value gets the shortest code word. The average length is 0.25 times 2, plus 0.47 times 1, plus 0.25 times 3, plus 0.03 times 3, which is 1.81 bits. The compression ratio is 8 over 1.81, about 4.42, and the relative redundancy is about 0.774. So 77 percent of the 8-bit data was coding redundancy.",
   bn:"কোড ২ একটি ভেরিয়েবল-লেংথ কোড: সবচেয়ে বেশি আসা মানটি সবচেয়ে ছোট কোড ওয়ার্ড পায়। গড় দৈর্ঘ্য ০.২৫ গুণ ২ যোগ ০.৪৭ গুণ ১ যোগ ০.২৫ গুণ ৩ যোগ ০.০৩ গুণ ৩, অর্থাৎ ১.৮১ বিট। কমপ্রেশন অনুপাত ৮ ভাগ ১.৮১, প্রায় ৪.৪২, আর আপেক্ষিক রিডান্ড্যান্সি প্রায় ০.৭৭৪। অর্থাৎ ৮-বিট ডেটার ৭৭ শতাংশই ছিল কোডিং রিডান্ড্যান্সি।"}
],
points:[{en:"Variable-length code: most probable values get the shortest code words.",bn:"ভেরিয়েবল-লেংথ কোড: বেশি সম্ভাব্য মান সবচেয়ে ছোট কোড ওয়ার্ড পায়।"},{en:"Example: L_avg = 1.81 bits, C ≈ 4.42, R ≈ 0.774.",bn:"উদাহরণ: L_avg = ১.৮১ বিট, C ≈ ৪.৪২, R ≈ ০.৭৭৪।"}]},
/* 4 */
{id:"model",slides:"19–24",title:{en:"The image compression model",bn:"ইমেজ কমপ্রেশন মডেল"},
svg:`<text class="h" x="40" y="44">ENCODER</text><text class="h" x="40" y="264">DECODER</text><g id="md-g"></g><circle id="md-p" r="8" class="spot" cx="0" cy="0"/><text id="md-t" class="c am" x="400" y="420"></text>`,
init(svg,_){const g=$$(svg,"#md-g");const B=[[60,70,"Mapper","reduces spatial redundancy","boxb"],[260,70,"Quantizer","irreversible, removes irrelevant data","boxa"],[460,70,"Symbol coder","fixed or variable-length code","boxb"],[460,290,"Symbol decoder","","boxb"],[260,290,"Inverse mapper","","boxb"]];
  _.B=B.map(([x,y,t,s,c])=>{const q=el(g,"g");el(q,"rect",{x,y,width:170,height:90,rx:10,class:c});txt(q,x+85,y+40,t,"c sm");txt(q,x+85,y+64,s,"c xs dim");return q});
  txt(g,20,118,"f(x,y)","sm");arrow(g,30,130,58,130);arrow(g,232,115,258,115);arrow(g,432,115,458,115);el(g,"path",{d:"M632 115 H720 V335 H632",class:"link","marker-end":"url(#ahw)"});txt(g,728,230,"channel","sm dim");
  arrow(g,458,335,432,335);arrow(g,258,335,200,335);txt(g,140,340,"f̂(x,y)","sm");
  _.path=[[30,130],[145,115],[345,115],[545,115],[720,115],[720,335],[545,335],[345,335],[200,335]]},
steps:[
 {k:0,fx:(svg,_)=>{_.B.forEach(b=>b.style.opacity=1);const p=$$(svg,"#md-p");$$(svg,"#md-t").textContent="";return rafLoop(t=>{const u=(t*.45)%(_.path.length-1),i=Math.floor(u),f=u-i;p.setAttribute("cx",_.path[i][0]+(_.path[i+1][0]-_.path[i][0])*f);p.setAttribute("cy",_.path[i][1]+(_.path[i+1][1]-_.path[i][1])*f)})},
   en:"A general compression system has an encoder and a decoder. The encoder removes redundancy in three independent stages. First, the mapper transforms the image into a format, usually not visual, that reduces spatial redundancy. It is generally reversible. Run-length coding is an example.",
   bn:"একটি সাধারণ কমপ্রেশন সিস্টেমে একটি এনকোডার ও একটি ডিকোডার থাকে। এনকোডার তিনটি স্বাধীন ধাপে রিডান্ড্যান্সি দূর করে। প্রথমে ম্যাপার ইমেজকে এমন একটি রূপে নেয়, সাধারণত যা দেখার মতো নয়, যাতে স্পেশাল রিডান্ড্যান্সি কমে। এটি সাধারণত রিভার্সিবল। রান-লেংথ কোডিং এর একটি উদাহরণ।"},
 {k:0,fx:(svg,_)=>{_.B.forEach((b,i)=>b.style.opacity=i===1?1:.3);$$(svg,"#md-t").textContent="quantizer: irreversible · omitted for error-free compression"},
   en:"Second, the quantizer reduces the accuracy of the mapper output according to a fidelity criterion, keeping irrelevant information out. This step is irreversible, so it must be omitted when error-free, lossless compression is wanted.",
   bn:"দ্বিতীয়ত, কোয়ান্টাইজার একটি ফিডেলিটি মানদণ্ড অনুযায়ী ম্যাপারের আউটপুটের নির্ভুলতা কমায়, যাতে অপ্রাসঙ্গিক তথ্য বাদ পড়ে। এই ধাপটি অপরিবর্তনীয়, তাই নির্ভুল, লসলেস কমপ্রেশন চাইলে এটি বাদ দিতে হয়।"},
 {k:0,fx:(svg,_)=>{_.B.forEach((b,i)=>b.style.opacity=i===2?1:.3);$$(svg,"#md-t").textContent="shortest code words for the most frequent values"},
   en:"Third, the symbol coder generates a fixed or variable-length code for the quantizer output. With a variable-length code, the shortest code words go to the most frequent values, which minimises coding redundancy. This step is reversible.",
   bn:"তৃতীয়ত, সিম্বল কোডার কোয়ান্টাইজারের আউটপুটের জন্য নির্দিষ্ট বা পরিবর্তনশীল দৈর্ঘ্যের কোড তৈরি করে। পরিবর্তনশীল দৈর্ঘ্যের কোডে সবচেয়ে বেশি আসা মান সবচেয়ে ছোট কোড ওয়ার্ড পায়, এতে কোডিং রিডান্ড্যান্সি সবচেয়ে কম হয়। এই ধাপটি রিভার্সিবল।"},
 {k:0,fx:(svg,_)=>{_.B.forEach((b,i)=>b.style.opacity=i>=3?1:.3);$$(svg,"#md-t").textContent="lossless: mapper → symbol encoder   ·   lossy: mapper → quantizer → symbol encoder"},
   en:"The decoder has only two parts, a symbol decoder and an inverse mapper, which undo the coder and mapper in reverse order. There is no inverse quantizer, because quantization loses information permanently. So a lossless encoder is mapper plus symbol encoder, and a lossy encoder adds the quantizer.",
   bn:"ডিকোডারে মাত্র দুটি অংশ থাকে, একটি সিম্বল ডিকোডার ও একটি ইনভার্স ম্যাপার, যারা উল্টো ক্রমে কোডার ও ম্যাপারের কাজ ফিরিয়ে আনে। কোনো ইনভার্স কোয়ান্টাইজার নেই, কারণ কোয়ান্টাইজেশনে তথ্য চিরতরে হারিয়ে যায়। তাই লসলেস এনকোডার হলো ম্যাপার যোগ সিম্বল এনকোডার, আর লসি এনকোডারে কোয়ান্টাইজার যোগ হয়।"}
],
points:[{en:"Encoder: <b>mapper</b> (reversible) → <b>quantizer</b> (irreversible) → <b>symbol coder</b> (reversible).",bn:"এনকোডার: <b>ম্যাপার</b> (রিভার্সিবল) → <b>কোয়ান্টাইজার</b> (অপরিবর্তনীয়) → <b>সিম্বল কোডার</b> (রিভার্সিবল)।"},{en:"Decoder: symbol decoder → inverse mapper; no inverse quantizer. Lossless omits the quantizer.",bn:"ডিকোডার: সিম্বল ডিকোডার → ইনভার্স ম্যাপার; ইনভার্স কোয়ান্টাইজার নেই। লসলেসে কোয়ান্টাইজার নেই।"}]},
/* 5 */
{id:"huffman",slides:"25–27",title:{en:"Huffman coding",bn:"হাফম্যান কোডিং"},
svg:`<g id="hf-g"></g><g id="hf-t"></g><text id="hf-l" class="mono am sm" x="40" y="428"></text>`,
init(svg,_){const g=$$(svg,"#hf-g");const N={a2:[60,360,.4],a6:[140,360,.3],a1:[220,360,.1],a4:[300,360,.1],a3:[370,360,.06],a5:[440,360,.04],n1:[405,290,.1],n2:[352,225,.2],n3:[286,160,.3],n4:[213,100,.6],root:[136,44,1]};
  const E=[["n1","a3","0"],["n1","a5","1"],["n2","a4","0"],["n2","n1","1"],["n3","n2","0"],["n3","a1","1"],["n4","a6","0"],["n4","n3","1"],["root","n4","0"],["root","a2","1"]];
  _.E=E.map(([p,c,b])=>{const q=el(g,"g",{style:"opacity:0;transition:opacity .5s"});el(q,"line",{x1:N[p][0],y1:N[p][1],x2:N[c][0],y2:N[c][1],class:"link"});const l=txt(q,(N[p][0]+N[c][0])/2-12,(N[p][1]+N[c][1])/2,b,"am mono sm");l.style.opacity=0;return{q,l,p}});
  _.N={};for(const k in N){const[x,y,p]=N[k];const q=el(g,"g",{style:k[0]==="a"?"":"opacity:0;transition:opacity .5s"});el(q,"circle",{cx:x,cy:y,r:k[0]==="a"?24:20,class:k[0]==="a"?"boxb":"boxa"});txt(q,x,y+(k[0]==="a"?-1:5),k[0]==="a"?k:p.toFixed(1),"c xs mono");if(k[0]==="a")txt(q,x,y+13,String(p),"c xs mono dim");_.N[k]=q}
  _.order=["n1","n2","n3","n4","root"];
  _.tb=table($$(svg,"#hf-t"),{x:520,y:60,cw:[60,70,90,50],rh:38,fs:13,head:["symbol","p","code","l"],rows:[["a2",.4,"1",1],["a6",.3,"00",2],["a1",.1,"011",3],["a4",.1,"0100",4],["a3",.06,"01010",5],["a5",.04,"01011",5]]});_.tb.col(2,0);_.tb.col(3,0);
  _.reset=()=>{_.order.forEach(k=>_.N[k].style.opacity=0);_.E.forEach(e=>{e.q.style.opacity=0;e.l.style.opacity=0})}},
steps:[
 {k:0,fx:(svg,_)=>{_.reset();_.tb.col(2,0);_.tb.col(3,0);$$(svg,"#hf-l").textContent="";const L=_.order.map(k=>[1100,()=>{_.N[k].style.opacity=1;_.E.filter(e=>e.p===k).forEach(e=>e.q.style.opacity=1)}]);L.reset=_.reset;return seq(L,true,2500)},
   en:"Huffman coding removes coding redundancy and produces a variable-length code close to the theoretical minimum. Order the probabilities, combine the two smallest, and repeat until two remain. Here 0.06 and 0.04 make 0.1. Then 0.1 and 0.1 make 0.2. Then 0.2 and 0.1 make 0.3. Then 0.3 and 0.3 make 0.6. Finally 0.6 and 0.4 make 1.",
   bn:"হাফম্যান কোডিং কোডিং রিডান্ড্যান্সি দূর করে এবং তাত্ত্বিক সর্বনিম্নের কাছাকাছি একটি পরিবর্তনশীল দৈর্ঘ্যের কোড তৈরি করে। সম্ভাবনাগুলো সাজাও, সবচেয়ে ছোট দুটি যোগ করো, এবং দুটি না থাকা পর্যন্ত চালিয়ে যাও। এখানে ০.০৬ ও ০.০৪ মিলে ০.১। তারপর ০.১ ও ০.১ মিলে ০.২। তারপর ০.২ ও ০.১ মিলে ০.৩। তারপর ০.৩ ও ০.৩ মিলে ০.৬। শেষে ০.৬ ও ০.৪ মিলে ১।"},
 {k:0,fx:(svg,_)=>{_.order.forEach(k=>_.N[k].style.opacity=1);_.E.forEach(e=>{e.q.style.opacity=1;e.l.style.opacity=0});const L=[..._.E].reverse().map(e=>[350,()=>e.l.style.opacity=1]);L.push([600,()=>{_.tb.col(2,1);_.tb.col(3,1)}]);return seq(L)},
   en:"Now work backward from the top, assigning 0 and 1 at each split. Reading the bits from the root down to each symbol gives its code: a2 is 1, a6 is 00, a1 is 011, a4 is 0100, a3 is 01010, and a5 is 01011.",
   bn:"এবার উপর থেকে উল্টো দিকে কাজ করো, প্রতিটি ভাগে ০ ও ১ বসাও। রুট থেকে প্রতিটি প্রতীক পর্যন্ত বিটগুলো পড়লে তার কোড পাওয়া যায়: a2 হলো ১, a6 হলো ০০, a1 হলো ০১১, a4 হলো ০১০০, a3 হলো ০১০১০, আর a5 হলো ০১০১১।"},
 {k:0,fx:(svg,_)=>{_.order.forEach(k=>_.N[k].style.opacity=1);_.E.forEach(e=>{e.q.style.opacity=1;e.l.style.opacity=1});_.tb.col(2,1);_.tb.col(3,1);$$(svg,"#hf-l").textContent="L_avg = 0.4(1)+0.3(2)+0.1(3)+0.1(4)+0.06(5)+0.04(5) = 2.2 bits"},
   en:"The average length is 2.2 bits per symbol, compared with 3 bits for a fixed-length code for six symbols. Huffman coding is widely used as the symbol coder in many compression methods, but it does not take advantage of interpixel redundancy.",
   bn:"গড় দৈর্ঘ্য প্রতি প্রতীকে ২.২ বিট, যেখানে ছয়টি প্রতীকের জন্য নির্দিষ্ট দৈর্ঘ্যের কোডে লাগত ৩ বিট। হাফম্যান কোডিং অনেক কমপ্রেশন পদ্ধতিতে সিম্বল কোডার হিসেবে ব্যাপকভাবে ব্যবহৃত হয়, তবে এটি ইন্টারপিক্সেল রিডান্ড্যান্সির সুবিধা নেয় না।"}
],
points:[{en:"Algorithm: sort probabilities, combine the two smallest, repeat; assign 0/1 working backward.",bn:"অ্যালগরিদম: সম্ভাবনা সাজাও, সবচেয়ে ছোট দুটি যোগ করো, পুনরাবৃত্তি; উল্টো দিকে ০/১ বসাও।"},{en:"Codes: a2 1, a6 00, a1 011, a4 0100, a3 01010, a5 01011; L_avg = 2.2 bits.",bn:"কোড: a2 ১, a6 ০০, a1 ০১১, a4 ০১০০, a3 ০১০১০, a5 ০১০১১; L_avg = ২.২ বিট।"}]},
/* 6 */
{id:"arith",slides:"28–30",title:{en:"Arithmetic coding",bn:"অ্যারিথমেটিক কোডিং"},
svg:`<g id="ac-g"></g><text class="mono am" x="40" y="40">message: a1 a2 a3 a3 a4</text><text id="ac-t" class="mono lg" x="40" y="425"></text>`,
init(svg,_){const P=[.2,.2,.4,.2],nm=["a1","a2","a3","a4"],msg=[0,1,2,2,3];const g=$$(svg,"#ac-g");let lo=0,hi=1;_.rows=[];
  for(let s=0;s<=5;s++){const y=70+s*60,q=el(g,"g",{style:"opacity:0;transition:opacity .5s"});el(q,"line",{x1:120,x2:700,y1:y,y2:y,class:"axis",style:"stroke-width:2"});
    let a=lo;const W=hi-lo;const segs=[];P.forEach((p,i)=>{const b=a+p*W,x1=120+(a-lo)/W*580,x2=120+(b-lo)/W*580;const r=el(q,"rect",{x:x1,y:y-12,width:x2-x1,height:24,class:"cell"});if(s<5)txt(q,(x1+x2)/2,y+5,nm[i],"c xs mono");segs.push(r);a=b});
    txt(q,112,y+5,+lo.toFixed(5)+"","e xs mono");txt(q,708,y+5,+hi.toFixed(5)+"","xs mono");_.rows.push({q,segs,lo,hi});
    if(s<5){const i=msg[s];const nlo=lo+P.slice(0,i).reduce((x,y)=>x+y,0)*W;hi=nlo+P[i]*W;lo=nlo}}
  _.final=[lo,hi]},
steps:[
 {k:0,fx:(svg,_)=>{_.rows.forEach((r,i)=>r.q.style.opacity=i===0?1:0);$$(svg,"#ac-t").textContent="a1 [0, 0.2)   a2 [0.2, 0.4)   a3 [0.4, 0.8)   a4 [0.8, 1)"},
   en:"Huffman coding encodes symbols one at a time. Arithmetic coding encodes a whole sequence of symbols as a single code word, a fraction between 0 and 1. There is no one-to-one correspondence between symbols and code words. Each symbol gets an interval sized by its probability: a1 from 0 to 0.2, a2 from 0.2 to 0.4, a3 from 0.4 to 0.8, and a4 from 0.8 to 1.",
   bn:"হাফম্যান কোডিং একবারে একটি করে প্রতীক এনকোড করে। অ্যারিথমেটিক কোডিং পুরো প্রতীকের ক্রমকে একটি মাত্র কোড ওয়ার্ড হিসেবে এনকোড করে, যা ০ থেকে ১-এর মধ্যে একটি ভগ্নাংশ। প্রতীক আর কোড ওয়ার্ডের মধ্যে এক-এক সম্পর্ক থাকে না। প্রতিটি প্রতীক তার সম্ভাবনা অনুযায়ী একটি ব্যবধি পায়: a1 ০ থেকে ০.২, a2 ০.২ থেকে ০.৪, a3 ০.৪ থেকে ০.৮, আর a4 ০.৮ থেকে ১।"},
 {k:0,fx:(svg,_)=>{const msg=[0,1,2,2,3];const L=[];_.rows.forEach((r,i)=>{L.push([900,()=>{r.q.style.opacity=1;if(i>0){_.rows[i-1].segs.forEach(s=>s.classList.remove("a"));_.rows[i-1].segs[msg[i-1]].classList.add("a")}$$(svg,"#ac-t").textContent=`[${+r.lo.toFixed(5)}, ${+r.hi.toFixed(5)})`}])});
   L.reset=()=>{_.rows.forEach((r,i)=>{r.q.style.opacity=i===0?1:0;r.segs.forEach(s=>s.classList.remove("a"))})};return seq(L,true,2500)},
   en:"To encode a1 a2 a3 a3 a4, start with 0 to 1. a1 narrows it to 0 to 0.2. Subdivide that interval in the same proportions: a2 narrows it to 0.04 to 0.08. a3 gives 0.056 to 0.072. a3 again gives 0.0624 to 0.0688. Finally a4 gives 0.06752 to 0.0688.",
   bn:"a1 a2 a3 a3 a4 এনকোড করতে ০ থেকে ১ দিয়ে শুরু করো। a1 এটিকে ০ থেকে ০.২-এ সংকুচিত করে। সেই ব্যবধিকে একই অনুপাতে ভাগ করো: a2 এটিকে ০.০৪ থেকে ০.০৮-এ নামায়। a3 দেয় ০.০৫৬ থেকে ০.০৭২। আবার a3 দেয় ০.০৬২৪ থেকে ০.০৬৮৮। শেষে a4 দেয় ০.০৬৭৫২ থেকে ০.০৬৮৮।"},
 {k:0,fx:(svg,_)=>{_.rows.forEach(r=>r.q.style.opacity=1);$$(svg,"#ac-t").textContent="any number in [0.06752, 0.0688), e.g. 0.068, represents the message"},
   en:"Any number inside the final interval, for example 0.068, represents the whole five-symbol message. Arithmetic coding is slower than Huffman coding, but it can achieve better compression.",
   bn:"শেষ ব্যবধির ভেতরের যেকোনো সংখ্যা, যেমন ০.০৬৮, পুরো পাঁচ প্রতীকের বার্তাটি উপস্থাপন করে। অ্যারিথমেটিক কোডিং হাফম্যান কোডিংয়ের চেয়ে ধীর, তবে আরও ভালো কমপ্রেশন দিতে পারে।"}
],
points:[{en:"A whole message → one fraction in [0, 1); each symbol narrows the interval by its probability.",bn:"পুরো বার্তা → [০, ১)-এ একটি ভগ্নাংশ; প্রতিটি প্রতীক তার সম্ভাবনা অনুযায়ী ব্যবধি সংকুচিত করে।"},{en:"a1 a2 a3 a3 a4 → [0.06752, 0.0688), e.g. 0.068. Slower than Huffman, better compression.",bn:"a1 a2 a3 a3 a4 → [০.০৬৭৫২, ০.০৬৮৮), যেমন ০.০৬৮। হাফম্যানের চেয়ে ধীর, ভালো কমপ্রেশন।"}]},
/* 7 */
{id:"lzw",slides:"31–35",title:{en:"LZW (dictionary-based) coding",bn:"LZW (ডিকশনারি-ভিত্তিক) কোডিং"},
svg:`<g id="lz-i"></g><g id="lz-t"></g><text id="lz-o" class="mono am sm" x="40" y="425"></text>`,
init(svg,_){const I=[[39,39,126,126],[39,39,126,126],[39,39,126,126],[39,39,126,126]];_.seq=I.flat();_.M=mat($$(svg,"#lz-i"),{x:30,y:80,cs:46,fs:13,data:I,label:"4 × 4, 8-bit"});
  _.rows=lzw(_.seq);_.tb=table($$(svg,"#lz-t"),{x:240,y:20,cw:[150,70,70,70,170],rh:22,fs:11,head:["recognized","pixel","output","code","entry"],rows:_.rows.map(r=>r.map(String))});
  _.tb.cells.forEach(row=>row.forEach(c=>c.t.style.opacity=0))},
steps:[
 {k:0,fx:(svg,_)=>{_.tb.cells.forEach(row=>row.forEach(c=>c.t.style.opacity=0));$$(svg,"#lz-o").textContent="dictionary: 0–255 = gray levels, 256–511 empty"},
   en:"LZW, or Lempel-Ziv-Welch, coding attacks interpixel redundancy. It assigns fixed-length code words to variable-length sequences of pixels, and needs no prior knowledge of probabilities. A dictionary is built as we go. Initially, entries 0 to 255 are the gray levels themselves, for 8 bits per pixel.",
   bn:"LZW, অর্থাৎ লেমপেল-জিভ-ওয়েলচ কোডিং ইন্টারপিক্সেল রিডান্ড্যান্সি কমায়। এটি পিক্সেলের পরিবর্তনশীল দৈর্ঘ্যের ক্রমকে নির্দিষ্ট দৈর্ঘ্যের কোড ওয়ার্ড দেয়, এবং আগে থেকে সম্ভাবনা জানার দরকার হয় না। কাজ চলতে চলতে একটি ডিকশনারি তৈরি হয়। শুরুতে ৮ বিট প্রতি পিক্সেলের জন্য ০ থেকে ২৫৫ এন্ট্রিগুলো গ্রে লেভেল নিজেই।"},
 {k:0,fx:(svg,_)=>{const L=_.rows.map((r,i)=>[700,()=>{_.tb.clear();_.tb.hl(i);_.tb.cells[i].forEach(c=>c.t.style.opacity=1);_.M.clear("a");if(i<16)_.M.cls(i/4|0,i%4,"a");
     $$(svg,"#lz-o").textContent="output so far: "+_.rows.slice(0,i+1).map(x=>x[2]).filter(x=>x!=="").join(" ")}]);
   L.reset=()=>{_.tb.clear();_.M.clear("a");_.tb.cells.forEach(row=>row.forEach(c=>c.t.style.opacity=0))};return seq(L,true,3000)},
   en:"Read the pixels in order, keeping a currently recognised sequence. If the sequence plus the next pixel is already in the dictionary, extend it. If not, output the code for the current sequence, add the new sequence to the dictionary, and start again from the new pixel. So 39 39 becomes entry 256, 39 126 becomes 257, and later repeats are sent as single codes like 256 and 260.",
   bn:"পিক্সেলগুলো ক্রমানুসারে পড়ো, আর একটি বর্তমান চেনা ক্রম মনে রাখো। ক্রম যোগ পরের পিক্সেল যদি আগে থেকেই ডিকশনারিতে থাকে, তাহলে ক্রমটি বাড়াও। না থাকলে বর্তমান ক্রমের কোড আউটপুট দাও, নতুন ক্রমটি ডিকশনারিতে যোগ করো, এবং নতুন পিক্সেল থেকে আবার শুরু করো। তাই ৩৯ ৩৯ হয় এন্ট্রি ২৫৬, ৩৯ ১২৬ হয় ২৫৭, আর পরে পুনরাবৃত্তিগুলো ২৫৬ ও ২৬০-এর মতো একটি কোডে পাঠানো হয়।"},
 {k:0,fx:(svg,_)=>{_.tb.clear();_.tb.cells.forEach(row=>row.forEach(c=>c.t.style.opacity=1));$$(svg,"#lz-o").textContent="encoded: "+_.rows.map(x=>x[2]).filter(x=>x!=="").join(" ")+"  (10 codes for 16 pixels)"},
   en:"The 16 pixels are sent as 10 codes. The decoder rebuilds the same dictionary while decoding, so the dictionary itself never needs to be transmitted.",
   bn:"১৬টি পিক্সেল পাঠানো হয় ১০টি কোডে। ডিকোডার ডিকোড করার সময় একই ডিকশনারি নিজেই তৈরি করে নেয়, তাই ডিকশনারি পাঠানোর দরকার হয় না।"}
],
points:[{en:"LZW: fixed-length codes for variable-length sequences; reduces <b>interpixel</b> redundancy; no probabilities needed.",bn:"LZW: পরিবর্তনশীল দৈর্ঘ্যের ক্রমের জন্য নির্দিষ্ট দৈর্ঘ্যের কোড; <b>ইন্টারপিক্সেল</b> রিডান্ড্যান্সি কমায়; সম্ভাবনা লাগে না।"},{en:"Example output: 39 39 126 126 256 258 260 259 257 126.",bn:"উদাহরণের আউটপুট: ৩৯ ৩৯ ১২৬ ১২৬ ২৫৬ ২৫৮ ২৬০ ২৫৯ ২৫৭ ১২৬।"}]},
/* 8 */
{id:"rle",slides:"36–38",title:{en:"Run-length coding",bn:"রান-লেংথ কোডিং"},
svg:`<g data-scene="s"><g data-s="0"><g id="rl-s"></g></g></g><g data-scene="b"><g data-s="0"><g id="rl-b"></g></g></g><g data-scene="g"><g data-s="0"><g id="rl-g"></g></g></g>`,
init(svg,_){const s=$$(svg,"#rl-s");const str="111110000001";_.S=mat(s,{x:110,y:110,cs:48,data:[str.split("")]});[[0,5,"(1,5)"],[5,6,"(0,6)"],[11,1,"(1,1)"]].forEach(([a,n,t],i)=>{el(s,"rect",{x:110+a*48,y:170,width:n*48,height:8,rx:4,class:i%2?"hbar":"hbar2"});txt(s,110+(a+n/2)*48,206,t,"c mono am")});
  txt(s,110,290,"aaabbbbbbcc  →  (a,3) (b,6) (c,2)","mono lg");txt(s,110,340,"encodes each run as (symbol, count)","dim sm");
  const B=[[0,0,0,0,0],[0,0,0,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]];const m=mat($$(svg,"#rl-b"),{x:60,y:80,cs:52,data:B});B.forEach((r,i)=>r.forEach((v,j)=>v&&m.cls(i,j,"w")));
  ["(0,5)","(0,3), (1,2)","(1,5)","(1,5)","(1,5)"].forEach((t,i)=>txt($$(svg,"#rl-b"),360,112+i*52,`row ${i+1}: ${t}`,"mono"));txt($$(svg,"#rl-b"),60,400,"6 vectors × (3 bits for length + 1 bit for pixel) = 24 bits","mono am");
  const G=[[1,1,1,1],[1,2,2,2],[2,4,4,4],[5,6,7,7]];mat($$(svg,"#rl-g"),{x:60,y:80,cs:56,data:G});
  txt($$(svg,"#rl-g"),340,120,"RLC = (1,5) (2,4) (4,3) (5,1) (6,1) (7,2)","mono");txt($$(svg,"#rl-g"),340,170,"binary: (001,101) (010,100) (100,011)","mono sm");txt($$(svg,"#rl-g"),340,196,"(101,001) (110,001) (111,010)","mono sm");
  txt($$(svg,"#rl-g"),340,260,"6 pairs × (3 + 3) bits = 36 bits","mono am lg");txt($$(svg,"#rl-g"),340,296,"original: 16 pixels × 3 bits = 48 bits","mono dim")},
steps:[
 {scene:"s",k:0,en:"Run-length coding reduces the size of a repeating string of symbols. Each run is encoded as a pair: the symbol and its count. So 1 1 1 1 1, 0 0 0 0 0 0, 1 becomes 1 five, 0 six, 1 one. It can compress any type of data, but cannot reach the high ratios of other methods.",
   bn:"রান-লেংথ কোডিং পুনরাবৃত্ত প্রতীকের স্ট্রিংয়ের আকার কমায়। প্রতিটি রান একটি জোড়া হিসেবে এনকোড হয়: প্রতীক ও তার সংখ্যা। তাই ১ ১ ১ ১ ১, ০ ০ ০ ০ ০ ০, ১ হয়ে যায় ১ পাঁচটি, ০ ছয়টি, ১ একটি। এটি যেকোনো ধরনের ডেটা কমপ্রেস করতে পারে, তবে অন্য পদ্ধতির মতো বেশি অনুপাত পায় না।"},
 {scene:"b",k:0,en:"Run-length coding reduces interpixel redundancy and works well for binary images. This 5 by 5 image becomes six run vectors. With 3 bits for the length and 1 bit for the pixel value, that is 24 bits.",
   bn:"রান-লেংথ কোডিং ইন্টারপিক্সেল রিডান্ড্যান্সি কমায় এবং বাইনারি ইমেজে ভালো কাজ করে। এই ৫ বাই ৫ ইমেজটি ছয়টি রান ভেক্টরে পরিণত হয়। দৈর্ঘ্যের জন্য ৩ বিট আর পিক্সেলের মানের জন্য ১ বিট নিলে মোট ২৪ বিট।"},
 {scene:"g",k:0,en:"For a gray image, scan the pixels in order: five 1s, four 2s, three 4s, one 5, one 6 and two 7s. That is six pairs. With 3 bits for each value and 3 bits for each count, the total is 36 bits, compared with 48 bits for the original 16 pixels at 3 bits each.",
   bn:"গ্রে ইমেজে পিক্সেলগুলো ক্রমানুসারে পড়ো: পাঁচটি ১, চারটি ২, তিনটি ৪, একটি ৫, একটি ৬ এবং দুটি ৭। অর্থাৎ ছয়টি জোড়া। প্রতিটি মানের জন্য ৩ বিট ও প্রতিটি সংখ্যার জন্য ৩ বিট নিলে মোট ৩৬ বিট, যেখানে মূল ১৬টি পিক্সেলে প্রতিটি ৩ বিট করে লাগত ৪৮ বিট।"}
],
points:[{en:"Each run → (symbol, count). Good for binary images; reduces interpixel redundancy.",bn:"প্রতিটি রান → (প্রতীক, সংখ্যা)। বাইনারি ইমেজে ভালো; ইন্টারপিক্সেল রিডান্ড্যান্সি কমায়।"},{en:"Gray example: (1,5)(2,4)(4,3)(5,1)(6,1)(7,2) = 36 bits vs 48.",bn:"গ্রে উদাহরণ: (১,৫)(২,৪)(৪,৩)(৫,১)(৬,১)(৭,২) = ৩৬ বিট বনাম ৪৮।"}]}
],
quiz:[
 {q:{en:"Compression ratio for n₁ = 100, n₂ = 10?",bn:"n₁ = ১০০, n₂ = ১০ হলে কমপ্রেশন অনুপাত?"},o:[{en:"0.1",bn:"০.১"},{en:"10 : 1",bn:"১০ : ১"},{en:"90 : 1",bn:"৯০ : ১"},{en:"1 : 10",bn:"১ : ১০"}],a:1,w:{en:"C = n₁/n₂ = 10.",bn:"C = n₁/n₂ = ১০।"}},
 {q:{en:"Which encoder stage is irreversible?",bn:"এনকোডারের কোন ধাপ অপরিবর্তনীয়?"},o:[{en:"Mapper",bn:"ম্যাপার"},{en:"Quantizer",bn:"কোয়ান্টাইজার"},{en:"Symbol coder",bn:"সিম্বল কোডার"},{en:"Symbol decoder",bn:"সিম্বল ডিকোডার"}],a:1,w:{en:"It is omitted for lossless compression.",bn:"লসলেস কমপ্রেশনে এটি বাদ দেওয়া হয়।"}},
 {q:{en:"Huffman coding mainly reduces…",bn:"হাফম্যান কোডিং মূলত কমায়…"},o:[{en:"coding redundancy",bn:"কোডিং রিডান্ড্যান্সি"},{en:"interpixel redundancy",bn:"ইন্টারপিক্সেল রিডান্ড্যান্সি"},{en:"psycho-visual redundancy",bn:"সাইকো-ভিজুয়াল রিডান্ড্যান্সি"},{en:"image size in pixels",bn:"পিক্সেলে ইমেজের সাইজ"}],a:0,w:{en:"It does not use interpixel redundancy.",bn:"এটি ইন্টারপিক্সেল রিডান্ড্যান্সি ব্যবহার করে না।"}},
 {q:{en:"Average Huffman code length in the slide example?",bn:"স্লাইডের উদাহরণে হাফম্যানের গড় কোড দৈর্ঘ্য?"},o:[{en:"1.81 bits",bn:"১.৮১ বিট"},{en:"2.2 bits",bn:"২.২ বিট"},{en:"3 bits",bn:"৩ বিট"},{en:"8 bits",bn:"৮ বিট"}],a:1,w:{en:"0.4(1)+0.3(2)+0.1(3)+0.1(4)+0.06(5)+0.04(5) = 2.2.",bn:"০.৪(১)+০.৩(২)+০.১(৩)+০.১(৪)+০.০৬(৫)+০.০৪(৫) = ২.২।"}},
 {q:{en:"Arithmetic coding of a1 a2 a3 a3 a4 ends in…",bn:"a1 a2 a3 a3 a4-এর অ্যারিথমেটিক কোডিং শেষ হয়…"},o:[{en:"[0.04, 0.08)",bn:"[০.০৪, ০.০৮)"},{en:"[0.06752, 0.0688)",bn:"[০.০৬৭৫২, ০.০৬৮৮)"},{en:"[0.8, 1.0)",bn:"[০.৮, ১.০)"},{en:"[0, 0.2)",bn:"[০, ০.২)"}],a:1,w:{en:"Any value inside, e.g. 0.068, represents the message.",bn:"ভেতরের যেকোনো মান, যেমন ০.০৬৮, বার্তাটি বোঝায়।"}},
 {q:{en:"LZW initially assigns entries 0–255 to…",bn:"LZW শুরুতে ০–২৫৫ এন্ট্রি দেয়…"},o:[{en:"the gray levels",bn:"গ্রে লেভেলগুলোকে"},{en:"pairs of pixels",bn:"পিক্সেলের জোড়াকে"},{en:"run lengths",bn:"রান লেংথকে"},{en:"Huffman codes",bn:"হাফম্যান কোডকে"}],a:0,w:{en:"New sequences start at 256.",bn:"নতুন ক্রম শুরু হয় ২৫৬ থেকে।"}},
 {q:{en:"Run-length coding of 111110000001 is…",bn:"১১১১১০০০০০০১-এর রান-লেংথ কোডিং…"},o:[{en:"(1,5)(0,6)(1,1)",bn:"(১,৫)(০,৬)(১,১)"},{en:"(5,1)(6,0)(1,1)",bn:"(৫,১)(৬,০)(১,১)"},{en:"(1,6)(0,5)(1,1)",bn:"(১,৬)(০,৫)(১,১)"},{en:"(1,12)",bn:"(১,১২)"}],a:0,w:{en:"Pairs of (symbol, count).",bn:"(প্রতীক, সংখ্যা) জোড়া।"}}
]});
})();
