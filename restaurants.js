(()=>{'use strict';
const KEY='nourish_v5';
const restaurants=[
{id:'mcdonalds',name:"McDonald's",emoji:'🍔',items:[
{name:'Big Mac®',kcal:509,protein:27,carbs:41,fat:25,category:'Burgers'},
{name:'Double Big Mac®',kcal:684,category:'Burgers'},
{name:'Quarter Pounder™ with Cheese',kcal:507,category:'Burgers'},
{name:'Double Quarter Pounder™ with Cheese',kcal:739,category:'Burgers'},
{name:'Cheeseburger',kcal:301,category:'Burgers'},
{name:'Double Cheeseburger',kcal:445,category:'Burgers'},
{name:'Hamburger',kcal:250,category:'Burgers'},
{name:'Mayo Chicken',kcal:342,category:'Burgers'},
{name:'McChicken® Sandwich',kcal:369,category:'Chicken'},
{name:'McCrispy®',kcal:484,category:'Chicken'},
{name:'Spicy McCrispy®',kcal:489,category:'Chicken'},
{name:'Cheese & Bacon McCrispy®',kcal:580,category:'Chicken'},
{name:'Filet-O-Fish®',kcal:319,category:'Fish'},
{name:'Double Filet-O-Fish®',kcal:450,category:'Fish'},
{name:'McPlant®',kcal:429,category:'Vegetarian'},
{name:'Chicken McNuggets® (4 pieces)',kcal:174,category:'Chicken'},
{name:'Chicken McNuggets® (6 pieces)',kcal:261,category:'Chicken'},
{name:'Chicken McNuggets® (9 pieces)',kcal:391,category:'Chicken'},
{name:'Chicken McNuggets® (20 pieces)',kcal:869,category:'Chicken'},
{name:'Small Fries',kcal:237,category:'Sides'},
{name:'Medium Fries',kcal:337,category:'Sides'},
{name:'Large Fries',kcal:444,category:'Sides'},
{name:'Hash Brown',kcal:127,category:'Sides'},
{name:'Apple Slices',kcal:46,category:'Sides'},
{name:'Cheesy Garlic Bread Dippers',kcal:214,category:'Sides'},
{name:'Sausage & Egg McMuffin®',kcal:423,category:'Breakfast'},
{name:'Bacon & Egg McMuffin®',kcal:335,category:'Breakfast'},
{name:'Egg & Cheese McMuffin®',kcal:295,category:'Breakfast'},
{name:'Double Sausage & Egg McMuffin®',kcal:551,category:'Breakfast'},
{name:'Breakfast Wrap with Ketchup',kcal:604,category:'Breakfast'},
{name:'Pancakes & Syrup',kcal:456,category:'Breakfast'},
{name:'Porridge',kcal:154,category:'Breakfast'},
{name:'Sausage Sandwich with Ketchup',kcal:333,category:'Breakfast'},
{name:'Oreo® McFlurry®',kcal:258,category:'Desserts'},
{name:'Chocolate Brownie',kcal:316,category:'Desserts'},
{name:'Apple Pie',kcal:243,category:'Desserts'},
{name:'Chocolate Milkshake (medium)',kcal:364,category:'Drinks'},
{name:'Vanilla Milkshake (medium)',kcal:366,category:'Drinks'},
{name:'Strawberry Milkshake (medium)',kcal:356,category:'Drinks'},
{name:'Cappuccino (medium)',kcal:79,category:'Drinks'},
{name:'Americano (medium)',kcal:6,category:'Drinks'},
{name:'Orange Juice',kcal:100,category:'Drinks'},
{name:'Coca-Cola Original Taste (medium)',kcal:170,category:'Drinks'}
]},
{id:'kfc',name:'KFC',emoji:'🍗',items:[{name:'Zinger Burger',kcal:445},{name:'Original Recipe Burger',kcal:450},{name:'Fillet Burger',kcal:380},{name:'3 Piece Original Recipe Chicken',kcal:660},{name:'Regular Signature Fries',kcal:265},{name:'Regular Popcorn Chicken',kcal:285},{name:'Mini Fillet',kcal:130},{name:'Chocolate Chip Cookie',kcal:220}]},
{id:'nandos',name:"Nando's",emoji:'🍗',items:[{name:'The Big Caesar',kcal:649},{name:'Sol Bowl',kcal:583},{name:'Hearty Bowl',kcal:432},{name:'4 Boneless Chicken Thighs',kcal:706},{name:'Chicken Butterfly',kcal:332},{name:'1/2 Chicken',kcal:579},{name:'1/4 Chicken',kcal:289},{name:'5 Chicken Wings',kcal:393},{name:'Grilled Chicken Burger',kcal:443},{name:'Grilled Chicken Wrap',kcal:514},{name:'Grilled Chicken Pitta',kcal:508},{name:'Chips',kcal:248}]},
{id:'subway',name:'Subway',emoji:'🥪',items:[{name:'6-inch Italian B.M.T.',kcal:414},{name:'6-inch Meatball Marinara',kcal:410},{name:'6-inch Chicken Teriyaki',kcal:371},{name:'6-inch Steak & Cheese',kcal:445},{name:'6-inch Turkey Breast',kcal:292},{name:'6-inch Tuna',kcal:426},{name:'6-inch Veggie Delite',kcal:224},{name:'Chocolate Chip Cookie',kcal:210}]},
{id:'greggs',name:'Greggs',emoji:'🥐',items:[{name:'Sausage Roll',kcal:328},{name:'Vegan Sausage Roll',kcal:312},{name:'Steak Bake',kcal:409},{name:'Chicken Bake',kcal:421},{name:'Pepperoni Pizza Slice',kcal:311},{name:'Sausage, Bean & Cheese Melt',kcal:438},{name:'Chocolate Cookie',kcal:313}]},
{id:'burgerking',name:'Burger King',emoji:'🍔',items:[{name:'Whopper',kcal:627},{name:'Double Whopper',kcal:828},{name:'Bacon Double XL',kcal:945},{name:'Chicken Royale',kcal:563},{name:'Bacon King',kcal:903},{name:'Regular Fries',kcal:282},{name:'Onion Rings',kcal:337},{name:'Chicken Nuggets 6pc',kcal:254}]},
{id:'fiveguys',name:'Five Guys',emoji:'🍔',items:[{name:'Hamburger',kcal:840},{name:'Cheeseburger',kcal:980},{name:'Bacon Cheeseburger',kcal:1060},{name:'Little Hamburger',kcal:540},{name:'Little Cheeseburger',kcal:680},{name:'Little Fries',kcal:526},{name:'Regular Fries',kcal:953},{name:'Cajun Fries',kcal:953}]},
{id:'wagamama',name:'Wagamama',emoji:'🍜',items:[{name:'Chicken Ramen',kcal:652},{name:'Chicken Katsu Curry',kcal:1061},{name:'Chicken Pad Thai',kcal:780},{name:'Yaki Udon',kcal:665},{name:'Chicken Gyoza',kcal:389},{name:'Edamame',kcal:153}]},
{id:'pizzahut',name:'Pizza Hut',emoji:'🍕',items:[{name:'Margherita Pizza',kcal:830},{name:'Pepperoni Feast Pizza',kcal:1040},{name:'Meat Feast Pizza',kcal:1120},{name:'Hawaiian Pizza',kcal:920},{name:'Garlic Bread',kcal:480},{name:'Chicken Wings',kcal:420}]},
{id:'dominos',name:"Domino's",emoji:'🍕',items:[{name:'Small Cheese & Tomato Pizza',kcal:640},{name:'Small Pepperoni Passion Pizza',kcal:760},{name:'Medium Cheese & Tomato Pizza',kcal:1040},{name:'Medium Pepperoni Passion Pizza',kcal:1230},{name:'Chicken Strippers',kcal:320},{name:'Garlic Pizza Bread',kcal:640}]}
];
const $=id=>document.getElementById(id);const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function mount(){const food=$('food');if(!food)return;let b=$('eatOutBtn');if(!b){const grid=food.querySelector('.grid');if(!grid)return;b=document.createElement('button');b.id='eatOutBtn';b.className='btn alt';b.style.cssText='grid-column:1/-1;width:100%;margin-top:8px';b.textContent='🍴 Eating out';grid.appendChild(b)}if(b.dataset.restaurantBound!=='1'){b.dataset.restaurantBound='1';b.addEventListener('click',openRestaurant)}}
function openRestaurant(){let modal=$('restaurantModal');if(!modal){modal=document.createElement('div');modal.id='restaurantModal';modal.className='modal';modal.innerHTML='<div class="sheet restaurant-sheet"><div class="row"><h2>🍴 Eating out</h2><button class="close" id="restaurantClose">×</button></div><div id="restaurantBody" class="restaurant-results"></div></div>';document.body.appendChild(modal);$('restaurantClose').onclick=()=>modal.classList.remove('open')}renderChains();modal.classList.add('open')}
function renderChains(){const body=$('restaurantBody');body.innerHTML='<div class="sub" style="margin-bottom:10px">UK menu nutrition · choose a restaurant</div><div class="grid">'+restaurants.map(r=>`<button class="btn alt" data-r="${r.id}">${r.emoji} ${esc(r.name)}</button>`).join('')+'</div><div id="restaurantItems"></div>';body.querySelectorAll('[data-r]').forEach(b=>b.onclick=()=>renderItems(b.dataset.r))}
function renderItems(id){const r=restaurants.find(x=>x.id===id);if(!r)return;const wrap=$('restaurantItems');let basket=[],selectedCategory='All';wrap.innerHTML='<input id="restaurantSearch" autocomplete="off" type="search" placeholder="🔍 Search '+esc(r.name)+' menu"><div id="restaurantCategories" class="restaurant-categories"></div><div id="restaurantResults"></div><div id="restaurantBasket"></div>';const search=$('restaurantSearch'),results=$('restaurantResults'),basketEl=$('restaurantBasket'),categoryEl=$('restaurantCategories'),categories=['All',...new Set(r.items.map(x=>x.category).filter(Boolean))];categoryEl.innerHTML=categories.map(cat=>'<button type="button" class="restaurant-category '+(cat===selectedCategory?'active':'')+'" data-category="'+esc(cat)+'">'+esc(cat)+'</button>').join('');categoryEl.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{selectedCategory=b.dataset.category;categoryEl.querySelectorAll('[data-category]').forEach(x=>x.classList.toggle('active',x.dataset.category===selectedCategory));draw()});const draw=()=>{const term=search.value.toLowerCase();const items=r.items.filter(x=>x.name.toLowerCase().includes(term)&&(selectedCategory==='All'||x.category===selectedCategory));results.innerHTML='<div class="card"><div class="row"><b>'+r.emoji+' '+esc(r.name)+'</b><span class="sub">'+items.length+' items</span></div>'+items.map((x,i)=>`<div class="item row"><div><b>${esc(x.name)}</b><div class="sub">${x.kcal} kcal${x.protein!=null?' · '+x.protein+'g protein':''}${x.carbs!=null?' · '+x.carbs+'g carbs':''}${x.fat!=null?' · '+x.fat+'g fat':''}</div><div class="sub">Estimated nutrition · check current restaurant information for exact values</div></div><button class="btn small" data-add="${i}">＋</button></div>`).join('')+'</div>';results.querySelectorAll('[data-add]').forEach(b=>b.onclick=()=>{basket.push(items[+b.dataset.add]);renderBasket()})};const renderBasket=()=>{if(!basket.length){basketEl.innerHTML='';return}const total=k=>basket.reduce((a,x)=>a+(Number(x[k])||0),0);basketEl.innerHTML=`<div class="card"><div class="row"><b>🛒 Your order</b><button class="btn alt small" id="clearOrder">Clear</button></div>${basket.map((x,i)=>`<div class="item row"><div><b>${esc(x.name)}</b><div class="sub">${x.kcal} kcal</div></div><button class="btn alt small" data-remove="${i}">×</button></div>`).join('')}<div class="row" style="margin-top:12px"><div><b>${Math.round(total('kcal'))} kcal</b><div class="sub">${Math.round(total('protein'))}g protein · ${Math.round(total('carbs'))}g carbs · ${Math.round(total('fat'))}g fat</div></div><button class="btn" id="addOrder">Add order</button></div></div>`;basketEl.querySelector('#clearOrder').onclick=()=>{basket=[];renderBasket()};basketEl.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{basket.splice(+b.dataset.remove,1);renderBasket()});basketEl.querySelector('#addOrder').onclick=()=>addOrder(r,basket)};search.addEventListener('input',draw);search.addEventListener('keydown',e=>e.stopPropagation());draw();search.focus()}
function addOrder(r,basket){if(!basket.length)return;const total=k=>basket.reduce((a,x)=>a+(Number(x[k])||0),0);const entry={name:r.name+' — '+basket.map(x=>x.name).join(', '),kcal:total('kcal'),protein:total('protein'),carbs:total('carbs'),fat:total('fat'),source:'restaurant'};if(typeof window.NourishQueueFoodLog==='function'){$('restaurantModal')?.classList.remove('open');window.NourishQueueFoodLog(entry);return}if(window.NourishStore)NourishStore.addDiary(entry);else{let s={};try{s=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}s.logs=Array.isArray(s.logs)?s.logs:[];s.logs.push({...entry,date:new Date().toISOString().slice(0,10),category:'Snacks'});localStorage.setItem(KEY,JSON.stringify(s))}window.location.reload()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount);else mount();setTimeout(mount,1000);setTimeout(mount,3000);
})();