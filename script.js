document.addEventListener('DOMContentLoaded', (event) => {

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
            albumArtSrc: "https://phg7ih4ayg.ucarecd.net/340997ed-ea08-494c-9b27-7a8ac2676ea8/BeautifulThingsEnglish202420240404023143500x500.jpg"
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
    ];

    let currentTrackIndex = 0;
    let isShuffling = false;

    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause-button');
    const playPauseIcon = document.getElementById('play-pause-icon');
    const progressBar = document.getElementById('progress-bar');
    const shuffleButton = document.getElementById('shuffle-button');
    const loopButton = document.getElementById('loop-button');
    const nextButton = document.getElementById('next-button');
    const previousButton = document.getElementById('previous-button');
    const playerContainer = document.querySelector('.music-player-container');
    const toggleButton = document.getElementById('player-toggle-button');

    const video = document.getElementById('background-video');
    if (video) {
        video.play().catch(error => {
            console.log('Autoplay failed:', error);
        });
    }

    const menuButton = document.querySelector('.menu-button');
    const menuPanel = document.getElementById('main-navigation');
    const menuItems = menuPanel ? menuPanel.querySelectorAll('.menu-item') : [];

    const closeMenu = () => {
        if (menuPanel) {
            menuPanel.classList.remove('is-open');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    };

    if (menuButton && menuPanel) {
        menuButton.addEventListener('click', () => {
            menuPanel.classList.toggle('is-open');
            const isExpanded = menuButton.getAttribute('aria-expanded') === 'true' || false;
            menuButton.setAttribute('aria-expanded', !isExpanded);
        });

        document.addEventListener('click', (e) => {
            if (!menuButton.contains(e.target) && !menuPanel.contains(e.target) && menuPanel.classList.contains('is-open')) {
                closeMenu();
            }
        });

        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (item.getAttribute('href').startsWith('#')) {
                    closeMenu();
                }
            });
        });
    }

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
            progressBar.max = audioPlayer.duration;
        }
    };

    audioPlayer.ontimeupdate = () => {
        if (!isNaN(audioPlayer.duration)) {
            progressBar.value = audioPlayer.currentTime;
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





const initTechStackAnimation = () => {
    const section = document.getElementById('tech-stack-section');
    const wrapper = document.getElementById('tech-stack-wrapper');
    const items = wrapper ? Array.from(wrapper.querySelectorAll('.stack-item[style*="--i"]')) : [];
    
    if (!section || items.length === 0) return;

    const TOTAL_ITEMS = items.length;
    const RADIUS = 300;
    
 
    const TOTAL_DURATION = 7000; 
    
    
    const DURATION_P1 = 2500; 
    const DURATION_P2 = 2000; 
    const DURATION_P3 = 2500; 
    
    const START_OFFSET = 300; 
    const ITEM_SPACING = 120;

    const itemPositions = items.map((item) => {
        const index = parseInt(item.style.getPropertyValue('--i')) - 1; 
        const centerIndex = index - (TOTAL_ITEMS - 1) / 2;

        const angle = (centerIndex * 2 * Math.PI) / TOTAL_ITEMS;
        
   
        const xCircle = RADIUS * Math.sin(angle);
        
 
        const yCircle = RADIUS * Math.cos(angle) * -1;
        
        const rotateCircle = angle * 180 / Math.PI;

        
        const xStart = centerIndex * ITEM_SPACING; 
        const yStart = 0; 
        const rotateStart = 0;
        
        return { item, xStart, yStart, rotateStart, xCircle, yCircle, rotateCircle };
    });

    const updateAnimation = () => {
        const sectionTop = section.offsetTop;
        let scrollYRelative = window.scrollY - (sectionTop + START_OFFSET);
        
        let currentX, currentY, currentRotate;
        let wrapperRotation = 0;
        
        
        if (scrollYRelative <= DURATION_P1) {
            const phaseProgress = Math.min(1, scrollYRelative / DURATION_P1);
            
            
            const easedProgress = 0.5 - Math.cos(phaseProgress * Math.PI) / 2; 

            itemPositions.forEach(pos => {
               
                currentX = pos.xStart + (pos.xCircle - pos.xStart) * easedProgress;
                currentY = pos.yStart + (pos.yCircle - pos.yStart) * easedProgress;
                currentRotate = pos.rotateStart + (pos.rotateCircle - pos.rotateStart) * easedProgress;
                
                pos.item.style.transform = `translate(-50%, -50%) translateX(${currentX}px) translateY(${currentY}px) rotate(${currentRotate}deg)`;
            });
            wrapperRotation = 0; 
        } 
       
        else if (scrollYRelative <= DURATION_P1 + DURATION_P2) {
            const phaseScroll = scrollYRelative - DURATION_P1;
            const phaseProgress = phaseScroll / DURATION_P2;

            wrapperRotation = phaseProgress * 360; 
            
            itemPositions.forEach(pos => {
              
                pos.item.style.transform = `translate(-50%, -50%) translateX(${pos.xCircle}px) translateY(${pos.yCircle}px) rotate(${pos.rotateCircle}deg)`;
            });
        }
        
        
        else { 
            const phaseScroll = scrollYRelative - (DURATION_P1 + DURATION_P2);
            const phaseProgress = phaseScroll / DURATION_P3;
            
            wrapperRotation = 360 + (phaseProgress * 180); 
            
            itemPositions.forEach(pos => {
               
                pos.item.style.transform = `translate(-50%, -50%) translateX(${pos.xCircle}px) translateY(${pos.yCircle}px) rotate(${pos.rotateCircle}deg)`;
            });

            if (scrollYRelative >= TOTAL_DURATION) {
                 wrapperRotation = 360 + 180; 
            }
        }
        
        wrapper.style.transform = `rotateZ(${wrapperRotation}deg)`;
    };

    updateAnimation();
    window.addEventListener('scroll', updateAnimation);
};

initTechStackAnimation();










document.addEventListener('DOMContentLoaded', () => {

    const designCards = document.querySelectorAll('.design-card');

  
    const animateDesignApproach = (card, isEntering) => {
        const textGroup = card.querySelector('[data-animation="design"]');
        if (!textGroup) return;

        textGroup.style.opacity = isEntering ? 1 : 0;

        const lines = textGroup.querySelectorAll('.animated-line');
        lines.forEach((line, index) => {
            if (isEntering) {
                
                setTimeout(() => {
                    line.style.transform = 'translateX(0)';
                    line.style.opacity = 1;
                }, index * 100); 
            } else {
                
                setTimeout(() => {
                    line.style.transform = 'translateX(-100%)';
                    line.style.opacity = 0;
                }, (lines.length - 1 - index) * 50);
            }
        });
    };

    
    const animateExpertise = (card, isEntering) => {
        const textGroup = card.querySelector('[data-animation="expertise"]');
        const globeImg = card.querySelector('.globe-img');
        const labels = card.querySelectorAll('.expertise-label');

        if (!textGroup) return;

        
        if (globeImg) {
            globeImg.style.transform = isEntering ? 'rotate(360deg)' : 'rotate(0deg)';
        }
        
        
        labels.forEach((label, index) => {
            const delay = index * 150; 
            
            if (isEntering) {
                setTimeout(() => {
                    label.style.opacity = 1;
                    label.style.transform = 'translateY(0)';
                }, delay);
            } else {
                setTimeout(() => {
                    label.style.opacity = 0;
                    label.style.transform = 'translateY(10px)'; 
                }, delay);
            }
        });
    };
    
    
    designCards.forEach(card => {
        
        
        card.addEventListener('mouseenter', () => {
            
            const titleElement = card.querySelector('.card-title');
            if (titleElement) {
                titleElement.classList.add('is-hovered');
            }

            if (card.classList.contains('left-card')) {
                animateDesignApproach(card, true);
            } else if (card.classList.contains('right-card')) {
                animateExpertise(card, true);
            }
        });

       
        card.addEventListener('mouseleave', () => {
            
            const titleElement = card.querySelector('.card-title');
            if (titleElement) {
                titleElement.classList.remove('is-hovered');
            }

            if (card.classList.contains('left-card')) {
                animateDesignApproach(card, false);
            } else if (card.classList.contains('right-card')) {
                animateExpertise(card, false);
            }
        });
    });
});


const currentYearSpan = document.getElementById('current-year');
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

});
