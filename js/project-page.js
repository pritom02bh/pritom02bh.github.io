// ===== PROJECT PAGE FUNCTIONALITY =====

document.addEventListener('DOMContentLoaded', function() {
    initProjectPageFeatures();
});

function initProjectPageFeatures() {
    initImageGallery();
    initScrollToTop();
    console.log('Project page features initialized successfully!');
}

// ===== IMAGE GALLERY MODAL =====
function initImageGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const closeBtn = document.querySelector('.close');
    
    if (!modal || !modalImage || !modalTitle || !modalDescription) return;
    
    // Add click event to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const description = this.getAttribute('data-desc');
            
            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });
    
    // Close modal events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
}

// ===== SCROLL TO TOP ENHANCEMENT =====
function initScrollToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    // Enhanced scroll to top with smooth animation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScrollToTop();
    });
}

function smoothScrollToTop() {
    const scrollStep = -window.scrollY / (500 / 15);
    const scrollInterval = setInterval(function() {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
}

// ===== TECH STACK ANIMATIONS =====
function initTechStackAnimations() {
    const techItems = document.querySelectorAll('.tech-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    techItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== STATS COUNTER ANIMATION =====
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const numberMatch = text.match(/\d+/);
    
    if (!numberMatch) return;
    
    const targetNumber = parseInt(numberMatch[0]);
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetNumber / steps;
    let current = 0;
    let step = 0;
    
    const timer = setInterval(() => {
        current += increment;
        step++;
        
        let displayNumber = Math.floor(current);
        let displayText = displayNumber.toString();
        
        if (hasPlus) displayText += '+';
        if (hasPercent) displayText += '%';
        if (text.includes('/7')) displayText = '24/7';
        
        element.textContent = displayText;
        
        if (step >= steps) {
            clearInterval(timer);
            element.textContent = text; // Ensure final value is exact
        }
    }, duration / steps);
}

// ===== TIMELINE ANIMATIONS =====
function initTimelineAnimations() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInLeft 0.6s ease-out forwards';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// ===== GALLERY LAZY LOADING =====
function initLazyLoading() {
    const images = document.querySelectorAll('.gallery-item img, .related-item img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Check if image is already loaded
                if (img.complete && img.naturalHeight !== 0) {
                    img.style.opacity = '1';
                } else {
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease-in-out';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    // Fallback: ensure image is visible even if onload doesn't fire
                    setTimeout(() => {
                        if (img.style.opacity !== '1') {
                            img.style.opacity = '1';
                        }
                    }, 500);
                }
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== BREADCRUMB ENHANCEMENT =====
function initBreadcrumbNavigation() {
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's an anchor link on the same page
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// ===== RELATED PROJECTS HOVER EFFECTS =====
function initRelatedProjectsEffects() {
    const relatedItems = document.querySelectorAll('.related-item');
    
    relatedItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== KEYBOARD NAVIGATION FOR GALLERY =====
function initKeyboardNavigation() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('imageModal');
    let currentImageIndex = 0;
    
    document.addEventListener('keydown', function(e) {
        if (modal && modal.style.display === 'block') {
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    navigateGallery(-1);
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    navigateGallery(1);
                    break;
            }
        }
    });
    
    function navigateGallery(direction) {
        const newIndex = currentImageIndex + direction;
        
        if (newIndex >= 0 && newIndex < galleryItems.length) {
            currentImageIndex = newIndex;
            const item = galleryItems[currentImageIndex];
            
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            
            modalImage.src = item.getAttribute('data-image');
            modalTitle.textContent = item.getAttribute('data-title');
            modalDescription.textContent = item.getAttribute('data-desc');
        }
    }
    
    // Set current index when opening modal
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
        });
    });
}

// ===== LOADING ANIMATIONS =====
function initLoadingAnimations() {
    // Add loading animation classes, but exclude gallery items to avoid conflicts
    const animatedElements = document.querySelectorAll(
        '.project-header-content, .details-main, .tech-item, .stat-item, .timeline-item'
    );
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Handle gallery items separately with shorter delay
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 50 + 200); // Start after 200ms with 50ms intervals
    });
}

// ===== PRINT FUNCTIONALITY =====
function initPrintFeatures() {
    // Add print button if needed
    const printBtn = document.createElement('button');
    printBtn.className = 'print-btn';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print Project';
    printBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: var(--accent-color);
        color: white;
        border: none;
        padding: 12px 16px;
        border-radius: 50px;
        cursor: pointer;
        z-index: 1000;
        display: none;
        transition: all 0.3s ease;
    `;
    
    printBtn.addEventListener('click', () => {
        window.print();
    });
    
    document.body.appendChild(printBtn);
    
    // Show print button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 1000) {
            printBtn.style.display = 'block';
        } else {
            printBtn.style.display = 'none';
        }
    });
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initTechStackAnimations();
        initStatsCounter();
        initTimelineAnimations();
        initLazyLoading();
        initBreadcrumbNavigation();
        initRelatedProjectsEffects();
        initKeyboardNavigation();
        initLoadingAnimations();
        initPrintFeatures();
    }, 500);
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('Project page error:', e.error);
    // Graceful fallback for modal
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

console.log('🖼️ Project page JavaScript loaded successfully!'); 