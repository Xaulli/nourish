(()=>{'use strict';
const KEY='nourish_v5';
const $=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function state(){try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}}
function save(s){localStorage.setItem(KEY,JSON.stringify(s))}
let openRow=null;
function wrapRows(){
 document.querySelectorAll('#todayLog .item,#foodList .item,#mealList .card,#inventoryList .item').forEach((row)=>{
  if(row.dataset.swipeReady)return;
  row.dataset.swipeReady='1';row.classList.add('swipe-row');
  const content=document.createElement('div');content.className='swipe-content';
  while(row.firstChild)content.appendChild(row.firstChild);row.appendChild(content);
  const del=document.createElement('button');del.className='swipe-delete';del.type='button';del.textContent='Delete';del.setAttribute('aria-label','Delete');
  row.appendChild(del);
  let startX=0,startY=0,dx=0,moving=false;
  const start=e=>{const p=e.touches?e.touches[0]:e;startX=p.clientX;startY=p.clientY;dx=0;moving=true;if(openRow&&openRow!==row)closeRow(openRow)};
  const move=e=>{if(!moving)return;const p=e.touches?e.touches[0]:e;dx=p.clientX-startX;const dy=p.clientY-startY;if(Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>8){moving=false;return}if(dx>0)dx=0;if(dx<-110)dx=-110;if(dx<0){e.preventDefault();content.style.transform=`translateX(${dx}px)`;del.style.opacity=Math.min(1,Math.abs(dx)/65)}};
  const end=()=>{if(!moving)return;moving=false;if(dx<=-105){deleteRow(row);return}if(dx<=-35){openRow=row;content.style.transform='translateX(-72px)';del.style.opacity='1'}else closeRow(row)};
  row.addEventListener('touchstart',start,{passive:true});row.addEventListener('touchmove',move,{passive:false});row.addEventListener('touchend',end);row.addEventListener('mousedown',start);row.addEventListener('mousemove',move);row.addEventListener('mouseup',end);row.addEventListener('mouseleave',()=>{if(moving)end()});
  del.addEventListener('click',e=>{e.stopPropagation();deleteRow(row)});
 });
}
function closeRow(row){if(!row)return;const c=row.querySelector('.swipe-content');if(c)c.style.transform='translateX(0)';const d=row.querySelector('.swipe-delete');if(d)d.style.opacity='0';if(openRow===row)openRow=null}
function deleteRow(row){const s=state(),type=row.closest('#todayLog')?'logs':row.closest('#foodList')?'foods':row.closest('#mealList')?'meals':'inventory';let index=Number(row.dataset.index);if(Number.isNaN(index))index=Number(row.querySelector('[data-add-food]')?.dataset.addFood??row.querySelector('[data-log-meal]')?.dataset.logMeal);if(Number.isNaN(index)){toast('Could not identify item');return}if(!Array.isArray(s[type]))return; if(type==='logs'){const todays=s.logs.filter(x=>x.date===today());const target=todays[index];const actual=s.logs.indexOf(target);if(actual>=0)s.logs.splice(actual,1)}else s[type].splice(index,1);save(s);openRow=null;document.dispatchEvent(new Event('nourish:refresh'))}
function today(){const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
function toast(t){const x=$('toast');if(!x)return;x.textContent=t;x.style.display='block';setTimeout(()=>x.style.display='none',1800)}
function clearToday(){const s=state();if(!Array.isArray(s.logs))return;if(!s.logs.some(x=>x.date===today()))return toast('Nothing logged today');if(!confirm("Clear all food logged today? This cannot be undone."))return;s.logs=s.logs.filter(x=>x.date!==today());save(s);document.dispatchEvent(new Event('nourish:refresh'));toast('Today cleared ✓')}
function addClearButton(){const box=$('#todayLog')?.parentElement;if(!box||box.querySelector('[data-clear-today]'))return;const b=document.createElement('button');b.className='btn alt small';b.dataset.clearToday='1';b.textContent='Clear today';b.style.marginTop='10px';b.addEventListener('click',clearToday);box.appendChild(b)}
function refresh(){setTimeout(()=>{wrapRows();addClearButton()},30)}
function patchIndices(){document.querySelectorAll('#todayLog .item').forEach((r,i)=>r.dataset.index=i);document.querySelectorAll('#foodList .item').forEach(r=>{const b=r.querySelector('[data-add-food]');if(b)r.dataset.index=b.dataset.addFood});document.querySelectorAll('#mealList .card').forEach(r=>{const b=r.querySelector('[data-log-meal]');if(b)r.dataset.index=b.dataset.logMeal});document.querySelectorAll('#inventoryList .item').forEach((r,i)=>r.dataset.index=i)}
function init(){document.addEventListener('nourish:refresh',()=>{const active=document.querySelector('.screen.active');if(active&&typeof window.nourishRender==='function')window.nourishRender();else location.reload()});const observer=new MutationObserver(()=>{patchIndices();refresh()});observer.observe(document.querySelector('.app'),{subtree:true,childList:true});setTimeout(()=>{patchIndices();refresh()},100)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
