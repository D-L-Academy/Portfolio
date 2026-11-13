JAWAD - PORTFOLIO WEBSITE
=========================
Pages: Home, About, Services, Portfolio, Credentials, Contact (+ a 404 page).
Design: dark theme, orange + blue accents, Sora / Manrope fonts.

VIEW IT
  Unzip and double-click index.html. Keep the folder structure as it is.

PUT IT ONLINE (GitHub Pages, free)
  1. On GitHub create a new public repository (e.g. "muhammad-jawad").
  2. Add file -> Upload files -> drag in everything INSIDE this folder -> Commit.
  3. Settings -> Pages -> Source: "Deploy from a branch" -> main / (root) -> Save.
  4. After 1-2 minutes the site is live at https://YOUR-USERNAME.github.io/REPO-NAME/
  5. For the link preview picture on WhatsApp/Facebook, change
     content="assets/og-image.jpg" in each page's <head> to the full address,
     e.g. https://YOUR-USERNAME.github.io/REPO-NAME/assets/og-image.jpg

WHERE TO EDIT CONTENT
  js/services-data.js    Services cards
  js/awards-data.js      Credentials page: education, certificates, awards
  js/projects-data.js    Portfolio projects
  assets/images/profile-photo.jpg   Your photo (keep a 4:5 portrait shape)

ADD CERTIFICATES (only real ones)
  Open js/awards-data.js, copy one { ... } block and fill in the exact
  certificate name, the issuer (e.g. Cisco, Microsoft, institute name) and the year.

CONTACT FORM (messages come straight to your Gmail)
  The form sends every message to jawadkhanmehsood@gmail.com through
  FormSubmit (free, no account needed).
  ONE-TIME SETUP after the site is online:
    1. Open your live site, go to Contact and send yourself a test message.
    2. Check Gmail (and the Spam folder) for an email from FormSubmit.
    3. Click "Activate Form". Done - from now on every message arrives in Gmail.
  Pressing "Reply" in Gmail answers the visitor directly.
  Note: the form only works on the live website, not when index.html is
  opened from your computer. If sending fails, visitors are offered a
  ready-made email to you instead, so no message is lost.

EMAIL LINKS
  Every "Email Me" button and the email address open the visitor's email
  app with jawadkhanmehsood@gmail.com already filled in.

SMOOTH SCROLLING
  Built in (js/main.js): mouse-wheel scrolling glides smoothly on computers;
  phones keep their own natural scrolling. Animations pause when off-screen
  so the site stays fast on slower devices.

WHATSAPP
  Number: +92 328 9308109 (link: https://wa.me/923289308109).
  It appears on the Contact page, in the footer, and as the green floating
  chat button on every page. Clicking opens WhatsApp with a greeting ready.
  To change the number: replace 923289308109 in every .html file
  (search and replace), keeping the 92 country code and no leading 0.

SOCIAL LINKS
  Find the comment inside <div class="socials"> on each page.
