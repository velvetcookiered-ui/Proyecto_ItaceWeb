## Proyecto de Programacion

> **Aviso:** este es un sitio web.


## Lenguajes
HTML5 semántico · CSS3  · JavaScript sin librerías · JSON · Font Awesome 6 y Google Fonts (CDN).

## Estructura de archivos
```
index.html                 Inicio
paginas/                   conocenos, oferta-educativa, instalaciones, vida-estudiantil,
                           proyectos, noticias, eventos, admisiones, docentes, identidad,
                           galeria, preguntas, contacto, creditos
css/style.css              Estilos (un solo archivo, con índice)
js/script.js               Comportamiento (menú, tema, docentes, filtros, lightbox, audio, formulario)
datos/docentes.json        Datos del directorio docente
img/                       Imágenes ilustrativas (SVG) -> reemplazar por fotos autorizadas
audio/                     himno-itace.mp3, himno-tamaulipas.mp3 (colocar aquí)
videos/                    Opcional
evidencias/                Diagnóstico, registro de pruebas y capturas
original/                  Copia de la versión anterior del proyecto
```

## Funcionalidades
- Navegación en 14 páginas, menú móvil accesible, enlace «Saltar al contenido» y migas de pan.
- **Directorio docente** generado desde `datos/docentes.json`: búsqueda por nombre y materia (sin distinguir acentos), filtro por academia, resultados en vivo, mensaje sin coincidencias y botón limpiar.
- Galería con filtros por categoría y **vista ampliada** (teclado: ← → Esc).
- **Dos reproductores independientes** (play/pausa, barra de progreso, volumen); sin reproducción automática; solo suena uno a la vez; avisan si falta el archivo.
- Filtros en noticias, eventos y proyectos; buscador en preguntas frecuentes.
- Formulario con validación y mensajes de error accesibles (demostración, no envía datos).
- Modo claro/oscuro, contadores animados, revelado al hacer scroll; respeta `prefers-reduced-motion`.

## Cómo ejecutar
Abre una terminal en esta carpeta y ejecuta:
```
python -m http.server 8000
```
Entra a http://localhost:8000. (El directorio docente usa `fetch`, que no funciona abriendo el archivo con doble clic.)

## Qué falta completar antes de entregar
 todo y mi penesin

## Fuentes de información
Ver `paginas/creditos.html` :( .

## Autoría
Grupo 502 B · Garza Coyac Osirys Acdeel · Octubre de 2026
