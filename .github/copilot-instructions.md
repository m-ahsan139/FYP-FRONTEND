# Copilot Instructions for FYP-FRONTEND

## Project Overview

This repository contains the frontend for a Final Year Project (FYP). It is an early-stage web application project. As the project evolves, these instructions should be updated to reflect the actual tech stack, build commands, and project layout.

## Repository Summary

- **Name:** FYP-FRONTEND
- **Purpose:** Frontend web application for a Final Year Project
- **Stage:** Early development
- **Root files:** `README.md`

## Tech Stack

> Update this section as the project grows.

The frontend is expected to be built with modern web technologies. Common choices for projects like this include:
- React / Next.js (JavaScript / TypeScript)
- Vite or Create React App as the build tool
- CSS frameworks such as Tailwind CSS or Bootstrap

Once a framework and tooling are chosen and scaffolded, update this file with:
- The exact framework and version
- Build, lint, test, and dev-server commands

## Build & Development Commands

> These commands should be updated once the project is bootstrapped.

Typical workflow once the project is set up:

```bash
# Install dependencies (always run this first after cloning or after dependency changes)
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Lint the codebase
npm run lint
```

## Project Layout

```
FYP-FRONTEND/
├── .github/
│   └── copilot-instructions.md   # This file
├── README.md                     # Project overview
```

> Update this section as directories and files are added to the project.

## Coding Guidelines

- Follow the conventions established by the chosen framework (e.g., React component naming in PascalCase).
- Keep components small and focused on a single responsibility.
- Write meaningful variable and function names.
- Prefer functional components with hooks over class components (if using React).
- Add comments for complex logic.

## Notes for the Coding Agent

- Trust the instructions in this file. Only search the codebase if the information here seems incomplete or incorrect.
- When new dependencies are added, always run `npm install` before building.
- If no `package.json` is present yet, the project has not been bootstrapped — scaffold it using the appropriate tool (e.g., `npm create vite@latest` for Vite + React).
- Update this file (`copilot-instructions.md`) whenever significant architectural decisions are made, commands change, or the project layout is updated.
