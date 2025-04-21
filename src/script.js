// ==============================
// 🔧 Inicialización de elementos del DOM
// ==============================
const homeBtn = document.querySelector(".home-btn");
const aboutBtn = document.querySelector(".about-btn");
const contactBtn = document.querySelector(".contact-btn");

const downloadButtonsContainer = document.querySelector(".downloadBtn");
const fileNameBox = document.querySelector(".file-name");
const footer = document.querySelector("footer");

const channelLinks = document.querySelectorAll(".chnl-link a");
const contactLinks = document.querySelectorAll(".contact a");

const headingTitle = document.getElementById("heading");
const fileNameText = document.getElementById("myDiv");
const videoElement = document.getElementById("player");

// ==============================
// ✏️ Variables de estado
// ==============================
let timer = 0;

// ==============================
// 🏷️ Branding dinámico
// ==============================
if (headingTitle && headingTitle.classList.contains("title")) {
    headingTitle.textContent = "CINE ESTRENOS";
}

// ==============================
// 📋 Animación de botones al cargar
// ==============================
const allAnimatedButtons = document.querySelectorAll(".downloadBtn button, .links a");
allAnimatedButtons.forEach((btn) => {
    btn.style.animation = `strtLoad 1s ease ${timer}s forwards, linksBtnAn 2s ease ${timer}s infinite`;
    btn.style.setProperty("--beforestyl", `button_shine ${2 + Math.random() * 7}s ease ${Math.random() * 10}s infinite`);
    timer += 0.3;
});
timer = 0;

// ==============================
// 📦 Limitar tamaño del nombre del archivo
// ==============================
if (fileNameText && fileNameText.textContent.length > 300) {
    fileNameText.textContent = fileNameText.textContent.slice(0, 300) + "....";
}

// ==============================
// 🧭 Navegación entre secciones
// ==============================

if (homeBtn) {
    homeBtn.addEventListener("click", () => {
        downloadButtonsContainer.style.display = "flex";
        fileNameBox.style.display = "block";
        footer.style.display = "block";
        window.location.href = "#main";

        homeBtn.classList.add("active");
        aboutBtn?.classList.remove("active");
        contactBtn?.classList.remove("active");
    });
}

if (aboutBtn) {
    aboutBtn.addEventListener("click", () => {
        downloadButtonsContainer.style.display = "none";
        fileNameBox.style.display = "none";
        footer.style.display = "none";

        homeBtn?.classList.remove("active");
        aboutBtn.classList.add("active");
        contactBtn?.classList.remove("active");

        window.location.href = "#abtus";
    });
}

if (contactBtn) {
    contactBtn.addEventListener("click", () => {
        downloadButtonsContainer.style.display = "none";
        fileNameBox.style.display = "none";
        footer.style.display = "none";

        homeBtn?.classList.remove("active");
        aboutBtn?.classList.remove("active");
        contactBtn.classList.add("active");

        window.location.href = "#contact";
    });
}

// ==============================
// 🎬 Configurar reproductor Plyr
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    const controls = [
        'play-large', 'rewind', 'play', 'fast-forward',
        'progress', 'current-time', 'duration',
        'mute', 'volume', 'captions', 'settings',
        'pip', 'airplay', 'fullscreen'
    ];
    Plyr.setup('.player', { controls });

    // 🎯 Doble toque para avanzar/retroceder 5s
    const videoWrapper = videoElement?.parentElement;
    if (videoWrapper && videoElement) {
        let lastTapLeft = 0;
        let lastTapRight = 0;

        videoWrapper.addEventListener('touchstart', function (e) {
            const touch = e.touches[0];
            const touchX = touch.clientX;
            const screenWidth = window.innerWidth;
            const now = new Date().getTime();

            if (touchX < screenWidth / 2) {
                if (now - lastTapLeft < 300) {
                    videoElement.currentTime = Math.max(0, videoElement.currentTime - 5);
                }
                lastTapLeft = now;
            } else {
                if (now - lastTapRight < 300) {
                    videoElement.currentTime = Math.min(videoElement.duration, videoElement.currentTime + 5);
                }
                lastTapRight = now;
            }
        });
    }
});

// ==============================
// 🛡️ Seguridad: bloquear clic derecho y atajos
// ==============================
document.addEventListener("contextmenu", (e) => e.preventDefault());

document.addEventListener("keydown", (e) => {
    if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I") ||
        (e.ctrlKey && e.key === "u") ||
        e.ctrlKey || e.shiftKey || e.altKey
    ) {
        e.preventDefault();
    }
});

// ==============================
// 🔗 Integración con apps externas
// ==============================
const streamlink = window.location.href.replace("/player/", "/stream/");

function vlc_player() {
    const open = streamlink.replace(/^https?:\/\//, '');
    window.location.href = `vlc://${open}`;
}

function mx_player() {
    const open = streamlink.replace(/^https?:\/\//, '');
    window.location.href = `intent://${open}#Intent;package=com.mxtech.videoplayer.ad;action=android.intent.action.VIEW;end`;
}

function n_player() {
    const open = streamlink.replace(/^https?:\/\//, '');
    window.location.href = `intent://${open}#Intent;package=com.newin.nplayer.pro;action=android.intent.action.VIEW;end`;
}
