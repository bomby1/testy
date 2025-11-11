// Theme Toggle Functionality
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            // Add transition class
            html.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            
            // Set new theme
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            updateIcon(newTheme);
            
            // Add animation to button
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                themeToggle.style.transform = '';
            }, 300);
        });
    }

    function updateIcon(theme) {
        if (themeIcon) {
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
        }
    }

    // Add scroll animation observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements with animation classes
    document.addEventListener('DOMContentLoaded', () => {
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        animatedElements.forEach(el => observer.observe(el));
    });

    // Add smooth hover effects to cards
    const addCardHoverEffects = () => {
        const cards = document.querySelectorAll('.stock-card, .sidebar-section, .excel-buttons');
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px)';
            });
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    };

    // Initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addCardHoverEffects);
    } else {
        addCardHoverEffects();
    }

    // Add ripple effect to buttons
    const addRippleEffect = (e) => {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    };

    // Add ripple to all buttons
    document.addEventListener('DOMContentLoaded', () => {
        const buttons = document.querySelectorAll('button:not(.theme-toggle)');
        buttons.forEach(button => {
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.addEventListener('click', addRippleEffect);
        });
    });

    // Add ripple animation styles
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }

        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        /* Smooth transitions for theme changes */
        * {
            transition-property: background-color, border-color, color, fill, stroke;
            transition-duration: 0.3s;
            transition-timing-function: ease;
        }

        /* Exclude specific elements from transition */
        .spinner,
        .chart-container,
        [class*="chart"],
        input,
        textarea {
            transition: none !important;
        }
    `;
    document.head.appendChild(style);

    // Scroll to Top Button Functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Add stagger animation to table rows
    const staggerTableRows = () => {
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach((row, index) => {
            row.style.animation = `fadeIn 0.5s ease-out ${index * 0.05}s both`;
        });
    };

    // Observe table changes
    const tableObserver = new MutationObserver(() => {
        staggerTableRows();
    });

    const table = document.querySelector('tbody');
    if (table) {
        tableObserver.observe(table, { childList: true });
    }

    // Add loading state animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        staggerTableRows();
    });
})();
