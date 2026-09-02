const pptxgen = require('pptxgenjs');
const React = require('react'); const RDS = require('react-dom/server'); const sharp = require('sharp');
const FA = require('react-icons/fa');
const fs = require('fs');
async function icon(name, color, px=256){ const el=React.createElement(FA[name],{color:'#'+color,size:px}); const svg=RDS.renderToStaticMarkup(el); const buf=await sharp(Buffer.from(svg)).png().toBuffer(); return 'image/png;base64,'+buf.toString('base64'); }
const INK='1F2A44', MUTE='5B6470', EN='2F6FB3', AR='2C7A4B', ENF='E8F0FA', ARF='E9F5EE', NEU='F3F4F7', PASS='2E8B57', FAIL='B03A2E', WARN='FFF4DF', LINE='D5D9E0';
const F='Calibri';
function tb(slide, text, x,y,w,h, o={}){ slide.addText(text,{x,y,w,h,fontFace:F,fontSize:o.fs||11,color:o.color||INK,bold:!!o.bold,italic:!!o.italic,align:o.align||'left',valign:o.valign||'top',margin:0,isTextBox:true,rtlMode:!!o.rtl,lang:o.rtl?'ar-SA':undefined,fill:o.fill?{color:o.fill}:undefined,line:o.line?{color:o.line,width:0.75}:undefined,rectRadius:o.r||0,shape:o.r?'roundRect':undefined,paraSpaceAfter:o.psa||0,lineSpacingMultiple:o.ls||1.0,wrap:true}); }
function box(slide,x,y,w,h,fill,line,r=0.12){ slide.addShape('roundRect',{x,y,w,h,fill:{color:fill},line:{color:line||fill,width:0.75},rectRadius:r}); }
function arrow(slide,x,y,w,h,color){ slide.addShape('rightArrow',{x,y,w,h,fill:{color:color||'B9C2CF'},line:{color:color||'B9C2CF',width:0.5}}); }
(async ()=>{
  const pres=new pptxgen(); pres.layout='LAYOUT_WIDE';
  const I={};
  for (const [k,n,c] of [['src','FaDatabase',INK],['tr','FaLanguage',INK],['vm','FaDesktop',INK],['agent','FaRobot',INK],['ev','FaShieldAlt',INK],['chk','FaClipboardCheck',INK],['pair','FaBalanceScale',INK],['cam','FaCamera',EN],['mouse','FaMousePointer',EN],['kb','FaKeyboard',EN],['clock','FaHourglassHalf',EN],['vmE','FaDesktop',EN],['vmA','FaDesktop',AR],['rec','FaVideo',AR],['lock','FaLock',INK],['build','FaHammer',INK],['gate','FaSearch',INK],['eye','FaEye',INK],['batch','FaLayerGroup',INK],['gavel','FaGavel',INK],['book','FaBook',INK],['warn','FaExclamationTriangle','B8860B'],['eq','FaEquals',AR]]) I[k]=await icon(n,c);

  /* ================= FIGURE 1 — OVERVIEW ================= */
  let s=pres.addSlide(); s.background={color:'FFFFFF'};
  // Task card
  box(s,0.3,0.3,3.55,3.75,NEU,LINE);
  tb(s,'Example task: save two open blog posts as PDFs',0.5,0.42,3.2,0.5,{fs:11,bold:true,ls:1.05});
  tb(s,'English instruction',0.5,0.98,3.2,0.25,{fs:10,bold:true,color:EN});
  tb(s,'“Please download the blogs opening now in PDF format and save them in their title to /home/user/Documents/Blog.”',0.5,1.22,3.2,0.85,{fs:10.5,ls:1.05});
  tb(s,'Arabic instruction (human translated)',0.5,2.1,3.2,0.25,{fs:10,bold:true,color:AR});
  tb(s,'يرجى تنزيل المدوّنات المفتوحة الآن بصيغة PDF وحفظها بعناوينها في المسار:',0.5,2.35,3.2,0.6,{fs:10.5,rtl:true,align:'right',ls:1.05});
  tb(s,'/home/user/Documents/Blog',0.5,2.95,3.2,0.3,{fs:10.5,align:'right'});
  tb(s,'The same task is also translated to Egyptian, Syrian, Qatari and Sudanese Arabic.',0.5,3.35,3.2,0.6,{fs:9,color:MUTE,ls:1.05});
  // rows of frames
  const fx=[4.2,6.85,9.5], fw=2.45, fh=1.37;
  const rows=[{y:0.32,lab:'English machine',col:EN,fill:ENF,imgs:['en1.jpg','en2.jpg','en3.jpg'],caps:['Print, save as PDF','Creates Documents/Blog, saves the first article','Saves the second article, done at step 21'],verdict:'PASS',vc:PASS},
               {y:2.25,lab:'Arabic machine',col:AR,fill:ARF,imgs:['msa1.jpg','msa2.jpg','msa3.jpg'],caps:['Types the path /home/user/Documents/Blog','The folder is called المستندات, so “folder not found”','Same error at step 50, no PDFs saved'],verdict:'FAIL',vc:FAIL}];
  for(const r of rows){
    box(s,4.05,r.y-0.05,8.95,1.85,r.fill,r.fill,0.08);
    tb(s,r.lab,4.15,r.y+0.02,2.0,0.22,{fs:9,bold:true,color:r.col});
    r.imgs.forEach((im,i)=>{ s.addImage({path:im,x:fx[i],y:r.y+0.24,w:fw,h:fh}); tb(s,r.caps[i],fx[i],r.y+0.24+fh+0.03,fw,0.3,{fs:8.5,color:MUTE,align:'center'}); if(i<2) tb(s,'›',fx[i]+fw+0.02,r.y+0.24+fh/2-0.15,0.18,0.3,{fs:16,color:'9AA3AF',align:'center'}); });
    tb(s,r.verdict,12.05,r.y+0.75,0.9,0.4,{fs:12,bold:true,color:'FFFFFF',fill:r.vc,align:'center',valign:'middle',r:0.08});
  }
  // pipeline band
  tb(s,'How it works',0.3,4.35,4,0.25,{fs:10,bold:true,color:MUTE});
  const nodes=[['src','Tasks','171 tasks from OSWorld, ClawBench and Terminal-Bench, plus 50 new Arabic tasks'],['tr','Translation','Translated by humans to MSA and 4 dialects: Egyptian, Syrian, Qatari, Sudanese'],['vm','Two machines','English VM\nArabic VM'],['agent','Agent','Sees screenshots and navigates with the mouse and keyboard'],['ev','Evidence','Everything is recorded. The final request is captured but not sent.'],['chk','Checker','Checks the recorded evidence. No LLM judge.'],['pair','Result','Pass or fail for each language']];
  const nw=1.62, gap=0.24, x0=0.3, ny=4.65, nh=2.15;
  nodes.forEach((n,i)=>{ const x=x0+i*(nw+gap); box(s,x,ny,nw,nh,NEU,LINE); s.addImage({data:I[n[0]],x:x+nw/2-0.3,y:ny+0.18,w:0.6,h:0.6}); tb(s,n[1],x+0.08,ny+0.88,nw-0.16,0.32,{fs:11,bold:true,align:'center'}); tb(s,n[2],x+0.08,ny+1.2,nw-0.16,0.9,{fs:8.5,color:MUTE,align:'center',ls:1.05}); if(i<nodes.length-1) arrow(s,x+nw+0.03,ny+nh/2-0.1,gap-0.06,0.2); });

  /* ================= FIGURE 2 — HARNESS ================= */
  s=pres.addSlide(); s.background={color:'FFFFFF'};
  const P=[{x:0.3,t:'What the agent sees and does',fill:'EEF3FB',col:EN},{x:4.65,t:'The two machines',fill:'EEF7F0',col:AR},{x:9.0,t:'How we grade',fill:'FFF6E5',col:'9A6B00'}];
  P.forEach(p=>{ box(s,p.x,0.3,4.05,6.9,p.fill,p.fill,0.15); tb(s,p.t,p.x+0.25,0.5,3.6,0.4,{fs:16,bold:true,color:p.col}); });
  // Panel A
  let x=0.3; const row=(y,ic,head,sub)=>{ s.addImage({data:I[ic],x:x+0.3,y:y+0.05,w:0.42,h:0.42}); tb(s,head,x+0.9,y,3.2,0.3,{fs:12,bold:true}); tb(s,sub,x+0.9,y+0.3,3.2,0.7,{fs:9.5,color:MUTE,ls:1.05}); };
  row(1.1,'cam','One screenshot per step','1360 × 768. No page source, no accessibility tree, no hints.');
  row(2.2,'mouse','Mouse','click, double click, drag, scroll');
  row(3.3,'kb','Keyboard','type, press key');
  row(4.4,'clock','Control','wait, done');
  box(s,0.55,5.55,3.55,1.4,'FFFFFF',LINE,0.1); tb(s,'Budget',0.75,5.68,3.2,0.3,{fs:11,bold:true}); tb(s,'Each task has a fixed step and time limit (for example 150 steps or 30 minutes). The same limit is used for both languages and every model.',0.75,5.98,3.2,0.95,{fs:9.5,color:MUTE,ls:1.05});
  // Panel B
  x=4.65; box(s,x+0.3,1.1,1.65,1.55,'FFFFFF',LINE,0.1); box(s,x+2.1,1.1,1.65,1.55,'FFFFFF',LINE,0.1);
  s.addImage({data:I.vmE,x:x+0.85,y:1.22,w:0.55,h:0.55}); s.addImage({data:I.vmA,x:x+2.65,y:1.22,w:0.55,h:0.55});
  tb(s,'English VM',x+0.35,1.85,1.55,0.3,{fs:11,bold:true,align:'center',color:EN}); tb(s,'Arabic VM',x+2.15,1.85,1.55,0.3,{fs:11,bold:true,align:'center',color:AR});
  tb(s,'English interface',x+0.35,2.15,1.55,0.4,{fs:8.5,color:MUTE,align:'center'}); tb(s,'Arabic interface, keyboard and folder names, right to left',x+2.15,2.15,1.55,0.5,{fs:8.5,color:MUTE,align:'center'});
  s.addImage({data:I.eq,x:x+1.85,y:1.7,w:0.35,h:0.35});
  tb(s,'Both machines start from the same image and the same files. Only the system language differs.',x+0.3,2.8,3.45,0.5,{fs:9.5,color:MUTE,align:'center',italic:true});
  x=4.65; const rowB=(y,ic,head,sub)=>{ s.addImage({data:I[ic],x:x+0.3,y:y+0.05,w:0.42,h:0.42}); tb(s,head,x+0.9,y,3.2,0.3,{fs:12,bold:true}); tb(s,sub,x+0.9,y+0.3,3.2,0.9,{fs:9.5,color:MUTE,ls:1.05}); };
  rowB(3.5,'rec','Recording','Every screenshot, every action and every network request is saved for each run.');
  rowB(4.75,'ev','Real websites, no side effects','For payments, applications and posts, a proxy captures the final request and does not send it. The captured request is the evidence.');
  rowB(6.1,'lock','Frozen instructions','A test fails if any instruction changes. Numbers, IDs and quoted text are the same in every language.');
  // Panel C
  x=9.0; s.addImage({data:I.chk,x:x+0.3,y:1.15,w:0.42,h:0.42}); tb(s,'Checker',x+0.9,1.1,3.2,0.3,{fs:12,bold:true}); tb(s,'One per task. It looks at the saved files, the application state or the captured request. No LLM judge.',x+0.9,1.4,3.05,1.0,{fs:9.5,color:MUTE,ls:1.05});
  const chips=[['PASS',PASS],['FAIL',FAIL],['EVAL_ERROR','8A8F98']]; chips.forEach((c,i)=>tb(s,c[0],x+0.3+i*1.2,2.65,1.1,0.38,{fs:10.5,bold:true,color:'FFFFFF',fill:c[1],align:'center',valign:'middle',r:0.08}));
  tb(s,'EVAL_ERROR means something on our side broke (setup, recorder, checker, API). Those runs are thrown out and rerun. They are never counted as a model failure.',x+0.3,3.15,3.45,0.85,{fs:9.5,color:MUTE,ls:1.05});
  s.addImage({data:I.pair,x:x+0.3,y:4.15,w:0.42,h:0.42}); tb(s,'Pairs',x+0.9,4.1,3.1,0.3,{fs:12,bold:true}); tb(s,'Each task in English is compared with the same task in Arabic. When one language passes and the other fails, the pair is rerun 3 times and checked by hand before it counts.',x+0.9,4.4,3.05,1.1,{fs:9.5,color:MUTE,ls:1.05});
  s.addImage({data:I.gavel,x:x+0.3,y:5.55,w:0.42,h:0.42}); tb(s,'Audit',x+0.9,5.5,3.1,0.3,{fs:12,bold:true}); tb(s,'Every pass is checked against its screenshots. Every fail gets a reason.',x+0.9,5.8,3.05,1.0,{fs:9.5,color:MUTE,ls:1.05});

    await pres.writeFile({fileName:'figures.pptx'}); console.log('written figures.pptx');
})().catch(e=>{console.error(e); process.exit(1);});
