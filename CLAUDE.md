# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Refilely is a Google Drive file management application built with React, TypeScript, and Cloudflare Workers. It allows users to authenticate with Google OAuth and select files from their Google Drive using the Google Picker API.

## Development Commands

**Development server:**
```bash
bun run dev
```
Starts Vite dev server at http://localhost:5173

**Build:**
```bash
bun run build
```
Runs TypeScript compilation and Vite build

**Type checking:**
```bash
tsc --noEmit
```
Note: There's no dedicated `typecheck` script. Use `tsc --noEmit` directly or `bun run build` which includes type checking.

**Linting:**
```bash
bun run lint
```
Runs Biome linter and auto-fixes issues in `src/` directory

**Deploy:**
```bash
bun run deploy
```
Deploys to Cloudflare Workers

**Preview production build:**
```bash
bun run preview
```

**Dry run deployment:**
```bash
bun run check
```
Type checks, builds, and runs a dry deployment

## Architecture

The project uses a dual-entry architecture:

### Frontend (React App)
- **Entry point:** `src/react-app/main.tsx`
- **Components:** Located in `src/react-app/components/`
- **Hooks:** Custom hooks in `src/react-app/hooks/`
- **Main app logic:** `src/react-app/App.tsx`

### Backend (Cloudflare Worker)
- **Entry point:** `src/worker/index.ts`
- **Framework:** Hono for API routing
- **Deployment:** Configured via `wrangler.json`

### Key Features
- **Google Drive Integration:** `useGooglePicker` hook handles OAuth and file selection
- **Multi-language UI:** Japanese language support throughout the interface
- **Settings Management:** Account linking/unlinking functionality

## Environment Variables

Required for Google Drive integration:
- `VITE_GOOGLE_API_KEY`: Google API key
- `VITE_GOOGLE_CLIENT_ID`: Google OAuth client ID

## TypeScript Configuration

The project uses multiple TypeScript configurations:
- `tsconfig.json`: Root config with project references
- `tsconfig.app.json`: Frontend React app configuration
- `tsconfig.worker.json`: Cloudflare Worker configuration
- `tsconfig.node.json`: Node.js tooling configuration

## Code Style

- **Formatter:** Biome with tab indentation (width: 2), line width: 100
- **Import organization:** Automatic import sorting enabled
- **React:** Uses React 19 with modern hooks patterns
- **Styling:** Tailwind CSS v4 via Vite plugin

## Project Structure

```
src/
├── react-app/          # Frontend React application
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   └── main.tsx       # React entry point
└── worker/            # Cloudflare Worker backend
    └── index.ts       # Worker entry point
```

## Development Notes

- Uses Bun as package manager (bun.lock present)
- Cloudflare Workers with nodejs_compat enabled
- SPA routing configured for Cloudflare Workers assets
- Source maps enabled for production debugging
- Google Picker API integration requires proper CORS configuration