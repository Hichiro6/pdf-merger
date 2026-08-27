# PDF Merger

> Merge multiple PDF files into a single document — 100% client-side, privacy-first

<div align="center">

![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-red)
![Platform](https://img.shields.io/badge/Platform-Web-green)
![Tests](https://img.shields.io/badge/Tests-Playwright%20%7C%20Vitest-blue)

**Your files never leave your browser — no uploads, no servers, no tracking**

</div>

---

## 🔒 Privacy-First Design

Need to combine multiple PDFs into one? Contract + annexes? Multiple scanned pages? Invoice + receipt?

PDF Merger does it **locally in your browser** using [pdf-lib](https://pdf-lib.js.org/) and [PDF.js](https://mozilla.github.io/pdf.js/). Your files stay on your device — nothing is uploaded to any server.

---

## ⚡ Key Features

- **🔒 100% Local Processing** — All operations happen in your browser using WebAssembly
- **📄 Multiple File Support** — Merge up to 10 PDF files at once
- **🔀 Drag-and-Drop Reordering** — Rearrange files before merging
- **🖼️ Page Thumbnails** — Live preview of each PDF's first page
- **🌐 Multi-Language** — Supports EN, FR, DE, ES, PT, NL, IT
- **♿ Accessible** — Full keyboard navigation and screen reader support (ARIA-compliant)
- **📱 PWA Ready** — Install as a Progressive Web App on mobile devices
- **📊 File Statistics** — See page counts and total size before merging

---

## 🚀 Quick Start

### Online Demo
Visit the live demo (if hosted): `https://[your-domain]/pdf-merger`

### Local Development
```bash
# Clone the repository
git clone https://github.com/Hichiro6/pdf-merger.git
cd pdf-merger

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📖 Usage Guide

### Step 1: Upload Your PDF Files
- Drag and drop multiple PDF files onto the dropzone, or
- Click to browse and select multiple files at once

### Step 2: Reorder Files (Optional)
Drag and drop file cards to rearrange the merge order. The final PDF will follow this order.

### Step 3: Merge and Download
Click "Merge PDFs" to combine all files into a single document.
Download the merged PDF immediately.

---

## 🛠️ Technical Stack

| Technology | Purpose |
|------------|---------|
| **[Vite](https://vitejs.dev/)** | Build tool & dev server |
| **[pdf-lib](https://pdf-lib.js.org/)** | PDF manipulation (merging) |
| **[PDF.js](https://mozilla.github.io/pdf.js/)** | PDF rendering & preview |
| **[Biome](https://biomejs.dev/)** | Linting & formatting |
| **[Vitest](https://vitest.dev/)** | Unit testing |
| **[Playwright](https://playwright.dev/)** | E2E testing |

---

## 🧪 Testing

```bash
# Run unit tests
npm run test:unit

# Run E2E tests
npm run test:e2e

# Run tests with UI
npm run test:ui

# View test report
npm run test:report
```

Test coverage includes:
- Multi-file upload & validation
- Drag-and-drop reordering
- PDF merging accuracy
- Page order preservation
- Edge cases (password-protected PDFs, mixed page counts)

---

## 📂 Project Structure

```
pdf-merger/
├── src/
│   ├── main.js           # Application logic
│   └── i18n.js           # Internationalization
├── styles/
│   └── main.css          # Global styles
├── public/
│   ├── manifest.json     # PWA manifest
│   ├── sw.js             # Service worker
│   └── icons/            # PWA icons
├── tests/
│   ├── unit/             # Unit tests
│   └── e2e/              # Playwright E2E tests
├── vite.config.js        # Vite configuration
├── playwright.config.js  # Playwright configuration
├── biome.json            # Biome linting rules
├── Dockerfile            # Container deployment
└── docker-compose.yml    # Docker Compose setup
```

---

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (HMR enabled) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code with Biome |
| `npm run format` | Format code with Biome |
| `npm test` | Run all tests |
| `docker compose up` | Run in Docker container |

---

## 🌍 Internationalization

Supported languages:
- **English** (default)
- **Français** (FR)
- **Deutsch** (DE)
- **Español** (ES)
- **Português** (PT)
- **Nederlands** (NL)
- **Italiano** (IT)

Add your language by editing `src/i18n.js`.

---

## 📝 Use Cases

- **Contracts**: Combine agreement + terms + signatures into one file
- **Business**: Merge invoices, receipts, and purchase orders
- **Academic**: Combine research papers into a reference pack
- **Personal**: Organize family photos scanned as separate PDFs
- **Administrative**: Bundle identity documents for applications

---

## 🔐 Security & Privacy

- ✅ **No network calls** — All processing is local
- ✅ **No analytics** — No tracking or telemetry
- ✅ **No cookies** — Nothing stored externally
- ✅ **Open source** — Code is auditable
- ✅ **Client-side only** — No backend requirements

---

## 📄 License

Copyright © 2026 Hichiro6

Licensed under **CC BY-NC-ND 4.0** — You are free to share and adapt this work for non-commercial purposes, provided you give attribution and do not create derivative works.

See [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

This project is released under a restrictive license to protect privacy-focused usage. For commercial licensing or contributions, please open an issue.

---

## 🙏 Acknowledgments

- [pdf-lib](https://pdf-lib.js.org/) — PDF manipulation library
- [PDF.js](https://mozilla.github.io/pdf.js/) — Mozilla's PDF toolkit
- [Vite](https://vitejs.dev/) — Next-generation frontend tooling

---

<div align="center">

**Made with ❤️ for privacy-conscious users**

[Report Bug](https://github.com/Hichiro6/pdf-merger/issues) · [Request Feature](https://github.com/Hichiro6/pdf-merger/issues)

</div>
