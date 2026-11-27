'use strict';
// Local civil time in Mannheim, including CET/CEST.
// Öffnungsanzeige passend zu den sichtbaren Angaben:
//   Garage  Samstag & Sonntag ab 16 Uhr (Erics Mail 26.11.2026)
//   Kiosque täglich ab 8 Uhr (Schluss vorläufig 18 Uhr), erst ab Frühjahr 2027 – solange KIOSQUE_OPENS null ist, leuchtet er nie.
//           Sobald das Eröffnungsdatum feststeht, hier eintragen, z. B. '2027-04-04'.
//   Marché  Samstags ab 10 Uhr
const KIOSQUE_OPENS=null;
const openingHours=(()=>{
 const clock=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Berlin',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
 function status(now=new Date()){
  const p=Object.fromEntries(clock.formatToParts(now).filter(p=>p.type!=='literal').map(p=>[p.type,p.value]));
  const weekday=new Date(Date.UTC(+p.year,+p.month-1,+p.day)).getUTCDay();
  const minute=+p.hour*60 + +p.minute;
  const today=p.year+'-'+p.month+'-'+p.day;
  const kiosqueStarted=KIOSQUE_OPENS!==null&&today>=KIOSQUE_OPENS;
  return {garage:[6,0].includes(weekday)&&minute>=960&&minute<1440,kiosque:kiosqueStarted&&minute>=480&&minute<1080,marche:weekday===6&&minute>=600&&minute<780};
 }
 return {status};
})();
