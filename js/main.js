// ===== GLOBAL VARIABLES =====
let cursor = null;
let cursorFollower = null;
let isDarkMode = false;
let carouselIntervals = {};

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZE APPLICATION =====
function initializeApp() {
    // Initialize components
    initCustomCursor();
    initDarkMode();
    initTypingAnimation();
    initScrollAnimations();
    initNavigation();
    initProjectFilters();
    initProjectCarousels();
    initBackToTop();
    initMobileMenu();
    
    // Add event listeners
    addEventListeners();
    
    console.log('Portfolio website initialized successfully!');
}

// ===== CUSTOM CURSOR =====
function initCustomCursor() {
    // Only initialize cursor on desktop
    if (window.innerWidth < 768) return;
    
    cursor = document.querySelector('.cursor');
    cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    // Mouse move event
    document.addEventListener('mousemove', updateCursor);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .project-card, .skill-item, .contact-item, .indicator');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

function updateCursor(e) {
    if (!cursor || !cursorFollower) return;
    
    const x = e.clientX;
    const y = e.clientY;
    
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = x + 'px';
        cursorFollower.style.top = y + 'px';
    }, 100);
}

// ===== DARK MODE TOGGLE =====
function initDarkMode() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    // Load saved theme or default to light mode
    if (savedTheme === 'dark') {
        enableDarkMode();
    }
    
    // Add click event to toggle button
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    
    if (isDarkMode) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

function enableDarkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
    const darkModeToggle = document.querySelector('.dark-mode-toggle i');
    if (darkModeToggle) {
        darkModeToggle.className = 'fas fa-sun';
    }
    localStorage.setItem('theme', 'dark');
    isDarkMode = true;
}

function disableDarkMode() {
    document.documentElement.removeAttribute('data-theme');
    const darkModeToggle = document.querySelector('.dark-mode-toggle i');
    if (darkModeToggle) {
        darkModeToggle.className = 'fas fa-moon';
    }
    localStorage.setItem('theme', 'light');
    isDarkMode = false;
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    if (!typingElement) return;
    
    const roles = [
        'Data Analyst',
        'IT Business Analyst', 
        'Generative AI Expert',
        'Supply Chain Analyst'
    ];
    
    let currentRole = 0;
    let currentChar = 0;
    let isDeleting = false;
    
    function typeRole() {
        const currentText = roles[currentRole];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, currentChar - 1);
            currentChar--;
        } else {
            typingElement.textContent = currentText.substring(0, currentChar + 1);
            currentChar++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentChar === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentRole = (currentRole + 1) % roles.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeRole, typeSpeed);
    }
    
    // Start typing animation
    typeRole();
}

// ===== PROJECT IMAGE CAROUSELS =====
function initProjectCarousels() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, cardIndex) => {
        const carousel = card.querySelector('.project-image-carousel');
        const images = carousel.querySelectorAll('.carousel-image');
        const indicators = carousel.querySelectorAll('.indicator');
        
        if (images.length <= 1) return; // Skip if only one image
        
        let currentSlide = 0;
        
        // Function to show specific slide
        function showSlide(slideIndex) {
            // Remove active class from all images and indicators
            images.forEach(img => img.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Add active class to current slide
            images[slideIndex].classList.add('active');
            indicators[slideIndex].classList.add('active');
            
            currentSlide = slideIndex;
        }
        
        // Function to go to next slide
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % images.length;
            showSlide(nextIndex);
        }
        
        // Add click event to indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                // Restart auto-rotation after manual click
                clearInterval(carouselIntervals[cardIndex]);
                carouselIntervals[cardIndex] = setInterval(nextSlide, 2000);
            });
        });
        
        // Start auto-rotation
        carouselIntervals[cardIndex] = setInterval(nextSlide, 2000);
        
        // Pause auto-rotation on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(carouselIntervals[cardIndex]);
        });
        
        // Resume auto-rotation when mouse leaves
        carousel.addEventListener('mouseleave', () => {
            carouselIntervals[cardIndex] = setInterval(nextSlide, 2000);
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(handleScrollAnimation, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.about-card, .skill-category, .contact-item, .project-card, .section-header'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

function handleScrollAnimation(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Add appropriate animation class based on element
            if (element.classList.contains('about-card')) {
                element.classList.add('fade-in-up');
            } else if (element.classList.contains('skill-category')) {
                element.classList.add('fade-in-left');
            } else if (element.classList.contains('contact-item')) {
                element.classList.add('fade-in-right');
            } else if (element.classList.contains('project-card')) {
                element.classList.add('fade-in-up');
            } else if (element.classList.contains('section-header')) {
                element.classList.add('fade-in-up');
            }
        }
    });
}

// ===== NAVIGATION =====
function initNavigation() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===== PROJECT FILTERS =====
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterButtons.length || !projectCards.length) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(filter, projectCards);
        });
    });
}

function filterProjects(filter, projectCards) {
    projectCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        
        if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.6s ease-out forwards';
        } else {
            card.style.display = 'none';
        }
    });
}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Scroll to top on click
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// ===== SCROLL INDICATOR =====
function updateScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (!scrollIndicator) return;
    
    // Hide scroll indicator after scrolling down
    if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
        scrollIndicator.style.visibility = 'hidden';
    } else {
        scrollIndicator.style.opacity = '1';
        scrollIndicator.style.visibility = 'visible';
    }
}

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== EVENT LISTENERS =====
function addEventListeners() {
    // Optimized scroll events
    window.addEventListener('scroll', throttle(updateScrollIndicator, 16));
    window.addEventListener('scroll', throttle(updateActiveNavLink, 100));
    
    // Resize events
    window.addEventListener('resize', debounce(handleResize, 250));
    
    // Form submission (if contact form exists)
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Loading performance
    window.addEventListener('load', handlePageLoad);
}

// ===== RESIZE HANDLER =====
function handleResize() {
    // Reinitialize cursor for responsive behavior
    if (window.innerWidth >= 768 && !cursor) {
        initCustomCursor();
    } else if (window.innerWidth < 768 && cursor) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}

// ===== KEYBOARD NAVIGATION =====
function handleKeyboardNavigation(e) {
    // ESC key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
    
    // Arrow keys for project navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const activeFilter = document.querySelector('.filter-btn.active');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        if (activeFilter && filterButtons.length > 1) {
            const currentIndex = Array.from(filterButtons).indexOf(activeFilter);
            let nextIndex;
            
            if (e.key === 'ArrowRight') {
                nextIndex = (currentIndex + 1) % filterButtons.length;
            } else {
                nextIndex = (currentIndex - 1 + filterButtons.length) % filterButtons.length;
            }
            
            filterButtons[nextIndex].click();
        }
    }
}

// ===== FORM HANDLING =====
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Basic form validation and submission logic
    const formData = new FormData(e.target);
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate form submission (replace with actual logic)
    setTimeout(() => {
        submitButton.textContent = 'Message Sent!';
        submitButton.style.backgroundColor = '#10b981';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '';
            e.target.reset();
        }, 2000);
    }, 1000);
}

// ===== PAGE LOAD HANDLER =====
function handlePageLoad() {
    // Hide loading spinner if it exists
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // Initialize scroll indicator
    updateScrollIndicator();
    
    // Log performance metrics
    if (window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    }
}

// ===== UTILITY FUNCTIONS =====
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function getRandomDelay(min = 0, max = 500) {
    return Math.random() * (max - min) + min;
}

function addRandomAnimationDelay() {
    const cards = document.querySelectorAll('.project-card, .about-card, .skill-category');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 100}ms`;
    });
}

// ===== EASTER EGGS =====
function initEasterEggs() {
    let clickCount = 0;
    const logo = document.querySelector('.nav-logo');
    
    if (logo) {
        logo.addEventListener('click', function() {
            clickCount++;
            
            if (clickCount === 5) {
                // Fun animation after 5 clicks
                document.body.style.animation = 'rainbow 2s ease-in-out';
                setTimeout(() => {
                    document.body.style.animation = '';
                    clickCount = 0;
                }, 2000);
            }
        });
    }
}

// Add CSS for rainbow animation
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(180deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize easter eggs
setTimeout(initEasterEggs, 1000);

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    
    // Graceful degradation - ensure basic functionality works
    if (!document.querySelector('.cursor')) {
        document.body.style.cursor = 'auto';
    }
});

// ===== ANALYTICS (Optional) =====
function trackUserInteraction(action, element) {
    // Basic interaction tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'element': element,
            'timestamp': new Date().toISOString()
        });
    }
    
    console.log(`User interaction: ${action} on ${element}`);
}

// Add interaction tracking to buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button, .btn, .nav-link')) {
        trackUserInteraction('click', e.target.className || e.target.tagName);
    }
});

// ===== INITIALIZATION MESSAGE =====
console.log(`
🎉 Portfolio Website Loaded Successfully!

Features initialized:
✅ Custom Cursor
✅ Dark Mode Toggle  
✅ Typing Animation
✅ Scroll Animations
✅ Project Filtering
✅ Project Image Carousels
✅ Mobile Navigation
✅ Back to Top Button
✅ Smooth Scrolling
✅ Responsive Design

Built with ❤️ by Pritom Bhowmik
`);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        toggleDarkMode,
        filterProjects,
        updateCursor,
        initProjectCarousels
    };
} 