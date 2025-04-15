document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles
    initParticles();
    
    // Initialize typing effect
    initTypingEffect();
    
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

    // Add event listener to each nav link for smooth scrolling
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
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
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Shrink navbar on scroll with glassmorphism effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '5px 20px';
            navbar.style.background = 'rgba(10, 25, 41, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.padding = '10px 20px';
            navbar.style.background = 'rgba(10, 25, 41, 0.8)';
            navbar.style.backdropFilter = 'blur(5px)';
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
                    
                    // Add section-content class to all direct children for z-index
                    entry.target.querySelectorAll(':scope > *:not(::before)').forEach(child => {
                        child.classList.add('section-content');
                    });
                    
                }, index * 150);
                
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
    
    // Add hover effects to skill items
    const skillItems = document.querySelectorAll('.skills-section div');
    skillItems.forEach(item => {
        const randomColor = getRandomGradient();
        item.addEventListener('mouseenter', () => {
            item.style.boxShadow = `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px ${randomColor.start}33`;
            item.style.borderLeft = `3px solid ${randomColor.start}`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
            item.style.borderLeft = '3px solid transparent';
        });
    });
    
    // Add animation to profile image with AI-inspired effects
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
            profileImg.style.transform = 'scale(1.05) rotate(5deg)';
            profileImg.style.boxShadow = '0 8px 25px rgba(65, 186, 239, 0.3), 0 0 15px rgba(111, 66, 193, 0.3)';
        });
        
        profileImg.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'scale(1) rotate(0deg)';
            profileImg.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
        });
    }
    
    // Add tech tags to skills
    addTechTags();
    
    // Format experience and education sections
    formatExperienceEducation();
});

// Initialize particle effect in header
function initParticles() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    const canvas = document.createElement('canvas');
    canvas.classList.add('particles-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.5';
    
    header.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    function resizeCanvas() {
        canvas.width = header.offsetWidth;
        canvas.height = header.offsetHeight;
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = Math.random() > 0.5 ? '#6F42C1' : '#41BAEF';
            this.alpha = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            else if (this.x < 0) this.x = canvas.width;
            
            if (this.y > canvas.height) this.y = 0;
            else if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color + Math.floor(this.alpha * 255).toString(16).padStart(2, '0');
            ctx.fill();
        }
    }
    
    function init() {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect particles with lines if they're close
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
}

// Initialize typing effect for the header
function initTypingEffect() {
    const headerTitle = document.querySelector('.header h1');
    if (!headerTitle) return;
    
    const originalText = headerTitle.textContent;
    headerTitle.textContent = '';
    
    const typingSpeed = 50; // ms per character
    let i = 0;
    
    function type() {
        if (i < originalText.length) {
            headerTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, typingSpeed);
        } else {
            // Add cursor blinking after typing is complete
            headerTitle.innerHTML += '<span class="cursor">|</span>';
            setInterval(() => {
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
                }
            }, 500);
        }
    }
    
    // Start typing with a small delay
    setTimeout(type, 500);
}

// Get random gradient colors
function getRandomGradient() {
    const colors = [
        { start: '#6F42C1', end: '#8A63D2' },
        { start: '#41BAEF', end: '#62D0FF' },
        { start: '#7E57C2', end: '#9575CD' },
        { start: '#3498DB', end: '#5DADE2' },
        { start: '#5E35B1', end: '#7E57C2' }
    ];
    
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add tech tags to skills
function addTechTags() {
    // AI related technologies need special highlighting
    const aiTechnologies = [
        'Machine Learning', 'Deep Learning', 'Computer Vision', 
        'Natural Language Processing', 'Neural Networks', 'TensorFlow',
        'PyTorch', 'Keras', 'YOLO', 'OpenCV', 'NLP', 'HuggingFace',
        'LangChain', 'Generative AI', 'Large Language Models'
    ];
    
    // Get all skill items
    const skillItems = document.querySelectorAll('.skills-section ul li');
    
    skillItems.forEach(item => {
        const skillText = item.textContent.trim();
        
        // Check if this is an AI-related skill
        if (aiTechnologies.some(tech => skillText.includes(tech))) {
            // Create a badge for AI technologies
            const badgeSpan = document.createElement('span');
            badgeSpan.classList.add('ai-badge');
            badgeSpan.innerHTML = '<i class="fas fa-robot"></i> AI';
            item.appendChild(badgeSpan);
        }
    });
}

// Format experience and education sections
function formatExperienceEducation() {
    // Format experience items
    const experienceItems = document.querySelectorAll('#experience > h3');
    experienceItems.forEach(item => {
        const company = item.textContent;
        const dateElem = item.nextElementSibling;
        const position = dateElem.querySelector('strong').textContent;
        const dateText = dateElem.querySelector('em').textContent.replace(/[()]/g, '');
        const list = dateElem.nextElementSibling;
        
        // Create new container div
        const container = document.createElement('div');
        container.classList.add('experience-item');
        
        // Date badge
        const dateBadge = document.createElement('div');
        dateBadge.classList.add('experience-date');
        dateBadge.textContent = dateText;
        
        // Title
        const title = document.createElement('div');
        title.classList.add('experience-title');
        title.textContent = position;
        
        // Company
        const companyElem = document.createElement('div');
        companyElem.classList.add('experience-company');
        companyElem.textContent = company;
        
        // Append elements
        container.appendChild(dateBadge);
        container.appendChild(title);
        container.appendChild(companyElem);
        container.appendChild(list.cloneNode(true));
        
        // Replace old structure with new container
        const parent = item.parentNode;
        parent.insertBefore(container, item);
        parent.removeChild(item);
        parent.removeChild(dateElem);
        parent.removeChild(list);
    });
    
    // Format education items
    const educationItems = document.querySelectorAll('#education > h3');
    educationItems.forEach(item => {
        const school = item.textContent;
        const dateElem = item.nextElementSibling;
        const degree = dateElem.querySelector('strong').textContent;
        const dateText = dateElem.querySelector('em').textContent.replace(/[()]/g, '');
        const list = dateElem.nextElementSibling;
        
        // Create new container div
        const container = document.createElement('div');
        container.classList.add('education-item');
        
        // Date badge
        const dateBadge = document.createElement('div');
        dateBadge.classList.add('education-date');
        dateBadge.textContent = dateText;
        
        // Title
        const title = document.createElement('div');
        title.classList.add('education-title');
        title.textContent = degree;
        
        // School
        const schoolElem = document.createElement('div');
        schoolElem.classList.add('education-school');
        schoolElem.textContent = school;
        
        // Append elements
        container.appendChild(dateBadge);
        container.appendChild(title);
        container.appendChild(schoolElem);
        container.appendChild(list.cloneNode(true));
        
        // Replace old structure with new container
        const parent = item.parentNode;
        parent.insertBefore(container, item);
        parent.removeChild(item);
        parent.removeChild(dateElem);
        parent.removeChild(list);
    });
}
