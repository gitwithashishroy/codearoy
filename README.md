# ashish.dev

Personal portfolio website showcasing my work as a Frontend Engineer with integrated GitHub stats, coding profiles, skills, and experience.

## Tech Stack

- **Next.js 16** with App Router
- **TypeScript** with strict mode
- **React 19**
- **SCSS Modules** with centralized breakpoints
- **Server Actions** for API integrations
- **Recharts** for data visualization

## Features

- 🎯 Dynamic section-based architecture with easy enable/disable via config
- 📊 Real-time GitHub stats integration (commits, contributions, stars)
- 🎨 Responsive design with mobile and tablet breakpoints
- ⚡ Server-side rendering with Next.js caching strategies
- 🎨 Custom UI component library
- 📝 Type-safe configuration for personal details and sections

## Getting Started

1. **Install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**
   Create a `.env.local` file:

```env
GITHUB_TOKEN=your_github_token_here
```

3. **Run development server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Development Commands

```bash
npm run dev      # Start development server (clears .next cache)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run Prettier checks
npm run format   # Format code with Prettier
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
├── components/       # Shared components (UI, Layout)
│   ├── ui/          # Button, Card, Container, Section
│   └── layout/      # Header, Footer
├── config/          # Configuration files
│   ├── PERSONAL_DETAILS_CONFIG.ts  # Personal info, skills, experience
│   └── sectionsConfig.ts           # Page sections configuration
├── features/        # Feature-based modules
│   ├── github/      # GitHub API integration & components
│   ├── leetcode/    # LeetCode stats integration
│   └── homepage/    # Homepage sections (Hero, Skills, etc.)
└── styles/          # Global styles & breakpoints
```

## Configuration

### Sections Configuration

Enable/disable sections in [`sectionsConfig.ts`](src/config/sectionsConfig.ts):

```typescript
export const SECTIONS: SectionConfig[] = [
  { id: 'home', component: Hero, enabled: true },
  { id: 'github', component: CodingProfile, enabled: true },
  { id: 'work', component: Work, enabled: false }, // Disabled
  // ...
];
```

## Styling Conventions

- **SCSS Modules**: Component-scoped styles (e.g., `Component.module.scss`)
- **Breakpoints**: Import centralized breakpoints via `@use '../styles/breakpoints' as bp;`
- **Responsive mixins**: Use `@include bp.mobile` and `@include bp.tablet`
- **Path alias**: `@styles` for accessing global styles

## Git Workflow

Husky pre-commit hooks automatically:

- Format staged files with Prettier
- Ensure code consistency before commits

## Author

**Ashish Kumar Roy**  
Frontend Engineer  
[@gitwithashishroy](https://github.com/gitwithashishroy)
