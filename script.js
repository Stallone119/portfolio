/**
 * Prince Addae Portfolio - JavaScript
 * =====================================
 * A comprehensive portfolio website with interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initTypingAnimation();
    initThemeToggle();
    initNavbar();
    initMobileMenu();
    initSmoothScrolling();
    initScrollProgress();
    initBackToTop();
    initScrollAnimations();
    initProjectFilter();
    initFormValidation();
    initActiveNavHighlight();
    initProgressBars();
    initLazyLoading();
});

/**
 * Typing Animation
 * Cycles through different titles
 */
function initTypingAnimation() {
    const textElement = document.getElementById('typingText');
    if (!textElement) return;

    const titles = [
        'Full Stack Web Developer',
        'Machine Learning Enthusiast',
        'Researcher',
        'Educator',
        'Emerging Blockchain Engineer'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            textElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            textElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            // Pause at end
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/**
 * Dark/Light Mode Toggle
 */
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }
}

/**
 * Navbar Scroll Effect
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (!mobileToggle || !navMenu) return;

    mobileToggle.addEventListener('click', function() {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

/**
 * Smooth Scrolling for Navigation Links
 */
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
    const progressBar = document.getElementById('scrollProgress');
    if (!progressBar) return;

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Scroll Animations (Reveal on scroll)
 */
function initScrollAnimations() {
    // Add reveal class to sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('reveal');
    });

    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Project Filtering System
 */
function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterButtons.length || !projectCards.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || filter === category) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/**
 * Form Validation
 */
function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Reset errors
        clearErrors();

        // Validate fields
        let isValid = true;

        // Name validation
        const name = document.getElementById('name');
        if (name && name.value.trim() === '') {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (name && name.value.trim().length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }

        // Email validation
        const email = document.getElementById('email');
        if (email && email.value.trim() === '') {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (email && !isValidEmail(email.value)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }

        // Subject validation
        const subject = document.getElementById('subject');
        if (subject && subject.value.trim() === '') {
            showError('subjectError', 'Subject is required');
            isValid = false;
        }

        // Message validation
        const message = document.getElementById('message');
        if (message && message.value.trim() === '') {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (message && message.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }

        // Spam prevention - check honeypot field
        const website = form.querySelector('input[name="website"]');
        if (website && website.value !== '') {
            // It's a bot, silently fail
            console.log('Spam detected');
            return;
        }

        if (isValid) {
            // Simulate form submission
            showSuccessMessage();
            form.reset();
        }
    });

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(errorId, message) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        errorElements.forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
    }

    function showSuccessMessage() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully!';
        successDiv.style.cssText = `
            background: rgba(16, 185, 129, 0.15);
            border: 1px solid rgba(16, 185, 129, 0.3);
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 20px;
            color: #10B981;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        `;

        const formContainer = form.parentElement;
        formContainer.insertBefore(successDiv, form);

        // Remove after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const errorElement = document.getElementById(this.id + 'Error');
            if (!errorElement) return;

            if (this.value.trim() === '') {
                errorElement.textContent = 'This field is required';
                errorElement.style.display = 'block';
            } else {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        });
    });
}

/**
 * Active Navigation Highlight
 * Highlights current section in navigation
 */
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const navHeight = document.querySelector('.navbar').offsetHeight;

            if (scrollY >= (sectionTop - navHeight - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * Progress Bar Animation
 * Animates progress bars when they come into view
 */
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');

    if (!progressBars.length) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = progress + '%';
                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => observer.observe(bar));
}

/**
 * Lazy Loading for Images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    if (!images.length) return;

    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * Additional Utility Functions
 */

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Initialize counter animation when stats come into view
const statNumbers = document.querySelectorAll('.stat-number[data-count]');
if (statNumbers.length) {
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));
}

// Keyboard accessibility for mobile menu
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const mobileToggle = document.getElementById('mobileToggle');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileToggle && mobileToggle.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Preload critical resources
function preloadResources() {
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&display.css'
    ];
    
    criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = font;
        document.head.appendChild(link);
    });
}

// Run preload
preloadResources();

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page loaded in: ' + pageLoadTime + 'ms');
    });
}

console.log('Prince Addae Portfolio - JavaScript initialized successfully!');

