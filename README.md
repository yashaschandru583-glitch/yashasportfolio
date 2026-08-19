# Yashas C. | Full-Stack Software Developer Portfolio

A production-grade, responsive portfolio web application crafted with React 19, TypeScript, Tailwind CSS, Motion animations, Lucide icons, and an Express/MongoDB backend with static fallback.

---

## 🚀 How to Deploy to GitHub Pages (Fix Blank Screen)

If you see a blank screen on GitHub Pages, it is because GitHub Pages is trying to serve raw uncompiled source files from the root `/` rather than the compiled `dist/` or `docs/` production bundle.

### Option A: GitHub Actions (Recommended — Zero Config)

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** > **Pages** (in the left sidebar).
   - Under **Build and deployment** > **Source**, change from *Deploy from a branch* to **GitHub Actions**.
3. That's it! The workflow in `.github/workflows/deploy.yml` will automatically build the site with Vite and publish it to GitHub Pages.

---

### Option B: Deploy from the `/docs` Folder

The build script automatically compiles the site into the `docs/` folder:

1. Build the production files:
   ```bash
   npm run build
   ```
2. Commit and push the generated `docs/` folder to GitHub:
   ```bash
   git add docs/
   git commit -m "Update GitHub Pages build in docs"
   git push origin main
   ```
3. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, keep **Deploy from a branch**.
   - Set the Branch to **`main`** (or `master`) and change the folder from `/ (root)` to **`/docs`**.
   - Click **Save**.

---

### Option C: One-Click CLI Deploy (`gh-pages`)

Run the automated command:
```bash
npm run deploy:gh-pages
```
This builds the site and pushes it to a dedicated `gh-pages` branch on your GitHub repository.

---

## 💻 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start the local development server (binds on port 3000)
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion (`motion/react`), Lucide React
- **Design System**: Premium Dark/Light Bento Grid layout, responsive mobile navigation
- **Backend (Optional / Full-Stack)**: Express 4, MongoDB / In-Memory Seed State, JWT Authentication
- **Static Hosting Support**: Built-in `localStorage` fallback with complete offline data persistence
