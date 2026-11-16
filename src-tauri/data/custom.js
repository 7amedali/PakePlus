window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
    const origin = e.target.closest('a')
    const isBaseTargetBlank = document.querySelector(
        'head base[target="_blank"]'
    )
    console.log('origin', origin, isBaseTargetBlank)
    if (
        (origin && origin.href && origin.target === '_blank') ||
        (origin && origin.href && isBaseTargetBlank)
    ) {
        e.preventDefault()
        console.log('handle origin', origin)
        location.href = origin.href
    } else {
        console.log('not handle origin', origin)
    }
}

window.open = function (url, target, features) {
    console.log('open', url, target, features)
    location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

// تحسينات المظهر وتفعيل التمرير المستمر للريلز مثل التطبيق الأصلي
window.addEventListener('DOMContentLoaded', () => {
    document.documentElement.style.overflowX = 'hidden';

    const style = document.createElement('style');
    style.innerHTML = `
        ::-webkit-scrollbar {
            display: none;
        }
        html {
            scroll-behavior: smooth;
            scrollbar-width: none;
        }
        video {
            object-fit: cover !important;
        }
    `;
    document.head.appendChild(style);

    // تحويل روابط الريلز المنفردة إلى وضع التمرير المستمر تلقائياً
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && link.href.includes('/reel/')) {
            e.preventDefault();
            e.stopPropagation();
            const reelId = link.href.split('/reel/')[1].split('/')[0].split('?')[0];
            window.location.href = 'https://instagram.com' + reelId + '/';
        }
    }, true);

    // ضبط الزوم تلقائياً (100% للريلز و 75% لباقي الصفحات)
    const adjustZoom = () => {
        if (window.location.pathname.includes('/reels') || window.location.pathname.includes('/reel/')) {
            document.body.style.zoom = '100%';
        } else {
            document.body.style.zoom = '75%';
        }
    };

    adjustZoom();
    setInterval(adjustZoom, 500);
});
