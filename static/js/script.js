// Create confetti effect
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
    particle.style.top = -10 + 'px';
    particle.style.borderRadius = '50%';
    particle.style.transform = `rotate(${Math.random() * 360}deg)`;

    const animation = particle.animate([
      { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
      { transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], {
      duration: Math.random() * 3000 + 3000,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      iterations: Infinity
    });

    confetti.appendChild(particle);
  }
}

// Add music notes floating animation
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

    const animation = note.animate([
      { transform: 'translateY(0)', opacity: 0.6 },
      { transform: 'translateY(-500px)', opacity: 0 }
    ], {
      duration: 3000,
      easing: 'linear'
    });

    animation.onfinish = () => note.remove();
  }, 500);
}

// Wishing fountain interaction
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

    const coin = document.createElement('div');
    coin.className = 'coin';

    // Position relative to viewport for better mobile support
    const startX = e.clientX - rect.left - 10;
    const startY = e.clientY - rect.top - 10;

    coin.style.left = startX + 'px';
    coin.style.top = startY + 'px';
    fountain.appendChild(coin);

    const wish = document.createElement('div');
    wish.className = 'wish-text';
    wish.textContent = wishes[Math.floor(Math.random() * wishes.length)];
    // Position wish text relative to viewport
    wish.style.left = e.clientX + 'px';
    wish.style.top = (e.clientY - 30) + 'px';
    document.body.appendChild(wish); // Append to body instead of fountain

    // Calculate the distance to the water surface
    const waterSurfaceY = waterRect.top - rect.top + (waterRect.height * 0.4);
    const fallDistance = waterSurfaceY - startY;

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
      duration: 1500, // Slower fall
      easing: 'cubic-bezier(0.45, 0, 0.55, 1)'
    }).onfinish = () => coin.remove();

    wish.animate([
      { opacity: 0, transform: 'translateY(0)' },
      { opacity: 1, transform: 'translateY(-20px)' },
      { opacity: 0, transform: 'translateY(-60px)' }
    ], {
      duration: 2000,
      easing: 'ease-out'
    }).onfinish = () => wish.remove();

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

// Add balloon animation
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

// Initialize all animations when page loads
document.addEventListener('DOMContentLoaded', () => {
  createConfetti();
  createMusicNotes();
  initWishingFountain();
  createBalloons();
});