document.addEventListener('DOMContentLoaded', function() {
    // Toggle the mobile menu
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            const navbarLinks = document.getElementById('navbarNav');
            if (navbarLinks.classList.contains('show')) {
                navbarLinks.classList.remove('show');
            } else {
                navbarLinks.classList.add('show');
            }
        });
    }

    // Add event listener to each nav link to close the menu when clicked
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
            
            // Smooth scroll to the section
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                event.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Shrink navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '2px 10px';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '5px 10px';
            navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
        }
    });

    // Progress bar on scroll
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / docHeight) * 100;
        document.getElementById('progress-bar').style.width = `${scrolled}%`;
    });

    // Animate sections on scroll with staggered effect
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay based on the index for a staggered effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Add a subtle hover effect to list items
    const listItems = document.querySelectorAll('ul li');
    listItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transition = 'background-color 0.3s ease';
            item.style.backgroundColor = '#f8f9fa';
            item.style.paddingLeft = '5px';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'transparent';
            item.style.paddingLeft = '0';
        });
    });
    
    // Add animation to profile image
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            profileImg.style.transform = 'scale(1.05) rotate(5deg)';
        });
        
        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});
