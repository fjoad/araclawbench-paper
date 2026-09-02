const pptxgen = require('pptxgenjs');
const INK='111111', GRAY='444444', LINE='777777', EN='1F4E8C', AR='1E6B3A', PASS='1E7B3B', FAIL='B22222';
const F='Arial';
function tb(s,text,x,y,w,h,o={}){ s.addText(text,{x,y,w,h,fontFace:F,fontSize:o.fs||11,color:o.color||INK,bold:!!o.bold,italic:!!o.italic,align:o.align||'left',valign:o.valign||'top',margin:o.m===undefined?0:o.m,isTextBox:true,rtlMode:!!o.rtl,lang:o.rtl?'ar-SA':undefined,fill:o.fill?{color:o.fill}:undefined,line:o.line?{color:o.line,width:o.lw||1}:undefined,lineSpacingMultiple:o.ls||1.0,wrap:true}); }
function rect(s,x,y,w,h,fill,line,lw=1){ s.addShape('rect',{x,y,w,h,fill:fill?{color:fill}:{type:'none'},line:{color:line||LINE,width:lw}}); }
function harrow(s,x,y,w){ s.addShape('line',{x,y,w,h:0,line:{color:INK,width:1.25,endArrowType:'triangle'}}); }
(async()=>{
  const pres=new pptxgen(); pres.layout='LAYOUT_WIDE';
  /* ---------- FIGURE 1 ---------- */
  let s=pres.addSlide(); s.background={color:'FFFFFF'};
  // task box
  rect(s,0.35,0.35,3.5,3.75,'FFFFFF',LINE,1);
  tb(s,'Example task: save two open blog posts as PDFs',0.5,0.47,3.2,0.5,{fs:11,bold:true,ls:1.05});
  tb(s,'English instruction',0.5,1.02,3.2,0.22,{fs:9.5,bold:true,color:EN});
  tb(s,'“Please download the blogs opening now in PDF format and save them in their title to /home/user/Documents/Blog.”',0.5,1.25,3.2,0.85,{fs:10,ls:1.05});
  tb(s,'Arabic instruction (human translated)',0.5,2.15,3.2,0.22,{fs:9.5,bold:true,color:AR});
  tb(s,'يرجى تنزيل المدوّنات المفتوحة الآن بصيغة PDF وحفظها بعناوينها في المسار:',0.5,2.38,3.2,0.55,{fs:10,rtl:true,align:'right',ls:1.05});
  tb(s,'/home/user/Documents/Blog',0.5,2.93,3.2,0.25,{fs:10,align:'right'});
  tb(s,'The same task is also translated to Egyptian, Syrian, Qatari, Sudanese and Algerian Arabic.',0.5,3.35,3.2,0.65,{fs:9,color:GRAY,ls:1.05});
  // frame rows
  const fx=[4.25,6.9,9.55], fw=2.45, fh=1.37;
  const rows=[{y:0.35,lab:'English machine',col:EN,imgs:['en1.jpg','en2.jpg','en3.jpg'],caps:['Print, save as PDF','Creates Documents/Blog, saves the first article','Saves the second article, done at step 21'],verdict:'PASS',vc:PASS},
              {y:2.45,lab:'Arabic machine',col:AR,imgs:['msa1.jpg','msa2.jpg','msa3.jpg'],caps:['Types the path /home/user/Documents/Blog','The folder is called المستندات, so “folder not found”','Same error at step 50, no PDFs saved'],verdict:'FAIL',vc:FAIL}];
  for(const r of rows){
    rect(s,4.1,r.y,8.9,2.02,'FFFFFF',r.col,1.25);
    tb(s,r.lab,4.2,r.y+0.06,2.5,0.22,{fs:10,bold:true,color:r.col});
    r.imgs.forEach((im,i)=>{ s.addImage({path:im,x:fx[i],y:r.y+0.3,w:fw,h:fh}); tb(s,r.caps[i],fx[i],r.y+0.3+fh+0.03,fw,0.5,{fs:8,color:GRAY,align:'center',ls:1.0}); if(i<2) harrow(s,fx[i]+fw+0.03,r.y+0.3+fh/2,0.14); });
    tb(s,r.verdict,12.1,r.y+0.75,0.8,0.4,{fs:14,bold:true,color:r.vc,align:'center',valign:'middle'});
  }
  // pipeline
  const nodes=[['Tasks','171 tasks from OSWorld, ClawBench and Terminal-Bench, plus 50 new Arabic tasks'],['Translation','Translated by humans to MSA and 5 dialects: Egyptian, Syrian, Qatari, Sudanese, Algerian'],['Two machines','English VM\nArabic VM'],['Agent','Sees screenshots and navigates with the mouse and keyboard'],['Evidence','Everything is recorded. The final request is captured but not sent.'],['Checker','Checks the recorded evidence. No LLM judge.'],['Result','Pass or fail for each language']];
  const nw=1.62, gap=0.24, x0=0.35, ny=4.85, nh=1.45;
  nodes.forEach((n,i)=>{ const x=x0+i*(nw+gap); rect(s,x,ny,nw,nh,'FFFFFF',LINE,1); tb(s,n[0],x+0.1,ny+0.12,nw-0.2,0.3,{fs:11.5,bold:true,align:'center'}); tb(s,n[1],x+0.1,ny+0.45,nw-0.2,0.95,{fs:9,color:GRAY,align:'center',ls:1.05}); if(i<nodes.length-1) harrow(s,x+nw+0.02,ny+nh/2,gap-0.04); });

  /* ---------- FIGURE 2 ---------- */
  s=pres.addSlide(); s.background={color:'FFFFFF'};
  // left: what the agent sees and does
  rect(s,0.35,0.35,4.1,6.8,'FFFFFF',LINE,1);
  tb(s,'What the agent sees and does',0.5,0.47,3.8,0.35,{fs:13,bold:true});
  s.addImage({path:'en1.jpg',x:0.5,y:0.95,w:3.8,h:2.12}); s.addShape('rect',{x:0.5,y:0.95,w:3.8,h:2.12,fill:{type:'none'},line:{color:LINE,width:0.75}});
  tb(s,'One screenshot per step (1360 × 768). Nothing else: no page source, no accessibility tree, no hints.',0.5,3.15,3.8,0.6,{fs:9.5,color:GRAY,ls:1.05});
  tb(s,'Actions',0.5,3.9,3.8,0.25,{fs:11,bold:true});
  tb(s,'click, double click, drag, scroll, type, press key, wait, done',0.5,4.15,3.8,0.5,{fs:9.5,color:GRAY,ls:1.05});
  tb(s,'Budget',0.5,4.75,3.8,0.25,{fs:11,bold:true});
  tb(s,'Each task has a fixed step and time limit (for example 150 steps or 30 minutes). The same limit is used for both languages and for every model.',0.5,5.0,3.8,0.9,{fs:9.5,color:GRAY,ls:1.05});
  tb(s,'Instructions',0.5,5.95,3.8,0.25,{fs:11,bold:true});
  tb(s,'Frozen. A test fails if any instruction changes, and numbers, IDs and quoted text are the same in every language.',0.5,6.2,3.8,0.85,{fs:9.5,color:GRAY,ls:1.05});
  // middle: the two machines
  rect(s,4.7,0.35,4.1,6.8,'FFFFFF',LINE,1);
  tb(s,'The two machines',4.85,0.47,3.8,0.35,{fs:13,bold:true});
  tb(s,'English VM',4.85,0.95,3.8,0.25,{fs:10.5,bold:true,color:EN});
  s.addImage({path:'vm-en.jpg',x:4.85,y:1.2,w:3.8,h:2.15}); s.addShape('rect',{x:4.85,y:1.2,w:3.8,h:2.15,fill:{type:'none'},line:{color:LINE,width:0.75}});
  tb(s,'Arabic VM',4.85,3.5,3.8,0.25,{fs:10.5,bold:true,color:AR});
  s.addImage({path:'vm-msa.jpg',x:4.85,y:3.75,w:3.8,h:2.15}); s.addShape('rect',{x:4.85,y:3.75,w:3.8,h:2.15,fill:{type:'none'},line:{color:LINE,width:0.75}});
  tb(s,'Both machines start from the same image and the same files. The only difference is the system language: the Arabic machine has an Arabic interface, keyboard and folder names, laid out right to left.',4.85,6.0,3.8,1.1,{fs:9.5,color:GRAY,ls:1.05});
  // right: how we grade
  rect(s,9.05,0.35,3.95,6.8,'FFFFFF',LINE,1);
  tb(s,'How we grade',9.2,0.47,3.65,0.35,{fs:13,bold:true});
  tb(s,'Recording',9.2,0.95,3.65,0.25,{fs:11,bold:true});
  tb(s,'Every screenshot, every action and every network request is saved for each run.',9.2,1.2,3.65,0.6,{fs:9.5,color:GRAY,ls:1.05});
  tb(s,'Real websites, no side effects',9.2,1.9,3.65,0.25,{fs:11,bold:true});
  tb(s,'For payments, applications and posts, a proxy captures the final request and does not send it. The captured request is the evidence.',9.2,2.15,3.65,0.85,{fs:9.5,color:GRAY,ls:1.05});
  tb(s,'Checker',9.2,3.1,3.65,0.25,{fs:11,bold:true});
  tb(s,'One per task. It looks at the saved files, the application state or the captured request and returns one of three results. No LLM judge.',9.2,3.35,3.65,0.9,{fs:9.5,color:GRAY,ls:1.05});
  tb(s,'PASS',9.2,4.35,1.1,0.32,{fs:11,bold:true,color:PASS,align:'center',valign:'middle',line:PASS});
  tb(s,'FAIL',10.45,4.35,1.1,0.32,{fs:11,bold:true,color:FAIL,align:'center',valign:'middle',line:FAIL});
  tb(s,'EVAL_ERROR',11.7,4.35,1.2,0.32,{fs:9.5,bold:true,color:GRAY,align:'center',valign:'middle',line:GRAY});
  tb(s,'EVAL_ERROR means something on our side broke (setup, recorder, checker, API). Those runs are thrown out and rerun. They are never counted as a model failure.',9.2,4.75,3.65,0.95,{fs:9.5,color:GRAY,ls:1.05});
  tb(s,'Pairs',9.2,5.8,3.65,0.25,{fs:11,bold:true});
  tb(s,'We compare each task in English against the same task in Arabic. When one language passes and the other fails, that pair is rerun 3 times and checked by hand before it counts.',9.2,6.05,3.65,1.05,{fs:9.5,color:GRAY,ls:1.05});
  await pres.writeFile({fileName:'figures.pptx'}); console.log('written');
})().catch(e=>{console.error(e);process.exit(1);});
