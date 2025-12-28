# MaghMela Express 🚲🙏
> Last deployed: 2025-12-28 21:51 IST


MaghMela Express is a premium, high-performance landing page and booking platform tailored for the **Magh Mela 2025** event in Prayagraj. It combines spiritual aesthetics with modern technology to provide seamless transport and pilgrimage support.

## 🚀 Professional Deployment (Cloudflare Pages)

This project is optimized for deployment on **Cloudflare Pages**. 

### Automated Deployment (Recommended)
A GitHub Action is configured in `.github/workflows/deploy.yml`. To enable it:
1. Add `CLOUDFLARE_API_TOKEN` to your GitHub Repository Secrets.
2. Add `CLOUDFLARE_ACCOUNT_ID` to your GitHub Repository Secrets.
3. Every push to `frontend-only` or `main` will automatically build and deploy the app.

### Manual Configuration (Dashboard)
If using the Cloudflare Dashboard's Git Integration, ensure the following settings are applied to avoid "Next.js" detection errors:
- **Framework Preset**: `Vite` (Crucial: Do not leave as Next.js)
- **Build Command**: `npm run build`
- **Build Output Directory**: `dist`
- **Node.js Version**: 18+

## 🛠 Tech Stack & Architecture

- **Frontend**: React 19 + Vite 7
- **UI/UX**: Vanilla CSS + Framer Motion (Optimized for 60fps)
- **3D Elements**: React Three Fiber / Three.js
- **State Management**: React Hooks + React Hook Form
- **Deployment**: Cloudflare Pages CI/CD

## 📂 Project Structure

- `src/components/`: Modular, reusable UI components.
- `src/design-system.css`: Core design tokens and global styles.
- `public/`: Assets and Cloudflare configuration files (`_redirects`).
- `.github/workflows/`: Professional CI/CD pipelines.

## 👨‍💻 Development

### Setup
```bash
npm install
```

### Dev Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

---
**Om Namah Shivay** 🕉️
