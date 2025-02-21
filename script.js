const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const songName = document.querySelector(".music-player h1");
const artistName = document.querySelector(".music-player p");

const songs = [
  {
    title: "Ram Aayenge 🚩",
    name: "Ram Aayenge 🚩By Shobhit Asthana",
    source: "song-list/Ram Aayenge.m4a",
    color: "#ff00ff" // Pink/purple for lighting bar
  },
  {
    title: "ADHARAM MADHURAM",
    name: "ADHARAM MADHURAM By Shobhit Asthana",
    source: "song-list/ADHARAM MADHURAM.m4a",
    color: "#00ffff" // Cyan for lighting bar
  },
  {
    title: "Ram Aayenge 🚩",
    name: "Ram Aayenge 🚩By Shobhit Asthana",
    source: "song-list/Ram Aayenge.m4a",
    color: "#ff00ff" // Pink/purple (duplicate song)
  },
  {
    title: "Keejo Kesari Ke Laal",
    name: "Keejo Kesari Ke Laal By Shobhit Asthana",
    source: "song-list/Keejo Kesari Ke Laal.m4a",
    color: "#ff4500" // Orange-red for lighting bar
  },
  {
    title: "Shiv Tandav Stotram",
    name: "Shiv Tandav Stotram By Shobhit Asthana",
    source: "song-list/Shiv Tandav Stotram.m4a",
    color: "#1e90ff" // Dodger blue for lighting bar
  },
  {
    title: "ganpati bappa morya 🙏🙏🚩🚩❤️❤️❤️❤️",
    name: "ganpati bappa morya 🙏🚩❤️ by Shobhit Asthana",
    source: "song-list/ganpati bappa morya.m4a",
    color: "#dda0dd" // Plum for lighting bar
  },
  {
    title: "Shakti Hai Bhakti Hai",
    name: "Shakti Hai Bhakti Hai By Shobhit Ashana",
    source: "song-list/Shakti Hai Bhakti Hai.m4a",
    color: "#ff69b4" // Hot pink for lighting bar
  },
];

let currentSongIndex = 3;

function updateSongInfo() {
  songName.textContent = songs[currentSongIndex].title;
  artistName.textContent = songs[currentSongIndex].name;
  song.src = songs[currentSongIndex].source;

  // Update music lighting bar color and reset animation
  const lightBars = document.querySelectorAll('.light-bar');
  lightBars.forEach(bar => {
    bar.style.background = `linear-gradient(to top, ${songs[currentSongIndex].color}, #ffffff, ${songs[currentSongIndex].color})`;
  });
}

song.addEventListener("timeupdate", function () {
  if (!song.paused) {
    progress.value = song.currentTime;
  }
});

song.addEventListener("loadedmetadata", function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
});

function pauseSong() {
  song.pause();
  controlIcon.classList.remove("fa-pause");
  controlIcon.classList.add("fa-play");
}

function playSong() {
  song.play();
  controlIcon.classList.add("fa-pause");
  controlIcon.classList.remove("fa-play");
}

function playPause() {
  if (song.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", function () {
  song.currentTime = progress.value;
});

progress.addEventListener("change", function () {
  playSong();
});

forwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateSongInfo();
  playPause();
});

backwardButton.addEventListener("click", function () {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateSongInfo();
  playPause();
});

updateSongInfo();

// Theme toggle functionality
const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  } else {
    themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
});

// Wallpaper selection functionality
const wallpaperImgs = document.querySelectorAll('.wallpaper-popup img');
wallpaperImgs.forEach(img => {
  img.addEventListener('click', () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  });
});

// Bounce animation for buttons (once only)
const buttons = document.querySelectorAll('.controls button');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    if (!btn.classList.contains('bounced')) {
      btn.classList.add('bounce');
      btn.classList.add('bounced'); // Mark as bounced to prevent multiple triggers
      setTimeout(() => {
        btn.classList.remove('bounce');
        btn.classList.remove('bounced'); // Reset after animation
      }, 500);
    }
  });
});

// Swiper initialization with loop and rolling animation
var swiper = new Swiper(".swiper", {
  effect: "coverflow",
  centeredSlides: true,
  initialSlide: 3,
  slidesPerView: "auto",
  allowTouchMove: false,
  spaceBetween: 40,
  loop: true,
  speed: 1000,
  coverflowEffect: {
    rotate: 25,
    stretch: 0,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  navigation: {
    nextEl: ".forward",
    prevEl: ".backward",
  },
});

// Create lighting bars
function createLightingBars() {
  const musicLighting = document.querySelector('.music-lighting');
  for (let i = 0; i < 22; i++) { // Create 22 bars
    const bar = document.createElement('div');
    bar.classList.add('light-bar');
    musicLighting.appendChild(bar);
  }
}

// Lighting bar animation
let speed = 250;
let colorIndex = 0;
const colors = ['#ff00ff', '#00ffff', '#ff69b4', '#ff4500', '#1e90ff', '#dda0dd'];

function animateLightingBars() {
  const lightBars = document.querySelectorAll('.light-bar');
  lightBars.forEach((bar) => {
    // Randomize height
    const randomHeight = Math.random() * 50 + 10; // Random height between 10px and 60px
    bar.style.height = `${randomHeight}px`;

    // Dynamically change color
    bar.style.background = colors[colorIndex];
  });

  // Change the color index to loop through the color array
  colorIndex = (colorIndex + 1) % colors.length;

  // Adjust speed for animation (faster and slower)
  if (speed > 90) {
    speed -= 10; // Gradually make it faster
  } else if (speed < 400) {
    speed += 30; // Gradually make it slower
  }

  // Call the animation function with the updated speed
  setTimeout(animateLightingBars, speed);
}

// Start the lighting bar animation
createLightingBars();
animateLightingBars();

// Stop animation when the song is paused or ended
song.addEventListener('pause', () => {
  clearInterval(animationInterval);
  speed = 300;
  colorIndex = 0;
});

song.addEventListener('ended', () => {
  clearInterval(animationInterval);
  speed = 300;
  colorIndex = 0;
});

// Restart lighting animation when the song is played
song.addEventListener('play', () => {
  animateLightingBars();
});


// Wallpaper selection functionality (reusing existing variables)
let isPopupOpen = false; // New variable to track popup state

wallpaperBtn.addEventListener('click', () => {
  if (!isPopupOpen) {
    wallpaperToggle.classList.add('active');
    isPopupOpen = true;
  } else {
    wallpaperToggle.classList.remove('active');
    isPopupOpen = false;
  }
});

wallpaperImgs.forEach(img => {
  img.addEventListener('click', () => {
    document.body.style.backgroundImage = `url(${img.src})`;
    wallpaperToggle.classList.remove('active'); // Close popup after selection
    isPopupOpen = false;
  });
});
