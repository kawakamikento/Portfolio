console.log("Unity Engineer Portfolio Loaded");

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1); // #hero から hero を取得
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // ページ遷移が多いため、スクロールアニメーションは一度実行したら保持する方が自然な場合がある
            // entry.target.classList.remove('visible'); 
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(section => {
    observer.observe(section);
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox?.querySelector('.lightbox-img');
const lightboxClose = lightbox?.querySelector('.lightbox-close');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const match = item.style.backgroundImage.match(/url\(['"]?(.+?)['"]?\)/);
        if (match) openLightbox(match[1]);
    });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});

