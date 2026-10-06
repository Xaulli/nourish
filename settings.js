(()=>{'use strict';
const KEY='nourish_v5',SET='nourish_settings';
const defaults={kcal:1900,protein:130,carbs:200,fat:65,water:2000};
const $=id=>document.getElementById(id);
function get(){try{return {...defaults,...(JSON.parse(localStorage.getItem(SET))||{})}}catch(e){return {...defaults}}}
function save(s){localStorage.setItem(SET,JSON.stringify(s))}
function sync(){
 const g=get(), kcalEl=$('kcal'),ring=$('ring');
 if(kcalEl){const cur=Number(kcalEl.textContent)||0;const cap=$('kcalGoal');if(cap)cap.textContent='/ '+g.kcal.toLocaleString()+' kcal';}
 const set=(id,text)=>{const e=$(id);if(e)e.textContent=text};
 set('proteinText',(document.getElementById('proteinText')?.textContent.split('/')[0].trim()||'0')+' / '+g.protein+'g');
 set('carbsText',(document.getElementById('carbsText')?.textContent.split('/')[0].trim()||'0')+' / '+g.carbs+'g');
 set('fatText',(document.getElementById('fatText')?.textContent.split('/')[0].trim()||'0')+' / '+g.fat+'g');
 const w=document.getElementById('waterText'),wm=w?.textContent.match(/^([0-9.]+)/);if(w)w.textContent=(wm?wm[1]:'0')+' / '+(g.water/1000).toFixed(1)+'L';
 if(ring&&kcalEl){const cur=Number(kcalEl.textContent)||0;ring.style.setProperty('--prog',Math.min(100,cur/g.kcal*100)+'%')}
 const pb=$('proteinBar'),cb=$('carbsBar'),fb=$('fatBar'),wb=$('waterBar');
 const p=Number(($('proteinText')?.textContent||'0').split('/')[0])||0,c=Number(($('carbsText')?.textContent||'0').split('/')[0])||0,fa=Number(($('fatText')?.textContent||'0').split('/')[0])||0,wa=Number(($('waterText')?.textContent||'0').split('/')[0])||0;
 if(pb)pb.style.width=Math.min(100,p/g.protein*100)+'%';if(cb)cb.style.width=Math.min(100,c/g.carbs*100)+'%';if(fb)fb.style.width=Math.min(100,fa/g.fat*100)+'%';if(wb)wb.style.width=Math.min(100,wa/(g.water/100)*100)+'%';
}
function openSettings(){const g=get();['kcal','protein','carbs','fat','water'].forEach(k=>{const e=$('goal'+k.charAt(0).toUpperCase()+k.slice(1));if(e)e.value=g[k]});$('settingsModal')?.classList.add('open')}
function closeSettings(){$('settingsModal')?.classList.remove('open')}
function init(){
 document.addEventListener('click',e=>{
  const b=e.target.closest('[data-settings],[data-save-settings],[data-close-settings]');if(!b)return;
  if(b.dataset.settings){e.preventDefault();openSettings()}
  if(b.dataset.closeSettings)closeSettings();
  if(b.dataset.saveSettings){
   const g=get();['kcal','protein','carbs','fat','water'].forEach(k=>{const id='goal'+k.charAt(0).toUpperCase()+k.slice(1),v=Number($(id)?.value);if(v>0)g[k]=v});
   save(g);closeSettings();sync();const t=$('toast');if(t){t.textContent='Goals updated ✓';t.style.display='block';setTimeout(()=>t.style.display='none',1800)}
  }
 },true);
 new MutationObserver(()=>sync()).observe(document.querySelector('.app'),{subtree:true,childList:true});
 sync();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();