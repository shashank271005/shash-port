document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('background-video');

    if (video) {
        video.play().catch(error => {
            console.log('Autoplay failed:', error);
        });
    }

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
});