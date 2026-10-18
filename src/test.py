import asyncio,sys,json
from playwright.async_api import async_playwright
SHOT=sys.argv[1:]  # optional "li,ci,step,lang,name"
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page(viewport={'width':1280,'height':1000})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:m.type=="error" and "ERR_TUNNEL" not in m.text and errs.append('console:'+m.text))
        await pg.goto('file://'+__import__('os').path.abspath(__import__('os').path.join(__import__('os').path.dirname(__file__),'..','index.html'))+'');await pg.wait_for_timeout(400)
        if not SHOT:
            res=await pg.evaluate('''async()=>{const out=[];const sleep=ms=>new Promise(r=>setTimeout(r,ms));
              for(let li=0;li<LECT.length;li++)for(let ci=0;ci<LECT[li].chapters.length;ci++){
                for(const lang of ["en","bn"]){S.lang=lang;
                try{go(li,ci);const ch=CUR();if(!ch.quiz){for(let s=0;s<ch.steps.length;s++){S.step=s;applyStep();await sleep(30)}
                  if(ch.panel){document.querySelectorAll("#panel input[type=range]").forEach(r=>{r.value=r.max;r.dispatchEvent(new Event("input"))});document.querySelectorAll("#panel button").forEach(b=>b.click())}}
                  else{document.querySelectorAll(".opt").forEach(b=>b.click())}}
                catch(e){out.push(LECT[li].id+"/"+LECT[li].chapters[ci].id+" "+lang+": "+e.message+" "+(e.stack||"").split("\\n")[1])}}}
              S.lang="en";return out}''')
            await pg.wait_for_timeout(1500)
            n=await pg.evaluate('LECT.map(l=>l.id+":"+l.chapters.length).join(" ")')
            print('chapters',n);print('errors',json.dumps(res+errs,ensure_ascii=False,indent=0)[:6000])
        else:
            for spec in SHOT:
                li,ci,st,lang,name=spec.split(',')
                await pg.evaluate(f'()=>{{try{{S.lang="{lang}";go({li},{ci});S.step={st};applyStep()}}catch(e){{console.error(e.message)}}}}')
                await pg.wait_for_timeout(2500)
                await pg.screenshot(path=f'/tmp/claude-0/-home-claude/196aa71b-8b6a-532e-bb10-3062a0956b20/scratchpad/{name}.png',clip={'x':290,'y':80,'width':980,'height':600})
            print('errors',errs[:20])
        await b.close()
asyncio.run(main())
