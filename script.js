document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll to typewriter message on CTA click
    const scrollBtn = document.getElementById('scrollBtn');
    if (scrollBtn) {
      scrollBtn.addEventListener('click', () => {
        document.getElementById('messageSection').scrollIntoView({ behavior: 'smooth' });
      });
    }
  
    // Initialize Typed.js for dynamic typewriter text
    const typedElement = document.querySelector('[data-typed-text]');
    if (typedElement) {
      new Typed('[data-typed-text]', {
        strings: [
          "If I ever wished for someone like you, I was simply wishing for you.",
          "No words, no code, can fully capture how special you are—but I'll try."
        ],
        typeSpeed: 50,
        backSpeed: 25,
        loop: false,
        showCursor: true,
        cursorChar: "|"
      });
    }
  
    // Initialize AOS animations
    if (window.AOS) {
      AOS.init({ duration: 1000 });
    }
  
    // MUSIC PLAYLIST FUNCTIONALITY
    let playlist = [
      "Blaz_vebhosvo(128k).m4a",
      "Chord_Overstreet_-_Hold_On__Lyric_Video_(128k).m4a",
      "Ed_Sheeran_-_Perfect__Official_Music_Video_(128k).m4a",
      "Ed_Sheeran_-_Happier__Official_Music_Video_(128k).m4a"
    ];
    let currentTrackIndex = 0;
    let isPlaying = false;
    const bgMusic = new Audio();
    const playPauseBtn = document.getElementById('playPause');
    const nextSongBtn = document.getElementById('nextSong');
    const prevSongBtn = document.getElementById('prevSong');
    const uploadSongBtn = document.getElementById('uploadSongBtn');
    const uploadSongInput = document.getElementById('uploadSong');
    const songTitleSpan = document.getElementById('songTitle');
  
    function loadTrack(index) {
      bgMusic.src = playlist[index];
      bgMusic.load();
      songTitleSpan.textContent = `Track ${index + 1} of ${playlist.length}`;
    }
  
    function playTrack() {
      bgMusic.play().then(() => {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
      }).catch(error => console.log("Playback failed:", error));
    }
  
    function pauseTrack() {
      bgMusic.pause();
      playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      isPlaying = false;
    }
  
    playPauseBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseTrack();
      } else {
        playTrack();
      }
    });
  
    nextSongBtn.addEventListener('click', () => {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      loadTrack(currentTrackIndex);
      if (isPlaying) playTrack();
    });
  
    prevSongBtn.addEventListener('click', () => {
      currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
      loadTrack(currentTrackIndex);
      if (isPlaying) playTrack();
    });
  
    bgMusic.addEventListener('ended', () => {
      currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
      loadTrack(currentTrackIndex);
      playTrack();
    });
  
    // Upload a custom song and add it to the playlist
    uploadSongBtn.addEventListener('click', () => {
      uploadSongInput.click();
    });
    uploadSongInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const fileURL = URL.createObjectURL(file);
        playlist.push(fileURL);
        currentTrackIndex = playlist.length - 1;
        loadTrack(currentTrackIndex);
        if (!isPlaying) playTrack();
      }
    });
    loadTrack(currentTrackIndex);
  
    // PHOTO GALLERY SLIDER FUNCTIONALITY
    const slides = document.querySelectorAll('.gallery-slider .slide');
    const prevSlideBtn = document.querySelector('.gallery-slider .prev-slide');
    const nextSlideBtn = document.querySelector('.gallery-slider .next-slide');
    let currentSlide = 0;
    
    // Function to show the slide at 'index'
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }
    
    prevSlideBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
    
    nextSlideBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
    
    // Optionally, add auto-slide functionality (e.g., every 5 seconds)
    // setInterval(() => {
    //   currentSlide = (currentSlide + 1) % slides.length;
    //   showSlide(currentSlide);
    // }, 5000);
  });
  
