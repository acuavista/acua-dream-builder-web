
// AcuaBeach Website JavaScript
// Handles navigation, animations, carousel, and form interactions

document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    initNavigation();
    
    // Scroll animations
    initScrollAnimations();
    
    // Testimonials carousel
    initTestimonialsCarousel();
    
    // Contact form
    initContactForm();
    
    // Smooth scrolling for anchor links
    initSmoothScrolling();
});

// Navigation Functions
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Change hamburger icon to close icon
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'ph ph-x';
        } else {
            icon.className = 'ph ph-list';
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.className = 'ph ph-list';
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !navToggle.contains(event.target)) {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.className = 'ph ph-list';
        }
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation delays for elements in the same section
                const siblings = Array.from(entry.target.parentNode.children).filter(
                    child => child.classList.contains('animate-on-scroll')
                );
                const index = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Testimonials Carousel
function initTestimonialsCarousel() {
    const carousel = document.getElementById('testimonials-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    let currentIndex = 0;
    const totalCards = testimonialCards.length;
    
    // Show only one testimonial on mobile, all on desktop
    function updateCarouselDisplay() {
        if (window.innerWidth <= 767) {
            // Mobile: show one testimonial at a time
            testimonialCards.forEach((card, index) => {
                card.style.display = index === currentIndex ? 'flex' : 'none';
            });
        } else {
            // Desktop: show all testimonials
            testimonialCards.forEach(card => {
                card.style.display = 'flex';
            });
        }
    }
    
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarouselDisplay();
    }
    
    function prevTestimonial() {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarouselDisplay();
    }
    
    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);
    }
    
    // Auto-advance carousel on mobile
    let autoAdvanceInterval;
    
    function startAutoAdvance() {
        if (window.innerWidth <= 767) {
            autoAdvanceInterval = setInterval(nextTestimonial, 5000);
        }
    }
    
    function stopAutoAdvance() {
        clearInterval(autoAdvanceInterval);
    }
    
    // Initial setup
    updateCarouselDisplay();
    startAutoAdvance();
    
    // Update on window resize
    window.addEventListener('resize', function() {
        updateCarouselDisplay();
        stopAutoAdvance();
        startAutoAdvance();
    });
    
    // Pause auto-advance on hover
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoAdvance);
        carousel.addEventListener('mouseleave', startAutoAdvance);
    }
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Simulate form submission
            submitContactForm(formObject);
        });
    }
}

function submitContactForm(formData) {
    const submitButton = document.querySelector('#contact-form button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.innerHTML = '<i class="ph ph-spinner"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success message
        showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        document.getElementById('contact-form').reset();
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        console.log('Form submitted:', formData);
    }, 2000);
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility function to scroll to a section
function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="ph ph-check-circle"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="ph ph-x"></i>
        </button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                max-width: 400px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                padding: 16px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                z-index: 10000;
                animation: slideInFromRight 0.3s ease-out;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }
            
            .notification-success {
                border-left: 4px solid #10B981;
            }
            
            .notification-error {
                border-left: 4px solid #EF4444;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #1F2937;
            }
            
            .notification-content i {
                color: #10B981;
                font-size: 1.2rem;
            }
            
            .notification-close {
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                border-radius: 4px;
                color: #6B7280;
                transition: all 0.2s ease;
            }
            
            .notification-close:hover {
                background: rgba(0, 0, 0, 0.1);
                color: #374151;
            }
            
            @keyframes slideInFromRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @media (max-width: 480px) {
                .notification {
                    right: 16px;
                    left: 16px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutToRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Performance optimizations
// Throttle scroll events
function throttle(func, wait) {
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

// Debounce resize events
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

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(function() {
    // Scroll-based functionality can be optimized here
}, 16)); // ~60fps

// Apply debouncing to resize events
window.addEventListener('resize', debounce(function() {
    // Resize-based functionality
}, 250));

// Preload images for better performance
function preloadImages() {
    const images = [
        '/lovable-uploads/97c6fc08-cf72-4b7c-b9a1-7b58a480441d.png',
        '/lovable-uploads/aa5a5085-a1f5-48e7-9121-a16480f18ec6.png',
        '/lovable-uploads/c3ffe65b-0137-4126-8327-cea10874a31d.png',
        '/lovable-uploads/72021fb8-cd9b-4d66-a41b-3bbb2230961c.png'
    ];
    
    images.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize image preloading
preloadImages();

// Add loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.animate-on-load').forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
});

// WordPress compatibility helpers
window.AcuaBeach = {
    scrollToSection,
    showNotification,
    // Export functions for WordPress integration
    init: function() {
        initNavigation();
        initScrollAnimations();
        initTestimonialsCarousel();
        initContactForm();
        initSmoothScrolling();
    }
};

// Console branding
console.log('%cAcuaBeach%c\n🏖️ Democratizing Tropical Homeownership', 
    'color: #0EA5E9; font-size: 24px; font-weight: bold;', 
    'color: #6B7280; font-size: 14px;'
);
