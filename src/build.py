import glob,os,subprocess,sys
D=os.path.dirname(os.path.abspath(__file__))
r=lambda f:open(os.path.join(D,f),encoding='utf-8').read()
lects=sorted(glob.glob(os.path.join(D,'l[0-9][0-9].js')))
js="\n".join([r('lib.js'),r('engine.js')]+[open(f,encoding='utf-8').read() for f in lects]+["boot();"])
html=f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>DIP Made Easy</title>
<style>:root{{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}}body{{margin:0}}img{{max-width:100%}}[hidden]{{display:none!important}}html{{-webkit-text-size-adjust:100%;text-size-adjust:100%}}</style>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700&family=Hind+Siliguri:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap">
{r('css.html')}
{r('css2.html')}
{r('defs.html')}
</head><body>
<header class="top"><div class="top-in">
  <div class="brand"><b>DIP <i>Made</i> Easy</b><span id="hdrsub"></span></div>
  <div class="seg" role="group" aria-label="Narration language">
    <button id="lang-en" aria-pressed="true">English</button>
    <button id="lang-bn" aria-pressed="false">বাংলা</button>
  </div>
</div></header>
<div class="wrap">
  <nav aria-label="Lectures"><div class="navhead" id="navhead"></div><div class="mob" id="mob"></div><ol id="lecs"></ol></nav>
  <main id="main"></main>
</div>
<script>
{js}
</script>
</body></html>
'''
out=os.path.join(os.path.dirname(D),'index.html')
open(out,'w',encoding='utf-8').write(html)
open(os.path.join(D,'_all.js'),'w',encoding='utf-8').write(js)
res=subprocess.run(['node','--check',os.path.join(D,'_all.js')],capture_output=True,text=True)
print('lectures:',[os.path.basename(f) for f in lects],'size',len(html)//1024,'KB','syntax',res.returncode==0)
if res.returncode: print(res.stderr[:3000]); sys.exit(1)
