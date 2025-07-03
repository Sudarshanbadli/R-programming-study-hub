// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Card Staggered Animation
const cards = document.querySelectorAll('.card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'slideIn 0.6s ease-out';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Load Theme Preference
window.addEventListener('load', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
});

// Category Filter
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const category = button.getAttribute('data-category');
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            card.style.display = category === 'all' || cardCategory === category ? 'block' : 'none';
        });
    });
});

// Sidebar Toggle
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebar-toggle');
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// Close Sidebar on Link Click (Mobile)
document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
});

// Back-to-Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 300);
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Modal
const modal = document.getElementById('welcome-modal');
const modalClose = document.querySelector('.modal-close');
window.addEventListener('load', () => {
    modal.style.display = 'block';
});
modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
});
modal.querySelector('.cta-button').addEventListener('click', () => {
    modal.style.display = 'none';
    document.getElementById('r-intro').scrollIntoView({ behavior: 'smooth' });
});

// Parallax Effect for Header (Disabled on Mobile)
const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
if (!isMobile) {
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        const scrollPosition = window.scrollY;
        header.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
}

// Prevent Double-Tap Zoom
document.addEventListener('touchstart', (e) => {
    if (e.touches.length > 1) {
        e.preventDefault();
    }
}, { passive: false });

// Optimize Animation Performance
window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                card.style.opacity = 1;
            }
        });
    });
});