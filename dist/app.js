'use strict';
// Restoring focus after a card closes must not leave a pointer/touch outline.
// Keep a visible focus indicator when the visitor navigates with a keyboard.
document.addEventListener('pointerdown',()=>{document.documentElement.dataset.inputMethod='pointer';},true);
document.addEventListener('keydown',e=>{
 if(e.key==='Tab'||e.key.startsWith('Arrow'))document.documentElement.dataset.inputMethod='keyboard';
},true);
const locations={
 garage:{title:'Garage',address:'Beilstraße 6 · Jungbusch · Mannheim',hours:'Samstag & Sonntag, ab 16 Uhr'},
 kiosque:{title:'Kiosque',address:'Lindenhofplatz 1 · Lindenhof · Mannheim',hours:'Täglich, ab 8 Uhr',note:'(Frühjahr 2027)'},
 marche:{title:'Marché',address:'Meeräckerplatz · Lindenhof · Mannheim',hours:'Samstags, ab 10 Uhr'}
};
const dialog=document.querySelector('#location-dialog');
const legalDialog=document.querySelector('#legal-dialog');
let legalOrigin=null;
let origin=null;
function openLocation(key){
 const data=locations[key];if(!data)return;
 const icon=document.querySelector('.locations [data-location="'+key+'"] .venue-icon').cloneNode(true);
 document.querySelector('#location-icon').replaceChildren(icon);
 dialog.scrollTop=0;
 dialog.dataset.location=key;updateOpeningLights();
 for(const field of ['title','address','hours'])document.querySelector('#location-'+field).textContent=data[field];
 if(data.note){const note=document.createElement('span');note.className='location-note';note.textContent=data.note;document.querySelector('#location-hours').append(' ',note);}
 document.querySelectorAll('.dialog-nav a').forEach(a=>{if(a.dataset.location===key)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
 if(!dialog.open){origin=document.activeElement;dialog.showModal();}
}
function syncHash(){
 const key=location.hash.slice(1);
 if(key==='impressum'||key==='datenschutz'){
  if(dialog.open)dialog.close();
  document.querySelector('#legal-heading').textContent=key==='impressum'?'Impressum':'Datenschutz';
  // Ein Datenschutztext für alle Adressen (Hosting: Vercel), keine Auswahl nach Hostname.
  const content = document.querySelector('#text-' + key).content.cloneNode(true);
  document.querySelector('#legal-body').replaceChildren(content);
  if(!legalDialog.open){legalOrigin=document.activeElement;legalDialog.showModal();}
  legalDialog.scrollTop=0;
 }else{
  if(legalDialog.open)legalDialog.close();
  if(locations[key])openLocation(key);else if(dialog.open)dialog.close();
 }
}
legalDialog.querySelector('.close-button').addEventListener('click',()=>legalDialog.close());
legalDialog.addEventListener('close',()=>{
 if(['#impressum','#datenschutz'].includes(location.hash))history.replaceState(null,'',location.pathname+location.search);
 if(!dialog.open)legalOrigin?.focus({preventScroll:true});
});
document.querySelector('.close-button').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{if(locations[location.hash.slice(1)])history.replaceState(null,'',location.pathname+location.search);if(!legalDialog.open)origin?.focus({preventScroll:true});});
function updateOpeningLights(){
 const state=openingHours.status();
 const key=dialog.dataset.location;
 document.querySelector('#location-icon').classList.toggle('is-open',Boolean(state[key]));
}
let openingClock=null;
function refreshOpeningClock(){
 clearTimeout(openingClock);updateOpeningLights();
 openingClock=setTimeout(refreshOpeningClock,60000-(Date.now()%60000)+30);
}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshOpeningClock();});
window.addEventListener('pageshow',refreshOpeningClock);
refreshOpeningClock();
window.addEventListener('hashchange',syncHash);syncHash();

const shots=[...document.querySelectorAll('.shot')];
const toggle=document.querySelector('.motion-toggle');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
let paused=reduced.matches;let shot=-1;let timer=null;
let shotOrder=[];
let sequence=0;
const imageKey=index=>shots[index]?.querySelector('img').dataset.src;
function readImageMemory(key){try{return localStorage.getItem('lannee.background.'+key);}catch{return null;}}
function rememberImage(key,index){try{localStorage.setItem('lannee.background.'+key,imageKey(index));}catch{}}
function takeNextShot(avoid=[]){
 if(!shotOrder.length){
  shotOrder=shots.map((_,index)=>index);
  for(let i=shotOrder.length-1;i>0;i--){
   const j=Math.floor(Math.random()*(i+1));
   [shotOrder[i],shotOrder[j]]=[shotOrder[j],shotOrder[i]];
  }
 }
 // Avoid the current picture at round boundaries and the previous visit's opener.
 const excluded=new Set([shot,...avoid]);
 if(shotOrder.length>1&&excluded.has(shotOrder[0])){
  const alternatives=shotOrder.map((index,position)=>position).filter(position=>!excluded.has(shotOrder[position]));
  if(alternatives.length){
   const position=alternatives[Math.floor(Math.random()*alternatives.length)];
   [shotOrder[0],shotOrder[position]]=[shotOrder[position],shotOrder[0]];
  }
 }
 return shotOrder.shift();
}
// No fixed photo is loaded before selecting the first picture.
shots.forEach(el=>{el.hidden=true;el.classList.remove('active','travelling');});
let remaining=9000,startedAt=0,busy=true,retiring=null,cleanupTimer=null;
function release(el){
 if(!el||el===shots[shot])return;
 el.hidden=true;el.classList.remove('active','travelling');
 const img=el.querySelector('img');
 img.removeAttribute('src');
}
function loadShot(el){
 const img=el.querySelector('img');
 return new Promise(resolve=>{
  let timeout;
  const done=ok=>{clearTimeout(timeout);img.onload=null;img.onerror=null;resolve(ok);};
  img.onload=()=>done(true);img.onerror=()=>done(false);
  timeout=setTimeout(()=>done(false),10000);
  if(!img.getAttribute('src'))img.src=img.dataset.src;
  if(img.complete&&img.naturalWidth)done(true);
 });
}
async function startSlideshow(){
 const run=++sequence;
 busy=true;
 clearTimeout(timer);timer=null;
 clearTimeout(cleanupTimer);release(retiring);retiring=null;
 shotOrder=[];
 const previous=[readImageMemory('first'),readImageMemory('last')];
 const avoid=shots.map((_,index)=>index).filter(index=>previous.includes(imageKey(index)));
 for(let attempt=0;attempt<shots.length;attempt++){
  const index=takeNextShot(avoid),incoming=shots[index];
  incoming.querySelector('img').fetchPriority='high';
  const ready=await loadShot(incoming);
  if(run!==sequence)return;
  if(!ready){release(incoming);continue;}
  shot=index;
  shots.forEach(el=>{if(el!==incoming)release(el);});
  incoming.hidden=false;
  incoming.classList.add('active','travelling');
  rememberImage('first',index);rememberImage('last',index);
  break;
 }
 busy=false;remaining=9000;updateMotion();
}
async function nextShot(){
 const run=sequence;
 busy=true;
 clearTimeout(cleanupTimer);release(retiring);retiring=null;
 const index=takeNextShot(),incoming=shots[index];
 const ready=await loadShot(incoming);
 if(run!==sequence)return;
 if(ready&&!document.hidden&&!paused){
  const outgoing=shots[shot];
  incoming.hidden=false;
  // Establish opacity zero before starting the crossfade.
  void incoming.offsetWidth;
  incoming.classList.add('travelling','active');
  outgoing?.classList.remove('active');shot=index;retiring=outgoing;
  rememberImage('last',index);
  cleanupTimer=setTimeout(()=>{release(outgoing);retiring=null;},3000);
 }else release(incoming);
 busy=false;remaining=9000;updateMotion();
}
function updateMotion(){
 if(timer!==null){clearTimeout(timer);remaining=Math.max(0,remaining-(performance.now()-startedAt));timer=null;}
 document.body.classList.toggle('paused',paused||document.hidden);
 toggle.setAttribute('aria-pressed',String(paused));
 const label=paused?'Animationen abspielen':'Animationen pausieren';toggle.setAttribute('aria-label',label);toggle.title=label;
 if(!paused&&!document.hidden&&!busy){
  startedAt=performance.now();
  timer=setTimeout(()=>{timer=null;nextShot();},remaining);
 }
}
toggle.addEventListener('click',()=>{paused=!paused;updateMotion();});
document.addEventListener('visibilitychange',updateMotion);
window.addEventListener('pagehide',()=>{sequence++;busy=false;clearTimeout(timer);timer=null;remaining=9000;clearTimeout(cleanupTimer);release(retiring);retiring=null;});
window.addEventListener('pageshow',event=>{if(event.persisted)startSlideshow();else updateMotion();});
reduced.addEventListener('change',()=>{paused=reduced.matches;updateMotion();});
startSlideshow();

// Two identical compact groups make a seamless, compositor-only logo ticker.
const marks=document.querySelector('.footer-marks');
if(marks){
 const track=document.createElement('div');track.className='marks-track';
 const group=document.createElement('div');group.className='marks-group';
 group.append(...marks.children);
 const copy=group.cloneNode(true);copy.classList.add('marks-copy');copy.setAttribute('aria-hidden','true');copy.setAttribute('inert','');
 const ids=new Map();
 copy.querySelectorAll('[id]').forEach(el=>{ids.set(el.id,el.id+'-ticker-copy');el.id+='-ticker-copy';});
 copy.querySelectorAll('*').forEach(el=>{for(const attr of [...el.attributes]){
  let value=attr.value;
  for(const [oldId,newId] of ids){value=value.replaceAll('url(#'+oldId+')','url(#'+newId+')');if(attr.name==='aria-labelledby'&&value===oldId)value=newId;}
  if(value!==attr.value)el.setAttribute(attr.name,value);
 }});
 track.append(group,copy);marks.append(track);
}

const menuTabs=[...document.querySelectorAll('.menu-tabs [role="tab"]')];
function selectMenuTab(tab){
 menuTabs.forEach(item=>{const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;document.getElementById(item.getAttribute('aria-controls')).hidden=!active;});
}
menuTabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectMenuTab(tab));
 tab.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;event.preventDefault();const next=event.key==='Home'?menuTabs[0]:event.key==='End'?menuTabs[1]:menuTabs[1-index];selectMenuTab(next);next.focus();});
});

// Garage-Symbol (Erics Mail 26.11.2026): Klick → grünes Licht flackert an (neon-start, 0,9 s) →
// Speisekarte /karte/ öffnet in neuem Fenster. Strg-/Cmd-/Mittelklick und reduzierte Bewegung: sofort.
document.querySelectorAll('.locations .venue-link').forEach(link=>{
 link.addEventListener('click',e=>{
  if(e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||reduced.matches)return;
  e.preventDefault();
  if(link.classList.contains('is-lit'))return;
  link.classList.add('is-lit');
  setTimeout(()=>{
   const win=window.open(link.href,'_blank');
   if(win)win.opener=null;else location.href=link.href;
   setTimeout(()=>link.classList.remove('is-lit'),400);
  },900);
 });
});
