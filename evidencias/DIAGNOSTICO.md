# Diagnóstico de la página anterior (Etapa 1)

Archivos originales conservados en `original/`.

| # | Problema encontrado | Solución en la versión 4.0 |
|---|---|---|
| 1 | Todo el sitio en **una sola página** muy larga; el menú móvil apuntaba a secciones que no existían en el menú de escritorio. | 14 páginas enlazadas, menú único y coherente, migas de pan. |
| 2 | Dependía de **Tailwind por CDN** en tiempo de ejecución (peso y bloqueo de render). | CSS propio y organizado en `css/style.css`. |
| 3 | `Scripts_B-side.js` tenía un **error**: usaba `data` antes de definirla (rompía el directorio) y buscaba IDs de audio que no existían (`himno-itace-audio`, `pause-itace-btn`). | `script.js` reescrito y probado sin errores de consola. |
| 4 | El directorio docente estaba **duplicado**: datos incrustados en el HTML y un `docentes.json` vacío. | Un solo origen: `datos/docentes.json`; el JS genera las tarjetas. |
| 5 | El botón «Limpiar búsqueda» y el filtro de galería (clase `.hidden`) dependían de Tailwind. | Atributo `hidden` y lógica propia; botón de limpiar funcional. |
| 6 | Contenido **sin verificar**: carreras (soldadura, prendas, automotriz), «30+ años», «1,500+ alumnos», dirección «Km 10.5 La Escondida», correo reynosa@itace.edu.mx. | Se reemplazó por datos verificables (SEP, decreto, Manual 2014, prensa) con la fuente indicada; lo no verificado se marca «Por validar». |
| 7 | Audios de **demostración ajenos** (SoundHelix) en lugar de los himnos del grupo. | Rutas `audio/himno-*.mp3` con aviso si falta el archivo. |
| 8 | Accesibilidad: sin enlace para saltar, sin etiquetas `for`/`id` en el formulario, contraste bajo del dorado sobre blanco, íconos sin `aria-hidden`. | Skip-link, formulario etiquetado con errores `aria-live`, dorado solo sobre fondos oscuros, foco visible 3 px. |
| 9 | Sin textos alternativos reales (galería con SVG sin descripción) ni fotografías. | `<img>` con `alt`, `width/height`, `loading="lazy"` y pies de foto. |
| 10 | Ausencia de modo oscuro, animaciones significativas y `prefers-reduced-motion` (parcial). | Modo oscuro, ≥ 5 animaciones y soporte completo de movimiento reducido. |
