<div align="center">

# 🌐 Yass - Modern Social Network Platform

**A premium, high-performance social media application built with React, Vite, and TailwindCSS.**

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.3.1-646CFF.svg?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Stars](https://img.shields.io/github/stars/yourusername/social-app?style=for-the-badge)](https://github.com/kamal-sorour/yass-social/stargazers)
[![Issues](https://img.shields.io/github/issues/yourusername/social-app?style=for-the-badge)](https://github.com/kamal-sorour/yass-social/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

</div>

<br />

## 🚀 Project Overview

Yass is a modern, production-ready social networking platform designed to connect people seamlessly. It provides a robust, dynamic environment where users can share their thoughts, engage with rich content, and interact with peers in real-time. With a deep emphasis on architectural performance, caching, and a visually stunning user interface, this platform delivers an exceptional user experience on both desktop and mobile devices.

## 🧠 Features

- **Authentication System:** Secure JWT-based login, signup, and nested routing protection (Guest and Protected routes).
- **Dynamic Home Feed:** Discover content with lightning-fast posts consumption, infinite scrolling, and skeleton loaders.
- **Interactive Posts:** Full support for creating, editing, and deleting posts. Rich interactions including liking, bookmarking (saving), and sharing.
- **Nested Comments & Replies:** Comprehensive commenting system allowing for deep discussion threads and independent comment engagements.
- **User Profiles & Social Graph:** Follow/Unfollow mechanism, personalized customizable profiles, and intelligent friend suggestions.
- **Real-Time Notifications:** Centralized notification hub for interactions, equipped with read/unread tracking and batch actions.
- **Responsive UI & Dark Mode:** Fluidly adapts to all screen sizes utilizing customized Tailwind CSS, complete with manual/system visual theming.
- **High-Performance State Management:** Optimized data fetching, offline caching, and optimistic UI updates driven by React Query.
- **Interactive Multimedia Form:** Elegant input workflows including a dynamic emoji picker and smooth declarative animations via Framer Motion.

## 🏗 Architecture

The project follows a clean, highly modular React architecture to ensure scalability and frictionless maintainability.

- **Frontend Core:** React 19 functioning as the primary scalable view layer.
- **API Layer (`src/services`):** Encapsulated, domain-specific HTTP modules (via Axios) abstracting requests for Auth, Users, Posts, Comments, and Notifications.
- **State Management & Caching (`src/hooks` & `src/context`):**
  - **Server State:** Handled rigorously by `@tanstack/react-query` using custom abstract hooks (`usePosts`, `useUsers`, `useComments`, etc.).
  - **Global Client State:** Centralized React Context API handles system theming (`ThemeContext`) and JWT authentication sessions (`AuthContext`).
- **Component Breakdown (`src/components`):**
  - _Primitives:_ Reusable UI elements (`Button`, `Input`, `SkeletonLoading`).
  - _Feature Widgets:_ Complex integrated chunks (`PostCard`, `SuggestedFriends`, `CreatePost`, `LikesModal`).
  - _Layout:_ Navigation shells adapting to devices (`Sidebar`, `TopNav`, `MobileNav`).
- **Routing:** Orchestrated via `react-router-dom` incorporating `ProtectedRoute` and `GuestRoute` layout wrappers to govern access.

## 🛠 Tech Stack

**Frontend & Core Framework**

- React `^19.2.0`
- React Router DOM `^7.13.1`

**State Management & Data Fetching**

- TanStack React Query `^5.90.21`
- Axios `^1.13.6`

**Styling & UI Interactivity**

- TailwindCSS `^4.2.1`
- Framer Motion `^12.34.3`
- React Hot Toast `^2.6.0`
- Emoji Picker React `^4.18.0`

**Form Handling & Validation**

- React Hook Form `^7.71.2`

**Build Tooling & Code Quality**

- Vite `^7.3.1`
- ESLint `^9.39.1`

## 📂 Project Structure

```text
src/
 ├─ assets/                 # Contains static media such as typography, logos, and general visual assets.
 ├─ components/             # Houses independent, modular UI components tailored for specific functionalities.
 │   ├─ feed/               # Feed-specific components like `CreatePost`, `PostCard`, `SuggestedFriends`, and `LikesModal`.
 │   ├─ guards/             # Authentication wrappers: `GuestRoute` (redirects logged-in users) & `ProtectedRoute` (guards private features).
 │   ├─ layout/             # Application structural shells: `AppLayout`, `TopNav`, `MobileNav`, and `Sidebar` that respond to screen sizes.
 │   ├─ Button.jsx          # Reusable customized standard button.
 │   ├─ Footer.jsx          # Default page footer for static paths.
 │   ├─ Input.jsx           # Global form input field component.
 │   ├─ Logo.jsx            # Brand identity renderer.
 │   ├─ SkeletonLoading.jsx # UI shimmering placeholder before data fetches.
 │   └─ ThemeToggle.jsx     # Actionable switch for dark/light mode switching.
 ├─ context/                # High-level context providers dictating global application states.
 │   ├─ AuthContext.jsx     # Tracks active JWT session and user states throughout the component tree.
 │   └─ ThemeContext.jsx    # Retains lighting preference (dark/light mode) across refreshes.
 ├─ hooks/                  # Specialized hooks wrapping React Query logic for seamless data fetching and synchronization.
 │   ├─ useAuth.js          # Encapsulates sign-in, signup, and logout mutations.
 │   ├─ useComments.js      # Abstracts mutations/queries related to nested comments and replies.
 │   ├─ useNotifications.js # Syncs user real-time notifications and tracks read states.
 │   ├─ usePosts.js         # Controls fetching infinite posts feeds, creating, editing, and liking
 │   └─ useUsers.js         # Facilitates fetching profiles, followers, and updating user configurations.
 ├─ pages/                  # Route-level assemblies, each representing a distinct URL endpoint.
 │   ├─ app/                # Nested protected pages restricted to authenticated users.
 │   │   ├─ Community.jsx   # Dedicated section to browse distinct communities/groups.
 │   │   ├─ ExploreFriends.jsx # Recommended peers page for extending the social graph.
 │   │   ├─ HomeFeed.jsx    # Primary dashboard consuming infinite scroll `usePosts`.
 │   │   ├─ MyPosts.jsx     # Isolated collection displaying exclusively the connected user's content.
 │   │   ├─ Notifications.jsx # Central history of recent pings and alerts.
 │   │   ├─ PostDetail.jsx  # Focused deep-dive into a single post and its entire comment threads.
 │   │   ├─ Profile.jsx     # Personalized public user identity portfolio.
 │   │   ├─ ProfileSettings.jsx # Authenticated panel to alter personal data and app configurations.
 │   │   └─ Saved.jsx       # Personal vault rendering bookmarked interesting posts.
 │   ├─ auth/               # Unauthenticated public views ensuring login/registration.
 │   │   ├─ Login.jsx       # Interface capturing credentials for authentication.
 │   │   └─ Signup.jsx      # Onboarding registration layout.
 │   ├─ Landing.jsx         # Public splash screen introducing "Yass" to unauthenticated visitors.
 │   └─ NotFound.jsx        # Fallback 404 graphical error view.
 ├─ services/               # API invocation layer abstracting Axios network behaviors.
 │   ├─ api.js              # Base Axios instance containing headers, interceptors, and default URLs.
 │   ├─ authService.js      # Handlers resolving token dispensation and login sessions.
 │   ├─ commentService.js   # HTTP interactions regarding fetching, patching, and destroying post replies.
 │   ├─ notificationService.js # Invokes REST endpoints that pull and mark read notifications.
 │   ├─ postService.js      # Translates UI actions into network POST/PUT payloads targeting the feed.
 │   └─ userService.js      # Manages user identity updates, photo uploads, and follow mechanisms.
 ├─ App.jsx                 # Configures QueryClient, unifies Contexts, and registers `react-router-dom` trees.
 ├─ index.css               # Mounts global CSS overrides and standardizes variables for Tailwind.
 └─ main.jsx                # Connects React DOM strictly to the root `index.html` structure.
```

## 🔌 API Endpoints

Interactions with the backend are handled through unified service files based on the structure below. _(Below represents key architectural endpoints, see the API Status section for complete capabilities)._

| Entity      | Method | Endpoint Example      | Description                              |
| ----------- | ------ | --------------------- | ---------------------------------------- |
| **Auth**    | `POST` | `/auth/signup`        | Register a new user account securely     |
| **Auth**    | `POST` | `/auth/signin`        | Authenticate and dispense JWT tokens     |
| **User**    | `GET`  | `/users/profile`      | Resolve currently authenticated identity |
| **User**    | `PUT`  | `/users/:id/follow`   | Mutate network edges (Follow user)       |
| **Post**    | `GET`  | `/posts`              | Paginate through the global social feed  |
| **Post**    | `POST` | `/posts`              | Publish constructed post payloads        |
| **Post**    | `PUT`  | `/posts/:id/like`     | Express post appreciation                |
| **Comment** | `GET`  | `/posts/:id/comments` | Retrieve attached deeply-nested threads  |
| **Comment** | `POST` | `/comments`           | Append text response to a post thread    |
| **Notify**  | `GET`  | `/notifications`      | Sync personalized alerts and pings       |

## ⚙️ Installation

Follow these steps to reliably set up the project locally:

1. **Clone the repository**

   ```bash
   git clone https://github.com/kamal-sorour/yass-social.git
   cd social-app
   ```

2. **Install exact dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file mapping required secrets and the backend API path.

   ```env
   VITE_API_BASE_URL="http://localhost:5000/api/v1"
   ```

4. **Launch the development server**
   ```bash
   npm run dev
   ```
   The application will become accessible natively at `http://localhost:5173`.

## 🧪 Development Workflow

This project leverages **Vite** natively for an exceptionally fast development cycle powered by Hot Module Replacement (HMR).

- Run `npm run lint` before committing to mandate ESLint syntactical cleanliness.
- Run `npm run build` to execute the Vite bundler, generating minified production artifacts inside the `dist/` directory.
- Run `npm run preview` to locally test the production asset delivery.

## 📈 Future Improvements

- **WebSockets / Socket.io:** Upgrade HTTP polling systems to real-time, bi-directional live typing/chat and instantaneous notification delivery.
- **Disappearing Stories:** Introduce 24-hour expiring visual storytelling atop the primary feed similar to mainstream peers.
- **Internationalization (i18n):** Native architecture to support locale switching (e.g. English, Arabic translation dictionaries) dynamically.
- **Media Optimization:** Introduce chunked multi-image uploading, AWS S3 integrations, client-side caching limits, and native video streaming support.
- **E2E Test Suites:** Scaffold Cypress or Playwright frameworks to establish integration test confidence during large pull requests.

## 👨‍💻 Author

Built with precision, modern web standards, and high-performance design principles.

**Developer / Engineer**

- GitHub: [@kamal-sorour](https://github.com/kamal-sorour)
- LinkedIn: [Kamal Mohamed](https://linkedin.com/in/kamal-sorour)

---

## 📡 API Completion Status

📁 1. Users & Auth 

[x] ✅ POST Signup  
[x] ✅ POST Signin  
[x] ✅ PATCH Change Password  
[x] ✅ PUT Upload Profile Photo  
[x] ✅ GET Get My Profile  
[x] ✅ GET Get Bookmarks  
[x] ✅ GET Get Follow Suggestions  
[x] ✅ GET Get User Profile  
[x] ✅ PUT Follow/Unfollow User  
[x] ✅ GET Get User Posts (Nested)

📁 2. Posts 

[x] ✅ GET Get All Posts  
[x] ✅ GET Get Home Feed  
[x] ✅ POST Create Post  
[x] ✅ GET Get Single Post  
[x] ✅ GET Get Post likes  
[x] ✅ PUT Update Post  
[x] ✅ DEL Delete Post  
[x] ✅ PUT Like/Unlike Post  
[x] ✅ PUT Bookmark/Unbookmark Post  
[x] ✅ POST Share Post

📁 3. Comments & Replies 

[x] ✅ GET Get Post Comments  
[x] ✅ POST Create Comment  
[x] ✅ GET Get Comment Replies  
[x] ✅ POST Create Reply  
[x] ✅ PUT Update Comment  
[x] ✅ DEL Delete Comment  
[x] ✅ PUT Like/Unlike Comment

📁 4. Notifications 

[x] ✅ GET Get Notifications  
[x] ✅ GET Get Unread Count  
[x] ✅ PATCH Mark Notification As Read  
[x] ✅ PATCH Mark All As Read
