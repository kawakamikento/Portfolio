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

const observer = new IntersectionObserver((entries, observer) => {
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

// Typing effect for hero text
const text = "ゲーム開発者 | Unity エンジニア | C# プログラマー";
const typingElement = document.querySelector('.typing-effect');
let i = 0;

function typeWriter() {
    if (!typingElement) return; // Guard clause for pages without typing effect

    if (i < text.length) {
        typingElement.innerHTML = text.substring(0, i + 1) + '<span class="cursor">|</span>';
        i++;
        setTimeout(typeWriter, 50);
    } else {
        typingElement.innerHTML = text; // Remove cursor at end
    }
}

// Start typing effect after a slight delay
setTimeout(typeWriter, 1000);


// ------------------------------------------------------------------
// 【修正】ギャラリーの自動スクロール機能（無限ループ対応）
// ------------------------------------------------------------------

function startImageCarousel() {
    const galleryGrid = document.querySelector('.project-gallery .gallery-grid');
    if (!galleryGrid) return;

    const scrollSpeed = 0.5; // スムーズなスクロールのためのピクセル数を減らす
    const intervalTime = 16; // 約60fps (スムーズなアニメーションのために間隔を短くする)
    let scrollInterval;
    let isPaused = false;

    // 最初の3枚（オリジナルコンテンツ）の幅を計算する
    // ギャラリーアイテムが6枚あるため、前半3枚分の幅がコンテンツの総幅となる
    const items = galleryGrid.querySelectorAll('.gallery-item');
    if (items.length < 6) return; // 複製された画像がない場合は無限ループにしない

    // 最初の3枚の幅 + 2枚分のギャップを計算 (簡略化のために1枚目のアイテム幅を使用)
    const itemWidth = items[0].offsetWidth;
    const gapWidth = 16; // style.cssのギャップ (1.5rem = 16px * 1.5 = 24px だが、ここでは一般的な16pxで仮定)

    // スムーズスクロールを停止するためのフラグ
    const originalContentWidth = (itemWidth + gapWidth) * 3; 

    // スクロール処理を実行する関数
    const scroll = () => {
        if (isPaused) return;

        // スクロール位置を更新
        galleryGrid.scrollLeft += scrollSpeed;

        // 【無限ループ判定】
        // 現在のスクロール位置が、元のコンテンツ（最初の3枚）の幅を超えたら、
        // ユーザーには見えない位置で即座にスクロール位置をリセットする
        if (galleryGrid.scrollLeft >= originalContentWidth) {
            // スムーズなリセットのために、scroll-behaviorを一時的に無効にする
            galleryGrid.style.scrollBehavior = 'auto';
            
            // スクロール位置を最初のコンテンツの先頭に戻す
            galleryGrid.scrollLeft = 0; 

            // 次のフレームでscroll-behaviorを元に戻す
            requestAnimationFrame(() => {
                galleryGrid.style.scrollBehavior = 'smooth';
            });
        }
    };

    // 自動スクロールを開始
    scrollInterval = setInterval(scroll, intervalTime);

    // ホバー時にスクロールを停止・再開
    galleryGrid.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    galleryGrid.addEventListener('mouseleave', () => {
        isPaused = false;
    });
}

// ドキュメント全体が読み込まれた後にカルーセルを開始
window.onload = function() {
    startImageCarousel();
};
