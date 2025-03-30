document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Toggle mobile menu
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Handle dropdown menus on desktop
    if (window.innerWidth > 992) {
        navItems.forEach(item => {
            const dropdown = item.querySelector('.dropdown-menu');
            if (dropdown) {
                item.addEventListener('mouseenter', () => {
                    dropdown.style.opacity = '1';
                    dropdown.style.visibility = 'visible';
                    item.querySelector('.dropdown-arrow').style.transform = 'rotate(180deg)';
                });
                
                item.addEventListener('mouseleave', () => {
                    dropdown.style.opacity = '0';
                    dropdown.style.visibility = 'hidden';
                    item.querySelector('.dropdown-arrow').style.transform = 'rotate(0)';
                });
            }
        });
    }
    
    // Handle dropdown menus on mobile
    if (window.innerWidth <= 992) {
        navItems.forEach(item => {
            const link = item.querySelector('.nav-link');
            const dropdown = item.querySelector('.dropdown-menu');
            
            if (dropdown) {
                // Make parent link clickable to toggle dropdown
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const isOpen = dropdown.style.maxHeight === '500px';
                    
                    // Close all other dropdowns first
                    document.querySelectorAll('.dropdown-menu').forEach(d => {
                        if (d !== dropdown) {
                            d.style.maxHeight = '0';
                            d.previousElementSibling.querySelector('.dropdown-arrow').style.transform = 'rotate(0)';
                        }
                    });
                    
                    // Toggle current dropdown
                    if (isOpen) {
                        dropdown.style.maxHeight = '0';
                        link.querySelector('.dropdown-arrow').style.transform = 'rotate(0)';
                    } else {
                        dropdown.style.maxHeight = '500px';
                        link.querySelector('.dropdown-arrow').style.transform = 'rotate(180deg)';
                    }
                });
            }
        });
    }
    
    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 992) {
            // Close mobile menu when clicking outside
            if (!navMenu.contains(e.target) && e.target !== mobileToggle) {
                navMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            // Close dropdowns when clicking elsewhere
            if (!e.target.closest('.nav-item')) {
                document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                    dropdown.style.maxHeight = '0';
                    const arrow = dropdown.previousElementSibling.querySelector('.dropdown-arrow');
                    if (arrow) arrow.style.transform = 'rotate(0)';
                });
            }
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            // Reset mobile menu state
            navMenu.classList.remove('active');
            mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Reset dropdown styles
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.style.maxHeight = '';
                dropdown.style.opacity = '';
                dropdown.style.visibility = '';
            });
            
            document.querySelectorAll('.dropdown-arrow').forEach(arrow => {
                arrow.style.transform = '';
            });
        }
    });
});