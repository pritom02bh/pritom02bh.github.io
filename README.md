# Pritom Bhowmik — Research & Work

A static, dependency-free HTML/CSS/JS academic homepage: about, research
(publications), projects, experience, education, and contact. Section order
on the page: About → Research → Projects → Experience → Education → Contact.

## Structure

```
index.html              Page markup (all sections)
css/styles.css            Design tokens + component styles (single light theme)
js/data.js                 ALL editable content: PAPERS (publications) + PROJECTS (case studies)
js/script.js               Behavior only — nav, scroll-spy, modal, rendering. You
                            shouldn't need to edit this file to update content.
assets/resume/Resume.pdf    Served by the "Download CV" buttons
assets/img/                 Drop profile.jpg here for the hero photo
research/files/             Drop PDFs here if you'd rather self-host a paper than link out
```

No build step, no dependencies. Open `index.html` directly in a browser, or serve the
folder with any static file server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Adding a publication

Open `js/data.js` and add an entry to the `PAPERS` array:

```js
{
  id: "my-new-paper",                  // unique slug
  type: "Journal Article",              // or "Conference Abstract", "Preprint", etc.
  title: "Full paper title",
  venue: "Journal / conference name",   // or null if unknown
  date: "Sep 2026",
  doi: "10.xxxx/xxxxx",                 // optional — shown as text, no need for the doi.org prefix
  link: "https://...",                  // optional — full text / PDF / publisher page.
                                         // Omit if there's no public link; the card still
                                         // displays, just without a "Read full paper" link.
},
```

That's the whole workflow — edit one array. Each card links straight out to
the paper; there's no separate pop-up for these since there's no abstract on
file, just bibliographic details. If you'd rather self-host a PDF than link
to a publisher page, drop it in `research/files/` and point `link` at it,
e.g. `"research/files/my-paper.pdf"`.

## Adding a project / case study

Same pattern, in the `PROJECTS` array in `js/data.js` — see the comments
above that array for the exact fields (problem/approach/results/stack/links).

## Other things you may want to edit

- **`assets/img/profile.jpg`** — add this file for the hero photo. Until it exists, a gradient "PB" placeholder is shown automatically.
- **`assets/resume/Resume.pdf`** — replace with your latest CV; keep the filename or update the links that reference it.
- **Favicon** — an inline "PB" monogram SVG in `index.html`'s `<head>`; edit the initials/colors there.
- **Brand gradient / colors** — CSS custom properties at the top of `css/styles.css` under `:root` (`--gradient-brand`, `--accent`, etc.).

## Deploying

Any static host works as-is (no server-side code):

- **GitHub Pages**: push this folder to a repo and enable Pages on the `main` branch.
- **Netlify / Vercel**: drag-and-drop the folder or connect the repo — no build command needed.
