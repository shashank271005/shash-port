document.addEventListener('DOMContentLoaded', (event) => {
    // --- 1. PLAYLIST DATA ---
    const playlist = [
        {
            title: "In Demand",
            artist: "Manni Sandhu, Navean Sandhu",
            audioSrc: "audio/InDemand.mp3",
            albumArtSrc: "https://hdbc7y0gj1.ucarecd.net/14056887-fb2e-4aaa-9eda-e5c8497d411b/indemendalbumart.svg"
        },
        {
            title: "Track 2: Summer Vibes",
            artist: "The Developers",
            audioSrc: "audio/track2.mp3", // Ensure you have this file
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/a1e56573-aaf1-4348-989f-a6cf835d04f1/Untitleddesign.svg" // Placeholder image
        },
        {
            title: "Track 3: Code Flow",
            artist: "Creative Crew",
            audioSrc: "audio/track3.mp3", // Ensure you have this file
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/3e8f3bce-6211-4178-86c3-6f6e95274a83/c699c918cf736e8efeaa6c55b031ef6d.jpg" // Placeholder image
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
    
    // Helper function to format seconds to M:SS
    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${min}:${sec}`;
    };

    // Load track information and source into the player
    const loadTrack = (index) => {
        const track = playlist[index];
        
        document.getElementById('track-title').textContent = track.title;
        document.getElementById('track-artist').textContent = track.artist;
        document.querySelector('.album-art').src = track.albumArtSrc;
        
        audioPlayer.src = track.audioSrc;
        audioPlayer.load(); 
        
        playPauseIcon.src = 'img/play.svg'; // Reset icon to play
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
            playNextTrack(); // For shuffle, Previous can just be another random track
        } else {
            // If track is already playing for > 3 seconds, restart it. Otherwise, go to previous track.
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

    // Initialize player with the first track
    loadTrack(currentTrackIndex); 
    
    // Toggle player visibility
    if (toggleButton && playerContainer) {
        toggleButton.addEventListener('click', () => {
            const isOpen = playerContainer.classList.toggle('is-open');
            toggleButton.setAttribute('aria-expanded', isOpen);
        });
    }

    // Play/Pause functionality
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

    // Next/Previous/Shuffle
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

    // Loop functionality
    if (loopButton) {
        loopButton.addEventListener('click', () => {
            audioPlayer.loop = !audioPlayer.loop;
            loopButton.classList.toggle('active', audioPlayer.loop);
        });
    }

    // Metadata loading (to set duration)
    audioPlayer.onloadedmetadata = () => {
        if (!isNaN(audioPlayer.duration)) {
            totalDurationSpan.textContent = formatTime(audioPlayer.duration);
            progressBar.max = audioPlayer.duration;
        }
    };

    // Time update (to update progress bar and current time)
    audioPlayer.ontimeupdate = () => {
        if (!isNaN(audioPlayer.duration)) {
            progressBar.value = audioPlayer.currentTime;
            currentTimeSpan.textContent = formatTime(audioPlayer.currentTime);
        }
    };

    // User seeking (scrubbing)
    progressBar.addEventListener('input', () => {
        audioPlayer.currentTime = progressBar.value;
    });
    
    // Autoplay next track when current one ends
    audioPlayer.addEventListener('ended', () => {
        if (!audioPlayer.loop) {
            playNextTrack();
        }
    });
});