# Pruebas de calidad (Etapa 7)

Ejecutadas con Chromium (Playwright) contra un servidor local, en escritorio (1280×800) y móvil (375×740), con la red externa bloqueada para comprobar que el sitio no depende de ella. Capturas en esta carpeta.

| Prueba | Resultado |
|---|---|
| 15 páginas abren sin errores de JavaScript | OK |
| Sin desplazamiento horizontal (escritorio y móvil) | OK |
| Un solo `<h1>` por página; todas las imágenes con `alt` | OK |
| Directorio: carga desde `datos/docentes.json` | OK |
| Búsqueda por nombre y por materia (ignora acentos) | OK |
| Filtro por academia, mensaje sin coincidencias y «Limpiar búsqueda» | OK |
| Galería: filtros por categoría | OK |
| Lightbox: abre, navega con flechas, cierra con Esc, devuelve el foco | OK |
| FAQ: búsqueda y mensaje sin resultados | OK |
| Formulario: valida campos vacíos y confirma envío (demostración) | OK |
| Modo oscuro (se recuerda la elección) | OK |
| Menú móvil y submenú «Más» | OK |
| Himnos (con archivos de prueba): sin autoplay, un himno pausa al otro, volumen independiente | OK |
| Himnos sin archivo: aviso claro en lugar de fallar en silencio | OK |

## Pendiente antes de publicar
- Colocar `audio/himno-itace.mp3` y `audio/himno-tamaulipas.mp3` (hoy la consola muestra 404 por su ausencia).
- Sustituir las imágenes ilustrativas por fotografías autorizadas.
- Sustituir `datos/docentes.json` por el listado autorizado.
- Validar con el plantel los datos marcados «Por validar».
- Probar en un teléfono real y ejecutar Lighthouse.
