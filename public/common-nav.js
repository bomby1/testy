// Common navigation component for all pages
document.addEventListener('DOMContentLoaded', function() {
    // Look for the navigation container - check both new and old selectors
    const navContainer = document.querySelector('#navigation-links') || document.querySelector('.nav-links');
    
    if (navContainer) {
        // Define all pages in the application
        // New pages should be added at the end of this array
        const allPages = [
            { name: '🏠 All Tools', url: 'page-navigator.html' },
            { name: 'Dashboard', url: 'dashboard.html' },
            { name: 'Advanced Chart', url: 'advanced-chart.html' },
            { name: 'Support Stocks', url: 'support-stocks.html' },
            { name: 'RSI + Support', url: 'rsi-support.html' },
            { name: 'Support Prediction', url: 'support-prediction.html' },
            { name: 'Stoploss Tracker', url: 'stoploss.html' },
            { name: 'Consolidation Scanner', url: 'consolidation-scanner.html' },
            { name: 'Consolidation Analyzer', url: 'consolidation-analyzer.html' },
            { name: 'Enhanced Trendline Scanner', url: 'enhanced-trendline-scanner.html' },
            { name: 'Institutional Activity', url: 'institutional-activity.html' },
            { name: 'Big Player Accumulation', url: 'big-player-accumulation.html' },
            { name: 'Weekly Heatmap', url: 'heatmap.html' },
            { name: 'IPO & Rights', url: 'ipo-rights.html' },
            { name: 'Trading Signals', url: 'signals.html' }
            // New pages should be added here
        ];
        
        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop();
        
        // Clear existing navigation links
        navContainer.innerHTML = '';
        
        // Generate navigation links
        allPages.forEach(page => {
            const link = document.createElement('a');
            link.href = page.url;
            link.textContent = page.name;
            
            // Set active class for current page
            if (currentPage === page.url) {
                link.classList.add('active');
            }
            
            navContainer.appendChild(link);
        });
    }

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    if (mobileMenuToggle && navLinks && navOverlay) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        navOverlay.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}); 