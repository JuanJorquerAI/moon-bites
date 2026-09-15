/* ==========================================================================
   Moon Bites — site configuration
   --------------------------------------------------------------------------
   ⚠️  TODO — REPLACE THE PLACEHOLDERS BELOW WITH THE CLIENT'S REAL DATA.
   Every phone number, handle and address on the site is read from here, so
   swapping them is a one-line change per value. Nothing else needs editing.

   `whatsapp` / `sms` must be digits only, in international format, no "+",
   no spaces and no dashes (that is what wa.me expects). Example for a US
   number: "18325550142".
   ========================================================================== */

window.MB_CONFIG = {
  /* PLACEHOLDER — not a real number. */
  whatsapp: "10000000000",

  /* PLACEHOLDER — not a real number. Usually the same line as WhatsApp. */
  sms: "10000000000",

  /* Taken from the brand's own domain in the prototype. Confirm it exists
     before launch — it was never verified. */
  email: "hello@bitesworld.net",

  /* PLACEHOLDER — generic Instagram root, replace with the real profile. */
  instagram: "https://www.instagram.com/",

  /* Where the booking form posts.
     null  → the form does not submit anywhere; it only shows a confirmation
             state in the UI (current behaviour, same as the prototype).
     "url" → the form POSTs its fields as JSON to that endpoint
             (works as-is with Formspree, Web3Forms, Basin, a Netlify
             function, or any endpoint that accepts JSON).
     Until this is set, NO LEAD IS DELIVERED ANYWHERE. */
  formEndpoint: null,
};
