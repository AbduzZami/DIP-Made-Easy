/* ===== Lecture 06 · Spatial and intensity resolution, interpolation ===== */
(()=>{
const four=(svg,id,_,key)=>{_[key]=[0,1,2,3].map(i=>imgEl($$(svg,id),30+i*190,90,170,170,""));_[key].forEach(q=>{q.lb=txt(q.g,0,0,"","c sm am")})};
const setFour=(arr,imgs,labels)=>arr.forEach((q,i)=>{q.show(imgs[i]);q.lb.setAttribute("x",115+i*190);q.lb.setAttribute("y",290);q.lb.textContent=labels[i]});
lecture({id:"l06",no:"06",title:{en:"Spatial and Intensity Resolution",bn:"স্পেশাল ও ইনটেনসিটি রেজোলিউশন"},book:{en:"Ch. 2 · Digital Image Fundamentals",bn:"চ্যাপ্টার ২ · ডিজিটাল ইমেজ ফান্ডামেন্টালস"},
chapters:[
/* 1 */
{id:"spatial",slides:"2–6",title:{en:"Spatial resolution",bn:"স্পেশাল রেজোলিউশন"},
svg:`<g data-scene="lp"><g data-s="0"><g id="lp-b"></g><text id="lp-t" class="c lg mono am" x="400" y="360"></text><text class="c dim" x="400" y="400">resolution = largest number of discernible line pairs per unit distance</text></g></g>
<g data-scene="dpi"><g data-s="0"><g id="dpi-i"></g><text class="c dim sm" x="400" y="340">same printed size, fewer pixels: details vanish</text><text class="c dim xs" x="400" y="364">(original 3692 × 2812 pixels; at 72 dpi only 213 × 162)</text></g></g>`,
init(svg,_){four(svg,"#dpi-i",_,"D")},
steps:[
 {scene:"lp",k:0,fx:svg=>{const g=$$(svg,"#lp-b"),t=$$(svg,"#lp-t");const W=[40,24,14,8,5,3];let i=0;return every(1500,()=>{g.innerHTML="";const w=W[i%W.length];for(let x=80;x<720;x+=2*w)el(g,"rect",{x,y:60,width:Math.min(w,720-x),height:240,style:"fill:#E8EEF5"});el(g,"rect",{x:80,y:60,width:640,height:240,class:"frame"});t.textContent=`${(640/(2*w)).toFixed(0)} line pairs across`;i++})},
   en:"Sampling takes the image value at regular spatial intervals, and the length of those intervals defines the spatial resolution. Intuitively, spatial resolution is the smallest discernible detail. A common definition is the largest number of discernible line pairs per unit distance. A line pair is one dark line and one light line.",
   bn:"স্যাম্পলিংয়ে নির্দিষ্ট দূরত্ব পরপর ইমেজের মান নেওয়া হয়, আর সেই দূরত্বই স্পেশাল রেজোলিউশন নির্ধারণ করে। সহজভাবে, স্পেশাল রেজোলিউশন হলো সবচেয়ে ছোট যে খুঁটিনাটি আলাদা করে দেখা যায়। প্রচলিত সংজ্ঞা হলো প্রতি একক দূরত্বে সর্বোচ্চ কতগুলো লাইন পেয়ার আলাদা করা যায়। একটি লাইন পেয়ার মানে একটি কালো ও একটি সাদা রেখা।"},
 {scene:"dpi",k:0,fx:(svg,_)=>{const I=gen("scene",128);setFour(_.D,[I,resizeNN(I,31,31),resizeNN(I,15,15),resizeNN(I,7,7)],["1250 dpi","300 dpi","150 dpi","72 dpi"])},
   en:"In printing and publishing, resolution is measured in dots per unit distance, usually dots per inch, or dpi. Here the same picture is shown at 1250, 300, 150 and 72 dpi. With fewer pixels, fine detail is lost. A better interpolation method can improve the low-resolution result a little.",
   bn:"প্রিন্টিং ও প্রকাশনায় রেজোলিউশন মাপা হয় প্রতি একক দূরত্বে ডটের সংখ্যায়, সাধারণত ডটস পার ইঞ্চি বা dpi-তে। এখানে একই ছবি ১২৫০, ৩০০, ১৫০ ও ৭২ dpi-তে দেখানো হয়েছে। পিক্সেল যত কম, তত সূক্ষ্ম খুঁটিনাটি হারিয়ে যায়। ভালো ইন্টারপোলেশন পদ্ধতি দিয়ে কম রেজোলিউশনের ফলাফল কিছুটা উন্নত করা যায়।"}
],
points:[{en:"Spatial resolution: smallest discernible detail; measured as <b>line pairs per unit distance</b> or <b>dots (pixels) per unit distance</b> (dpi).",bn:"স্পেশাল রেজোলিউশন: সবচেয়ে ছোট দৃশ্যমান খুঁটিনাটি; মাপা হয় <b>প্রতি একক দূরত্বে লাইন পেয়ার</b> বা <b>ডট (পিক্সেল)</b> দিয়ে (dpi)।"},{en:"Sampling is the principal factor determining spatial resolution.",bn:"স্যাম্পলিংই স্পেশাল রেজোলিউশনের প্রধান নির্ধারক।"}]},
/* 2 */
{id:"intensity",slides:"5, 7–9",title:{en:"Intensity resolution and false contouring",bn:"ইনটেনসিটি রেজোলিউশন ও ফলস কনট্যুরিং"},
svg:`<g data-s="0"><g id="ir-i"></g><text id="ir-c" class="c dim" x="400" y="350"></text></g>`,
init(svg,_){four(svg,"#ir-i",_,"Q")},
steps:[
 {k:0,fx:(svg,_)=>{const I=gen("smooth",160);setFour(_.Q,[I,quant(I,128),quant(I,64),quant(I,32)],["256 levels","128","64","32"]);$$(svg,"#ir-c").textContent="same number of samples; fewer intensity levels"},
   en:"Intensity resolution is the smallest discernible change in intensity. It is usually given as the number of bits used for quantization. An image with 256 levels has 8 bits of intensity resolution. Here the number of samples stays the same while the levels drop from 256 to 32.",
   bn:"ইনটেনসিটি রেজোলিউশন হলো তীব্রতার সবচেয়ে ছোট যে পরিবর্তন আলাদা করে বোঝা যায়। সাধারণত একে কোয়ান্টাইজেশনে ব্যবহৃত বিটের সংখ্যা দিয়ে প্রকাশ করা হয়। ২৫৬ লেভেলের ইমেজের ইনটেনসিটি রেজোলিউশন ৮ বিট। এখানে নমুনার সংখ্যা একই রেখে লেভেল ২৫৬ থেকে ৩২-এ কমানো হয়েছে।"},
 {k:0,fx:(svg,_)=>{const I=gen("smooth",160);setFour(_.Q,[quant(I,16),quant(I,8),quant(I,4),quant(I,2)],["16 levels","8","4","2"]);$$(svg,"#ir-c").textContent="false contouring: ridges in smooth areas"},
   en:"From about 32 levels down, fine ridge-like structures appear in areas of nearly constant intensity. This effect, caused by too few intensity levels in smooth regions, is called false contouring. At 2 levels, only a binary image is left.",
   bn:"প্রায় ৩২ লেভেল থেকে কমতে থাকলে প্রায় সমান তীব্রতার অঞ্চলে সূক্ষ্ম শিরার মতো রেখা দেখা দেয়। মসৃণ অঞ্চলে যথেষ্ট লেভেল না থাকায় এই প্রভাবকে বলে ফলস কনট্যুরিং। ২ লেভেলে শুধু একটি বাইনারি ইমেজ থাকে।"}
],
panel:()=>`<h3>${tr({en:"Try it: bits per pixel",bn:"নিজে করো: বিটস পার পিক্সেল"})}</h3><div class="prow"><label>k <input type="range" id="ik" min="1" max="8" value="8"><output id="iko"></output></label></div><img id="iim" alt="" width="256" height="256" style="border-radius:6px;max-width:100%">`,
bind(root){const I=gen("smooth",160);const f=()=>{const k=+root.querySelector("#ik").value;root.querySelector("#iko").textContent=`${k} bits · ${2**k} levels`;root.querySelector("#iim").src=toURL(quant(I,2**k))};root.querySelector("#ik").oninput=f;f()},
points:[{en:"Intensity resolution: smallest discernible change in intensity; e.g. 256 levels = <b>8 bits</b>.",bn:"ইনটেনসিটি রেজোলিউশন: তীব্রতার সবচেয়ে ছোট বোঝা যায় এমন পরিবর্তন; যেমন ২৫৬ লেভেল = <b>৮ বিট</b>।"},{en:"Too few levels in smooth areas → <b>false contouring</b>.",bn:"মসৃণ অঞ্চলে কম লেভেল → <b>ফলস কনট্যুরিং</b>।"}]},
/* 3 */
{id:"isopref",slides:"10–11",title:{en:"Varying N and k together: iso-preference curves",bn:"N ও k একসাথে বদলানো: আইসো-প্রেফারেন্স কার্ভ"},
svg:`<g id="is-p"></g>`,
init(svg,_){const P=plot($$(svg,"#is-p"),{x:130,y:50,w:560,h:300,xmax:224,ymax:1.2,xl:"N (samples per side)",yl:"k (bits)",grid:1});
  [32,64,128,256].forEach(n=>txt(P.g,P.X(n-32),372,String(n),"dim c xs mono"));[4,4.5,5].forEach(k=>txt(P.g,P.X(0)-8,P.Y((k-4)/1*1.0+.1)+4,String(k),"dim e xs mono"));
  const C=[["low detail (face)","curve",[[30,1.1],[110,.6],[200,.25]]],["medium detail","curve3",[[70,1.1],[115,.6],[150,.2]]],["high detail (crowd)","curve2",[[115,1.1],[118,.6],[122,.15]]]];
  _.c=C.map(([n,cls,p],i)=>{const g=el(P.g,"g",{style:"opacity:0;transition:opacity .6s"});el(g,"path",{d:`M${P.X(p[0][0])} ${P.Y(p[0][1])} Q ${P.X(p[1][0])} ${P.Y(p[1][1])} ${P.X(p[2][0])} ${P.Y(p[2][1])}`,class:cls});txt(g,P.X(p[0][0])+6,P.Y(p[0][1])-6,n,"sm");return g})},
steps:[
 {k:0,fx:(s,_)=>_.c.forEach(g=>g.style.opacity=0),en:"Huang, in 1965, studied what happens when the number of samples N and the number of bits k are changed together. He used images with low, medium and high levels of detail, and observers ranked them by subjective quality.",
   bn:"১৯৬৫ সালে হুয়াং পরীক্ষা করেন নমুনার সংখ্যা N ও বিটের সংখ্যা k একসাথে বদলালে কী হয়। তিনি কম, মাঝারি ও বেশি খুঁটিনাটিসহ ইমেজ ব্যবহার করেন, আর দর্শকেরা মান অনুযায়ী সেগুলোর ক্রম ঠিক করেন।"},
 {k:0,fx:(s,_)=>_.c.forEach(g=>g.style.opacity=1),en:"The results are iso-preference curves in the N k plane. Points on one curve have equal subjective quality. Larger N and k mean better quality. The key point: the curves become more vertical as detail increases. So images with a lot of detail need only a few intensity levels.",
   bn:"ফলাফল হলো N k তলে আইসো-প্রেফারেন্স কার্ভ। একটি কার্ভের সব বিন্দুর মান সমান। N ও k বড় মানে ভালো মান। মূল বিষয় হলো, খুঁটিনাটি যত বাড়ে, কার্ভগুলো তত খাড়া হয়। অর্থাৎ বেশি খুঁটিনাটির ইমেজে অল্প কিছু তীব্রতার লেভেলই যথেষ্ট।"}
],
points:[{en:"Iso-preference curves become <b>more vertical</b> as image detail increases.",bn:"ইমেজে খুঁটিনাটি বাড়লে আইসো-প্রেফারেন্স কার্ভ <b>আরও খাড়া</b> হয়।"},{en:"Highly detailed images may need only a few intensity levels.",bn:"অনেক খুঁটিনাটির ইমেজে অল্প কিছু তীব্রতার লেভেলই যথেষ্ট হতে পারে।"}]},
/* 4 */
{id:"nn",slides:"12–17",title:{en:"Interpolation: nearest neighbour",bn:"ইন্টারপোলেশন: নিয়ারেস্ট নেইবার"},
svg:`<g data-s="0"><text class="h" x="40" y="50">INTERPOLATION · ESTIMATE VALUES AT UNKNOWN LOCATIONS</text><g id="nn-s"></g><text class="lg am" x="250" y="250">× 3</text><g id="nn-o"></g></g>`,
init(svg,_){_.S=mat($$(svg,"#nn-s"),{x:60,y:160,cs:56,data:[[1,4,7],[2,5,8],[3,6,9]]});_.O=mat($$(svg,"#nn-o"),{x:330,y:80,cs:36,fs:14,data:Array.from({length:9},()=>Array(9).fill(""))});txt($$(svg,"#nn-o"),492,420,"9 × 9 output","c dim sm");txt($$(svg,"#nn-s"),144,350,"3 × 3 input","c dim sm")},
steps:[
 {k:0,fx:(svg,_)=>{for(let r=0;r<9;r++)for(let c=0;c<9;c++)_.O.set(r,c,r===4&&c===4?"?":"");_.O.clear("a");_.S.clear("a")},
   en:"Interpolation uses known data to estimate values at unknown locations. It is used for zooming, shrinking, rotating and geometric corrections. Suppose we zoom this 3 by 3 image three times. The new 9 by 9 grid has many empty cells. What goes in them?",
   bn:"ইন্টারপোলেশন জানা তথ্য ব্যবহার করে অজানা জায়গার মান অনুমান করে। জুম, ছোট করা, ঘোরানো ও জ্যামিতিক সংশোধনে এটি ব্যবহৃত হয়। ধরো, এই ৩ বাই ৩ ইমেজটিকে তিনগুণ বড় করব। নতুন ৯ বাই ৯ গ্রিডে অনেক খালি ঘর থাকবে। সেগুলোতে কী বসবে?"},
 {k:0,fx:(svg,_)=>{const L=[];for(let r=0;r<3;r++)for(let c=0;c<3;c++)L.push([500,()=>{_.S.clear("a");_.S.cls(r,c,"a");for(let i=0;i<3;i++)for(let j=0;j<3;j++){_.O.set(r*3+i,c*3+j,_.S.data[r][c]);_.O.cls(r*3+i,c*3+j,"a")}}]);
   L.reset=()=>{_.O.clear("a");_.S.clear("a");for(let r=0;r<9;r++)for(let c=0;c<9;c++)_.O.set(r,c,"")};return seq(L,true,2000)},
   en:"Nearest neighbour interpolation gives each new pixel the value of the closest pixel in the original. With a zoom of three, every original pixel is simply copied into a 3 by 3 block.",
   bn:"নিয়ারেস্ট নেইবার ইন্টারপোলেশনে প্রতিটি নতুন পিক্সেল মূল ইমেজের সবচেয়ে কাছের পিক্সেলের মান পায়। তিনগুণ জুমে প্রতিটি মূল পিক্সেল সোজাসুজি একটি ৩ বাই ৩ ব্লকে কপি হয়।"},
 {k:0,fx:(svg,_)=>{for(let r=0;r<9;r++)for(let c=0;c<9;c++){_.O.set(r,c,_.S.data[r/3|0][c/3|0]);_.O.cls(r,c,"a",false)}},
   en:"It is fast and simple, but it makes images blocky, with jagged edges. Other methods are bilinear and bicubic interpolation. Bicubic is the standard in commercial editors such as Adobe Photoshop and Corel Photo-Paint.",
   bn:"এটি দ্রুত ও সহজ, কিন্তু ইমেজকে ব্লকের মতো করে দেয় এবং কিনারা খাঁজকাটা হয়। অন্য পদ্ধতিগুলো হলো বাইলিনিয়ার ও বাইকিউবিক ইন্টারপোলেশন। Adobe Photoshop ও Corel Photo-Paint-এর মতো বাণিজ্যিক সফটওয়্যারে বাইকিউবিকই আদর্শ।"}
],
points:[{en:"Methods: <b>nearest neighbour</b>, <b>bilinear</b>, <b>bicubic</b> (standard in Photoshop).",bn:"পদ্ধতি: <b>নিয়ারেস্ট নেইবার</b>, <b>বাইলিনিয়ার</b>, <b>বাইকিউবিক</b> (Photoshop-এ আদর্শ)।"},{en:"Nearest neighbour copies the closest original pixel: ×3 turns each pixel into a 3 × 3 block.",bn:"নিয়ারেস্ট নেইবার সবচেয়ে কাছের পিক্সেল কপি করে: ×৩ করলে প্রতিটি পিক্সেল ৩ × ৩ ব্লক হয়।"}]},
/* 5 */
{id:"bilinear",slides:"18–21",title:{en:"Bilinear interpolation",bn:"বাইলিনিয়ার ইন্টারপোলেশন"},
svg:`<g data-s="0"><text class="mono" x="40" y="60">&gt;&gt; imresize(I, 2, 'bilinear')</text><g id="bl-s"></g><g id="bl-o"></g><text id="bl-f" class="mono am c" x="500" y="380"></text>
  <text class="dim c sm" x="500" y="410">each value is a weighted average of the 4 nearest input pixels</text></g>`,
init(svg,_){_.S=mat($$(svg,"#bl-s"),{x:70,y:150,cs:70,data:[[1,2],[3,4]]});txt($$(svg,"#bl-s"),140,320,"I (2 × 2)","c dim sm");
  _.O=mat($$(svg,"#bl-o"),{x:360,y:80,cs:70,fs:15,data:Array.from({length:4},()=>Array(4).fill(""))});
  _.v=(i,j)=>{const x=Math.min(1,Math.max(0,(j+.5)/2-.5)),y=Math.min(1,Math.max(0,(i+.5)/2-.5));return{x,y,v:(1-x)*(1-y)*1+x*(1-y)*2+(1-x)*y*3+x*y*4}}},
steps:[
 {k:0,fx:(svg,_)=>{const order=[[0,0],[0,3],[3,0],[3,3],[0,1],[0,2],[3,1],[3,2],[1,0],[2,0],[1,3],[2,3],[1,1],[1,2],[2,1],[2,2]];
   const L=order.map(([i,j])=>[700,()=>{_.O.clear("a");const{x,y,v}=_.v(i,j);_.O.set(i,j,v.toFixed(2));_.O.cls(i,j,"a");
     const w=[(1-x)*(1-y),x*(1-y),(1-x)*y,x*y];$$(svg,"#bl-f").textContent=`${v.toFixed(2)} = `+w.map((q,k)=>q?`${+q.toFixed(4)}×${k+1}`:null).filter(Boolean).join(" + ")}]);
   L.reset=()=>{for(let i=0;i<4;i++)for(let j=0;j<4;j++)_.O.set(i,j,"");_.O.clear("a");$$(svg,"#bl-f").textContent=""};return seq(L,true,2500)},
   en:"Bilinear interpolation uses the four nearest neighbours. Each new value is a weighted average, and the closer an input pixel is, the larger its weight. Watch MATLAB's imresize double this 2 by 2 image. The corners keep 1, 2, 3 and 4. A cell a quarter of the way from 1 to 2 becomes 0.75 times 1 plus 0.25 times 2, which is 1.25.",
   bn:"বাইলিনিয়ার ইন্টারপোলেশন সবচেয়ে কাছের চারটি প্রতিবেশী ব্যবহার করে। প্রতিটি নতুন মান একটি ওজনযুক্ত গড়, আর যে ইনপুট পিক্সেল যত কাছে, তার ওজন তত বেশি। দেখো, MATLAB-এর imresize কীভাবে এই ২ বাই ২ ইমেজকে দ্বিগুণ করে। কোণগুলোতে ১, ২, ৩ ও ৪ থাকে। ১ থেকে ২-এর দিকে এক-চতুর্থাংশ দূরের ঘর হয় ০.৭৫ গুণ ১ যোগ ০.২৫ গুণ ২, অর্থাৎ ১.২৫।"},
 {k:0,fx:(svg,_)=>{for(let i=0;i<4;i++)for(let j=0;j<4;j++)_.O.set(i,j,_.v(i,j).v.toFixed(2));_.O.clear("a");$$(svg,"#bl-f").textContent="1.00 1.25 1.75 2.00 / … / 3.00 3.25 3.75 4.00"},
   en:"The full result changes smoothly from 1 to 4. Compared with nearest neighbour, bilinear gives smoother zoomed images, without blocky steps.",
   bn:"পূর্ণ ফলাফলটি ১ থেকে ৪ পর্যন্ত মসৃণভাবে বদলায়। নিয়ারেস্ট নেইবারের তুলনায় বাইলিনিয়ার জুম করা ইমেজকে মসৃণ করে, ব্লকের মতো ধাপ থাকে না।"}
],
points:[{en:"Bilinear: weighted average of the <b>4 nearest</b> pixels.",bn:"বাইলিনিয়ার: সবচেয়ে কাছের <b>৪টি</b> পিক্সেলের ওজনযুক্ত গড়।"},{en:"imresize([1 2; 3 4], 2) → rows 1.00 1.25 1.75 2.00 … 3.00 3.25 3.75 4.00.",bn:"imresize([1 2; 3 4], 2) → সারি ১.০০ ১.২৫ ১.৭৫ ২.০০ … ৩.০০ ৩.২৫ ৩.৭৫ ৪.০০।"}]},
/* 6 */
{id:"compare",slides:"22–23",title:{en:"Zooming: nearest neighbour vs bilinear",bn:"জুম: নিয়ারেস্ট নেইবার বনাম বাইলিনিয়ার"},
svg:`<g data-s="0"><g id="cp-i"></g></g>`,
init(svg,_){const I=gen("scene",128);const crop=mk(24,24,(x,y,c,r)=>I.a[(14+r)*128+72+c]);_.crop=crop;const g=$$(svg,"#cp-i");
  const a=imgEl(g,40,120,96,96,"original 24 × 24");a.show(crop);const b=imgEl(g,180,60,270,270,"nearest neighbour");b.show(resizeNN(crop,240,240));const c=img2(g,490,60,270,270,"bilinear");c.show(resizeBL(crop,240,240))},
steps:[
 {k:0,en:"Here a small part of the image is zoomed ten times. Nearest neighbour keeps hard pixel blocks and jagged edges. Bilinear gives smooth transitions, at the cost of slight blurring. Bicubic, which uses 16 neighbours, is left for self study. Try other zoom factors below.",
   bn:"এখানে ইমেজের একটি ছোট অংশ দশগুণ জুম করা হয়েছে। নিয়ারেস্ট নেইবারে শক্ত পিক্সেল ব্লক ও খাঁজকাটা কিনারা থেকে যায়। বাইলিনিয়ার মসৃণ পরিবর্তন দেয়, তবে সামান্য ঝাপসা হয়। বাইকিউবিক, যা ১৬টি প্রতিবেশী ব্যবহার করে, সেটি নিজে পড়ার জন্য। নিচে অন্য জুম ফ্যাক্টর দিয়ে চেষ্টা করো।"}
],
panel:()=>`<h3>${tr({en:"Try it: zoom factor",bn:"নিজে করো: জুম ফ্যাক্টর"})}</h3><div class="prow"><label>${tr({en:"Zoom",bn:"জুম"})} <input type="range" id="cz" min="2" max="12" value="6"><output id="czo"></output></label></div>
 <div class="out"><figure style="margin:0"><img id="cza" alt="" width="200" height="200" style="image-rendering:pixelated;border-radius:6px"><figcaption class="fine">${tr({en:"nearest neighbour",bn:"নিয়ারেস্ট নেইবার"})}</figcaption></figure>
 <figure style="margin:0"><img id="czb" alt="" width="200" height="200" style="border-radius:6px"><figcaption class="fine">${tr({en:"bilinear",bn:"বাইলিনিয়ার"})}</figcaption></figure></div>`,
bind(root){const I=gen("scene",128);const crop=mk(24,24,(x,y,c,r)=>I.a[(14+r)*128+72+c]);const f=()=>{const z=+root.querySelector("#cz").value;root.querySelector("#czo").textContent=z+"×";root.querySelector("#cza").src=toURL(resizeNN(crop,24*z,24*z));root.querySelector("#czb").src=toURL(resizeBL(crop,24*z,24*z))};root.querySelector("#cz").oninput=f;f()},
points:[{en:"Nearest neighbour: blocky. Bilinear: smoother. Bicubic: self study.",bn:"নিয়ারেস্ট নেইবার: ব্লকের মতো। বাইলিনিয়ার: মসৃণ। বাইকিউবিক: নিজে পড়ো।"}]}
],
quiz:[
 {q:{en:"Spatial resolution is commonly measured in…",bn:"স্পেশাল রেজোলিউশন সাধারণত মাপা হয়…"},o:[{en:"bits",bn:"বিটে"},{en:"line pairs per unit distance",bn:"প্রতি একক দূরত্বে লাইন পেয়ারে"},{en:"gray levels",bn:"গ্রে লেভেলে"},{en:"lumens",bn:"লুমেনে"}],a:1,w:{en:"Or dots (pixels) per unit distance, such as dpi.",bn:"অথবা প্রতি একক দূরত্বে ডট (পিক্সেল), যেমন dpi।"}},
 {q:{en:"An image quantized to 256 levels has an intensity resolution of…",bn:"২৫৬ লেভেলে কোয়ান্টাইজ করা ইমেজের ইনটেনসিটি রেজোলিউশন…"},o:[{en:"256 bits",bn:"২৫৬ বিট"},{en:"16 bits",bn:"১৬ বিট"},{en:"8 bits",bn:"৮ বিট"},{en:"2 bits",bn:"২ বিট"}],a:2,w:{en:"2⁸ = 256.",bn:"২⁸ = ২৫৬।"}},
 {q:{en:"Ridge-like structures in smooth areas caused by too few levels are called…",bn:"কম লেভেলের কারণে মসৃণ অঞ্চলে শিরার মতো রেখাকে বলে…"},o:[{en:"aliasing",bn:"অ্যালিয়াসিং"},{en:"false contouring",bn:"ফলস কনট্যুরিং"},{en:"Mach bands",bn:"মাক ব্যান্ড"},{en:"salt and pepper noise",bn:"সল্ট অ্যান্ড পেপার নয়েজ"}],a:1,w:{en:"Visible around 32 levels and below in the slides' example.",bn:"স্লাইডের উদাহরণে ৩২ লেভেল ও তার নিচে দেখা যায়।"}},
 {q:{en:"Iso-preference curves become more vertical when the image has…",bn:"আইসো-প্রেফারেন্স কার্ভ আরও খাড়া হয় যখন ইমেজে থাকে…"},o:[{en:"more detail",bn:"বেশি খুঁটিনাটি"},{en:"less detail",bn:"কম খুঁটিনাটি"},{en:"more colour",bn:"বেশি রং"},{en:"more noise",bn:"বেশি নয়েজ"}],a:0,w:{en:"Detailed images need few intensity levels.",bn:"বেশি খুঁটিনাটির ইমেজে কম লেভেল লাগে।"}},
 {q:{en:"Zooming [1 4 7; 2 5 8; 3 6 9] ×3 by nearest neighbour makes the top-left 3 × 3 block equal to…",bn:"[১ ৪ ৭; ২ ৫ ৮; ৩ ৬ ৯] নিয়ারেস্ট নেইবারে ×৩ করলে উপরের বাঁ ৩ × ৩ ব্লক হবে…"},o:[{en:"all 1",bn:"সব ১"},{en:"1, 4, 7",bn:"১, ৪, ৭"},{en:"all 5",bn:"সব ৫"},{en:"1 to 9",bn:"১ থেকে ৯"}],a:0,w:{en:"Each pixel is copied into a 3 × 3 block.",bn:"প্রতিটি পিক্সেল একটি ৩ × ৩ ব্লকে কপি হয়।"}},
 {q:{en:"Bilinear interpolation uses how many neighbours?",bn:"বাইলিনিয়ার ইন্টারপোলেশন কয়টি প্রতিবেশী ব্যবহার করে?"},o:[{en:"1",bn:"১"},{en:"4",bn:"৪"},{en:"9",bn:"৯"},{en:"16",bn:"১৬"}],a:1,w:{en:"Nearest neighbour uses 1, bicubic 16.",bn:"নিয়ারেস্ট নেইবার ১টি, বাইকিউবিক ১৬টি।"}}
]});
})();
