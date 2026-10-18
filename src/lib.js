/* ================= widget + image library ================= */
const NS="http://www.w3.org/2000/svg";
const BLOB="M-10,-40 C-35,-48 -60,-20 -55,15 C-50,48 -5,60 30,45 C62,30 60,-10 35,-28 C25,-35 10,-30 -10,-40 Z";
const SUN=(x,y)=>`<g transform="translate(${x},${y})"><g class="sun"><circle r="34" fill="url(#sung)"/><circle r="13" class="core"/></g></g>`;
function el(p,tag,at,txt){const e=document.createElementNS(NS,tag);if(at)for(const k in at)e.setAttribute(k,at[k]);if(txt!=null)e.textContent=txt;if(p)p.appendChild(e);return e}
function txt(p,x,y,s,cls,at){return el(p,"text",Object.assign({x,y,class:cls||""},at||{}),s)}
const $$=(svg,s)=>svg.querySelector(s);

/* numeric / colour matrix */
function mat(p,o){const g=el(p,"g",{class:o.cls||""});const R=o.data.length,C=o.data[0].length,cs=o.cs||40,fmt=o.fmt||(v=>v);
  const cells=[];for(let r=0;r<R;r++){cells.push([]);for(let c=0;c<C;c++){
    const x=o.x+c*cs,y=o.y+r*cs,rect=el(g,"rect",{x,y,width:cs,height:cs,class:"cell"});
    const t=o.notext?null:el(g,"text",{x:x+cs/2,y:y+cs/2,class:"ctext",style:o.fs?`font-size:${o.fs}px`:""},fmt(o.data[r][c]));
    cells[r].push({rect,t,x,y})}}
  const M={g,cells,R,C,cs,data:o.data.map(r=>r.slice()),
    set(r,c,v){M.data[r][c]=v;if(cells[r][c].t)cells[r][c].t.textContent=fmt(v)},
    cls(r,c,k,on=true){const R=cells[r][c].rect;R.classList.toggle(k,on);if(cells[r][c].t)cells[r][c].t.classList.toggle("dk",["w","a","c"].some(q=>R.classList.contains(q)))},
    clear(...ks){for(const row of cells)for(const x of row){ks.forEach(k=>x.rect.classList.remove(k));x.t&&x.t.classList.toggle("dk",["w","a","c"].some(q=>x.rect.classList.contains(q)))}},
    gray(r,c,v){cells[r][c].rect.style.fill=`hsl(215 8% ${Math.round(v*92+3)}%)`;if(cells[r][c].t)cells[r][c].t.classList.toggle("dk",v>.55)},
    hide(r,c,h=true){cells[r][c].rect.style.opacity=h?0:1;if(cells[r][c].t)cells[r][c].t.style.opacity=h?0:1},
    center(r,c){return[o.x+c*cs+cs/2,o.y+r*cs+cs/2]}};
  if(o.label)txt(g,o.x+C*cs/2,o.y-10,o.label,"dim c sm");
  return M}
/* moving kernel outline */
function kbox(p,M,size){const b=el(p,"rect",{x:M.cells[0][0].x,y:M.cells[0][0].y,width:M.cs*size,height:M.cs*size,class:"kbox"});
  return{el:b,at(r,c){b.style.transform=`translate(${(c)*M.cs}px,${(r)*M.cs}px)`}}}

/* image element (gray float arrays) */
function imgEl(p,x,y,w,h,label){const g=el(p,"g");const im=el(g,"image",{x,y,width:w,height:h,class:"pix",preserveAspectRatio:"none"});
  el(g,"rect",{x,y,width:w,height:h,class:"frame"});if(label)txt(g,x+w/2,y+h+20,label,"dim c sm");
  return{g,el:im,show(I,norm){im.setAttribute("href",toURL(I,norm))}}}
const _cv=document.createElement("canvas");
function toURL(I,norm){const{w,h,a}=I;_cv.width=w;_cv.height=h;const cx=_cv.getContext("2d");const d=cx.createImageData(w,h);
  let lo=0,hi=1;if(norm){lo=Infinity;hi=-Infinity;for(const v of a){if(v<lo)lo=v;if(v>hi)hi=v}if(hi===lo)hi=lo+1}
  for(let i=0;i<w*h;i++){const v=Math.max(0,Math.min(255,Math.round((a[i]-lo)/(hi-lo)*255)));d.data[i*4]=d.data[i*4+1]=d.data[i*4+2]=v;d.data[i*4+3]=255}
  cx.putImageData(d,0,0);return _cv.toDataURL()}
function rgbURL(w,h,f){_cv.width=w;_cv.height=h;const cx=_cv.getContext("2d");const d=cx.createImageData(w,h);
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const [r,g,b]=f(x/w,y/h);const i=(y*w+x)*4;d.data[i]=r;d.data[i+1]=g;d.data[i+2]=b;d.data[i+3]=255}
  cx.putImageData(d,0,0);return _cv.toDataURL()}

/* plot */
function plot(p,o){const g=el(p,"g");const{x,y,w,h}=o,xm=o.xmax??1,ym=o.ymax??1;
  const X=v=>x+v/xm*w,Y=v=>y+h-v/ym*h;
  if(o.grid)for(let i=1;i<4;i++){el(g,"line",{x1:x,x2:x+w,y1:y+h*i/4,y2:y+h*i/4,class:"gl"});el(g,"line",{y1:y,y2:y+h,x1:x+w*i/4,x2:x+w*i/4,class:"gl"})}
  el(g,"path",{d:`M${x} ${y} V${y+h} H${x+w}`,class:"axis"});
  if(o.xl)txt(g,x+w,y+h+22,o.xl,"dim e sm");if(o.yl)txt(g,x,y-12,o.yl,"dim sm");
  if(o.xt)o.xt.forEach(v=>txt(g,X(v),y+h+18,String(v),"dim c xs mono"));
  if(o.yt)o.yt.forEach(v=>txt(g,x-6,Y(v)+4,String(v),"dim e xs mono"));
  const P={g,X,Y,
    path(f,n=120){let d="",pen=false;for(let i=0;i<=n;i++){const v=i/n*xm,fv=f(v);if(!isFinite(fv)){pen=false;continue}d+=`${pen?"L":"M"}${X(v).toFixed(1)} ${Y(Math.max(0,Math.min(ym,fv))).toFixed(1)}`;pen=true}return d||"M0 0"},
    fn(f,cls,n=120){return el(g,"path",{d:P.path(f,n),class:cls||"curve"})},
    upd(path,f,n=120){path.setAttribute("d",P.path(f,n))},
    line(pts,cls){return el(g,"path",{d:pts.map((q,i)=>`${i?"L":"M"}${X(q[0])} ${Y(q[1])}`).join(""),class:cls||"curve"})},
    dot(vx,vy,cls){return el(g,"circle",{cx:X(vx),cy:Y(vy),r:5,class:cls||"spot"})}};
  return P}
/* histogram bars */
function bars(p,o){const g=el(p,"g");const{x,y,w,h,n}=o;const bw=w/n;const rs=[];
  el(g,"path",{d:`M${x} ${y} V${y+h} H${x+w}`,class:"axis"});
  for(let i=0;i<n;i++)rs.push(el(g,"rect",{x:x+i*bw+bw*.12,y:y+h,width:bw*.76,height:0,class:o.cls||"hbar"}));
  const labs=[];if(o.labels)for(let i=0;i<n;i++)labs.push(txt(g,x+i*bw+bw/2,y+h+16,String(o.labels[i]),"dim c xs mono"));
  if(o.title)txt(g,x+w/2,y-10,o.title,"dim c sm");
  const vt=[];if(o.values)for(let i=0;i<n;i++)vt.push(txt(g,x+i*bw+bw/2,y+h-4,"","c xs mono"));
  return{g,rs,set(vals,max){const m=max||Math.max(...vals,1e-9);vals.forEach((v,i)=>{const hh=v/m*h;rs[i].setAttribute("y",y+h-hh);rs[i].setAttribute("height",hh);if(vt[i]){vt[i].textContent=o.fmtv?o.fmtv(v):v;vt[i].setAttribute("y",y+h-hh-5)}})}}}
/* text table */
function table(p,o){const g=el(p,"g");const X=[o.x];o.cw.forEach(w=>X.push(X[X.length-1]+w));const rh=o.rh||30,fs=o.fs||13;
  o.head.forEach((h,c)=>{el(g,"rect",{x:X[c],y:o.y,width:o.cw[c],height:rh,class:"box"});txt(g,X[c]+o.cw[c]/2,o.y+rh/2+5,h,"c xs mono am")});
  const cells=o.rows.map((row,r)=>row.map((v,c)=>{const y=o.y+(r+1)*rh;const rect=el(g,"rect",{x:X[c],y,width:o.cw[c],height:rh,class:"cell"});const t=el(g,"text",{x:X[c]+o.cw[c]/2,y:y+rh/2,class:"ctext",style:`font-size:${fs}px`},v);return{rect,t}}));
  return{g,cells,set(r,c,v){cells[r][c].t.textContent=v},hl(r,on=true,k="a"){cells[r].forEach(x=>{x.rect.classList.toggle(k,on);x.t.classList.toggle("dk",on)})},clear(k="a"){cells.forEach((row,r)=>this.hl(r,false,k))},
    col(c,v){cells.forEach(row=>row[c].t.style.opacity=v)}}}
function arrow(p,x1,y1,x2,y2,cls,mk){return el(p,"line",{x1,y1,x2,y2,class:cls||"arrw","marker-end":`url(#${mk||"ahw"})`})}
function boxT(p,x,y,w,h,label,cls,sub){const g=el(p,"g");el(g,"rect",{x,y,width:w,height:h,rx:8,class:cls||"box"});
  txt(g,x+w/2,y+h/2+(sub?-4:5),label,"c");if(sub)txt(g,x+w/2,y+h/2+16,sub,"dim c xs");return g}

/* timers */
function seq(list,loop,gap=1500){let t,i=0,dead=false;const run=()=>{if(dead)return;if(i>=list.length){if(loop){i=0;t=setTimeout(run,gap);if(list.reset)list.reset()}return}
  const [d,f]=list[i++];t=setTimeout(()=>{if(dead)return;f();run()},d)};if(list.reset)list.reset();run();return()=>{dead=true;clearTimeout(t)}}
function every(ms,f){f();const t=setInterval(f,ms);return()=>clearInterval(t)}
function rafLoop(f){let r,t0;const s=ts=>{if(t0==null)t0=ts;f((ts-t0)/1000);r=requestAnimationFrame(s)};r=requestAnimationFrame(s);return()=>cancelAnimationFrame(r)}

/* ---------- images ---------- */
function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
const IMG={w:0};
const mk=(w,h,f)=>{const a=new Float32Array(w*h);for(let y=0;y<h;y++)for(let x=0;x<w;x++)a[y*w+x]=f(x/w,y/h,x,y);return{w,h,a}};
const sm=(d,e=.012)=>Math.max(0,Math.min(1,.5-d/e/2));/* inside->1 */
const CACHE={};
function gen(kind,w=128,h=w){const key=kind+w+"x"+h;if(CACHE[key])return CACHE[key];let I;const R=rng(7);
  if(kind==="scene")I=mk(w,h,(x,y)=>{let v=.22+.4*y;
    v=v*(1-sm(Math.hypot(x-.72,y-.27)-.14))+.96*sm(Math.hypot(x-.72,y-.27)-.14);
    const sq=Math.max(Math.abs(x-.27)-.15,Math.abs(y-.68)-.17);v=v*(1-sm(sq))+.08*sm(sq);
    const sq2=Math.max(Math.abs(x-.27)-.06,Math.abs(y-.68)-.07);v=v*(1-sm(sq2))+.55*sm(sq2);
    const ring=Math.abs(Math.hypot(x-.72,y-.72)-.14)-.025;v=v*(1-sm(ring))+.88*sm(ring);
    if(x>.08&&x<.44&&y>.1&&y<.36)v=(Math.floor(x*w/2)%2)?.9:.15;
    const dl=Math.abs((x-.48)-(y-.55)*.4);if(y>.45&&y<.95&&dl<.012)v=.98;return v});
  else if(kind==="xray")I=mk(w,h,(x,y)=>{let v=.06;const body=((x-.5)/.42)**2+((y-.55)/.48)**2;if(body<1)v=.62-.15*body;
    const l1=((x-.33)/.13)**2+((y-.5)/.27)**2,l2=((x-.67)/.13)**2+((y-.5)/.27)**2;if(l1<1)v=.18+.12*l1;if(l2<1)v=.18+.12*l2;
    for(let k=0;k<6;k++){const yy=.3+k*.075;const d=Math.abs(y-yy-.06*Math.cos((x-.5)*5))-.008;if(body<1&&Math.abs(x-.5)>.05&&d<0)v=Math.min(1,v+.28)}
    if(Math.abs(x-.5)<.035&&body<1)v=.9;const hrt=((x-.55)/.12)**2+((y-.62)/.12)**2;if(hrt<1)v=Math.max(v,.55);return v});
  else if(kind==="spectrum")I=mk(w,h,(x,y)=>{const dx=x-.5,dy=y-.5,r=Math.hypot(dx,dy);let v=1/(1+(r*60)**2)+.004*(1+Math.cos(dx*90)*Math.cos(dy*90));
    if(Math.abs(dx)<.006||Math.abs(dy)<.006)v+=.02/(1+r*30);return v});
  else if(kind==="angio")I=mk(w,h,(x,y)=>{let v=.38+.06*Math.sin(x*9)*Math.cos(y*7);
    const segs=[[.5,0,.5,.55],[.5,.55,.3,.95],[.5,.55,.72,.95],[.5,.3,.22,.42],[.5,.3,.8,.4],[.5,.42,.25,.62],[.5,.42,.78,.6]];
    for(const[a,b,c,d]of segs){const t=Math.max(0,Math.min(1,((x-a)*(c-a)+(y-b)*(d-b))/((c-a)**2+(d-b)**2)));const dd=Math.hypot(x-a-t*(c-a),y-b-t*(d-b));const wd=a===.5&&c===.5?.03:.014;if(dd<wd)v=.82+.1*(1-dd/wd)}
    const k1=((x-.22)/.08)**2+((y-.5)/.13)**2,k2=((x-.78)/.08)**2+((y-.5)/.13)**2;if(k1<1||k2<1)v=Math.max(v,.62);return v});
  else if(kind==="squares"){const r=rng(3);I=mk(w,h,(x,y)=>{let v=.78;const C=[[.25,.25],[.75,.25],[.5,.5],[.25,.75],[.75,.75]];
    for(const[cx,cy]of C){if(Math.abs(x-cx)<.13&&Math.abs(y-cy)<.13){v=.06;const s=((cx*7+cy*3)*10|0)%3;
      const inner=s===0?Math.hypot(x-cx,y-cy)<.06:s===1?Math.abs(x-cx)<.05&&Math.abs(y-cy)<.02||Math.abs(y-cy)<.05&&Math.abs(x-cx)<.02:Math.abs(x-cx)<.055&&Math.abs(y-cy)<.055&&Math.abs(x-cx)>.025;
      if(inner)v=.105}}return v+(r()-.5)*.03})}
  else if(kind==="board")I=mk(w,h,(x,y)=>{let v=.28;if(Math.abs(y-.3)<.02||Math.abs(y-.7)<.02||Math.abs(x-.35)<.018||Math.abs(x-.7)<.018)v=.72;
    for(const[a,b]of[[.35,.3],[.7,.3],[.35,.7],[.7,.7],[.15,.5],[.85,.5]])if(Math.hypot(x-a,y-b)<.06)v=.92;if(Math.abs(y-.5)<.015&&(x<.35||x>.7))v=.72;
    if(x>.45&&x<.6&&y>.42&&y<.58)v=.12;return v});
  else if(kind==="smooth")I=mk(w,h,(x,y)=>{const b=(cx,cy,s,a)=>a*Math.exp(-((x-cx)**2+(y-cy)**2)/(2*s*s));return Math.min(1,.12+.3*x+b(.4,.42,.2,.55)+b(.72,.7,.14,.35)-b(.3,.78,.1,.12))});
  else if(kind==="galaxy")I=mk(w,h,(x,y)=>{const dx=(x-.5),dy=(y-.5);const u=dx*.94+dy*.34,t=-dx*.34+dy*.94;const r=(u/.36)**2+(t/.12)**2;
    let v=.04+.9*Math.exp(-r*2.2);if(Math.abs(t)<.012&&Math.abs(u)<.33)v*=.45;return v});
  else if(kind==="text"){_cv.width=w;_cv.height=h;const cx=_cv.getContext("2d");cx.fillStyle="#000";cx.fillRect(0,0,w,h);cx.fillStyle="#fff";
    cx.font=`bold ${Math.round(h*.55)}px Georgia, serif`;cx.textAlign="center";cx.textBaseline="middle";cx.fillText("DIP",w/2,h/2+2);
    const d=cx.getImageData(0,0,w,h).data;I={w,h,a:new Float32Array(w*h)};for(let i=0;i<w*h;i++)I.a[i]=d[i*4]>128?1:0;
    for(let y=0;y<h;y++)for(let x=0;x<w;x++)if(x%9===4||(y%11===5&&x%3))I.a[y*w+x]=0}
  else if(kind==="fingerprint"){const r=rng(11);I=mk(w,h,(x,y)=>{const d=Math.hypot(x-.5,(y-.5)*1.25);let v=d<.42&&Math.sin(d*70)>-.1?1:0;if(r()<.05)v=1-v;return v})}
  else if(kind==="dental")I=mk(w,h,(x,y)=>{let v=.12;for(let k=0;k<5;k++){const cx=.14+k*.18;const t=((x-cx)/.075)**2+((y-.5)/.3)**2;if(t<1)v=.55+.1*Math.cos(k);
    if(t<1&&(k===1||k===3)&&Math.hypot(x-cx,y-.36)<.04)v=.97}return v});
  CACHE[key]=I;return I}
const cloneI=I=>({w:I.w,h:I.h,a:Float32Array.from(I.a)});
const mapI=(I,f)=>({w:I.w,h:I.h,a:I.a.map(f)});
const at=(I,x,y)=>I.a[Math.min(I.h-1,Math.max(0,y))*I.w+Math.min(I.w-1,Math.max(0,x))];
function conv(I,K){const n=Math.sqrt(K.length)|0,r=n>>1,o=new Float32Array(I.w*I.h);
  for(let y=0;y<I.h;y++)for(let x=0;x<I.w;x++){let s=0;for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++)s+=K[(j+r)*n+i+r]*at(I,x+i,y+j);o[y*I.w+x]=s}return{w:I.w,h:I.h,a:o}}
function boxBlur(I,n){return conv(I,new Array(n*n).fill(1/(n*n)))}
function rankF(I,r,mode){const o=new Float32Array(I.w*I.h),buf=[];for(let y=0;y<I.h;y++)for(let x=0;x<I.w;x++){buf.length=0;for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++)buf.push(at(I,x+i,y+j));
  if(mode==="min")o[y*I.w+x]=Math.min(...buf);else if(mode==="max")o[y*I.w+x]=Math.max(...buf);else{buf.sort((a,b)=>a-b);o[y*I.w+x]=buf[buf.length>>1]}}return{w:I.w,h:I.h,a:o}}
function noiseSP(I,p,seed=5){const r=rng(seed);return mapI(I,v=>{const q=r();return q<p/2?0:q<p?1:v})}
function noiseG(I,s,seed=9){const r=rng(seed);return mapI(I,v=>{const u=Math.max(1e-9,r()),w=r();return v+s*Math.sqrt(-2*Math.log(u))*Math.cos(6.2832*w)})}
function resizeNN(I,W,H){return mk(W,H,(x,y)=>at(I,Math.floor(x*I.w),Math.floor(y*I.h)))}
function resizeBL(I,W,H){return mk(W,H,(u,v)=>{const x=u*I.w-.5,y=v*I.h-.5,x0=Math.floor(x),y0=Math.floor(y),fx=x-x0,fy=y-y0;
  return at(I,x0,y0)*(1-fx)*(1-fy)+at(I,x0+1,y0)*fx*(1-fy)+at(I,x0,y0+1)*(1-fx)*fy+at(I,x0+1,y0+1)*fx*fy})}
const quant=(I,L)=>mapI(I,v=>Math.round(Math.max(0,Math.min(1,v))*(L-1))/(L-1));
function histo(I,L=256){const h=new Array(L).fill(0);for(const v of I.a)h[Math.max(0,Math.min(L-1,Math.round(v*(L-1))))]++;return h}
function equalize(I,L=256){const h=histo(I,L),n=I.a.length;const cdf=[];let s=0;for(const c of h){s+=c;cdf.push(s/n)}
  return mapI(I,v=>Math.round((L-1)*cdf[Math.max(0,Math.min(L-1,Math.round(v*(L-1))))])/(L-1))}
function localEq(I,r){const o=new Float32Array(I.w*I.h);for(let y=0;y<I.h;y++)for(let x=0;x<I.w;x++){const c=at(I,x,y);let lo=0,n=0;
  for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++){const v=at(I,x+i,y+j);if(v<=c)lo++;n++}o[y*I.w+x]=lo/n}return{w:I.w,h:I.h,a:o}}
function sobel(I){const gx=conv(I,[-1,0,1,-2,0,2,-1,0,1]),gy=conv(I,[-1,-2,-1,0,0,0,1,2,1]);return{w:I.w,h:I.h,a:gx.a.map((v,i)=>Math.abs(v)+Math.abs(gy.a[i]))}}
/* binary morphology on images (3x3 square SE unless given) */
function morph(I,op,se=[1,1,1,1,1,1,1,1,1]){const n=Math.sqrt(se.length)|0,r=n>>1,o=new Float32Array(I.w*I.h);
  for(let y=0;y<I.h;y++)for(let x=0;x<I.w;x++){let ok=op==="erode";for(let j=-r;j<=r;j++)for(let i=-r;i<=r;i++){if(!se[(j+r)*n+i+r])continue;
    const xx=x+i,yy=y+j,v=(xx<0||yy<0||xx>=I.w||yy>=I.h)?0:I.a[yy*I.w+xx];if(op==="erode"&&v<.5)ok=false;if(op==="dilate"&&v>.5)ok=true}o[y*I.w+x]=ok?1:0}return{w:I.w,h:I.h,a:o}}
/* binary morphology on small 2-D arrays */
function gErode(A,B){const R=A.length,C=A[0].length,br=B.length>>1,bc=B[0].length>>1;return A.map((row,r)=>row.map((_,c)=>{for(let i=0;i<B.length;i++)for(let j=0;j<B[0].length;j++){if(!B[i][j])continue;const rr=r+i-br,cc=c+j-bc;if(rr<0||cc<0||rr>=R||cc>=C||!A[rr][cc])return 0}return 1}))}
function gDilate(A,B){const R=A.length,C=A[0].length,br=B.length>>1,bc=B[0].length>>1;return A.map((row,r)=>row.map((_,c)=>{for(let i=0;i<B.length;i++)for(let j=0;j<B[0].length;j++){if(!B[i][j])continue;const rr=r-(i-br),cc=c-(j-bc);if(rr>=0&&cc>=0&&rr<R&&cc<C&&A[rr][cc])return 1}return 0}))}
/* colour landscape: mode rgb | gray | bin | pseudo | r | g | b */
function landRGB(x,y){let r=110+90*y,g=165+60*y,b=238;
  if(Math.hypot(x-.78,y-.22)<.09){r=255;g=214;b=90}
  const hill=.62+.07*Math.sin(x*7+1);if(y>hill){r=60+50*(y-hill)*3;g=135-30*(y-hill);b=58}
  if(x>.18&&x<.40&&y>.56&&y<.78){r=198;g=96;b=62}
  if(y>.42&&y<=.56&&Math.abs(x-.29)<(y-.42)*.85){r=120;g=46;b=40}
  if(x>.26&&x<.31&&y>.67&&y<.78){r=70;g=48;b=30}
  if(y>.82&&Math.abs(x-.65-(y-.82)*.6)<.05){r=70;g=130;b=210}
  return[r,g,b]}
const lum=([r,g,b])=>.299*r+.587*g+.114*b;
function jet(t){t=Math.max(0,Math.min(1,t));return[255*Math.min(1,Math.max(0,1.5-Math.abs(4*t-3))),255*Math.min(1,Math.max(0,1.5-Math.abs(4*t-2))),255*Math.min(1,Math.max(0,1.5-Math.abs(4*t-1)))]}
function land(w,h,mode="rgb"){return rgbURL(w,h,(x,y)=>{const c=landRGB(x,y),l=lum(c);
  if(mode==="gray")return[l,l,l];if(mode==="bin")return l>140?[255,255,255]:[0,0,0];if(mode==="pseudo")return jet(l/255);
  if(mode==="r")return[c[0],0,0];if(mode==="g")return[0,c[1],0];if(mode==="b")return[0,0,c[2]];return c})}
function img2(p,x,y,w,h,label){const g=el(p,"g");const im=el(g,"image",{x,y,width:w,height:h,preserveAspectRatio:"none"});el(g,"rect",{x,y,width:w,height:h,class:"frame"});
  const lb=label!=null?txt(g,x+w/2,y+h+20,label,"dim c sm"):null;return{g,el:im,lb,src(u){im.setAttribute("href",u)},show(I,n){im.setAttribute("href",toURL(I,n))}}}
const fmt2=v=>(Math.round(v*100)/100).toString();
