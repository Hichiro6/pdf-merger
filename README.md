# PDF Merger

> Merge multiple PDF files into a single document — 100% client-side, no uploads, no servers.

<div align="center">

![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-red)
![Platform](https://img.shields.io/badge/Platform-Web-green)

**Privacy-first PDF merging — your files never leave your browser**

</div>

---

## 🔒 Why PDF Merger?

Need to combine multiple PDFs into one? Contract + annexes? Multiple scanned pages?  
PDF Merger does it **locally in your browser** — no upload, no server, no tracking.

---

## ⚡ Key Features

- **🔒 100% local**: Your PDFs stay on your device, no uploads
- **📄 Drag & drop**: Add up to 10 PDF files at once
- **🔀 Reorder files**: Drag-and-drop to rearrange before merging
- **🖼️ Page thumbnails**: Live preview of each PDF's first page
- **📊 Total page counter**: See the combined page count in real-time
- **🌍 7 languages**: EN, FR, DE, ES, PT, NL, IT
- **♿ Accessible**: ARIA-compliant, keyboard navigation, screen reader support
- **💾 PWA installable**: Add to home screen or install as an app

---

## 🚀 Usage

### Online

Access the app from any modern browser:
- Desktop: Chrome, Firefox, Safari, Edge
- Mobile: Safari (iOS), Chrome (Android)

### Local Installation

```bash
git clone https://github.com/Hichiro6/pdf-merger.git
cd pdf-merger
npm install
npm run dev
```

The app opens at `http://localhost:5173`

### Production Build

```bash
npm run build
# The dist folder contains everything needed for deployment
```

Deploy on GitHub Pages, Netlify, Vercel, or any static host.

---

## 💡 How It Works

1. **Drag & drop** your PDF files (or click to select)
2. **Reorder** them via drag-and-drop
3. Click **Merge PDFs**
4. **Download** the merged document

> ⚠️ **Important**: No files are sent to a server. Everything is processed locally in your browser via JavaScript.

---

## 🛠️ Tech Stack

| Role | Technology |
|------|------------|
| Framework | Vite (vanilla JS) |
| PDF Manipulation | pdf-lib |
| PDF Rendering | pdfjs-dist (thumbnails) |
| i18n | Custom lightweight system |
| Styling | Modern CSS3 (CSS Variables) |
| Build | Vite |

---

## 📁 Project Structure

```
pdf-merger/
├── index.html              # Main page
├── src/
│   ├── main.js             # Main application logic
│   └── i18n.js             # Internationalization (7 languages)
├── styles/
│   └── main.css            # Global styles
├── tests/
│   ├── unit/               # Vitest unit tests
│   └── e2e/                # Playwright E2E tests
├── LICENSE                 # CC BY-NC-ND 4.0
├── README.md
└── package.json
```

---

## 🧪 Testing

```bash
npm run test:run        # unit tests (Vitest)
npm run test:e2e        # E2E tests (Playwright)
```

---

## 📝 License

**CC BY-NC-ND 4.0** — Attribution - NonCommercial - NoDerivatives

See [LICENSE](LICENSE) for the full text.

---

## 📧 Contact

Developed by **Hichiro** (GitHub: [@Hichiro6](https://github.com/Hichiro6))

Issues and PRs on GitHub: https://github.com/Hichiro6/pdf-merger

---

<div align="center">

**Merge your PDFs — simply, locally, securely.**

Made with ❤️ in Belgium

</div>
