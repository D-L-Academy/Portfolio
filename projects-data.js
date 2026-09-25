/* ==========================================================================
   PORTFOLIO DATA
   All projects on the Portfolio page come from this one list, so content can be
   managed in a single place (the Admin Panel will edit this later).

   category : "va" | "network" | "language"
   order    : position when the "All" tab is selected (categories are interleaved)
   image    : path to the thumbnail / large image (placeholders for now)
   ========================================================================== */
window.PORTFOLIO_CATEGORIES = [
  { id: "all",      label: "All" },
  { id: "va",       label: "VA" },
  { id: "network",  label: "Network Engineer" },
  { id: "language", label: "Different Language" }
];

window.PORTFOLIO_PROJECTS = [
  /* ---------------- VA ---------------- */
  {
    id: "inbox", category: "va", order: 1,
    title: "Executive inbox & calendar system",
    summary: "Cleared a packed inbox and built a calendar routine that runs itself.",
    description: "A busy founder was losing hours every day to email and scheduling. I organized the inbox, set up rules and reply templates, and built a calendar routine with reminders so meetings and follow-ups stopped slipping.",
    highlights: [
      "Sorted the inbox into priority folders with automatic rules",
      "Wrote reply templates for the most common emails",
      "Set up calendar blocks, reminders and a weekly agenda",
      "Sent a short daily summary so nothing was missed"
    ],
    tools: ["Email management", "Calendar", "Task tracking"],
    image: "assets/images/project-inbox.svg",
    alt: "Preview of an email inbox and calendar dashboard"
  },
  {
    id: "store", category: "va", order: 4,
    title: "Online store operations",
    summary: "Kept listings, orders and customer messages running smoothly every day.",
    description: "I handled the day-to-day running of an online store so the owner could focus on growth. That covered product listings, order follow-up and customer questions, all kept accurate and up to date.",
    highlights: [
      "Uploaded and optimized product listings",
      "Tracked orders and followed up on delays",
      "Answered customer messages quickly and politely",
      "Reported weekly sales and stock levels"
    ],
    tools: ["E-commerce platform", "Spreadsheets", "Customer support"],
    image: "assets/images/project-store.svg",
    alt: "Preview of an online store product grid and sales chart"
  },
  {
    id: "social", category: "va", order: 7,
    title: "Social media & brand growth",
    summary: "Planned, posted and engaged daily to grow a brand's audience.",
    description: "For a growing brand I planned a content calendar, scheduled posts and replied to the community every day. The steady routine built a more engaged audience and brought in more inquiries.",
    highlights: [
      "Built a monthly content calendar",
      "Scheduled posts and stories across channels",
      "Replied to comments and messages daily",
      "Shared monthly growth reports"
    ],
    tools: ["Content planning", "Scheduling", "Analytics"],
    image: "assets/images/project-social.svg",
    alt: "Preview of a social media growth chart and post cards"
  },
  {
    id: "leads", category: "va", order: 10,
    title: "Lead generation & research dashboard",
    summary: "Built clean lead lists and a tracker that showed what to chase first.",
    description: "I researched the target market and built verified lead lists, then set up a simple tracker that ranked leads by how ready they were to buy. The sales team knew exactly who to contact next.",
    highlights: [
      "Researched and verified qualified leads",
      "Organized leads into a clear pipeline tracker",
      "Ranked leads by priority",
      "Kept the data clean and up to date"
    ],
    tools: ["Research", "Spreadsheets", "CRM tracking"],
    image: "assets/images/project-leads.svg",
    alt: "Preview of a lead funnel and lead table"
  },

  /* ---------------- NETWORK ENGINEER ---------------- */
  {
    id: "network", category: "network", order: 2,
    title: "Multi-site network redesign",
    summary: "Redesigned a multi-site network for speed, stability and easy management.",
    description: "A company with several offices had a slow, hard-to-manage network. I mapped what existed, redesigned the layout and configured the equipment so every site was faster, more stable and simpler to look after.",
    highlights: [
      "Mapped the existing network and found the weak points",
      "Designed a cleaner layout with proper segmentation",
      "Configured routers and switches across all sites",
      "Documented everything for the team"
    ],
    tools: ["Routing & switching", "VLANs", "Network documentation"],
    image: "assets/images/project-network.svg",
    alt: "Preview of a multi-site network topology diagram"
  },
  {
    id: "firewall", category: "network", order: 5,
    title: "Firewall & VPN hardening",
    summary: "Locked down firewall rules and set up secure VPN access for remote staff.",
    description: "The client's network was more exposed than they realized. I tightened the firewall rules, closed unused entry points and set up secure VPN access so remote staff could work safely.",
    highlights: [
      "Audited and tightened firewall rules",
      "Closed unused ports and services",
      "Set up secure VPN access for remote staff",
      "Explained the changes in plain language"
    ],
    tools: ["Firewall", "VPN", "Access control"],
    image: "assets/images/project-firewall.svg",
    alt: "Preview of a shield with a lock representing network security"
  },
  {
    id: "wifi", category: "network", order: 8,
    title: "Office Wi-Fi coverage plan",
    summary: "Fixed dead zones with a mapped access-point layout and tuned channels.",
    description: "Staff kept losing signal in parts of the office. I surveyed the space, planned where the access points should go and tuned the channels so coverage was strong and steady everywhere.",
    highlights: [
      "Surveyed signal strength across the floor plan",
      "Planned the best access-point positions",
      "Tuned channels and power to reduce interference",
      "Tested coverage room by room"
    ],
    tools: ["Wi-Fi survey", "Access points", "Channel planning"],
    image: "assets/images/project-wifi.svg",
    alt: "Preview of a floor plan with Wi-Fi coverage zones"
  },
  {
    id: "monitoring", category: "network", order: 11,
    title: "Network monitoring & uptime reports",
    summary: "Set up alerts that catch outages early, with plain-language reports.",
    description: "I set up monitoring so problems are spotted before users notice them. Alerts go out when something fails, and a short monthly report shows uptime and speed in plain language.",
    highlights: [
      "Set up device and uptime monitoring",
      "Configured alerts for outages and slowdowns",
      "Built a simple monthly uptime report",
      "Fixed recurring issues at the source"
    ],
    tools: ["Monitoring", "Alerting", "Reporting"],
    image: "assets/images/project-monitor.svg",
    alt: "Preview of a network monitoring dashboard with uptime bars"
  },

  /* ---------------- DIFFERENT LANGUAGE ---------------- */
  {
    id: "urdu-support", category: "language", order: 3,
    title: "Urdu customer support desk",
    summary: "Handled customer chats and emails in Urdu and English for a growing brand.",
    description: "A growing brand needed to serve customers in both Urdu and English. I answered chats and emails in the customer's own language, which made replies clearer and helped customers feel looked after.",
    highlights: [
      "Answered chats and emails in Urdu and English",
      "Wrote helpful replies for common questions",
      "Escalated tricky cases with clear notes",
      "Kept response times short"
    ],
    tools: ["Urdu", "English", "Customer support"],
    image: "assets/images/project-urdu.svg",
    alt: "Preview of a customer support chat in Urdu"
  },
  {
    id: "pashto-localization", category: "language", order: 6,
    title: "Pashto content localization",
    summary: "Adapted brand messages into natural, local-sounding Pashto.",
    description: "A brand wanted to reach Pashto-speaking customers without sounding like a word-for-word translation. I adapted its key messages so they read naturally and fit the local audience.",
    highlights: [
      "Adapted brand messages into natural Pashto",
      "Kept the tone and meaning of the original",
      "Checked wording for local audiences",
      "Delivered consistent, ready-to-use copy"
    ],
    tools: ["Pashto", "English", "Localization"],
    image: "assets/images/project-pashto.svg",
    alt: "Preview of English content being adapted into Pashto"
  },
  {
    id: "multilingual-captions", category: "language", order: 9,
    title: "Multilingual social captions",
    summary: "Wrote and scheduled captions in English, Urdu and Pashto for one campaign.",
    description: "For a single campaign I wrote captions in English, Urdu and Pashto so the same message reached three audiences. Each caption was written to sound natural in its own language and scheduled for the right time.",
    highlights: [
      "Wrote captions in three languages",
      "Matched the tone to each audience",
      "Scheduled posts for the best times",
      "Tracked which language performed best"
    ],
    tools: ["English", "Urdu", "Pashto"],
    image: "assets/images/project-captions.svg",
    alt: "Preview of three social post cards in different languages"
  },
  {
    id: "translation", category: "language", order: 12,
    title: "English to Urdu document translation",
    summary: "Translated business documents accurately while keeping the brand's tone.",
    description: "I translated business documents from English into Urdu, keeping the meaning accurate and the brand's tone intact. Each document was proofread before delivery so it was ready to use straight away.",
    highlights: [
      "Translated documents accurately into Urdu",
      "Kept the brand's tone and terminology",
      "Proofread every document before delivery",
      "Kept the original layout and formatting"
    ],
    tools: ["Urdu", "English", "Proofreading"],
    image: "assets/images/project-translate.svg",
    alt: "Preview of an English document beside its Urdu translation"
  }
];
