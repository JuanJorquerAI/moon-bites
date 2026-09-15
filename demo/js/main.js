/* ==========================================================================
   Moon Bites — behaviour
   --------------------------------------------------------------------------
   Four independent pieces, all vanilla:
     1. i18n      — swaps every string between EN and ES, remembers the choice
     2. contacts  — builds every tel/wa.me/mailto link from js/config.js
     3. motion    — nav state, parallax, scroll reveals, counters (one rAF loop)
     4. builder   — the "build your bite" configurator + the booking form
   ========================================================================== */

(function () {
  "use strict";

  var CFG = window.MB_CONFIG || {};
  var DICT = window.MB_I18N;
  var STORAGE_KEY = "mb-lang";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===================================================================== i18n */

  function pickInitialLang() {
    var stored;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* private mode */ }
    if (stored && DICT[stored]) return stored;

    var fromUrl = new URLSearchParams(location.search).get("lang");
    if (fromUrl && DICT[fromUrl]) return fromUrl;

    var langs = navigator.languages || [navigator.language || "en"];
    for (var i = 0; i < langs.length; i++) {
      if (String(langs[i]).toLowerCase().indexOf("es") === 0) return "es";
    }
    return "en";
  }

  var lang = pickInitialLang();
  var t = function (key) {
    var d = DICT[lang] || DICT.en;
    return d[key] !== undefined ? d[key] : (DICT.en[key] !== undefined ? DICT.en[key] : key);
  };

  function applyStrings() {
    document.documentElement.lang = t("htmlLang");

    $$("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    $$("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    $$("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
    $$("[data-i18n-alt]").forEach(function (el) { el.alt = t(el.getAttribute("data-i18n-alt")); });
    $$("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    $$("[data-i18n-content]").forEach(function (el) { el.content = t(el.getAttribute("data-i18n-content")); });

    $$("[data-lang]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-lang") === lang));
    });
  }

  function setLang(next) {
    if (!DICT[next] || next === lang) return;
    lang = next;
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
    applyStrings();
    buildHeroTitle(false);
    buildMarquee();
    builder.retranslate();
    buildOccasionOptions();
  }

  /* ================================================================= contacts */

  /* Every outbound channel is derived from config.js so the placeholders live
     in exactly one place. */
  function contactHref(kind) {
    switch (kind) {
      case "whatsapp": return "https://wa.me/" + CFG.whatsapp;
      case "sms": return "sms:+" + CFG.sms;
      case "email": return "mailto:" + CFG.email;
      case "instagram": return CFG.instagram;
      default: return "#";
    }
  }

  function wireContacts() {
    $$("[data-contact]").forEach(function (el) {
      el.href = contactHref(el.getAttribute("data-contact"));
    });
    $$('[data-contact-label="email"]').forEach(function (el) { el.textContent = CFG.email; });
  }

  /* ============================================================ hero headline */

  /* The headline animates word by word, and the words differ per language, so
     the spans are rebuilt on every language change. `animate` is false after a
     switch — re-running the entrance mid-page would look like a glitch. */
  function buildHeroTitle(animate) {
    var host = $("#hero-title");
    if (!host) return;
    var words = t("heroWords") || [];
    host.setAttribute("aria-label", t("hero.title.plain"));
    host.innerHTML = "";

    words.forEach(function (w, i) {
      var text = typeof w === "string" ? w : w.text;
      var span = document.createElement("span");
      span.textContent = text;
      if (typeof w === "object" && w.accent) span.className = "is-accent";
      if (animate && !reduceMotion) {
        span.style.opacity = "0";
        span.style.animation = "mb-word 1000ms cubic-bezier(0.22,1,0.36,1) " + (320 + i * 95) + "ms both";
      }
      host.appendChild(span);
      if (i < words.length - 1) host.appendChild(document.createTextNode(" "));
    });
  }

  /* ================================================================= marquee */

  function buildMarquee() {
    var host = $("#marquee");
    if (!host) return;
    var items = t("marquee") || [];
    host.innerHTML = "";

    /* Two identical groups: the track scrolls exactly -50%, so the seam never
       shows and the loop is perfectly continuous. */
    for (var pass = 0; pass < 2; pass++) {
      var group = document.createElement("div");
      group.className = "marquee__group";
      items.forEach(function (item) {
        var word = document.createElement("span");
        word.textContent = item;
        group.appendChild(word);
        var sep = document.createElement("span");
        sep.className = "sep";
        sep.textContent = "✦";
        group.appendChild(sep);
      });
      host.appendChild(group);
    }
  }

  /* ================================================================== motion */

  var motion = {
    nav: null,
    revealed: new WeakSet(),
    counted: new WeakSet(),

    start: function () {
      this.nav = $("#nav");
      this.parallax = $$("[data-parallax]");
      this.reveals = $$("[data-reveal]");
      this.counters = $$("[data-count]");

      if (reduceMotion) {
        this.reveals.forEach(function (el) { el.classList.add("is-in"); });
        this.tickNav();
        window.addEventListener("scroll", this.tickNav.bind(this), { passive: true });
        return;
      }

      var self = this;
      var loop = function () { self.tick(); requestAnimationFrame(loop); };
      requestAnimationFrame(loop);
    },

    tickNav: function () {
      if (!this.nav) return;
      var vh = window.innerHeight || 800;
      var solid = window.scrollY > vh * 0.72;
      this.nav.classList.toggle("is-solid", solid);
    },

    tick: function () {
      var vh = window.innerHeight || 800;
      this.tickNav();

      this.parallax.forEach(function (el) {
        var speed = parseFloat(el.getAttribute("data-parallax")) || 0.1;
        var r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        var mid = r.top + r.height / 2 - vh / 2;
        el.style.transform = "translate3d(0," + (-mid * speed).toFixed(1) + "px,0)";
      });

      var self = this;
      this.reveals.forEach(function (el) {
        if (self.revealed.has(el)) return;
        if (el.getBoundingClientRect().top >= vh * 0.88) return;
        self.revealed.add(el);
        var delay = (parseFloat(el.getAttribute("data-reveal")) || 0) * 110;
        el.style.transitionDelay = delay + "ms";
        el.classList.add("is-in");
      });

      this.counters.forEach(function (el) {
        if (self.counted.has(el)) return;
        if (el.getBoundingClientRect().top > vh * 0.9) return;
        self.counted.add(el);
        self.countUp(el);
      });
    },

    countUp: function (el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var t0 = performance.now();
      var step = function () {
        var p = Math.min(1, (performance.now() - t0) / 1100);
        el.textContent = String(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
  };

  /* ============================================================ gallery drag */

  /* The rail says "drag to explore", so it has to actually drag with a mouse —
     touch already scrolls natively. */
  function wireRailDrag() {
    var rail = $("#rail");
    if (!rail) return;
    var down = false, startX = 0, startScroll = 0, moved = 0;

    rail.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "touch") return;
      down = true; moved = 0;
      startX = e.clientX;
      startScroll = rail.scrollLeft;
      rail.classList.add("is-dragging");
    });

    rail.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      rail.scrollLeft = startScroll - dx;
    });

    var end = function () {
      if (!down) return;
      down = false;
      rail.classList.remove("is-dragging");
    };
    rail.addEventListener("pointerup", end);
    rail.addEventListener("pointercancel", end);
    rail.addEventListener("pointerleave", end);
    rail.addEventListener("dragstart", function (e) { e.preventDefault(); });
  }

  /* ================================================================= builder */

  /* Selections are held as indices, not labels, so switching language keeps
     the guest's box intact instead of resetting it. */
  var builder = {
    base: 0,
    picked: [0, 1],
    drizzle: 0,
    added: false,

    init: function () {
      this.render();
      var self = this;
      var addBtn = $("#add-box");
      if (addBtn) addBtn.addEventListener("click", function () { self.addToRequest(); });
    },

    retranslate: function () {
      this.added = false;
      this.render();
    },

    chip: function (label, on, onClick) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = label;
      b.setAttribute("aria-pressed", String(on));
      b.addEventListener("click", onClick);
      return b;
    },

    render: function () {
      var self = this;

      var basesHost = $("#bases");
      if (basesHost) {
        basesHost.innerHTML = "";
        t("bases").forEach(function (label, i) {
          basesHost.appendChild(self.chip(label, self.base === i, function () {
            self.base = i; self.added = false; self.render();
          }));
        });
      }

      var topsHost = $("#toppings");
      if (topsHost) {
        topsHost.innerHTML = "";
        t("toppings").forEach(function (label, i) {
          topsHost.appendChild(self.chip(label, self.picked.indexOf(i) !== -1, function () {
            self.toggleTopping(i);
          }));
        });
      }

      var drizHost = $("#drizzles");
      if (drizHost) {
        drizHost.innerHTML = "";
        t("drizzles").forEach(function (label, i) {
          drizHost.appendChild(self.chip(label, self.drizzle === i, function () {
            self.drizzle = i; self.added = false; self.render();
          }));
        });
      }

      var count = $("#topping-count");
      if (count) count.textContent = this.picked.length + "/4";

      var title = $("#order-title");
      if (title) title.textContent = t("bases")[this.base];

      var line = $("#order-line");
      if (line) line.textContent = this.sentence();

      var addBtn = $("#add-box");
      if (addBtn) addBtn.textContent = this.added ? t("build.added") : t("build.add");
    },

    toggleTopping: function (i) {
      var at = this.picked.indexOf(i);
      if (at !== -1) this.picked.splice(at, 1);
      else if (this.picked.length < 4) this.picked.push(i);
      else return;                 /* four is the cap — ignore the click */
      this.added = false;
      this.render();
    },

    sentence: function () {
      var tops = t("toppings");
      var labels = this.picked.map(function (i) { return tops[i]; });
      var toppings = labels.length
        ? labels.join(", ").toLowerCase()
        : t("build.noToppings");

      var drizzleLabel = t("drizzles")[this.drizzle];
      var isNone = this.drizzle === t("drizzles").length - 1;   /* last entry is always the "none" option */
      var drizzle = isNone
        ? t("build.noDrizzle")
        : t("build.drizzleSuffix").replace("{drizzle}", drizzleLabel.toLowerCase());

      return t("build.sentence")
        .replace("{base}", t("bases")[this.base])
        .replace("{toppings}", toppings)
        .replace("{drizzle}", drizzle);
    },

    addToRequest: function () {
      var details = $("#details");
      if (details) {
        details.value = t("build.notePrefix") + this.sentence();
        details.dispatchEvent(new Event("input", { bubbles: true }));
      }
      this.added = true;
      this.render();
      var target = $("#book");
      if (target) {
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 60,
          behavior: reduceMotion ? "auto" : "smooth",
        });
      }
    },
  };

  function buildOccasionOptions() {
    var sel = $("#occasion");
    if (!sel) return;
    var keep = sel.selectedIndex;
    sel.innerHTML = "";
    t("occasionOptions").forEach(function (label) {
      var o = document.createElement("option");
      o.textContent = label;
      o.value = label;
      sel.appendChild(o);
    });
    if (keep > -1) sel.selectedIndex = keep;
  }

  /* ==================================================================== form */

  function wireForm() {
    var form = $("#book-form");
    var btn = $("#submit-btn");
    if (!form || !btn) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      /* No endpoint configured yet (see config.js) — the form confirms in the
         UI but the lead goes nowhere. Set MB_CONFIG.formEndpoint before launch. */
      if (!CFG.formEndpoint) {
        btn.removeAttribute("data-i18n");
        btn.textContent = t("form.sent");
        btn.disabled = true;
        return;
      }

      var payload = {};
      new FormData(form).forEach(function (value, key) { payload[key] = value; });
      payload.language = lang;
      payload.page = location.href;

      btn.removeAttribute("data-i18n");
      btn.textContent = t("form.sending");
      btn.disabled = true;

      fetch(CFG.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          btn.textContent = t("form.sent");
          form.reset();
        })
        .catch(function () {
          btn.textContent = t("form.error");
          btn.disabled = false;
        });
    });
  }

  /* ==================================================================== boot */

  function init() {
    applyStrings();
    wireContacts();
    buildHeroTitle(true);
    buildMarquee();
    buildOccasionOptions();
    builder.init();
    wireForm();
    wireRailDrag();
    motion.start();

    $$("[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () { setLang(btn.getAttribute("data-lang")); });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
