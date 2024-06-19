document.addEventListener('DOMContentLoaded', function() {
    // Toggle the mobile menu
    function toggleMenu() {
        const navbarLinks = document.getElementById('navbarNav');
        if (navbarLinks.classList.contains('show')) {
            navbarLinks.classList.remove('show');
        } else {
            navbarLinks.classList.add('show');
        }
    }

    // Add event listener to each nav link to close the menu when clicked
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.getElementById('navbarNav');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });

    // Progress bar on scroll
    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / docHeight) * 100;
        document.getElementById('progress-bar').style.width = `${scrolled}%`;
    });

    // Animate sections on scroll
    const sections = document.querySelectorAll('.section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    sections.forEach(section => {
        observer.observe(section);
    });
});
