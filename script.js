// Helper: mute all other media except the one being played
function muteAllExcept(currentMedia) {
    document.querySelectorAll('video').forEach(video => {
        if (video !== currentMedia) {
            video.muted = true;
            const btn = video.closest('.feature-card-item')?.querySelector('.feature-card-mute-btn');
            if (btn && btn.querySelector('.mute-icon')) {
                btn.querySelector('.mute-icon').textContent = '🔇';
            }
        }
    });
    // Also handle main custom video mute icon
    const mainCustomVideo = document.getElementById('mainCustomVideo');
    const muteIcon = document.getElementById('muteIcon');
    if (mainCustomVideo && mainCustomVideo !== currentMedia) {
        mainCustomVideo.muted = true;
        if (muteIcon) muteIcon.textContent = '🔇';
    }
    // Do NOT pause audio elements (music player) automatically anymore
}

// Mute/unmute logic for feature card video mute button
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.feature-card-mute-btn').forEach(function(btn) {
        const card = btn.closest('.feature-card-item');
        const video = card ? card.querySelector('video') : null;
        if (!video) return;
        btn.addEventListener('click', function() {
            muteAllExcept(video);
            if (video.muted) {
                video.muted = false;
                btn.querySelector('.mute-icon').textContent = '🔊';
            } else {
                video.muted = true;
                btn.querySelector('.mute-icon').textContent = '🔇';
            }
        });
        video.addEventListener('play', function() {
            muteAllExcept(video);
        });
    });
});
// Feature Tabs Interactivity
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.feature-tab');
    const desc = document.querySelector('.feature-tab-description p');
    const tabDetails = [
        {
            title: 'Townhall Mentor',
            desc: 'At Townhall’25 by Big Data Centre of Excellence, I transitioned from learner to mentor, co-leading a UI/UX design session and guiding juniors through hands-on, user-first design thinking.'
        },
        {
            title: 'Recruitment Panelist',
            desc: 'At ENIAC’25, the recruitment drive of Big Data Centre of Excellence, I actively participated in the personal interview process, gaining first-hand experience in technical evaluation, communication, and structured recruitment workflows.'
        },
        {
            title: 'RushHour 2.0 CP Event',
            desc: 'Organized RushHour 2.0 CP event with 400+ participants, developing real-time tracking and automated elimination pipelines to create an interview-intensive competitive environment.'
        }
    ];

    const cards = document.querySelectorAll('.feature-tab-card');
    const scrollAreas = document.querySelectorAll('.feature-card-scroll');
    let currentTab = 0;

    function updateTabs(activeIdx) {
        tabs.forEach((tab, idx) => {
            if (idx === activeIdx) {
                tab.classList.add('active');
                tab.style.filter = 'none';
                tab.style.opacity = '1';
            } else {
                tab.classList.remove('active');
                tab.style.filter = 'blur(2.5px)';
                tab.style.opacity = '0.7';
            }
        });
        desc.textContent = tabDetails[activeIdx].desc;
        cards.forEach((card, idx) => {
            if (idx === activeIdx) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
        currentTab = activeIdx;
    }


    tabs.forEach((tab, idx) => {
        tab.addEventListener('click', function () {
            updateTabs(idx);
        });
        tab.addEventListener('mouseenter', function () {
            if (!tab.classList.contains('active')) {
                tab.style.filter = 'blur(0.5px)';
                tab.style.opacity = '0.95';
            }
        });
        tab.addEventListener('mouseleave', function () {
            if (!tab.classList.contains('active')) {
                tab.style.filter = 'blur(2.5px)';
                tab.style.opacity = '0.7';
            }
        });
    });

    // Removed scroll-based tab switching. Tabs now only switch on click.

    // Ensure initial state is correct
    updateTabs(0);
});
// Custom mute/unmute for main custom video
document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('mainCustomVideo');
    const btn = document.getElementById('muteToggleBtn');
    const icon = document.getElementById('muteIcon');
    if (video && btn && icon) {
        btn.addEventListener('click', function () {
            video.muted = !video.muted;
            icon.textContent = video.muted ? '🔇' : '🔊';
        });
        // Set initial icon state
        icon.textContent = video.muted ? '🔇' : '🔊';
    }
});
document.addEventListener('contextmenu', event => event.preventDefault()); 

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
            albumArtSrc: "https://hdbc7y0gj1.ucarecd.net/eebc269f-3937-496e-95d2-6d21c4299792/beautifulthingalbumcover.jpeg"
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
            muteAllExcept(audioPlayer);
            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseIcon.src = 'img/pause.svg';
            } else {
                audioPlayer.pause();
                playPauseIcon.src = 'img/play.svg';
            }
        });
        audioPlayer.addEventListener('play', function() {
            muteAllExcept(audioPlayer);
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

    const designCards = document.querySelectorAll('.design-card');

    const rightCard = document.querySelector('.design-card.right-card');
    const globeImg = rightCard ? rightCard.querySelector('.globe-img') : null;
    const labels = rightCard ? rightCard.querySelectorAll('.expertise-label') : [];
    
    if (globeImg) {
        globeImg.style.transition = 'transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }

    labels.forEach(label => {
        label.style.transition = 'opacity 0.4s ease-out, transform 0.6s ease-out';
        label.style.opacity = 0; 
        label.style.transform = 'translateY(10px)'; 
    });

    const animateDesignApproach = (card, isEntering) => {
        const textGroup = card.querySelector('[data-animation="design"]');
        if (!textGroup) return;

        textGroup.style.opacity = isEntering ? 1 : 0;

        const lines = textGroup.querySelectorAll('.animated-line');
        lines.forEach((line, index) => {
            const delay = isEntering ? index * 100 : (lines.length - 1 - index) * 50;
            if (isEntering) {
                setTimeout(() => {
                    line.style.transform = 'translateX(0)';
                    line.style.opacity = 1;
                }, delay); 
            } else {
                setTimeout(() => {
                    line.style.transform = 'translateX(-100%)';
                    line.style.opacity = 0;
                }, delay); 
            }
        });
    };
    
    const animateExpertise = (card, isEntering) => {
        const globeImg = card.querySelector('.globe-img');
        const labels = card.querySelectorAll('.expertise-label');
        const textGroup = card.querySelector('[data-animation="expertise"]');

        if (textGroup) {
            textGroup.style.opacity = isEntering ? 1 : 0;
        }

        if (globeImg) {
            globeImg.style.transform = isEntering ? 'rotate(360deg)' : 'rotate(0deg)';
        }
        
        labels.forEach((label, index) => {
            const delay = isEntering ? index * 150 : (labels.length - 1 - index) * 50; 
            
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
        
        const titleElement = card.querySelector('.card-title');

        card.addEventListener('mouseenter', () => {
            
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

    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    document.addEventListener('DOMContentLoaded', function () {
    /* ---------------- DRAGGABLE IMAGE STACK (RE-STACKING LOGIC) ---------------- */
    const imageStack = document.querySelector('.RushHour-image');
    
    if (imageStack) {
        let isDragging = false;
        let activeCard = null;
        let startX, startY, posX, posY;

        function dragStart(e) {
            // Only allow dragging the top-most card (the last child in the DOM)
            const topCard = imageStack.querySelector('.image-card:last-child');
            if (e.target.closest('.image-card') !== topCard) return;

            activeCard = topCard;
            isDragging = true;
            activeCard.classList.add('is-dragging');
            activeCard.style.transition = 'none'; // Disable transition during drag for smoothness

            startX = e.pageX || e.touches[0].pageX;
            startY = e.pageY || e.touches[0].pageY;
        }

        function dragMove(e) {
            if (!isDragging || !activeCard) return;
            e.preventDefault(); // Prevent scrolling while dragging on mobile

            const currentX = e.pageX || e.touches[0].pageX;
            const currentY = e.pageY || e.touches[0].pageY;
            
            posX = currentX - startX;
            posY = currentY - startY;

            // Apply transformation based on mouse movement
            activeCard.style.transform = `translate(${posX}px, ${posY}px) rotate(${posX * 0.05}deg)`;
        }

        function dragEnd(e) {
            if (!isDragging || !activeCard) return;
            isDragging = false;
            activeCard.classList.remove('is-dragging');
            
            // Re-enable transition for the snap-back or re-stack movement
            activeCard.style.transition = 'transform 0.4s ease-out';
            
            const dragThreshold = activeCard.offsetWidth * 0.5; 

            // If dragged far enough, move the card to the bottom of the stack (prepend in DOM)
            if (Math.abs(posX) > dragThreshold) {
                imageStack.prepend(activeCard);
            }

            // Reset the inline transform style to let CSS nth-child rotations take over
            activeCard.style.transform = '';
            
            activeCard = null; 
        }

        // Desktop Events
        imageStack.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
        
        // Touch/Mobile Events
        imageStack.addEventListener('touchstart', dragStart, { passive: true });
        document.addEventListener('touchmove', dragMove, { passive: false });
        document.addEventListener('touchend', dragEnd);
    }
});

});