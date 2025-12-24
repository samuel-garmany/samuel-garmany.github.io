# Personal Website

[![Deploy](https://github.com/samuel-garmany/samuel-garmany.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/samuel-garmany/samuel-garmany.github.io/actions/workflows/deploy.yml)

This repository hosts my personal website. This project to mostly used to experiment with web development technologies on the side.

## 🦖 View the Site

**[garmany.me](https://garmany.me/)**

## ⚙️ Tech Stack

- **[Tailwind CSS](https://tailwindcss.com/):** Used for styling; helps keep the project size minimal.
- **[Node.js](https://nodejs.org/):** Handles dependency management and runs the Tailwind CLI build process.
- **GitHub Actions/GitHub Pages:** CI/CD pipeline that builds the CSS and publishes the site.

## 💻 Running Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/samuel-garmany/samuel-garmany.github.io.git
   cd samuel-garmany.github.io
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Start the Tailwind watcher**

   ```bash
   npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
   ```

5. **View the site**

   Open `index.html` in your browser
