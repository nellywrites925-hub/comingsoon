/*
==================================================
UNDER CONSTRUCTION LANDING PAGE - JAVASCRIPT
==================================================
Interactive features for the coming soon page
Features: Countdown timer, particle effects, form validation, animations
Author: Your Name
Version: 1.0
==================================================
*/

// ============= CONFIGURATION =============
const CONFIG = {
    // Set your launch date here (YYYY-MM-DD HH:MM:SS)
    launchDate: new Date('2025-12-31 23:59:59').getTime(),
    
    // Particle system settings
    particles: {
        count: 100,
        speed: 0.5,
        size: 2,
        color: 'rgba(255,255,255,0.6)'
    },
    
    // Animation settings
    animations: {
        scrollThreshold: 100,
        typewriterSpeed: 100
    },
    
    // Form settings
    form: {
        emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        successMessage: "Thank you! We'll notify you when we launch.",
        errorMessage: "Please enter a valid email address."
    }
};

// ============= PARTICLE SYSTEM =============
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        this.particles = [];
        for (let i = 0; i < CONFIG.particles.count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * CONFIG.particles.speed,
                vy: (Math.random() - 0.5) * CONFIG.particles.speed,
                size: Math.random() * CONFIG.particles.size + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.01;
                particle.vy += (dy / distance) * force * 0.01;
            }
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = CONFIG.particles.color.replace('0.6', particle.opacity);
            this.ctx.fill();
            
            // Connect nearby particles
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(255,255,255,${0.1 * (1 - distance / 100)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            });
        });
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// ============= COUNTDOWN TIMER =============
class CountdownTimer {
    constructor(targetDate) {
        this.targetDate = targetDate;
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        this.start();
    }
    
    calculateTimeLeft() {
        const now = new Date().getTime();
        const difference = this.targetDate - now;
        
        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            };
        }
        
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    updateDisplay() {
        const timeLeft = this.calculateTimeLeft();
        
        Object.keys(this.elements).forEach(unit => {
            const value = timeLeft[unit].toString().padStart(2, '0');
            if (this.elements[unit].textContent !== value) {
                this.animateNumber(this.elements[unit], value);
            }
        });
    }
    
    animateNumber(element, newValue) {
        element.style.transform = 'scale(1.2)';
        element.style.color = '#f093fb';
        
        setTimeout(() => {
            element.textContent = newValue;
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 150);
    }
    
    start() {
        this.updateDisplay();
        this.interval = setInterval(() => this.updateDisplay(), 1000);
    }
    
    stop() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
}

// ============= FORM HANDLER =============
class FormHandler {
    constructor(formId, messageId) {
        this.form = document.getElementById(formId);
        this.messageContainer = document.getElementById(messageId);
        this.emailInput = this.form.querySelector('#email');
        
        this.bindEvents();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.emailInput.addEventListener('input', () => this.validateEmail());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const isValid = CONFIG.form.emailRegex.test(email);
        
        this.emailInput.classList.toggle('is-invalid', email && !isValid);
        this.emailInput.classList.toggle('is-valid', email && isValid);
        
        return isValid;
    }
    
    showMessage(message, type = 'success') {
        this.messageContainer.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateEmail()) {
            this.showMessage(CONFIG.form.errorMessage, 'danger');
            return;
        }
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Subscribing...';
        submitBtn.disabled = true;
        
        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateAPICall();
            
            // Success
            this.showMessage(CONFIG.form.successMessage, 'success');
            this.form.reset();
            this.emailInput.classList.remove('is-valid');
            
            // Analytics tracking (if implemented)
            this.trackSubscription();
            
        } catch (error) {
            this.showMessage('Something went wrong. Please try again later.', 'danger');
            console.error('Form submission error:', error);
        } finally {
            // Reset button
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1000);
        }
    }
    
    simulateAPICall() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000); // Simulate 2s API call
        });
    }
    
    trackSubscription() {
        // Add your analytics tracking here
        if (typeof gtag !== 'undefined') {
            gtag('event', 'email_signup', {
                event_category: 'engagement',
                event_label: 'coming_soon_page'
            });
        }
    }
}

// ============= SCROLL ANIMATIONS =============
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupProgressBars();
        this.setupNavbarScroll();
        this.setupSmoothScrolling();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                }
            });
        }, this.observerOptions);
        
        document.querySelectorAll('.loading').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupProgressBars() {
        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.progress-bar');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 500);
                    });
                }
            });
        });
        
        const progressSection = document.querySelector('.progress-section');
        if (progressSection) {
            progressObserver.observe(progressSection);
        }
    }
    
    setupNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > CONFIG.animations.scrollThreshold) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ============= UTILITY FUNCTIONS =============
const Utils = {
    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },
    
    // Format number with leading zeros
    formatNumber(num, digits = 2) {
        return num.toString().padStart(digits, '0');
    },
    
    // Generate random ID
    generateId(length = 8) {
        return Math.random().toString(36).substring(2, length + 2);
    }
};

// ============= PERFORMANCE OPTIMIZATIONS =============
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        this.preloadImages();
        this.lazyLoadImages();
        this.optimizeAnimations();
    }
    
    preloadImages() {
        // Preload critical images
        const criticalImages = [
            // Add your critical image paths here
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }
    
    lazyLoadImages() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    optimizeAnimations() {
        // Reduce animations on slower devices
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            document.body.classList.add('reduce-motion');
        }
    }
}

// ============= MAIN APPLICATION =============
class ComingSoonApp {
    constructor() {
        this.components = {};
        this.init();
    }
    
    async init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }
    
    start() {
        try {
            // Initialize particle system
            const canvas = document.getElementById('particle-canvas');
            if (canvas) {
                this.components.particles = new ParticleSystem(canvas);
            }
            
            // Initialize countdown timer
            this.components.countdown = new CountdownTimer(CONFIG.launchDate);
            
            // Initialize form handler
            this.components.form = new FormHandler('notify-form', 'form-message');
            
            // Initialize scroll animations
            this.components.scrollAnimations = new ScrollAnimations();
            
            // Initialize performance optimizations
            this.components.performance = new PerformanceOptimizer();
            
            // Add loading states
            this.addLoadingStates();
            
            // Initialize tooltips and popovers
            this.initializeBootstrapComponents();
            
            console.log('Coming Soon App initialized successfully');
            
        } catch (error) {
            console.error('Error initializing Coming Soon App:', error);
        }
    }
    
    addLoadingStates() {
        // Add loading class to animated elements
        document.querySelectorAll('.feature-card, .contact-item').forEach(el => {
            el.classList.add('loading');
        });
    }
    
    initializeBootstrapComponents() {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new bootstrap.Tooltip(tooltipTriggerEl);
        });
        
        // Initialize Bootstrap popovers
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
        popoverTriggerList.forEach(popoverTriggerEl => {
            new bootstrap.Popover(popoverTriggerEl);
        });
    }
    
    destroy() {
        // Cleanup function for single page apps
        Object.values(this.components).forEach(component => {
            if (component.destroy) {
                component.destroy();
            }
        });
    }
}

// ============= ERROR HANDLING =============
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Send to error tracking service in production
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

// ============= INITIALIZATION =============
// Initialize the application
const app = new ComingSoonApp();

// Make app globally available for debugging
window.ComingSoonApp = app;

// ============= ADDITIONAL FEATURES FOR BUYERS =============

// Analytics helper (for buyers to integrate their tracking)
window.trackEvent = function(event, category, label, value) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', event, {
            event_category: category,
            event_label: label,
            value: value
        });
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', event, { category, label, value });
    }
    
    console.log('Event tracked:', { event, category, label, value });
};

// Theme switcher (bonus feature)
window.toggleTheme = function() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
};

// Load saved theme
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ComingSoonApp, CONFIG, Utils };
}
