JAWAD PORTFOLIO WEBSITE
=======================
Status: Step 6 complete (Home + Portfolio + Services + About + Awards + Contact). Other pages are added one at a time.

HOW TO VIEW
  Unzip the folder, then double-click index.html to open it in your browser.
  (Keep the folder structure as it is. An internet connection is needed only for the
  Google Fonts; the site falls back to system fonts without it.)

FOLDER STRUCTURE
  index.html                 Home page
  portfolio.html             Portfolio page (filter tabs, project grid, lightbox)
  services.html              Services page (five service cards)
  about.html                 About page (story, animated timeline, skill meters)
  awards.html                Awards & Achievements page (four achievement cards)
  contact.html               Contact page (details + contact form)
  css/style.css              SHARED design system: colours, fonts, nav, buttons, footer, background
  css/home.css               Styles for the Home page only
  css/portfolio.css          Styles for the Portfolio page only
  css/services.css           Styles for the Services page only
  css/about.css              Styles for the About page only
  css/awards.css             Styles for the Awards page only
  css/contact.css            Styles for the Contact page only
  js/main.js                 SHARED script: nav menu, scroll reveal, background particles
  js/home.js                 Home page script: counters, testimonial slider, brand marquee
  js/projects-data.js        ALL portfolio projects live here (title, description, image, category)
  js/portfolio.js            Portfolio page script: filters, staggered reveal, lightbox
  js/services.js             Services page script: one-after-another card reveal
  js/about.js                About page script: counters, timeline, skill meters
  js/awards.js               Awards page script: each card reveals on its own
  js/contact.js              Contact page script: form validation and sending
  assets/images/             Placeholder headshot + sample project thumbnails
  assets/favicon.svg         Browser tab icon

NAVIGATION
  Every page uses the same menu: Home, About, Services, Portfolio, Awards, Contact.
  All six pages are live and linked.

PORTFOLIO PAGE
  Tabs: All, VA, Network Engineer, Different Language (add or edit projects in
  js/projects-data.js; the Admin Panel will manage this list later).
  Deep links: portfolio.html#va, #network, #language, or #project-<id> to open a project.

CONTACT FORM
  A website with no server cannot email you by itself. Right now, when a visitor presses
  "Send Message", their email app opens with the message ready to send to
  jawadkhanmehsood@gmail.com. To send straight from the site instead, paste a form-service
  URL (for example a Formspree endpoint) into data-endpoint on the <form> in contact.html.
  The Admin Panel step can set this up properly.

DESIGN SYSTEM (locked for every page)
  Background   Charcoal      #131417  (surfaces #181a1e, #1d2025)
  Accent 1     Ember orange  #ff6a1a  (light #ff9142)   = Virtual Assistant work
  Accent 2     Electric blue #2f7bff  (light #5cc8ff)   = Network Engineering work
  Text         #f3f0ea  (dim #b6bac2)
  Headings     Sora (600-800)      Body  Manrope (400-700)
  Motion       Soft blurred glowing shapes and particles that drift and pulse.
               Fade + slide-in on scroll. No moving lines, scanning bars or sweeping light.

THINGS TO REPLACE LATER (Admin Panel will manage these)
  - Profile photo:  assets/images/profile-placeholder.svg
  - Project thumbnails: assets/images/project-*.svg (12 placeholders, referenced from js/projects-data.js)
  - Testimonials, brand names in the marquee (currently sample content)
  - Awards page: exact Cisco award name, the meetup's full name, and years/names for the two career highlights
  - Skill meter percentages on the About page (92 / 90 / 88 are placeholders)
  - Social links in the footer (currently "#"); WhatsApp number (shown as "available on request")
