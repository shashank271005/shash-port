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
});