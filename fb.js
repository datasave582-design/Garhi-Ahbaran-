firebase.initializeApp({apiKey:"AIzaSyDofStHVzO_D6VBQ8dHHEodgIWmKXOoSE8",authDomain:"meragav-bdc89.firebaseapp.com",projectId:"meragav-bdc89",storageBucket:"meragav-bdc89.firebasestorage.app",messagingSenderId:"1040183992371",appId:"1:1040183992371:web:ac8e1a7dd22cec0f000346",measurementId:"G-N46V6452ZJ"});
const auth=firebase.auth(),db=firebase.firestore(),FV=firebase.firestore.FieldValue;
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const mail=m=>m+'@meragav.in';
// फोटो को छोटा करके base64 बनाता है (Storage की ज़रूरत नहीं)
function img(file,max=320){return new Promise(r=>{if(!file)return r('');const f=new FileReader();f.onload=e=>{const i=new Image();i.onload=()=>{const k=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);r(c.toDataURL('image/jpeg',.6))};i.src=e.target.result};f.readAsDataURL(file)})}
