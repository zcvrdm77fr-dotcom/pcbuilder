const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
const one=k=>$(`[data-key=${k}] [aria-pressed=true]`)?.dataset.v;
const many=k=>$$(`[data-key=${k}] [aria-pressed=true]`).map(b=>b.dataset.v);
const pick=(t,v)=>{let r=t[0],i=0;t.forEach((x,j)=>{if(v>=x[0]){r=x;i=j}});return{r,i}};
const TI={
gpu:[[0,'Käytetty kortti (RTX 3060 / RX 6600) tai integroitu grafiikka','Tällä summalla käytetty kortti Torista on paras diili.'],[130,'RTX 5050 / RX 7600 -luokka','Sopii 1080p-pelaamiseen.'],[260,'RTX 5060 / RX 9060 XT 8 Gt','Vahva 1080p, kohtuullinen 1440p.'],[380,'RTX 5060 Ti 16 Gt / RX 9060 XT 16 Gt','Riittävästi muistia 1440p-peleille.'],[520,'RTX 5070 / RX 9070','Hyvä 1440p korkealla virkistystaajuudella.'],[720,'RTX 5070 Ti / RX 9070 XT','1440p ultra-asetuksilla, kevyt 4K.'],[950,'RTX 5080','Sopii 4K-pelaamiseen.'],[1500,'RTX 5090','Ei kompromisseja.']],
cpu:[[0,'Ryzen 5 5500 / Core i3-12100F -luokka','Riittää arkeen ja kevyeen pelaamiseen.'],[100,'Ryzen 5 7500F / 7600','Hyvä perusvalinta uudella AM5-kannalla.'],[180,'Ryzen 5 9600X / Ryzen 7 7700','Nopea lähes kaikkeen.'],[270,'Ryzen 7 7800X3D / 9700X','X3D-mallit ovat pelien kärkeä.'],[420,'Ryzen 7 9800X3D','Paras pelisuoritin. Työkäyttöön 9900X.'],[600,'Ryzen 9 9950X / 9950X3D','Raskaaseen renderöintiin ja koodaukseen.']],
ram:[[0,'16 Gt DDR5','Minimi, riittää arkeen.'],[60,'32 Gt DDR5-6000 (2×16)','Nykypeleille ja monelle ohjelmalle hyvä taso.'],[200,'64 Gt DDR5','Editointiin, 3D:hen ja virtuaalikoneisiin.']],
ssd:[[0,'500 Gt NVMe','Aloitustaso.'],[55,'1 Tt NVMe Gen4','Pelit ja ohjelmat mahtuvat hyvin.'],[110,'2 Tt NVMe Gen4','Reilusti tilaa ja nopeutta.'],[220,'4 Tt NVMe Gen4','Iso pelikirjasto tai videomateriaali.']],
mb:[[0,'A620 / B550 -luokka','Valitse prosessorin kannan mukaan.'],[90,'B650 (WiFi)','Hyvä hinta–laatu.'],[160,'B850','PCIe 5.0 ja vahva virransyöttö.'],[280,'X870E','Kaikki herkut mukana.']],
psu:[[0,'450–550 W 80+ Bronze','Riittää pienelle tai integroidulle grafiikalle.'],[55,'650 W 80+ Gold','Sopii keskiluokan koneelle.'],[90,'750–850 W 80+ Gold, ATX 3.1','Reilusti varaa tehokkaalle kortille.'],[150,'1000 W 80+ Platinum, ATX 3.1','Huippuluokan korteille.']],
case:[[0,'Edullinen ilmavirtakotelo','Mesh-etulevy jäähdyttää parhaiten.'],[55,'Laadukas mesh-kotelo, 3 tuuletinta','Hyvä ilmavirta ja helppo koota.'],[100,'Premium-kotelo','Hiljainen, siisti ja kestävä.']],
cool:[[0,'Prosessorin mukana tuleva jäähdytin','Riittää perusasioihin.'],[30,'Tornijäähdytin (esim. Thermalright Assassin X)','Hiljaisempi ja viileämpi kuin boksi.'],[55,'Kaksitorninen jäähdytin (esim. Peerless Assassin 120)','Erinomainen hinta–laatu.'],[110,'360 mm vesijäähdytys','Raskaalle prosessorille ja ulkonäköön.']],
monitor:[[0,'24" 1080p, 100–144 Hz','Hyvä aloitusnäyttö.'],[130,'24–27" 1080p/1440p, 144–165 Hz IPS','Sulava ja tarkka.'],[250,'27" 1440p IPS, 165–240 Hz','Pelaamisen sweet spot.'],[450,'27" 1440p OLED tai 32" 4K','Huippukuva.']],
kbm:[[0,'Perusnäppäimistö ja hiiri','Aloitustaso.'],[60,'Mekaaninen näppäimistö ja hyvä pelihiiri','Tuntuu heti paremmalta.'],[140,'Premium-mekaaninen ja langaton pelihiiri','Pitkäikäiset.']],
head:[[0,'Edullinen kuulokemikrofoni','Perustaso.'],[60,'Hyvä pelikuulokemikrofoni','Selkeä ääni ja mikrofoni.'],[130,'Studiotason kuulokkeet ja erillinen mikrofoni','Äänenlaatu kohdallaan.']]};
const L={gpu:'Näytönohjain',cpu:'Prosessori',ram:'Keskusmuisti',ssd:'SSD-levy',mb:'Emolevy',psu:'Virtalähde',case:'Kotelo',cool:'Prosessorijäähdytin',monitor:'Näyttö',kbm:'Näppäimistö ja hiiri',head:'Kuulokkeet'};
const BASE={game:{gpu:40,cpu:16,ram:9,ssd:8,mb:9,psu:6,case:6,cool:6},work:{gpu:8,cpu:28,ram:14,ssd:16,mb:14,psu:8,case:7,cool:5},create:{gpu:30,cpu:26,ram:12,ssd:10,mb:9,psu:6,case:4,cool:3}};
const DT={comp:{gpu:-8,cpu:6,ram:1,ssd:1},aaa:{gpu:4,cpu:-3,mb:-1},1080:{gpu:-3,cpu:3},'4k':{gpu:6,cpu:-3,mb:-2,cool:-1},small:{case:2,mb:2,gpu:-3,ssd:-1},quiet:{cool:3,case:2,psu:1,gpu:-4,cpu:-2},rgb:{case:3,cool:2,gpu:-3,mb:-2}};
const SC={small:'Valitse kompakti mATX- tai Mini-ITX-kotelo ja sen mukainen emolevy.',quiet:'Hae hiljainen kotelo, jossa on ääntä vaimentavat paneelit.',rgb:'Valitse lasikyljellä varustettu kotelo ja ARGB-tuulettimet.'};
const IN={cpu:['Core i3-12100F / i5-12400F','Core i5-14400F / Core Ultra 5 225F','Core Ultra 5 245K','Core Ultra 7 265K','Core Ultra 7 265KF','Core Ultra 9 285K'],mb:['H610 / B760','B760 / B860 (WiFi)','B860 / Z890','Z890']};
let shown=false,lastTxt='';
function render(){
 const B=clamp(Math.round(+$('#num').value)||0,200,10000),use=one('use'),res=one('res'),type=one('type'),st=one('style'),per=many('per'),gb=one('gb'),cb=one('cb');
 const pv={monitor:clamp(B*.17,100,650),kbm:clamp(B*.06,35,180),head:clamp(B*.05,25,200)};
 const ps=per.reduce((s,k)=>s+pv[k],0),f=ps>B*.4?B*.4/ps:1;
 per.forEach(k=>pv[k]=Math.round(pv[k]*f/5)*5);
 const pt=per.reduce((s,k)=>s+pv[k],0),Tw=B-pt;
 const sh={...BASE[use]},add=o=>{for(const k in o)sh[k]+=o[k]};
 if(use==='game'){add(DT[type]||{});add(DT[res]||{})}
 add(DT[st]||{});
 const off=use==='work'&&Tw*sh.gpu/100<130;
 if(off){sh.cpu+=sh.gpu/2;sh.ssd+=sh.gpu/4;sh.ram+=sh.gpu/4;sh.gpu=0}
 const keys=Object.keys(sh),sum=keys.reduce((s,k)=>s+sh[k],0),al={};
 keys.forEach(k=>al[k]=Math.round(Tw*sh[k]/sum/5)*5);
 const main=use==='work'?'cpu':'gpu';al[main]+=Tw-keys.reduce((s,k)=>s+al[k],0);
 const rows=[];let gi=0;
 keys.forEach(k=>{
  if(k==='gpu'&&off)return rows.push([k,0,'Ei erillistä näytönohjainta','Prosessorin integroitu grafiikka riittää nettiin ja toimistotöihin.']);
  const {r,i}=pick(TI[k],al[k]);let n=r[2],nm=r[1];
  if(k==='gpu'&&i>0&&gb!=='any'){const f=nm.split(' / ').find(x=>x.includes(gb==='nv'?'RTX':'RX'));nm=f||(gb==='amd'?'RX 9070 XT (AMD:lla ei ole tätä tehokkaampaa)':nm)}
  if(k==='cpu'&&cb==='intel'){nm=IN.cpu[i];if(i>=3&&use==='game')n='Intelillä ei ole X3D-malleja. Pelaamiseen AMD on yleensä parempi.'}
  if(k==='mb'&&cb==='intel')nm=IN.mb[i];
  if(k==='gpu')gi=i;
  if(k==='cpu'&&off)n+=' Valitse malli, jossa on integroitu grafiikka (esim. Ryzen 5 7600 tai 8600G).';
  if(k==='case'&&SC[st])n+=' '+SC[st];
  if(k==='cool'&&st==='quiet')n+=' Hiljaisuuteen riittää iso tornijäähdytin.';
  rows.push([k,al[k],nm,n]);
 });
 const pr=per.map(k=>{const v=pick(TI[k],pv[k]);let n=v.r[2];if(k==='monitor'&&use==='game'&&res==='4k'&&pv[k]>=350)v.r=[0,'27–32" 4K, 144 Hz'];if(k==='monitor'&&use==='game'&&res==='1080'&&pv[k]>=250)v.r=[0,'24–25" 1080p, 240 Hz'];return[k,pv[k],v.r[1],n]});
 const mx=Math.max(...rows.map(r=>r[1]),...pr.map(r=>r[1]),1);
 const row=r=>`<li><div class="rh"><h4>${L[r[0]]}</h4><b>${r[1]?r[1]+' €':'0 €'}</b></div><p class="m">${r[2]}</p><p class="s">${r[3]}</p><i style="--w:${Math.max(2,r[1]/mx*100)}%"></i></li>`;
 const w=[];
 if(use==='game'&&Tw<450)w.push('Pelaamiseen tämä on tiukka summa. Käytetyt osat (Tori.fi), erityisesti näytönohjain ja prosessori, venyttävät budjettia.');
 if(use==='game'&&res==='4k'&&gi<5)w.push('4K-pelaaminen vaatii vahvan näytönohjaimen. Tällä budjetilla 1440p-näyttö olisi järkevämpi valinta.');
 if(use==='create'&&Tw<700)w.push('Raskaaseen editointiin kannattaa varata enemmän, etenkin muistiin ja prosessoriin.');
 const all=[...rows,...pr].filter(r=>r[1]>0),hue=j=>`hsl(${j*41} 62% 52%)`;
 const stk=`<div class="stk" role="img" aria-label="Budjetin jakauma">${all.map((r,j)=>`<span style="flex:${r[1]};background:${hue(j)}" title="${L[r[0]]} ${r[1]} €"></span>`).join('')}</div><p class="lg">${all.map((r,j)=>`<span><u style="background:${hue(j)}"></u>${L[r[0]]} ${Math.round(r[1]/B*100)} %</span>`).join('')}</p>`;
 const lv=['Ei suositella','Kohtalainen','Hyvä','Erinomainen'];
 const perf=use==='game'?`<div class="perf">${[['1080p',0],['1440p',1],['4K',3]].map(([n,o])=>{const s=clamp(gi-o,0,3);return `<div class="pf"><b>${n}</b>${[1,2,3].map(x=>`<em${x<=s?' class="on"':''}></em>`).join('')}<span>${lv[s]}</span></div>`}).join('')}</div>`:'';
 lastTxt=[...rows,...pr].map(r=>`${L[r[0]]}: ${r[2]} (${r[1]} €)`).join('\n');
 $('#out').innerHTML=`<h2>Kokoonpano ${B} €:lla</h2><p class="lead">${{game:'Pelikone',work:'Työ- ja nettikone',create:'Sisällöntuotantokone'}[use]}, jossa budjetti on jaettu käyttötarkoituksen mukaan.</p>${stk}${perf}${w.map(x=>`<p class="w">${x}</p>`).join('')}<h3 class="grp"><span>Tietokone</span><span>${Tw} €</span></h3><ul>${rows.map(row).join('')}</ul>${pr.length?`<h3 class="grp"><span>Oheislaitteet</span><span>${pt} €</span></h3><ul>${pr.map(row).join('')}</ul>`:''}<p class="fine">Mallit ovat esimerkkejä luokasta, eivät tarkkoja hintoja. Hinnat ja saatavuus vaihtelevat, joten vertaile ne esimerkiksi Hintaopas.fi:ssä ennen ostoa. Windows-lisenssi ei sisälly budjettiin.</p><button id="cp" type="button">Kopioi lista</button>`;
}
const upd=()=>{save();if(shown)render()};
$('#num').addEventListener('input',()=>{$('#rng').value=$('#num').value;upd()});
$('#rng').addEventListener('input',()=>{$('#num').value=$('#rng').value;upd()});
document.addEventListener('click',e=>{const b=e.target.closest('.chips button');if(!b)return;const g=b.parentElement;
 if(g.dataset.multi)b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')!=='true');
 else g.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));
 if(g.dataset.key==='use')$('#gameq').hidden=b.dataset.v!=='game';upd()});
$('#go').addEventListener('click',()=>{shown=true;render();$('#out').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});

function save(){try{localStorage.setItem('kokoonpano',JSON.stringify({b:$('#num').value,s:$$('.chips').map(g=>[g.dataset.key,[...g.children].map(x=>x.getAttribute('aria-pressed'))])}))}catch(e){}}
function load(){try{const d=JSON.parse(localStorage.getItem('kokoonpano'));if(!d)return;$('#num').value=$('#rng').value=d.b;d.s.forEach(([k,v])=>{[...$(`[data-key=${k}]`).children].forEach((x,i)=>x.setAttribute('aria-pressed',v[i]))});$('#gameq').hidden=one('use')!=='game'}catch(e){}}
load();
$('#out').addEventListener('click',async e=>{if(e.target.id!=='cp')return;try{await navigator.clipboard.writeText(`Tietokone ${$('#num').value} €:lla\n`+lastTxt);e.target.textContent='Kopioitu'}catch(x){e.target.textContent='Kopiointi ei onnistunut'}});
