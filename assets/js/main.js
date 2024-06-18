function toggleMenu() {
    const navbarLinks = document.getElementById('navbar-links');
    if (navbarLinks.style.display === 'block') {
        navbarLinks.style.display = 'none';
    } else {
        navbarLinks.style.display = 'block';
    }
}

window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / docHeight) * 100;
    document.getElementById('progress-bar').style.width = `${scrolled}%`;
});

document.addEventListener('DOMContentLoaded', function() {
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
