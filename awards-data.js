/* ==========================================================================
   CREDENTIALS & ACHIEVEMENTS DATA
   The Credentials page renders from this list. Edit, add or remove entries
   here; cards are sorted by "order".

   Add ONLY real certificates. For each one, fill in the exact certificate
   name, who issued it (e.g. Cisco, Microsoft, a training institute) and the
   year shown on the certificate.

   kind  : "Education" | "Certificate" | "Award" | "Achievement" (small tag)
   color : "orange" | "blue"
   icon  : an id from the icon set built into awards.html
   year  : a 4-digit year shows large; any other text shows small
   ========================================================================== */
window.AWARDS_DEFAULTS = [
  {
    id: 'edu-dit', order: 1, color: 'blue', icon: 'graduation', kind: 'Education',
    title: 'Diploma in Information Technology (DIT)',
    year: 'Diploma', byLabel: 'Field', by: 'Information Technology',
    why: 'A strong base in computers, software and IT that supports my networking and web development work.'
  },
  {
    id: 'edu-fsc', order: 2, color: 'orange', icon: 'graduation', kind: 'Education',
    title: 'Intermediate (FSc)',
    year: 'Education', byLabel: 'Level', by: 'Higher Secondary School Certificate',
    why: 'Completed my higher secondary education with a science background.'
  },
  {
    id: 'award-best-network-engineer', order: 3, color: 'blue', icon: 'award', kind: 'Award',
    title: 'Best Network Engineer Award',
    year: '2023', byLabel: 'Given by', by: 'Local Administrator & Engineer Meetup',
    why: 'Peer recognition for outstanding network setup and design.'
  },
  {
    id: 'award-cisco', order: 4, color: 'blue', icon: 'trophy', kind: 'Award',
    title: 'Award from Cisco',
    year: '2025', byLabel: 'Given by', by: 'Cisco',
    why: "Recognition from one of the world's leading networking companies."
  },
  {
    id: 'achv-advanced-security', order: 5, color: 'blue', icon: 'shield', kind: 'Achievement',
    title: 'Advanced-level security for a company',
    year: 'Career highlight', byLabel: 'Delivered for', by: 'A client company',
    why: "Kept a company's network and data protected with advanced-level security."
  },
  {
    id: 'achv-client-growth', order: 6, color: 'orange', icon: 'trending', kind: 'Achievement',
    title: 'Grew client accounts on Amazon',
    year: 'Career highlight', byLabel: 'Delivered for', by: 'Brands and agencies',
    why: 'Helped clients improve their Amazon operations and turn their products into profitable businesses.'
  }
];
