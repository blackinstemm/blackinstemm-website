# BlackInSTEMM Website

A plain HTML/CSS/JS website for the BlackInSTEMM collective network. No build
tools, no frameworks — just files you can open, edit, and re-upload.

5 pages: Home (`index.html`), About (`about.html`), Organizations
(`organizations.html`), Events (`events.html`), and Contact (`contact.html`).

## Previewing the site on your computer

The Organizations and Events pages build their cards with JavaScript, and
most browsers block that when you just double-click an HTML file (it'll look
broken — empty where the cards should be). To preview the site properly:

1. Open a terminal in this folder.
2. Run:
   ```bash
   python3 -m http.server 5544
   ```
3. Open `http://localhost:5544` in your browser.
4. When you're done, go back to the terminal and press Ctrl+C to stop it.

(Home, About, and Contact don't strictly need this — they'll look fine with
a plain double-click — but it's easiest to just always preview this way.)

## How to change the color scheme

Open [css/style.css](css/style.css) and look at the very top of the file, in
the `:root { ... }` block (Section 1, "THEME VARIABLES"). Every color used
anywhere on the site is defined once there as a line like:

```css
--color-accent-primary: #D9A441; /* gold — links, buttons, nav highlight, main call-to-action */
```

Change the hex code (e.g. `#D9A441`) to a new color and every page updates
automatically. The comment next to each variable tells you what it controls.
This is a dark theme: `--color-bg` and `--color-bg-alt` are the two
background shades, `--color-text`/`--color-text-muted` are the two text
shades, and the four `--color-accent-*` variables are used for links,
buttons, and small decorative touches (like the colored line across the top
of each card).

Fonts work the same way, a few lines below the colors (`--font-heading` and
`--font-body`) — both are currently set to "Josefin Sans," loaded from
Google Fonts via the `<link>` tags in each page's `<head>`.

## How to edit page text

Open the page's `.html` file (e.g. `index.html`) in any text editor and edit
the text between tags directly. Anything wrapped in `[REPLACE ME: ...]` is
placeholder text that still needs your real content — search the file for
`REPLACE ME` to find every spot that needs attention.

You don't need to touch anything inside `< >` angle brackets — those are HTML
tags that control layout/structure, not visible text.

The Organizations and Events page text is the exception — see the next
section, that content lives in `js/main.js` instead of the `.html` files.

## How to add a new organization

Open [js/main.js](js/main.js) and find the `organizations` list near the top
(Section 2). Copy the example entry — the whole block from `{` to `},` — paste
it as a new entry in the list, and fill in the values:

```js
{
  name: "Acme STEM Society",
  logo: "images/organizations/acme-logo.png",
  description: "A short description of the organization.",
  website: "https://acmestem.org",
  socialLinks: [
    { platform: "Instagram", url: "https://instagram.com/acmestem" },
    { platform: "LinkedIn", url: "https://linkedin.com/company/acmestem" }
  ]
}
```

- `logo` should point to a file you've dropped into `images/organizations/`.
- `socialLinks` can have as many entries as the organization has — or be an
  empty list (`socialLinks: []`) if they have none.
- Save the file and refresh the page — no other steps needed. New
  organizations appear automatically on `organizations.html`.

## How to add a new event

Same idea, in the `events` list a bit further down in `js/main.js` (Section 3):

```js
{
  title: "Annual Symposium",
  date: "2026-09-12",
  location: "Washington, DC",
  description: "A short description of the event.",
  link: "https://example.org/symposium"
}
```

- `date` must be in `YYYY-MM-DD` format — that's what lets the site sort
  events and automatically split them into "Upcoming" and "Past" based on
  today's date. You never need to move an event between lists yourself.
- `link` is optional — leave it as `""` (empty quotes) if there's nowhere to
  link yet, and the "More Info" button just won't show up for that event.

## How to swap in new images

- **Logo:** replace `images/logo/logo-placeholder.svg` with your exported
  logo file. If your new file has a different name or file type (e.g.
  `logo.png` instead of `logo-placeholder.svg`), update the `<img src="...">`
  path in the header of every HTML page to match.
- **Organization logos:** drop exported Canva images into
  `images/organizations/` and point to them from the `logo` field of that
  organization's entry in `js/main.js` (see above).

## Setting up the contact form

The contact form on `contact.html` has no backend of its own (this is a
plain static site), so it needs a free form service to actually deliver
submissions to your inbox:

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form — it gives you a URL like `https://formspree.io/f/abcd1234`.
3. Open `contact.html`, find the `<form ...>` tag, and replace
   `REPLACE-ME-FORM-ID` in its `action` attribute with your real form URL.

Until that's done, submitting the form will show a Formspree error page.
Real contact info (the `mailto:` email link and social links) works
immediately — just replace the `REPLACE-ME@example.org` placeholders in
`contact.html` and in the shared footer on every page.

If you'd rather not use a form service at all, you can delete the entire
`<form class="contact-form">...</form>` block in `contact.html` and rely on
just the "Prefer Email?" mailto link next to it.

## File structure

```
index.html             Home page
about.html             About page (story, mission, values)
organizations.html     Organizations page (cards built from js/main.js data)
events.html            Events page (cards built from js/main.js data)
contact.html           Contact page (form + contact info)
css/style.css          All styling for every page (colors, fonts, layout)
js/main.js             Mobile nav menu + organizations/events data & rendering
images/logo/           Site logo
images/organizations/  Organization logos — drop new ones in here
images/events/         Reserved for event images, if you ever want them
```
