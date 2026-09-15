/* ==========================================================================
   Moon Bites — bilingual copy (EN / ES)
   --------------------------------------------------------------------------
   Every visible string lives here. The markup carries `data-i18n` keys and
   `main.js` swaps them when the language changes; nothing in index.html
   needs to be touched to add or edit copy.

   Conventions:
     "key"            → plain text, written with textContent
     keys ending .html → contains inline markup (<em>), written with innerHTML
     heroWords        → array of words for the staggered headline animation
   ========================================================================== */

window.MB_I18N = {
  en: {
    htmlLang: "en",
    langLabel: "English",

    "meta.title": "Moon Bites — Dutch mini pancakes, cooked live at your event in Texas",
    "meta.description":
      "Moon Bites rolls a live poffertjes cart into your party anywhere in Texas — fifty Dutch mini pancakes at a time, topped to order. Request a quote.",

    /* ---------------------------------------------------------------- nav */
    "nav.cart": "The cart",
    "nav.build": "Build a bite",
    "nav.occasions": "Occasions",
    "nav.gallery": "Gallery",
    "nav.book": "Book the cart",
    "nav.langAria": "Choose language",

    /* --------------------------------------------------------- contact dock */
    "dock.sms": "Text us",
    "dock.whatsapp": "WhatsApp",

    /* --------------------------------------------------------------- hero */
    "hero.eyebrow": "Dutch mini pancakes · Live cart · Texas",
    heroWords: ["Fifty", "little", { text: "pancakes", accent: true }, "at", "a", "time."],
    "hero.title.plain": "Fifty little pancakes at a time.",
    "hero.lede":
      "We roll our cart into your party and cook poffertjes in front of your guests — hot, fluffy, topped to order. The dessert nobody photographs later, because they eat it first.",
    "hero.ctaDate": "Check your date",
    "hero.ctaBuild": "Build your bite",
    "hero.scroll": "Scroll",

    /* ------------------------------------------------------------ marquee */
    marquee: [
      "Fresh strawberries", "Nutella", "Bananas", "Oreo crumble", "Salted caramel",
      "Whipped cream", "Cinnamon crunch", "Powdered sugar", "Sugar pearls", "Condensed milk",
    ],

    /* -------------------------------------------------------------- intro */
    "intro.eyebrow": "Grace moments",
    "intro.h2.html":
      'A dessert that happens <em>in front of people</em>, not behind a kitchen door.',
    "intro.p1":
      "Poffertjes are Dutch mini pancakes: fifty of them puff up at once on a copper-dimpled griddle, get flipped with a skewer, and go straight into a warm box with whatever the guest points at.",
    "intro.p2":
      "It smells like a home kitchen, it moves like a bar, and it turns a corner of your party into the place everyone stands.",
    "intro.stat1": "servings per hour",
    "intro.stat2": "pancakes per griddle",
    "intro.stat3": "toppings on the bar",
    "intro.stat4": "on site before you start",
    "intro.stat4.unit": "min",
    "intro.photoMainAlt": "Guests holding boxes of mini pancakes",
    "intro.photoInsetAlt": "Serving a fresh box of mini pancakes",

    /* ------------------------------------------------------------ service */
    "service.h2.html": 'How an hour with the cart <em>actually goes</em>',
    "service.label": "The service",
    "service.caption": "The cart arrives folded, set up and lit within 45 minutes.",
    "service.photoAlt": "The Moon Bites cart set up poolside",
    "service.step1.title": "We arrive 90 minutes early",
    "service.step1.body":
      "Cart, umbrella, warm lights, toppings bar and griddle. You don't lift anything and we need one standard outlet.",
    "service.step2.title": "Batter goes down at your cue",
    "service.step2.body":
      "Fifty pancakes rise at once. Nothing is pre-cooked, nothing sits under a heat lamp, and the smell does the inviting.",
    "service.step3.title": "Every guest builds their own box",
    "service.step3.body":
      "Twelve toppings, three drizzles, as many combinations as there are kids in the line. Kids come back three times — plan for it.",
    "service.step4.title": "We leave the corner cleaner than we found it",
    "service.step4.body":
      "Griddle off, cart wiped, trash bagged and out. The only thing left behind is the smell of vanilla.",
    "service.link": "Ask about your venue",

    /* ------------------------------------------------------------ builder */
    "build.eyebrow": "The toppings bar",
    "build.h2.html": "Build the box you'd order",
    "build.sub":
      "Pick a base, up to four toppings and a drizzle. Send it with your request and we'll load the cart for it.",
    "build.label1": "01 — Base",
    "build.label2": "02 — Toppings",
    "build.label3": "03 — Drizzle",
    "build.yourBox": "Your box",
    "build.add": "Add this box to my request",
    "build.added": "Added to your request ↓",
    "build.photoAlt": "Two boxes of topped mini pancakes",
    bases: ["Classic butter & sugar", "Nutella dream", "Berry moon"],
    toppings: [
      "Strawberries", "Bananas", "Oreo crumble", "Fruity cereal", "Cinnamon crunch",
      "Whipped cream", "Sugar pearls", "Sprinkles", "Toasted coconut", "Marshmallow",
    ],
    drizzles: ["Chocolate", "Salted caramel", "Condensed milk", "No drizzle"],
    "build.noToppings": "no toppings",
    "build.noDrizzle": "no drizzle",
    /* {base} with {toppings}, finished with {drizzle}. */
    "build.sentence": "{base} with {toppings}, finished with {drizzle}.",
    "build.drizzleSuffix": "{drizzle} drizzle",
    "build.notePrefix": "The box we'd like: ",

    /* ---------------------------------------------------------- occasions */
    "occasions.h2.html": 'Where the cart <em>shows up</em>',
    "occasions.sub":
      "From 30 guests. Backyards, clubhouses, ballrooms, school gyms and pool decks across Texas.",
    "occasions.c1.title": "Kids' birthdays",
    "occasions.c1.body": "Sprinkles, pearls and a line that keeps reforming.",
    "occasions.c1.alt": "Kids' party by the pool",
    "occasions.c2.title": "Corporate & resident events",
    "occasions.c2.body": "Invoiced, insured, and done in one clean hour.",
    "occasions.c2.alt": "Cart at an apartment community event",
    "occasions.c3.title": "Baptisms & baby showers",
    "occasions.c3.body": "Soft palettes, small boxes, quiet service.",
    "occasions.c3.alt": "Toppings bar on the cart",
    "occasions.c4.title": "Weddings & quinces",
    "occasions.c4.body": "Late-night dessert, served warm at 11pm.",
    "occasions.c4.alt": "Evening event with the cart",

    /* ------------------------------------------------------------ gallery */
    "gallery.h2": "Nights we rolled up",
    "gallery.hint": "Drag to explore →",
    "gallery.alt": "Moon Bites event",

    /* --------------------------------------------------------- testimonials */
    "quotes.hero":
      "“They set up by the pool at eight and the line didn't stop until the batter ran out. My neighbors are still asking who catered it.”",
    "quotes.heroSource": "Resident event · Huntsville, TX",
    "quotes.q1":
      "“My daughter asked for the pancake cart instead of a cake. Best decision of the whole party.”",
    "quotes.q1Source": "Birthday · Conroe",
    "quotes.q2":
      "“Warm, personal, and genuinely delicious. They treated our guests like family the whole night.”",
    "quotes.q2Source": "Baptism · The Woodlands",
    "quotes.q3":
      "“Clean quote, on time, zero mess left behind. We've booked them three times now.”",
    "quotes.q3Source": "Community manager · Houston",

    /* --------------------------------------------------------------- book */
    "book.eyebrow": "Check your date",
    "book.h2.html": "Tell us the date. We'll bring the griddle.",
    "book.lede":
      "Written quote within 24 hours, tailored to your guest count and venue. Nothing to pay until you approve it.",
    "book.whatsapp": "WhatsApp us",
    "book.badge1": "Statewide in Texas",
    "book.badge2": "From 30 guests",
    "book.badge3": "Licensed & insured",
    "form.name": "Name",
    "form.namePh": "Your name",
    "form.email": "Email",
    "form.emailPh": "you@email.com",
    "form.date": "Event date",
    "form.guests": "Guests",
    "form.guestsPh": "60",
    "form.city": "City",
    "form.cityPh": "Houston",
    "form.occasion": "Occasion",
    occasionOptions: [
      "Kids' birthday",
      "Adult birthday",
      "Baptism / baby shower",
      "Corporate or resident event",
      "Wedding / quinceañera",
      "School or church function",
      "Something else",
    ],
    "form.details": "Details",
    "form.detailsPh": "Venue, timing, allergies, the box you built…",
    "form.submit": "Send my request",
    "form.sending": "Sending…",
    "form.sent": "Request sent — we'll be in touch",
    "form.error": "Something went wrong — please WhatsApp us instead",
    "form.note": "We answer within one business day.",

    /* ------------------------------------------------------------- footer */
    "footer.tagline":
      "Dutch mini pancakes, cooked live at your event. Serving all of Texas — one warm box at a time.",
    "footer.explore": "Explore",
    "footer.touch": "Get in touch",
    "footer.copy": "© 2026 Moon Bites · Grace Moments",
    "footer.region": "Texas, USA",
  },

  es: {
    htmlLang: "es",
    langLabel: "Español",

    "meta.title": "Moon Bites — Mini pancakes holandeses, cocinados en vivo en tu evento en Texas",
    "meta.description":
      "Moon Bites lleva su carro de poffertjes en vivo a tu fiesta en cualquier punto de Texas — cincuenta mini pancakes holandeses a la vez, con los toppings que elijas. Pide tu cotización.",

    /* ---------------------------------------------------------------- nav */
    "nav.cart": "El carro",
    "nav.build": "Arma tu bite",
    "nav.occasions": "Ocasiones",
    "nav.gallery": "Galería",
    "nav.book": "Reservar el carro",
    "nav.langAria": "Elegir idioma",

    /* --------------------------------------------------------- contact dock */
    "dock.sms": "Escríbenos",
    "dock.whatsapp": "WhatsApp",

    /* --------------------------------------------------------------- hero */
    "hero.eyebrow": "Mini pancakes holandeses · Carro en vivo · Texas",
    heroWords: ["Cincuenta", { text: "pancakes", accent: true }, "a", "la", "vez."],
    "hero.title.plain": "Cincuenta pancakes a la vez.",
    "hero.lede":
      "Llevamos nuestro carro a tu fiesta y cocinamos poffertjes frente a tus invitados — calientes, esponjosos, con los toppings que cada uno elija. El postre que nadie alcanza a fotografiar, porque se lo comen primero.",
    "hero.ctaDate": "Consulta tu fecha",
    "hero.ctaBuild": "Arma tu bite",
    "hero.scroll": "Desliza",

    /* ------------------------------------------------------------ marquee */
    marquee: [
      "Frutillas frescas", "Nutella", "Plátano", "Oreo molida", "Caramelo salado",
      "Crema batida", "Crocante de canela", "Azúcar flor", "Perlas de azúcar", "Leche condensada",
    ],

    /* -------------------------------------------------------------- intro */
    "intro.eyebrow": "Grace moments",
    "intro.h2.html":
      'Un postre que ocurre <em>frente a la gente</em>, no detrás de la puerta de una cocina.',
    "intro.p1":
      "Los poffertjes son mini pancakes holandeses: cincuenta se inflan a la vez sobre una plancha de cobre con hoyuelos, se giran con una brocheta y pasan directo a una caja tibia con lo que el invitado apunte.",
    "intro.p2":
      "Huele a cocina de casa, se mueve como una barra, y convierte un rincón de tu fiesta en el lugar donde todos se quedan parados.",
    "intro.stat1": "porciones por hora",
    "intro.stat2": "pancakes por plancha",
    "intro.stat3": "toppings en la barra",
    "intro.stat4": "en el lugar antes de empezar",
    "intro.stat4.unit": "min",
    "intro.photoMainAlt": "Invitados con sus cajas de mini pancakes",
    "intro.photoInsetAlt": "Entregando una caja recién hecha de mini pancakes",

    /* ------------------------------------------------------------ service */
    "service.h2.html": 'Cómo transcurre <em>de verdad</em> una hora con el carro',
    "service.label": "El servicio",
    "service.caption": "El carro llega plegado, montado e iluminado en 45 minutos.",
    "service.photoAlt": "El carro de Moon Bites montado junto a la piscina",
    "service.step1.title": "Llegamos 90 minutos antes",
    "service.step1.body":
      "Carro, quitasol, luces cálidas, barra de toppings y plancha. Tú no levantas nada y solo necesitamos un enchufe corriente.",
    "service.step2.title": "La mezcla cae cuando tú digas",
    "service.step2.body":
      "Cincuenta pancakes suben a la vez. Nada viene precocinado, nada espera bajo una lámpara de calor, y el olor hace la invitación.",
    "service.step3.title": "Cada invitado arma su propia caja",
    "service.step3.body":
      "Doce toppings, tres salsas y tantas combinaciones como niños haya en la fila. Los niños vuelven tres veces — cuéntalo.",
    "service.step4.title": "Dejamos el rincón más limpio de lo que lo encontramos",
    "service.step4.body":
      "Plancha apagada, carro limpio, basura embolsada y fuera. Lo único que queda es el olor a vainilla.",
    "service.link": "Consúltanos por tu locación",

    /* ------------------------------------------------------------ builder */
    "build.eyebrow": "La barra de toppings",
    "build.h2.html": "Arma la caja que pedirías",
    "build.sub":
      "Elige una base, hasta cuatro toppings y una salsa. Envíalo junto a tu solicitud y cargamos el carro para eso.",
    "build.label1": "01 — Base",
    "build.label2": "02 — Toppings",
    "build.label3": "03 — Salsa",
    "build.yourBox": "Tu caja",
    "build.add": "Sumar esta caja a mi solicitud",
    "build.added": "Agregada a tu solicitud ↓",
    "build.photoAlt": "Dos cajas de mini pancakes con toppings",
    bases: ["Clásica mantequilla y azúcar", "Sueño de Nutella", "Luna de berries"],
    toppings: [
      "Frutillas", "Plátano", "Oreo molida", "Cereal de frutas", "Crocante de canela",
      "Crema batida", "Perlas de azúcar", "Grageas", "Coco tostado", "Malvaviscos",
    ],
    drizzles: ["Chocolate", "Caramelo salado", "Leche condensada", "Sin salsa"],
    "build.noToppings": "sin toppings",
    "build.noDrizzle": "sin salsa",
    "build.sentence": "{base} con {toppings}, terminada con {drizzle}.",
    "build.drizzleSuffix": "salsa de {drizzle}",
    "build.notePrefix": "La caja que nos gustaría: ",

    /* ---------------------------------------------------------- occasions */
    "occasions.h2.html": 'Dónde <em>aparece</em> el carro',
    "occasions.sub":
      "Desde 30 invitados. Patios, quinchos, salones, gimnasios de colegio y terrazas de piscina en todo Texas.",
    "occasions.c1.title": "Cumpleaños infantiles",
    "occasions.c1.body": "Grageas, perlas y una fila que se vuelve a formar sola.",
    "occasions.c1.alt": "Fiesta de niños junto a la piscina",
    "occasions.c2.title": "Eventos corporativos y de residentes",
    "occasions.c2.body": "Con factura, con seguro, y listo en una hora limpia.",
    "occasions.c2.alt": "El carro en un evento de comunidad de departamentos",
    "occasions.c3.title": "Bautizos y baby showers",
    "occasions.c3.body": "Paletas suaves, cajas pequeñas, servicio discreto.",
    "occasions.c3.alt": "Barra de toppings sobre el carro",
    "occasions.c4.title": "Matrimonios y quinceañeras",
    "occasions.c4.body": "El postre de la medianoche, servido tibio a las 11 pm.",
    "occasions.c4.alt": "Evento nocturno con el carro",

    /* ------------------------------------------------------------ gallery */
    "gallery.h2": "Noches en que llegamos",
    "gallery.hint": "Arrastra para explorar →",
    "gallery.alt": "Evento de Moon Bites",

    /* --------------------------------------------------------- testimonials */
    "quotes.hero":
      "“Montaron junto a la piscina a las ocho y la fila no paró hasta que se acabó la mezcla. Mis vecinos todavía preguntan quién hizo el catering.”",
    "quotes.heroSource": "Evento de residentes · Huntsville, TX",
    "quotes.q1":
      "“Mi hija pidió el carro de pancakes en vez de torta. La mejor decisión de toda la fiesta.”",
    "quotes.q1Source": "Cumpleaños · Conroe",
    "quotes.q2":
      "“Cercanos, cálidos y realmente ricos. Trataron a nuestros invitados como familia toda la noche.”",
    "quotes.q2Source": "Bautizo · The Woodlands",
    "quotes.q3":
      "“Cotización clara, puntuales, cero desorden al final. Ya los hemos contratado tres veces.”",
    "quotes.q3Source": "Administradora de comunidad · Houston",

    /* --------------------------------------------------------------- book */
    "book.eyebrow": "Consulta tu fecha",
    "book.h2.html": "Dinos la fecha. Nosotros llevamos la plancha.",
    "book.lede":
      "Cotización escrita en 24 horas, hecha a la medida de tu cantidad de invitados y tu locación. No pagas nada hasta que la apruebes.",
    "book.whatsapp": "Escríbenos por WhatsApp",
    "book.badge1": "Todo el estado de Texas",
    "book.badge2": "Desde 30 invitados",
    "book.badge3": "Con permisos y seguro",
    "form.name": "Nombre",
    "form.namePh": "Tu nombre",
    "form.email": "Correo",
    "form.emailPh": "tu@correo.com",
    "form.date": "Fecha del evento",
    "form.guests": "Invitados",
    "form.guestsPh": "60",
    "form.city": "Ciudad",
    "form.cityPh": "Houston",
    "form.occasion": "Ocasión",
    occasionOptions: [
      "Cumpleaños infantil",
      "Cumpleaños de adulto",
      "Bautizo / baby shower",
      "Evento corporativo o de residentes",
      "Matrimonio / quinceañera",
      "Actividad de colegio o iglesia",
      "Otra cosa",
    ],
    "form.details": "Detalles",
    "form.detailsPh": "Locación, horarios, alergias, la caja que armaste…",
    "form.submit": "Enviar mi solicitud",
    "form.sending": "Enviando…",
    "form.sent": "Solicitud enviada — te contactamos",
    "form.error": "Algo salió mal — escríbenos por WhatsApp",
    "form.note": "Respondemos dentro de un día hábil.",

    /* ------------------------------------------------------------- footer */
    "footer.tagline":
      "Mini pancakes holandeses, cocinados en vivo en tu evento. Servimos todo Texas — una caja tibia a la vez.",
    "footer.explore": "Explora",
    "footer.touch": "Contáctanos",
    "footer.copy": "© 2026 Moon Bites · Grace Moments",
    "footer.region": "Texas, EE. UU.",
  },
};
