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

// Function to dynamically load subtitles
function loadSubtitles(player, messageId) {
    const baseUrl = window.location.origin;
    const subtitleUrl = `${baseUrl}/stream-subtitle/${messageId}`;
    
    // First check if subtitle is available
    fetch(subtitleUrl, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          console.log("✅ Subtitles available, loading...");
          addSubtitleTrack(player, subtitleUrl);
        } else if (response.status === 202) {
          console.log("⏳ Subtitles are being processed, will retry in 5 seconds...");
          setTimeout(() => loadSubtitles(player, messageId), 5000);
        } else {
          console.log("❌ No subtitles available for this video");
        }
      })
      .catch(error => {
        console.error("Error checking subtitle availability:", error);
      });
  }

// Function to add subtitle track to player
function addSubtitleTrack(player, subtitleUrl) {
    // Remove any existing subtitle tracks
    const existingTracks = player.media.querySelectorAll('track');
    existingTracks.forEach(track => track.remove());
    
    // Create and add new track element
    const track = document.createElement('track');
    track.kind = 'subtitles';
    track.label = 'Español';
    track.srclang = 'es';
    track.src = subtitleUrl;
    track.default = true;
    
    player.media.appendChild(track);
    
    // Force Plyr to recognize the new track
    const currentTime = player.currentTime;
    const wasPlaying = !player.paused;
    
    // Briefly pause to let the track load
    player.pause();
    
    // Wait a moment for the track to be recognized
    setTimeout(() => {
      // Enable captions using the correct method
      if (typeof player.toggleCaptions === 'function') {
        player.toggleCaptions(true);
      }
      
      // Restore playback state
      player.currentTime = currentTime;
      if (wasPlaying) {
        player.play();
      }
    }, 300);
    
    console.log("✅ Subtitles loaded successfully");
  }

// ==============================
// 🎬 Configurar reproductor Plyr
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    // Check if Plyr is already defined (e.g., through a script tag)
    if (typeof Plyr === 'undefined') {
      console.error('Plyr is not defined. Make sure you have included the Plyr library in your HTML.');
      return; // Exit if Plyr is not defined
    }
  
    const controls = [
      'play-large', 'rewind', 'play', 'fast-forward',
      'progress', 'current-time', 'duration',
      'mute', 'volume', 'captions',
      'settings', 'pip', 'airplay', 'fullscreen'
    ];
    
    const player = new Plyr('.player', {
      controls,
      settings: ['speed', 'quality', 'captions'],
      autoplay: true,
    });
    
    // Get message ID from your hidden element
    const messageId = document.getElementById("messageId").innerText.trim();
    
    // Once player is ready, load subtitles
    player.on('ready', () => {
      loadSubtitles(player, messageId);
    });
    
    // Add a button to manually reload subtitles
    const reloadSubtitlesButton = document.createElement('button');
    reloadSubtitlesButton.className = 'magnet';
    reloadSubtitlesButton.innerHTML = '<img src="https://i.ibb.co/px6fQs1/vlc.png" alt="">cargar subtítulos';
    reloadSubtitlesButton.addEventListener('click', () => {
      loadSubtitles(player, messageId);
    });
    
    // Add the button to your downloadBtn container
    document.querySelector('.downloadBtn').appendChild(reloadSubtitlesButton);
  });
  
  console.log("Dynamic subtitle loading code ready to be integrated into your project");
  
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
        const a = document.createElement("a");
        a.href = `vlc://${open}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

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
        const a = document.createElement("a");
        a.href = `intent://${open}#Intent;package=com.mxtech.videoplayer.ad;action=android.intent.action.VIEW;end`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

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
        const a = document.createElement("a");
        a.href = `intent://${open}#Intent;package=com.newin.nplayer.pro;action=android.intent.action.VIEW;end`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
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
