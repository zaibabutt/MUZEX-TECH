// 1. MOBILE MENU
const btn = document.getElementById('menuBtn');
const nav = document.getElementById('mainNav');
if(btn){
  btn.addEventListener('click', ()=>{
    nav.classList.toggle('open');
    btn.textContent = nav.classList.contains('open') ? '✕' : '☰';
  });
  nav.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{ nav.classList.remove('open'); btn.textContent='☰'; });
  });
}

// 2. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', (e)=>{
    const id = a.getAttribute('href');
    if(id.length>1){
      const el = document.querySelector(id);
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth'}); }
    }
  });
});

// 3. ORDER FORM - VALIDATION + WHATSAPP
const form = document.getElementById('orderForm');
if(form){
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('oName').value.trim();
    const phone = document.getElementById('oPhone').value.trim();
    const service = document.getElementById('oService').value;
    const msg = document.getElementById('oMsg').value.trim();
    const err = document.getElementById('oError');
    if(!name){ err.textContent='Please fill your name'; return; }
    if(!phone){ err.textContent='Please fill WhatsApp number'; return; }
    if(!msg){ err.textContent='Please write your message / question'; return; }
    err.textContent='';
    const text = `Hello MUZEX TECHNOLOGIES!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AService: ${encodeURIComponent(service)}%0AMessage: ${encodeURIComponent(msg)}`;
    // APNA NUMBER YAHAN DALO - 92 ke sath, bina + ke
    const myNumber = '923001234567';
    window.open(`https://wa.me/${myNumber}?text=${text}`, '_blank');
  });
}

// 4. NEW - FAQ OPEN / CLOSE - AUREX STYLE
document.querySelectorAll('.faq-q').forEach(qBtn => {
  qBtn.addEventListener('click', () => {
    const item = qBtn.parentElement;
    const ans = item.querySelector('.faq-a');
    const isOpen = item.classList.contains('open');

    // Sab band kar do pehle
    document.querySelectorAll('.faq-item').forEach(i => {
      i.classList.remove('open');
      i.querySelector('.faq-a').style.display = 'none';
      i.querySelector('.faq-q').textContent = i.querySelector('.faq-q').textContent.replace(' -', ' +').replace('−', '+');
    });

    // Agar band tha to khol do
    if(!isOpen){
      item.classList.add('open');
      ans.style.display = 'block';
      qBtn.textContent = qBtn.textContent.replace('+', '-');
    }
  });
});

// 5. NEW - TEAM SLIDER - Prev / Next
let teamIndex = 0;
function scrollTeam(dir){
  const wrap = document.getElementById('teamCards');
  if(!wrap) return;
  // Mobile pe scroll, Desktop pe kuch nahi karna
  if(window.innerWidth <= 700){
    const card = wrap.querySelector('.team-card');
    if(!card) return;
    const w = card.offsetWidth + 20;
    teamIndex = teamIndex + dir;
    if(teamIndex < 0) teamIndex = 0;
    if(teamIndex > 3) teamIndex = 3;
    wrap.scrollTo({ left: teamIndex * w, behavior: 'smooth' });
  }
}
function nextTeam(){ scrollTeam(1); }
function prevTeam(){ scrollTeam(-1); }