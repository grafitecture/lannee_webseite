'use strict';
// Local civil time in Mannheim, including CET/CEST. Holiday rules:
// https://im.baden-wuerttemberg.de/de/service/feiertage
// Öffnungsanzeige passend zu den sichtbaren Angaben:
//   Garage  Freitag & Samstag ab 16 Uhr
//   Kiosque Sonn- & Feiertags ab 12 Uhr, erst ab Frühjahr 2027 – solange KIOSQUE_OPENS null ist, leuchtet er nie.
//           Sobald das Eröffnungsdatum feststeht, hier eintragen, z. B. '2027-04-04'.
//   Marché  Samstags ab 10 Uhr
const KIOSQUE_OPENS=null;
const openingHours=(()=>{
 const clock=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
 const cache=new Map();
 function holidays(year){
  if(cache.has(year))return cache.get(year);
  const a=year%19,b=Math.floor(year/100),c=year%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451);
  const month=Math.floor((h+l-7*m+114)/31),day=(h+l-7*m+114)%31+1;
  const easter=Date.UTC(year,month-1,day);
  const dates=new Set(['01-01','01-06','05-01','10-03','11-01','12-25','12-26']);
  for(const offset of [-2,1,39,50,60])dates.add(new Date(easter+offset*86400000).toISOString().slice(5,10));
  cache.set(year,dates);return dates;
 }
 function status(now=new Date()){
  const p=Object.fromEntries(clock.formatToParts(now).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
  const weekday=new Date(Date.UTC(+p.year,+p.month-1,+p.day)).getUTCDay();
  const minute=+p.hour*60 + +p.minute;
  const today=p.year+'-'+p.month+'-'+p.day;
  const kiosqueStarted=KIOSQUE_OPENS!==null&&today>=KIOSQUE_OPENS;
  return {garage:[5,6].includes(weekday)&&minute>=960&&minute<1440,kiosque:kiosqueStarted&&(weekday===0||holidays(+p.year).has(p.month+'-'+p.day))&&minute>=720&&minute<1080,marche:weekday===6&&minute>=600&&minute<780};
 }
 return {status};
})();
