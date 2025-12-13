document.addEventListener('DOMContentLoaded', (event) => {
    // --- 1. PLAYLIST DATA ---
    const playlist = [
        {
            title: "Comethru",
            artist: "Jeremy Zucker",
            audioSrc: "audio/track1.mp3",
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/6638e53c-d780-4c0d-ab33-37a33a86ec78/comethrualnumcover.jpg"
        },
        {
            title: "Ordinary",
            artist: "Alex Warren",
            audioSrc: "audio/track2.mp3",
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/cc49ae98-7fe0-4577-aa52-182f42de1c76/ab67616d00001e0242fe69c0e7e5c92f01ece8ce.jpeg" 
        },
        {
            title: "I Warned Myself",
            artist: "Charlie Puth",
            audioSrc: "audio/track3.mp3", 
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/bea1ea1f-fd03-4c22-b5cf-13c647b584b4/1200x630bf60.jpg" 
        },
        {
            title: "I Like Me Better",
            artist: "Lauv",
            audioSrc: "audio/track4.mp3", 
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/ee615889-0d08-497b-a387-35a7af980c51/ILikeMeBetterEnglish201720191202143751500x500.jpg" 
        },
        {
            title: "Monster",
            artist: "Justin Bieber & Shawn Mendes",
            audioSrc: "audio/track5.mp3", 
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/d0f97bfc-35c7-4956-aa42-ffe42aabe1dd/Shawn_Mendes_and_Justin_Bieber__Monster.png" 
        },
        {
            title: "Espresso",
            artist: "Sabrina Carpenter",
            audioSrc: "audio/track6.mp3", 
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/ecde8135-1763-407b-9d0b-33f00bb3b63a/EspressoEnglish202420240412064803500x500.jpg" 
        },
        {
            title: "Beautiful Things",
            artist: "Benson Boone",
            audioSrc: "audio/track7.mp3", 
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/340997ed-ea08-494c-9b27-7a8aa2676ea8/BeautifulThingsEnglish202420240404023143500x500.jpg" 
        },
        {
            title: "Living Hell",
            artist: "Bella Poarch",
            audioSrc: "audio/track8.mp3", 
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/ef31e45c-3fb0-4278-acc1-1f7333e5659c/DollsEPEnglish202220220809070445500x500.jpg" 
        },
        {
            title: "Worth It",
            artist: "Fifth Harmony ft. Kid Ink",
            audioSrc: "audio/track9.mp3", 
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/48a1b16a-0f36-43e1-8123-6fe9dfb1a4f9/WorthItEnglish2015500x500.jpg" 
        },
        {
            title: "7 rings",
            artist: "Ariana Grande",
            audioSrc: "audio/track10.mp3", 
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/36c43b18-5107-428c-90b5-787e135b9a78/thankunextEnglish201920231215000717500x500.jpg" 
        },
        {
            title: "Hey Mama",
            artist: "David Guetta",
            audioSrc: "audio/track11.mp3", 
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/91c03e11-ecb6-4497-828f-4eb1361918e4/0e5ce9fa46148e0464e3376d2d060f11.jpg" 
        }
        // Add more tracks here following the same object structure
    ];

    let currentTrackIndex = 0;
    let isShuffling = false;

    // --- 2. VIDEO AUTOPLAY ---
    const video = document.getElementById('background-video');
    if (video) {
        video.play().catch(error => {
            console.log('Autoplay failed:', error);
        });
    }

    // --- 3. MENU TOGGLE LOGIC ---
    const menuButton = document.querySelector('.menu-button');
    const menuPanel = document.getElementById('main-navigation');

    if (menuButton && menuPanel) {
        menuButton.addEventListener('click', () => {
            menuPanel.classList.toggle('is-open');
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !isExpanded);
        });
        
        document.addEventListener('click', (e) => {
            if (!menuButton.contains(e.target) && !menuPanel.contains(e.target) && menuPanel.classList.contains('is-open')) {
                menuPanel.classList.remove('is-open');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- 4. POSTER SCROLL PARALLAX EFFECT ---
    const scrollContainer = document.getElementById('poster-scroll-container');
    
    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', () => {
            const cards = scrollContainer.querySelectorAll('.poster-card');
            cards.forEach(card => {
                const cardRect = card.getBoundingClientRect();
                const containerCenter = scrollContainer.offsetWidth / 2;
                const cardCenter = cardRect.left + cardRect.width / 2;
                const distance = cardCenter - containerCenter;
                const movementFactor = 0.05; 
                const translateX = distance * movementFactor;

                const image = card.querySelector('.poster-img');
                
                if (image) {
                    image.style.transform = `translateX(${-translateX}px) scale(1.05)`; 
                }
            });
        });
    }

    // --- 5. MUSIC PLAYER CONTROLS & LOGIC ---
    const playerContainer = document.querySelector('.music-player-container');
    const toggleButton = document.getElementById('player-toggle-button');
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause-button');
    const playPauseIcon = document.getElementById('play-pause-icon');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeSpan = document.getElementById('current-time');
    const totalDurationSpan = document.getElementById('total-duration');
    const shuffleButton = document.getElementById('shuffle-button');
    const loopButton = document.getElementById('loop-button');
    const nextButton = document.getElementById('next-button');
    const previousButton = document.getElementById('previous-button');
    

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };


    const loadTrack = (index) => {
        const track = playlist[index];
        
        document.getElementById('track-title').textContent = track.title;
        document.getElementById('track-artist').textContent = track.artist;
        document.querySelector('.album-art').src = track.albumArtSrc;
        
        audioPlayer.src = track.audioSrc;
        audioPlayer.load(); 
        
        playPauseIcon.src = 'img/play.svg'; 
    };

    const playNextTrack = () => {
        if (isShuffling) {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * playlist.length);
            } while (newIndex === currentTrackIndex);
            currentTrackIndex = newIndex;
        } else {
            currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        }
        loadTrack(currentTrackIndex);
        audioPlayer.play();
        playPauseIcon.src = 'img/pause.svg';
    };

    const playPreviousTrack = () => {
        if (isShuffling) {
            playNextTrack(); 
        } else {

            if (audioPlayer.currentTime > 3) {
                audioPlayer.currentTime = 0;
            } else {
                currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
                loadTrack(currentTrackIndex);
            }
        }
        audioPlayer.play();
        playPauseIcon.src = 'img/pause.svg';
    };

    // --- Event Listeners ---

    loadTrack(currentTrackIndex); 
    

    if (toggleButton && playerContainer) {
        toggleButton.addEventListener('click', () => {
            const isOpen = playerContainer.classList.toggle('is-open');
            toggleButton.setAttribute('aria-expanded', isOpen);
        });
    }

    if (audioPlayer && playPauseButton) {
        playPauseButton.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseIcon.src = 'img/pause.svg';
            } else {
                audioPlayer.pause();
                playPauseIcon.src = 'img/play.svg';
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', playNextTrack);
    }

    if (previousButton) {
        previousButton.addEventListener('click', playPreviousTrack);
    }
    
    if (shuffleButton) {
        shuffleButton.addEventListener('click', () => {
            isShuffling = !isShuffling;
            shuffleButton.classList.toggle('active', isShuffling);
            console.log(`Shuffle Toggled: ${isShuffling}`);
        });
    }


    if (loopButton) {
        loopButton.addEventListener('click', () => {
            audioPlayer.loop = !audioPlayer.loop;
            loopButton.classList.toggle('active', audioPlayer.loop);
        });
    }

    audioPlayer.onloadedmetadata = () => {
        if (!isNaN(audioPlayer.duration)) {
            totalDurationSpan.textContent = formatTime(audioPlayer.duration);
            progressBar.max = audioPlayer.duration;
        }
    };


    audioPlayer.ontimeupdate = () => {
        if (!isNaN(audioPlayer.duration)) {
            progressBar.value = audioPlayer.currentTime;
            currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
        }
    };

    progressBar.addEventListener('input', () => {
        audioPlayer.currentTime = progressBar.value;
    });

    audioPlayer.addEventListener('ended', () => {
        if (!audioPlayer.loop) {
            playNextTrack();
        }
    });
});