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
  tb(s,'ONE TASK, TWO MACHINES',0.5,0.42,3.2,0.3,{fs:10,bold:true,color:MUTE});
  tb(s,'English',0.5,0.75,3.2,0.25,{fs:10,bold:true,color:EN});
  tb(s,'“…download the blogs opening now in PDF format and save them in their title to /home/user/Documents/Blog.”',0.5,1.0,3.2,0.95,{fs:10.5,ls:1.05});
  tb(s,'Arabic (MSA, human-translated)',0.5,1.95,3.2,0.25,{fs:10,bold:true,color:AR});
  tb(s,'«…يرجى تنزيل المدوّنات المفتوحة الآن بصيغة PDF وحفظها بعناوينها في المسار:»',0.5,2.2,3.2,0.6,{fs:10.5,rtl:true,align:'right',ls:1.05});
  tb(s,'/home/user/Documents/Blog',0.5,2.82,3.2,0.3,{fs:10.5,align:'right'});
  tb(s,'+ Egyptian · Syrian · Qatari · Sudanese arms (human dialect translations)',0.5,3.2,3.2,0.6,{fs:9,italic:true,color:MUTE});
  // rows of frames
  const fx=[4.2,6.85,9.5], fw=2.45, fh=1.37;
  const rows=[{y:0.32,lab:'English desktop',col:EN,fill:ENF,imgs:['en1.jpg','en2.jpg','en3.jpg'],caps:['Print → Save as PDF','Creates Documents/Blog, saves by title','Second article saved · DONE at step 21'],verdict:'PASS ✓',vc:PASS},
               {y:2.25,lab:'Arabic desktop (RTL)',col:AR,fill:ARF,imgs:['msa1.jpg','msa2.jpg','msa3.jpg'],caps:['Types the literal path …/Documents/Blog','Folder is المستندات → “folder not found”','Step 50: same error, 0 PDFs'],verdict:'FAIL ✗',vc:FAIL}];
  for(const r of rows){
    box(s,4.05,r.y-0.05,8.95,1.85,r.fill,r.fill,0.08);
    tb(s,r.lab,4.15,r.y+0.02,2.0,0.22,{fs:9,bold:true,color:r.col});
    r.imgs.forEach((im,i)=>{ s.addImage({path:im,x:fx[i],y:r.y+0.24,w:fw,h:fh}); tb(s,r.caps[i],fx[i],r.y+0.24+fh+0.03,fw,0.3,{fs:8.5,color:MUTE,align:'center'}); if(i<2) tb(s,'›',fx[i]+fw+0.02,r.y+0.24+fh/2-0.15,0.18,0.3,{fs:16,color:'9AA3AF',align:'center'}); });
    tb(s,r.verdict,12.05,r.y+0.75,0.9,0.4,{fs:12,bold:true,color:'FFFFFF',fill:r.vc,align:'center',valign:'middle',r:0.08});
  }
  // pipeline band
  tb(s,'THE PIPELINE',0.3,4.35,4,0.25,{fs:10,bold:true,color:MUTE});
  const nodes=[['src','Task sources','OSWorld · ClawBench · Terminal-Bench\n+ 50 native Arab-world tasks'],['tr','Human translation','MSA + 4 dialects\nliteral parity enforced'],['vm','Matched machines','EN VM · AR VM\nsame image, locale differs'],['agent','Agent','screenshot in\nmouse + keyboard out'],['ev','Evidence','recorder + blocking proxy\nfinal request captured, never sent'],['chk','Checker','deterministic\nreads evidence only'],['pair','Paired verdict','PASS / FAIL per arm\nEVAL_ERROR excluded']];
  const nw=1.62, gap=0.24, x0=0.3, ny=4.65, nh=1.95;
  nodes.forEach((n,i)=>{ const x=x0+i*(nw+gap); box(s,x,ny,nw,nh,NEU,LINE); s.addImage({data:I[n[0]],x:x+nw/2-0.3,y:ny+0.18,w:0.6,h:0.6}); tb(s,n[1],x+0.08,ny+0.88,nw-0.16,0.32,{fs:11,bold:true,align:'center'}); tb(s,n[2],x+0.08,ny+1.2,nw-0.16,0.72,{fs:8.5,color:MUTE,align:'center',ls:1.05}); if(i<nodes.length-1) arrow(s,x+nw+0.03,ny+nh/2-0.1,gap-0.06,0.2); });
  tb(s,'Same task, same model (GPT-5.4), same budget — only the language of the instruction and the desktop differ. English saved both PDFs in 21 steps; Arabic typed the literal “Documents” path on a desktop whose folder is المستندات and never recovered.',0.3,6.75,12.7,0.45,{fs:8.5,color:MUTE,italic:true});

  /* ================= FIGURE 2 — HARNESS ================= */
  s=pres.addSlide(); s.background={color:'FFFFFF'};
  const P=[{x:0.3,t:'Observation & action',fill:'EEF3FB',col:EN},{x:4.65,t:'Matched environments',fill:'EEF7F0',col:AR},{x:9.0,t:'Evaluation',fill:'FFF6E5',col:'9A6B00'}];
  P.forEach(p=>{ box(s,p.x,0.3,4.05,6.9,p.fill,p.fill,0.15); tb(s,p.t,p.x+0.25,0.5,3.6,0.4,{fs:16,bold:true,color:p.col}); });
  // Panel A
  let x=0.3; const row=(y,ic,head,sub)=>{ s.addImage({data:I[ic],x:x+0.3,y:y+0.05,w:0.42,h:0.42}); tb(s,head,x+0.9,y,3.2,0.3,{fs:12,bold:true}); tb(s,sub,x+0.9,y+0.3,3.2,0.7,{fs:9.5,color:MUTE,ls:1.05}); };
  row(1.1,'cam','One screenshot per step','1360 × 768 · no DOM, no accessibility tree, no hints');
  row(2.2,'mouse','Mouse','click · double-click · drag · scroll');
  row(3.3,'kb','Keyboard','type · key (chords work under the Arabic layout)');
  row(4.4,'clock','Control','wait · done');
  box(s,0.55,5.55,3.55,1.4,'FFFFFF',LINE,0.1); tb(s,'Budget',0.75,5.68,3.2,0.3,{fs:11,bold:true}); tb(s,'Authored per task (e.g. 150 steps / 30 min), frozen with the task, identical across languages and models.',0.75,5.98,3.2,0.9,{fs:9.5,color:MUTE,ls:1.05});
  // Panel B
  x=4.65; box(s,x+0.3,1.1,1.65,1.55,'FFFFFF',LINE,0.1); box(s,x+2.1,1.1,1.65,1.55,'FFFFFF',LINE,0.1);
  s.addImage({data:I.vmE,x:x+0.85,y:1.22,w:0.55,h:0.55}); s.addImage({data:I.vmA,x:x+2.65,y:1.22,w:0.55,h:0.55});
  tb(s,'English VM',x+0.35,1.85,1.55,0.3,{fs:11,bold:true,align:'center',color:EN}); tb(s,'Arabic VM (RTL)',x+2.15,1.85,1.55,0.3,{fs:11,bold:true,align:'center',color:AR});
  tb(s,'en_US locale · English UI',x+0.35,2.15,1.55,0.4,{fs:8.5,color:MUTE,align:'center'}); tb(s,'ar_QA locale · Arabic UI, keyboard, folders',x+2.15,2.15,1.55,0.45,{fs:8.5,color:MUTE,align:'center'});
  s.addImage({data:I.eq,x:x+1.85,y:1.7,w:0.35,h:0.35});
  tb(s,'Same disk image, same apps, same start state — only the locale differs.',x+0.3,2.8,3.45,0.4,{fs:9.5,color:MUTE,align:'center',italic:true});
  x=4.65; const rowB=(y,ic,head,sub)=>{ s.addImage({data:I[ic],x:x+0.3,y:y+0.05,w:0.42,h:0.42}); tb(s,head,x+0.9,y,3.2,0.3,{fs:12,bold:true}); tb(s,sub,x+0.9,y+0.3,3.2,0.9,{fs:9.5,color:MUTE,ls:1.05}); };
  rowB(3.5,'rec','Recorder','every screenshot, every action, every network request — kept as the audit bundle');
  rowB(4.75,'ev','Capture-and-block proxy','the final consequential request (payment, application, post) is captured as evidence and answered with a synthetic response — it never reaches the site');
  rowB(6.1,'lock','Frozen instructions','test-locked; numbers, IDs and quoted strings identical across all arms');
  // Panel C
  x=9.0; s.addImage({data:I.chk,x:x+0.3,y:1.15,w:0.42,h:0.42}); tb(s,'Deterministic checker',x+0.9,1.1,3.2,0.3,{fs:12,bold:true}); tb(s,'One per task. Reads only the recorded evidence: files, application state, captured requests. No LLM judge in the primary metric.',x+0.9,1.4,3.05,1.0,{fs:9.5,color:MUTE,ls:1.05});
  const chips=[['PASS',PASS],['FAIL',FAIL],['EVAL_ERROR','8A8F98']]; chips.forEach((c,i)=>tb(s,c[0],x+0.3+i*1.2,2.65,1.1,0.38,{fs:10.5,bold:true,color:'FFFFFF',fill:c[1],align:'center',valign:'middle',r:0.08}));
  tb(s,'EVAL_ERROR = our fault (setup, recorder, checker, provider). Excluded and rerun — never counted as a model failure.',x+0.3,3.15,3.45,0.75,{fs:9.5,color:MUTE,ls:1.05});
  s.addImage({data:I.pair,x:x+0.3,y:4.15,w:0.42,h:0.42}); tb(s,'Paired cells',x+0.9,4.1,3.1,0.3,{fs:12,bold:true}); tb(s,'The unit is the pair: one task, two arms. Divergent pairs (one arm passes) are re-run k = 3 and adjudicated from evidence before they count.',x+0.9,4.4,3.05,1.0,{fs:9.5,color:MUTE,ls:1.05});
  s.addImage({data:I.gavel,x:x+0.3,y:5.55,w:0.42,h:0.42}); tb(s,'Audit',x+0.9,5.5,3.1,0.3,{fs:12,bold:true}); tb(s,'Every PASS read against its screenshots; every FAIL labeled with a cause; per-family significance by paired McNemar test.',x+0.9,5.8,3.05,1.0,{fs:9.5,color:MUTE,ls:1.05});

  /* ================= FIGURE 3 — AUDIT PROCESS ================= */
  s=pres.addSlide(); s.background={color:'FFFFFF'};
  tb(s,'Phase 1 · Before any run',0.3,0.3,6.2,0.45,{fs:14,bold:true,color:EN,fill:ENF,align:'center',valign:'middle',r:0.08});
  tb(s,'Phase 2 · During and after runs',6.85,0.3,6.2,0.45,{fs:14,bold:true,color:AR,fill:ARF,align:'center',valign:'middle',r:0.08});
  const cards=[[0.3,1.0,'lock','1. Frozen instructions','Every English and Arabic instruction is locked by a test that compares it character-for-character to the approved source. Pinned literals must match across all six arms.'],
    [0.3,2.75,'build','2. Build with truth-table tests','Setups and checkers are implemented against a written work order. Each checker ships with a passing fixture, a near-miss that must fail, and both language arms.'],
    [0.3,4.5,'gate','3. Independent verification gate','Nothing merges until a second reviewer checks the branch against the work order: scope, no invented matchers, no weakened tests, no secrets.'],
    [6.85,1.0,'eye','4. Watched cells','One task per family runs end to end in both languages while a human reads the evidence. A live block-proof must show a real final click captured and blocked before consequential tasks run.'],
    [6.85,2.75,'batch','5. Batches under the EVAL_ERROR rule','Missing setup, recorder, or checker evidence is an evaluation error, never a zero. Environment defects are fixed as their own commits and the affected cells rerun fresh — results are never edited.'],
    [6.85,4.5,'gavel','6. Evidence adjudication','Every PASS is read against its screenshots and captures; every FAIL gets a cause label; divergent pairs are re-run k = 3. A defect ledger records every fault found and how it was closed.']];
  cards.forEach(c=>{ const [cx,cy,ic,h,t]=c; const fill=cx<6?'F7F9FC':'F5FAF6'; box(s,cx,cy,6.2,1.55,fill,LINE,0.12); s.addImage({data:I[ic],x:cx+0.25,y:cy+0.22,w:0.45,h:0.45}); tb(s,h,cx+0.9,cy+0.2,5.1,0.35,{fs:13,bold:true}); tb(s,t,cx+0.9,cy+0.58,5.1,0.95,{fs:10,color:MUTE,ls:1.08}); });
  arrow(s,6.42,3.4,0.36,0.3,'B9C2CF');

  await pres.writeFile({fileName:'figures.pptx'}); console.log('written figures.pptx');
})().catch(e=>{console.error(e); process.exit(1);});
