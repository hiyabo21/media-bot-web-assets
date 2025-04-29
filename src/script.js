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
        'play-large',
        'rewind',         // ⏪ Añade botón de retroceso 10s
        'play',
        'fast-forward',   // ⏩ Añade botón de avance 10s
        'progress',
        'current-time',
        'duration',
        //'mute',
        //'volume',
        'captions',
        'settings',
        'pip',
        'airplay',
        'fullscreen'
    ];

    Plyr.setup('.player', {
        controls,
        settings: ['speed', 'quality', 'captions'],
        seekTime: 10 // 👈 define cuánto avanza/retrocede cada flecha
    });

    // ❌ Eliminamos el doble toque/tap porque ya no lo necesitamos
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

    async function copyStreamLink() {
        const messageId = document.getElementById("messageId").innerText.trim();
        const baseUrl = window.location.origin;
        const tokenUrl = `${baseUrl}/secure_link/${messageId}`;

        try {
            const response = await fetch(tokenUrl);
            if (!response.ok) throw new Error("No se pudo generar el link.");

            const streamLink = await response.text();

            // ✅ Método moderno si está disponible y seguro
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(streamLink);
            } else {
                // ⚠️ Fallback clásico
                const textArea = document.createElement("textarea");
                textArea.value = streamLink;
                textArea.style.position = "fixed"; // evitar scroll
                textArea.style.opacity = 0;
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            }

            alert("✅ ¡Enlace de streaming copiado!\nPégalo en VLC o PotPlayer.");
        } catch (error) {
            alert("❌ Error al copiar el enlace: " + error.message);
        }
    }

async function vlc_player() {
    const messageId = document.getElementById("messageId").innerText.trim();
    const baseUrl = window.location.origin;
    const tokenUrl = `${baseUrl}/secure_link/${messageId}`;

    try {
        const response = await fetch(tokenUrl);
        if (!response.ok) throw new Error("No se pudo generar el link.");

        const streamLink = await response.text();
        const open = streamLink.replace(/^https?:\/\//, '');

        // Intenta abrir VLC
        window.location.href = `vlc://${open}`;

        // También copia el link al portapapeles
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(streamLink);
            alert("✅ Enlace para VLC copiado. Si no se abrió automáticamente, pégalo en VLC.");
        } else {
            alert("📋 Copia manualmente este enlace para VLC:\n" + streamLink);
        }
    } catch (error) {
        alert("❌ Error al generar el enlace para VLC: " + error.message);
    }
}

async function mx_player() {
    const messageId = document.getElementById("messageId").innerText.trim();
    const baseUrl = window.location.origin;
    const tokenUrl = `${baseUrl}/secure_link/${messageId}`;

    try {
        const response = await fetch(tokenUrl);
        if (!response.ok) throw new Error("No se pudo generar el link.");

        const streamLink = await response.text();
        const open = streamLink.replace(/^https?:\/\//, '');

        // Abrir en MX Player
        window.location.href = `intent://${open}#Intent;package=com.mxtech.videoplayer.ad;action=android.intent.action.VIEW;end`;

        // Copia al portapapeles como respaldo
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(streamLink);
            alert("✅ Enlace para MX Player copiado. Si no se abre automáticamente, pégalo manualmente.");
        } else {
            alert("📋 Copia manualmente este enlace para MX Player:\n" + streamLink);
        }
    } catch (error) {
        alert("❌ Error al generar el enlace para MX Player: " + error.message);
    }
}

async function n_player() {
    const messageId = document.getElementById("messageId").innerText.trim();
    const baseUrl = window.location.origin;
    const tokenUrl = `${baseUrl}/secure_link/${messageId}`;

    try {
        const response = await fetch(tokenUrl);
        if (!response.ok) throw new Error("No se pudo generar el link.");

        const streamLink = await response.text();
        const open = streamLink.replace(/^https?:\/\//, '');

        // Abrir en nPlayer
        window.location.href = `intent://${open}#Intent;package=com.newin.nplayer.pro;action=android.intent.action.VIEW;end`;

        // Copia al portapapeles como respaldo
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(streamLink);
            alert("✅ Enlace para nPlayer copiado. Si no se abre automáticamente, pégalo manualmente.");
        } else {
            alert("📋 Copia manualmente este enlace para nPlayer:\n" + streamLink);
        }
    } catch (error) {
        alert("❌ Error al generar el enlace para nPlayer: " + error.message);
    }
}
