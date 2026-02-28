document.addEventListener('DOMContentLoaded', () => {

    /* --- Navbar Active Link on Scroll --- */
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    /* --- Smooth Navigation --- */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSec = document.querySelector(targetId);

            window.scrollTo({
                top: targetSec.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    /* --- Reveal Transitions --- */
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.service-card, .stat-item, .skill-card, .portfolio-item, .about-text, .section-title, .hero-text, .hero-img-box');

    // Add CSS for fade-in effect
    const style = document.createElement('style');
    style.textContent = `
        .reveal-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .reveal-item.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    revealElements.forEach(el => {
        el.classList.add('reveal-item');
        observer.observe(el);
    });

    /* --- Form Submission Simulation (No PHP) --- */
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.send-btn');
            const originalContent = btn.innerHTML;

            btn.innerHTML = 'Sending...';
            btn.style.borderColor = 'var(--accent)';
            btn.style.color = 'var(--accent)';

            setTimeout(() => {
                btn.innerHTML = 'Sent Successfully!';
                btn.style.background = 'var(--accent)';
                btn.style.color = '#fff';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.background = '';
                    btn.style.color = '';
                }, 3000);
            }, 1500);
        });
    }
});
