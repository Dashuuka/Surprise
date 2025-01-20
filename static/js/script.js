// Создаем эффект конфетти
function createConfetti() {
  const colors = ['#ff4081', '#2196f3', '#4caf50', '#ffeb3b', '#9c27b0'];
  const confettiCount = 100;
  const confetti = document.querySelector('.confetti');

  for (let i = 0; i < confettiCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '-10px';
    particle.style.borderRadius = '50%';
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    particle.animate([
      { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
      {
        transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
        opacity: 0
      }
    ], {
      duration: Math.random() * 3000 + 3000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      iterations: Infinity
    });

    confetti.appendChild(particle);
  }
}

// Анимация "нот" (music notes)
function createMusicNotes() {
  const notes = ['♪', '♫', '♩', '♬'];
  const container = document.querySelector('.container');

  setInterval(() => {
    const note = document.createElement('div');
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.position = 'absolute';
    note.style.left = Math.random() * 100 + '%';
    note.style.top = '100%';
    note.style.fontSize = '2rem';
    note.style.color = '#ff4081';
    note.style.opacity = '0.6';
    container.appendChild(note);

    note.animate([
      { transform: 'translateY(0)', opacity: 0.6 },
      { transform: 'translateY(-500px)', opacity: 0 }
    ], {
      duration: 3000,
      easing: 'linear'
    }).onfinish = () => note.remove();
  }, 500);
}

// Фонтан желаний
function initWishingFountain() {
  const fountain = document.querySelector('.fountain');
  const fountainBowl = fountain.querySelector('.fountain-bowl');
  const water = fountainBowl.querySelector('.water');
  const wishes = [
    "Стать тру минчанкой! ",
    "Встретить принца на белом коне! ",
    "Гармонии! ",
    "Меньше сюра! ",
    "Капельку везения! ",
    "Умиротворения! "
  ];

  fountain.addEventListener('click', (e) => {
    const rect = fountain.getBoundingClientRect();
    const waterRect = water.getBoundingClientRect();

    // Создаем "монету"
    const coin = document.createElement('div');
    coin.className = 'coin';

    // Позиция клика внутри фонтана
    const startX = e.clientX - rect.left - 10;
    const startY = e.clientY - rect.top - 10;

    coin.style.left = startX + 'px';
    coin.style.top = startY + 'px';
    fountain.appendChild(coin);

    // Создаем "пожелание"-текст
    const wish = document.createElement('div');
    wish.className = 'wish-text';
    wish.textContent = wishes[Math.floor(Math.random() * wishes.length)];

    // Располагаем текст относительно окна (body)
    wish.style.left = e.clientX + 'px';
    wish.style.top = (e.clientY - 30) + 'px';
    document.body.appendChild(wish);

    // Считаем, насколько монета должна упасть до воды
    const waterSurfaceY = waterRect.top - rect.top + (waterRect.height * 0.4);
    const fallDistance = waterSurfaceY - startY;

    // Анимация падения монеты
    coin.animate([
      {
        opacity: 1,
        transform: 'translateY(0) rotate(0deg)'
      },
      {
        opacity: 1,
        transform: `translateY(${fallDistance * 0.5}px) rotate(180deg)`
      },
      {
        opacity: 1,
        transform: `translateY(${fallDistance}px) rotate(360deg)`
      },
      {
        opacity: 0,
        transform: `translateY(${fallDistance}px) rotate(360deg)`
      }
    ], {
      duration: 1500,
      easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
    }).onfinish = () => coin.remove();

    // Анимация появления-исчезновения текста пожелания
    wish.animate([
      { opacity: 0, transform: 'translateY(0)' },
      { opacity: 1, transform: 'translateY(-20px)' },
      { opacity: 0, transform: 'translateY(-60px)' }
    ], {
      duration: 2000,
      easing: 'ease-out'
    }).onfinish = () => wish.remove();

    // Лёгкое "плескание" воды
    water.animate([
      { transform: 'translateY(0)' },
      { transform: 'translateY(-10px)' },
      { transform: 'translateY(0)' }
    ], {
      duration: 500,
      easing: 'ease-out'
    });
  });
}

// Анимация шариков
function createBalloons() {
  const colors = [
    ['#ff4081', '#ff80ab'],
    ['#2196f3', '#64b5f6'],
    ['#4caf50', '#81c784'],
    ['#9c27b0', '#ba68c8'],
    ['#ff9800', '#ffb74d']
  ];

  let activeBalloons = 0;
  const maxBalloons = 12;

  setInterval(() => {
    if (activeBalloons < maxBalloons) {
      const balloon = document.createElement('div');
      balloon.className = 'balloon';
      const colorPair = colors[Math.floor(Math.random() * colors.length)];
      balloon.style.background = `linear-gradient(135deg, ${colorPair[0]}, ${colorPair[1]})`;
      balloon.style.left = Math.random() * 90 + 5 + '%';

      const balloons = document.querySelector('.balloons');
      balloons.appendChild(balloon);
      activeBalloons++;

      balloon.addEventListener('animationend', () => {
        balloon.remove();
        activeBalloons--;
      });
    }
  }, 1500);
}

/*
   Новая функция, создающая на фотографии поцелуйчики (эмодзи "💋").
   Каждые 1.5 секунды генерируется новый "поцелуй"
   в случайном месте контейнера .photo-container
*/
function createKissesOnPhoto() {
  const photoContainer = document.querySelector('.photo-container');
  if (!photoContainer) return;

  setInterval(() => {
    // Создаём элемент для поцелуя
    const kiss = document.createElement('div');
    kiss.className = 'kiss';
    kiss.textContent = '💋';

    // Случайные координаты в процентах от контейнера
    const xPercent = Math.random() * 80 + 10; // чтобы не прилегали к самым краям
    const yPercent = Math.random() * 80 + 10;
    kiss.style.left = xPercent + '%';
    kiss.style.top = yPercent + '%';

    // Добавляем поцелуй в контейнер
    photoContainer.appendChild(kiss);

    // Удаляем, когда анимация закончится
    kiss.addEventListener('animationend', () => {
      kiss.remove();
    });
  }, 900);
}

// Инициализируем все эффекты при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
  createConfetti();
  createMusicNotes();
  initWishingFountain();
  createBalloons();
  createKissesOnPhoto(); // Запуск анимации поцелуйчиков над фото
});
