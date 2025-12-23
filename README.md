# Personal Website

![alt text](https://github.com/samuel-garmany/samuel-garmany.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)

This repository hosts my personal website. I'm mostly using this project to experiment with web development technologies on the side.

## 🦖 View the Site

**[garmany.me](https://garmany.me/)**

### ⚙️ Tech Stack

- **[Tailwind CSS](https://tailwindcss.com/):** Used for styling; helps keep the project size minimal.
- **Node.js:** Handles dependency management and runs the Tailwind CLI build process.
- **GitHub Actions:** CI/CD pipeline that builds the CSS and publishes the site.
- **GitHub Pages:** Static hosting.

### 💻 Running Locally

If you'd like to run this project on your own machine:

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
   npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
   ```
   *(Note: Open `index.html` in your browser to view changes.)*
