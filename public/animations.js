// Advanced Animation Utilities
(function() {
    'use strict';

    // Animation Observer for scroll-triggered animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add stagger delay for children
                const children = entry.target.querySelectorAll('[data-stagger]');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Initialize animations on DOM load
    document.addEventListener('DOMContentLoaded', () => {
        initScrollAnimations();
        initHoverEffects();
        initLoadingAnimations();
        initButtonAnimations();
        initCounterAnimations();
    });

    // Scroll-triggered animations
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.fade-in, .slide-in-left, .slide-in-right, .scale-in, .animate-zoom, .animate-flip'
        );
        
        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    }

    // Enhanced hover effects
    function initHoverEffects() {
        // Add tilt effect to cards
        const cards = document.querySelectorAll('.stock-card, .sidebar-section');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // Add magnetic effect to buttons
        const buttons = document.querySelectorAll('button:not(.theme-toggle):not(.scroll-to-top)');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = '';
            });
        });
    }

    // Loading animations
    function initLoadingAnimations() {
        // Show loading dots
        window.showLoadingDots = function(container) {
            const dots = document.createElement('div');
            dots.className = 'loading-dots';
            dots.innerHTML = '<span></span><span></span><span></span>';
            container.appendChild(dots);
            return dots;
        };

        // Show progress bar
        window.showProgressBar = function(container, progress = 0) {
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.innerHTML = `<div class="progress-bar-fill" style="width: ${progress}%"></div>`;
            container.appendChild(progressBar);
            return progressBar;
        };

        // Update progress
        window.updateProgress = function(progressBar, progress) {
            const fill = progressBar.querySelector('.progress-bar-fill');
            if (fill) {
                fill.style.width = `${progress}%`;
            }
        };

        // Show success animation
        window.showSuccessAnimation = function(container) {
            const success = document.createElement('div');
            success.className = 'success-checkmark';
            success.innerHTML = `
                <div class="check-icon">
                    <span class="icon-line line-tip"></span>
                    <span class="icon-line line-long"></span>
                    <div class="icon-circle"></div>
                    <div class="icon-fix"></div>
                </div>
            `;
            container.appendChild(success);
            
            setTimeout(() => {
                success.classList.add('animate-zoom');
            }, 100);
            
            return success;
        };
    }

    // Button animations
    function initButtonAnimations() {
        // Add shake animation on error
        window.shakeElement = function(element) {
            element.classList.add('animate-shake');
            setTimeout(() => {
                element.classList.remove('animate-shake');
            }, 500);
        };

        // Add bounce animation
        window.bounceElement = function(element) {
            element.classList.add('animate-bounce');
            setTimeout(() => {
                element.classList.remove('animate-bounce');
            }, 2000);
        };

        // Add glow effect
        window.glowElement = function(element, duration = 2000) {
            element.classList.add('animate-glow');
            setTimeout(() => {
                element.classList.remove('animate-glow');
            }, duration);
        };
    }

    // Counter animations
    function initCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-counter'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start counter when visible
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            });
            
            counterObserver.observe(counter);
        });
    }

    // Particle effect on click
    window.createParticles = function(x, y, color = '#667eea') {
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                left: ${x}px;
                top: ${y}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 2 + Math.random() * 2;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let posX = x;
            let posY = y;
            let opacity = 1;
            
            const animate = () => {
                posX += vx;
                posY += vy;
                opacity -= 0.02;
                
                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            animate();
        }
    };

    // Add particle effect to important buttons
    document.addEventListener('click', (e) => {
        if (e.target.matches('.get-stocks-btn, .load-btn, .primary-btn')) {
            createParticles(e.clientX, e.clientY);
        }
    });

    // Smooth scroll to element
    window.smoothScrollTo = function(element, offset = 0) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    };

    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            const scrolled = window.pageYOffset;
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
            header.style.opacity = 1 - (scrolled / 500);
        }
    });

    // Add entrance animations to new elements
    const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    if (node.matches('.stock-card, tr, .message')) {
                        node.classList.add('animate-slide-left');
                    }
                }
            });
        });
    });

    // Observe the main content area
    const mainContent = document.querySelector('main, .dashboard-container');
    if (mainContent) {
        mutationObserver.observe(mainContent, {
            childList: true,
            subtree: true
        });
    }

    // Export functions globally
    window.AnimationUtils = {
        showLoadingDots: window.showLoadingDots,
        showProgressBar: window.showProgressBar,
        updateProgress: window.updateProgress,
        showSuccessAnimation: window.showSuccessAnimation,
        shakeElement: window.shakeElement,
        bounceElement: window.bounceElement,
        glowElement: window.glowElement,
        createParticles: window.createParticles,
        smoothScrollTo: window.smoothScrollTo
    };

})();
