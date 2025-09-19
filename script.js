
const confettiEl = document.getElementById('confetti');
let confettiOn = true;

function makeConfettiParticle() {
    const d = document.createElement('div');
    const size = Math.random() * 10 + 6;
    d.style.width = size + 'px';
    d.style.height = (size * 0.6) + 'px';
    d.style.background = ['#ffb86b', '#ffd166', '#60a5fa', '#7afcff', '#ff6b6b'][Math.floor(Math.random() * 5)];
    d.style.position = 'absolute';
    d.style.left = (Math.random() * 100) + '%';
    d.style.top = '-5px';
    d.style.opacity = Math.random() * 0.95 + 0.3;
    d.style.transform = 'rotate(' + (Math.random() * 360) + 'deg)';
    d.style.borderRadius = '2px';
    d.style.zIndex = 9999;
    d.style.pointerEvents = 'none';
    d.className = 'confetti';
    const duration = 3500 + Math.random() * 3000;
    d.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: 'translateY(' + (window.innerHeight + 200) + 'px) rotate(600deg)', opacity: 0.8 }
    ], { duration: duration, easing: 'cubic-bezier(.2,.7,.2,1)' });
    confettiEl.appendChild(d);
    setTimeout(() => d.remove(), duration + 50);
}

function burstConfetti(count = 30) {
    for (let i = 0; i < count; i++) setTimeout(makeConfettiParticle, i * 50 + Math.random() * 300);
}

function autoBurst() {
    if (!confettiOn) return;
    burstConfetti(Math.floor(18 + Math.random() * 22));
    setTimeout(autoBurst, 1400 + Math.random() * 1800);
}
autoBurst();

function toggleConfetti() {
    confettiOn = !confettiOn;
    if (confettiOn) autoBurst();
}

(function addBalloons() {
    const container = document.getElementById('balloonContainer');
    const colors = ['#FF7AA2', '#FFD166', '#7AFCC8', '#6EE7B7'];
    const wrapRect = document.querySelector('.wrap').getBoundingClientRect();

    for (let i = 0; i < 6; i++) {
        const b = document.createElement('div');
        b.className = 'balloon float';
        const size = 60 + Math.random() * 40;
        b.style.width = size + 'px'; b.style.height = size * 1.2 + 'px';

        const side = Math.random() < 0.5 ? 'left' : 'right';
        if (side === 'left') {
            b.style.left = (Math.random() * 20 - 25) + '%';
        } else {
            b.style.left = (100 + Math.random() * 30 + 5) + '%';
        }

        b.style.top = (Math.random() * 110 - 10) + '%';

        b.style.borderRadius = '50% 50% 52% 52%/60% 60% 40% 40%';
        b.style.background = colors[i % colors.length];
        b.style.opacity = 0.95; b.style.zIndex = 15; b.style.position = 'absolute';
        b.style.boxShadow = '0 12px 30px rgba(2,8,23,0.45)';
        container.appendChild(b);
    }
})();

(function enableDropToReplace() {
    const frame = document.getElementById('frame');
    frame.addEventListener('dragover', e => e.preventDefault());
    frame.addEventListener('drop', e => {
        e.preventDefault();
        const file = e.dataTransfer.files && e.dataTransfer.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) { alert('Please drop an image file.'); return }
        const reader = new FileReader();
        reader.onload = ev => {
            const big = frame.querySelector('.bigpic');
            big.src = ev.target.result;
        };
        reader.readAsDataURL(file);
    })
})();


document.getElementsByClassName("audio-btn")[0].addEventListener('click', () => {
    document.getElementById('bg-music').muted = false;
}, { once: true });
