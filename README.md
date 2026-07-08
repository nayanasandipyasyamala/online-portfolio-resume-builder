# Profile Center - Online Portfolio Resume Builder

Online Portfolio Builder with a React + Vite frontend and an Express / MongoDB backend.

## Overview 🌐

This repository contains a full-stack portfolio application that lets users create and manage portfolio content. The backend provides authentication and portfolio data APIs, while the frontend offers a polished dashboard and portfolio editing experience.

## Features ✨

- 🔐 User authentication (signup / login)
- 📂 Portfolio management endpoints
- 📁 File upload support via `/uploads`
- 🎨 React + Vite frontend with modern UI components
- 🖥️ Express backend with MongoDB persistence
- ⚙️ Development scripts for running frontend and backend together

## Tech Stack 🧩

- Frontend: React, TypeScript, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Authentication: JSON Web Tokens (JWT)
- Developer tools: concurrently, nodemon

## Folder Structure 📁

```
profile_center/
├─ backend/
│  ├─ middleware/
│  │  └─ auth.js
│  ├─ models/
│  │  ├─ Portfolio.js
│  │  └─ User.js
│  ├─ routes/
│  │  ├─ auth.js
│  │  └─ portfolio.js
│  ├─ index.js
│  ├─ package.json
│  └─ .env.example
├─ frontend/
│  ├─ public/
│  │  └─ robots.txt
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  │  ├─ AvatarDisplay.tsx
│  │  │  ├─ NavLink.tsx
│  │  │  └─ ui/
│  │  ├─ hooks/
│  │  ├─ lib/
│  │  ├─ pages/
│  │  ├─ templates/
│  │  ├─ App.tsx
│  │  ├─ App.css
│  │  ├─ index.css
│  │  ├─ main.tsx
│  │  └─ vite-env.d.ts
│  ├─ package.json
│  ├─ tsconfig.json
│  ├─ tsconfig.app.json
│  ├─ tsconfig.node.json
│  ├─ vite.config.ts
│  └─ package.json
├─ package.json
└─ README.md
```

- `frontend/` - React application and UI code
- `backend/` - Express API server and MongoDB models
- `package.json` - root commands for installation and running both apps

## Getting Started ▶️

### Prerequisites ✅

- Node.js 18+ installed
- npm installed
- MongoDB running locally or accessible through `MONGODB_URI`

### Install dependencies 📦

From the repository root:

```bash
npm run install-all
```

This will install dependencies for the root, frontend, and backend.

### Environment variables 🔧

Copy the backend example file to create your local environment config:

```bash
cd backend
copy .env.example .env
```

Then update `.env` as needed:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-builder
JWT_SECRET=your_jwt_secret_key_here
```

## Running Locally 🏃‍♂️

### Start frontend and backend together 🌟

From the root directory:

```bash
npm run dev
```

This will start:

- 🖥️ Frontend on the Vite development server
- 🌍 Backend on `http://localhost:5000`

### Run frontend only 🎬

```bash
cd frontend
npm run dev
```

### Run backend only 🔧

```bash
cd backend
npm run dev
```

### Build production frontend 📦

```bash
cd frontend
npm run build
```

### Start backend 🚀

```bash
cd backend
npm start
```

## API Endpoints 🧭

The backend exposes the following base routes:

- `GET /` - health check endpoint
- `POST /api/auth/register` - register a new user
- `POST /api/auth/login` - login and receive a JWT token
- `GET /api/portfolio` - fetch portfolio data
- `POST /api/portfolio` - create a portfolio item
- `PUT /api/portfolio/:id` - update a portfolio item
- `DELETE /api/portfolio/:id` - delete a portfolio item

> Note: the actual route handlers are defined in `backend/routes/auth.js` and `backend/routes/portfolio.js`.

## Notes 📝

- The backend serves uploaded files from `/uploads`.
- The frontend is configured as a Vite app with TypeScript and Tailwind.
- Update `JWT_SECRET` before deploying to production.

## License 📄

This project is private. Update the license and author fields in `package.json` as needed.
