/* ==========================================================================
   BlackInSTEMM — MAIN JAVASCRIPT FILE
   ==========================================================================
   This file is loaded on every page via <script src="js/main.js"> at the
   bottom of the <body>, right before the closing </body> tag. It handles:

     1. The mobile nav menu (hamburger toggle)
     2. The Organizations data list + turning it into cards on organizations.html
     3. The Events data list + turning it into cards on events.html

   Sections 2 and 3 only do anything on the pages that have the right
   containers (#organizations-list, #upcoming-events-list, etc.), so it's
   safe that this same file is loaded on every page.
   ========================================================================== */


/* ==========================================================================
   1. MOBILE NAV TOGGLE
   ========================================================================== */
/* Finds the hamburger button (.nav-toggle) and the nav links list
   (.nav-links), and makes clicking the button show/hide the links.
   This only visually matters on small screens — see the ".nav-toggle" and
   ".nav-links" rules inside the "@media (max-width: 768px)" section of
   css/style.css. */

const navToggleButton = document.querySelector('.nav-toggle');
const navLinksList = document.querySelector('.nav-links');

if (navToggleButton && navLinksList) {
  navToggleButton.addEventListener('click', () => {
    navLinksList.classList.toggle('nav-links-open');
  });
}


/* ==========================================================================
   2. ORGANIZATIONS DATA
   ========================================================================== */
/* HOW TO ADD A NEW ORGANIZATION:
   Copy the entire { ... } block below (from one curly brace to its
   matching closing brace + comma), paste it as a new entry in this list,
   and fill in the details. You do NOT need to touch any HTML.

   Field guide:
     name        - the organization's name, shown as the card heading
     logo        - path to their logo image. Drop the image file into
                   images/organizations/ and point to it here, e.g.
                   "images/organizations/acme-labs-logo.png"
     description - a short paragraph about the organization
     website     - their main website URL (used for the "Visit Website" button)
     socialLinks - a list of their social media pages. Each one is
                   { platform: "Label shown on the button", url: "the link" }.
                   Add as many or as few as they have — including none
                   (an empty list: socialLinks: []) is fine too. */

const organizations = [

  {
    name: "[REPLACE ME] Example Organization",
    logo: "images/organizations/placeholder-logo.svg",
    description: "REPLACE ME: A short 1-3 sentence description of this member organization — who they are and what they do.",
    website: "https://example.org",
    socialLinks: [
      { platform: "Instagram", url: "https://instagram.com/example" },
      { platform: "LinkedIn", url: "https://linkedin.com/company/example" }
    ]
  },

  // Add more organizations here — copy the block above and edit the values.
  // {
  //   name: "Another Organization",
  //   logo: "images/organizations/another-org-logo.png",
  //   description: "...",
  //   website: "https://...",
  //   socialLinks: [
  //     { platform: "Twitter/X", url: "https://twitter.com/..." }
  //   ]
  // },

];


/* ==========================================================================
   3. EVENTS DATA
   ========================================================================== */
/* HOW TO ADD A NEW EVENT:
   Copy the entire { ... } block below, paste it as a new entry in this
   list, and fill in the details. Events are automatically sorted into
   "Upcoming" and "Past" on events.html based on today's date — you don't
   need to move them between lists yourself.

   Field guide:
     title       - the event's name
     date        - the event date in YYYY-MM-DD format (e.g. "2026-04-05").
                   This exact format matters — it's what lets the site sort
                   events and split them into upcoming/past automatically.
     location    - a city/venue, or "Virtual" for online events
     description - a short 1-3 sentence description
     link        - a URL for more info or registration. Leave as "" (empty
                   quotes) if there isn't one yet — the button just won't show. */

const events = [

  {
    title: "[REPLACE ME] Example Event",
    date: "2026-01-01",
    location: "REPLACE ME: City, State (or \"Virtual\")",
    description: "REPLACE ME: A short description of what this event is and who it's for.",
    link: ""
  },

  // Add more events here — copy the block above and edit the values.
  // {
  //   title: "Annual Symposium",
  //   date: "2026-09-12",
  //   location: "Washington, DC",
  //   description: "...",
  //   link: "https://..."
  // },

];


/* ==========================================================================
   4. RENDERING (turns the data above into HTML — you shouldn't need to
      edit anything below this line)
   ========================================================================== */

/* --- Organizations ---------------------------------------------------- */

function renderOrganizations() {
  const container = document.querySelector('#organizations-list');
  if (!container) return; // this page doesn't have an organizations list

  organizations.forEach(org => {
    const card = document.createElement('div');
    card.className = 'org-card';

    const socialLinksHTML = org.socialLinks.map(social =>
      `<a href="${social.url}" target="_blank" rel="noopener">${social.platform}</a>`
    ).join('');

    card.innerHTML = `
      <img src="${org.logo}" alt="${org.name} logo" class="org-logo">
      <h3>${org.name}</h3>
      <p>${org.description}</p>
      <a href="${org.website}" class="btn btn-primary" target="_blank" rel="noopener">Visit Website</a>
      ${socialLinksHTML ? `<div class="org-social">${socialLinksHTML}</div>` : ''}
    `;

    container.appendChild(card);
  });
}

/* --- Events -------------------------------------------------------------
   Splits the events list into "upcoming" (today or later) and "past"
   (before today), then sorts upcoming soonest-first and past most-recent-
   first, and renders each into its own container. */

function formatEventDate(isoDateString) {
  // "T00:00:00" forces the browser to read the date in local time instead
  // of UTC, which otherwise can display the day before what you typed.
  const date = new Date(isoDateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function buildEventCard(event) {
  const card = document.createElement('div');
  card.className = 'event-card';
  card.innerHTML = `
    <p class="event-date">${formatEventDate(event.date)}</p>
    <h3>${event.title}</h3>
    <p class="event-location">${event.location}</p>
    <p>${event.description}</p>
    ${event.link ? `<a href="${event.link}" class="btn btn-primary" target="_blank" rel="noopener">More Info</a>` : ''}
  `;
  return card;
}

function renderEvents() {
  const upcomingContainer = document.querySelector('#upcoming-events-list');
  const pastContainer = document.querySelector('#past-events-list');
  if (!upcomingContainer && !pastContainer) return; // this page doesn't have event lists

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcoming = [];
  const past = [];

  events.forEach(event => {
    const eventDate = new Date(event.date + 'T00:00:00');
    if (eventDate >= today) {
      upcoming.push(event);
    } else {
      past.push(event);
    }
  });

  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date)); // soonest first
  past.sort((a, b) => new Date(b.date) - new Date(a.date));     // most recent first

  if (upcomingContainer) {
    if (upcoming.length === 0) {
      upcomingContainer.innerHTML = '<p class="empty-list-message">No upcoming events scheduled right now — check back soon!</p>';
    } else {
      upcoming.forEach(event => upcomingContainer.appendChild(buildEventCard(event)));
    }
  }

  if (pastContainer) {
    if (past.length === 0) {
      pastContainer.innerHTML = '<p class="empty-list-message">No past events yet.</p>';
    } else {
      past.forEach(event => pastContainer.appendChild(buildEventCard(event)));
    }
  }
}

renderOrganizations();
renderEvents();
