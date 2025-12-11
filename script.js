document.addEventListener('DOMContentLoaded', (event) => {
    const video = document.getElementById('background-video');

    if (video) {
        video.play().catch(error => {
            console.log('Autoplay failed:', error);
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const dropdownMenu = document.getElementById('dropdown-menu');
    
    if (menuToggle && dropdownMenu) {
        
        menuToggle.addEventListener('click', (event) => {
            dropdownMenu.classList.toggle('hidden');
            
            const isExpanded = dropdownMenu.classList.contains('hidden') ? 'false' : 'true';
            menuToggle.setAttribute('aria-expanded', isExpanded);
            
            event.stopPropagation();
        });

        document.addEventListener('click', (event) => {
            const isClickInsideMenu = dropdownMenu.contains(event.target);
            const isClickOnButton = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnButton && !dropdownMenu.classList.contains('hidden')) {
                dropdownMenu.classList.add('hidden');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
