# ITACE Digital 4.0 (propuesta académica no oficial)

Portal institucional de demostración para el **ITACE Plantel Reynosa** (Instituto Tamaulipeco de Capacitación para el Empleo).
Proyecto de **Desarrollo Web**, Grupo **502 B**.

> **Aviso:** este sitio es una propuesta académica y **no es el sitio oficial** del ITACE. Su uso institucional requiere autorización, validación de la información, protección de datos y verificación de derechos sobre los recursos.

## Objetivo
Transformar la página anterior del ITACE en un sitio moderno, accesible, responsivo y funcional, con información verificable sobre el plantel, directorio docente con búsqueda y los himnos interpretados por los estudiantes.

## Tecnologías
HTML5 semántico · CSS3 (variables, Grid, Flexbox, animaciones, modo oscuro, media queries) · JavaScript sin librerías · JSON · Font Awesome 6 y Google Fonts (CDN).

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
1. **Autoría:** nombre y apellido en `paginas/creditos.html` y nombre de la carpeta (`ITACE_DIGITAL_4_NOMBRE_APELLIDO`).
2. **Docentes:** sustituir los 4 registros de ejemplo de `datos/docentes.json` por el listado autorizado (`"validado": true`). Fotos opcionales en `img/docentes/`.
3. **Himnos:** agregar `audio/himno-itace.mp3` y `audio/himno-tamaulipas.mp3` y completar los créditos de grabación.
4. **Fotografías:** sustituir los SVG de `img/` por fotos reales y autorizadas (WebP/JPG, ≤1600 px) y actualizar sus `alt`.
5. **Logotipo oficial:** hoy hay un monograma «ITACE»; usar el logotipo solo si está autorizado.
6. Verificar con el plantel: valores institucionales, proyectos, correo y convocatoria vigente.
7. Git/GitHub: `git init`, mínimo 5 commits significativos y publicar en GitHub Pages.

## Fuentes de información
Ver `paginas/creditos.html` (ficha SEP, decreto de creación, Manual de Organización 2014, POSTA, El Mañana, sitio oficial del ITACE).

## Autoría
Grupo 502 B · [Nombre del alumno: por completar] · Octubre de 2026
