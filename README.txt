JAWAD PORTFOLIO WEBSITE
=======================
Live site (GitHub Pages): https://d-l-academy.github.io/Portfolio/
If you move the site to a custom domain, replace that address in every
page's <head> (canonical, og:url, og:image), in robots.txt, sitemap.xml,
and the "/Portfolio/" paths inside 404.html.

HOW TO VIEW LOCALLY
  Unzip the folder and double-click index.html. Keep the folder structure as it is.
  (404.html only works on the live site.)

HOW TO UPDATE THE LIVE SITE
  On GitHub: Add file -> Upload files -> drag in the changed files/folders
  (keep the same folder names) -> Commit. The site updates in 1-2 minutes.

FOLDER STRUCTURE
  index.html, about.html, services.html, portfolio.html, awards.html, contact.html
  404.html                   Friendly "page not found" page (GitHub Pages uses it automatically)
  robots.txt, sitemap.xml    Help Google find and index every page
  css/style.css              Shared design: colours, fonts, nav, buttons, footer
  css/<page>.css             Styles for each page
  js/main.js                 Shared: menu, scroll reveal, background particles, footer year
  js/home.js, about.js, services.js, portfolio.js, awards.js, contact.js   Page scripts
  js/projects-data.js        EDIT HERE: portfolio projects
  js/services-data.js        EDIT HERE: services
  js/awards-data.js          EDIT HERE: awards and achievements
  assets/images/             Profile photo and project thumbnails
  assets/og-image.jpg        Preview picture shown when the link is shared (WhatsApp, LinkedIn, Facebook)
  assets/apple-touch-icon.png  Icon used when the site is saved to a phone's home screen

CONTACT FORM
  Right now "Send Message" opens the visitor's email app with the message ready
  to send to jawadkhanmehsood@gmail.com. To receive messages directly instead:
    1. Create a free form at https://formspree.io and copy its endpoint URL.
    2. In contact.html, add  data-endpoint="YOUR-FORMSPREE-URL"  to the <form> tag.

SOCIAL LINKS
  The footer shows only an email icon. When you have real profiles, open each
  page, find the comment inside <div class="socials"> and add the links there.

CHANGES MADE IN THIS VERSION (Nov 2026)
  - Removed the sample testimonials and "Brands I've collaborated with" strip
    (they used invented names). Add them back only with real client feedback.
  - Removed js/store.js: it was unused and contained a visible admin password.
  - Removed 5 dead social icons (links pointing nowhere) on every page.
  - Home "Years of experience" now 5+, matching the About page story.
  - Clearer English in the Home tagline.
  - Added SEO and link-preview tags, Google structured data, share image,
    phone icon, 404 page, robots.txt and sitemap.xml.

STILL TO CONFIRM (content only you can supply)
  - Awards page: exact Cisco award name, the meetup's full name, and real
    names/years for the two career highlights (js/awards-data.js).
  - Skill meter percentages on the About page (92 / 90 / 88).
  - Clients: Home says "7+ happy clients", About says "10+ clients served".
  - Project thumbnails are illustrations; real screenshots look stronger.
