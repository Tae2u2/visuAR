# CLAUDE.md - VisuAR Project Guide

This document provides Claude Code with essential information about the VisuAR project structure, commands, and conventions.

## Project Overview

**VisuAR** is a camera filter and usage analytics service that provides real-time face recognition-based camera filters with data collection and visualization capabilities.

## Tech Stack

- **Framework**: Next.js 15.5.2 with App Router (React 19.1.0)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Database**: PostgreSQL with Prisma ORM 6.16.1
- **Face Recognition**: face-api.js 0.22.2
- **Icons**: react-icons 5.5.0

## Available Commands

```bash
# Development
npm run dev          # Start development server with turbopack
npm run build        # Build for production with turbopack
npm run start        # Start production server

# Database
npx prisma generate  # Generate Prisma client
npx prisma migrate   # Run database migrations
npx prisma studio    # Open Prisma Studio
```

## Project Structure

```
visuAR/
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── live/page.tsx       # Live streaming page
│   │   ├── star/page.tsx       # Artist/Star page
│   │   └── setting/page.tsx    # Settings page
│   ├── components/
│   │   ├── home/               # Home page components
│   │   ├── artist/             # Artist-related components
│   │   ├── layout/             # Layout components (Header, Footer, Container)
│   │   ├── manage/             # Management components
│   │   └── util/               # Utility components
│   ├── features/
│   │   └── live/               # Live streaming features
│   └── prisma/
│       └── scheme.prisma       # Additional Prisma schema
├── prisma/
│   └── schema.prisma           # Main Prisma schema
├── public/
│   └── face-filter/            # Face filter assets and scripts
└── package.json
```

## Key Features

1. **Real-time Face Recognition**: Camera-based face tracking with AR filter application
2. **Multiple Filters**: Various overlay options using MediaPipe (5+ filters implemented)
3. **Live Streaming**: Real-time streaming functionality with UI
4. **Artist Management**: Artist profiles and fan interaction features
5. **Usage Analytics**: Filter usage tracking and data visualization

## Development Notes

- **Database**: Uses PostgreSQL with Prisma ORM
- **Client Generation**: Prisma client outputs to `../src/generated/prisma`
- **Face Detection**: Implemented using face-api.js and MediaPipe
- **Styling**: Tailwind CSS with custom configurations
- **Git Workflow**: Uses `develop` branch for development, `main` for production

## Recent Changes

Based on recent commits:
- Face filter implementation with MediaPipe (5 filters)
- Live streaming UI and basic functionality
- Artist live request list UI
- Page UI improvements
- Screen application features

## Commit Convention

- `feat:` New features
- `fix:` Bug fixes
- `style:` UI/styling changes
- `refactor:` Code refactoring
- `docs:` Documentation
- `chore:` Configuration/build changes

## Important Files

- `package.json`: Dependencies and scripts
- `prisma/schema.prisma`: Database schema
- `next.config.ts`: Next.js configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `public/face-filter/`: Face filter implementation files