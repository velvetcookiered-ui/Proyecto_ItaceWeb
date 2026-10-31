document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Directorio Docente (si existe el contenedor en la página)
    initDocenteDirectory();

    // 2. Inicializar Reproductores de Himnos Independientes
    initAnthemPlayers();
});

// --- LÓGICA DEL DIRECTORIO DOCENTE CON JSON ---
async function initDocenteDirectory() {
    const searchInput = document.getElementById('docente-search');
    const filterAcademy = document.getElementById('filter-academy');
    const container = document.getElementById('docentes-grid');
    const noResultsMsg = document.getElementById('no-docentes-msg');

    if (noResultsMsg) {
    noResultsMsg.classList.toggle(
        'hidden',
        data.length !== 0
    );
    }

    if (data.length === 0) {
    return;
    }

    if (!container) return;

    let docentes = [];

    try {
        const response = await fetch('datos/docentes.json');
        docentes = await response.json();
    } catch (error) {
        console.error("Error al cargar el archivo JSON de docentes:", error);
        container.innerHTML = `<p class="text-red-600 text-center col-span-full">Error al cargar la información del directorio docente.</p>`;
        return;
    }

    function renderDocentes(data) {
        container.innerHTML = '';
        if (data.length === 0) {
            noResultsMsg.classList.remove('hidden');
            return;
        } else {
            noResultsMsg.classList.add('hidden');
        }

        data.forEach(doc => {
            const card = document.createElement('div');
            card.className = "institutional-card flex flex-col justify-between animate-fade-in";
            card.innerHTML = `
                <div>
                    <div class="flex items-center space-x-4 mb-4">
                        <div class="w-14 h-14 bg-itace-vino text-white rounded-full flex items-center justify-center font-bold text-xl border-2 border-itace-dorado">
                            ${doc.nombre.charAt(4)}
                        </div>
                        <div>
                            <h4 class="font-heading font-bold text-gray-900">${doc.nombre}</h4>
                            <span class="text-xs font-semibold text-itace-vino bg-itace-vino/10 px-2.5 py-0.5 rounded-full">${doc.academia}</span>
                        </div>
                    </div>
                    <div class="space-y-1 text-xs text-gray-600 mb-4">
                        <p><strong class="text-gray-800">Materias:</strong> ${doc.materias}</p>
                        <p><strong class="text-gray-800">Semestre:</strong> ${doc.semestre}</p>
                        <p class="mt-2 text-gray-500 italic">${doc.perfil}</p>
                    </div>
                </div>
                <span class="text-[10px] text-gray-400 border-t pt-2 uppercase tracking-wider">Personal Autorizado ITACE</span>
            `;
            container.appendChild(card);
        });
    }

    // Renderizado inicial
    renderDocentes(docentes);

    // Eventos de búsqueda y filtrado dinámico
    if (searchInput && filterAcademy) {
        const filterData = () => {
            const query = searchInput.value.toLowerCase();
            const academy = filterAcademy.value;

            const filtered = docentes.filter(doc => {
                const matchName = doc.nombre.toLowerCase().includes(query) || doc.materias.toLowerCase().includes(query);
                const matchAcademy = academy === "" || doc.academia === academy;
                return matchName && matchAcademy;
            });

            renderDocentes(filtered);
        };

        searchInput.addEventListener('input', filterData);
        filterAcademy.addEventListener('change', filterData);
    }
}

// --- REPRODUCTORES INDEPENDIENTES PARA HIMNOS ---
function initAnthemPlayers() {
    setupAudioPlayer('himno-itace-audio', 'play-itace-btn', 'pause-itace-btn', 'progress-itace', 'time-itace');
    setupAudioPlayer('himno-tamaulipas-audio', 'play-tam-btn', 'pause-tam-btn', 'progress-tam', 'time-tam');
}

function setupAudioPlayer(audioId, playBtnId, pauseBtnId, progressId, timeId) {
    const audio = document.getElementById(audioId);
    const playBtn = document.getElementById(playBtnId);
    const pauseBtn = document.getElementById(pauseBtnId);
    const progressBar = document.getElementById(progressId);
    const timeDisplay = document.getElementById(timeId);

    if (!audio) return;

    playBtn.addEventListener('click', () => {
        audio.play();
        playBtn.classList.add('bg-itace-vino', 'text-white');
    });

    pauseBtn.addEventListener('click', () => {
        audio.pause();
    });

    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const percent = (audio.currentTime / audio.duration) * 100;
            if (progressBar) progressBar.value = percent;
            if (timeDisplay) {
                const mins = Math.floor(audio.currentTime / 60);
                const secs = Math.floor(audio.currentTime % 60);
                timeDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
            }
        }
    });

    if (progressBar) {
        progressBar.addEventListener('input', () => {
            const seekTime = (progressBar.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        });
    }
}