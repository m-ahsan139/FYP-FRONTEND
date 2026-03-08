# FYP Portal — Final Year Project Frontend

A modern, responsive web application for managing Final Year Projects (FYP). Built with **React + Vite**.

## Features

- 🏠 **Landing Page** — Hero section, feature highlights, and CTA
- 🔐 **Authentication** — Login and Register pages with validation
- 📊 **Dashboard** — Progress stats, milestone tracker, recent activity & quick actions
- 📁 **Projects** — Searchable and filterable project gallery
- 🔒 **Protected Routes** — Unauthenticated users are redirected to login
- 📱 **Responsive Design** — Works on desktop, tablet, and mobile

## Screenshots

| Home | Login | Dashboard | Projects |
|------|-------|-----------|----------|
| ![Home](https://github.com/user-attachments/assets/36e48807-1a55-4518-a49c-a9ef2ef42ff9) | ![Login](https://github.com/user-attachments/assets/9c26435b-4c6d-44db-b526-c38629513fab) | ![Dashboard](https://github.com/user-attachments/assets/39c2a875-61a2-41c0-ab8a-5c5d3b731432) | ![Projects](https://github.com/user-attachments/assets/d3209d56-8645-491c-aceb-7c83146fad34) |

## Tech Stack

- [React 19](https://react.dev/)
- [Vite 7](https://vite.dev/)
- [React Router v7](https://reactrouter.com/)
- Plain CSS (no framework dependencies)

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Demo Login

Use these credentials to try the app:

| Field    | Value        |
|----------|--------------|
| Email    | demo@fyp.com |
| Password | password     |

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx        # Sticky navigation bar
│   ├── Navbar.css
│   └── ProtectedRoute.jsx
├── context/
│   ├── AuthContext.jsx   # React context (auth state)
│   ├── AuthProvider.jsx  # Context provider component
│   └── useAuth.js        # useAuth hook
└── pages/
    ├── Home.jsx / Home.css
    ├── Login.jsx / Auth.css
    ├── Register.jsx
    ├── Dashboard.jsx / Dashboard.css
    ├── Projects.jsx / Projects.css
    └── NotFound.jsx / NotFound.css
```
