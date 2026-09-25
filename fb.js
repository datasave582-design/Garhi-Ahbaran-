const SAME_AUTH=/\.(web\.app|firebaseapp\.com)$/.test(location.hostname);
const CFG={apiKey:"AIzaSyDofStHVzO_D6VBQ8dHHEodgIWmKXOoSE8",authDomain:(SAME_AUTH?location.hostname:"meragav-bdc89.firebaseapp.com"),projectId:"meragav-bdc89",storageBucket:"meragav-bdc89.firebasestorage.app",messagingSenderId:"1040183992371",appId:"1:1040183992371:web:ac8e1a7dd22cec0f000346",measurementId:"G-N46V6452ZJ"};
// admin पेज का लॉगिन अलग रखा है ताकि यूज़र-ऐप का लॉगिन/लॉगआउट उसे न छेड़े
const app=/admin/.test(location.pathname)?firebase.initializeApp(CFG,"admin"):firebase.initializeApp(CFG);
const auth=app.auth(),db=app.firestore(),FV=firebase.firestore.FieldValue;
// Login ko device par tab tak persistent rakho jab tak user khud logout na kare.
const AUTH_PERSISTENCE=firebase.auth.Auth.Persistence.LOCAL;
auth.setPersistence(AUTH_PERSISTENCE).catch(e=>console.error('Auth persistence:',e));
const $=s=>document.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const mail=m=>m+'@meragav.in';
// फोटो को छोटा करके base64 बनाता है (Storage की ज़रूरत नहीं)
function img(file,max=320){return new Promise(r=>{if(!file)return r('');const f=new FileReader();f.onload=e=>{const i=new Image();i.onload=()=>{const k=Math.min(1,max/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);r(c.toDataURL('image/jpeg',.6))};i.src=e.target.result};f.readAsDataURL(file)})}

const SYM=['🔔 घंटी','🪑 कुर्सी','🔑 चाबी','💡 बल्ब','☂️ छाता','🪁 पतंग','🏏 बल्ला','🍎 सेब','🚜 ट्रैक्टर','🪭 पंखा','☕ कप-प्लेट','⚽ फुटबॉल','✈️ हवाई जहाज़','🔒 ताला','🧢 टोपी','🎈 गुब्बारा','✂️ कैंची','⏰ घड़ी','🪣 बाल्टी','☎️ टेलीफोन','💻 लैपटॉप'];
const symOpts=()=>'<option value="">— चिह्न चुनें —</option>'+SYM.map(x=>`<option>${x}</option>`).join('')+'<option value="">अन्य (नीचे खुद लिखें)</option>';
