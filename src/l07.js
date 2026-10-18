/* ===== Lecture 07 · Basic relationships between pixels ===== */
(()=>{
const N4=(r,c)=>[[r-1,c],[r+1,c],[r,c-1],[r,c+1]],ND=(r,c)=>[[r-1,c-1],[r-1,c+1],[r+1,c-1],[r+1,c+1]];
function bfs(G,V,type,s,g){const R=G.length,C=G[0].length,inV=(r,c)=>r>=0&&c>=0&&r<R&&c<C&&V.includes(G[r][c]);
  const nb=(r,c)=>{const o=N4(r,c).filter(q=>inV(...q));if(type!=="4")ND(r,c).forEach(q=>{if(!inV(...q))return;if(type==="8")o.push(q);else{const a=N4(r,c).map(String),b=N4(...q).map(String);const com=a.filter(x=>b.includes(x)).map(x=>x.split(",").map(Number));if(!com.some(x=>inV(...x)))o.push(q)}});return o};
  const prev={[s]:null},Q=[s];while(Q.length){const u=Q.shift();for(const v of nb(...u))if(!(v in prev)){prev[v]=u;Q.push(v)}}
  if(!(g in prev))return null;const p=[g];while(prev[p[p.length-1]])p.push(prev[p[p.length-1]]);return p.reverse()}
lecture({id:"l07",no:"07",title:{en:"Basic Relationships Between Pixels",bn:"পিক্সেলের মধ্যে মৌলিক সম্পর্ক"},book:{en:"Ch. 2 · Digital Image Fundamentals",bn:"চ্যাপ্টার ২ · ডিজিটাল ইমেজ ফান্ডামেন্টালস"},
chapters:[
/* 1 */
{id:"neighbors",slides:"2–4",title:{en:"Neighbours of a pixel: N4, ND, N8",bn:"পিক্সেলের প্রতিবেশী: N4, ND, N8"},
svg:`<g id="nb-g"></g><text id="nb-t" class="mono lg am" x="580" y="200"></text><text id="nb-t2" class="dim sm" x="580" y="232"></text>
<line class="arrw" x1="150" y1="40" x2="480" y2="40" marker-end="url(#ahw)"/><text class="sm" x="490" y="45">x</text>
<line class="arrw" x1="132" y1="58" x2="132" y2="400" marker-end="url(#ahw)"/><text class="sm" x="124" y="420">y</text>`,
init(svg,_){const L=[["(x−1,y−1)","(x,y−1)","(x+1,y−1)"],["(x−1,y)","p(x,y)","(x+1,y)"],["(x−1,y+1)","(x,y+1)","(x+1,y+1)"]];
  _.M=mat($$(svg,"#nb-g"),{x:150,y:60,cs:68,fs:10,data:Array.from({length:5},(_,r)=>Array.from({length:5},(_,c)=>r>0&&r<4&&c>0&&c<4?L[r-1][c-1]:""))});_.M.cls(2,2,"d")},
steps:[
 {fx:(svg,_)=>{_.M.clear("b","a");[[1,2],[3,2],[2,1],[2,3]].forEach(([r,c])=>_.M.cls(r,c,"b"));$$(svg,"#nb-t").textContent="N4(p)";$$(svg,"#nb-t2").textContent="4 horizontal and vertical neighbours"},
   en:"A pixel p at x, y has four horizontal and vertical neighbours: at x plus or minus one, y, and at x, y plus or minus one. This set is called the 4-neighbours of p, written N4 of p. Each one is a unit distance from p.",
   bn:"x, y অবস্থানের একটি পিক্সেল p-এর চারটি আনুভূমিক ও উল্লম্ব প্রতিবেশী আছে: x যোগ বা বিয়োগ এক, y-তে, এবং x, y যোগ বা বিয়োগ এক-এ। এই সেটকে বলে p-এর ৪-প্রতিবেশী, লেখা হয় N4(p)। প্রতিটির দূরত্ব p থেকে এক একক।"},
 {fx:(svg,_)=>{_.M.clear("b","a");[[1,1],[1,3],[3,1],[3,3]].forEach(([r,c])=>_.M.cls(r,c,"a"));$$(svg,"#nb-t").textContent="ND(p)";$$(svg,"#nb-t2").textContent="4 diagonal neighbours"},
   en:"The four diagonal neighbours of p are written N D of p.",
   bn:"p-এর চারটি কোণাকুণি প্রতিবেশীকে লেখা হয় ND(p)।"},
 {fx:(svg,_)=>{_.M.clear("b","a");[[1,2],[3,2],[2,1],[2,3]].forEach(([r,c])=>_.M.cls(r,c,"b"));[[1,1],[1,3],[3,1],[3,3]].forEach(([r,c])=>_.M.cls(r,c,"a"));$$(svg,"#nb-t").textContent="N8(p) = N4 ∪ ND";$$(svg,"#nb-t2").textContent="all 8 surrounding pixels"},
   en:"Together, the 4-neighbours and the diagonal neighbours form the 8-neighbours of p, N8 of p. If p is on the border of the image, some of these neighbours fall outside the image.",
   bn:"৪-প্রতিবেশী ও কোণাকুণি প্রতিবেশী মিলে হয় p-এর ৮-প্রতিবেশী, N8(p)। p যদি ইমেজের কিনারায় থাকে, তাহলে কিছু প্রতিবেশী ইমেজের বাইরে পড়ে।"}
].map(s=>Object.assign({k:0},s)),
points:[{en:"<b>N4(p)</b>: (x±1, y), (x, y±1). <b>ND(p)</b>: the four diagonals. <b>N8(p)</b> = N4(p) ∪ ND(p).",bn:"<b>N4(p)</b>: (x±১, y), (x, y±১)। <b>ND(p)</b>: চারটি কোণাকুণি। <b>N8(p)</b> = N4(p) ∪ ND(p)।"}]},
/* 2 */
{id:"adjacency",slides:"5–7",title:{en:"Adjacency: 4 and 8",bn:"অ্যাডজেসেন্সি: ৪ ও ৮"},
svg:`<g data-scene="a4"><g data-s="0"><text class="h" x="60" y="50">4-ADJACENCY · V = {1}</text><g id="a4g"></g>
  <text class="sm" x="430" y="140">p: the centre pixel (red)</text><text class="sm gn" x="430" y="170">q: 4-adjacent to p (green)</text><text class="dim sm" x="430" y="210">q must be in N4(p)</text><text class="dim sm" x="430" y="234">and its value must be in V</text></g></g>
<g data-scene="a8"><g data-s="0"><text class="h" x="60" y="50">8-ADJACENCY · V = {1, 2}</text><g id="a8g"></g>
  <text class="sm" x="430" y="140">p = 2 at the centre</text><text class="sm gn" x="430" y="170">q: 8-adjacent to p</text><text class="dim sm" x="430" y="210">q must be in N8(p)</text><text class="dim sm" x="430" y="234">and its value must be in V</text></g></g>`,
init(svg,_){_.A=mat($$(svg,"#a4g"),{x:80,y:90,cs:90,fs:20,data:[[1,1,0],[1,1,0],[1,0,1]]});_.B=mat($$(svg,"#a8g"),{x:80,y:90,cs:90,fs:20,data:[[0,1,1],[0,2,0],[0,0,1]]});_.A.cls(1,1,"d");_.B.cls(1,1,"d")},
steps:[
 {scene:"a4",k:0,fx:(svg,_)=>{_.A.clear("c");return seq([[600,()=>_.A.cls(0,1,"c")],[600,()=>_.A.cls(1,0,"c")]],true,2200)},
   en:"Two pixels are adjacent if they are neighbours and their values satisfy a similarity criterion. V is the set of values that count. For a binary image, V is a subset of 0 and 1. With 4-adjacency, q is adjacent to p if q is in N4 of p and both values are in V. Here only the pixels above and to the left qualify.",
   bn:"দুটি পিক্সেল অ্যাডজেসেন্ট হয় যদি তারা প্রতিবেশী হয় এবং তাদের মান একটি সাদৃশ্যের শর্ত পূরণ করে। V হলো যে মানগুলো গণ্য হবে তার সেট। বাইনারি ইমেজে V হলো ০ ও ১-এর একটি উপসেট। ৪-অ্যাডজেসেন্সিতে q অ্যাডজেসেন্ট হবে যদি q, N4(p)-তে থাকে এবং দুটোর মানই V-তে থাকে। এখানে শুধু উপরের ও বাঁয়ের পিক্সেল শর্ত পূরণ করে।"},
 {scene:"a8",k:0,fx:(svg,_)=>{_.B.clear("c");return seq([[600,()=>_.B.cls(0,1,"c")],[600,()=>_.B.cls(0,2,"c")],[600,()=>_.B.cls(2,2,"c")]],true,2200)},
   en:"With 8-adjacency, q only needs to be in N8 of p, so diagonal pixels count too. In a gray image, V can be any range of values, for example 1 and 2. Here three pixels are 8-adjacent to the centre.",
   bn:"৮-অ্যাডজেসেন্সিতে q শুধু N8(p)-তে থাকলেই হয়, তাই কোণাকুণি পিক্সেলও গণ্য হয়। গ্রে ইমেজে V যেকোনো মানের সেট হতে পারে, যেমন ১ ও ২। এখানে তিনটি পিক্সেল মাঝের পিক্সেলের সাথে ৮-অ্যাডজেসেন্ট।"}
],
points:[{en:"<b>V</b>: set of intensity values defining adjacency (binary: V ⊂ {0,1}; gray: V ⊂ {0,…,255}).",bn:"<b>V</b>: অ্যাডজেসেন্সি নির্ধারণকারী মানের সেট (বাইনারি: V ⊂ {০,১}; গ্রে: V ⊂ {০,…,২৫৫})।"},{en:"<b>4-adjacent</b>: q ∈ N4(p). <b>8-adjacent</b>: q ∈ N8(p). Both values in V.",bn:"<b>৪-অ্যাডজেসেন্ট</b>: q ∈ N4(p)। <b>৮-অ্যাডজেসেন্ট</b>: q ∈ N8(p)। দুটোর মানই V-তে।"}]},
/* 3 */
{id:"madj",slides:"8–14",title:{en:"m-adjacency (mixed adjacency)",bn:"m-অ্যাডজেসেন্সি (মিশ্র অ্যাডজেসেন্সি)"},
svg:`<g id="ma-g"></g><g id="ma-l"></g><text class="h" x="470" y="80">V = {1}</text><text id="ma-t" class="sm" x="470" y="120"></text><text id="ma-t2" class="dim sm" x="470" y="146"></text><text id="ma-t3" class="dim sm" x="470" y="172"></text>
<text class="mono sm" x="470" y="260">q ∈ N4(p), or</text><text class="mono sm" x="470" y="286">q ∈ ND(p) and N4(p) ∩ N4(q)</text><text class="mono sm" x="470" y="312">has no pixels with values in V</text>`,
init(svg,_){const D=[[0,1,1],[0,1,0],[0,0,1]],L="abcdefghi";_.M=mat($$(svg,"#ma-g"),{x:70,y:90,cs:100,fs:22,data:D});
  for(let r=0;r<3;r++)for(let c=0;c<3;c++){txt(_.M.g,70+c*100+12,90+r*100+22,L[r*3+c],"dim sm");if(D[r][c])_.M.cls(r,c,"on")}
  const C=(r,c)=>[70+c*100+50,90+r*100+50];_.line=(a,b,cls)=>{const[x1,y1]=C(...a),[x2,y2]=C(...b);return el($$(svg,"#ma-l"),"line",{x1,y1,x2,y2,style:`stroke:${cls};stroke-width:5;stroke-linecap:round`})};
  _.say=(a,b,c)=>{$$(svg,"#ma-t").textContent=a;$$(svg,"#ma-t2").textContent=b;$$(svg,"#ma-t3").textContent=c||""}},
steps:[
 {fx:(svg,_)=>{$$(svg,"#ma-l").innerHTML="";[[[0,1],[0,2]],[[0,1],[1,1]],[[0,2],[1,1]],[[1,1],[2,2]]].forEach(([a,b])=>_.line(a,b,"#F2A93B"));_.say("8-adjacency links every pair","c and e are linked twice:","directly, and through b. Ambiguous!")},
   en:"8-adjacency can create ambiguity. Look at the 1-valued pixels b, c, e and i. With 8-adjacency, c connects to e directly, and also through b. There are two different paths between the same pixels.",
   bn:"৮-অ্যাডজেসেন্সি দ্ব্যর্থতা তৈরি করতে পারে। ১ মানের পিক্সেল b, c, e ও i দেখো। ৮-অ্যাডজেসেন্সিতে c সরাসরি e-এর সাথে যুক্ত, আবার b-এর মাধ্যমেও যুক্ত। একই পিক্সেলের মধ্যে দুটি আলাদা পথ তৈরি হয়।"},
 {fx:(svg,_)=>{$$(svg,"#ma-l").innerHTML="";_.line([0,1],[0,2],"#4CC489");_.line([0,1],[1,1],"#4CC489");_.say("b & c: m-adjacent (4-neighbours)","b & e: m-adjacent (4-neighbours)")},
   en:"m-adjacency, or mixed adjacency, fixes this. q is m-adjacent to p if q is in N4 of p, or if q is diagonal and N4 of p and N4 of q share no pixel with a value in V. So b and c are m-adjacent, and b and e are m-adjacent, because they are 4-neighbours.",
   bn:"m-অ্যাডজেসেন্সি বা মিশ্র অ্যাডজেসেন্সি এই সমস্যা দূর করে। q, p-এর সাথে m-অ্যাডজেসেন্ট হবে যদি q, N4(p)-তে থাকে, অথবা q কোণাকুণি হয় এবং N4(p) ও N4(q)-এর মধ্যে V-তে থাকা কোনো সাধারণ পিক্সেল না থাকে। তাই b ও c, এবং b ও e m-অ্যাডজেসেন্ট, কারণ তারা ৪-প্রতিবেশী।"},
 {fx:(svg,_)=>{$$(svg,"#ma-l").innerHTML="";_.line([0,1],[0,2],"#4CC489");_.line([0,1],[1,1],"#4CC489");const x=_.line([0,2],[1,1],"#F07A62");x.style.strokeDasharray="8 8";_.line([1,1],[2,2],"#4CC489");_.say("c & e: NOT m-adjacent (b is a shared 4-neighbour = 1)","e & i: m-adjacent (shared f and h are 0)","each pair now has exactly one path")},
   en:"c and e are diagonal, but they share the 4-neighbour b, which has value 1. So c and e are not m-adjacent. e and i are diagonal too, but their shared 4-neighbours f and h are both 0, so they are m-adjacent. Now there is only one path between any two pixels.",
   bn:"c ও e কোণাকুণি, কিন্তু তাদের সাধারণ ৪-প্রতিবেশী b-এর মান ১। তাই c ও e m-অ্যাডজেসেন্ট নয়। e ও i-ও কোণাকুণি, কিন্তু তাদের সাধারণ ৪-প্রতিবেশী f ও h দুটোই ০, তাই তারা m-অ্যাডজেসেন্ট। এখন যেকোনো দুটি পিক্সেলের মধ্যে মাত্র একটি পথ থাকে।"}
].map(s=>Object.assign({k:0},s)),
points:[{en:"<b>m-adjacent</b>: q ∈ N4(p), or q ∈ ND(p) and N4(p) ∩ N4(q) has no pixels with values in V.",bn:"<b>m-অ্যাডজেসেন্ট</b>: q ∈ N4(p), অথবা q ∈ ND(p) এবং N4(p) ∩ N4(q)-এ V-এর কোনো মান নেই।"},{en:"m-adjacency removes the multiple-path ambiguity of 8-adjacency.",bn:"m-অ্যাডজেসেন্সি ৮-অ্যাডজেসেন্সির একাধিক পথের দ্ব্যর্থতা দূর করে।"}]},
/* 4 */
{id:"paths",slides:"15–19",title:{en:"Connectivity and shortest paths",bn:"কানেক্টিভিটি ও সংক্ষিপ্ততম পথ"},
svg:`<g id="pt-g"></g><g id="pt-l"></g><text class="h" x="420" y="70">V = {1, 2} · from p to q</text>
<text id="pt-4" class="mono" x="420" y="140"></text><text id="pt-8" class="mono" x="420" y="190"></text><text id="pt-m" class="mono" x="420" y="240"></text>
<text class="dim sm" x="420" y="320">path length = number of moves</text>`,
init(svg,_){_.G=[[4,2,3,2],[3,3,1,3],[2,3,2,2],[2,1,2,3]];_.M=mat($$(svg,"#pt-g"),{x:60,y:90,cs:76,fs:20,data:_.G});
  for(let r=0;r<4;r++)for(let c=0;c<4;c++)if([1,2].includes(_.G[r][c]))_.M.cls(r,c,"on");
  txt(_.M.g,60+3*76+62,90+16,"q","am sm");txt(_.M.g,60+62,90+3*76+16,"p","am sm");
  _.draw=(p,col)=>{$$(svg,"#pt-l").innerHTML="";if(!p)return;const pts=p.map(([r,c])=>`${60+c*76+38},${90+r*76+38}`).join(" ");
    const pl=el($$(svg,"#pt-l"),"polyline",{points:pts,style:`fill:none;stroke:${col};stroke-width:7;stroke-linecap:round;stroke-linejoin:round;opacity:.6`});const L=pl.getTotalLength();pl.style.strokeDasharray=L;pl.style.strokeDashoffset=L;pl.style.transition="stroke-dashoffset 1.6s ease";requestAnimationFrame(()=>requestAnimationFrame(()=>pl.style.strokeDashoffset=0))};
  _.P={};["4","8","m"].forEach(t=>_.P[t]=bfs(_.G,[1,2],t,[3,0],[0,3]))},
steps:[
 {fx:(svg,_)=>{_.draw(null);["4","8","m"].forEach(t=>$$(svg,"#pt-"+t).textContent="")},en:"Two pixels are connected if they are adjacent in some sense, and their values satisfy the similarity criterion. Following the type of adjacency, we get 4-connectivity, 8-connectivity and m-connectivity. Let's find the shortest paths from p to q, with V equal to 1 and 2.",
   bn:"দুটি পিক্সেল কানেক্টেড হয় যদি তারা কোনো অর্থে অ্যাডজেসেন্ট হয় এবং তাদের মান সাদৃশ্যের শর্ত পূরণ করে। অ্যাডজেসেন্সির ধরন অনুযায়ী আমরা পাই ৪-কানেক্টিভিটি, ৮-কানেক্টিভিটি ও m-কানেক্টিভিটি। চলো, V সমান ১ ও ২ ধরে p থেকে q পর্যন্ত সংক্ষিপ্ততম পথ খুঁজি।"},
 {fx:(svg,_)=>{_.draw(null);$$(svg,"#pt-4").textContent="shortest 4-path: does not exist";$$(svg,"#pt-4").setAttribute("class","mono rd")},en:"Using only horizontal and vertical moves through pixels with values 1 or 2, we cannot reach q. The shortest 4-path does not exist.",
   bn:"শুধু আনুভূমিক ও উল্লম্বভাবে ১ বা ২ মানের পিক্সেল দিয়ে চললে q-তে পৌঁছানো যায় না। তাই সংক্ষিপ্ততম ৪-পথ নেই।"},
 {fx:(svg,_)=>{_.draw(_.P["8"],"#7FA8FF");$$(svg,"#pt-8").textContent=`shortest 8-path = ${_.P["8"].length-1}`;$$(svg,"#pt-8").setAttribute("class","mono bl")},en:"Allowing diagonal moves, the shortest 8-path has length 4.",
   bn:"কোণাকুণি চলাচলের অনুমতি দিলে সংক্ষিপ্ততম ৮-পথের দৈর্ঘ্য ৪।"},
 {fx:(svg,_)=>{_.draw(_.P.m,"#4CC489");$$(svg,"#pt-m").textContent=`shortest m-path = ${_.P.m.length-1}`;$$(svg,"#pt-m").setAttribute("class","mono gn")},en:"With m-adjacency, one diagonal step is not allowed, because those two pixels share a 4-neighbour in V. The path must go around it, so the shortest m-path has length 5.",
   bn:"m-অ্যাডজেসেন্সিতে একটি কোণাকুণি ধাপ চলে না, কারণ ওই দুটি পিক্সেলের একটি সাধারণ ৪-প্রতিবেশী V-তে আছে। তাই পথটিকে ঘুরে যেতে হয়, এবং সংক্ষিপ্ততম m-পথের দৈর্ঘ্য হয় ৫।"}
].map(s=>Object.assign({k:0},s)),
points:[{en:"4-, 8-, m-connectivity follow from 4-, 8-, m-adjacency.",bn:"৪-, ৮-, m-অ্যাডজেসেন্সি থেকে ৪-, ৮-, m-কানেক্টিভিটি।"},{en:"Example (V = {1,2}): shortest 4-path <b>does not exist</b>; 8-path = <b>4</b>; m-path = <b>5</b>.",bn:"উদাহরণ (V = {১,২}): সংক্ষিপ্ততম ৪-পথ <b>নেই</b>; ৮-পথ = <b>৪</b>; m-পথ = <b>৫</b>।"}]},
/* 5 */
{id:"regions",slides:"20–22",title:{en:"Regions and boundaries",bn:"রিজিয়ন ও বাউন্ডারি"},
svg:`<g data-scene="reg"><g data-s="0"><g id="rg-g"></g><text id="rg-t" class="sm" x="520" y="160"></text><text id="rg-t2" class="dim sm" x="520" y="190"></text></g></g>
<g data-scene="bd"><g data-s="0"><g id="bd-g"></g><text id="bd-t" class="sm" x="520" y="160"></text><text id="bd-t2" class="dim sm" x="520" y="190"></text></g></g>`,
init(svg,_){const A=[[1,1,1,0,0,0],[1,1,1,0,0,0],[1,1,1,0,0,0],[0,0,0,1,1,1],[0,0,0,1,1,1],[0,0,0,1,1,1]];_.R=mat($$(svg,"#rg-g"),{x:80,y:60,cs:56,data:A});
  for(let r=0;r<6;r++)for(let c=0;c<6;c++)if(A[r][c])_.R.cls(r,c,r<3?"b":"a");
  const B=[[0,0,0,0,0,0,0],[0,0,1,1,1,0,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,0,0],[0,0,1,1,0,0,0],[0,0,0,0,0,0,0]];_.B=B;_.D=mat($$(svg,"#bd-g"),{x:80,y:40,cs:50,data:B});
  _.inner=[];_.outer=[];for(let r=0;r<7;r++)for(let c=0;c<7;c++){const n8=[...N4(r,c),...ND(r,c)].filter(([a,b])=>a>=0&&b>=0&&a<7&&b<7);
    if(B[r][c]&&n8.some(([a,b])=>!B[a][b]))_.inner.push([r,c]);if(!B[r][c]&&N4(r,c).some(([a,b])=>a>=0&&b>=0&&a<7&&b<7&&B[a][b]))_.outer.push([r,c])}},
steps:[
 {scene:"reg",k:0,fx:svg=>{$$(svg,"#rg-t").textContent="R1 (blue) and R2 (orange)";$$(svg,"#rg-t2").textContent="they touch only at a corner"},
   en:"A region is a group of connected pixels with similar properties. If R is a subset of pixels and R is a connected set, we call R a region. Here we have two regions of 1s, touching only at one corner.",
   bn:"রিজিয়ন হলো একই রকম বৈশিষ্ট্যের সংযুক্ত পিক্সেলের একটি দল। R যদি পিক্সেলের একটি উপসেট হয় এবং R একটি সংযুক্ত সেট হয়, তাহলে R-কে রিজিয়ন বলে। এখানে ১-এর দুটি রিজিয়ন আছে, যারা শুধু একটি কোণে স্পর্শ করে।"},
 {scene:"reg",k:0,fx:svg=>{$$(svg,"#rg-t").textContent="8-adjacency: adjacent regions";$$(svg,"#rg-t2").textContent="4-adjacency: disjoint regions"},
   en:"Two regions are adjacent if their union forms a connected set. With 8-adjacency, the corner contact joins them, so these regions are adjacent. With 4-adjacency they are not connected, and regions that are not adjacent are called disjoint.",
   bn:"দুটি রিজিয়ন অ্যাডজেসেন্ট হয় যদি তাদের মিলিত সেট সংযুক্ত হয়। ৮-অ্যাডজেসেন্সিতে কোণের স্পর্শ তাদের যুক্ত করে, তাই এরা অ্যাডজেসেন্ট। ৪-অ্যাডজেসেন্সিতে এরা সংযুক্ত নয়, আর যে রিজিয়নগুলো অ্যাডজেসেন্ট নয় তাদের বলে ডিসজয়েন্ট।"},
 {scene:"bd",k:0,fx:(svg,_)=>{_.D.clear("a","b","on");for(let r=0;r<7;r++)for(let c=0;c<7;c++)if(_.B[r][c])_.D.cls(r,c,"on");_.inner.forEach(([r,c])=>_.D.cls(r,c,"a"));$$(svg,"#bd-t").textContent="inner boundary (orange)";$$(svg,"#bd-t2").textContent="pixels in R with a background neighbour"},
   en:"The boundary, also called the border or contour, of a region R is the set of pixels in R that are adjacent to pixels outside R. In other words, boundary pixels have at least one background neighbour. This is the inner boundary.",
   bn:"একটি রিজিয়ন R-এর বাউন্ডারি, যাকে বর্ডার বা কনট্যুরও বলে, হলো R-এর সেই পিক্সেলগুলো যারা R-এর বাইরের পিক্সেলের সাথে অ্যাডজেসেন্ট। অর্থাৎ বাউন্ডারি পিক্সেলের অন্তত একটি ব্যাকগ্রাউন্ড প্রতিবেশী থাকে। এটি ইনার বাউন্ডারি।"},
 {scene:"bd",k:0,fx:(svg,_)=>{_.D.clear("a","b");_.outer.forEach(([r,c])=>_.D.cls(r,c,"b"));$$(svg,"#bd-t").textContent="outer boundary (blue)";$$(svg,"#bd-t2").textContent="background pixels next to R"},
   en:"The outer boundary is the set of background pixels next to the region. If R is the entire image, its boundary is defined as the first and last rows and columns, because an image has no neighbours beyond its border.",
   bn:"আউটার বাউন্ডারি হলো রিজিয়নের পাশের ব্যাকগ্রাউন্ড পিক্সেলগুলো। R যদি পুরো ইমেজ হয়, তাহলে এর বাউন্ডারি হলো প্রথম ও শেষ সারি এবং কলাম, কারণ ইমেজের কিনারার বাইরে কোনো প্রতিবেশী নেই।"}
],
points:[{en:"<b>Region</b>: a connected set R. Regions are <b>adjacent</b> if their union is connected, otherwise <b>disjoint</b>.",bn:"<b>রিজিয়ন</b>: একটি সংযুক্ত সেট R। মিলিত সেট সংযুক্ত হলে রিজিয়নগুলো <b>অ্যাডজেসেন্ট</b>, নইলে <b>ডিসজয়েন্ট</b>।"},{en:"<b>Boundary</b>: pixels of R with at least one background neighbour; inner and outer boundary.",bn:"<b>বাউন্ডারি</b>: R-এর যেসব পিক্সেলের অন্তত একটি ব্যাকগ্রাউন্ড প্রতিবেশী আছে; ইনার ও আউটার বাউন্ডারি।"}]},
/* 6 */
{id:"distance",slides:"23–29",title:{en:"Distance measures",bn:"দূরত্বের পরিমাপ"},
svg:`<g data-scene="def"><g data-s="0"><text class="h" x="60" y="60">D IS A DISTANCE METRIC IF</text>
  <text class="mono lg" x="60" y="120">D(p, q) ≥ 0,  and D(p, q) = 0 iff p = q</text><text class="mono lg" x="60" y="170">D(p, q) = D(q, p)</text><text class="mono lg" x="60" y="220">D(p, z) ≤ D(p, q) + D(q, z)</text>
  <text class="mono am" x="60" y="300">Euclidean     De = √((x−s)² + (y−t)²)</text><text class="mono bl" x="60" y="336">City block    D4 = |x−s| + |y−t|</text><text class="mono gn" x="60" y="372">Chessboard    D8 = max(|x−s|, |y−t|)</text></g></g>
<g data-scene="map"><g data-s="0"><g id="dm-g"></g><text id="dm-t" class="lg mono" x="520" y="140"></text><text id="dm-t2" class="sm dim" x="520" y="176"></text></g></g>`,
init(svg,_){_.M=mat($$(svg,"#dm-g"),{x:80,y:50,cs:56,fs:14,data:Array.from({length:7},()=>Array(7).fill(""))})},
steps:[
 {scene:"def",k:0,en:"For pixels p, q and z, D is a distance function, or metric, if three conditions hold: it is never negative and is zero only when p equals q, it is symmetric, and it obeys the triangle inequality. Three common distances are Euclidean, city block and chessboard.",
   bn:"p, q ও z পিক্সেলের জন্য D একটি দূরত্ব ফাংশন বা মেট্রিক হবে যদি তিনটি শর্ত মানে: এটি কখনো ঋণাত্মক নয় এবং শুধু p সমান q হলে শূন্য, এটি প্রতিসম, এবং ত্রিভুজ অসমতা মেনে চলে। তিনটি প্রচলিত দূরত্ব হলো ইউক্লিডিয়ান, সিটি ব্লক ও চেসবোর্ড।"},
 {scene:"map",k:0,fx:(svg,_)=>{_.M.clear("a","b","c");const L=[];for(let d=0;d<=3;d++)L.push([500,()=>{for(let r=0;r<7;r++)for(let c=0;c<7;c++){const v=Math.hypot(r-3,c-3);if(v<=d+.5&&v>d-.5){_.M.set(r,c,v.toFixed(1));_.M.gray(r,c,1-v/5)}}}]);
   L.reset=()=>{for(let r=0;r<7;r++)for(let c=0;c<7;c++){_.M.set(r,c,"");_.M.cells[r][c].rect.style.fill=""}};$$(svg,"#dm-t").textContent="De: circles";$$(svg,"#dm-t2").textContent="pixels at distance ≤ r form a disc";return seq(L,true,2500)},
   en:"The Euclidean distance is the straight-line distance. Pixels within a distance r of p form a disc centred at p.",
   bn:"ইউক্লিডিয়ান দূরত্ব হলো সরলরেখায় দূরত্ব। p থেকে r দূরত্বের মধ্যের পিক্সেলগুলো p কেন্দ্র করে একটি চাকতি তৈরি করে।"},
 {scene:"map",k:0,fx:(svg,_)=>{const L=[];for(let d=0;d<=6;d++)L.push([450,()=>{for(let r=0;r<7;r++)for(let c=0;c<7;c++){const v=Math.abs(r-3)+Math.abs(c-3);if(v===d){_.M.set(r,c,v);_.M.gray(r,c,1-v/7)}}}]);
   L.reset=()=>{for(let r=0;r<7;r++)for(let c=0;c<7;c++){_.M.set(r,c,"");_.M.cells[r][c].rect.style.fill=""}};$$(svg,"#dm-t").textContent="D4: diamonds";$$(svg,"#dm-t2").textContent="D4 = 1 are exactly the 4-neighbours";return seq(L,true,2500)},
   en:"The city block distance, D4, adds the horizontal and vertical steps. Pixels with D4 at most r form a diamond. The pixels with D4 equal to one are exactly the 4-neighbours of p.",
   bn:"সিটি ব্লক দূরত্ব D4 আনুভূমিক ও উল্লম্ব ধাপ যোগ করে। যেসব পিক্সেলের D4 সর্বোচ্চ r, তারা একটি হীরার আকার তৈরি করে। যাদের D4 এক, তারাই ঠিক p-এর ৪-প্রতিবেশী।"},
 {scene:"map",k:0,fx:(svg,_)=>{const L=[];for(let d=0;d<=3;d++)L.push([600,()=>{for(let r=0;r<7;r++)for(let c=0;c<7;c++){const v=Math.max(Math.abs(r-3),Math.abs(c-3));if(v===d){_.M.set(r,c,v);_.M.gray(r,c,1-v/4.5)}}}]);
   L.reset=()=>{for(let r=0;r<7;r++)for(let c=0;c<7;c++){_.M.set(r,c,"");_.M.cells[r][c].rect.style.fill=""}};$$(svg,"#dm-t").textContent="D8: squares";$$(svg,"#dm-t2").textContent="D8 = 1 are exactly the 8-neighbours";return seq(L,true,2500)},
   en:"The chessboard distance, D8, takes the larger of the two steps, like a king in chess. Pixels with D8 at most r form a square. The pixels with D8 equal to one are the 8-neighbours of p.",
   bn:"চেসবোর্ড দূরত্ব D8 দুটি ধাপের মধ্যে বড়টি নেয়, দাবার রাজার মতো। যেসব পিক্সেলের D8 সর্বোচ্চ r, তারা একটি বর্গ তৈরি করে। যাদের D8 এক, তারাই p-এর ৮-প্রতিবেশী।"}
],
points:[{en:"<b>De</b> = √((x−s)²+(y−t)²): disc. <b>D4</b> = |x−s|+|y−t|: diamond. <b>D8</b> = max(|x−s|,|y−t|): square.",bn:"<b>De</b> = √((x−s)²+(y−t)²): চাকতি। <b>D4</b> = |x−s|+|y−t|: হীরা। <b>D8</b> = max(|x−s|,|y−t|): বর্গ।"}]}
],
quiz:[
 {q:{en:"N8(p) is…",bn:"N8(p) হলো…"},o:[{en:"N4(p) only",bn:"শুধু N4(p)"},{en:"ND(p) only",bn:"শুধু ND(p)"},{en:"N4(p) ∪ ND(p)",bn:"N4(p) ∪ ND(p)"},{en:"N4(p) ∩ ND(p)",bn:"N4(p) ∩ ND(p)"}],a:2,w:{en:"The 4 direct plus the 4 diagonal neighbours.",bn:"৪টি সরাসরি ও ৪টি কোণাকুণি প্রতিবেশী।"}},
 {q:{en:"m-adjacency was introduced to…",bn:"m-অ্যাডজেসেন্সি চালু করা হয়েছে…"},o:[{en:"speed up filtering",bn:"ফিল্টারিং দ্রুত করতে"},{en:"remove multiple-path ambiguity of 8-adjacency",bn:"৮-অ্যাডজেসেন্সির একাধিক পথের দ্ব্যর্থতা দূর করতে"},{en:"measure Euclidean distance",bn:"ইউক্লিডিয়ান দূরত্ব মাপতে"},{en:"compress images",bn:"ইমেজ কমপ্রেস করতে"}],a:1,w:{en:"It allows a diagonal link only when no shared 4-neighbour is in V.",bn:"কোনো সাধারণ ৪-প্রতিবেশী V-তে না থাকলেই কোণাকুণি সংযোগ দেয়।"}},
 {q:{en:"In the slide example (V = {1,2}), the shortest m-path from p to q is…",bn:"স্লাইডের উদাহরণে (V = {১,২}) p থেকে q-এর সংক্ষিপ্ততম m-পথ…"},o:[{en:"does not exist",bn:"নেই"},{en:"4",bn:"৪"},{en:"5",bn:"৫"},{en:"6",bn:"৬"}],a:2,w:{en:"4-path: none; 8-path: 4; m-path: 5.",bn:"৪-পথ: নেই; ৮-পথ: ৪; m-পথ: ৫।"}},
 {q:{en:"Pixels with D4(p,q) ≤ r form a…",bn:"D4(p,q) ≤ r পিক্সেলগুলো তৈরি করে…"},o:[{en:"disc",bn:"চাকতি"},{en:"diamond",bn:"হীরা"},{en:"square",bn:"বর্গ"},{en:"line",bn:"রেখা"}],a:1,w:{en:"City block distance gives diamonds.",bn:"সিটি ব্লক দূরত্বে হীরার আকার হয়।"}},
 {q:{en:"D8 between (2,3) and (5,7) is…",bn:"(২,৩) ও (৫,৭)-এর D8 কত?"},o:[{en:"3",bn:"৩"},{en:"4",bn:"৪"},{en:"5",bn:"৫"},{en:"7",bn:"৭"}],a:1,w:{en:"max(|2−5|, |3−7|) = max(3, 4) = 4.",bn:"max(|২−৫|, |৩−৭|) = max(৩, ৪) = ৪।"}},
 {q:{en:"Two regions whose union is not connected are…",bn:"যে দুটি রিজিয়নের মিলিত সেট সংযুক্ত নয় তারা…"},o:[{en:"adjacent",bn:"অ্যাডজেসেন্ট"},{en:"disjoint",bn:"ডিসজয়েন্ট"},{en:"boundaries",bn:"বাউন্ডারি"},{en:"m-connected",bn:"m-কানেক্টেড"}],a:1,w:{en:"Non-adjacent regions are disjoint.",bn:"অ্যাডজেসেন্ট নয় এমন রিজিয়ন ডিসজয়েন্ট।"}}
]});
})();
