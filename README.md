# SocialApp — React Social Networking Application

A full-featured social networking web application built with React and Vite, featuring a dynamic post feed, user authentication, and real-time data fetching.

---

## Features

- **Authentication** — Register and login with JWT-based auth, protected routes
- **Post Feed** — Browse all posts in a live-updating feed
- **Create Posts** — Share text and image posts
- **Comments** — Add and view comments on any post
- **My Posts** — View and manage your own posts with delete functionality
- **Post Details** — Dedicated page for each post
- **Form Validation** — Client-side validation with Zod and React Hook Form
- **Toast Notifications** — Real-time success/error feedback
- **Responsive UI** — Clean, modern design with Tailwind CSS

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Routing | React Router DOM v6 |
| Data Fetching | TanStack React Query |
| HTTP Client | Axios |
| Form Handling | React Hook Form |
| Validation | Zod |
| Styling | Tailwind CSS + DaisyUI |
| Notifications | React Hot Toast |
| Date Formatting | Moment.js |
| State Management | React Context API |
| Backend API | Route Academy REST API |

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Peter17710/Social-App-React.git

# Navigate into the project
cd Social-App-React

# Install dependencies
npm install
```

### Configuration

Create or update `vite.config.js` to proxy API requests:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://route-posts.routemisr.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── Components/
│   ├── AddPost/          # Post creation form
│   ├── Home/             # Main feed page
│   ├── Layout/           # App shell with Navbar
│   ├── Loader/           # Skeleton loading UI
│   ├── Login/            # Login page
│   ├── Navbar/           # Navigation bar
│   ├── NotFound/         # 404 page
│   ├── PostCard/         # Individual post component
│   ├── PostDetails/      # Single post view
│   ├── ProtectedAuth/    # Redirect logged-in users
│   ├── ProtectedRoutes/  # Redirect unauthenticated users
│   ├── Register/         # Registration page
│   └── UserPosts/        # Current user's posts
├── Context/
│   ├── TokenContext.jsx  # Auth token global state
│   └── PostContext.jsx   # Post & comment API functions
├── assets/               # Static assets
├── App.jsx               # Router configuration
├── main.jsx              # App entry point
└── index.css             # Global styles & design tokens
```

---

## API

This project connects to the [Route Academy Posts API](https://route-posts.routemisr.com).

| Method | Endpoint | Description |
|---|---|---|
| POST | /users/signup | Register a new account |
| POST | /users/signin | Login and receive token |
| GET | /users/profile-data | Get current user data |
| GET | /posts | Get all posts |
| POST | /posts | Create a new post |
| DELETE | /posts/:id | Delete a post |
| GET | /posts/:id | Get single post |
| POST | /posts/:id/comments | Add a comment |

---

## Author

**Peter Atef**
GitHub: [@Peter17710](https://github.com/Peter17710)
