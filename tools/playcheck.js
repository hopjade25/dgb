#!/usr/bin/env node
// dgb 두 엄지 플레이 가능성 검사기 (docs/charting-guide.md §3, docs/tools.md)
// 사용: node tools/playcheck.js [--json] [--verbose] charts/*.dgb    → 위반이 있으면 종료 코드 1
'use strict';const fs=require('fs');
const T={SAME:125,LANE1:125,LANE2:160,VERT:200,FLICK_PRE:150,FLICK_POST:200,LONG_REL:100,CHORD:12,SIDE_ADJ:100,SIDE_REP:150,NPS_MAX:13,SIDE_MAX:4};
const POS={GL:0,R1:1,R2:2,R3:3,R4:4,R5:5,R6:6,GR:7,GM:3.5};const HOME={GL:'L',R1:'L',R2:'L',R5:'R',R6:'R',GR:'R'};
const isG=c=>c[0]==='G';
function parse(text){let bpm0=120;const defs={},rows=[];
 text.split(/\r?\n/).forEach((l,i)=>{let m;if((m=l.match(/^#BPM\s+([\d.]+)/)))bpm0=+m[1];if((m=l.match(/^#BPM([0-9A-Z]{2})\s+([\d.]+)/)))defs[m[1]]=+m[2];
  if((m=l.match(/^#(\d{3}):([A-Z0-9]{2}):(\S+)/)))rows.push([+m[1],m[2],m[3],i]);});
 const ml={};for(const [mm,ch,d] of rows)if(ch==='ML')ml[mm]=d.includes('/')?eval(d):+d;
 const nm=Math.max(0,...rows.map(r=>r[0]))+2,start=[0];for(let m=0;m<nm;m++)start.push(start[m]+4*(ml[m]||1));
 const tch=[[0,bpm0]];for(const [mm,ch,d] of rows)if(ch==='BP'){const n=d.length/2;for(let k=0;k<n;k++){const v=d.substr(2*k,2);if(v!=='00')tch.push([start[mm]+k/n*4*(ml[mm]||1),defs[v]]);}}
 tch.sort((a,b)=>a[0]-b[0]);
 const b2t=b=>{let t=0,[pb,pv]=tch[0];for(const [cb,cv] of tch.slice(1)){if(cb>=b)break;t+=(cb-pb)*60/pv;pb=cb;pv=cv;}return t+(b-pb)*60/pv;};
 const notes=[];for(const [mm,ch,d,li] of rows){if(!(ch in POS))continue;const n=d.length;
  for(let k=0;k<n;k++){const c=d[k];if(c!=='0')notes.push({t:b2t(start[mm]+k/n*4*(ml[mm]||1))*1000,ch,tok:c,line:li+1});}}
 notes.sort((a,b)=>a.t-b.t||POS[a.ch]-POS[b.ch]);const open={};
 for(const n of notes){if('LK'.includes(n.tok))open[n.ch]=n;else if(n.tok==='E'&&open[n.ch]){open[n.ch].end=n.t;delete open[n.ch];}}
 return notes;}
function check(notes){const H={L:{t:-1e9,pos:1,ch:null,busy:-1e9,flick:false},R:{t:-1e9,pos:6,ch:null,busy:-1e9,flick:false}};
 const taps=notes.filter(n=>n.tok!=='E'),viol=[],kept=[];
 const cost=(h,n)=>{const dt=n.t-h.t,ch=n.ch;if(n.t<h.busy)return '롱 유지 중 같은 손';if(h.flick&&dt<T.FLICK_POST)return '플릭 직후 같은 손';
  if(n.tok==='F'&&dt<T.FLICK_PRE)return '플릭 직전 같은 손';let need;
  if(h.ch===ch)need=T.SAME;else if(isG(ch)!==isG(h.ch||'R1')&&ch!=='GM'&&h.ch!=='GM')need=T.VERT;else if(Math.abs(POS[ch]-h.pos)<=1)need=T.LANE1;else need=T.LANE2;
  if(h.ch&&(ch==='GM')!==(h.ch==='GM'))need=Math.max(need,T.LANE2);return dt<need?`같은 손 간격 ${dt.toFixed(0)}ms<${need} (${h.ch}→${ch})`:null;};
 for(let i=0;i<taps.length;){const g=[taps[i]];let j=i+1;while(j<taps.length&&taps[j].t-taps[i].t<=T.CHORD)g.push(taps[j++]);i=j;
  let best=null,why=null;
  if(g.length>2)why='3개 이상 동시';else{const opts=g.length===1?[['L'],['R']]:[['L','R'],['R','L']];
   for(const o of opts){let w=null;for(let k=0;k<g.length;k++){w=cost(H[o[k]],g[k]);if(w)break;}
    if(!w){const sc=g.reduce((s,n,k)=>s+((HOME[n.ch]||o[k])===o[k]?0:1),0);if(!best||sc<best.sc)best={o,sc};}else if(!why)why=w;}}
  if(best){const win=kept.filter(x=>x.t>=g[0].t-1000);
   if(win.length+g.length>T.NPS_MAX){best=null;why=`NPS>${T.NPS_MAX}`;}
   else if(win.slice(-2).some(x=>g.some(y=>(isG(x.ch)&&x.ch!=='GM'||isG(y.ch)&&y.ch!=='GM')&&y.t-x.t>T.CHORD&&y.t-x.t<T.SIDE_ADJ))){best=null;why=`사이드 버튼 주변 간격<${T.SIDE_ADJ}ms`;}
   else if(win.some(x=>g.some(y=>x.ch===y.ch&&(y.ch==='GL'||y.ch==='GR')&&y.t-x.t<T.SIDE_REP))){best=null;why=`사이드 버튼 연타<${T.SIDE_REP}ms`;}
   else if(win.filter(x=>x.ch==='GL'||x.ch==='GR').length+g.filter(x=>x.ch==='GL'||x.ch==='GR').length>T.SIDE_MAX){best=null;why='사이드 버튼 과밀';}}
  if(!best){viol.push({ms:Math.round(g[0].t),line:g[0].line,why,chs:g.map(x=>x.ch)});continue;}
  g.forEach((n,k)=>{const h=H[best.o[k]];h.t=n.t;h.ch=n.ch;h.pos=POS[n.ch];h.flick=n.tok==='F';if(n.end!=null){h.busy=n.end+T.LONG_REL;h.t=n.end;}kept.push(n);});}
 const ts=taps.map(n=>n.t);let peak=0,a=0;for(let b=0;b<ts.length;b++){while(ts[a]<ts[b]-1000)a++;peak=Math.max(peak,b-a+1);}
 const red=taps.filter(n=>n.ch[0]==='R').length;
 return {notes:taps.length,npsPeak:peak,redPct:taps.length?Math.round(100*red/taps.length):0,violations:viol};}
if(require.main===module){const args=process.argv.slice(2),json=args.includes('--json'),verbose=args.includes('--verbose');let bad=0;const out={};
 for(const f of args.filter(a=>!a.startsWith('--'))){const r=check(parse(fs.readFileSync(f,'utf8')));bad+=r.violations.length;out[f]=r;
  if(!json){console.log(`${f.split('/').pop().padEnd(18)} notes ${String(r.notes).padStart(4)}  NPSpeak ${String(r.npsPeak).padStart(2)}  red ${r.redPct}%  violations ${r.violations.length}`);
   if(verbose)for(const v of r.violations)console.log(`   ${v.ms}ms 행${v.line} [${v.chs}] ${v.why}`);}}
 if(json)console.log(JSON.stringify(out,null,1));process.exit(bad?1:0);}
module.exports={parse,check,T};
