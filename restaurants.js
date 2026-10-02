(()=>{'use strict';
const KEY='nourish_v5';
const restaurants=[
 {id:'mcdonalds',name:"McDonald's",emoji:'🍔',items:[
  {name:'Big Mac®',kcal:509,protein:27,carbs:41,fat:25,source:'McDonald’s UK'},
  {name:'Double Big Mac®',kcal:684,source:'McDonald’s UK'},
  {name:'McCrispy® Deluxe',kcal:601,source:'McDonald’s UK'},
  {name:'Chilli Double Cheeseburger',kcal:440,source:'McDonald’s UK'},
  {name:'Cheesy Garlic Bread Dippers',kcal:214,source:'McDonald’s UK'}
 ]},
 {id:'nandos',name:"Nando's",emoji:'🍗',items:[
  {name:'The Big Caesar',kcal:649,source:"Nando's UK"},
  {name:'Sol Bowl',kcal:583,source:"Nando's UK"},
  {name:'Hearty Bowl',kcal:432,source:"Nando's UK"}
 ]}
];
let current=null;
const $=id=>document.getElementById(id);
const esc=v=>String(v??'').replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
const open=()=>$('restaurantModal')?.classList.add('open');
const close=()=>$('restaurantModal')?.classList.remove('open');
function mount(){
 const food=document.getElementById('food'); if(!food||document.getElementById('eatOutBtn'))return;
 const grid=food.querySelector('.grid');
 const b=document.createElement('button');b.id='eatOutBtn';b.className='btn alt';b.textContent='🍴 Eating out';b.style.cssText='grid-column:1 / -1;width:100%';
 b.onclick=()=>{renderChains();open()};grid.appendChild(b);
 const modal=document.createElement('div');modal.id='restaurantModal';modal.className='modal';modal.innerHTML='<div class="sheet"><div class="row"><h2>🍴 Eating out</h2><button class="close" id="restaurantClose">×</button></div><div id="restaurantBody"></div></div>';
 document.body.appendChild(modal);$('restaurantClose').onclick=close;
}
function renderChains(){
 $('restaurantBody').innerHTML=`<div class="sub" style="margin-bottom:10px">UK menu nutrition · start with a restaurant</div><div class="grid">${restaurants.map(r=>`<button class="btn alt" data-restaurant="${r.id}">${r.emoji} ${esc(r.name)}</button>`).join('')}</div><div id="restaurantItems" style="margin-top:12px"></div>`;
 document.querySelectorAll('[data-restaurant]').forEach(b=>b.onclick=()=>renderItems(b.dataset.restaurant));
}
function renderItems(id){
 current=restaurants.find(r=>r.id===id);const q=`<input id="restaurantSearch" placeholder="🔍 Search ${esc(current.name)} menu">`;
 const body=()=>{const term=($('restaurantSearch')?.value||'').toLowerCase();const items=current.items.filter(x=>x.name.toLowerCase().includes(term));$('restaurantItems').innerHTML=q+`<div class="card"><div class="row"><b>${current.emoji} ${esc(current.name)}</b><span class="sub">${items.length} item${items.length===1?'':'s'}</span></div>${items.map((x,i)=>`<div class="item row"><div><b>${esc(x.name)}</b><div class="sub">${x.kcal} kcal${x.protein!=null?` · ${x.protein}g protein`:''}${x.carbs!=null?` · ${x.carbs}g carbs`:''}${x.fat!=null?` · ${x.fat}g fat`:''}</div><div class="sub">${esc(x.source)} · nutrition can change</div></div><button class="btn small" data-eat-index="${i}">＋</button></div>`).join('')||'<div class="item sub">No menu items found.</div>'}</div>`;
 $('restaurantItems').querySelectorAll('[data-eat-index]').forEach(b=>b.onclick=()=>addItem(+b.dataset.eatIndex));
 $('restaurantSearch').oninput=body;
 body();
}
function addItem(index){
 const item=current.items[index];if(!item)return;
 let s={};try{s=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}
 s.logs=Array.isArray(s.logs)?s.logs:[];const d=new Date();const date=d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
 s.logs.push({date,name:`${current.name} — ${item.name}`,kcal:item.kcal,protein:item.protein||0,carbs:item.carbs||0,fat:item.fat||0,source:'restaurant'});localStorage.setItem(KEY,JSON.stringify(s));
 close();document.querySelector('nav button.active')?.click();
 const toast=$('toast');if(toast){toast.textContent=`${item.name} added to today ✓`;toast.style.display='block';setTimeout(()=>toast.style.display='none',2000)}
}
document.addEventListener('DOMContentLoaded',mount);setTimeout(mount,800);
})();