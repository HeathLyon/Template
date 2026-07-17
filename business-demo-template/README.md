# Business Demo Website Template

A reusable, responsive service-business website designed for sales demos.

## Why this structure works

- **One configuration file:** Change the business identity and content in `site.config.js`.
- **No framework or build process:** Upload directly to GitHub Pages, Netlify, Cloudflare Pages, or any standard host.
- **Responsive and accessible:** Includes mobile navigation, keyboard-friendly controls, semantic sections, reduced-motion support, and structured headings.
- **Conversion focused:** Hero CTA, estimate form, trust statistics, services, process, proof gallery, reviews, FAQs, and final contact section.
- **SEO ready:** Editable title, meta description, Open Graph data, and LocalBusiness schema.
- **Expandable:** Add more objects to the arrays in `site.config.js` to create additional cards, services, reviews, FAQs, and gallery items.

## File structure

```text
business-demo-template/
├── index.html
├── styles.css
├── site.config.js
├── app.js
├── README.md
└── assets/
    ├── favicon.svg
    ├── logo-mark.svg
    ├── hero-placeholder.svg
    ├── about-placeholder.svg
    ├── gallery-1.svg
    ├── gallery-2.svg
    ├── gallery-3.svg
    └── gallery-4.svg
```

## Fast workflow for each lead

1. Duplicate the template folder or create a new branch.
2. Edit `site.config.js`.
3. Replace `assets/logo-mark.svg` with the business logo.
4. Replace the hero, about, and gallery images.
5. Verify the phone number, email, service area, reviews, and claims.
6. Test the mobile layout and all links.
7. Publish the demo link.
8. Do not represent the demo as an official website until the business approves it.

## Changing the business

Open `site.config.js` and edit:

- `business`
- `seo`
- `theme`
- `hero`
- `services`
- `about`
- `process`
- `gallery`
- `testimonials`
- `faq`
- `contact`

## Using real images

You can use `.jpg`, `.png`, `.webp`, or `.svg`.

Recommended image sizes:

- Hero: 1920 × 1200, preferably WebP
- About: 1000 × 1200
- Gallery: 1200 × 900
- Logo: transparent SVG, PNG, or WebP

Keep each large image below roughly 300–500 KB when possible.

## Form behavior

The estimate form currently opens the visitor's email application using `mailto:`. For a real production website, connect the form to a service such as:

- Formspree
- Netlify Forms
- Basin
- A custom API endpoint

## Adding a service

Add another object inside the `services` array:

```js
{
  icon: "07",
  title: "New Service",
  description: "A short, customer-focused description."
}
```

The new service card and form option will be generated automatically.

## GitHub Pages

1. Push the files to a repository.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch and root folder.
5. Save and wait for the Pages URL to appear.

## Important sales-demo note

Only use business logos, photos, reviews, certifications, guarantees, and claims that you have permission to use or can accurately verify. Clearly label speculative content during the demo stage.
