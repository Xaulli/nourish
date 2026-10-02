(()=>{'use strict';
const KEY='nourish_v5';
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}};
const save=s=>localStorage.setItem(KEY,JSON.stringify(s));
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const days=d=>Math.ceil((new Date(d)-new Date(new Date().toDateString()))/86400000);
const button=(type,index)=>`<button class="btn small danger-delete" data-delete-type="${type}" data-delete-index="${index}" aria-label="Delete">×</button>`;
function decorate(){
 const s=load();
 const food=document.getElementById('foodList');
 if(food){food.querySelectorAll('.danger-delete').forEach(x=>x.remove());const q=(document.getElementById('foodSearch')?.value||'').toLowerCase();const visible=(s.foods||[]).map((x,i)=>({x,i})).filter(o=>!o.x.hidden&&o.x.name.toLowerCase().includes(q));food.querySelectorAll('.item.row').forEach((row,i)=>{if(visible[i])row.insertAdjacentHTML('beforeend',button('food',visible[i].i))})}
 const todayEl=document.getElementById('todayLog');
 if(todayEl){todayEl.querySelectorAll('.danger-delete').forEach(x=>x.remove());const logs=(s.logs||[]).map((x,i)=>({x,i})).filter(o=>o.x.date===today());todayEl.querySelectorAll('.item.row').forEach((row,i)=>{if(logs[i])row.insertAdjacentHTML('beforeend',button('log',logs[i].i))});const holder=todayEl.closest('.card');if(holder&&!holder.querySelector('[data-clear-today]')){const head=holder.querySelector('.row');if(head)head.insertAdjacentHTML('beforeend','<button class="btn small danger-clear" data-clear-today="1">Clear today</button>')}}
 const meals=document.getElementById('mealList');
 if(meals){meals.querySelectorAll('.danger-delete').forEach(x=>x.remove());meals.querySelectorAll('.card').forEach((row,i)=>{if((s.meals||[])[i])row.querySelector('.row')?.insertAdjacentHTML('beforeend',button('meal',i))})}
 const inv=document.getElementById('inventoryList');
 if(inv){inv.querySelectorAll('.danger-delete').forEach(x=>x.remove());const sorted=(s.inventory||[]).map((x,i)=>({x,i})).sort((a,b)=>days(a.x.date)-days(b.x.date));inv.querySelectorAll('.item.row').forEach((row,i)=>{if(sorted[i])row.insertAdjacentHTML('beforeend',button('inventory',sorted[i].i))})}
}
function remove(type,index){const s=load();
 if(type==='log'){if(s.logs?.[index])s.logs.splice(index,1)}
 if(type==='food'){if(s.foods?.[index]){const used=(s.meals||[]).some(m=>(m.ingredients||[]).some(i=>i.foodIndex===index));if(used){s.foods[index].hidden=true;s.foods[index].removed=true}else s.foods.splice(index,1)}}
 if(type==='meal'){if(s.meals?.[index])s.meals.splice(index,1)}
 if(type==='inventory'){if(s.inventory?.[index])s.inventory.splice(index,1)}
 save(s);window.location.reload()
}
function clearToday(){const s=load(),count=(s.logs||[]).filter(x=>x.date===today()).length;if(!count)return;if(!confirm('Clear all food logged today? This cannot be undone.'))return;s.logs=(s.logs||[]).filter(x=>x.date!==today());save(s);window.location.reload()}
function patch(){decorate();new MutationObserver(()=>decorate()).observe(document.body,{childList:true,subtree:true});document.addEventListener('input',e=>{if(e.target.id==='foodSearch')setTimeout(decorate,0)},true);document.addEventListener('click',e=>{const clear=e.target.closest('[data-clear-today]');if(clear){e.preventDefault();e.stopImmediatePropagation();clearToday();return}const b=e.target.closest('[data-delete-type]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const type=b.dataset.deleteType,index=+b.dataset.deleteIndex;const labels={food:'saved food',log:'today’s food entry',meal:'meal',inventory:'Kitchen item'};if(confirm('Delete this '+labels[type]+'?'))remove(type,index)},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patch);else patch();
})();
