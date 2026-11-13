/* ==========================================================================
   SERVICES DATA
   The Services page renders from this list. Edit, add or remove services
   here; cards are sorted by "order".

   color   : "orange" | "blue" | "mix"  (controls the card's accent colour)
   icon    : an id from the icon set built into services.html
             (network, shield, server, code, cart, trending, book, candles, languages ...)
   wide    : true for the one full-width card (used for the language card)
   price   : shown as a badge on the card when set (leave "" to hide it)
   ========================================================================== */
window.SERVICES_DEFAULTS = [
  {
    id: 'svc-network-design', order: 1, color: 'blue', icon: 'network', tag: 'Networking',
    title: 'Network design & setup',
    description: 'I plan and configure networks, from a single office to many sites, so they are fast, stable and ready to grow with you.',
    chips: ['CCNA', 'CCNP', 'Routing & switching'], price: '', wide: false
  },
  {
    id: 'svc-network-security', order: 2, color: 'blue', icon: 'shield', tag: 'Security',
    title: 'Advanced network security',
    description: 'Advanced-level protection for your network: firewalls, VPNs and access control that keep threats out and your data safe.',
    chips: ['Firewalls', 'VPN access', 'Access control'], price: '', wide: false
  },
  {
    id: 'svc-windows-server', order: 3, color: 'blue', icon: 'server', tag: 'IT Support',
    title: 'Windows Server & IT support',
    description: 'Server setup, user accounts and everyday IT support, so your team can work without interruptions.',
    chips: ['MCSE', 'Windows Server', 'Troubleshooting'], price: '', wide: false
  },
  {
    id: 'svc-web-development', order: 4, color: 'blue', icon: 'code', tag: 'Web Development',
    title: 'Websites that look professional',
    description: 'Clean, fast and mobile-friendly websites and portfolios that present you or your business with confidence.',
    chips: ['HTML & CSS', 'JavaScript', 'Responsive design'], price: '', wide: false
  },
  {
    id: 'svc-amazon-management', order: 5, color: 'orange', icon: 'cart', tag: 'Amazon',
    title: 'Amazon account management',
    description: 'I take care of your Amazon account day to day, from product research to listings, so you can focus on the bigger picture.',
    chips: ['Product research', 'Listing optimization', 'Account management'], price: '', wide: false
  },
  {
    id: 'svc-amazon-growth', order: 6, color: 'orange', icon: 'trending', tag: 'Amazon',
    title: 'Amazon growth & PPC',
    description: 'Smart PPC campaigns and steady optimization to grow sales and turn your products into a profitable business.',
    chips: ['PPC', 'Brand growth', 'Reporting'], price: '', wide: false
  },
  {
    id: 'svc-english', order: 7, color: 'mix', icon: 'book', tag: 'English',
    title: 'English language training',
    description: 'Practical help with spoken English and grammar, so you can speak, write and present with confidence.',
    chips: ['Spoken English', 'Grammar', 'Communication'], price: '', wide: false
  },
  {
    id: 'svc-forex', order: 8, color: 'orange', icon: 'candles', tag: 'Forex',
    title: 'Forex market education',
    description: 'Clear, practical guidance on reading charts and managing risk. No get-rich-quick promises, just disciplined trading.',
    chips: ['Technical analysis', 'Chart reading', 'Risk management'], price: '', wide: false
  },
  {
    id: 'svc-languages', order: 9, color: 'mix', icon: 'languages', tag: 'Languages',
    title: 'Multilingual communication',
    description: 'I communicate in English, Urdu, Pashto and more, so you, your team and your customers understand each other easily and clearly.',
    chips: ['English', 'Urdu', 'Pashto', 'and more'], price: '', wide: true
  }
];
