# Moon Bites — sitio estático

Implementación del prototipo `project/Moon Bites.dc.html` (handoff de Claude Design).
HTML/CSS/JS plano, sin build, sin dependencias. Se sube tal cual a cualquier hosting.

```
site/
  index.html          markup completo, con claves data-i18n
  favicon.svg
  css/styles.css      tokens, layout y animaciones
  js/config.js        ← DATOS DE CONTACTO (lo único que hay que editar)
  js/i18n.js          todo el copy, EN y ES
  js/main.js          idioma, parallax, revelados, configurador, formulario
  img/                16 fotos del cliente (las ya optimizadas del bundle)
```

## Cómo verlo en local

Los scripts se cargan como archivos normales, así que `file://` también funciona,
pero lo más fiel es servirlo:

```bash
cd site && python3 -m http.server 8000
# http://localhost:8000
```

## ⚠️ Pendientes antes de producción

Ninguno de estos es un bug: son datos que el prototipo nunca tuvo y que yo **no
inventé**. Todos viven en `js/config.js`.

| Qué | Valor actual | Qué hacer |
|---|---|---|
| WhatsApp | `10000000000` | Número real, solo dígitos, formato internacional sin `+` |
| SMS | `10000000000` | Ídem. Suele ser la misma línea |
| Correo | `hello@bitesworld.net` | **Confirmar que existe** — salió del dominio, no fue verificado |
| Instagram | `https://www.instagram.com/` | URL del perfil real |
| Formulario | `formEndpoint: null` | Ver abajo |

**El formulario hoy no envía nada a ninguna parte.** Con `formEndpoint: null`
muestra el estado de confirmación en pantalla y ahí queda: el lead se pierde.
Apuntando `formEndpoint` a una URL, el formulario hace `POST` con los campos en
JSON (`name`, `email`, `date`, `guests`, `city`, `occasion`, `details`, más
`language` y `page`). Eso funciona directo con Formspree, Web3Forms, Basin o una
función de Netlify. No dejé ninguna clave ni cuenta creada.

Además, el logo es un **lockup vectorial** dibujado para el handoff (el PNG
original vive en el servidor del cliente y no se pudo empaquetar). Está definido
una sola vez, como `<symbol id="mb-logo">` al inicio de `index.html`; para
cambiarlo por el archivo real basta reemplazar ese bloque.

## Bilingüe EN/ES

El idioma se elige con el switch `EN | ES` del nav. Al cargar, el sitio decide en
este orden: `localStorage` → parámetro `?lang=es` → idioma del navegador → `en`.

Todo el texto visible está en `js/i18n.js`, ninguno en el markup — el HTML solo
lleva claves:

| Atributo | Efecto |
|---|---|
| `data-i18n` | `textContent` |
| `data-i18n-html` | `innerHTML` (para los `<em>` dentro de los títulos) |
| `data-i18n-ph` | `placeholder` |
| `data-i18n-alt` | `alt` de imagen |
| `data-i18n-aria` | `aria-label` |
| `data-i18n-content` | `content` de un `<meta>` |

Editar un texto = editar `i18n.js`. Agregar un tercer idioma = agregar un bloque
más con las mismas claves.

Una nota de SEO: al ser una sola URL que cambia de idioma por JS, Google indexa
principalmente la versión EN. Si el posicionamiento en español importa, hay que
pasar a dos URLs (`/` y `/es/`) con `hreflang`. Es un cambio acotado sobre esta
misma base, pero no está hecho.

## Notas de implementación

- **Movimiento**: un solo `requestAnimationFrame` maneja nav, parallax,
  revelados y contadores. `prefers-reduced-motion` desactiva todo y muestra el
  contenido estático.
- **Configurador**: la selección se guarda por índice, no por etiqueta, así que
  cambiar de idioma conserva la caja armada en vez de resetearla.
- **Galería**: arrastre con mouse implementado a mano (en táctil el scroll es
  nativo), porque el copy dice "arrastra para explorar".
- **Testimonios**: los del prototipo son texto de diseño, no reseñas reales
  verificadas. Antes de publicar conviene reemplazarlos por testimonios reales o
  quitar las atribuciones de ciudad.
- Las cifras (200 porciones/hora, 50 por plancha, 12 toppings, 90 min) vienen del
  prototipo. Confirmar con el cliente que son correctas.
