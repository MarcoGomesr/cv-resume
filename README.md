# CV Resume

AI-powered resume analyzer that evaluates CVs against job descriptions using ATS scoring.

## Features

- Upload CV/PDF for AI analysis
- ATS scoring with improvement tips
- Multiple resume management
- Cloud storage via Puter

## Tech Stack

### Languages
- **TypeScript** - Type-safe JavaScript
- **CSS** - Tailwind CSS 4

### Libraries & Frameworks
| Library | Purpose |
|---------|---------|
| React Router 7 | Full-stack framework |
| React 19 | UI library |
| Zustand | State management |
| Tailwind CSS 4 | Styling |
| PDF.js | PDF processing |
| Puter SDK | Cloud storage & AI |
| react-dropzone | File uploads |

## Project Structure

```
app/
├── components/
│   ├── ATS/              # ATS scoring component
│   ├── Details/          # Detailed feedback
│   ├── FileUploader/     # File upload UI
│   ├── Navbar/           # Navigation
│   ├── ResumeCard/       # Resume card display
│   ├── Score/            # Score components
│   ├── ScoreBadge/       # Score badge
│   ├── ScoreCircle/      # Circular score display
│   ├── Summary/          # Feedback summary
│   └── ui/               # Reusable UI components
├── routes/
│   ├── auth.tsx          # Authentication
│   ├── home.tsx          # Homepage
│   ├── resume.tsx        # Resume detail page
│   ├── upload.tsx        # Upload page
│   └── wipe.tsx          # Clear app data
├── lib/
│   ├── pdf2image.ts      # PDF to image conversion
│   ├── puter.ts          # Puter SDK integration
│   ├── formatSize.ts     # File size formatting
│   └── utils.ts          # General utilities
├── consts.ts             # App constants
├── data/                 # Type definitions
└── root.tsx              # App root
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Build

```bash
npm run build
```

## License

MIT
