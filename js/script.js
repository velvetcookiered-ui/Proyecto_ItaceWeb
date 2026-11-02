/* =========================================================
   ITACE DIGITAL 4.0 · Script principal (sin librerías)
   Módulos: tema · menú · revelado y "volver arriba" · contadores ·
   directorio docente (JSON) · filtros por categoría · FAQ ·
   lightbox · reproductores de audio · formulario de contacto.
   Cada módulo se activa solo si encuentra sus elementos en la página.
   ========================================================= */
(function () {
    'use strict';

    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
    const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // localStorage puede lanzar errores (modo privado, bloqueo): se envuelve.
    const guardar = (k, v) => { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } };
    const leer = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };

    // Íconos SVG en línea (no dependen de ninguna fuente externa)
    const ICONO = {
        luna: '<path d="M21 14.5A9 9 0 0 1 9.5 3a9 9 0 1 0 11.5 11.5z"/>',
        sol: '<path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM11 1h2v3h-2zM11 20h2v3h-2zM1 11h3v2H1zM20 11h3v2h-3zM4.2 5.6l1.4-1.4 2.1 2.1-1.4 1.4zM16.3 17.7l1.4-1.4 2.1 2.1-1.4 1.4zM4.2 18.4l2.1-2.1 1.4 1.4-2.1 2.1zM16.3 6.3l2.1-2.1 1.4 1.4-2.1 2.1z"/>',
        menu: '<path d="M3 5h18v2H3zM3 11h18v2H3zM3 17h18v2H3z"/>',
        cerrar: '<path d="M5.7 4.3L12 10.6l6.3-6.3 1.4 1.4-6.3 6.3 6.3 6.3-1.4 1.4-6.3-6.3-6.3 6.3-1.4-1.4 6.3-6.3-6.3-6.3z"/>',
        play: '<path d="M8 5v14l11-7z"/>',
        pausa: '<path d="M6 5h4v14H6zM14 5h4v14h-4z"/>'
    };
    const svg = (nombre) => `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONO[nombre]}</svg>`;

    /* ---------- 1. Tema claro / oscuro ---------- */
    function iniciarTema() {
        const raiz = document.documentElement;
        const boton = $('#btn-tema');
        const guardado = leer('itace-tema');
        if (guardado === 'claro' || guardado === 'oscuro') raiz.setAttribute('data-tema', guardado);

        const esOscuro = () => {
            const t = raiz.getAttribute('data-tema');
            return t ? t === 'oscuro' : window.matchMedia('(prefers-color-scheme: dark)').matches;
        };
        const pintar = () => {
            if (!boton) return;
            const oscuro = esOscuro();
            boton.innerHTML = svg(oscuro ? 'sol' : 'luna');
            boton.setAttribute('aria-pressed', String(oscuro));
            boton.setAttribute('aria-label', oscuro ? 'Activar modo claro' : 'Activar modo oscuro');
        };
        pintar();
        if (boton) boton.addEventListener('click', () => {
            const nuevo = esOscuro() ? 'claro' : 'oscuro';
            raiz.setAttribute('data-tema', nuevo);
            guardar('itace-tema', nuevo);
            pintar();
        });
    }

    /* ---------- 2. Menú móvil y submenú "Más" ---------- */
    function iniciarMenu() {
        const toggle = $('#nav-toggle');
        const nav = $('#navegacion');
        const mas = $('.menu-mas > button');

        const cerrarMas = () => { if (mas) mas.setAttribute('aria-expanded', 'false'); };
        const cerrarNav = (devolverFoco) => {
            if (!nav || !toggle) return;
            nav.classList.remove('abierto');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-label', 'Abrir menú');
            toggle.innerHTML = svg('menu');
            if (devolverFoco) toggle.focus();
        };

        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                const abrir = !nav.classList.contains('abierto');
                nav.classList.toggle('abierto', abrir);
                toggle.setAttribute('aria-expanded', String(abrir));
                toggle.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
                toggle.innerHTML = svg(abrir ? 'cerrar' : 'menu');
            });
        }
        if (mas) {
            mas.addEventListener('click', (e) => {
                e.stopPropagation();
                mas.setAttribute('aria-expanded', String(mas.getAttribute('aria-expanded') !== 'true'));
            });
        }
        document.addEventListener('click', (e) => { if (!e.target.closest('.menu-mas')) cerrarMas(); });
        document.addEventListener('keydown', (e) => {
            if (e.key !== 'Escape') return;
            if (mas && mas.getAttribute('aria-expanded') === 'true') { cerrarMas(); mas.focus(); }
            else if (nav && nav.classList.contains('abierto')) cerrarNav(true);
        });
        // Al volver a pantalla ancha se restablece el menú
        window.matchMedia('(min-width: 1061px)').addEventListener('change', (e) => { if (e.matches) cerrarNav(false); });
    }

    /* ---------- 3. Revelado al hacer scroll y botón "volver arriba" ---------- */
    function iniciarRevelado() {
        const items = $$('.revelar');
        if ('IntersectionObserver' in window && !prefiereMenosMovimiento) {
            const obs = new IntersectionObserver((entradas) => {
                entradas.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visible'); obs.unobserve(en.target); } });
            }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
            items.forEach(i => obs.observe(i));
        } else {
            items.forEach(i => i.classList.add('visible'));
        }

        const subir = $('#volver-arriba');
        if (subir) {
            const mostrar = () => subir.classList.toggle('visible', window.scrollY > 500);
            window.addEventListener('scroll', mostrar, { passive: true });
            mostrar();
            subir.addEventListener('click', () => window.scrollTo({ top: 0, behavior: prefiereMenosMovimiento ? 'auto' : 'smooth' }));
        }
    }

    /* ---------- 4. Contadores animados (portada) ---------- */
    function iniciarContadores() {
        $$('[data-contar]').forEach(el => {
            const meta = Number(el.dataset.contar);
            if (!isFinite(meta)) return;
            const formato = (n) => n.toLocaleString('es-MX');
            if (prefiereMenosMovimiento) { el.textContent = formato(meta); return; }
            const inicio = performance.now(), duracion = 1400;
            const paso = (t) => {
                const p = Math.min((t - inicio) / duracion, 1);
                el.textContent = formato(Math.round(meta * (1 - Math.pow(1 - p, 3))));
                if (p < 1) requestAnimationFrame(paso);
            };
            requestAnimationFrame(paso);
        });
    }

    /* ---------- 5. Directorio docente: JSON + búsqueda + filtro ---------- */
    async function iniciarDocentes() {
        const rejilla = $('#docentes-grid');
        if (!rejilla) return;

        const buscador = $('#docente-search');
        const selector = $('#filter-academy');
        const limpiar = $('#clear-search-btn');
        const vacio = $('#no-docentes-msg');
        const contador = $('#docentes-contador');
        const formulario = $('#docentes-form');
        const urlJson = rejilla.dataset.json || '../datos/docentes.json';
        const base = urlJson.replace(/datos\/[^/]*$/, '');   // carpeta raíz relativa para las imágenes

        let docentes = [];
        try {
            const resp = await fetch(urlJson);
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            docentes = await resp.json();
            if (!Array.isArray(docentes)) throw new Error('Formato inesperado');
        } catch (err) {
            console.error('No se pudo cargar docentes.json:', err);
            if (contador) contador.textContent = '';
            rejilla.innerHTML = '<div class="aviso" role="alert" style="grid-column:1/-1"><i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i><p style="margin:0"><strong>No se pudo cargar el directorio.</strong> ' +
                'Si abriste el archivo con doble clic, el navegador bloquea la lectura del JSON. Ejecuta un servidor local ' +
                '(por ejemplo <code>python3 -m http.server</code>) o consulta la versión publicada.</p></div>';
            return;
        }

        const esc = (t) => String(t ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
        // Búsqueda sin distinguir mayúsculas ni acentos ("fisica" encuentra "Física")
        const normalizar = (t) => String(t ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

        if (selector) {
            [...new Set(docentes.map(d => d.academia).filter(Boolean))]
                .sort((a, b) => a.localeCompare(b, 'es'))
                .forEach(a => selector.add(new Option(a, a)));
        }

        function pintar(lista) {
            rejilla.innerHTML = '';
            const hay = lista.length > 0;
            if (vacio) vacio.hidden = hay;
            if (contador) contador.textContent = hay
                ? `Mostrando ${lista.length} de ${docentes.length} docentes`
                : `Sin resultados (0 de ${docentes.length} docentes)`;
            const frag = document.createDocumentFragment();
            lista.forEach((d, i) => {
                const art = document.createElement('article');
                art.className = 'tarjeta tarjeta-docente';
                art.style.animationDelay = (i * 60) + 'ms';
                const foto = d.avatar ? base + d.avatar : '';
                art.innerHTML = `
                    <div class="docente-cab">
                        <img class="avatar" src="${esc(foto)}" alt="Avatar genérico de ${esc(d.nombre)}" width="64" height="64" loading="lazy">
                        <div>
                            <h3 style="margin:0;font-size:1rem">${esc(d.nombre)}</h3>
                            <span class="etiqueta-academia">${esc(d.academia)}</span>
                        </div>
                    </div>
                    <div class="docente-datos">
                        <p><strong>Materias:</strong> ${esc(d.materias)}</p>
                        <p><strong>Semestres:</strong> ${esc(d.semestre) || 'Por confirmar'}</p>
                        ${d.perfil ? `<p><em>${esc(d.perfil)}</em></p>` : ''}
                    </div>
                    ${d.demo ? '<span class="insignia pendiente">Dato de ejemplo</span>' : ''}`;
                frag.appendChild(art);
            });
            rejilla.appendChild(frag);
        }

        function filtrar() {
            const q = normalizar(buscador ? buscador.value.trim() : '');
            const academia = selector ? selector.value : '';
            pintar(docentes.filter(d =>
                (!q || normalizar(d.nombre).includes(q) || normalizar(d.materias).includes(q)) &&
                (!academia || d.academia === academia)));
        }

        pintar(docentes);
        if (buscador) buscador.addEventListener('input', filtrar);
        if (selector) selector.addEventListener('change', filtrar);
        if (formulario) formulario.addEventListener('submit', (e) => e.preventDefault());
        if (limpiar) limpiar.addEventListener('click', () => {
            if (buscador) buscador.value = '';
            if (selector) selector.value = '';
            pintar(docentes);
            if (buscador) buscador.focus();
        });
    }

    /* ---------- 6. Filtros por categoría (galería, noticias, eventos, proyectos) ---------- */
    function iniciarFiltros() {
        $$('.filtros[data-filtro-grupo]').forEach(grupo => {
            const destino = document.getElementById(grupo.dataset.filtroGrupo);
            if (!destino) return;
            const botones = $$('.chip[data-filtro]', grupo);
            const vivo = grupo.nextElementSibling && grupo.nextElementSibling.classList.contains('estado-filtro')
                ? grupo.nextElementSibling : null;

            botones.forEach(btn => btn.addEventListener('click', () => {
                botones.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
                const cat = btn.dataset.filtro;
                let visibles = 0;
                $$('[data-cat]', destino).forEach(item => {
                    const mostrar = cat === 'todos' || item.dataset.cat === cat;
                    item.classList.toggle('oculto', !mostrar);
                    if (mostrar) { visibles++; item.classList.add('visible'); }
                });
                if (vivo) vivo.textContent = `Filtro «${btn.textContent.trim()}»: ${visibles} elemento(s) visibles.`;
            }));
        });
    }

    /* ---------- 7. Preguntas frecuentes: búsqueda ---------- */
    function iniciarFaq() {
        const campo = $('#faq-search');
        if (!campo) return;
        const preguntas = $$('details.faq');
        const vacio = $('#faq-vacio');
        const normalizar = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        campo.addEventListener('input', () => {
            const q = normalizar(campo.value.trim());
            let visibles = 0;
            preguntas.forEach(p => {
                const coincide = !q || normalizar(p.textContent).includes(q);
                p.hidden = !coincide;
                if (q && coincide) p.open = true;
                if (coincide) visibles++;
            });
            if (vacio) vacio.hidden = visibles > 0;
        });
    }

    /* ---------- 8. Lightbox (visor ampliado con <dialog>) ---------- */
    function iniciarLightbox() {
        const caja = $('#lightbox');
        if (!caja || typeof caja.showModal !== 'function') return;
        const img = $('img', caja);
        const leyenda = $('.lightbox-leyenda', caja);
        let activo = null;      // botón que abrió el visor (para devolver el foco)
        let indice = 0;

        const lista = () => $$('.galeria-item:not(.oculto) .galeria-boton');
        function mostrar(i) {
            const botones = lista();
            if (!botones.length) return;
            indice = (i + botones.length) % botones.length;
            const b = botones[indice];
            const mini = $('img', b);
            img.src = b.dataset.lightbox;
            img.alt = mini ? mini.alt : '';
            leyenda.textContent = b.dataset.leyenda || '';
        }

        document.addEventListener('click', (e) => {
            const b = e.target.closest('.galeria-boton');
            if (!b) return;
            activo = b;
            mostrar(lista().indexOf(b));
            caja.showModal();
        });
        $('.lightbox-cerrar', caja).addEventListener('click', () => caja.close());
        $('.lb-ant', caja).addEventListener('click', () => mostrar(indice - 1));
        $('.lb-sig', caja).addEventListener('click', () => mostrar(indice + 1));
        caja.addEventListener('click', (e) => { if (e.target === caja) caja.close(); });   // clic en el fondo
        caja.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); mostrar(indice - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); mostrar(indice + 1); }
        });
        caja.addEventListener('close', () => { img.removeAttribute('src'); if (activo) activo.focus(); });
    }

    /* ---------- 9. Reproductores de audio independientes ---------- */
    const formatoTiempo = (s) => {
        if (!isFinite(s)) return '0:00';
        const m = Math.floor(s / 60), seg = Math.floor(s % 60);
        return `${m}:${seg < 10 ? '0' : ''}${seg}`;
    };

    function iniciarAudio() {
        const reproductores = $$('.reproductor[data-audio]');
        const audios = [];

        reproductores.forEach(rep => {
            const audio = $('audio', rep);
            const play = $('.btn-play', rep);
            const progreso = $('.rng-progreso', rep);
            const volumen = $('.rng-volumen', rep);
            const actual = $('.t-actual', rep);
            const total = $('.t-total', rep);
            const estado = $('.estado-audio', rep);
            const nombre = rep.dataset.nombre || 'grabación';
            if (!audio || !play || !progreso) return;

            audios.push(audio);
            rep.classList.add('listo');            // oculta los controles nativos: se usan los propios
            audio.removeAttribute('controls');
            audio.removeAttribute('autoplay');      // nunca se reproduce solo
            audio.volume = volumen ? Number(volumen.value) : 0.8;
            progreso.disabled = true;
            play.innerHTML = svg('play');

            const aviso = (txt, error) => { estado.textContent = txt; estado.classList.toggle('error', !!error); };
            const fallo = () => aviso(`No se encontró el archivo de audio «${rep.dataset.archivo}». Colócalo en la carpeta audio/ para activar este reproductor.`, true);

            const sinArchivo = () => audio.error || audio.networkState === HTMLMediaElement.NETWORK_NO_SOURCE;
            const reiniciarBoton = () => {
                play.classList.remove('sonando');
                play.innerHTML = svg('play');
                play.setAttribute('aria-label', `Reproducir ${nombre}`);
            };

            play.addEventListener('click', async () => {
                if (audio.paused) {
                    // Sin archivo, play() queda pendiente para siempre: se avisa antes de intentarlo
                    if (sinArchivo()) { fallo(); return; }
                    audios.forEach(a => { if (a !== audio) a.pause(); });    // un himno a la vez
                    try { await audio.play(); }
                    catch (e) {
                        reiniciarBoton();
                        if (sinArchivo()) fallo(); else aviso('El navegador no pudo reproducir la grabación.', true);
                    }
                } else {
                    audio.pause();
                }
            });
            audio.addEventListener('play', () => {
                play.classList.add('sonando');
                play.innerHTML = svg('pausa');
                play.setAttribute('aria-label', `Pausar ${nombre}`);
                aviso('Reproduciendo…');
            });
            const alDetener = () => {
                play.classList.remove('sonando');
                play.innerHTML = svg('play');
                play.setAttribute('aria-label', `Reproducir ${nombre}`);
                if (!estado.classList.contains('error')) aviso(audio.ended ? 'Reproducción finalizada.' : 'En pausa.');
            };
            audio.addEventListener('pause', alDetener);
            audio.addEventListener('ended', alDetener);
            audio.addEventListener('loadedmetadata', () => {
                total.textContent = formatoTiempo(audio.duration);
                progreso.disabled = false;
                aviso('Pulsa reproducir para escuchar la grabación.');
            });
            audio.addEventListener('timeupdate', () => {
                if (audio.duration) {
                    progreso.value = (audio.currentTime / audio.duration) * 100;
                    progreso.setAttribute('aria-valuetext', `${formatoTiempo(audio.currentTime)} de ${formatoTiempo(audio.duration)}`);
                }
                actual.textContent = formatoTiempo(audio.currentTime);
            });
            progreso.addEventListener('input', () => { if (audio.duration) audio.currentTime = (progreso.value / 100) * audio.duration; });
            if (volumen) volumen.addEventListener('input', () => { audio.volume = Number(volumen.value); });

            // Si el archivo no existe, el error ocurre en el <source>
            const origen = $('source', audio);
            if (origen) origen.addEventListener('error', fallo);
            audio.addEventListener('error', fallo);
            // Si el archivo no existe, el error pudo ocurrir antes de registrar los eventos
            setTimeout(() => { if (sinArchivo()) fallo(); }, 600);
        });
    }

    /* ---------- 10. Formulario de contacto (validación en el navegador) ---------- */
    function iniciarFormulario() {
        const form = $('#contact-form');
        if (!form) return;
        const ok = $('#form-response');
        const textos = {
            nombre: 'Escribe tu nombre completo (mínimo 3 caracteres).',
            correo: 'Escribe un correo válido, por ejemplo nombre@dominio.com.',
            mensaje: 'Cuéntanos tu consulta (mínimo 10 caracteres).'
        };
        const campos = $$('input[required], textarea[required]', form);
        const validar = (c) => {
            const valido = c.checkValidity();
            const err = document.getElementById(c.id + '-error');
            if (err) err.textContent = valido ? '' : (textos[c.name] || c.validationMessage);
            c.setAttribute('aria-invalid', String(!valido));
            return valido;
        };
        campos.forEach(c => {
            c.addEventListener('blur', () => validar(c));
            c.addEventListener('input', () => { if (c.getAttribute('aria-invalid') === 'true') validar(c); });
        });
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (ok) ok.hidden = true;
            const resultados = campos.map(validar);
            if (!resultados.every(Boolean)) { campos[resultados.indexOf(false)].focus(); return; }
            // Sitio académico: el mensaje NO se envía a ningún servidor.
            form.reset();
            campos.forEach(c => c.removeAttribute('aria-invalid'));
            if (ok) ok.hidden = false;
        });
    }

    /* ---------- Arranque ---------- */
    document.documentElement.classList.add('js');

    function arrancar() {
        iniciarTema();
        iniciarMenu();
        iniciarRevelado();
        iniciarContadores();
        iniciarDocentes();
        iniciarFiltros();
        iniciarFaq();
        iniciarLightbox();
        iniciarAudio();
        iniciarFormulario();
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', arrancar);
    else arrancar();
})();
