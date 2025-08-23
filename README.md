# Vanisher Monorepo

This monorepo contains the Vanisher package and its documentation site.

## 🏗️ Structure

```
vanisher-monorepo/
├── packages/
│   └── vanisher/          # Main package source
├── apps/
│   └── docs/              # VitePress documentation site
├── .github/workflows/      # CI/CD workflows
└── package.json            # Root workspace configuration
```

## 📦 Packages

### `vanisher` - Main Package

A JavaScript library that gradually fades out websites and elements based on specified deadlines. Perfect for creating urgency, managing time-sensitive content, or implementing creative fade effects.

**Features:**

- 🎯 Deadline-based opacity control
- ⚡ Lightweight with zero dependencies
- 🧩 Framework agnostic (vanilla JS, React, Next.js)
- 🔧 Full TypeScript support
- 📱 Responsive and customizable

**Installation:**

```bash
npm install vanisher
```

**Quick Start:**

```javascript
import { vanisher } from "vanisher";

vanisher.fade({
  element: document.getElementById("my-element"),
  deadline: new Date("2024-12-31T23:59:59"),
  duration: "30d",
});
```

## 📚 Documentation

The documentation site is built with VitePress and provides comprehensive guides, API references, and examples.

**Local Development:**

```bash
# Install dependencies
npm install

# Start docs dev server
npm run docs:dev

# Build docs
npm run docs:build

# Preview built docs
npm run docs:preview
```

**Visit:** [Documentation Site](https://your-username.github.io/vanisher/)

## 🚀 Development

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/vanisher.git
cd vanisher

# Install dependencies
npm install

# Build all packages
npm run build

# Run tests
npm run test

# Type checking
npm run type-check

# Format code
npm run format
```

### Workspace Scripts

| Script                    | Description                     |
| ------------------------- | ------------------------------- |
| `npm run build`           | Build all packages              |
| `npm run dev`             | Start dev mode for all packages |
| `npm run test`            | Run tests for all packages      |
| `npm run type-check`      | Type check all packages         |
| `npm run docs:dev`        | Start docs development server   |
| `npm run docs:build`      | Build documentation site        |
| `npm run docs:preview`    | Preview built documentation     |
| `npm run package:build`   | Build only the vanisher package |
| `npm run package:publish` | Publish vanisher package to npm |

## 🔄 CI/CD

### Package Publishing

The `vanisher` package is automatically published to npm when changes are pushed to the `main` branch in the `packages/vanisher/` directory.

**Requirements:**

- `NPM_TOKEN` secret configured in GitHub repository
- Changes must be in `packages/vanisher/` directory

### Documentation Deployment

The documentation site is automatically deployed to GitHub Pages when changes are pushed to the `main` branch in the `apps/docs/` directory.

**Features:**

- Automatic builds on content changes
- GitHub Pages deployment
- Path-based triggers for efficient builds

## 📁 Directory Details

### `packages/vanisher/`

Contains the main Vanisher package:

- Source code (`src/`)
- Build configuration (`rollup.config.ts`)
- Tests (`tests/`)
- Examples (`examples/`)
- Package configuration (`package.json`)

### `apps/docs/`

Contains the VitePress documentation site:

- Documentation pages (Markdown)
- VitePress configuration (`.vitepress/`)
- Theme customization
- Build output (`.vitepress/dist/`)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm run test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines

- **Package changes**: Make changes in `packages/vanisher/`
- **Documentation changes**: Make changes in `apps/docs/`
- **CI/CD changes**: Make changes in `.github/workflows/`
- **Root changes**: Make changes in root directory (e.g., workspace config)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Package on npm](https://www.npmjs.com/package/vanisher)
- [Documentation](https://your-username.github.io/vanisher/)
- [GitHub Repository](https://github.com/your-username/vanisher)
- [Issues](https://github.com/your-username/vanisher/issues)
- [Discussions](https://github.com/your-username/vanisher/discussions)

## 🙏 Acknowledgments

- Built with [VitePress](https://vitepress.dev/) for documentation
- Uses [Rollup](https://rollupjs.org/) for package bundling
- Tested with [Jest](https://jestjs.io/)
- Styled with modern CSS and responsive design principles
