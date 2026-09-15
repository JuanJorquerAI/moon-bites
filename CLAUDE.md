# Moon Bites — contexto del proyecto

Este archivo lo carga automáticamente cualquier sesión de Claude Code que abras en
esta carpeta. Está escrito para que retomes el trabajo sin tener que releer todo
el historial de chat.

## Qué es esto

Sitio web para **Moon Bites — Grace Moments**, un carrito de poffertjes (mini
pancakes holandeses) cocinados en vivo para fiestas y eventos en Texas, EEUU.
El dominio de producción es `bitesworld.net` (hoy en modo mantención, hosteado en
GoDaddy).

## Origen: handoff desde Claude Design

Este repo empezó como un **bundle de handoff** exportado desde Claude Design
(claude.ai/design), un editor visual donde el cliente iteró el diseño antes de
pedir la implementación real. Esa parte queda documentada, no se debe editar:

- `README.md` (raíz) — instrucciones originales del bundle para el agente que
  lo implementara.
- `chats/chat1.md` — transcript completo de cómo se llegó al diseño final.
  **Vale la pena leerlo**: ahí está el razonamiento de por qué el sitio gira en
  torno a poffertjes cocinados en vivo (el ángulo "exclusivo" que lo diferencia
  de catering genérico), por qué se descartaron las dos primeras propuestas
  (`moon-bites-a.dc.html`, `moon-bites-b.dc.html` — plantillas sin personalidad),
  y las correcciones puntuales que pidió el cliente (legibilidad del logo sobre
  fotos, doble canal SMS/WhatsApp).
- `project/Moon Bites.dc.html` — el prototipo final aprobado, en el DSL de
  Claude Design (`x-dc`, `{{ }}`, `sc-for`, `style-hover`). **Es la fuente de
  verdad del diseño visual** — colores, tipografía, animaciones, copy en inglés.
  No es código de producción; es el mockup que `site/` implementa.
- `project/assets/` — 16 fotos ya optimizadas (las que usa el sitio).
  `project/uploads/` — material sin editar que mandó el cliente. **No incluido
  en este paquete** (pesaba 24 MB y no lo usa el sitio hoy); si hace falta una
  foto adicional, pídesela al usuario o revisa el Google Drive que se
  menciona en `chats/chat1.md`.

## La implementación: `site/`

Esto es lo que se sube a hosting. HTML/CSS/JS plano, **sin build, sin
dependencias, sin framework** — decisión tomada porque es una landing de una
sola página con animaciones de scroll, no necesita más andamiaje, y así se sube
tal cual a cualquier hosting (incluido GoDaddy).

```
site/
  index.html        markup — todo el texto vive en claves data-i18n, no literal
  favicon.svg
  css/styles.css     tokens + layout + animaciones (parallax, reveals, marquee…)
  js/config.js       ⚠️ datos de contacto — ver "Pendientes" abajo
  js/i18n.js          todo el copy, EN y ES completos
  js/main.js          motor de movimiento, configurador, formulario, idioma
  img/                las 16 fotos optimizadas, copiadas de project/assets/
  README.md           detalle técnico de la implementación (léelo también)
```

Decisiones de implementación ya tomadas — no las reabras sin razón nueva:

- **Bilingüe EN/ES con selector**, no páginas espejo. El idioma se decide así:
  `localStorage` → `?lang=es` en la URL → idioma del navegador → `en`. Todo el
  copy vive en `js/i18n.js`; el HTML solo tiene claves (`data-i18n`,
  `data-i18n-html`, `data-i18n-ph`, `data-i18n-alt`, `data-i18n-aria`,
  `data-i18n-content`). Para editar un texto se edita `i18n.js`, nunca el HTML.
- **El configurador "build your bite"** guarda la selección por índice, no por
  etiqueta — así cambiar de idioma no resetea la caja que el usuario armó.
- **Un solo `requestAnimationFrame`** maneja nav, parallax, reveals y contadores
  (igual que el prototipo original). Todo se desactiva bajo
  `prefers-reduced-motion`.
- **El logo es un lockup vectorial dibujado a mano**, no el archivo real del
  cliente (el original vive en el servidor de `bitesworld.net` y no se pudo
  empaquetar desde Claude Design). Está como `<symbol id="mb-logo">` una sola
  vez en `index.html`, referenciado con `<use>` en header y footer — cambiarlo
  es reemplazar ese bloque.

## ⚠️ Pendientes — no inventar estos datos

Todo vive centralizado en `site/js/config.js`, con comentarios ahí mismo:

| Dato | Estado |
|---|---|
| WhatsApp / SMS | Placeholders (`10000000000`) — faltan los números reales |
| Instagram | Placeholder genérico (`instagram.com/`) |
| Correo `hello@bitesworld.net` | Sacado del dominio, **nunca verificado** que exista |
| Envío del formulario | `formEndpoint: null` — el form confirma en pantalla pero **no entrega el lead a ninguna parte**. Hay que apuntarlo a Formspree/Web3Forms/etc., o decidir otra vía |
| Logo real | Sigue siendo el vectorial dibujado, no el del cliente |
| Testimonios | Son copy de diseño del prototipo, no reseñas reales verificadas |
| Cifras (200 porciones/hora, 50/plancha, 12 toppings, 90 min) | Vienen del prototipo — confirmar con el cliente |

**Antes de tocar cualquiera de estos, pregúntale al usuario el dato real — no
lo completes con un valor inventado.**

## Qué falta configurar (para esta sesión de Claude Code)

Este repo llegó a tu máquina como una carpeta de archivos sueltos — **no tiene
todavía**:

- `package.json` / script de desarrollo local (hoy se sirve con
  `python3 -m http.server` o `npx serve`, ver `site/README.md`)
- `.gitignore` a nivel de proyecto más allá de `*.zip`
- Decisión de despliegue: ¿sube directo a GoDaddy por FTP/SFTP a una carpeta
  `/demo/` para que el cliente revise antes de reemplazar el sitio en
  mantención? ¿o conviene además un preview público (GitHub Pages, Netlify)
  para no depender de acceso al hosting cada vez que hay un cambio?
- Decidir si el bilingüe EN/ES se queda como selector en una sola URL (estado
  actual) o pasa a `/` + `/es/` — el chat original (`chats/chat1.md`) dejó esa
  pregunta abierta; se resolvió a favor del selector por simplicidad, pero el
  cliente no lo confirmó explícitamente.

No asumas ninguna de estas decisiones de infraestructura por tu cuenta si el
usuario no las ha zanjado — son elecciones de producto/hosting, no técnicas.

## Cómo verificar cambios

No hay tests automatizados. Para revisar visualmente:

```bash
cd site && python3 -m http.server 8000
```

y abrir `http://localhost:8000`. Si tienes Playwright disponible, es útil para
smoke tests (parallax, reveals, configurador, cambio de idioma, formulario) —
no hay suite armada todavía, se probó manualmente durante la implementación.
