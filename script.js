// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const pageTransition = document.querySelector('.page-transition');

    // Function to show a specific page with smooth transition
    function showPage(pageId) {
        // Add transition effect
        pageTransition.classList.add('active');

        setTimeout(() => {
            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
                page.style.opacity = '0';
                page.style.transform = 'translateY(20px)';
            });

            // Show the selected page
            const targetPage = document.getElementById(pageId);
            if (targetPage) {
                targetPage.classList.add('active');
                setTimeout(() => {
                    targetPage.style.opacity = '1';
                    targetPage.style.transform = 'translateY(0)';
                }, 50);
            }

            // Update active navigation link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${pageId}`) {
                    link.classList.add('active');
                }
            });

            // Remove transition effect
            setTimeout(() => {
                pageTransition.classList.remove('active');
            }, 500);
        }, 300);
    }

    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('href').substring(1);
            showPage(targetPage);
        });
    });

    // Handle initial page load
    const initialPage = window.location.hash.substring(1) || 'home';
    showPage(initialPage);

    // Add parallax effect to mouse movement
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Parallax effect for background
        document.body.style.backgroundPosition = `${mouseX * 20}% ${mouseY * 20}%`;
        
        // Glow effect for profile image
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            const rect = profileImg.getBoundingClientRect();
            const imgX = (e.clientX - rect.left) / rect.width - 0.5;
            const imgY = (e.clientY - rect.top) / rect.height - 0.5;
            
            profileImg.style.transform = `perspective(1000px) rotateY(${imgX * 10}deg) rotateX(${-imgY * 10}deg)`;
        }
    });

    // Add typing animation for profile title
    const profileTitle = document.querySelector('.profile-content h1');
    if (profileTitle) {
        const text = profileTitle.textContent;
        profileTitle.textContent = '';
        let i = 0;
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                profileTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100);
    }

    // Add scroll reveal animations
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1
    });

    scrollRevealElements.forEach(element => {
        observer.observe(element);
    });

    // Add hover effects for social cards
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Reset transforms when mouse leaves the window
    document.addEventListener('mouseleave', () => {
        const profileImg = document.querySelector('.profile-img');
        if (profileImg) {
            profileImg.style.transform = 'none';
        }
    });
});