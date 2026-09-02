#!/usr/bin/env python3
"""Generate the paper's result tables, figures and number macros from the benchmark's audit ledgers.

No number in the paper is typed by hand: this script reads the audited analysis JSON/CSV in the
benchmark repo and writes tables/*.tex, tables/numbers.tex (LaTeX macros for prose) and
figures/res_*.pdf.   Run:  .venv/bin/python scripts/make_results.py
"""
from __future__ import annotations
import csv, glob, json, math, statistics
from collections import Counter, OrderedDict
from pathlib import Path
import numpy as np, yaml
import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib import colors as mcolors
from scipy.stats import binomtest

PAPER = Path(__file__).resolve().parents[1]
BENCH = Path.home() / "Documents/projects/ara-claw-bench"
ANALYSIS = BENCH / "data/analysis/2026-08-17-six-language-analysis.json"
OUTCOMES = BENCH / "data/analysis/2026-08-17-six-language-outcomes.csv"
META = BENCH / "data/corpus/borrowed_metadata.csv"
NATIVE = BENCH / "tasks/araclaw-native"
TABLES = PAPER / "tables"; FIGS = PAPER / "figures"; TABLES.mkdir(exist_ok=True); FIGS.mkdir(exist_ok=True)
LANGS = [("en","English"),("msa","MSA"),("eg","Egyptian"),("sy","Syrian"),("qa","Qatari"),("sd","Sudanese")]
NAMES = dict(LANGS)
COL = {"en":"#1F4E8C","msa":"#1E6B3A","eg":"#6E6E6E","sy":"#858585","qa":"#9C9C9C","sd":"#B3B3B3"}
FAMS = ["desktop","web","terminal"]; FCOL = {"desktop":"#4C78A8","web":"#54A24B","terminal":"#E0A93B"}
plt.rcParams.update({"font.family":"sans-serif","font.sans-serif":["Helvetica","Arial","DejaVu Sans"],"font.size":9,"axes.spines.top":False,"axes.spines.right":False,"pdf.fonttype":42})

def wilson(k,n,z=1.96):
    if n==0: return (float("nan"),float("nan"))
    p=k/n; d=1+z*z/n; c=(p+z*z/(2*n))/d; h=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d; return (c-h,c+h)
def mcnemar_p(b,c): n=b+c; return 1.0 if n==0 else binomtest(min(b,c),n,0.5).pvalue
def pct(x): return f"{100*x:.1f}"
def lighten(c,f): r,g,b=mcolors.to_rgb(c); return (r+(1-r)*f, g+(1-g)*f, b+(1-b)*f)
def macro(name,val): return f"\\newcommand{{\\{name}}}{{{val}}}\n"

# ---------------- category mapping for the corpus sunburst ----------------
WEB_GROUPS = OrderedDict([
 ("Daily life & health", {"daily-life","food-cooking","health-fitness","fitness","beauty-personal-care","pet-animal-care","home-services-maintenance","automotive-vehicle-services"}),
 ("Office & personal", {"office-secretary-tasks","personal-management","creation-init","deletion-revocation"}),
 ("Education & reading", {"education-learning","education","academia-research"}),
 ("Entertainment & hobbies", {"entertainment-hobbies","entertainment","hobbies-crafts","hobbies-gaming"}),
 ("Jobs", {"job-search-hr","jobs"}), ("Rating & reviews", {"rating-voting"}),
 ("Shopping, travel & finance", {"shopping-commerce","finance-investment","travel"}), ("Charity & culture", {"nonprofit-charity"}),
])
NATIVE_WEB = {"splitwise":"Office & personal","myfitnesspal":"Daily life & health","flydubai":"Shopping, travel & finance","qatar-airways":"Shopping, travel & finance",
 "booking":"Shopping, travel & finance","royal-jordanian":"Shopping, travel & finance","qatar-museums":"Charity & culture","duolingo":"Education & reading",
 "storygraph":"Education & reading","nomad":"Shopping, travel & finance","ounass":"Shopping, travel & finance","function-of-beauty":"Daily life & health",
 "binance":"Jobs","kpler":"Jobs","medium":"Education & reading","bayut":"Shopping, travel & finance","edraak":"Education & reading","goodreads":"Education & reading",
 "qatar-charity":"Charity & culture","doodle":"Office & personal","eventbrite":"Office & personal","todoist":"Office & personal","dhl":"Shopping, travel & finance"}
DESK_GROUPS = OrderedDict([("Multi-app", {"multi_apps"}),("Calc", {"libreoffice_calc"}),("Writer", {"libreoffice_writer"}),("Impress", {"libreoffice_impress"}),
 ("Chrome", {"chrome"}),("Other apps", {"vlc","thunderbird","gimp","vs_code","os","nautilus"})])
TERM_GROUPS = OrderedDict([("Data processing", {"data-science","data-processing"}),("Security, system & other", {"security","file-operations","system-administration","file-system","debugging","personal-assistant","audio-processing"})])

def corpus_counts():
    meta=[r for r in csv.DictReader(open(META)) if r["corpus_decision"].startswith("keep")]
    native=[(Path(f).parent.name, yaml.safe_load(open(f))) for f in sorted(glob.glob(str(NATIVE/"acb-n0*/task.yaml")))]
    out=OrderedDict((f,OrderedDict()) for f in FAMS)
    def bump(f,g): out[f][g]=out[f].get(g,0)+1
    for r in meta:
        f=r["family"]; c=r["category_or_app"]
        if f=="web":
            top=c.split(" / ")[0]; g=next((k for k,v in WEB_GROUPS.items() if top in v),"Other"); bump(f,g)
        elif f=="desktop": bump(f,next((k for k,v in DESK_GROUPS.items() if c in v),"Other apps"))
        else: bump(f,next((k for k,v in TERM_GROUPS.items() if c in v),"Security, system & other"))
    for slug,d in native:
        f=d.get("surface"); apps=d.get("apps") or []
        if f=="web":
            g=next((v for k,v in NATIVE_WEB.items() if k in slug),"Other"); bump(f,g)
        elif f=="desktop":
            a=apps[0] if apps else ""; bump(f,next((k for k,v in DESK_GROUPS.items() if a in v),"Other apps"))
        else: bump(f,"Data processing")
    return out

def sunburst(ax, inner, outer_by_inner, inner_colors, title=None, fmt_inner=None, min_pct=2.5):
    """inner: OrderedDict label->count; outer_by_inner: label->OrderedDict(sub->count)."""
    total=sum(inner.values()); iv=list(inner.values()); il=list(inner.keys())
    ov=[]; oc=[]; ol=[]
    for i,lab in enumerate(il):
        subs=outer_by_inner[lab]; n=len(subs)
        for j,(s,v) in enumerate(subs.items()):
            ov.append(v); oc.append(lighten(inner_colors[lab], 0.25+0.5*j/max(1,n))); ol.append(f"{s} {100*v/total:.1f}%")
    ax.pie(iv, radius=0.58, colors=[inner_colors[l] for l in il], labels=[(fmt_inner or (lambda l,v: f"{l}\n{100*v/total:.1f}%"))(l,v) for l,v in inner.items()],
           labeldistance=0.68, textprops={"fontsize":8,"ha":"center","va":"center","color":"white","fontweight":"bold"}, wedgeprops=dict(width=0.30, edgecolor="white", linewidth=1.2), startangle=90, counterclock=False)
    w,_=ax.pie(ov, radius=1.0, colors=oc, wedgeprops=dict(width=0.42, edgecolor="white", linewidth=1.0), startangle=90, counterclock=False)
    for wedge,lab,v in zip(w,ol,ov):
        if 100*v/total < min_pct: continue
        ang=(wedge.theta2+wedge.theta1)/2; x=math.cos(math.radians(ang)); y=math.sin(math.radians(ang))
        ax.annotate(lab, xy=(0.99*x,0.99*y), xytext=(1.22*x,1.22*y), ha="left" if x>=0 else "right", va="center", fontsize=7, arrowprops=dict(arrowstyle="-", color="#777777", lw=0.6))
    ax.set(aspect="equal");
    if title: ax.set_title(title, fontsize=9)

def main():
    A=json.load(open(ANALYSIS)); rows=list(csv.DictReader(open(OUTCOMES))); S={}; M=""
    # ---- language summary ----
    lines=["\\begin{tabular}{lrrrr}","\\toprule","Language & Valid runs & Pass & Pass rate & 95\\% CI \\\\","\\midrule"]; LR=OrderedDict()
    for c,l in LANGS:
        vals=[r[c] for r in rows if r[c] in ("pass","fail")]; n=len(vals); k=sum(v=="pass" for v in vals); lo,hi=wilson(k,n); LR[c]=(k,n,k/n,lo,hi)
        lines.append(f"{l} & {n} & {k} & {pct(k/n)}\\% & [{pct(lo)}, {pct(hi)}] \\\\")
        M+=macro(f"nv{c}",n)+macro(f"pass{c}",k)+macro(f"rate{c}",pct(k/n))
    lines+=["\\bottomrule","\\end{tabular}"]; (TABLES/"six_language.tex").write_text("\n".join(lines)+"\n")
    S["language"]={c:{"pass":k,"n":n,"rate":r,"ci":[lo,hi]} for c,(k,n,r,lo,hi) in LR.items()}
    # ---- pairwise ----
    def pair(a,b):
        both=fo=so=bf=0
        for r in rows:
            x,y=r[a],r[b]
            if x not in ("pass","fail") or y not in ("pass","fail"): continue
            if x=="pass" and y=="pass": both+=1
            elif x=="pass": fo+=1
            elif y=="pass": so+=1
            else: bf+=1
        n=both+fo+so+bf; return dict(n=n,both=both,first_only=fo,second_only=so,both_fail=bf,gap=((both+fo)-(both+so))/n,p=mcnemar_p(fo,so))
    pairs=[("en","msa")]+[("msa",d) for d,_ in LANGS[2:]]+[("en",d) for d,_ in LANGS[2:]]
    lines=["\\begin{tabular}{llrrrrrr}","\\toprule","First & Second & $n$ & Both pass & First only & Second only & Gap (pts) & McNemar $p$ \\\\","\\midrule"]; S["pairs"]={}
    for a,b in pairs:
        s=pair(a,b); S["pairs"][f"{a}_vs_{b}"]=s
        lines.append(f"{NAMES[a]} & {NAMES[b]} & {s['n']} & {s['both']} & {s['first_only']} & {s['second_only']} & {100*s['gap']:+.1f} & {s['p']:.3f} \\\\")
        M+=macro(f"gap{a}{b}",f"{100*s['gap']:.1f}")+macro(f"p{a}{b}",f"{s['p']:.3f}")+macro(f"fo{a}{b}",s['first_only'])+macro(f"so{a}{b}",s['second_only'])+macro(f"npair{a}{b}",s['n'])
    lines+=["\\bottomrule","\\end{tabular}"]; (TABLES/"pairwise.tex").write_text("\n".join(lines)+"\n")
    # dialect range
    drates=[LR[c][2] for c,_ in LANGS[2:]]; M+=macro("dialectmin",pct(min(drates)))+macro("dialectmax",pct(max(drates)))
    # ---- family x language ----
    lines=["\\begin{tabular}{lr"+"r"*len(LANGS)+"}","\\toprule","Family & Tasks & "+" & ".join(l for _,l in LANGS)+" \\\\","\\midrule"]; S["family"]={}
    for f in FAMS:
        sub=[r for r in rows if r["family"]==f]; cells=[]; S["family"][f]={}
        for c,_ in LANGS:
            vals=[r[c] for r in sub if r[c] in ("pass","fail")]; n=len(vals); k=sum(v=="pass" for v in vals); cells.append(f"{k}/{n}"); S["family"][f][c]=[k,n]
        lines.append(f"{f.capitalize()} & {len(sub)} & "+" & ".join(cells)+" \\\\"); M+=macro(f"ntasks{f}",len(sub))
    lines+=["\\bottomrule","\\end{tabular}"]; (TABLES/"family.tex").write_text("\n".join(lines)+"\n")
    # ---- application x language ----
    apps=Counter(r["application"] for r in rows)
    lines=["\\begin{tabular}{lr"+"r"*len(LANGS)+"}","\\toprule","Application & Tasks & "+" & ".join(l for _,l in LANGS)+" \\\\","\\midrule"]
    for app,cnt in apps.most_common():
        sub=[r for r in rows if r["application"]==app]; cells=[]
        for c,_ in LANGS:
            vals=[r[c] for r in sub if r[c] in ("pass","fail")]; cells.append(f"{sum(v=='pass' for v in vals)}/{len(vals)}")
        lines.append(f"{app.replace('_',' ')} & {cnt} & "+" & ".join(cells)+" \\\\")
    lines+=["\\bottomrule","\\end{tabular}"]; (TABLES/"application.tex").write_text("\n".join(lines)+"\n")
    # ---- complete case patterns ----
    cc=A["complete_case"]; S["complete_case"]=cc; M+=macro("ccN",cc["n"])
    pc=cc["pattern_counts"]; M+=macro("ccAllFail",pc.get("FFFFFF",0))+macro("ccAllPass",pc.get("PPPPPP",0))+macro("ccEnMsaOnly",pc.get("PPFFFF",0))+macro("ccEnOnly",pc.get("PFFFFF",0))
    mv=cc["msa_vs_dialect_majority"]; M+=macro("ccMsaPassDialFail",mv.get("msa_pass__dialects_fail",0))+macro("ccMsaPassDialPass",mv.get("msa_pass__dialects_pass",0))
    # ---- steps per language (valid runs) ----
    steps={c:[] for c,_ in LANGS}; stop=Counter()
    for row in A["rows"]:
        for l,o in row["outcomes"].items():
            run=o.get("run") or {}
            if o.get("status") in ("pass","fail") and run.get("n_steps"): steps[l].append(int(run["n_steps"]))
            if o.get("status")=="fail": stop[(row["family"], run.get("stop_reason") or "unknown")]+=1
    for c,_ in LANGS: M+=macro(f"medsteps{c}",int(statistics.median(steps[c])))
    S["steps"]={c:{"median":statistics.median(v),"n":len(v)} for c,v in steps.items()}
    # ================= figures =================
    # six-language bars
    fig,ax=plt.subplots(figsize=(4.6,2.5)); xs=np.arange(len(LANGS)); rates=[LR[c][2]*100 for c,_ in LANGS]
    err=[[rates[i]-LR[c][3]*100 for i,(c,_) in enumerate(LANGS)],[LR[c][4]*100-rates[i] for i,(c,_) in enumerate(LANGS)]]
    ax.bar(xs,rates,color=[COL[c] for c,_ in LANGS],width=0.62); ax.errorbar(xs,rates,yerr=err,fmt="none",ecolor="#222222",elinewidth=0.9,capsize=2.5)
    for i,(c,_) in enumerate(LANGS): ax.text(i,rates[i]+err[1][i]+1.5,f"{rates[i]:.1f}%\n{LR[c][0]}/{LR[c][1]}",ha="center",va="bottom",fontsize=7.5)
    ax.set_xticks(xs); ax.set_xticklabels([l for _,l in LANGS]); ax.set_ylabel("Success rate (%)"); ax.set_ylim(0,82)
    fig.tight_layout(); fig.savefig(FIGS/"res_six_language.pdf"); plt.close(fig)
    # family grouped bars
    fig,ax=plt.subplots(figsize=(4.6,2.5)); w=0.13
    for j,(c,l) in enumerate(LANGS):
        vals=[100*S["family"][f][c][0]/S["family"][f][c][1] if S["family"][f][c][1] else 0 for f in FAMS]
        ax.bar(np.arange(len(FAMS))+(j-2.5)*w,vals,width=w,color=COL[c],label=l)
    ax.set_xticks(np.arange(len(FAMS))); ax.set_xticklabels([f"{f.capitalize()} (n={len([r for r in rows if r['family']==f])})" for f in FAMS]); ax.set_ylabel("Success rate (%)"); ax.set_ylim(0,105); ax.legend(ncol=3,fontsize=7,frameon=False,loc="upper right")
    fig.tight_layout(); fig.savefig(FIGS/"res_family.pdf"); plt.close(fig)
    # per-task grid
    order=sorted(rows,key=lambda r:(FAMS.index(r["family"]),-sum(r[c]=="pass" for c,_ in LANGS),r["application"]))
    Mx=np.full((len(order),len(LANGS)),np.nan)
    for i,r in enumerate(order):
        for j,(c,_) in enumerate(LANGS): Mx[i,j]=1.0 if r[c]=="pass" else (0.0 if r[c]=="fail" else np.nan)
    fig,ax=plt.subplots(figsize=(3.3,7.0)); cmap=mcolors.ListedColormap(["#E4E7EC","#2E7D4F"]); cmap.set_bad("#FFFFFF")
    ax.imshow(Mx,cmap=cmap,aspect="auto",interpolation="nearest",vmin=0,vmax=1)
    ax.set_xticks(range(len(LANGS))); ax.set_xticklabels([l for _,l in LANGS],rotation=45,ha="right",fontsize=7.5); ax.set_yticks([])
    ax.set_xticks(np.arange(-0.5,len(LANGS),1),minor=True); ax.set_yticks(np.arange(-0.5,len(order),1),minor=True); ax.grid(which="minor",color="white",linewidth=0.6); ax.tick_params(which="minor",length=0)
    y=0
    for f in FAMS:
        n=sum(1 for r in order if r["family"]==f)
        if n: ax.text(len(LANGS)-0.4,y+n/2,f"{f}\n(n={n})",va="center",ha="left",fontsize=7.5)
        if y: ax.axhline(y-0.5,color="#333333",linewidth=0.8)
        y+=n
    ax.set_xlim(-0.5,len(LANGS)+1.3); ax.set_ylabel("Tasks, grouped by family, sorted by number of passing languages"); fig.tight_layout(); fig.savefig(FIGS/"res_task_grid.pdf"); plt.close(fig)
    # steps per language (box)
    fig,ax=plt.subplots(figsize=(4.6,2.3)); data=[steps[c] for c,_ in LANGS]
    bp=ax.boxplot(data,widths=0.55,patch_artist=True,showfliers=False,medianprops=dict(color="black"))
    for patch,(c,_) in zip(bp["boxes"],LANGS): patch.set_facecolor(lighten(COL[c],0.45)); patch.set_edgecolor("#333333")
    ax.set_xticks(range(1,len(LANGS)+1)); ax.set_xticklabels([l for _,l in LANGS]); ax.set_ylabel("Steps per run"); fig.tight_layout(); fig.savefig(FIGS/"res_steps.pdf"); plt.close(fig)
    # corpus sunburst
    cc_counts=corpus_counts(); inner=OrderedDict((f,sum(v.values())) for f,v in cc_counts.items())
    fig,ax=plt.subplots(figsize=(6.4,6.4)); sunburst(ax,inner,cc_counts,FCOL,fmt_inner=lambda l,v:f"{l.capitalize()}\n{v}"); ax.text(0,0,f"{sum(inner.values())}\ntasks",ha="center",va="center",fontsize=9,fontweight="bold")
    fig.tight_layout(); fig.savefig(FIGS/"corpus_sunburst.pdf",bbox_inches="tight"); plt.close(fig); S["corpus"]={f:dict(v) for f,v in cc_counts.items()}
    # failure endings sunburst: inner family, outer stop reason (all failed runs, six languages)
    STOP={"agent_done":"Declared done","model_done":"Declared done","max_steps":"Ran out of steps","agent_fail":"Gave up","stuck":"Stuck","unknown":"Unknown"}
    def stoplab(k): return STOP.get(k, str(k).replace("_"," ").capitalize())
    fin=OrderedDict(); fout={}
    for f in FAMS:
        d=OrderedDict()
        for (ff,k),v in sorted(stop.items(),key=lambda kv:-kv[1]):
            if ff==f: d[stoplab(k)]=d.get(stoplab(k),0)+v
        if d: fin[f]=sum(d.values()); fout[f]=d
    fig,ax=plt.subplots(figsize=(5.6,5.6)); sunburst(ax,fin,fout,FCOL,fmt_inner=lambda l,v:(f"{l.capitalize()}\n{v}" if v>=30 else "")); ax.text(0,0,f"{sum(fin.values())}\nfailed\nruns",ha="center",va="center",fontsize=8,fontweight="bold")
    fig.tight_layout(); fig.savefig(FIGS/"res_fail_endings.pdf",bbox_inches="tight"); plt.close(fig)
    S["stop"]={f"{f}|{k}":v for (f,k),v in stop.items()}
    tot=sum(stop.values()); M+=macro("failDone",pct(sum(v for (f,k),v in stop.items() if k in ("agent_done","model_done"))/tot))+macro("failSteps",pct(sum(v for (f,k),v in stop.items() if k=="max_steps")/tot))+macro("failGaveUp",pct(sum(v for (f,k),v in stop.items() if k=="agent_fail")/tot))
    (TABLES/"numbers.tex").write_text(M); (TABLES/"results_summary.json").write_text(json.dumps(S,indent=1,default=float))
    print("language:", {c:(v["pass"],v["n"],round(v["rate"]*100,1)) for c,v in S["language"].items()})
    print("pairs:", {k:(v["n"],v["first_only"],v["second_only"],round(100*v["gap"],1),round(v["p"],4)) for k,v in S["pairs"].items()})
    print("family:", S["family"]); print("steps median:", {c:v["median"] for c,v in S["steps"].items()}); print("corpus:", S["corpus"]); print("stop:", S["stop"])

if __name__=="__main__": main()
