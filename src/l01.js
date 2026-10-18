/* ===== Lecture 01 · Introduction to DIP ===== */
(()=>{
const lowC=I=>mapI(I,v=>.38+.24*v), stretch=I=>{let lo=1,hi=0;for(const v of I.a){lo=Math.min(lo,v);hi=Math.max(hi,v)}return mapI(I,v=>(v-lo)/(hi-lo))};
const blockify=(I,b)=>{const o=cloneI(I);for(let y=0;y<I.h;y+=b)for(let x=0;x<I.w;x+=b){let s=0,n=0;for(let j=0;j<b;j++)for(let i=0;i<b;i++)if(y+j<I.h&&x+i<I.w){s+=I.a[(y+j)*I.w+x+i];n++}for(let j=0;j<b;j++)for(let i=0;i<b;i++)if(y+j<I.h&&x+i<I.w)o.a[(y+j)*I.w+x+i]=s/n}return o};

lecture({id:"l01",no:"01",title:{en:"Introduction to Digital Image Processing",bn:"ডিজিটাল ইমেজ প্রসেসিং পরিচিতি"},book:{en:"Ch. 1 · Introduction",bn:"চ্যাপ্টার ১ · পরিচিতি"},
chapters:[
/* 1 */
{id:"what",slides:"2–4",title:{en:"What is an image? What is DIP?",bn:"ইমেজ কী? DIP কী?"},
svg:`
<g data-scene="proj"><g data-s="0">
  <text class="h" x="30" y="40">3-D SCENE</text>
  ${SUN(100,92)}
  <ellipse cx="190" cy="328" rx="160" ry="18" class="plane"/>
  <polygon points="110,230 200,230 200,320 110,320" style="fill:#5C7391"/>
  <polygon points="110,230 140,205 230,205 200,230" style="fill:#7F96B5"/>
  <polygon points="200,230 230,205 230,295 200,320" style="fill:#3F536D"/>
  <rect x="275" y="268" width="12" height="54" style="fill:#6B4F3A"/><circle cx="281" cy="250" r="30" style="fill:#3F8F5A"/>
  <line class="ray" x1="200" y1="232" x2="462" y2="214" marker-end="url(#ah)"/>
  <line class="ray" x1="290" y1="246" x2="462" y2="222" marker-end="url(#ah)"/>
  <line class="ray" x1="120" y1="104" x2="462" y2="208" marker-end="url(#ah)"/>
  <rect class="dev" x="470" y="194" width="62" height="52" rx="8"/><circle class="lens" cx="470" cy="220" r="12"/>
  <text x="501" y="270" class="c sm">Camera</text>
  <line class="arrw" x1="540" y1="220" x2="582" y2="220" marker-end="url(#ahw)"/>
  <g id="w-frame"></g>
  <text class="h" x="596" y="40">2-D IMAGE</text>
</g></g>
<g data-scene="rep"><g data-s="0">
  <text class="h" x="30" y="40">AN IMAGE REPRESENTS SOMETHING OR SOMEONE</text>
  <g id="w-rep"></g>
  <text class="dim c" x="400" y="404">Drawings, paintings and photographs are all images</text>
</g></g>
<g data-scene="dip">
 <g data-s="0">
  <rect class="boxa" x="70" y="56" width="190" height="60" rx="10"/><text class="lg c" x="165" y="94">Digital</text>
  <rect class="boxa" x="305" y="56" width="190" height="60" rx="10"/><text class="lg c" x="400" y="94">Image</text>
  <rect class="boxa" x="540" y="56" width="190" height="60" rx="10"/><text class="lg c" x="635" y="94">Processing</text>
  <text class="c am" x="400" y="160">Processing a digital image by a digital computer</text>
 </g>
 <g data-s="1"><text class="dim" x="40" y="214">Motivation 1 · improve pictorial information</text><g id="w-m1"></g></g>
 <g data-s="2"><text class="dim" x="430" y="214">Motivation 2 · efficient storage and transmission</text>
  <rect class="dev" x="440" y="250" width="60" height="44" rx="5"/><rect class="dev" x="700" y="250" width="60" height="44" rx="5"/>
  <line class="rail" x1="500" y1="272" x2="700" y2="272"/><circle id="w-pk" cx="510" cy="272" r="8" class="spot"/>
  <text class="sm" x="440" y="340">Original</text><rect class="track" x="520" y="327" width="240" height="16" rx="8"/><rect class="bar" x="520" y="327" width="240" height="16" rx="8"/>
  <text class="sm" x="440" y="376">Compressed</text><rect class="track" x="520" y="363" width="240" height="16" rx="8"/><rect id="w-cb" class="bar" x="520" y="363" width="240" height="16" rx="8"/>
 </g>
</g>`,
init(svg,_){const f=img2($$(svg,"#w-frame"),596,120,180,200);f.src(land(180,200));
  const r=$$(svg,"#w-rep");const a=img2(r,110,90,250,260,"Black and white");a.src(land(250,260,"gray"));const b=img2(r,440,90,250,260,"Colour");b.src(land(250,260));
  const m=$$(svg,"#w-m1");const sc=gen("scene");const n1=img2(m,60,236,150,150,"Noisy");n1.show(noiseG(sc,.12));arrow(m,222,311,262,311);
  const n2=img2(m,272,236,150,150,"Improved");n2.show(rankF(noiseG(sc,.12),1,"med"))},
steps:[
 {scene:"proj",k:0,en:"An image is the projection of a three-dimensional scene onto a two-dimensional plane. The camera collects light from the scene and flattens it into a picture.",
   bn:"ইমেজ হলো একটি ত্রিমাত্রিক দৃশ্যের দ্বিমাত্রিক তলের উপর প্রজেকশন। ক্যামেরা দৃশ্য থেকে আলো সংগ্রহ করে সেটিকে একটি সমতল ছবিতে পরিণত করে।"},
 {scene:"rep",k:0,en:"More generally, an image is a representation of something or someone, such as a drawing, a painting or a photograph. It may be black and white, or colour.",
   bn:"আরও সাধারণভাবে বললে, ইমেজ হলো কোনো কিছু বা কারও প্রতিরূপ, যেমন আঁকা ছবি, পেইন্টিং বা ফটোগ্রাফ। এটি সাদা-কালো হতে পারে, আবার রঙিনও হতে পারে।"},
 {scene:"dip",k:0,en:"Digital image processing means processing an image that is digital in nature, using a digital computer.",
   bn:"ডিজিটাল ইমেজ প্রসেসিং মানে হলো ডিজিটাল প্রকৃতির একটি ইমেজকে ডিজিটাল কম্পিউটার দিয়ে প্রসেস করা।"},
 {scene:"dip",k:1,en:"Why do we do it? First, to improve pictorial information for people. Here, a noisy picture becomes much cleaner.",
   bn:"কেন আমরা এটি করি? প্রথমত, মানুষের জন্য ছবির তথ্যকে আরও উন্নত করতে। এখানে একটি নয়েজযুক্ত ছবি অনেক পরিষ্কার হয়ে গেছে।"},
 {scene:"dip",k:2,fx:svg=>{const pk=$$(svg,"#w-pk"),cb=$$(svg,"#w-cb");return rafLoop(t=>{const p=(t*.5)%1;pk.setAttribute("cx",510+180*p);cb.setAttribute("width",240-200*Math.min(1,t/1.5))})},
   en:"Second, for efficient storage and transmission. A processed, compressed image takes less space and travels faster over a network.",
   bn:"দ্বিতীয়ত, দক্ষভাবে সংরক্ষণ ও পাঠানোর জন্য। প্রসেস করে কমপ্রেস করা ইমেজ কম জায়গা নেয় এবং নেটওয়ার্কে দ্রুত পাঠানো যায়।"}
],
points:[
 {en:"An image is the <b>projection of a 3-D scene onto a 2-D plane</b>; more broadly, a representation of something or someone.",bn:"ইমেজ হলো <b>ত্রিমাত্রিক দৃশ্যের দ্বিমাত্রিক তলে প্রজেকশন</b>; আরও বিস্তৃতভাবে, কোনো কিছুর প্রতিরূপ।"},
 {en:"<b>DIP</b>: processing of an image which is digital in nature, by a digital computer.",bn:"<b>DIP</b>: ডিজিটাল প্রকৃতির ইমেজকে ডিজিটাল কম্পিউটার দিয়ে প্রসেস করা।"},
 {en:"Motivation: <b>improvement of pictorial information</b> and <b>efficient storage and transmission</b>.",bn:"উদ্দেশ্য: <b>ছবির তথ্যের উন্নতি</b> এবং <b>দক্ষ সংরক্ষণ ও প্রেরণ</b>।"}
]},

/* 2 */
{id:"digital",slides:"5–8",title:{en:"Digital image, pixels and gray levels",bn:"ডিজিটাল ইমেজ, পিক্সেল ও গ্রে লেভেল"},
svg:`
<g data-s="0">
  <g id="d-img"></g>
  <line class="arrw" x1="60" y1="82" x2="330" y2="82" marker-end="url(#ahw)"/><text class="sm" x="292" y="72">y</text>
  <line class="arrw" x1="44" y1="96" x2="44" y2="360" marker-end="url(#ahw)"/><text class="sm" x="28" y="352">x</text>
  <text class="sm dim" x="52" y="72">(0,0)</text>
  <text class="mono" x="420" y="60">f(x, y) = intensity or gray level</text>
</g>
<g data-s="1">
  <rect id="d-zoom" class="kbox" x="60" y="96" width="16" height="16"/>
  <line id="d-l1" class="lead" x1="76" y1="96" x2="420" y2="96"/><line id="d-l2" class="lead" x1="76" y1="112" x2="420" y2="368"/>
  <g id="d-mat"></g>
  <text class="dim c sm" x="556" y="392">pixels · picture elements · image elements · pels</text>
</g>
<g data-s="2"><g id="d-idx"></g>
  <text class="mono c am" x="556" y="424">total pixels = rows × columns   e.g. 1024 × 768 = 786,432</text></g>
<g data-s="3">
  <defs><linearGradient id="d-gr"><stop offset="0" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient></defs>
  <rect x="60" y="384" width="256" height="18" fill="url(#d-gr)" class="frame"/>
  <text class="xs mono" x="60" y="420">0 black</text><text class="xs mono e" x="316" y="420">255 white (8-bit)</text>
</g>`,
init(svg,_){const I=gen("scene",128);_.I=I;const im=imgEl($$(svg,"#d-img"),60,96,256,256);im.show(I);
  _.M=mat($$(svg,"#d-mat"),{x:420,y:96,cs:34,fs:12,data:Array.from({length:8},()=>Array(8).fill(0))});
  const g=$$(svg,"#d-idx");for(let i=0;i<8;i++){txt(g,410,96+i*34+21,String(i),"dim xs mono e");txt(g,420+i*34+17,90,String(i),"dim xs mono c")}
  _.at=(px,py)=>{$$(svg,"#d-zoom").setAttribute("x",60+px*2);$$(svg,"#d-zoom").setAttribute("y",96+py*2);
    $$(svg,"#d-l1").setAttribute("x1",60+px*2+16);$$(svg,"#d-l1").setAttribute("y1",96+py*2);$$(svg,"#d-l2").setAttribute("x1",60+px*2+16);$$(svg,"#d-l2").setAttribute("y1",96+py*2+16);
    for(let r=0;r<8;r++)for(let c=0;c<8;c++){const v=I.a[(py+r)*128+px+c];_.M.set(r,c,Math.round(v*255));_.M.gray(r,c,v)}};_.at(30,20)},
steps:[
 {k:0,en:"A digital image is a two-dimensional function, f of x and y. Here x and y are spatial coordinates, and the value of f at any point is called the intensity, or gray level.",
   bn:"ডিজিটাল ইমেজ হলো একটি দ্বিমাত্রিক ফাংশন f(x, y)। এখানে x ও y হলো স্থানাঙ্ক, আর যেকোনো বিন্দুতে f-এর মানকে বলে ইনটেনসিটি বা গ্রে লেভেল।"},
 {k:1,fx:(svg,_)=>{const P=[[30,20],[104,28],[30,80],[86,96],[55,60]];let i=0;return every(2600,()=>{_.at(...P[i%P.length]);i++})},
   en:"When x, y and f are all finite and discrete, the image is digital. Zoom in and it is just a grid of numbers. Each element is called a pixel, picture element, image element, or pel.",
   bn:"যখন x, y এবং f সবগুলোই সসীম ও বিচ্ছিন্ন মান, তখন ইমেজটি ডিজিটাল। জুম করলে দেখা যায় এটি আসলে সংখ্যার একটি গ্রিড। প্রতিটি উপাদানকে বলে পিক্সেল, পিকচার এলিমেন্ট, ইমেজ এলিমেন্ট বা পেল।"},
 {k:2,en:"Pixels are arranged in rows and columns. The total number of pixels is rows times columns. A pixel is the smallest element of an image on a display.",
   bn:"পিক্সেলগুলো সারি ও কলামে সাজানো থাকে। মোট পিক্সেল সংখ্যা হলো সারি গুণ কলাম। ডিসপ্লেতে ইমেজের সবচেয়ে ছোট একক হলো পিক্সেল।"},
 {k:3,en:"The minimum gray level is zero, which is black. The maximum depends on the image depth. In an 8-bit image it is 255, which is white. A binary image uses only two values.",
   bn:"সর্বনিম্ন গ্রে লেভেল হলো শূন্য, অর্থাৎ কালো। সর্বোচ্চ মান নির্ভর করে ইমেজের ডেপথের উপর। ৮-বিট ইমেজে এটি ২৫৫, অর্থাৎ সাদা। বাইনারি ইমেজে মাত্র দুটি মান থাকে।"}
],
points:[
 {en:"A digital image is a 2-D function <b>f(x,y)</b>; x, y and f are all <b>finite and discrete</b>.",bn:"ডিজিটাল ইমেজ একটি দ্বিমাত্রিক ফাংশন <b>f(x,y)</b>; x, y ও f সবই <b>সসীম ও বিচ্ছিন্ন</b>।"},
 {en:"Elements are called <b>pixels</b>, pels, picture elements or image elements. Total pixels = rows × columns.",bn:"উপাদানগুলোকে <b>পিক্সেল</b>, পেল, পিকচার এলিমেন্ট বা ইমেজ এলিমেন্ট বলে। মোট পিক্সেল = সারি × কলাম।"},
 {en:"Gray level starts at <b>0</b>; for an 8-bit image the maximum is <b>255</b>.",bn:"গ্রে লেভেল শুরু হয় <b>০</b> থেকে; ৮-বিট ইমেজে সর্বোচ্চ <b>২৫৫</b>।"}
]},

/* 3 */
{id:"size",slides:"9",title:{en:"Bits per pixel and image size",bn:"বিটস পার পিক্সেল ও ইমেজের সাইজ"},
svg:`
<g data-s="0">
  <g id="z-grid"></g>
  <line class="arrw" x1="270" y1="145" x2="330" y2="145" marker-end="url(#ahw)"/>
  <g id="z-bits"></g>
  <text class="dim" x="340" y="200">one pixel stored with k bits</text>
  <text class="mono" x="340" y="240">1 bit   →  2 levels (binary)</text>
  <text class="mono" x="340" y="268">8 bits  →  256 gray levels</text>
  <text class="mono" x="340" y="296">24 bits →  16,777,216 colours</text>
</g>
<g data-s="1">
  <text class="lg c am" x="400" y="356">size = rows × columns × bits per pixel</text>
</g>
<g data-s="2">
  <text class="mono c" x="400" y="398">1024 × 1024 × 8 = 8,388,608 bits = 1,048,576 bytes = 1 MB</text>
</g>`,
init(svg,_){const g=$$(svg,"#z-grid");_.M=mat(g,{x:60,y:90,cs:48,data:[[52,90,140,201],[60,120,180,230],[30,77,160,250],[10,45,99,170]],fs:13});
  for(let r=0;r<4;r++)for(let c=0;c<4;c++)_.M.gray(r,c,_.M.data[r][c]/255);
  _.B=mat($$(svg,"#z-bits"),{x:340,y:122,cs:44,data:[[1,0,1,1,0,1,0,0]]});_.M.cls(0,0,"a")},
steps:[
 {k:0,fx:(svg,_)=>{let i=0;return every(1100,()=>{const r=(i/4|0)%4,c=i%4;_.M.clear("a");_.M.cls(r,c,"a");const v=_.M.data[r][c];v.toString(2).padStart(8,"0").split("").forEach((b,j)=>_.B.set(0,j,b));i++})},
   en:"Bits per pixel, or BPP, is the number of bits used to store each pixel. It depends on the colour depth. One bit gives two levels, eight bits give 256 gray levels, and 24 bits give over 16 million colours.",
   bn:"বিটস পার পিক্সেল বা BPP হলো প্রতিটি পিক্সেল সংরক্ষণে কতগুলো বিট লাগে। এটি কালার ডেপথের উপর নির্ভর করে। এক বিটে দুটি লেভেল, আট বিটে ২৫৬টি গ্রে লেভেল, আর ২৪ বিটে ১ কোটি ৬০ লক্ষের বেশি রং পাওয়া যায়।"},
 {k:1,en:"The size of an image depends on three things: the number of rows, the number of columns, and the number of bits per pixel.",
   bn:"একটি ইমেজের সাইজ তিনটি জিনিসের উপর নির্ভর করে: সারির সংখ্যা, কলামের সংখ্যা এবং প্রতি পিক্সেলে বিটের সংখ্যা।"},
 {k:2,en:"For example, a 1024 by 1024 image with 8 bits per pixel needs about 8.4 million bits. That is one megabyte. Try other sizes in the calculator below.",
   bn:"যেমন, ১০২৪ বাই ১০২৪ সাইজের ৮-বিট ইমেজে প্রায় ৮৪ লক্ষ বিট লাগে, অর্থাৎ এক মেগাবাইট। নিচের ক্যালকুলেটরে অন্য সাইজ দিয়ে চেষ্টা করো।"}
],
panel:()=>`<h3>${tr({en:"Image size calculator",bn:"ইমেজ সাইজ ক্যালকুলেটর"})}</h3>
 <div class="prow"><label>${tr({en:"Rows",bn:"সারি"})} <input type="range" id="zr" min="64" max="4096" step="64" value="1024"><output id="zro"></output></label>
 <label>${tr({en:"Columns",bn:"কলাম"})} <input type="range" id="zc" min="64" max="4096" step="64" value="1024"><output id="zco"></output></label></div>
 <div class="prow"><label>BPP <select id="zb"><option>1</option><option selected>8</option><option>16</option><option>24</option></select></label></div>
 <div class="eq" id="zout"></div>`,
bind(root){const f=()=>{const r=+root.querySelector("#zr").value,c=+root.querySelector("#zc").value,b=+root.querySelector("#zb").value;
  root.querySelector("#zro").textContent=r;root.querySelector("#zco").textContent=c;const bits=r*c*b;
  root.querySelector("#zout").innerHTML=`${r} × ${c} × ${b} = <b>${bits.toLocaleString("en-US")}</b> bits = ${(bits/8).toLocaleString("en-US")} bytes ≈ <b>${(bits/8/1048576).toFixed(2)} MB</b>`};
  root.querySelectorAll("input,select").forEach(e=>e.oninput=e.onchange=f);f()},
points:[
 {en:"<b>BPP</b> (bits per pixel) depends on the depth of colour.",bn:"<b>BPP</b> (বিটস পার পিক্সেল) কালার ডেপথের উপর নির্ভর করে।"},
 {en:"Image size depends on the <b>number of rows</b>, <b>number of columns</b> and <b>bits per pixel</b>.",bn:"ইমেজের সাইজ নির্ভর করে <b>সারির সংখ্যা</b>, <b>কলামের সংখ্যা</b> ও <b>বিটস পার পিক্সেলের</b> উপর।"}
]},

/* 4 */
{id:"process",slides:"10–12",title:{en:"Image processing: steps, purposes and levels",bn:"ইমেজ প্রসেসিং: ধাপ, উদ্দেশ্য ও স্তর"},
svg:`
<g data-scene="pipe"><g data-s="0">
  <text class="dim c" x="400" y="80">Input: an image  →  Output: an image, or characteristics of that image</text>
  <rect class="boxa" x="40" y="160" width="200" height="90" rx="10"/><text class="c" x="140" y="198">1 · Import</text><text class="c dim sm" x="140" y="222">via an acquisition tool</text>
  <rect class="boxa" x="300" y="160" width="200" height="90" rx="10"/><text class="c" x="400" y="198">2 · Analyse</text><text class="c dim sm" x="400" y="222">and manipulate</text>
  <rect class="boxa" x="560" y="160" width="200" height="90" rx="10"/><text class="c" x="660" y="198">3 · Output</text><text class="c dim sm" x="660" y="222">altered image or report</text>
  <line class="arrw" x1="244" y1="205" x2="296" y2="205" marker-end="url(#ahw)"/><line class="arrw" x1="504" y1="205" x2="556" y2="205" marker-end="url(#ahw)"/>
  <circle id="p-dot" cx="40" cy="290" r="8" class="spot"/><line class="rail" x1="40" y1="290" x2="760" y2="290"/>
  <text class="dim c sm" x="400" y="340">a type of signal processing: the input is an image</text>
</g></g>
<g data-scene="purpose"><g data-s="0" id="p-cards"></g></g>
<g data-scene="levels">
 <g data-s="0"><rect class="boxa" x="30" y="70" width="230" height="300" rx="12"/><text class="c lg" x="145" y="104">Low level</text>
  <text class="c mono sm" x="145" y="134">image → image</text><g id="lv1"></g><text class="c dim sm" x="145" y="340">noise removal, sharpening</text></g>
 <g data-s="1"><rect class="boxb" x="285" y="70" width="230" height="300" rx="12"/><text class="c lg" x="400" y="104">Mid level</text>
  <text class="c mono sm" x="400" y="134">image → attributes</text><g id="lv2"></g><text class="c dim sm" x="400" y="340">segmentation, recognition</text></g>
 <g data-s="2"><line x1="528" y1="60" x2="528" y2="400" class="hl"/><text class="am c sm" x="528" y="420">In this course we stop here</text>
  <rect class="box" x="540" y="70" width="230" height="300" rx="12" style="opacity:.55"/><text class="c lg" x="655" y="104">High level</text>
  <text class="c mono sm" x="655" y="134">attributes → understanding</text><text class="c dim sm" x="655" y="230">scene understanding</text><text class="c dim sm" x="655" y="254">autonomous navigation</text></g>
</g>`,
init(svg,_){const c=$$(svg,"#p-cards");const P=[["Visualization","see objects that","are not visible"],["Sharpening and","restoration","create a better image"],["Retrieval","seek the image","of interest"],["Measurement","of pattern","measure objects"],["Recognition","distinguish the","objects in an image"]];
  txt(c,400,60,"Five purposes of image processing","dim c");
  P.forEach((p,i)=>{const x=20+i*154;const g=el(c,"g",{class:"pop",style:`animation-delay:${i*.35}s`});el(g,"rect",{x,y:110,width:142,height:210,rx:10,class:i%2?"boxb":"boxa"});
    txt(g,x+71,230,p[0],"c sm");txt(g,x+71,250,p[1],"c sm");txt(g,x+71,290,p[2],"c dim xs");
    const cx=x+71,cy=165;if(i===0){el(g,"ellipse",{cx,cy,rx:30,ry:16,class:"lens2"});el(g,"circle",{cx,cy,r:8,class:"src"})}
    if(i===1){for(let k=0;k<4;k++)el(g,"line",{x1:cx,y1:cy,x2:cx+26*Math.cos(k*1.57),y2:cy+26*Math.sin(k*1.57),class:"beam"});el(g,"circle",{cx,cy,r:7,class:"spot"})}
    if(i===2){el(g,"circle",{cx:cx-6,cy:cy-6,r:16,class:"wire"});el(g,"line",{x1:cx+6,y1:cy+6,x2:cx+22,y2:cy+22,class:"wire",style:"stroke-width:4"})}
    if(i===3){el(g,"rect",{x:cx-30,y:cy-8,width:60,height:16,class:"dev"});for(let k=0;k<6;k++)el(g,"line",{x1:cx-25+k*10,y1:cy-8,x2:cx-25+k*10,y2:cy,class:"wire"})}
    if(i===4){el(g,"path",{d:`M${cx-24} ${cy-14}h32l16 14-16 14h-32z`,class:"boxa"});el(g,"circle",{cx:cx-14,cy,r:4,class:"node"})}});
  const sc=gen("scene",96);const a=img2($$(svg,"#lv1"),60,150,80,80);a.show(noiseG(sc,.15));const b=img2($$(svg,"#lv1"),150,150,80,80);b.show(rankF(noiseG(sc,.15),1,"med"));
  const c2=img2($$(svg,"#lv2"),315,150,80,80);c2.show(sc);const d=img2($$(svg,"#lv2"),405,150,80,80);d.show(mapI(sc,v=>v>.7?1:0))},
steps:[
 {scene:"pipe",k:0,fx:svg=>{const d=$$(svg,"#p-dot");return rafLoop(t=>d.setAttribute("cx",40+720*((t*.25)%1)))},
   en:"Image processing converts an image into digital form and performs operations on it, to enhance it or to extract useful information. It has three steps: import the image, analyse and manipulate it, and produce an output.",
   bn:"ইমেজ প্রসেসিং একটি ইমেজকে ডিজিটাল রূপে এনে তার উপর বিভিন্ন অপারেশন চালায়, যাতে ইমেজটি উন্নত হয় বা দরকারি তথ্য বের করা যায়। এর তিনটি ধাপ: ইমেজ ইমপোর্ট করা, বিশ্লেষণ ও পরিবর্তন করা, এবং আউটপুট তৈরি করা।"},
 {scene:"purpose",k:0,en:"Its purposes fall into five groups. Visualization, to observe objects that are not visible. Sharpening and restoration, to create a better image. Retrieval, to seek the image of interest. Measurement of pattern. And recognition, to distinguish objects.",
   bn:"এর উদ্দেশ্যগুলো পাঁচ ভাগে ভাগ করা যায়। ভিজুয়ালাইজেশন, অর্থাৎ যা চোখে দেখা যায় না তা দেখা। শার্পেনিং ও রিস্টোরেশন, অর্থাৎ ভালো ইমেজ তৈরি। রিট্রিভাল, অর্থাৎ দরকারি ইমেজ খুঁজে বের করা। প্যাটার্ন মাপা। আর রিকগনিশন, অর্থাৎ বস্তু আলাদা করে চেনা।"},
 {scene:"levels",k:0,en:"From image processing to computer vision there are three levels. Low-level processes take an image and give an image, like noise removal or sharpening.",
   bn:"ইমেজ প্রসেসিং থেকে কম্পিউটার ভিশন পর্যন্ত তিনটি স্তর আছে। লো-লেভেল প্রসেসে ইনপুট ইমেজ, আউটপুটও ইমেজ, যেমন নয়েজ দূর করা বা শার্পেন করা।"},
 {scene:"levels",k:1,en:"Mid-level processes take an image and give attributes, like segmentation and object recognition.",
   bn:"মিড-লেভেল প্রসেসে ইনপুট ইমেজ, কিন্তু আউটপুট হলো অ্যাট্রিবিউট বা বৈশিষ্ট্য, যেমন সেগমেন্টেশন ও অবজেক্ট রিকগনিশন।"},
 {scene:"levels",k:2,en:"High-level processes turn attributes into understanding, such as scene understanding and autonomous navigation. In this course, we stop at the mid level.",
   bn:"হাই-লেভেল প্রসেস অ্যাট্রিবিউটকে বোঝাপড়ায় রূপ দেয়, যেমন দৃশ্য বোঝা বা স্বয়ংক্রিয় চলাচল। এই কোর্সে আমরা মিড-লেভেল পর্যন্ত পড়ব।"}
],
points:[
 {en:"Steps: <b>import</b> via an acquisition tool → <b>analyse and manipulate</b> → <b>output</b> (altered image or report).",bn:"ধাপ: অ্যাকুইজিশন টুল দিয়ে <b>ইমপোর্ট</b> → <b>বিশ্লেষণ ও পরিবর্তন</b> → <b>আউটপুট</b> (পরিবর্তিত ইমেজ বা রিপোর্ট)।"},
 {en:"Purposes: visualization, sharpening and restoration, retrieval, measurement of pattern, recognition.",bn:"উদ্দেশ্য: ভিজুয়ালাইজেশন, শার্পেনিং ও রিস্টোরেশন, রিট্রিভাল, প্যাটার্ন পরিমাপ, রিকগনিশন।"},
 {en:"Levels: <b>low</b> (image→image), <b>mid</b> (image→attributes), <b>high</b> (attributes→understanding).",bn:"স্তর: <b>লো</b> (ইমেজ→ইমেজ), <b>মিড</b> (ইমেজ→অ্যাট্রিবিউট), <b>হাই</b> (অ্যাট্রিবিউট→বোঝাপড়া)।"}
]},

/* 5 */
{id:"modes",slides:"13–17",title:{en:"Imaging environment and types of imaging",bn:"ইমেজিং পরিবেশ ও ইমেজিংয়ের ধরন"},
svg:`
<g id="m-r0"><text x="30" y="100" class="lg">Reflective</text>
  ${SUN(220,90)}<line class="ray" x1="244" y1="100" x2="360" y2="110" marker-end="url(#ah)"/>
  <rect x="368" y="80" width="64" height="44" rx="6" style="fill:#5C7391"/><line class="ray" x1="436" y1="104" x2="560" y2="100" marker-end="url(#ah)"/>
  <rect class="sbox" x="566" y="82" width="34" height="34" rx="4"/><text class="dim sm" x="620" y="96">cameras,</text><text class="dim sm" x="620" y="114">scanners</text></g>
<g id="m-r1"><text x="30" y="230" class="lg">Emissive</text>
  <circle cx="400" cy="222" r="30" style="fill:#F07A62"/><circle cx="400" cy="222" r="42" class="hl" style="stroke:#F07A62"/>
  <text class="dim c xs" x="400" y="276">self-luminous object</text>
  <line class="ray" x1="446" y1="222" x2="560" y2="222" marker-end="url(#ah)" style="stroke:#F07A62"/>
  <rect class="sbox" x="566" y="205" width="34" height="34" rx="4"/><text class="dim sm" x="620" y="226">thermal imaging</text></g>
<g id="m-r2"><text x="30" y="360" class="lg">Transmissive</text>
  <rect class="dev" x="196" y="336" width="50" height="34" rx="5"/>
  <line class="xray" x1="250" y1="353" x2="370" y2="353"/><rect x="372" y="322" width="56" height="62" rx="10" class="body"/>
  <line class="xray" x1="430" y1="353" x2="560" y2="353" style="opacity:.5" marker-end="url(#ahx)"/>
  <rect class="sbox" x="566" y="336" width="34" height="34" rx="4"/><text class="dim sm" x="620" y="348">X-ray, ultrasound,</text><text class="dim sm" x="620" y="366">microscopy</text></g>
<text class="h" x="200" y="40">SOURCE</text><text class="h" x="368" y="40">OBJECT</text><text class="h" x="560" y="40">SENSOR</text>`,
steps:[
 {fx:svg=>{[0,1,2].forEach(i=>$$(svg,"#m-r"+i).style.opacity=1)},en:"Every imaging setup has the same parts: a radiation source, an object, and a sensor. Depending on the object, we get three types of imaging: reflective, emissive and transmissive.",
   bn:"প্রতিটি ইমেজিং ব্যবস্থায় একই অংশ থাকে: একটি রেডিয়েশন সোর্স, একটি বস্তু এবং একটি সেন্সর। বস্তুর ধরন অনুযায়ী ইমেজিং তিন রকম: রিফ্লেক্টিভ, এমিসিভ এবং ট্রান্সমিসিভ।"},
 {fx:svg=>{[0,1,2].forEach(i=>$$(svg,"#m-r"+i).style.opacity=i===0?1:.2)},en:"Reflective mode is the simplest. The source lights the object, and a sensor captures the reflected radiation. All video cameras, digital cameras and scanners work this way.",
   bn:"রিফ্লেক্টিভ মোড সবচেয়ে সহজ। সোর্স বস্তুকে আলোকিত করে, আর সেন্সর প্রতিফলিত রেডিয়েশন ধরে। সব ভিডিও ক্যামেরা, ডিজিটাল ক্যামেরা ও স্ক্যানার এভাবে কাজ করে।"},
 {fx:svg=>{[0,1,2].forEach(i=>$$(svg,"#m-r"+i).style.opacity=i===1?1:.2)},en:"In emissive imaging, the object is self-luminous. No external source is needed. The sensor directly captures the radiation emitted by the object. Thermal imaging is an example.",
   bn:"এমিসিভ ইমেজিংয়ে বস্তু নিজেই আলো বা রেডিয়েশন ছড়ায়। বাইরের কোনো সোর্স লাগে না। সেন্সর সরাসরি বস্তুর নির্গত রেডিয়েশন ধরে। থার্মাল ইমেজিং এর একটি উদাহরণ।"},
 {fx:svg=>{[0,1,2].forEach(i=>$$(svg,"#m-r"+i).style.opacity=i===2?1:.2)},en:"In transmissive imaging, the source shines through the object. The object absorbs part of the radiation depending on its material, and the attenuated radiation reaching the sensor forms the image. Examples are X-ray, ultrasound and microscopic imaging.",
   bn:"ট্রান্সমিসিভ ইমেজিংয়ে সোর্সের রেডিয়েশন বস্তুর ভেতর দিয়ে যায়। বস্তুর উপাদান অনুযায়ী কিছু রেডিয়েশন শোষিত হয়, আর বাকি দুর্বল রেডিয়েশন সেন্সরে পৌঁছে ইমেজ তৈরি করে। যেমন এক্স-রে, আল্ট্রাসাউন্ড ও মাইক্রোস্কোপিক ইমেজিং।"}
].map(s=>Object.assign({k:0},s)),
points:[
 {en:"Imaging environment: <b>radiation source</b>, <b>object</b> (reflective, self-luminous or transmissive) and <b>sensor</b>.",bn:"ইমেজিং পরিবেশ: <b>রেডিয়েশন সোর্স</b>, <b>বস্তু</b> (প্রতিফলক, স্বপ্রভ বা ভেদ্য) এবং <b>সেন্সর</b>।"},
 {en:"<b>Reflective</b>: cameras and scanners. <b>Emissive</b>: self-luminous objects, e.g. thermal imaging. <b>Transmissive</b>: X-ray, ultrasound, microscopy.",bn:"<b>রিফ্লেক্টিভ</b>: ক্যামেরা ও স্ক্যানার। <b>এমিসিভ</b>: স্বপ্রভ বস্তু, যেমন থার্মাল ইমেজিং। <b>ট্রান্সমিসিভ</b>: এক্স-রে, আল্ট্রাসাউন্ড, মাইক্রোস্কোপি।"}
]},

/* 6 */
{id:"system",slides:"18–20, 31",title:{en:"Processing types, related fields and system elements",bn:"প্রসেসিংয়ের ধরন, সম্পর্কিত ক্ষেত্র ও সিস্টেমের উপাদান"},
svg:`
<g data-scene="proc"><g data-s="0">
  <text class="dim c" x="400" y="60">First challenge: acquiring the image. Three kinds of processing:</text>
  <rect class="boxa" x="40" y="110" width="210" height="200" rx="12"/><text class="c lg" x="145" y="146">Optical</text>
  ${SUN(100,215)}<ellipse class="lens2" cx="170" cy="215" rx="8" ry="34"/><line class="ray" x1="124" y1="215" x2="210" y2="215"/>
  <text class="c dim xs" x="145" y="286">radiation source, object, optics</text>
  <rect class="boxa" x="295" y="110" width="210" height="200" rx="12"/><text class="c lg" x="400" y="146">Analog</text>
  <path class="wave" d="M330 215 q12 -30 24 0 t24 0 t24 0 t24 0 t24 0 t24 0"/><text class="c dim xs" x="400" y="286">analog signals, analog circuits</text>
  <rect class="boxa" x="550" y="110" width="210" height="200" rx="12"/><text class="c lg" x="655" y="146">Digital</text>
  <text class="c mono" x="655" y="222">0101 1100</text><text class="c dim xs" x="655" y="286">digital circuits, software</text>
  <line class="arrw" x1="252" y1="210" x2="292" y2="210" marker-end="url(#ahw)"/><line class="arrw" x1="507" y1="210" x2="547" y2="210" marker-end="url(#ahw)"/>
</g></g>
<g data-scene="fields"><g data-s="0" id="f-hub"></g></g>
<g data-scene="elem"><g data-s="0" id="e-blocks"></g></g>`,
init(svg){const h=$$(svg,"#f-hub");const F=["Optics","Statistics","Video processing","Graphics","Computer vision","Artificial intelligence"];
  F.forEach((f,i)=>{const a=-Math.PI/2+i*Math.PI/3,x=400+250*Math.cos(a),y=225+150*Math.sin(a);el(h,"line",{x1:400,y1:225,x2:x,y2:y,class:"link"});
    const g=el(h,"g",{class:"pop",style:`animation-delay:${i*.25}s`});el(g,"rect",{x:x-80,y:y-22,width:160,height:44,rx:22,class:"boxb"});txt(g,x,y+5,f,"c sm")});
  el(h,"circle",{cx:400,cy:225,r:72,class:"boxa"});txt(h,400,220,"Image","c lg");txt(h,400,244,"processing","c lg");
  const e=$$(svg,"#e-blocks");
  const B=[[30,50,"Acquisition","scanner · camera · sensor"],[290,170,"Processing unit","computer · workstation"],[550,50,"Storage","optical disk · tape · hard disk"],[550,290,"Display","monitor · projector · printer"],[30,290,"Communication","channel"]];
  [[150,95,330,170],[530,215,550,120],[530,240,550,320],[290,240,250,320]].forEach(([a,b,c,d])=>el(e,"line",{x1:a,y1:b,x2:c,y2:d,class:"link"}));
  B.forEach(([x,y,t,s],i)=>{el(e,"rect",{x,y,width:220,height:90,rx:10,class:i===1?"boxa":"boxb"});txt(e,x+110,y+40,t,"c");txt(e,x+110,y+64,s,"c dim xs")});
  el(e,"circle",{id:"e-pk",r:7,class:"spot",cx:150,cy:95})},
steps:[
 {scene:"proc",k:0,en:"The first major challenge is acquiring the image. Optical processing studies the source, the object and the optics. Analog processing handles analog electrical signals with analog circuits. Digital processing uses digital circuits, systems and software.",
   bn:"প্রথম বড় চ্যালেঞ্জ হলো ইমেজ সংগ্রহ করা। অপটিক্যাল প্রসেসিংয়ে সোর্স, বস্তু ও অপটিক্স নিয়ে কাজ হয়। অ্যানালগ প্রসেসিংয়ে অ্যানালগ সার্কিট দিয়ে অ্যানালগ সিগন্যাল প্রসেস করা হয়। আর ডিজিটাল প্রসেসিংয়ে ডিজিটাল সার্কিট, সিস্টেম ও সফটওয়্যার ব্যবহার হয়।"},
 {scene:"fields",k:0,en:"Image processing is connected to many fields: optics, statistics, video processing, graphics, computer vision and artificial intelligence.",
   bn:"ইমেজ প্রসেসিং অনেক ক্ষেত্রের সাথে যুক্ত: অপটিক্স, স্ট্যাটিস্টিক্স, ভিডিও প্রসেসিং, গ্রাফিক্স, কম্পিউটার ভিশন এবং আর্টিফিশিয়াল ইন্টেলিজেন্স।"},
 {scene:"elem",k:0,fx:svg=>{const p=$$(svg,"#e-pk");const path=[[150,95],[400,215],[660,95],[400,215],[660,335],[400,215],[140,335],[400,215],[150,95]];
   return rafLoop(t=>{const u=(t*.4)%(path.length-1),i=Math.floor(u),f=u-i;p.setAttribute("cx",path[i][0]+(path[i+1][0]-path[i][0])*f);p.setAttribute("cy",path[i][1]+(path[i+1][1]-path[i][1])*f)})},
   en:"A digital image processing system has five elements. Acquisition equipment such as a scanner, camera or sensor. A processing unit such as a computer. Storage such as optical disks, magnetic tape or hard disks. A display unit such as a monitor, projector or printer. And a communication channel.",
   bn:"একটি ডিজিটাল ইমেজ প্রসেসিং সিস্টেমের পাঁচটি উপাদান। অ্যাকুইজিশন যন্ত্র, যেমন স্ক্যানার, ক্যামেরা বা সেন্সর। প্রসেসিং ইউনিট, যেমন কম্পিউটার। স্টোরেজ, যেমন অপটিক্যাল ডিস্ক, ম্যাগনেটিক টেপ বা হার্ড ডিস্ক। ডিসপ্লে ইউনিট, যেমন মনিটর, প্রজেক্টর বা প্রিন্টার। আর একটি কমিউনিকেশন চ্যানেল।"}
],
points:[
 {en:"<b>Optical</b>, <b>analog</b> and <b>digital</b> image processing.",bn:"<b>অপটিক্যাল</b>, <b>অ্যানালগ</b> ও <b>ডিজিটাল</b> ইমেজ প্রসেসিং।"},
 {en:"Related fields: optics, statistics, video processing, graphics, computer vision, AI.",bn:"সম্পর্কিত ক্ষেত্র: অপটিক্স, স্ট্যাটিস্টিক্স, ভিডিও প্রসেসিং, গ্রাফিক্স, কম্পিউটার ভিশন, AI।"},
 {en:"System elements: acquisition, processing unit, storage, display, communication channel.",bn:"সিস্টেমের উপাদান: অ্যাকুইজিশন, প্রসেসিং ইউনিট, স্টোরেজ, ডিসপ্লে, কমিউনিকেশন চ্যানেল।"}
]},

/* 7 */
{id:"steps",slides:"21–30",title:{en:"Fundamental steps in DIP",bn:"DIP-এর মৌলিক ধাপসমূহ"},
svg:`<g id="s-list"></g><g id="s-pair"></g><text id="s-cap" class="c dim" x="545" y="330"></text><text id="s-cap2" class="c dim sm" x="545" y="356"></text>`,
init(svg,_){const L=["Image acquisition","Image enhancement","Image restoration","Colour image processing","Compression","Morphological processing","Segmentation","Representation & description","Object recognition"];
  const g=$$(svg,"#s-list");_.box=L.map((t,i)=>{const r=el(g,"rect",{x:20,y:24+i*44,width:250,height:36,rx:8,class:"box"});txt(g,36,47+i*44,t,"sm");return r});
  txt(g,145,424,"Knowledge base guides every step","c am xs");
  const p=$$(svg,"#s-pair");_.A=img2(p,330,70,190,190,"");_.B=img2(p,570,70,190,190,"");_.ar=arrow(p,526,165,564,165);
  const sc=gen("scene",128);_.sc=sc;
  _.set=(hl,a,b,la,lb,c1,c2)=>{_.box.forEach((r,i)=>r.setAttribute("class",hl.includes(i)?"boxa":"box"));
    typeof a==="string"?_.A.src(a):_.A.show(a);typeof b==="string"?_.B.src(b):_.B.show(b);_.A.lb.textContent=la;_.B.lb.textContent=lb;
    $$(svg,"#s-cap").textContent=c1;$$(svg,"#s-cap2").textContent=c2||""}},
steps:[
 {fx:(s,_)=>_.set([0,1,2,3,4,5,6,7,8],land(190,190),_.sc,"colour scene","acquired image","The steps of digital image processing","from acquisition to recognition"),
   en:"Here are the fundamental steps of digital image processing, from acquiring the image to recognising objects in it. A knowledge base about the problem guides every step.",
   bn:"এখানে ডিজিটাল ইমেজ প্রসেসিংয়ের মৌলিক ধাপগুলো দেখানো হলো, ইমেজ সংগ্রহ থেকে শুরু করে বস্তু চেনা পর্যন্ত। সমস্যা সম্পর্কে একটি নলেজ বেস প্রতিটি ধাপকে পথ দেখায়।"},
 {fx:(s,_)=>_.set([0,1],lowC(_.sc),stretch(lowC(_.sc)),"low contrast","enhanced","Enhancement: more suitable for an application","subjective · brightness, contrast"),
   en:"Acquisition usually includes preprocessing such as scaling. Enhancement then manipulates the image so the result is more suitable for a specific application, for example by adjusting brightness and contrast.",
   bn:"অ্যাকুইজিশনের সাথে সাধারণত স্কেলিংয়ের মতো প্রিপ্রসেসিং থাকে। এরপর এনহ্যান্সমেন্ট ইমেজকে এমনভাবে পরিবর্তন করে যাতে নির্দিষ্ট কাজের জন্য ফলাফল বেশি উপযোগী হয়, যেমন ব্রাইটনেস ও কনট্রাস্ট ঠিক করা।"},
 {fx:(s,_)=>{const n=noiseSP(_.sc,.12);_.set([2],n,rankF(n,1,"med"),"corrupted","restored","Restoration: based on a degradation model","objective, not a matter of taste")},
   en:"Restoration also improves appearance, but it is objective. It is based on mathematical or probabilistic models of how the image was degraded. Enhancement, on the other hand, depends on what a person thinks looks good.",
   bn:"রিস্টোরেশনও ইমেজের চেহারা উন্নত করে, কিন্তু এটি অবজেক্টিভ। ইমেজ কীভাবে নষ্ট হয়েছে তার গাণিতিক বা সম্ভাব্যতাভিত্তিক মডেলের উপর এটি নির্ভর করে। অন্যদিকে এনহ্যান্সমেন্ট নির্ভর করে মানুষের পছন্দের উপর।"},
 {fx:(s,_)=>_.set([3],land(190,190,"gray"),land(190,190,"pseudo"),"gray","colour mapped","Colour image processing","more important as images spread online"),
   en:"Colour image processing has grown in importance because of the huge increase in digital images on the internet.",
   bn:"ইন্টারনেটে ডিজিটাল ইমেজের ব্যবহার অনেক বেড়ে যাওয়ায় কালার ইমেজ প্রসেসিংয়ের গুরুত্বও বেড়েছে।"},
 {fx:(s,_)=>{const t=gen("text",128);_.set([5],t,morph(t,"dilate"),"broken shapes","after morphology","Morphological processing","tools for describing shape")},
   en:"Morphological processing provides tools for extracting image components that are useful for representing and describing shape. Here it joins broken strokes.",
   bn:"মরফোলজিক্যাল প্রসেসিং এমন টুল দেয়, যা দিয়ে আকৃতি বর্ণনার জন্য দরকারি অংশগুলো বের করা যায়। এখানে ভাঙা রেখাগুলো জোড়া লেগেছে।"},
 {fx:(s,_)=>_.set([6],_.sc,mapI(_.sc,v=>v>.8?1:0),"input","segmented","Segmentation","partition the image into its objects"),
   en:"Segmentation partitions an image into its constituent parts or objects. Here the bright objects are separated from the background.",
   bn:"সেগমেন্টেশন একটি ইমেজকে তার অংশ বা বস্তুগুলোতে ভাগ করে। এখানে উজ্জ্বল বস্তুগুলো ব্যাকগ্রাউন্ড থেকে আলাদা হয়েছে।"},
 {fx:(s,_)=>{const b=mapI(_.sc,v=>v>.8?1:0);const e=morph(b,"erode");_.set([7,8],b,{w:b.w,h:b.h,a:b.a.map((v,i)=>v-e.a[i])},"regions","boundaries","Representation, description, recognition","describe the region, then label it")},
   en:"Representation deals with region properties, and description extracts numbers that separate one class of objects from another. Recognition then assigns a label, such as vehicle, based on those descriptors.",
   bn:"রিপ্রেজেন্টেশন অঞ্চলের বৈশিষ্ট্য নিয়ে কাজ করে, আর ডেসক্রিপশন এমন সংখ্যাগত তথ্য বের করে যা এক শ্রেণির বস্তুকে অন্য শ্রেণি থেকে আলাদা করে। তারপর রিকগনিশন সেই তথ্যের ভিত্তিতে একটি লেবেল দেয়, যেমন যানবাহন।"},
 {fx:(s,_)=>_.set([4],_.sc,blockify(_.sc,8),"original","compressed (lossy)","Compression","less storage, less bandwidth"),
   en:"Compression reduces the storage needed to save an image, or the bandwidth needed to transmit it. Strong lossy compression can create visible blocks.",
   bn:"কমপ্রেশন একটি ইমেজ সংরক্ষণের জায়গা বা পাঠানোর ব্যান্ডউইথ কমায়। বেশি লসি কমপ্রেশন করলে ইমেজে ব্লক দেখা দিতে পারে।"}
].map(s=>Object.assign({k:0},s)),
points:[
 {en:"<b>Enhancement</b> is subjective; <b>restoration</b> is objective, based on models of degradation.",bn:"<b>এনহ্যান্সমেন্ট</b> সাবজেক্টিভ; <b>রিস্টোরেশন</b> অবজেক্টিভ, ক্ষয়ের মডেলের উপর ভিত্তি করে।"},
 {en:"<b>Segmentation</b> partitions an image into objects; <b>recognition</b> assigns a label based on descriptors.",bn:"<b>সেগমেন্টেশন</b> ইমেজকে বস্তুতে ভাগ করে; <b>রিকগনিশন</b> বৈশিষ্ট্যের ভিত্তিতে লেবেল দেয়।"},
 {en:"<b>Compression</b> reduces storage or bandwidth.",bn:"<b>কমপ্রেশন</b> স্টোরেজ বা ব্যান্ডউইথ কমায়।"}
]},

/* 8 */
{id:"types",slides:"32–35",title:{en:"Types of images",bn:"ইমেজের প্রকারভেদ"},
svg:`
<g data-scene="tree"><g data-s="0" id="t-tree"></g></g>
<g data-scene="rv"><g data-s="0">
  <text class="h" x="80" y="50">RASTER · PIXEL BASED</text><text class="h" x="470" y="50">VECTOR · GEOMETRY BASED</text>
  <defs><clipPath id="rvc1"><rect x="80" y="80" width="260" height="260"/></clipPath><clipPath id="rvc2"><rect x="470" y="80" width="260" height="260"/></clipPath></defs>
  <rect class="frame" x="80" y="80" width="260" height="260"/><rect class="frame" x="470" y="80" width="260" height="260"/>
  <g clip-path="url(#rvc1)"><image id="rv-img" class="pix" x="80" y="80" width="260" height="260" preserveAspectRatio="none"/></g>
  <g clip-path="url(#rvc2)"><circle id="rv-c" cx="600" cy="210" r="90" style="fill:#E8EEF5"/></g>
  <text id="rv-z" class="c mono am" x="400" y="380">zoom 1×</text>
  <text class="c dim sm" x="210" y="410">quality depends on the number of pixels</text><text class="c dim sm" x="600" y="410">lines and circles stay sharp</text>
</g></g>
<g data-scene="color"><g data-s="0" id="c-four"></g><g data-s="1" id="c-bands"></g></g>
<g data-scene="dim"><g data-s="0">
  <text class="h" x="100" y="60">2-D · ARRAY OF PIXELS</text><g id="dm2"></g>
  <text class="h" x="470" y="60">3-D · STACK OF IMAGES</text><g id="dm3"></g>
</g></g>`,
init(svg,_){const t=$$(svg,"#t-tree");const N=(x,y,s,cls)=>{el(t,"rect",{x:x-62,y:y-20,width:124,height:40,rx:8,class:cls||"box"});txt(t,x,y+5,s,"c sm")};
  [[150,150],[400,150],[650,150]].forEach(([x,y])=>el(t,"line",{x1:400,y1:70,x2:x,y2:y-20,class:"link"}));
  [[150,90],[150,210]].forEach(()=>0);
  [[90,260,150],[210,260,150],[295,330,400],[400,260,400],[505,330,400],[400,400,400],[600,260,650],[700,260,650]].forEach(([x,y,px])=>el(t,"line",{x1:px,y1:170,x2:x,y2:y-20,class:"link"}));
  N(400,50,"Image","boxa");N(150,150,"Attributes","boxb");N(400,150,"Colour","boxb");N(650,150,"Dimension","boxb");
  N(90,260,"Raster");N(210,260,"Vector");N(400,260,"Gray scale");N(295,330,"Binary");N(505,330,"True colour");N(400,400,"Pseudo colour");N(600,260,"2-D");N(700,260,"3-D");
  const tiny=mk(14,14,(x,y)=>Math.hypot(x+.5/14-.5,y+.5/14-.5)<.36?.92:.1);$$(svg,"#rv-img").setAttribute("href",toURL(tiny));
  const c=$$(svg,"#c-four");const im=[["bin","Binary","1 bit · 0 or 1"],["gray","Gray scale","8 bits · 256 levels"],["rgb","True colour","24 bits · 3 bands"],["pseudo","Pseudo colour","colours added artificially"]];
  im.forEach(([m,a,b],i)=>{const g=img2(c,30+i*190,70,170,170,a);g.src(land(170,170,m));txt(c,30+i*190+85,282,b,"c dim xs")});
  const bd=$$(svg,"#c-bands");["r","g","b"].forEach((m,i)=>{const g=img2(bd,410+i*62,312,56,56);g.src(land(56,56,m))});txt(bd,503,396,"R · G · B bands","c dim xs");
  const d2=img2($$(svg,"#dm2"),100,100,240,240);d2.show(gen("scene",128));
  const d3=$$(svg,"#dm3");_.sl=[];for(let i=0;i<6;i++){const g=el(d3,"g");const im2=el(g,"image",{x:520,y:110,width:180,height:180,preserveAspectRatio:"none"});im2.setAttribute("href",toURL(gen("xray",64)));
    el(g,"rect",{x:520,y:110,width:180,height:180,class:"frame"});_.sl.push(g)}},
steps:[
 {scene:"tree",k:0,en:"Images can be classified in three ways: by attributes, by colour, and by dimension.",
   bn:"ইমেজকে তিনভাবে ভাগ করা যায়: অ্যাট্রিবিউট অনুযায়ী, রং অনুযায়ী এবং মাত্রা অনুযায়ী।"},
 {scene:"rv",k:0,fx:svg=>{const im=$$(svg,"#rv-img"),c=$$(svg,"#rv-c"),z=$$(svg,"#rv-z");return rafLoop(t=>{const s=1+1.6*(.5-.5*Math.cos(t*.9));
   im.setAttribute("width",260*s);im.setAttribute("height",260*s);im.setAttribute("x",210-130*s);im.setAttribute("y",210-130*s);c.setAttribute("r",90*s);z.textContent=`zoom ${s.toFixed(1)}×`})},
   en:"By attributes, raster images are pixel based, so their quality depends on the number of pixels. Zoom in and the edges turn into blocks. Vector graphics use geometric shapes like lines and circles, so they stay sharp at any size.",
   bn:"অ্যাট্রিবিউট অনুযায়ী, র‍্যাস্টার ইমেজ পিক্সেলভিত্তিক, তাই এর মান নির্ভর করে পিক্সেলের সংখ্যার উপর। জুম করলে কিনারা ব্লকের মতো হয়ে যায়। ভেক্টর গ্রাফিক্স রেখা ও বৃত্তের মতো জ্যামিতিক আকার ব্যবহার করে, তাই যেকোনো সাইজে এটি তীক্ষ্ণ থাকে।"},
 {scene:"color",k:0,en:"By colour: a binary image has pixels of 0 or 1. A gray scale image uses 8 bits, which is enough because the eye distinguishes only about 32 levels. A true colour image uses 24 bits. A pseudo colour image adds false colours to help interpretation, as in Doppler images.",
   bn:"রং অনুযায়ী: বাইনারি ইমেজে পিক্সেলের মান ০ বা ১। গ্রে স্কেল ইমেজে ৮ বিট লাগে, যা যথেষ্ট, কারণ আমাদের চোখ মাত্র প্রায় ৩২টি লেভেল আলাদা করতে পারে। ট্রু কালার ইমেজে ২৪ বিট লাগে। সিউডো কালার ইমেজে ব্যাখ্যার সুবিধার জন্য কৃত্রিম রং যোগ করা হয়, যেমন ডপলার ইমেজে।"},
 {scene:"color",k:1,en:"A true colour image can be seen as a three-band image: red, green and blue, with 8 bits each.",
   bn:"ট্রু কালার ইমেজকে তিন ব্যান্ডের ইমেজ হিসেবে দেখা যায়: লাল, সবুজ ও নীল, প্রতিটিতে ৮ বিট।"},
 {scene:"dim",k:0,fx:(svg,_)=>rafLoop(t=>{const s=.5-.5*Math.cos(t*1.2);_.sl.forEach((g,i)=>g.setAttribute("transform",`translate(${(i-2.5)*14*s+ (i-2.5)*4},${-(i-2.5)*16*s})`))}),
   en:"By dimension: most digital images are 2-D arrays of pixels. When depth or another dimension is added, we use a stack of images, which forms a 3-D image, such as a CT volume.",
   bn:"মাত্রা অনুযায়ী: বেশিরভাগ ডিজিটাল ইমেজ পিক্সেলের দ্বিমাত্রিক অ্যারে। যখন গভীরতা বা অন্য কোনো মাত্রা যোগ হয়, তখন অনেকগুলো ইমেজের স্তূপ ব্যবহার করা হয়, যা একটি ত্রিমাত্রিক ইমেজ তৈরি করে, যেমন CT ভলিউম।"}
],
points:[
 {en:"<b>Raster</b> images are pixel based; <b>vector</b> graphics use geometric attributes.",bn:"<b>র‍্যাস্টার</b> ইমেজ পিক্সেলভিত্তিক; <b>ভেক্টর</b> গ্রাফিক্স জ্যামিতিক বৈশিষ্ট্য ব্যবহার করে।"},
 {en:"<b>Binary</b> (0/1), <b>gray scale</b> (8 bits, 256 levels), <b>true colour</b> (24 bits, 3 bands), <b>pseudo colour</b> (false colours, e.g. Doppler).",bn:"<b>বাইনারি</b> (০/১), <b>গ্রে স্কেল</b> (৮ বিট, ২৫৬ লেভেল), <b>ট্রু কালার</b> (২৪ বিট, ৩ ব্যান্ড), <b>সিউডো কালার</b> (কৃত্রিম রং, যেমন ডপলার)।"},
 {en:"Images are usually <b>2-D</b>; extra dimensions need a <b>3-D</b> stack.",bn:"ইমেজ সাধারণত <b>২-ডি</b>; বাড়তি মাত্রার জন্য <b>৩-ডি</b> স্তূপ লাগে।"}
]},

/* 9 */
{id:"formats",slides:"36–37",title:{en:"Image file formats",bn:"ইমেজ ফাইল ফরম্যাট"},
svg:`<g id="fm"></g>`,
init(svg){const g=$$(svg,"#fm");const F=[["JPEG","Joint Photographic Experts Group","lossy","web, cameras, everyday prints",0],["GIF","Graphics Interchange Format","lossless · up to 256 colours","simple graphics",1],["BMP","Bitmap (Microsoft Windows)","no compression · very large","high quality, no loss",1],
  ["TIFF","Tagged Image File Format","lossless","professional prints, archives",2],["PNG","Portable Network Graphics","lossless · 16 million colours","web images",2],["EPS","Encapsulated PostScript","vector · no compression","illustrations, vector art",3]];
  F.forEach(([n,f,c,b,s],i)=>{const x=24+(i%3)*256,y=40+Math.floor(i/3)*196;const q=el(g,"g",{"data-s":s});el(q,"rect",{x,y,width:240,height:180,rx:12,class:c.startsWith("lossy")?"boxa":"boxb"});
    txt(q,x+18,y+44,n,"lg mono");txt(q,x+18,y+72,f,"dim xs");txt(q,x+18,y+112,c,"sm am");txt(q,x+18,y+150,"best for: "+b,"dim xs")})},
steps:[
 {k:0,en:"JPEG, from the Joint Photographic Experts Group, uses lossy compression. As the file gets smaller, quality drops. It is very common on the internet and in digital cameras. Try the slider below to see compression blocks.",
   bn:"JPEG, অর্থাৎ Joint Photographic Experts Group, লসি কমপ্রেশন ব্যবহার করে। ফাইল যত ছোট হয়, মান তত কমে। ইন্টারনেট ও ডিজিটাল ক্যামেরায় এটি খুবই প্রচলিত। নিচের স্লাইডারে কমপ্রেশনের ব্লক দেখে নাও।"},
 {k:1,en:"GIF uses lossless compression and supports up to 256 colours. BMP, developed by Microsoft for Windows, has no compression, so quality is very high but files are very large.",
   bn:"GIF লসলেস কমপ্রেশন ব্যবহার করে এবং সর্বোচ্চ ২৫৬টি রং সাপোর্ট করে। BMP মাইক্রোসফট উইন্ডোজের জন্য তৈরি করেছে, এতে কোনো কমপ্রেশন নেই, তাই মান খুব ভালো কিন্তু ফাইল অনেক বড়।"},
 {k:2,en:"TIFF is lossless and gives very high quality, which suits professional prints and archives. PNG is lossless too, was designed to replace GIF, and handles up to 16 million colours. It is best for web images.",
   bn:"TIFF লসলেস এবং খুব উচ্চমানের, তাই পেশাদার প্রিন্ট ও আর্কাইভের জন্য উপযুক্ত। PNG-ও লসলেস, GIF-এর বিকল্প হিসেবে তৈরি, এবং ১ কোটি ৬০ লক্ষ রং সাপোর্ট করে। ওয়েব ইমেজের জন্য এটি সবচেয়ে ভালো।"},
 {k:3,en:"EPS, or Encapsulated PostScript, is a vector format. It stores vector information instead of pixels, and opens in programs like Adobe Illustrator or CorelDRAW.",
   bn:"EPS, অর্থাৎ Encapsulated PostScript, একটি ভেক্টর ফরম্যাট। এটি পিক্সেলের বদলে ভেক্টর তথ্য রাখে, এবং Adobe Illustrator বা CorelDRAW-এর মতো প্রোগ্রামে খোলা যায়।"}
],
panel:()=>`<h3>${tr({en:"See lossy compression",bn:"লসি কমপ্রেশন দেখো"})}</h3>
 <div class="prow"><label>${tr({en:"Block size",bn:"ব্লক সাইজ"})} <input type="range" id="fq" min="1" max="16" value="8"><output id="fqo"></output></label></div>
 <div class="out"><img id="fqa" alt="" width="180" height="180" style="image-rendering:pixelated;border-radius:6px"><img id="fqb" alt="" width="180" height="180" style="image-rendering:pixelated;border-radius:6px"></div>
 <p class="fine">${tr({en:"Left: original. Right: each block replaced by its average, a simplified picture of what heavy JPEG compression does.",bn:"বাঁয়ে: মূল ইমেজ। ডানে: প্রতিটি ব্লক তার গড় মান দিয়ে বদলানো, যা ভারী JPEG কমপ্রেশনের একটি সরল চিত্র।"})}</p>`,
bind(root){const sc=gen("scene",128);root.querySelector("#fqa").src=toURL(sc);const f=()=>{const b=+root.querySelector("#fq").value;root.querySelector("#fqo").textContent=b+"×"+b;root.querySelector("#fqb").src=toURL(blockify(sc,b))};root.querySelector("#fq").oninput=f;f()},
points:[
 {en:"<b>JPEG</b> lossy; <b>GIF</b> lossless, 256 colours; <b>BMP</b> uncompressed, large.",bn:"<b>JPEG</b> লসি; <b>GIF</b> লসলেস, ২৫৬ রং; <b>BMP</b> কমপ্রেশনহীন, বড়।"},
 {en:"<b>TIFF</b> lossless, prints and archives; <b>PNG</b> lossless, 16 million colours, web; <b>EPS</b> vector.",bn:"<b>TIFF</b> লসলেস, প্রিন্ট ও আর্কাইভ; <b>PNG</b> লসলেস, ১.৬ কোটি রং, ওয়েব; <b>EPS</b> ভেক্টর।"}
]}
],
quiz:[
 {q:{en:"A digital image is one in which…",bn:"ডিজিটাল ইমেজ হলো যেখানে…"},o:[{en:"x, y and f(x,y) are all finite and discrete",bn:"x, y ও f(x,y) সবই সসীম ও বিচ্ছিন্ন"},{en:"only f is continuous",bn:"শুধু f অবিচ্ছিন্ন"},{en:"x and y are continuous",bn:"x ও y অবিচ্ছিন্ন"},{en:"colours are 24-bit",bn:"রং ২৪-বিট"}],a:0,w:{en:"Finite, discrete coordinates and amplitude make an image digital.",bn:"সসীম ও বিচ্ছিন্ন স্থানাঙ্ক ও মান থাকলেই ইমেজ ডিজিটাল।"}},
 {q:{en:"Size of a 512 × 512 image with 8 bits per pixel?",bn:"৫১২ × ৫১২, ৮-বিট ইমেজের সাইজ কত?"},o:[{en:"256 KB",bn:"২৫৬ KB"},{en:"512 KB",bn:"৫১২ KB"},{en:"1 MB",bn:"১ MB"},{en:"2 MB",bn:"২ MB"}],a:0,w:{en:"512 × 512 × 8 = 2,097,152 bits = 262,144 bytes = 256 KB.",bn:"৫১২ × ৫১২ × ৮ = ২০,৯৭,১৫২ বিট = ২,৬২,১৪৪ বাইট = ২৫৬ KB।"}},
 {q:{en:"Segmentation is a…",bn:"সেগমেন্টেশন হলো একটি…"},o:[{en:"low-level process",bn:"লো-লেভেল প্রসেস"},{en:"mid-level process",bn:"মিড-লেভেল প্রসেস"},{en:"high-level process",bn:"হাই-লেভেল প্রসেস"},{en:"hardware element",bn:"হার্ডওয়্যার উপাদান"}],a:1,w:{en:"Mid level: image in, attributes out.",bn:"মিড-লেভেল: ইনপুট ইমেজ, আউটপুট অ্যাট্রিবিউট।"}},
 {q:{en:"X-ray imaging is an example of…",bn:"এক্স-রে ইমেজিং কোনটির উদাহরণ?"},o:[{en:"reflective imaging",bn:"রিফ্লেক্টিভ"},{en:"emissive imaging",bn:"এমিসিভ"},{en:"transmissive imaging",bn:"ট্রান্সমিসিভ"},{en:"vector graphics",bn:"ভেক্টর গ্রাফিক্স"}],a:2,w:{en:"Radiation passes through the body and is attenuated.",bn:"রেডিয়েশন শরীরের ভেতর দিয়ে গিয়ে দুর্বল হয়।"}},
 {q:{en:"Which step is objective, based on models of degradation?",bn:"কোন ধাপটি অবজেক্টিভ, ক্ষয়ের মডেলভিত্তিক?"},o:[{en:"Enhancement",bn:"এনহ্যান্সমেন্ট"},{en:"Restoration",bn:"রিস্টোরেশন"},{en:"Compression",bn:"কমপ্রেশন"},{en:"Recognition",bn:"রিকগনিশন"}],a:1,w:{en:"Enhancement is subjective; restoration is model based.",bn:"এনহ্যান্সমেন্ট সাবজেক্টিভ; রিস্টোরেশন মডেলভিত্তিক।"}},
 {q:{en:"Which format is lossy?",bn:"কোন ফরম্যাট লসি?"},o:[{en:"PNG",bn:"PNG"},{en:"TIFF",bn:"TIFF"},{en:"BMP",bn:"BMP"},{en:"JPEG",bn:"JPEG"}],a:3,w:{en:"JPEG trades quality for smaller files.",bn:"JPEG ছোট ফাইলের জন্য মান কমায়।"}}
]});
})();
