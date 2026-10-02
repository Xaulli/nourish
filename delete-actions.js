(()=>{'use strict';
const KEY='nourish_v5';
const load=()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}};
const save=s=>localStorage.setItem(KEY,JSON.stringify(s));
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function button(type,index){return `<button class="btn small danger-delete" data-delete-type="${type}" data-delete-index="${index}" aria-label="Delete">×</button>`}
function decorate(){
 const food=document.getElementById('foodList'); if(food&&!food.dataset.deleteReady){food.querySelectorAll('.item.row').forEach((row,i)=>{if(!row.querySelector('.danger-delete'))row.insertAdjacentHTML('beforeend',button('food',i))});food.dataset.deleteReady='1'}
 const today=document.getElementById('todayLog'); if(today&&!today.dataset.deleteReady){today.querySelectorAll('.item.row').forEach((row,i)=>{if(!row.querySelector('.danger-delete'))row.insertAdjacentHTML('beforeend',button('log',i))});today.dataset.deleteReady='1'}
 const meals=document.getElementById('mealList'); if(meals&&!meals.dataset.deleteReady){meals.querySelectorAll('.card').forEach((row,i)=>{if(!row.querySelector('.danger-delete'))row.querySelector('.row')?.insertAdjacentHTML('beforeend',button('meal',i))});meals.dataset.deleteReady='1'}
 const inv=document.getElementById('inventoryList'); if(inv&&!inv.dataset.deleteReady){inv.querySelectorAll('.item.row').forEach((row,i)=>{if(!row.querySelector('.danger-delete'))row.insertAdjacentHTML('beforeend',button('inventory',i))});inv.dataset.deleteReady='1'}
}
function remove(type,index){const s=load();
 if(type==='log'){const logs=(s.logs||[]).filter(x=>x.date===new Date().toISOString().slice(0,10));const target=logs[index];if(!target)return;const pos=(s.logs||[]).indexOf(target);if(pos>=0)s.logs.splice(pos,1)}
 if(type==='food'){const visible=(s.foods||[]).map((x,i)=>({x,i})).filter(o=>!o.x.hidden);const target=visible[index];if(!target)return;const used=(s.meals||[]).some(m=>(m.ingredients||[]).some(i=>i.foodIndex===target.i));if(used){s.foods[target.i].hidden=true;s.foods[target.i].removed=true}else{s.foods.splice(target.i,1)}}
 if(type==='meal'){if(s.meals?.[index])s.meals.splice(index,1)}
 if(type==='inventory'){if(s.inventory?.[index])s.inventory.splice(index,1)}
 save(s);window.location.reload()}
function patch(){decorate();new MutationObserver(()=>decorate()).observe(document.body,{childList:true,subtree:true});document.addEventListener('click',e=>{const b=e.target.closest('[data-delete-type]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const type=b.dataset.deleteType,index=+b.dataset.deleteIndex;const labels={food:'saved food',log:'today’s food entry',meal:'meal',inventory:'Kitchen item'};if(confirm('Delete this '+labels[type]+'?'))remove(type,index)},true)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',patch);else patch();
})();
