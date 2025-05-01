// ===============================================
// 🔧 Selección de elementos del DOM
// ===============================================
let homeBtn = document.querySelector(".home-btn");
let abtBtn = document.querySelector(".about-btn");
let dldBtn_outer = document.querySelector(".downloadBtn");
let file_name = document.querySelector(".file-name");
let about_nav = document.querySelector(".about-nav");
let contact_btn = document.querySelector(".contact-btn");
let links = document.querySelectorAll(".links a");
let chnl_link = document.querySelectorAll(".chnl-link a");
let abt_chnl = document.querySelector(".abt-chnl");
let contact = document.querySelectorAll(".contact a");
let footer = document.querySelector("footer");

// ===============================================
// ✏️ Variables de estado
// ===============================================
let timer = 0;

// Activa por defecto el botón de inicio
homeBtn.classList.add('active');

// ===============================================
// 🔁 Manejo de navegación (eventos de botones)
// ===============================================

// 👉 Botón "About"
abtBtn.addEventListener("click", () => {
    dldBtn_outer.style.display = "none";
    file_name.style.display = "none";
    footer.style.display = "none";
    about_nav.style.display = "block";
    about_nav.style.animation = "strtLoad 1s ease 0s forwards";
});

// 👉 Botón "Home"
homeBtn.addEventListener("click", () => {
    dldBtn_outer.style.display = "flex";
    file_name.style.display = "block";
    footer.style.display = "block";
    about_nav.style.display = "none";
    about_nav.style.animation = "strtLoad 1s ease 0s forwards";
    window.location.href = "#main";
});

// 👉 Animación en links de "About Channel"
abt_chnl.addEventListener("click", () => {
    timer = 1;
    chnl_link.forEach((i) => {
        i.style.animation = `strtLoad 1s ease ${timer}s forwards, linksBtnAn 2s ease ${timer}s infinite`;
        timer += 0.3;
    });
    timer = 0;
});

// ===============================================
// 📥 Botones desde sección inferior y footer
// ===============================================

function bot_btn_clicked() {
    const about_btn = document.querySelector(".about-btn");
    const links_nryt = document.querySelectorAll('.nryt a');
    const links_about = document.querySelectorAll('.about-nav a');
    const wlcm = document.querySelector(".wlcm");

    timer = 1;
    bot_links.forEach((i) => {
        i.style.animation = `linksBtnAn 2s ease ${timer}s infinite, strtLoad 1s ease ${timer}s forwards`;
        timer += 0.3;
    });
    timer = 0;

    dldBtn_outer.style.display = "none";
    file_name.style.display = "none";
    footer.style.display = "none";
    about_nav.style.display = "block";
    about_nav.style.animation = "strtLoad 1s ease 0s forwards";

    links_nryt.forEach(link => link.classList.remove('active'));
    about_btn.classList.add('active');

    links_about.forEach(link => link.classList.remove('active'));
    wlcm.classList.add('active');

    bot_btn.classList.add('active');
}

function footer_btn_clicked() {
    const about_btn = document.querySelector(".about-btn");
    const links_nryt = document.querySelectorAll('.nryt a');
    const links_about = document.querySelectorAll('.about-nav a');
    const wlcm = document.querySelector(".wlcm");

    timer = 1;
    contact.forEach((i) => {
        i.style.animation = `linksBtnAn 2s ease ${timer}s infinite, strtLoad 1s ease ${timer}s forwards`;
        timer += 0.3;
    });

    timer = 1;
    bot_links.forEach((i) => {
        i.style.animation = `linksBtnAn 2s ease ${timer}s infinite, strtLoad 1s ease ${timer}s forwards`;
        timer += 0.3;
    });
    timer = 0;

    dldBtn_outer.style.display = "none";
    file_name.style.display = "none";
    footer.style.display = "none";
    about_nav.style.display = "block";
    about_nav.style.animation = "strtLoad 1s ease 0s forwards";

    links_nryt.forEach(link => link.classList.remove('active'));
    about_btn.classList.add('active');
    links_about.forEach(link => link.classList.remove('active'));
    wlcm.classList.add('active');

    contact_btn.classList.add('active');
}

// 👉 Contacto
contact_btn.addEventListener("click", () => {
    timer = 1;
    contact.forEach((i) => {
        i.style.animation = `linksBtnAn 2s ease ${timer}s infinite, strtLoad 1s ease ${timer}s forwards`;
        timer += 0.3;
    });
    timer = 0;
});

// ===============================================
// 🎨 Animaciones para botones
// ===============================================
let dldBtn = document.querySelectorAll('.downloadBtn button');
dldBtn.forEach((i) => {
    i.style.animation = `strtLoad 1s ease ${timer}s forwards, linksBtnAn 2s ease ${timer}s infinite`;
    timer += 0.3;
    i.style.setProperty("--beforestyl", `button_shine ${2 + Math.random() * 7}s ease ${Math.random() * 10}s infinite`);
});

timer = 0;
links.forEach((i) => {
    i.style.animation = `linksBtnAn 2s ease ${timer}s infinite`;
    timer += 0.3;
    i.style.setProperty("--beforestyl", `button_shine ${2 + Math.random() * 7}s ease ${Math.random() * 10}s infinite`);
});

// ===============================================
// 🧩 Funciones auxiliares de navegación
// ===============================================

function toggleWidth(element) {
    document.querySelectorAll('.about-nav a').forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}

function toggleWidthnav(element) {
    document.querySelectorAll('.nryt a').forEach(link => link.classList.remove('active'));
    document.querySelectorAll('.about-nav a').forEach(link => link.classList.remove('active'));
    element.classList.add('active');
    document.querySelector(".wlcm").classList.add('active');
}

// ===============================================
// 📝 Limitación de texto para nombre de archivo
// ===============================================
let div = document.getElementById('myDiv');
let text = div.textContent;
if (text.length > 300) {
    div.textContent = text.slice(0, 300) + "....";
}

// ==============================
// 🎬 Configurar reproductor Plyr
// ==============================
let playerInstance;

document.addEventListener("DOMContentLoaded", () => {
    const controls = [
        'play-large', 'rewind', 'play', 'fast-forward',
        'progress', 'current-time', 'duration',
        'mute', 'volume',
        'settings', 'pip', 'airplay', 'fullscreen'
    ];

    // 🔁 Instancia global
    playerInstance = new Plyr('#player', {
        controls,
        settings: ['speed', 'quality', 'captions']
    });

    loadDynamicSubtitle();
});

// ✅ Fuerza reemplazo del subtítulo actual
async function replaceSubtitle(newSubtitleUrl) {
    const video = document.getElementById("player");

    // 1. Elimina los anteriores (si existen)
    video.querySelectorAll("track").forEach(track => track.remove());

    // 2. Crea y agrega el nuevo
    const track = document.createElement("track");
    track.kind = "captions";
    track.label = "Spanish";
    track.srclang = "es";
    track.src = newSubtitleUrl;
    track.default = true;
    video.appendChild(track);

    // 3. Fuerza visibilidad
    video.textTracks[video.textTracks.length - 1].mode = "showing";

    console.log("🔁 Subtítulo reemplazado dinámicamente.");
}

// ✅ Polling automático para subtítulo inicial
async function loadDynamicSubtitle() {
    const messageIdElement = document.getElementById("messageId");
    if (!messageIdElement) return;

    const messageId = messageIdElement.innerText.trim();
    const subtitleUrl = `/stream-subtitle/${messageId}`;
    const video = document.getElementById("player");

    try {
        const res = await fetch(subtitleUrl, { method: "HEAD" });

        if (res.ok) {
            const hasSubtitle = [...video.querySelectorAll("track")]
                .some(track => track.srclang === "es");

            if (!hasSubtitle) {
                await replaceSubtitle(subtitleUrl);
            }
        } else if (res.status === 202 || res.status === 404) {
            console.log("⏳ Subtítulo no disponible aún. Reintentando...");
            setTimeout(loadDynamicSubtitle, 5000);
        } else {
            console.error("❌ Error al verificar subtítulo:", res.status);
        }
    } catch (error) {
        console.error("❌ Error al conectar al servidor de subtítulos:", error);
        setTimeout(loadDynamicSubtitle, 5000);
    }
}

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
