// 1) ГОДИННИК І ДАТА
function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const mins = String(now.getMinutes()).padStart(2, '0');
  const secs = String(now.getSeconds()).padStart(2, '0');
  
  const dateStr = now.toLocaleDateString('uk-UA', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  console.log(`${hours}:${mins}:${secs} — ${dateStr}`);
}

setInterval(updateClock, 1000);
updateClock();

// CSS для ripple анімації
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
  button, .btn, .category, .read-more {
    position: relative;
    overflow: hidden;
    transition: transform 120ms ease;
  }
`;
document.head.appendChild(style);

// 🌙 ЗМІНА ТЕМИ
function toggleTheme() {
  // БУЛО: const html = document.documentElement;
  // СТАЛО: використовуємо document.body, бо CSS написаний для body
  const target = document.body; 
  
  const currentTheme = target.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  target.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  console.log('🌙 Тема змінена на:', newTheme);
}
// ... (кінець файлу main.js)

document.addEventListener('DOMContentLoaded', () =>{
  // Застосувати збережену тему при завантаженні
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // БУЛО: document.documentElement.setAttribute('data-theme', savedTheme);
  // СТАЛО:
  document.body.setAttribute('data-theme', savedTheme);

});

// ПІДПИСКА
function subscribeNews() {
  alert('Дякуємо за підписку! 📧');
}

// ВСЕ ІНІЦІАЛІЗУЄТЬСЯ ОДИН РАЗ
document.addEventListener('DOMContentLoaded', () => {
  // Застосувати збережену тему при завантаженні
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);

  // 2) АНІМАЦІЯ КНОПОК (ripple + press)
  const buttons = document.querySelectorAll('button, .btn, .category, .read-more');
  
  buttons.forEach(btn => {
    btn.addEventListener('pointerdown', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.style.position = 'absolute';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.background = 'rgba(255,255,255,0.5)';
      ripple.style.borderRadius = '50%';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.pointerEvents = 'none';
      ripple.style.animation = 'ripple 600ms ease-out';
      
      if (btn.style.position === 'static') btn.style.position = 'relative';
      btn.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
      
      btn.style.transform = 'scale(0.98)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 100);
    });
  });

  // 4) ПОШУК НА СТОРІНЦІ
  const searchInput = document.querySelector('.search-form input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const items = document.querySelectorAll('.news-item');
      
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? '' : 'none';
      });
    });
  }

  // 5) ФІЛЬТРАЦІЯ ПО КАТЕГОРІЯМ
  const cats = document.querySelectorAll('.category');
  
  cats.forEach(cat => {
    cat.addEventListener('click', () => {
      cats.forEach(c => c.classList.remove('active'));
      cat.classList.add('active');
      
      const category = cat.dataset.category;
      const items = document.querySelectorAll('.news-item');
      
      items.forEach(item => {
        const itemCat = item.dataset.category;
        item.style.display = (category === 'all' || itemCat === category) ? '' : 'none';
      });
    });
  });

  // 6) АНІМАЦІЯ СКРОЛУ (fade-in)
  const newsItems = document.querySelectorAll('.news-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  newsItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(10px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(item);
  });

  // 7) ALERT НА CLICK READ-MORE
  const readMoreLinks = document.querySelectorAll('.read-more');
  
  readMoreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.href === '#' || !link.href) {
        e.preventDefault();
        console.log('Читаю статтю...');
      }
    });
  });
});

