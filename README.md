# Personal Website

[![Deploy](https://github.com/samuel-garmany/samuel-garmany.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/samuel-garmany/samuel-garmany.github.io/actions/workflows/deploy.yml)

My personal website, which I also use to try things out.

## View the Site

**[garmany.me](https://garmany.me/)**

## Tech Stack

- **[Tailwind CSS](https://tailwindcss.com/):** Styling, so I don't have to write CSS.
- **[Node.js](https://nodejs.org/):** Runs the Tailwind build.
- **GitHub Actions/GitHub Pages:** Builds the CSS and publishes the site on push.

## Running Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/samuel-garmany/samuel-garmany.github.io.git
   cd samuel-garmany.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the Tailwind watcher**

   ```bash
   npm run dev
   ```

   Use `npm run build` for a one-off build instead of watching.

4. **View the site**

   Open `index.html` in your browser

## Photos

Photos in `assets/` are resized to 1200px on the long edge before being
committed, which keeps the page under a couple of megabytes:

```bash
magick photo.jpg -auto-orient -resize '1200x1200>' -quality 82 -strip -interlace Plane assets/photo.jpg
```

Add the resulting `width` and `height` to the `<img>` tag so the layout doesn't
shift while the photo loads.
