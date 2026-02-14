/* ==========================================
   SIAVASH HIGH SCHOOL - Interactive Scripts
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Navbar
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to Top
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on scroll position
        updateActiveNavLink();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    // ===== Back to Top =====
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== Mobile Menu =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu on click outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // ===== Active Nav Link on Scroll =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    // ===== Smooth Scroll for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ===== Counter Animation =====
    const counters = document.querySelectorAll('.stat-number[data-count]');

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
            current += step;
            if (current >= target) {
                el.textContent = target.toLocaleString('fa-IR');
                return;
            }
            el.textContent = Math.floor(current).toLocaleString('fa-IR');
            requestAnimationFrame(update);
        };

        update();
    };

    // Use Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ===== Scroll Reveal Animation =====
    const revealElements = document.querySelectorAll(
        '.feature-card, .field-card, .teacher-card, .testimonial-card, .news-card, .section-header, .facility-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        revealObserver.observe(el);
    });

    // ===== Particles =====
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 15 + 10 + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particlesContainer.appendChild(particle);
    }

    // ===== Contact Form =====
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const originalText = submitBtn.innerHTML;

        // Loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> پیام شما ارسال شد!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1500);
    });

    // ===== Newsletter Form =====
    const newsletterForm = document.getElementById('newsletterForm');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const btn = newsletterForm.querySelector('button');
        const originalIcon = btn.innerHTML;

        btn.innerHTML = '<i class="fas fa-check"></i>';
        input.value = '';
        input.placeholder = 'ثبت شد! ✓';

        setTimeout(() => {
            btn.innerHTML = originalIcon;
            input.placeholder = 'ایمیل شما...';
        }, 3000);
    });

    // ===== Parallax on Hero Shapes =====
    window.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        shapes.forEach((shape, i) => {
            const speed = (i + 1) * 8;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // ===== Tilt Effect on Cards =====
    const tiltCards = document.querySelectorAll('.field-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            card.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ===== Typing effect for hero badge =====
    const badge = document.querySelector('.hero-badge span');
    if (badge) {
        const text = badge.textContent;
        badge.textContent = '';
        let i = 0;

        const typeWriter = () => {
            if (i < text.length) {
                badge.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        setTimeout(typeWriter, 1000);
    }

});
