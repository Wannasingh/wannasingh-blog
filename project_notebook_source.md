# Project Notebook Source: Wannasingh Blog

This document contains the complete source code and project metadata for the **Wannasingh Blog** project, structured for use in Google Gemini / NotebookLM.

## 1. Project Overview

The Wannasingh Blog is a modern full-stack web application designed for a blogging experience.
- **Frontend**: React, Vite, Tailwind CSS, shadcn/ui components.
- **Backend**: Node.js, Express (running as Serverless functions configured for Vercel deploy).
- **Database / Backend-as-a-Service**: Supabase (utilizing PostgreSQL, Client initialization via `@supabase/supabase-js`).

## 2. Directory Structure

```text
wannasingh-blog/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   │   └── author-image.jpeg
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── AuthenticationRoute.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   ├── ui/
│   │   │   │   ├── alert-dialog.jsx
│   │   │   │   ├── avatar.jsx
│   │   │   │   ├── button.jsx
│   │   │   │   ├── dropdown-menu.jsx
│   │   │   │   ├── input.jsx
│   │   │   │   ├── label.jsx
│   │   │   │   ├── select.jsx
│   │   │   │   ├── skeleton.jsx
│   │   │   │   ├── sonner.jsx
│   │   │   │   ├── table.jsx
│   │   │   │   └── textarea.jsx
│   │   │   ├── AdminWebSection.jsx
│   │   │   ├── ArticlesSection.jsx
│   │   │   ├── ViewPost.jsx
│   │   │   └── WebSection.jsx
│   │   ├── contexts/
│   │   │   └── authentication.jsx
│   │   ├── data/
│   │   │   ├── blogPosts.js
│   │   │   └── comments.js
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── page/
│   │   │   ├── admin/
│   │   │   │   ├── AdminArticlePage.jsx
│   │   │   │   ├── AdminCategoryPage.jsx
│   │   │   │   ├── AdminCreateArticle.jsx
│   │   │   │   ├── AdminCreateCategoryPage.jsx
│   │   │   │   ├── AdminEditArticlePage.jsx
│   │   │   │   ├── AdminEditCategoryPage.jsx
│   │   │   │   ├── AdminLoginPage.jsx
│   │   │   │   ├── AdminNotificationPage.jsx
│   │   │   │   ├── AdminProfilePage.jsx
│   │   │   │   └── AdminResetPasswordPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── MessagesPage.jsx
│   │   │   ├── NotFoundpage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── ResetPasswordPage.jsx
│   │   │   ├── SignUpPage.jsx
│   │   │   ├── SignUpSuccessPage.jsx
│   │   │   └── ViewPostPage.jsx
│   │   ├── utils/
│   │   │   └── jwtIntercepter.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── jsconfig.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── vercel.json
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── apps/
│   │   │   ├── auth.mjs
│   │   │   ├── categoryRouter.mjs
│   │   │   ├── messageRouter.mjs
│   │   │   ├── notificationRouter.mjs
│   │   │   ├── postRouter.mjs
│   │   │   └── profileRouter.mjs
│   │   ├── middleware/
│   │   │   ├── postValidation.mjs
│   │   │   ├── protectAdmin.mjs
│   │   │   └── protectUser.mjs
│   │   └── utils/
│   │       └── db.mjs
│   ├── .env
│   ├── .gitignore
│   ├── app.mjs
│   ├── package.json
│   ├── skills-lock.json
│   ├── test-db.mjs
│   └── vercel.json
└── README.md
```

## 3. Source Code & Configuration Files

### File: `README.md`

```markdown
# Wannasingh Blog

## Project Overview

The Wannasingh Blog project is a modern web application designed to provide a seamless blogging experience. Built using React and Vite, this project leverages the latest web technologies to ensure fast performance and a responsive user interface. The application is structured with a clear separation of concerns between the client-side and server-side code, promoting maintainability and scalability.

## Features

- **Client-Side Rendering**: Utilizes React for efficient and dynamic user interfaces.
- **Hot Module Replacement (HMR)**: Enabled through Vite for a smooth development experience.
- **Responsive Design**: Styled with Tailwind CSS to ensure compatibility across various devices.
- **Server-Side API**: Built with Express to handle backend operations and data management.
- **ESLint Integration**: Ensures code quality and consistency across the codebase.

## Getting Started

To set up the project locally, please follow the steps below:

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher) or Yarn

### Installation

1. **Clone the Repository**:

```bash
   git clone https://github.com/Wannasingh/wannasingh-blog.git
```

2.**Navigate to the Project Directory**:

```bash
   cd wannasingh-blog
```

3.**Install Client-Side Dependencies:**:

```bash
   cd client
   npm install
```

or

```bash
   yarn install
    npm install
```

4.**Install Server-Side Dependencies:**:

```bash
   cd ../server
    npm install
```

or

```bash
   yarn install
```

## Running the Application

**Start the Client-Side Development Server:**

```bash
cd client
npm run dev
```

or

```bash
yarn dev
```

**Start the Server-Side Development Server:**

```bash
cd server
npm run devStart
```

or

```bash
yarn devStart
```

## Project Structure

client/: Contains the frontend code and configuration files.
server/: Contains the backend code and server configuration.
src/: Main source code directory for the client-side application, including components, pages, and assets.

## Contributing

We welcome contributions to the Wannasingh Blog project. Please ensure that you adhere to our code of conduct and follow the contribution guidelines outlined in the CONTRIBUTING.md file.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For any inquiries or further information, please contact Wannasingh at sarankhtn@gmail.com

```

### File: `client/.env`

```text
VITE_API_URL=http://localhost:4001

```

### File: `client/.gitignore`

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local
vercel.json

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### File: `client/components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": false,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "src/index.css",
    "baseColor": "stone",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

### File: `client/eslint.config.js`

```javascript
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]

```

### File: `client/index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

### File: `client/jsconfig.json`

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

```

### File: `client/package.json`

```json
{
  "name": "wannasingh-blog",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@radix-ui/react-alert-dialog": "^1.1.2",
    "@radix-ui/react-avatar": "^1.1.1",
    "@radix-ui/react-dropdown-menu": "^2.1.2",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-select": "^2.1.2",
    "@radix-ui/react-slot": "^1.1.0",
    "axios": "^1.7.7",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.1",
    "lucide": "^0.454.0",
    "lucide-react": "^0.454.0",
    "next-themes": "^0.4.3",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-helmet-async": "^2.0.5",
    "react-icons": "^5.5.0",
    "react-markdown": "^9.0.1",
    "react-router-dom": "^6.28.0",
    "sonner": "^1.7.0",
    "tailwind-merge": "^2.5.4",
    "tailwindcss-animate": "^1.0.7"
  },
  "devDependencies": {
    "@eslint/js": "^9.13.0",
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.3",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.13.0",
    "eslint-plugin-react": "^7.37.2",
    "eslint-plugin-react-hooks": "^5.0.0",
    "eslint-plugin-react-refresh": "^0.4.14",
    "globals": "^15.11.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.14",
    "vite": "^5.4.10"
  }
}

```

### File: `client/postcss.config.js`

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

```

### File: `client/src/App.css`

```css

```

### File: `client/src/App.jsx`

```javascript
import { Route, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import ViewPostPage from "./page/ViewPostPage";
import { Toaster } from "@/components/ui/sonner";
import NotFoundPage from "./page/NotFoundpage";
import SignUpPage from "./page/SignUpPage";
import LoginPage from "./page/LoginPage";
import SignUpSuccessPage from "./page/SignUpSuccessPage";
import ProfilePage from "./page/ProfilePage";
import ResetPasswordPage from "./page/ResetPasswordPage";
import MessagesPage from "./page/MessagesPage";
import AdminArticleManagementPage from "./page/admin/AdminArticlePage";
import AdminCategoryManagementPage from "./page/admin/AdminCategoryPage";
import AdminProfilePage from "./page/admin/AdminProfilePage";
import AdminResetPasswordPage from "./page/admin/AdminResetPasswordPage";
import AdminCreateArticlePage from "./page/admin/AdminCreateArticle";
import AdminCreateCategoryPage from "./page/admin/AdminCreateCategoryPage";
import AdminEditCategoryPage from "./page/admin/AdminEditCategoryPage";
import AdminEditArticlePage from "./page/admin/AdminEditArticlePage";
import AdminNotificationPage from "./page/admin/AdminNotificationPage";
import { useAuth } from "@/contexts/authentication"; // Import useAuth to check auth state
import jwtInterceptor from "./utils/jwtIntercepter.js";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthenticationRoute from "./components/auth/AuthenticationRoute";
import { HelmetProvider } from "react-helmet-async";

jwtInterceptor();

function App() {
  const { isAuthenticated, state } = useAuth();

  return (
    <div className="App">
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
          <Route path="*" element={<NotFoundPage />} />

          {/* Authentication Section */}
          <Route
            path="/sign-up"
            element={
              <AuthenticationRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
              >
                <SignUpPage />
              </AuthenticationRoute>
            }
          />

          {/* Messages - Allow both user and admin */}
          <Route
            path="/messages"
            element={
              isAuthenticated ? (
                <MessagesPage />
              ) : (
                <AuthenticationRoute
                  isLoading={state.getUserLoading}
                  isAuthenticated={isAuthenticated}
                >
                  <MessagesPage />
                </AuthenticationRoute>
              )
            }
          />
          <Route
            path="/sign-up/success"
            element={
              <AuthenticationRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
              >
                <SignUpSuccessPage />
              </AuthenticationRoute>
            }
          />
          <Route
            path="/login"
            element={
              <AuthenticationRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
              >
                <LoginPage />
              </AuthenticationRoute>
            }
          />

          {/* User Section */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role}
                requiredRole="user"
              >
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role}
                requiredRole="user"
              >
                <ResetPasswordPage />
              </ProtectedRoute>
            }
          />

          {/* Admin Section */}
          <Route
            path="/admin/article-management"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role}
                requiredRole="admin"
              >
                <AdminArticleManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/article-management/create"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role}
                requiredRole="admin"
              >
                <AdminCreateArticlePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/article-management/edit/:postId"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role}
                requiredRole="admin"
              >
                <AdminEditArticlePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/category-management"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role}
                requiredRole="admin"
              >
                <AdminCategoryManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/category-management/create"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role}
                requiredRole="admin"
              >
                <AdminCreateCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/category-management/edit/:categoryId"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role}
                requiredRole="admin"
              >
                <AdminEditCategoryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role}
                requiredRole="admin"
              >
                <AdminProfilePage />
              </ProtectedRoute>
            }
          />
          {/* Optional Requirement */}
          <Route
            path="/admin/notification"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role}
                requiredRole="admin"
              >
                <AdminNotificationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/reset-password"
            element={
              <ProtectedRoute
                isLoading={state.getUserLoading}
                isAuthenticated={isAuthenticated}
                userRole={state.user?.role}
                requiredRole="admin"
              >
                <AdminResetPasswordPage />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Toaster
          toastOptions={{
            unstyled: true,
          }}
        />
      </HelmetProvider>
    </div>
  );
}

export default App;

```

### File: `client/src/components/AdminWebSection.jsx`

```javascript
import {
  FileText,
  FolderOpen,
  Key,
  LogOut,
  User,
  Globe,
  Bell,
  MessageCircle,
} from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/authentication";
import { useEffect, useState } from "react";
import axios from "axios";

export function AdminSidebar() {
  const { logout, state } = useAuth();
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);

  // Helper function to check if the current path starts with the base path
  const isActive = (basePath) => location.pathname.startsWith(basePath);

  // Get user name from database
  const userName = state.user?.name || "Admin";

  useEffect(() => {
    if (state.user?.role === "admin") {
      fetchUnreadNotifications();
      fetchUnreadMessages();
      // Poll for new notifications and messages every 3 seconds
      const interval = setInterval(() => {
        fetchUnreadNotifications();
        fetchUnreadMessages();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [state.user]);

  const fetchUnreadNotifications = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/notifications/unread-count`
      );
      setUnreadCount(response.data.count || 0);
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  };

  const fetchUnreadMessages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/messages/unread/count`
      );
      setUnreadMessages(response.data.count || 0);
    } catch (error) {
      console.error("Error fetching unread messages:", error);
    }
  };

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold">
          {userName}<span className="text-green-400">.</span>
        </h1>
        <p className="text-sm text-orange-400">Admin panel</p>
      </div>
      <nav className="mt-6">
        <Link
          to="/admin/article-management"
          className={`flex items-center px-4 py-2 ${isActive("/admin/article-management")
            ? "bg-gray-200 text-gray-700"
            : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <FileText className="mr-3 h-5 w-5" />
          Article management
        </Link>
        <Link
          to="/admin/category-management"
          className={`flex items-center px-4 py-2 ${isActive("/admin/category-management")
            ? "bg-gray-200 text-gray-700"
            : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <FolderOpen className="mr-3 h-5 w-5" />
          Category management
        </Link>
        <Link
          to="/admin/profile"
          className={`flex items-center px-4 py-2 ${isActive("/admin/profile")
            ? "bg-gray-200 text-gray-700"
            : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <User className="mr-3 h-5 w-5" />
          Profile
        </Link>
        <Link
          to="/messages"
          className={`flex items-center px-4 py-2 relative ${isActive("/messages")
            ? "bg-gray-200 text-gray-700"
            : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <MessageCircle className="mr-3 h-5 w-5" />
          Messages
          {unreadMessages > 0 && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {unreadMessages > 9 ? "9+" : unreadMessages}
            </span>
          )}
        </Link>
        {/* optional requirement */}
        <Link
          to="/admin/notification"
          className={`flex items-center px-4 py-2 relative ${isActive("/admin/notification")
            ? "bg-gray-200 text-gray-700"
            : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <Bell className="mr-3 h-5 w-5" />
          Notification
          {unreadCount > 0 && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>
        <Link
          to="/admin/reset-password"
          className={`flex items-center px-4 py-2 ${isActive("/admin/reset-password")
            ? "bg-gray-200 text-gray-700"
            : "text-gray-600 hover:bg-gray-100"
            }`}
        >
          <Key className="mr-3 h-5 w-5" />
          Reset password
        </Link>
      </nav>
      <div className="absolute bottom-0 w-64 border-t border-gray-200 py-2">
        <Link
          to="/"
          className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100"
        >
          <Globe className="mr-3 h-5 w-5" />
          Go to the website
        </Link>
        <Link
          onClick={() => {
            logout();
          }}
          className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Log out
        </Link>
      </div>
    </aside>
  );
}

```

### File: `client/src/components/ArticlesSection.jsx`

```javascript
/* eslint-disable react/prop-types */
import authorImage from "../assets/author-image.jpeg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";

export default function Articles() {
  // const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Current page state
  const [hasMore, setHasMore] = useState(true); // To track if there are more posts to load
  const [isLoading, setIsLoading] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isFirstTimeRender, setIsFirstTimeRender] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories only on the first render
    if (isFirstTimeRender) {
      const fetchCategories = async () => {
        try {
          const responseCategories = await axios.get(
            `${import.meta.env.VITE_API_URL}/categories`
          );
          // Ensure data is an array before setting state
          const categoriesData = Array.isArray(responseCategories.data)
            ? responseCategories.data
            : [];
          setCategories(categoriesData);
          setIsFirstTimeRender(false); // Mark the first render logic as done
        } catch (error) {
          console.error("Error fetching categories:", error);
          setCategories([]); // Set empty array on error
          setIsFirstTimeRender(false);
        }
      };

      fetchCategories();
    }
  }, [isFirstTimeRender]);


  useEffect(() => {
    // Fetch posts when page or category changes
    const fetchPosts = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts?page=${page}&limit=6${category !== "Highlight" ? `&category=${category}` : ""
          }`
        );
        if (page === 1) {
          setPosts(response.data.posts); // Replace posts on the first page load
        } else {
          setPosts((prevPosts) => [...prevPosts, ...response.data.posts]); // Append on subsequent pages
        }
        setIsLoading(false); // Stop loading
        if (response.data.currentPage >= response.data.totalPages) {
          setHasMore(false); // No more posts to load
        }
      } catch {
        setIsLoading(false); // Handle error and stop loading
      }
    };

    fetchPosts(); // Call fetchPosts when category or page changes
  }, [page, category]); // Effect depends on page and category

  useEffect(() => {
    if (searchKeyword.length > 0) {
      setIsLoading(true);
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/posts?keyword=${searchKeyword}`
          );
          setSuggestions(response.data.posts); // Set search suggestions
          setIsLoading(false);
        } catch {
          setIsLoading(false);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]); // Clear suggestions if keyword is empty
    }
  }, [searchKeyword]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number to load more posts
  };

  return (
    <div className="w-full max-w-7xl mx-auto md:px-6 lg:px-8 mb-20">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 px-4 tracking-tight">Latest Articles</h2>
      <div className="bg-gradient-to-br from-[#F5F4F1] to-[#EFEEEB] px-6 py-6 md:py-5 md:rounded-xl shadow-sm border border-gray-200/50 flex flex-col space-y-5 md:gap-8 md:flex-row-reverse md:items-center md:space-y-0 md:justify-between mb-12">
        <div className="w-full md:max-w-sm">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              className="py-3 px-4 rounded-lg bg-white shadow-sm border-gray-200 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-0 focus-visible:border-foreground transition-all"
              onChange={(e) => setSearchKeyword(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => {
                setTimeout(() => {
                  setShowDropdown(false);
                }, 200);
              }}
            />
            {!isLoading &&
              showDropdown &&
              searchKeyword &&
              suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-100 p-1 overflow-hidden">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="text-start px-4 py-3 block w-full text-sm text-foreground hover:bg-gradient-to-r hover:from-[#F5F4F1] hover:to-[#EFEEEB] rounded-md cursor-pointer transition-all"
                      onClick={() => navigate(`/post/${suggestion.id}`)}
                    >
                      {suggestion.title}
                    </button>
                  ))}
                </div>
              )}
          </div>
        </div>
        <div className="md:hidden w-full">
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value);
              setPosts([]); // Clear posts when category changes
              setPage(1); // Reset page to 1
              setHasMore(true); // Reset "has more" state
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full py-3 px-4 rounded-lg bg-white shadow-sm border-gray-200 text-foreground focus:ring-2 focus:ring-foreground/20 focus:ring-offset-0 focus:border-foreground transition-all">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Highlight">Highlight</SelectItem>
              {categories.map((cat) => {
                return (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
        {isFirstTimeRender ? (
          <div className="hidden md:flex space-x-3">
            <Skeleton className="w-24 h-11 rounded-full" />
            <Skeleton className="w-20 h-11 rounded-full" />
            <Skeleton className="w-24 h-11 rounded-full" />
            <Skeleton className="w-20 h-11 rounded-full" />
          </div>
        ) : (
          <div className="hidden md:flex md:overflow-x-auto md:scrollbar-hide space-x-3 scroll-smooth pb-1">
            <button
              disabled={category === "Highlight"}
              onClick={() => {
                setCategory("Highlight");
                setPosts([]); // Clear posts when category changes
                setPage(1); // Reset page to 1
                setHasMore(true); // Reset "has more" state
              }}
              className={`px-5 py-2.5 transition-all duration-200 rounded-full text-sm font-semibold whitespace-nowrap shadow-sm border ${category === "Highlight"
                ? "bg-foreground text-white border-foreground shadow-md scale-105"
                : "bg-white text-foreground border-gray-200 hover:bg-gray-50 hover:shadow-md hover:scale-105 hover:border-gray-300"
                }`}
            >
              Highlight
            </button>
            {categories.map((cat) => (
              <button
                disabled={category === cat.name}
                key={cat.id}
                onClick={() => {
                  setCategory(cat.name);
                  setPosts([]); // Clear posts when category changes
                  setPage(1); // Reset page to 1
                  setHasMore(true); // Reset "has more" state
                }}
                className={`px-5 py-2.5 transition-all duration-200 rounded-full text-sm font-semibold whitespace-nowrap shadow-sm border ${category === cat.name
                  ? "bg-foreground text-white border-foreground shadow-md scale-105"
                  : "bg-white text-foreground border-gray-200 hover:bg-gray-50 hover:shadow-md hover:scale-105 hover:border-gray-300"
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}

      </div>
      <article className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-0">
        {posts.map((blog, index) => {
          return (
            <BlogCard
              key={index}
              id={blog.id}
              image={blog.image}
              category={blog.category}
              title={blog.title}
              description={blog.description}
              author={blog.author}
              date={new Date(blog.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
          );
        })}
      </article>
      {hasMore && (
        <div className="text-center mt-20">
          <button
            onClick={handleLoadMore}
            className={`font-medium ${!isLoading ? "underline hover:text-muted-foreground" : ""
              }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex flex-col items-center min-h-lvh">
                <Loader2 className="w-12 h-12 animate-spin text-foreground" />
                <p className="mt-4">Loading...</p>
              </div>
            ) : (
              "View more"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

function BlogCard({ id, image, category, title, description, author, date }) {
  const navigate = useNavigate();
  const [authorData, setAuthorData] = useState({
    name: "Wannasingh K.",
    profile_pic: authorImage
  });

  useEffect(() => {
    // Check if author is an object with user data
    if (author && typeof author === 'object' && author.name) {
      setAuthorData({
        name: author.name,
        profile_pic: author.profile_pic || authorImage
      });
    } else if (typeof author === 'string') {
      // Fallback for old string format
      setAuthorData({
        name: author,
        profile_pic: authorImage
      });
    }
  }, [author]);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => navigate(`/post/${id}`)}
        className="relative h-[212px] sm:h-[360px]"
      >
        <img
          className="w-full h-full object-cover rounded-md"
          src={image}
          alt={title}
        />
      </button>
      <div className="flex flex-col">
        <div className="flex">
          <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
            {category}
          </span>
        </div>
        <button onClick={() => navigate(`/post/${id}`)}>
          <h2 className="text-start font-bold text-xl mb-2 line-clamp-2 hover:underline">
            {title}
          </h2>
        </button>
        <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3">
          {description}
        </p>
        <div className="flex items-center text-sm">
          <img
            className="w-8 h-8 object-cover rounded-full mr-2"
            src={authorData.profile_pic}
            alt={authorData.name}
          />
          <span>{authorData.name}</span>
          <span className="mx-2 text-gray-300">|</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

```

### File: `client/src/components/ViewPost.jsx`

```javascript
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import {
  SmilePlus,
  Copy,
  Loader2,
  X,
} from "lucide-react";
import { FaFacebook, FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";
import { Textarea } from "@/components/ui/textarea";
import authorImage from "../assets/author-image.jpeg";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authentication";

export default function ViewPost() {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [author, setAuthor] = useState(null);
  const [shareCount, setShareCount] = useState(0);

  const param = useParams();
  const navigate = useNavigate();
  const { state } = useAuth();
  const user = state.user;

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPost = async () => {
    setIsLoading(true);
    try {
      const postUrl = `${import.meta.env.VITE_API_URL}/posts/${param.postId}`;
      console.log("Fetching post from URL:", postUrl);
      const postsResponse = await axios.get(postUrl);
      setImg(postsResponse.data.image);
      setTitle(postsResponse.data.title);
      setDate(postsResponse.data.date);
      setDescription(postsResponse.data.description);
      setCategory(postsResponse.data.category);
      setContent(postsResponse.data.content);

      // Get author info
      if (postsResponse.data.user_id) {
        try {
          const authorResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/profile/${postsResponse.data.user_id}`
          );
          setAuthor(authorResponse.data);
        } catch (authorError) {
          console.log("Could not fetch author info:", authorError);
          // Set default author if fetch fails
          setAuthor(null);
        }
      }

      const likesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${param.postId}/likes`
      );
      setLikes(likesResponse.data.like_count);
      const commentsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${param.postId}/comments`
      );
      setComments(commentsResponse.data);

      // Get share count from localStorage
      const shares = JSON.parse(localStorage.getItem('shareCount') || '{}');
      setShareCount(shares[param.postId] || 0);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      navigate("*");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <div className="max-w-7xl mx-auto space-y-8 container md:px-8 pb-20 md:pb-28 md:pt-8 lg:pt-16">
      <div className="space-y-4 md:px-4">
        <img
          src={img}
          alt={title}
          className="md:rounded-lg object-cover w-full h-[260px] sm:h-[340px] md:h-[587px]"
        />
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="xl:w-3/4 space-y-8">
          <article className="px-4">
            <div className="flex">
              <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
                {category}
              </span>
              <span className="px-3 py-1 text-sm font-normal text-muted-foreground">
                {new Date(date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-4 mb-10">{description}</p>
            <div className="markdown">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </article>

          <div className="xl:hidden px-4">
            <AuthorBio author={author} />
          </div>

          <Share
            likesAmount={likes}
            setDialogState={setIsDialogOpen}
            user={user}
            setLikes={setLikes}
            shareCount={shareCount}
            setShareCount={setShareCount}
          />
          <Comment
            setDialogState={setIsDialogOpen}
            commentList={comments}
            user={user}
            setComments={setComments}
          />
        </div>

        <div className="hidden xl:block xl:w-1/4">
          <div className="sticky top-4">
            <AuthorBio author={author} />
          </div>
        </div>
      </div>
      <CreateAccountModal
        dialogState={isDialogOpen}
        setDialogState={setIsDialogOpen}
      />
    </div>
  );
}

function Share({ likesAmount, setDialogState, user, setLikes, shareCount, setShareCount }) {
  const shareLink = encodeURI(window.location.href);
  const shareTitle = encodeURIComponent(document.title);
  const param = useParams();
  const [isLiking, setIsLiking] = useState(false);

  const handleShare = () => {
    // Increment share count
    const shares = JSON.parse(localStorage.getItem('shareCount') || '{}');
    shares[param.postId] = (shares[param.postId] || 0) + 1;
    localStorage.setItem('shareCount', JSON.stringify(shares));
    setShareCount(shares[param.postId]);
  };

  const handleLikeClick = async () => {
    if (!user) {
      return setDialogState(true);
    }

    setIsLiking(true);
    try {
      // First try to like the post
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/posts/${param.postId}/likes`
        );
      } catch (error) {
        // If we get a 500 error, assume the post is already liked and try to unlike
        if (error.response?.status === 500) {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/posts/${param.postId}/likes`
          );
        } else {
          // If it's a different error, throw it to be caught by the outer try-catch
          throw error;
        }
      }

      // After either liking or unliking, get the updated like count
      const likesResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${param.postId}/likes`
      );
      setLikes(likesResponse.data.like_count);
    } catch (error) {
      console.error("Error", error);
    } finally {
      setIsLiking(false);
    }
  };
  return (
    <div className="px-4 md:px-4">
      <div className="bg-[#EFEEEB] py-4 px-4 md:py-6 md:px-6 md:rounded-sm flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:justify-between mb-10">
        <button
          onClick={handleLikeClick}
          disabled={isLiking}
          className={`flex items-center justify-center space-x-2 px-8 sm:px-11 py-3 rounded-full text-foreground border border-foreground transition-colors group ${isLiking
            ? "bg-gray-200 cursor-not-allowed text-gray-500 border-gray-300"
            : "bg-white hover:border-muted-foreground hover:text-muted-foreground"
            }`}
        >
          <SmilePlus className="w-5 h-5 text-foreground group-hover:text-muted-foreground transition-colors" />
          <span className="text-foreground group-hover:text-muted-foreground font-medium transition-colors">
            {likesAmount}
          </span>
        </button>
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              handleShare();
              toast.custom((t) => (
                <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
                  <div>
                    <h2 className="font-bold text-lg mb-1">Copied!</h2>
                    <p className="text-sm">
                      This article has been copied to your clipboard.
                    </p>
                  </div>
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="text-white hover:text-gray-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              ));
            }}
            className="bg-white flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors group"
          >
            <Copy className="w-5 h-5 text-foreground transition-colors group-hover:text-muted-foreground" />
            <span className="text-foreground font-medium transition-colors group-hover:text-muted-foreground">
              Copy
            </span>
          </button>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleShare}
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <FaFacebook className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleShare}
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <FaLinkedin className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${shareLink}&text=${shareTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleShare}
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <FaXTwitter className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          <a
            href={`https://www.instagram.com/direct/new/?text=${shareTitle}%20${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleShare}
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <FaInstagram className="h-5 w-5 sm:h-6 sm:w-6" />
          </a>
          {shareCount > 0 && (
            <span className="text-xs sm:text-sm text-muted-foreground w-full text-center lg:w-auto lg:ml-2 mt-2 lg:mt-0">
              Shared {shareCount} {shareCount === 1 ? 'time' : 'times'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function Comment({ setDialogState, commentList, setComments, user }) {
  const [commentText, setCommentText] = useState("");
  const [isError, setIsError] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const param = useParams();

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) {
      setIsError(true);
    } else {
      // Submit the comment
      setIsError(false);
      const textToSend = replyTo
        ? `@${replyTo.name} ${commentText}`
        : commentText;

      await axios.post(
        `${import.meta.env.VITE_API_URL}/posts/${param.postId}/comments`,
        {
          comment: textToSend,
        }
      );
      const commentsResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/posts/${param.postId}/comments`
      );
      setComments(commentsResponse.data);
      setCommentText("");
      setReplyTo(null);
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
          <div>
            <h2 className="font-bold text-lg mb-1">Comment Posted!</h2>
            <p className="text-sm">
              Your comment has been successfully added to this post.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    }
  };

  const handleReply = (comment) => {
    if (!user) {
      setDialogState(true);
      return;
    }
    setReplyTo(comment);
    // Scroll to comment box
    document.querySelector('textarea[placeholder="What are your thoughts?"]')?.focus();
  };

  return (
    <div>
      <div className="space-y-4 px-4 mb-16">
        <h3 className="text-lg font-semibold">Comment</h3>
        {replyTo && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-100 p-2 rounded">
            <span>Replying to <strong>{replyTo.name}</strong></span>
            <button
              onClick={() => setReplyTo(null)}
              className="ml-auto text-foreground hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        )}
        <form className="space-y-2 relative" onSubmit={handleSendComment}>
          <Textarea
            value={commentText}
            onFocus={() => {
              setIsError(false);
              if (!user) {
                return setDialogState(true);
              }
            }}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="What are your thoughts?"
            className={`w-full p-4 h-24 resize-none py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${isError ? "border-red-500" : ""
              }`}
          />
          {isError && (
            <p className="text-red-500 text-sm absolute">
              Please type something before sending.
            </p>
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
            >
              Send
            </button>
          </div>
        </form>
      </div>
      <div className="space-y-6 px-4">
        {commentList.map((comment, index) => (
          <CommentItem
            key={index}
            comment={comment}
            index={index}
            commentList={commentList}
            user={user}
            onReply={handleReply}
            setDialogState={setDialogState}
          />
        ))}
      </div>
    </div>
  );
}

function CommentItem({ comment, index, commentList, user, onReply, setDialogState }) {
  const [showCard, setShowCard] = useState(false);
  const navigate = useNavigate();

  const handleSendMessage = () => {
    if (!user) {
      setDialogState(true);
      return;
    }
    navigate(`/messages?userId=${comment.user_id}`);
  };

  // Don't show message button if it's the current user
  const isCurrentUser = user?.id === comment.user_id;

  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex space-x-3 sm:space-x-4">
        <div className="flex-shrink-0">
          <img
            src={comment.profile_pic}
            alt={comment.name}
            className="rounded-full w-10 h-10 sm:w-12 sm:h-12 object-cover"
          />
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex flex-col items-start justify-between">
            <div className="relative">
              <h4
                className="font-semibold cursor-pointer hover:underline text-sm sm:text-base"
                onMouseEnter={() => setShowCard(true)}
                onMouseLeave={() => setShowCard(false)}
              >
                {comment.name}
              </h4>
              {showCard && !isCurrentUser && (
                <div
                  className="absolute left-0 top-full mt-2 z-10 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64"
                  onMouseEnter={() => setShowCard(true)}
                  onMouseLeave={() => setShowCard(false)}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src={comment.profile_pic}
                      alt={comment.name}
                      className="rounded-full w-16 h-16 object-cover"
                    />
                    <div>
                      <h5 className="font-bold">{comment.name}</h5>
                      <p className="text-sm text-gray-500">@{comment.username}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSendMessage}
                    className="w-full px-4 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors text-sm"
                  >
                    Send Message
                  </button>
                </div>
              )}
            </div>
            <span className="text-xs sm:text-sm text-gray-500">
              {new Date(comment.created_at)
                .toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .replace(", ", " at ")}
            </span>
          </div>
        </div>
      </div>
      <p className="text-gray-600 text-sm sm:text-base ml-13 sm:ml-16 break-words">{comment.comment_text}</p>
      {user && (
        <button
          onClick={() => onReply(comment)}
          className="text-xs sm:text-sm text-muted-foreground hover:text-foreground ml-13 sm:ml-16 text-left font-medium"
        >
          Reply
        </button>
      )}
      {index < commentList.length - 1 && (
        <hr className="border-gray-300 my-4" />
      )}
    </div>
  );
}

function AuthorBio({ author }) {
  if (!author) {
    return (
      <div className="bg-[#EFEEEB] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden mr-3 sm:mr-4 bg-gray-300 animate-pulse" />
          <div className="flex-1">
            <div className="h-3 sm:h-4 bg-gray-300 rounded animate-pulse mb-2 w-16 sm:w-20" />
            <div className="h-5 sm:h-6 bg-gray-300 rounded animate-pulse w-24 sm:w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#EFEEEB] rounded-2xl sm:rounded-3xl p-4 sm:p-6">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden mr-3 sm:mr-4 flex-shrink-0">
          <img
            src={author.profile_pic || authorImage}
            alt={author.name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm">Author</p>
          <h3 className="text-lg sm:text-2xl font-bold truncate">{author.name}</h3>
        </div>
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="text-muted-foreground space-y-3 sm:space-y-4 text-sm sm:text-base">
        {author.bio ? (
          <p>{author.bio}</p>
        ) : (
          <>
            <p>
              I am a pet enthusiast and freelance writer who specializes in animal
              behavior and care. With a deep love for cats, I enjoy sharing insights
              on feline companionship and wellness.
            </p>
            <p>
              When I&apos;m not writing, I spend time volunteering at my local
              animal shelter, helping cats find loving homes.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

function CreateAccountModal({ dialogState, setDialogState }) {
  const navigate = useNavigate();
  return (
    <AlertDialog open={dialogState} onOpenChange={setDialogState}>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-lg flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Create an account to continue
        </AlertDialogTitle>
        <button
          onClick={() => navigate("/signup")}
          className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-4 text-lg w-52"
        >
          Create account
        </button>
        <AlertDialogDescription className="flex flex-row gap-1 justify-center font-medium text-center pt-2 text-muted-foreground">
          Already have an account?
          <a
            onClick={() => navigate("/login")}
            className="text-foreground hover:text-muted-foreground transition-colors underline font-semibold cursor-pointer"
          >
            Log in
          </a>
        </AlertDialogDescription>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="w-16 h-16 animate-spin text-foreground" />
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}

```

### File: `client/src/components/WebSection.jsx`

```javascript
import authorImage from "../assets/author-image.jpeg";
import { Menu, MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
  Linkedin,
  Github,
  Mail,
  ChevronDown,
  User,
  Key,
  LogOut,
  Loader2,
  SquareArrowOutUpRight,
  Bell,
} from "lucide-react";
import { useAuth } from "@/contexts/authentication";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import axios from "axios";

export function NavBar() {
  const navigate = useNavigate();
  const { isAuthenticated, state, logout } = useAuth();
  const [unreadMessages, setUnreadMessages] = useState(0);

  useEffect(() => {
    if (isAuthenticated && state.user) {
      fetchUnreadMessages();
      // Poll every 3 seconds for faster updates
      const interval = setInterval(fetchUnreadMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, state.user]);

  const fetchUnreadMessages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/messages/unread/count`
      );
      setUnreadMessages(response.data.count || 0);
    } catch (error) {
      console.error("Error fetching unread messages:", error);
    }
  };

  return (
    <nav className="flex items-center justify-between py-4 px-4 md:px-8 bg-background border-b border-muted">
      <button onClick={() => navigate("/")} className="text-2xl font-bold">
        Wannasingh K<span className="text-green-400">.</span>
      </button>
      {state.getUserLoading ? (
        <div className="hidden sm:flex items-center ">
          <Skeleton className="h-12 w-12 rounded-full bg-[#EFEEEB]" />
          <Skeleton className="ml-3 h-6 w-32 bg-[#EFEEEB]" />
          {/* Optional Requirement (Notification) */}
          {/* <Skeleton className="ml-auto h-11 w-11 rounded-full" /> */}
        </div>
      ) : !isAuthenticated ? (
        <div className="hidden sm:flex space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-2 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/sign-up")}
            className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
          >
            Sign up
          </button>
        </div>
      ) : (
        <div className="hidden sm:flex items-center space-x-4">
          {/* Message Icon */}
          <button
            onClick={() => navigate("/messages")}
            className="relative p-3.5 rounded-full border border-[#EFEEEB] bg-muted focus:outline-none text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground cursor-pointer transition-colors"
          >
            <MessageCircle className="h-4 w-4" />
            {unreadMessages > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {unreadMessages > 9 ? "9+" : unreadMessages}
              </span>
            )}
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 rounded-md text-sm font-medium text-foreground hover:text-muted-foreground focus:outline-none">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={state.user.profilePic}
                    alt="Profile"
                    className="object-cover"
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span>{state.user.name}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-background rounded-sm shadow-sm p-1"
            >
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    state.user.role === "admin" ? "/admin/profile" : "/profile"
                  )
                }
                className="text-sm text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground hover:rounded-sm cursor-pointer"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  navigate(
                    state.user.role === "admin"
                      ? "/admin/reset-password"
                      : "/reset-password"
                  )
                }
                className="text-sm text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground hover:rounded-sm cursor-pointer"
              >
                <Key className="mr-2 h-4 w-4" />
                <span>Reset password</span>
              </DropdownMenuItem>
              {state.user.role === "admin" && (
                <DropdownMenuItem
                  onClick={() => navigate("/admin/article-management")}
                  className="text-sm text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground hover:rounded-sm cursor-pointer"
                >
                  <SquareArrowOutUpRight className="mr-2 h-4 w-4" />
                  <span>Admin panel</span>
                </DropdownMenuItem>
              )}
              <div className="border-t border-muted m-1"></div>
              <DropdownMenuItem
                onClick={() => {
                  logout();
                }}
                className="text-sm text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground hover:rounded-sm cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger
          className="sm:hidden focus:outline-none"
          disabled={state.getUserLoading}
        >
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="sm:hidden w-screen rounded-none mt-4 flex flex-col gap-6 py-6 px-6">
          {!isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-8 py-4 rounded-full text-center text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/sign-up")}
                className="px-8 py-4 bg-foreground text-center text-white rounded-full hover:bg-muted-foreground transition-colors"
              >
                Sign up
              </button>
            </>
          ) : (
            <div className="sm:hidden">
              <div className="space-y-2">
                <div className="flex items-center py-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={state.user.profilePic}
                      className="object-cover"
                      alt="Profile"
                    />
                    <AvatarFallback>
                      <User className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="ml-3 text-base font-medium text-foreground">
                    {state.user.name}
                  </span>
                  {/* Message Icon Mobile */}
                  <button
                    onClick={() => navigate("/messages")}
                    className="ml-auto relative p-3.5 rounded-full border border-[#EFEEEB] bg-muted focus:outline-none text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground cursor-pointer transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {unreadMessages > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadMessages > 9 ? "9+" : unreadMessages}
                      </span>
                    )}
                  </button>
                </div>
                <a
                  onClick={() =>
                    navigate(
                      state.user.role === "admin"
                        ? "/admin/profile"
                        : "/profile"
                    )
                  }
                  className="flex items-center justify-between px-4 py-2 text-base font-medium text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground rounded-sm cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <User className="mr-4 h-5 w-5 " />
                    Profile
                  </div>
                </a>
                <a
                  onClick={() =>
                    navigate(
                      state.user.role === "admin"
                        ? "/admin/reset-password"
                        : "/reset-password"
                    )
                  }
                  className="flex items-center justify-between px-4 py-2 text-base font-medium text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground rounded-sm cursor-pointer transition-colors"
                >
                  <div className="flex items-center">
                    <Key className="mr-4 h-5 w-5" />
                    Reset password
                  </div>
                </a>
                {state.user.role === "admin" && (
                  <a
                    onClick={() => navigate("/admin/article-management")}
                    className="flex items-center justify-between px-4 py-2 text-base font-medium text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground rounded-sm cursor-pointer transition-colors"
                  >
                    <div className="flex items-center">
                      <SquareArrowOutUpRight className="mr-4 h-5 w-5" />
                      Admin panel
                    </div>
                  </a>
                )}
                <div className="border-t border-muted"></div>
                <a
                  onClick={() => {
                    logout();
                  }}
                  className="flex items-center px-4 py-2 text-base font-medium text-foreground hover:bg-[#EFEEEB] hover:text-muted-foreground rounded-sm cursor-pointer transition-colors"
                >
                  <LogOut className="mr-4 h-5 w-5" />
                  Log out
                </a>
              </div>
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}

export function HeroSection() {
  const [author, setAuthor] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAuthor();
  }, []);

  const fetchAuthor = async () => {
    try {
      // Fetch the first admin user as the main author
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/profile/author`
      );
      setAuthor(response.data);
    } catch (error) {
      console.error("Error fetching author:", error);
      // Use default data if fetch fails
      setAuthor({
        name: "Wannasingh K.",
        profile_pic: authorImage,
        bio: "I am a pet enthusiast and freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness."
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="container md:px-8 px-4 py-8 lg:py-16 mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Stay <br className="hidden lg:block" />
              Informed, <br />
              Stay Inspired,
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
              Inspiration and Information.
            </p>
          </div>
          <div className="h-[530px] bg-gray-200 rounded-lg shadow-lg lg:w-1/3 mx-4 mb-8 lg:mb-0 animate-pulse" />
          <div className="lg:w-1/3 lg:pl-8">
            <div className="h-6 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
            <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container md:px-8 px-4 py-8 lg:py-16 mx-auto">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/3 mb-8 lg:mb-0 lg:pr-8">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Stay <br className="hidden lg:block" />
            Informed, <br />
            Stay Inspired,
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover a World of Knowledge at Your Fingertips. Your Daily Dose of
            Inspiration and Information.
          </p>
        </div>
        <img
          src={author?.profile_pic || authorImage}
          alt={author?.name || "Author"}
          className="h-[530px] object-cover rounded-lg shadow-lg lg:w-1/3 mx-4 mb-8 lg:mb-0"
        />
        <div className="lg:w-1/3 lg:pl-8">
          <h2 className="text-xl font-semibold mb-2">-Author</h2>
          <h3 className="text-2xl font-bold mb-4">{author?.name || "Wannasingh K."}</h3>
          {author?.bio ? (
            <p className="text-muted-foreground">{author.bio}</p>
          ) : (
            <>
              <p className="text-muted-foreground mb-4">
                I am a pet enthusiast and freelance writer who specializes in animal
                behavior and care. With a deep love for cats, I enjoy sharing
                insights on feline companionship and wellness.
              </p>
              <p className="text-muted-foreground">
                When I&apos;m not writing, I spend time volunteering at my local
                animal shelter, helping cats find loving homes.
              </p>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export function Footer() {
  return (
    <footer className="bg-[#EFEEEB] px-8 py-8 md:py-14 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <span className="font-medium">Get in touch</span>
        <div className="flex space-x-4">
          <a
            href="https://www.linkedin.com/in/wannasingh/"
            className="hover:text-muted-foreground"
          >
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href="https://github.com/wannasingh"
            className="hover:text-muted-foreground"
          >
            <Github size={24} />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="mailto:wannasingh.khan@gmail.com"
            className="hover:text-muted-foreground"
          >
            <Mail size={24} />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
      <a href="/" className="hover:text-muted-foreground font-medium underline">
        Home page
      </a>
    </footer>
  );
}

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Loader2 className="w-16 h-16 animate-spin text-foreground" />
        <p className="mt-4 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}

```

### File: `client/src/components/auth/AuthenticationRoute.jsx`

```javascript
/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../WebSection";

function AuthenticationRoute({ isLoading, isAuthenticated, children }) {
  if (isLoading === null || isLoading) {
    // Loading state or no data yet
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Return null while navigate performs the redirection
    return <Navigate to="/" replace />;
  }

  // User is authenticated and has the correct role
  return children;
}

export default AuthenticationRoute;
```

### File: `client/src/components/auth/ProtectedRoute.jsx`

```javascript
/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { LoadingScreen } from "../WebSection";

function ProtectedRoute({
  isLoading,
  isAuthenticated,
  userRole,
  requiredRole,
  children,
}) {
  if (isLoading === null || isLoading) {
    // Loading state or no data yet
    return (
      <div className="flex flex-col min-h-screen">
        <div className="min-h-screen md:p-8">
          <LoadingScreen />
        </div>
      </div>
    );
  }

  if (!isAuthenticated || userRole !== requiredRole) {
    // Return null while navigate performs the redirection
    return <Navigate to="/login" replace />;
  }

  // User is authenticated and has the correct role
  return children;
}

export default ProtectedRoute;

```

### File: `client/src/components/ui/alert-dialog.jsx`

```javascript
import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const AlertDialog = AlertDialogPrimitive.Root

const AlertDialogTrigger = AlertDialogPrimitive.Trigger

const AlertDialogPortal = AlertDialogPrimitive.Portal

const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref} />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props} />
  </AlertDialogPortal>
))
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

const AlertDialogHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props} />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props} />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
))
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props} />
))
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName

const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action ref={ref} className={cn(buttonVariants(), className)} {...props} />
))
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName

const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props} />
))
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}

```

### File: `client/src/components/ui/avatar.jsx`

```javascript
import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props} />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props} />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props} />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarImage, AvatarFallback }

```

### File: `client/src/components/ui/button.jsx`

```javascript
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return (
    (<Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props} />)
  );
})
Button.displayName = "Button"

export { Button, buttonVariants }

```

### File: `client/src/components/ui/dropdown-menu.jsx`

```javascript
import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const DropdownMenu = DropdownMenuPrimitive.Root

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

const DropdownMenuGroup = DropdownMenuPrimitive.Group

const DropdownMenuPortal = DropdownMenuPrimitive.Portal

const DropdownMenuSub = DropdownMenuPrimitive.Sub

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props}>
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
))
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props} />
))
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props} />
  </DropdownMenuPrimitive.Portal>
))
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    )}
    {...props} />
))
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
))
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
))
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props} />
))
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props} />
))
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}) => {
  return (
    (<span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props} />)
  );
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
}

```

### File: `client/src/components/ui/input.jsx`

```javascript
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }

```

### File: `client/src/components/ui/label.jsx`

```javascript
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }

```

### File: `client/src/components/ui/select.jsx`

```javascript
import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}>
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}>
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}>
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn("p-1", position === "popper" &&
          "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]")}>
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props} />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props} />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}

```

### File: `client/src/components/ui/skeleton.jsx`

```javascript
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />);
}

export { Skeleton }

```

### File: `client/src/components/ui/sonner.jsx`

```javascript
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  const { theme = "system" } = useTheme()

  return (
    (<Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props} />)
  );
}

export { Toaster }

```

### File: `client/src/components/ui/table.jsx`

```javascript
import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props} />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props} />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props} />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props} />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props} />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props} />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props} />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

### File: `client/src/components/ui/textarea.jsx`

```javascript
import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    (<textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }

```

### File: `client/src/contexts/authentication.jsx`

```javascript
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

function AuthProvider(props) {
  const [state, setState] = useState({
    loading: null,
    getUserLoading: null,
    error: null,
    user: null,
  });

  const navigate = useNavigate();

  // Fetch user details using Supabase API
  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setState((prevState) => ({
        ...prevState,
        user: null,
        getUserLoading: false,
      }));
      return;
    }

    try {
      setState((prevState) => ({ ...prevState, getUserLoading: true }));
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/get-user`
      );
      setState((prevState) => ({
        ...prevState,
        user: response.data,
        getUserLoading: false,
      }));
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        error: error.message,
        user: null,
        getUserLoading: false,
      }));
    }
  };

  useEffect(() => {
    fetchUser(); // Load user on initial app load
  }, []);

  // Login user
  const login = async (data) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        data
      );
      const token = response.data.access_token;
      localStorage.setItem("token", token);

      // Fetch and set user details
      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      navigate("/");
      await fetchUser();
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.response?.data?.error || "Login failed",
      }));
      return { error: error.response?.data?.error || "Login failed" };
    }
  };

  // Register user
  const register = async (data) => {
    try {
      setState((prevState) => ({ ...prevState, loading: true, error: null }));
      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        data
      );
      setState((prevState) => ({ ...prevState, loading: false, error: null }));
      navigate("/sign-up/success");
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: error.response?.data?.error || "Registration failed",
      }));
      return { error: state.error };
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem("token");
    setState({ user: null, error: null, loading: null });
    navigate("/");
  };

  const isAuthenticated = Boolean(state.user);

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        logout,
        register,
        isAuthenticated,
        fetchUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

// Hook for consuming AuthContext
const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };

```

### File: `client/src/data/blogPosts.js`

```javascript
export const blogPosts = [
  {
    id: 1,
    image: "/images/google-ai.png",
    category: "General",
    title: "The Rise of Google Gemini: How Google AI is Transforming Search and Creativity",
    description: "Google Gemini is shifting the boundaries of generative AI. Learn how its multimodal capabilities are transforming daily tasks, coding, and creative workflows.",
    author: "Wannasingh K.",
    date: "11 September 2024",
    likes: 321,
    content:
      "## The Next Era of AI: Google Gemini\n\nGoogle Gemini represents a major leap in artificial intelligence, designed from the ground up to be multimodal. This means it can seamlessly understand, operate across, and combine different types of information, including text, code, audio, image, and video.\n\n### 1. What is Multimodality?\nUnlike traditional AI models that are trained on text alone and then retrofitted to handle images, Gemini was built to be natively multimodal. This allows it to grasp complex visual patterns, transcribe and translate audio, and write high-quality code with human-like reasoning.\n\n### 2. Boosting Creativity and Productivity\nFrom writing blog posts to analyzing complex scientific research papers, Gemini acts as a powerful co-pilot. It can summarize thousands of pages in seconds, draft code structures, and generate beautiful visuals to accompany your ideas.\n\n### 3. Google AI in Daily Google Workspace\nWith Gemini integration in Gmail, Docs, and Sheets, tasks like drafting professional emails, formatting spreadsheets, and summarizing long email threads are now done in seconds, allowing you to focus on strategic, high-value work."
  },
  {
    id: 2,
    image: "/images/cat-ai.png",
    category: "Cat",
    title: "AI for Pets: How Smart Tech and AI are Revolutionizing Cat Care",
    description: "From smart collars to automated nutrition planners, discover how pet parents are using artificial intelligence to keep cats happy, healthy, and safe.",
    author: "Wannasingh K.",
    date: "21 August 2024",
    likes: 123,
    content:
      "## Bridging Feline Companionship with Smart Tech\n\nAs artificial intelligence grows, it's not just humans who benefit—our pets do too! AI-powered pet care is a booming field, offering owners deeper insights into their cat's health, mood, and behavior.\n\n### 1. Smart Collars and Health Monitoring\nModern smart collars track your cat's heart rate, sleep quality, and daily step count. By feeding this data into AI algorithms, these devices can flag early signs of illness or stress before any visible symptoms appear.\n\n### 2. Automated Smart Feeders\nUsing computer vision and weight sensors, smart feeders recognize individual cats (especially helpful in multi-cat households) and dispense exact nutritional portions. They prevent overeating and track dietary habits in real-time.\n\n### 3. Decoding Feline Language\nExciting new apps use audio analysis powered by AI to translate your cat's meows and purrs into human emotions, helping you understand if they are hungry, bored, or feeling playful."
  },
  {
    id: 3,
    image: "/images/apple-ai.png",
    category: "Inspiration",
    title: "Apple Intelligence: The Next Frontier of Personal AI on iOS and macOS",
    description: "Apple is integrating personal intelligence deep into iOS and macOS. Learn how Apple Intelligence prioritizes privacy while delivering highly contextual AI helper tools.",
    author: "Wannasingh K.",
    date: "23 March 2024",
    likes: 21,
    content:
      "## The Apple Way: Private and Personal AI\n\nApple Intelligence is the newly introduced personal intelligence system for iPhone, iPad, and Mac. It combines the power of generative models with personal context to deliver intelligence that's incredibly useful and relevant.\n\n### 1. Context-Aware Assistance\nApple Intelligence understands your personal context. It can search through your emails, messages, calendar events, and photos to answer complex prompts like, \"When is my mom's flight landing, and what was our lunch plan?\"\n\n### 2. Writing Tools and Image Playground\nSystem-wide Writing Tools help you proofread, rewrite in different tones, and summarize text across almost any app. The Image Playground lets you create fun, stylized images in seconds using pre-built categories and concepts.\n\n### 3. A Privacy-First Approach\nA key differentiator is Apple's focus on privacy. Much of the processing happens on-device. When cloud processing is required, Apple uses Private Cloud Compute, ensuring your data is never stored or made accessible to anyone—including Apple."
  },
  {
    id: 4,
    image: "/images/productivity-ai.png",
    category: "General",
    title: "Generative AI in Daily Life: How to 10x Your Productivity",
    description: "Discover practical strategies to integrate generative AI models like ChatGPT and Gemini into your daily coding, writing, and research workflows.",
    author: "Wannasingh K.",
    date: "23 May 2024",
    likes: 32,
    content:
      "## 10x Your Daily Workflows with Generative AI\n\nArtificial intelligence is no longer a futuristic concept—it is a tool you can use today to supercharge your productivity and clear your daily task list in half the time.\n\n### 1. AI as a Coding Co-Pilot\nWhether you are writing a React frontend or an Express backend, AI tools can autocomplete code blocks, suggest optimizations, and help you debug complex error stacks in seconds.\n\n### 2. Streamlining Research and Summarization\nInstead of spending hours reading long documentation or academic papers, you can paste the text or upload documents into an AI assistant. Ask it to extract key insights, summarize core arguments, or explain complex jargon in simple terms.\n\n### 3. Drafting and Brainstorming\nStuck on a blank page? Use AI to brainstorm titles, outline articles, or write initial drafts. This frees up your mental energy to focus on refining, polishing, and injecting your unique personal voice into the final output."
  },
  {
    id: 5,
    image: "/images/productivity-ai.png",
    category: "Inspiration",
    title: "The Power of Habits: Small Changes, Big Results",
    description: "Discover how small, consistent habits can lead to significant personal and professional growth over time.",
    author: "Wannasingh K.",
    date: "23 June 2024",
    likes: 515,
    content:
      "## 1. Understanding Habit Formation\n\nLearn the science behind habit formation and why habits are so powerful in shaping our lives.\n\n## 2. Identifying Key Habits\n\nDiscover how to identify the habits that will have the most significant impact on your goals.\n\n## 3. Building Positive Habits\n\nExplore strategies for successfully implementing and maintaining positive habits.\n\n## 4. Breaking Bad Habits\n\nLearn effective techniques for identifying and breaking detrimental habits.\n\n## 5. Habit Stacking\n\nUnderstand how to use habit stacking to make new habits easier to adopt and maintain."
  },
  {
    id: 6,
    image: "/images/cat-ai.png",
    category: "Cat",
    title: "Cat Nutrition: A Guide to Feeding Your Feline Friend",
    description: "Learn about the nutritional needs of cats and how to provide a balanced diet for optimal health and longevity.",
    author: "Wannasingh K.",
    date: "21 July 2024",
    likes: 555,
    content:
      "## 1. Understanding Feline Nutritional Needs\n\nExplore the unique dietary requirements of cats as obligate carnivores.\n\n## 2. Choosing the Right Cat Food\n\nLearn how to read cat food labels and select high-quality options for your pet.\n\n## 3. Wet vs. Dry Food\n\nUnderstand the pros and cons of wet and dry cat food and how to incorporate both into your cat's diet.\n\n## 4. Portion Control and Feeding Schedule\n\nDiscover how to determine the right portion sizes and establish a healthy feeding routine.\n\n## 5. Special Dietary Considerations\n\nLearn about nutrition for cats with specific health conditions or at different life stages."
  }
];

```

### File: `client/src/data/comments.js`

```javascript
export const comments = [
  {
    name: "Jacob Lash",
    date: "12 September 2024 at 18:30",
    comment:
      "I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.",
    image:
      "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1729662963/my-blog-post/llfhaf1abbpokpsqzgs6.jpg",
  },
  {
    name: "Ahri",
    date: "12 September 2024 at 18:30",
    comment:
      "Such a great read! I've always wondered why my cat slow blinks at me—now I know it's her way of showing trust!",
    image:
      "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1729662972/my-blog-post/oyin12idwvmcehp18fzw.jpg",
  },
  {
    name: "Mimi mama",
    date: "12 September 2024 at 18:30",
    comment:
      "This article perfectly captures why cats make such amazing pets. I had no idea their purring could help with healing. Fascinating stuff!",
    image:
      "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1729662981/my-blog-post/rv3c7cyb3paumrhxzsqj.jpg",
  },
];

```

### File: `client/src/index.css`

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
@tailwind base;
@tailwind components;
@tailwind utilities;
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 20 14.3% 4.1%;
    --card: 0 0% 100%;
    --card-foreground: 20 14.3% 4.1%;
    --popover: 0 0% 100%;
    --popover-foreground: 20 14.3% 4.1%;
    --primary: 24 9.8% 10%;
    --primary-foreground: 60 9.1% 97.8%;
    --secondary: 60 4.8% 95.9%;
    --secondary-foreground: 24 9.8% 10%;
    --muted: 60 4.8% 95.9%;
    --muted-foreground: 25 5.3% 44.7%;
    --accent: 60 4.8% 95.9%;
    --accent-foreground: 24 9.8% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 20 5.9% 90%;
    --input: 20 5.9% 90%;
    --ring: 20 14.3% 4.1%;
    --chart-1: 12 76% 61%;
    --chart-2: 173 58% 39%;
    --chart-3: 197 37% 24%;
    --chart-4: 43 74% 66%;
    --chart-5: 27 87% 67%;
    --radius: 0.5rem
  }
  .dark {
    --background: 20 14.3% 4.1%;
    --foreground: 60 9.1% 97.8%;
    --card: 20 14.3% 4.1%;
    --card-foreground: 60 9.1% 97.8%;
    --popover: 20 14.3% 4.1%;
    --popover-foreground: 60 9.1% 97.8%;
    --primary: 60 9.1% 97.8%;
    --primary-foreground: 24 9.8% 10%;
    --secondary: 12 6.5% 15.1%;
    --secondary-foreground: 60 9.1% 97.8%;
    --muted: 12 6.5% 15.1%;
    --muted-foreground: 24 5.4% 63.9%;
    --accent: 12 6.5% 15.1%;
    --accent-foreground: 60 9.1% 97.8%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 60 9.1% 97.8%;
    --border: 12 6.5% 15.1%;
    --input: 12 6.5% 15.1%;
    --ring: 24 5.7% 82.9%;
    --chart-1: 220 70% 50%;
    --chart-2: 160 60% 45%;
    --chart-3: 30 80% 55%;
    --chart-4: 280 65% 60%;
    --chart-5: 340 75% 55%
  }
}
@layer base {
  * {
    @apply border-border;
    cursor: default !important;
  }
  body {
    @apply bg-background text-foreground;
    cursor: default !important;
  }
  /* Only show text cursor in input fields */
  input:not([type="button"]):not([type="submit"]):not([type="reset"]),
  textarea,
  [contenteditable="true"] {
    cursor: text !important;
  }
  /* Show pointer cursor for clickable elements */
  button,
  a,
  [role="button"],
  [type="button"],
  [type="submit"],
  [type="reset"],
  select,
  [role="link"],
  .cursor-pointer {
    cursor: pointer !important;
  }
  /* Ensure no text cursor on regular text */
  p, span, div, h1, h2, h3, h4, h5, h6, label {
    cursor: default !important;
  }
}

.markdown {
  font-size: 16px;
  font-weight: 400;
}
.markdown :is(h2) {
  margin-top: 32px;
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 600;
}
.markdown :is(h3, h4, h5, h6) {
  margin-top: 32px;
  margin-bottom: 12px;
  font-size: 18px;
  font-weight: bold;
}
.markdown p:not(:is(h2, h3, h4, h5, h6) + p) {
  margin-top: 22px;
}
.markdown :is(ul, ol) {
  list-style-position: outside;
}
.markdown :is(ul) {
  list-style-type: "•";
}
.markdown :is(ol) {
  list-style-type: decimal;
  padding-left: 20px;
}
.markdown :is(a) {
  text-decoration: underline;
}
.markdown :is(a):hover {
  text-decoration: underline;
  color: #726d67;
  cursor: pointer;
}
.markdown :is(ul) li {
  margin-block: 8px;
  padding-inline-start: 8px;
  padding-left: 5px;
  margin-left: 10px;
}
.markdown :is(ol) li {
  margin-block: 8px;
  padding-inline-start: 8px;
  padding-left: 3px;
  margin-left: 10px;
}
.markdown :is(blockquote) {
  border-left: 3px solid #26231e;
  margin: 1.5em 10px;
  padding-left: 10px;
  font-style: italic;
}
.markdown :is(hr) {
  border: none;
  border-top: 2.5px solid #d1d5db;
  margin: 1.5em 0;
  width: 30%;
}
.markdown img {
  display: block;
  width: 100%;
  height: auto;
  margin: 2em 0;
  border-radius: 12px;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
```

### File: `client/src/lib/utils.js`

```javascript
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

```

### File: `client/src/main.jsx`

```javascript
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/authentication.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

```

### File: `client/src/page/HomePage.jsx`

```javascript
import { NavBar, HeroSection, Footer } from "@/components/WebSection";
import ArticlesSection from "@/components/ArticlesSection";
import { Helmet } from 'react-helmet-async';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Wannasin Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      <NavBar />
      <div className="flex-grow">
        <HeroSection />
        <ArticlesSection />
      </div>
      <Footer />
    </div>
  );
}

```

### File: `client/src/page/LoginPage.jsx`

```javascript
import { useState } from "react";
import { NavBar, Footer } from "@/components/WebSection";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/authentication";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";

export default function LoginPage() {
  const { login, state } = useAuth();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  // Validate inputs
  const validateInputs = () => {
    const errors = {};

    // Validate email
    if (!formValues.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (!formValues.password.trim()) {
      errors.password = "Password is required.";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const result = await login(formValues);
      if (result?.error) {
        return toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">{result.error}</h2>
              <p className="text-sm">Please try another password or email</p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));
      }
      navigate("/");
    }
  };

  // Handle input change
  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex justify-center items-center p-4 my-4 flex-grow">
        <div className="w-full max-w-2xl bg-[#EFEEEB] rounded-sm shadow-md px-3 sm:px-20 py-14">
          <h2 className="text-4xl font-semibold text-center mb-6 text-foreground">
            Log in
          </h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="relative space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={formValues.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  formErrors.email ? "border-red-500" : ""
                }`}
                disabled={state.loading}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs absolute">
                  {formErrors.email}
                </p>
              )}
            </div>
            <div className="relative space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={formValues.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  formErrors.password ? "border-red-500" : ""
                }`}
                disabled={state.loading}
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs absolute">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors flex items-center gap-1"
                disabled={state.loading}
              >
                {state.loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  ""
                )}
                Log in
              </button>
            </div>
          </form>
          <p className="flex flex-row justify-center gap-1 mt-4 text-sm text-center pt-2 text-muted-foreground font-medium">
            Don&apos;t have an account?{" "}
            <a
              onClick={() => navigate("/sign-up")}
              className="text-foreground hover:text-muted-foreground transition-colors underline font-semibold cursor-pointer"
            >
              Sign up
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

```

### File: `client/src/page/MessagesPage.jsx`

```javascript
import { useState, useEffect, useRef } from "react";
import { NavBar, Footer } from "@/components/WebSection";
import { useAuth } from "@/contexts/authentication";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Send, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function MessagesPage() {
    const { state } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [otherUserTyping, setOtherUserTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        if (!state.user) {
            navigate("/login");
            return;
        }
        fetchConversations();

        // Check if there's a userId in URL params
        const userId = searchParams.get("userId");
        if (userId) {
            fetchUserAndMessages(userId);
        } else {
            // If no userId in URL, clear selected user
            setSelectedUser(null);
        }

        // Poll for new messages every 2 seconds
        const interval = setInterval(() => {
            if (selectedUser) {
                fetchMessages(selectedUser.id, true);
                checkTypingStatus(selectedUser.id);
            }
            fetchConversations();
        }, 2000);

        return () => clearInterval(interval);
    }, [state.user, navigate, selectedUser, searchParams]);

    const checkTypingStatus = async (userId) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/messages/typing/${userId}`
            );
            setOtherUserTyping(response.data.isTyping);
        } catch (error) {
            console.error("Error checking typing status:", error);
        }
    };

    const sendTypingStatus = async () => {
        if (!selectedUser) return;

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/messages/typing`,
                { receiverId: selectedUser.id }
            );
        } catch (error) {
            console.error("Error sending typing status:", error);
        }
    };

    const handleTyping = () => {
        sendTypingStatus();

        // Clear existing timeout
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        // Set new timeout to send typing status again
        typingTimeoutRef.current = setTimeout(() => {
            sendTypingStatus();
        }, 1000);
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchConversations = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/messages/conversations`
            );
            setConversations(response.data);
        } catch (error) {
            console.error("Error fetching conversations:", error);
        }
    };

    const fetchUserAndMessages = async (userId) => {
        try {
            const userResponse = await axios.get(
                `${import.meta.env.VITE_API_URL}/profile/${userId}`
            );
            setSelectedUser(userResponse.data);
            await fetchMessages(userId);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const fetchMessages = async (userId, silent = false) => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/messages/${userId}`
            );
            const prevLength = messages.length;
            setMessages(response.data);

            // Auto scroll only if new message arrived
            if (!silent && response.data.length > prevLength) {
                setTimeout(scrollToBottom, 100);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    const handleSelectConversation = (user) => {
        setSelectedUser(user);
        setOtherUserTyping(false);
        fetchMessages(user.id);
        // Update URL with userId param
        navigate(`/messages?userId=${user.id}`, { replace: true });
        // Refresh conversations immediately
        fetchConversations();
        // Refresh again after 500ms to ensure database is updated
        setTimeout(() => {
            fetchConversations();
        }, 500);
    };

    const handleBackToConversations = () => {
        setSelectedUser(null);
        setOtherUserTyping(false);
        // Clear URL params
        navigate('/messages', { replace: true });
    };

    const handleSendMessage = async (e) => {
        e?.preventDefault();
        if (!newMessage.trim() || !selectedUser || isLoading) return;

        const messageToSend = newMessage;
        setNewMessage("");
        setIsLoading(true);

        try {
            // Encrypt message
            const encoder = new TextEncoder();
            const data = encoder.encode(messageToSend);
            const encryptedMessage = btoa(String.fromCharCode(...data));

            // Optimistic update - add message immediately
            const tempMessage = {
                id: Date.now(),
                sender_id: state.user.id,
                receiver_id: selectedUser.id,
                message: encryptedMessage,
                is_read: false,
                created_at: new Date().toISOString(),
            };
            setMessages(prev => [...prev, tempMessage]);
            setTimeout(scrollToBottom, 100);

            await axios.post(`${import.meta.env.VITE_API_URL}/messages`, {
                receiverId: selectedUser.id,
                message: encryptedMessage,
            });

            // Fetch to get real message with ID
            await fetchMessages(selectedUser.id, true);
            await fetchConversations();
        } catch (error) {
            console.error("Error sending message:", error);
            setNewMessage(messageToSend); // Restore message on error
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const decryptMessage = (encryptedMessage) => {
        try {
            const decoded = atob(encryptedMessage);
            return new TextDecoder().decode(
                new Uint8Array([...decoded].map(char => char.charCodeAt(0)))
            );
        } catch {
            return encryptedMessage; // Return original if decryption fails
        }
    };

    return (
        <div className="flex flex-col h-screen">
            <Helmet>
                <title>Messages - Wannasin Blog</title>
            </Helmet>
            <div className="hidden sm:block">
                <NavBar />
            </div>
            <div className="flex-1 bg-gray-50 overflow-hidden">
                <div className="max-w-7xl mx-auto h-full sm:px-4 sm:py-8">
                    <div className="bg-white sm:rounded-lg sm:shadow-md h-full sm:h-[600px] flex flex-col md:flex-row overflow-hidden">
                        {/* Conversations List */}
                        <div className={`${selectedUser ? 'hidden md:block' : 'block'} w-full md:w-1/3 border-r border-gray-200 overflow-y-auto flex-shrink-0`}>
                            <div className="p-3 sm:p-4 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center gap-3">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="sm:hidden p-2 hover:bg-gray-100 rounded-full active:bg-gray-200 transition-colors"
                                    title="Back"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </button>
                                <h2 className="text-lg sm:text-xl font-bold">Messages</h2>
                            </div>
                            {conversations.length === 0 ? (
                                <div className="p-4 text-center text-muted-foreground">
                                    No conversations yet
                                </div>
                            ) : (
                                conversations.map((conv) => (
                                    <div
                                        key={conv.user.id}
                                        onClick={() => handleSelectConversation(conv.user)}
                                        className={`p-3 sm:p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors ${selectedUser?.id === conv.user.id ? "bg-gray-100" : ""
                                            }`}
                                    >
                                        <div className="flex items-center space-x-2 sm:space-x-3">
                                            <img
                                                src={conv.user.profile_pic}
                                                alt={conv.user.name}
                                                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline gap-2">
                                                    <h3 className="font-semibold truncate text-sm sm:text-base">
                                                        {conv.user.name}
                                                    </h3>
                                                    {conv.unreadCount > 0 && (
                                                        <span className="bg-green-500 text-white text-xs rounded-full px-2 py-0.5 flex-shrink-0 min-w-[1.5rem] text-center">
                                                            {conv.unreadCount}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs sm:text-sm text-gray-500 truncate mt-0.5">
                                                    {decryptMessage(conv.lastMessage)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Messages Area */}
                        <div className={`${selectedUser ? 'flex' : 'hidden md:flex'} flex-1 flex-col min-w-0`}>
                            {selectedUser ? (
                                <>
                                    {/* Header */}
                                    <div className="p-3 sm:p-4 border-b border-gray-200 flex items-center space-x-2 sm:space-x-3">
                                        <button
                                            onClick={handleBackToConversations}
                                            className="p-2 hover:bg-gray-100 rounded-full active:bg-gray-200 transition-colors"
                                            title="Back to conversations"
                                        >
                                            <ArrowLeft className="w-5 h-5" />
                                        </button>
                                        <img
                                            src={selectedUser.profile_pic}
                                            alt={selectedUser.name}
                                            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-sm sm:text-base truncate">{selectedUser.name}</h3>
                                            {otherUserTyping && (
                                                <p className="text-xs text-gray-500">typing...</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
                                        {messages.map((msg, index) => {
                                            const isSentByMe = msg.sender_id === state.user.id;
                                            const isLastMessage = index === messages.length - 1;
                                            const showReadStatus = isSentByMe && isLastMessage && msg.is_read;

                                            // Debug log
                                            if (isLastMessage && isSentByMe) {
                                                console.log('Last message:', {
                                                    id: msg.id,
                                                    isSentByMe,
                                                    is_read: msg.is_read,
                                                    showReadStatus
                                                });
                                            }

                                            return (
                                                <div
                                                    key={msg.id}
                                                    className={`flex ${isSentByMe ? "justify-end" : "justify-start"}`}
                                                >
                                                    <div className="flex flex-col max-w-[85%] sm:max-w-[75%]">
                                                        <div
                                                            className={`rounded-2xl px-3 sm:px-4 py-2 break-words ${isSentByMe
                                                                ? "bg-foreground text-white"
                                                                : "bg-gray-200 text-foreground"
                                                                }`}
                                                        >
                                                            <p className="text-sm sm:text-base">{decryptMessage(msg.message)}</p>
                                                            <p className="text-xs mt-1 opacity-70">
                                                                {new Date(msg.created_at).toLocaleTimeString("en-GB", {
                                                                    hour: "2-digit",
                                                                    minute: "2-digit",
                                                                })}
                                                            </p>
                                                        </div>
                                                        {showReadStatus && (
                                                            <p className="text-xs text-gray-500 mt-1 text-right">
                                                                อ่านแล้ว
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {otherUserTyping && (
                                            <div className="flex justify-start">
                                                <div className="bg-gray-200 rounded-2xl px-4 py-3">
                                                    <div className="flex space-x-1">
                                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Input */}
                                    <form
                                        onSubmit={handleSendMessage}
                                        className="p-3 sm:p-4 border-t border-gray-200"
                                    >
                                        <div className="flex space-x-2">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => {
                                                    setNewMessage(e.target.value);
                                                    handleTyping();
                                                }}
                                                onKeyDown={handleKeyDown}
                                                placeholder="Type a message..."
                                                className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-full focus:outline-none focus:border-foreground"
                                            />
                                            <button
                                                type="submit"
                                                disabled={isLoading || !newMessage.trim()}
                                                className="bg-foreground text-white p-2.5 sm:p-3 rounded-full hover:bg-muted-foreground active:bg-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                                            >
                                                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </button>
                                        </div>
                                    </form>
                                </>
                            ) : (
                                <div className="flex-1 flex items-center justify-center text-muted-foreground">
                                    Select a conversation to start messaging
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden sm:block">
                <Footer />
            </div>
        </div>
    );
}

```

### File: `client/src/page/NotFoundpage.jsx`

```javascript
import { TriangleAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex items-center justify-center p-4 my-4">
        <div className="flex flex-col space-y-8 items-center w-full max-w-xl bg-[#EFEEEB] rounded-sm shadow-md px-3 sm:px-20 py-14">
          <div className="relative">
            <div className="h-20 w-20 bg-yellow-500 rounded-full flex items-center justify-center">
              <TriangleAlert className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="mt-6 text-2xl font-bold">Page Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
          >
            Go To Homepage
          </button>
        </div>
      </main>
    </div>
  );
}

```

### File: `client/src/page/ProfilePage.jsx`

```javascript
import { useState, useEffect } from "react";
import { NavBar, Footer } from "@/components/WebSection";
import { useNavigate } from "react-router-dom";
import { X, User, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/authentication";
import { toast } from "sonner";
import axios from "axios";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { state, fetchUser } = useAuth();
  const [profile, setProfile] = useState({
    image: "",
    name: "",
    username: "",
    email: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfile({
          image: state.user.profilePic || "",
          name: state.user.name || "",
          username: state.user.username || "",
          email: state.user.email || "",
        });
      } catch {
        toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">
                Failed to fetch profile
              </h2>
              <p className="text-sm">Please try again later.</p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));
      }
    };

    fetchProfile();
  }, [state.user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Check file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Invalid file type</h2>
            <p className="text-sm">
              Please upload a valid image file (JPEG, PNG, GIF, WebP).
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      return;
    }

    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">File too large</h2>
            <p className="text-sm">Please upload an image smaller than 5MB.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      return;
    }

    setImageFile(file);
    setProfile((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("username", profile.username);

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      const token = localStorage.getItem("token");
      
      await axios.put(
        `${import.meta.env.VITE_API_URL}/profile`,
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
        }
      );


      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Profile updated successfully
            </h2>
            <p className="text-sm">Your profile changes have been saved.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || "Please try again later.";
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to update profile</h2>
            <p className="text-sm">{errorMessage}</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsSaving(false);
      fetchUser();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="min-h-screen md:p-8">
        <div className="max-w-4xl mx-auto overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center p-6">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={state.user.profilePic}
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{state.user.name}</h1>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden p-4">
            <div className="flex justify-start gap-12 items-center mb-4">
              <div className="flex items-center space-x-2 text-foreground font-medium cursor-default">
                <User className="h-5 w-5 mb-1" />
                <span>Profile</span>
              </div>
              <a
                onClick={() => navigate("/reset-password")}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                <Lock className="h-5 w-5 mb-1" />
                Reset password
              </a>
            </div>
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={profile.image}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>
                  <User className="h-8 w-8" />
                </AvatarFallback>
              </Avatar>
              <h2 className="ml-3 text-xl font-semibold">{profile.name}</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 p-6">
              <nav>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-foreground font-medium cursor-default">
                    <User className="h-5 w-5 mb-1" />
                    <span>Profile</span>
                  </div>
                  <a
                    onClick={() => navigate("/reset-password")}
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                  >
                    <Lock className="h-5 w-5 mb-1" />
                    Reset password
                  </a>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-[#EFEEEB] md:m-2 md:shadow-md md:rounded-lg">
              <div className="flex flex-col md:flex-row items-center justify-start md:gap-6 mb-6">
                <Avatar className="h-28 w-28 mb-5">
                  <AvatarImage
                    src={profile.image}
                    alt="Profile"
                    className="object-cover"
                  />
                  <AvatarFallback>
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <label className="bg-background px-8 py-2 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer">
                  Upload profile picture
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </label>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
                  />
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Username
                  </label>
                  <Input
                    id="username"
                    name="username"
                    value={profile.username}
                    onChange={handleInputChange}
                    className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-2 mt-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

```

### File: `client/src/page/ResetPasswordPage.jsx`

```javascript
/* eslint-disable react/prop-types */
import { useState } from "react";
import { NavBar, Footer } from "@/components/WebSection";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Lock, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authentication";
import axios from "axios";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [valid, setValid] = useState({
    password: true,
    newPassword: true,
    confirmNewPassword: true,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { state } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidPassword = password.trim() !== "";
    const isValidNewPassword = newPassword.trim() !== "";
    const isValidConfirmPassword =
      confirmNewPassword.trim() !== "" && confirmNewPassword === newPassword;

    setValid({
      password: isValidPassword,
      newPassword: isValidNewPassword,
      confirmNewPassword: isValidConfirmPassword,
    });

    if (isValidPassword && isValidNewPassword && isValidConfirmPassword) {
      setIsDialogOpen(true);
    }
  };

  const handleResetPassword = async () => {
    try {
      setIsDialogOpen(false);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          oldPassword: password,
          newPassword: newPassword,
        }
      );

      if (response.status === 200) {
        toast.custom((t) => (
          <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">Success!</h2>
              <p className="text-sm">
                Password reset successful. You can now log in with your new
                password.
              </p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));

        // Clear form fields after successful reset
        setPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch (error) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Error</h2>
            <p className="text-sm">
              {error.response?.data?.error ||
                "Something went wrong. Please try again."}
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="min-h-screen md:p-8">
        <div className="max-w-4xl w-full md:mx-auto overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center p-6">
            <Avatar className="h-14 w-14">
              <AvatarImage
                src={state.user.profilePic}
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">{state.user.name}</h1>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden p-4">
            <div className="flex justify-start gap-12 items-center mb-4">
              <a
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
              >
                <User className="h-5 w-5 mb-1" />
                Profile
              </a>
              <div className="flex items-center space-x-2 text-foreground font-medium cursor-default">
                <Lock className="h-5 w-5 mb-1" />
                <span>Reset password</span>
              </div>
            </div>
            <div className="flex items-center">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={state.user.profilePic}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <h2 className="ml-3 text-xl font-semibold">{state.user.name}</h2>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 p-6">
              <nav>
                <div className="space-y-3">
                  <a
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                  >
                    <User className="h-5 w-5 mb-1" />
                    Profile
                  </a>
                  <div className="flex items-center space-x-2 text-foreground font-medium cursor-default">
                    <Lock className="h-5 w-5 mb-1" />
                    <span>Reset password</span>
                  </div>
                </div>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 bg-[#EFEEEB] md:m-2 md:shadow-md md:rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-7">
                <div className="relative">
                  <label
                    htmlFor="current-password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Current password
                  </label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Current password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                      !valid.password ? "border-red-500" : ""
                    }`}
                  />
                  {!valid.password && (
                    <p className="text-red-500 text-xs absolute mt-1">
                      This field is required
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="new-password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    New password
                  </label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                      !valid.newPassword ? "border-red-500" : ""
                    }`}
                  />
                  {!valid.newPassword && (
                    <p className="text-red-500 text-xs absolute mt-1">
                      Password must be at least 8 characters
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label
                    htmlFor="confirm-new-password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm new password
                  </label>
                  <Input
                    id="confirm-new-password"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                      !valid.confirmNewPassword ? "border-red-500" : ""
                    }`}
                  />
                  {!valid.confirmNewPassword && (
                    <p className="text-red-500 text-xs absolute mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
                >
                  Reset password
                </button>
              </form>
            </main>
          </div>
        </div>
      </div>
      <Footer />
      <ResetPasswordModal
        dialogState={isDialogOpen}
        setDialogState={setIsDialogOpen}
        resetFunction={handleResetPassword}
      />
    </div>
  );
}

function ResetPasswordModal({ dialogState, setDialogState, resetFunction }) {
  return (
    <AlertDialog open={dialogState} onOpenChange={setDialogState}>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-md flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Reset password
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-row mb-2 justify-center font-medium text-center text-muted-foreground">
          Do you want to reset your password?
        </AlertDialogDescription>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => setDialogState(false)}
            className="bg-background px-10 py-4 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={resetFunction}
            className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-4 text-lg px-10"
          >
            Reset
          </button>
        </div>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

```

### File: `client/src/page/SignUpPage.jsx`

```javascript
import { useState } from "react";
import { NavBar, Footer } from "@/components/WebSection";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/authentication";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";

export default function SignUpPage() {
  const { register, state } = useAuth();
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const validateInputs = () => {
    const errors = {};

    // Validate name
    if (!formValues.name.trim()) {
      errors.name = "Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formValues.name)) {
      errors.name = "Name must contain only letters and spaces.";
    } else if (formValues.name.length < 3) {
      errors.name = "Name must be at least 3 characters long.";
    }

    // Validate username
    if (!formValues.username.trim()) {
      errors.username = "Username is required.";
    } else if (!/^[a-zA-Z0-9._-]+$/.test(formValues.username)) {
      errors.username =
        "Username can only contain letters, numbers, dots, underscores, and dashes.";
    } else if (formValues.username.length < 5) {
      errors.username = "Username must be at least 5 characters long.";
    } else if (formValues.username.length > 15) {
      errors.username = "Username cannot exceed 15 characters.";
    }

    // Validate email
    if (!formValues.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate password
    if (!formValues.password.trim()) {
      errors.password = "Password is required.";
    } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formValues.password)) {
      errors.password = "Password must contain letters and numbers.";
    } else if (formValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateInputs();
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const result = await register(formValues);
      if (result?.error) {
        let suggestionMessage = "";

        // Check for email or username-related issues
        if (result.error.toLowerCase().includes("email")) {
          suggestionMessage = "Try using a different email address.";
        } else if (result.error.toLowerCase().includes("username")) {
          suggestionMessage = "Try using a different username.";
        }

        return toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">{result.error}</h2>
              <p className="text-sm">
                {suggestionMessage && (
                  <span className="block mt-2 text-sm">
                    {suggestionMessage}
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));
      }
    }
  };

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex justify-center items-center p-4 my-6 flex-grow">
        <div className="w-full max-w-2xl bg-[#EFEEEB] rounded-sm shadow-md px-3 sm:px-20 py-14">
          <h2 className="text-4xl font-semibold text-center mb-6 text-foreground">
            Sign up
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="relative space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground"
              >
                Name
              </label>
              <Input
                id="name"
                placeholder="Full name"
                value={formValues.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  formErrors.name ? "border-red-500" : ""
                }`}
                disabled={state.loading}
              />
              {formErrors.name && (
                <p className="text-red-500 text-xs absolute">
                  {formErrors.name}
                </p>
              )}
            </div>
            <div className="relative space-y-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-muted-foreground"
              >
                Username
              </label>
              <Input
                id="username"
                placeholder="Username"
                value={formValues.username}
                onChange={(e) => handleChange("username", e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  formErrors.username ? "border-red-500" : ""
                }`}
                disabled={state.loading}
              />
              {formErrors.username && (
                <p className="text-red-500 text-xs absolute">
                  {formErrors.username}
                </p>
              )}
            </div>
            <div className="relative space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={formValues.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  formErrors.email ? "border-red-500" : ""
                }`}
                disabled={state.loading}
              />
              {formErrors.email && (
                <p className="text-red-500 text-xs absolute">
                  {formErrors.email}
                </p>
              )}
            </div>
            <div className="relative space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={formValues.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  formErrors.password ? "border-red-500" : ""
                }`}
                disabled={state.loading}
              />
              {formErrors.password && (
                <p className="text-red-500 text-xs absolute">
                  {formErrors.password}
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors flex items-center gap-1"
                disabled={state.loading}
              >
                {state.loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  ""
                )}
                Sign up
              </button>
            </div>
          </form>
          <p className="flex flex-row justify-center gap-1 mt-4 text-sm text-center pt-2 text-muted-foreground font-medium">
            Already have an account?{" "}
            <a
              onClick={() => navigate("/login")}
              className="text-foreground hover:text-muted-foreground transition-colors underline font-semibold cursor-pointer"
            >
              Log in
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

```

### File: `client/src/page/SignUpSuccessPage.jsx`

```javascript
import { NavBar, Footer } from "@/components/WebSection";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignUpSuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow flex items-center justify-center p-4 my-4">
        <div className="flex flex-col space-y-8 items-center w-full max-w-xl bg-[#EFEEEB] rounded-sm shadow-md px-3 sm:px-20 py-14">
          <div className="relative">
            <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-12 w-12 text-white" strokeWidth={3} />
            </div>
          </div>
          <h1 className="mt-6 text-2xl font-bold">Registration Successful</h1>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
          >
            Continue
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

```

### File: `client/src/page/ViewPostPage.jsx`

```javascript
import { NavBar, Footer } from "@/components/WebSection";
import ViewPost from "@/components/ViewPost";

export default function ViewPostPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <ViewPost />
      </div>
      <Footer />
    </div>
  );
}

```

### File: `client/src/page/admin/AdminArticlePage.jsx`

```javascript
/* eslint-disable react/prop-types */
import { PenSquare, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminSidebar } from "@/components/AdminWebSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

export default function AdminArticleManagementPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  useEffect(() => {
    setIsLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/admin`
        );
        setPosts(response.data.posts);
        setFilteredPosts(response.data.posts);
        const responseCategories = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        // Ensure data is an array before setting state
        const categoriesData = Array.isArray(responseCategories.data) 
          ? responseCategories.data 
          : [];
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (searchKeyword) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          post.description
            .toLowerCase()
            .includes(searchKeyword.toLowerCase()) ||
          post.content.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter((post) =>
        post.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter((post) =>
        post.status.toLowerCase().includes(selectedStatus.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
  }, [searchKeyword, selectedCategory, selectedStatus, posts]);

  const handleDelete = async (postId) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Deleted article successfully
            </h2>
            <p className="text-sm">The article has been removed.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      setPosts(posts.filter((post) => post.id !== postId));
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to delete article</h2>
            <p className="text-sm">
              Something went wrong. Please try again later.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Article management</h2>
          <Button
            className="px-8 py-2 rounded-full"
            onClick={() => navigate("/admin/article-management/create")}
          >
            <PenSquare className="mr-2 h-4 w-4" /> Create article
          </Button>
        </div>
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Search..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-full py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
            />
          </div>
          <Select
            value={selectedStatus}
            onValueChange={(value) => setSelectedStatus(value)}
          >
            <SelectTrigger className="w-[180px] py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger className="w-[180px] py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.name}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Article title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(9)
                .fill()
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-6 w-[250px] bg-[#EFEEEB]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[150px] bg-[#EFEEEB]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[100px] bg-[#EFEEEB]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[50px] bg-[#EFEEEB]" />
                    </TableCell>
                  </TableRow>
                ))
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.category}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex capitalize items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        article.status === "draft"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {article.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        navigate(`/admin/article-management/edit/${article.id}`)
                      }
                    >
                      <PenSquare className="h-4 w-4 hover:text-muted-foreground" />
                    </Button>
                    <DeletePostDialog
                      onDelete={() => handleDelete(article.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center font-medium pt-8">
                  No posts found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}

function DeletePostDialog({ onDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4 hover:text-muted-foreground" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-md flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Delete Post
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-row mb-2 justify-center font-medium text-center text-muted-foreground">
          Do you want to delete this post?
        </AlertDialogDescription>
        <div className="flex flex-row gap-4">
          <AlertDialogCancel className="bg-background px-10 py-6 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={onDelete}
            className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-6 text-lg px-10"
          >
            Delete
          </Button>
        </div>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

```

### File: `client/src/page/admin/AdminCategoryPage.jsx`

```javascript
/* eslint-disable react/prop-types */
import { PenSquare, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminSidebar } from "@/components/AdminWebSection";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminCategoryManagementPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Fetch post data by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const responseCategories = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        // Ensure data is an array before setting state
        const categoriesData = Array.isArray(responseCategories.data) 
          ? responseCategories.data 
          : [];
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories data:", error);
        navigate("*");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [navigate]);

  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [categories, searchKeyword]);

  const handleDelete = async (categoryId) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/categories/${categoryId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Deleted Category successfully
            </h2>
            <p className="text-sm">The category has been removed.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      setCategories(
        categories.filter((category) => category.id !== categoryId)
      );
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Failed to delete category
            </h2>
            <p className="text-sm">
              Something went wrong. Please try again later.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Category management</h2>
          <Button
            className="px-8 py-2 rounded-full"
            onClick={() => navigate("/admin/category-management/create")}
          >
            <PenSquare className="mr-2 h-4 w-4" /> Create category
          </Button>
        </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full max-w-md py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Category</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(9)
                .fill()
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-6 w-[200px] bg-[#EFEEEB]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[75px] bg-[#EFEEEB]" />
                    </TableCell>
                  </TableRow>
                ))
            ) : filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-right flex">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigate(
                          `/admin/category-management/edit/${category.id}`
                        );
                      }}
                    >
                      <PenSquare className="h-4 w-4 hover:text-muted-foreground" />
                    </Button>
                    <DeleteCategoryDialog
                      onDelete={() => handleDelete(category.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2} className="text-center font-medium pt-8">
                  No categories found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </main>
    </div>
  );
}

function DeleteCategoryDialog({ onDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4 hover:text-muted-foreground" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-md flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Delete Category
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-row mb-2 justify-center font-medium text-center text-muted-foreground">
          Do you want to delete this Category?
        </AlertDialogDescription>
        <div className="flex flex-row gap-4">
          <AlertDialogCancel className="bg-background px-10 py-6 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={onDelete}
            className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-6 text-lg px-10"
          >
            Delete
          </Button>
        </div>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

```

### File: `client/src/page/admin/AdminCreateArticle.jsx`

```javascript
import { ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminSidebar } from "@/components/AdminWebSection";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/authentication";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function AdminCreateArticlePage() {
  const { state } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState({
    image: "",
    category_id: null,
    title: "",
    description: "",
    date: null,
    content: "",
    status_id: null,
  }); // Store the fetched post data
  const [isLoading, setIsLoading] = useState(null);
  const [isSaving, setIsSaving] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const responseCategories = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        // Ensure data is an array before setting state
        const categoriesData = Array.isArray(responseCategories.data) 
          ? responseCategories.data 
          : [];
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories data:", error);
        navigate("*");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [navigate]); // Re-fetch if postId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    const selectedCategory = categories.find((cat) => cat.name === value);
    setPost((prevData) => ({
      ...prevData,
      category: value, // The category name
      category_id: selectedCategory?.id || null, // Update the category_id
    }));
  };

  const handleSave = async (postStatusId) => {
    setIsSaving(true);
    const formData = new FormData();

    formData.append("title", post.title);
    formData.append("category_id", post.category_id);
    formData.append("description", post.description);
    formData.append("content", post.content);
    formData.append("status_id", postStatusId);
    formData.append("imageFile", imageFile.file);

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/posts`,
        formData,
        {
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Created article successfully
            </h2>
            <p className="text-sm">
              {postStatusId === 1
                ? "Your article has been successfully saved as draft."
                : postStatusId === 2
                ? "Your article has been successfully published."
                : ""}
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      navigate("/admin/article-management"); // Redirect after saving
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to create article</h2>
            <p className="text-sm">
              Something went wrong while trying to update article. Please try
              again later.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    // Check if the file is an image
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!file) {
      // No file selected
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to upload file</h2>
            <p className="text-sm">
              Please upload a valid image file (JPEG, PNG, GIF, WebP).
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      return; // Stop further processing if it's not a valid image
    }

    // Optionally check file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to upload file</h2>
            <p className="text-sm">
              The file is too large. Please upload an image smaller than 5MB.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      return;
    }

    setImageFile({ file }); // Store the file object
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <main className="flex-1 p-8 bg-gray-50 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Create article</h2>
            <div className="space-x-2">
              <Button
                className="px-8 py-2 rounded-full"
                variant="outline"
                disabled={isSaving}
                onClick={() => handleSave(1)}
              >
                Save as draft
              </Button>
              <Button
                className="px-8 py-2 rounded-full"
                disabled={isSaving}
                onClick={() => handleSave(2)}
              >
                Save and publish
              </Button>
            </div>
          </div>

          <form className="space-y-7 max-w-4xl">
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-gray-700 font-medium mb-2"
              >
                Thumbnail image
              </label>
              <div className="flex items-end space-x-4">
                {imageFile.file ? (
                  <img
                    src={URL.createObjectURL(imageFile.file)}
                    alt="Uploaded"
                    className="rounded-md object-cover max-w-lg h-80"
                  />
                ) : (
                  <div className="flex justify-center items-center w-full max-w-lg h-80 px-6 py-20 border-2 border-gray-300 border-dashed rounded-md bg-gray-50">
                    <div className="text-center space-y-2">
                      <ImageIcon className="mx-auto h-8 w-8 text-gray-400" />
                    </div>
                  </div>
                )}
                <label
                  htmlFor="file-upload"
                  className="px-8 py-2 bg-background rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer"
                >
                  <span>Upload thumbnail image</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="category">Category</label>
              <Select
                value={post.category}
                onValueChange={(value) => {
                  handleCategoryChange(value);
                }}
              >
                <SelectTrigger className="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="author">Author name</label>
              <Input
                id="author"
                name="author"
                value={state.user.name}
                className="mt-1 max-w-lg"
                disabled
              />
            </div>

            <div>
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                name="title"
                placeholder="Article title"
                value={post.title} // Prefill with the fetched title
                onChange={handleInputChange}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>

            <div>
              <label htmlFor="introduction">
                Introduction (max 120 letters)
              </label>
              <Textarea
                id="introduction"
                name="description"
                placeholder="Introduction"
                rows={3}
                value={post.description} // Prefill with the fetched description
                onChange={handleInputChange}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
                maxLength={120}
              />
            </div>

            <div>
              <label htmlFor="content">Content</label>
              <Textarea
                id="content"
                name="content"
                placeholder="Content"
                rows={20}
                value={post.content} // Prefill with the fetched content
                onChange={handleInputChange}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
          </form>
        </main>
      )}
    </div>
  );
}

function SkeletonLoading() {
  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Create article</h2>
        <div className="space-x-2">
          <Button className="px-8 py-2 rounded-full" variant="outline" disabled>
            Save as draft
          </Button>
          <Button className="px-8 py-2 rounded-full" disabled>
            Save and publish
          </Button>
        </div>
      </div>

      <div className="space-y-7 max-w-4xl">
        <div>
          <Skeleton className="h-4 w-32 mb-2 bg-[#EFEEEB]" />
          <div className="flex items-end space-x-4">
            <Skeleton className="h-64 w-full max-w-lg bg-[#EFEEEB]" />
            <Skeleton className="h-10 w-48 bg-[#EFEEEB]" />
          </div>
        </div>

        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-10 w-full max-w-lg bg-[#EFEEEB]" />
        </div>

        <div>
          <Skeleton className="h-4 w-32 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-10 w-full max-w-lg bg-[#EFEEEB]" />
        </div>

        <div>
          <Skeleton className="h-4 w-16 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-10 w-full bg-[#EFEEEB]" />
        </div>

        <div>
          <Skeleton className="h-4 w-64 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-24 w-full bg-[#EFEEEB]" />
        </div>

        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-80 w-full bg-[#EFEEEB]" />
        </div>
      </div>

      <Skeleton className="h-6 w-32 mt-4 bg-[#EFEEEB]" />
    </main>
  );
}

```

### File: `client/src/page/admin/AdminCreateCategoryPage.jsx`

```javascript
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminSidebar } from "@/components/AdminWebSection";
import axios from "axios";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminCreateCategoryPage() {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSave = async () => {
    if (!categoryName) {

      setErrorMessage("Category name is required.");
      return;
    }

    setIsSaving(true);

    try {

      await axios.post(`${import.meta.env.VITE_API_URL}/categories`, {
        name: categoryName,
      });


      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Created category successfully
            </h2>
            <p className="text-sm">
              Your category has been successfully created.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));


      setCategoryName("");
      navigate("/admin/category-management");
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Failed to create category
            </h2>
            <p className="text-sm">
              Something went wrong while creating the category. Please try again
              later.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Create Category</h2>
          <Button
            className="px-8 py-2 rounded-full"
            onClick={handleSave}
            disabled={isSaving} // Disable button while saving
          >
            Save
          </Button>
        </div>
        <div className="space-y-7 max-w-md">
          <div className="relative space-y-1">
            <label
              htmlFor="category-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category Name
            </label>
            <Input
              id="category-name"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)} // Bind input value to state
              placeholder="Category name"
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                errorMessage ? "border-red-500" : ""
              }`}
            />
            {errorMessage && (
              <p className="text-red-500 text-xs absolute">{errorMessage}</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

```

### File: `client/src/page/admin/AdminEditArticlePage.jsx`

```javascript
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Use `useParams` for getting the postId from the URL
import { Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AdminSidebar } from "@/components/AdminWebSection";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios"; // Make sure axios is installed
import { useAuth } from "@/contexts/authentication";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

//this component is not finished yet
export default function AdminEditArticlePage() {
  const { state } = useAuth();
  const navigate = useNavigate();
  const { postId } = useParams(); // Get postId from the URL
  const [post, setPost] = useState({
    id: null,
    image: "",
    category_id: null,
    title: "",
    description: "",
    date: null,
    content: "",
    status_id: null,
    likes_count: null,
    category: "",
    status: "",
  }); // Store the fetched post data
  const [isLoading, setIsLoading] = useState(null);
  const [isSaving, setIsSaving] = useState(null);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState({});

  // Fetch post data by ID
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const responseCategories = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories`
        );
        // Ensure data is an array before setting state
        const categoriesData = Array.isArray(responseCategories.data) 
          ? responseCategories.data 
          : [];
        setCategories(categoriesData);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/admin/${postId}`
        );
        setPost(response.data);
      } catch {
        toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">
                Failed to fetch post data.
              </h2>
              <p className="text-sm">Please try again later.</p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));
        navigate("/admin/article-management");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [postId, navigate]); // Re-fetch if postId changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    const selectedCategory = categories.find((cat) => cat.name === value);
    setPost((prevData) => ({
      ...prevData,
      category: value, // The category name
      category_id: selectedCategory?.id || null, // Update the category_id
    }));
  };

  const handleSave = async (postStatusId) => {
    setIsSaving(true);

    try {
      if (imageFile?.file) {
        // If the image has been changed, use FormData
        const formData = new FormData();
        formData.append("title", post.title);
        formData.append("category_id", post.category_id);
        formData.append("description", post.description);
        formData.append("content", post.content);
        formData.append("status_id", postStatusId);
        formData.append("imageFile", imageFile.file);

        const token = localStorage.getItem("token");
        await axios.put(
          `${import.meta.env.VITE_API_URL}/posts/${postId}`,
          formData,
          {
            headers: { 
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${token}`
            },
          }
        );
      } else {
        // If the image is not changed, use the old method
        const token = localStorage.getItem("token");
        await axios.put(
          `${import.meta.env.VITE_API_URL}/posts/${postId}`,
          {
            title: post.title,
            image: post.image, // Existing image URL
            category_id: post.category_id,
            description: post.description,
            content: post.content,
            status_id: postStatusId,
          },
          {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
        );
      }

      // Success toast
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Updated article successfully
            </h2>
            <p className="text-sm">
              {postStatusId === 1
                ? "Your article has been successfully saved as draft."
                : postStatusId === 2
                ? "Your article has been successfully published."
                : ""}
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      navigate("/admin/article-management"); // Redirect after saving
    } catch {
      // Error toast
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to update article</h2>
            <p className="text-sm">
              Something went wrong while trying to update the article. Please
              try again later.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      navigate("/admin/article-management");
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/posts/${postId}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        }
      );
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Deleted article successfully
            </h2>
            <p className="text-sm">The post has been removed.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to delete article</h2>
            <p className="text-sm">
              Something went wrong. Please try again later.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    // Check if the file is an image
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];

    if (!file) {
      // No file selected
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to upload file</h2>
            <p className="text-sm">
              Please upload a valid image file (JPEG, PNG, GIF, WebP).
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      return; // Stop further processing if it's not a valid image
    }

    // Optionally check file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to upload file</h2>
            <p className="text-sm">
              The file is too large. Please upload an image smaller than 5MB.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      return;
    }

    setImageFile({ file }); // Store the file object
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <main className="flex-1 p-8 bg-gray-50 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Edit article</h2>
            <div className="space-x-2">
              <Button
                className="px-8 py-2 rounded-full"
                onClick={() => handleSave(1)}
                variant="outline"
                disabled={isSaving}
              >
                Save as draft
              </Button>
              <Button
                className="px-8 py-2 rounded-full"
                onClick={() => handleSave(2)} // Handle save logic
                disabled={isSaving}
              >
                Save
              </Button>
            </div>
          </div>
          <form className="space-y-7 max-w-4xl">
            <div>
              <label
                htmlFor="thumbnail"
                className="block text-gray-700 font-medium mb-2"
              >
                Thumbnail image
              </label>
              <div className="flex items-end space-x-4">
                {imageFile.file ? (
                  <img
                    src={URL.createObjectURL(imageFile.file)}
                    alt="Uploaded"
                    className="rounded-md object-cover max-w-lg h-80"
                  />
                ) : (
                  <img
                    src={post.image}
                    alt="Uploaded"
                    className="rounded-md object-cover max-w-lg h-80"
                  />
                )}
                <label
                  htmlFor="file-upload"
                  className="px-8 py-2 bg-background rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer"
                >
                  <span>Upload thumbnail image</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <Select
                value={post.category}
                onValueChange={(value) => {
                  handleCategoryChange(value);
                }}
              >
                <SelectTrigger className="max-w-lg mt-1 py-3 rounded-sm text-muted-foreground focus:ring-0 focus:ring-offset-0 focus:border-muted-foreground">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.name}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="author">Author name</label>
              <Input
                id="author"
                name="author"
                value={state.user.name}
                className="mt-1 max-w-lg"
                disabled
              />
            </div>

            <div>
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                name="title"
                placeholder="Article title"
                value={post.title} // Prefill with the fetched title
                onChange={handleInputChange}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>

            <div>
              <label htmlFor="introduction">
                Introduction (max 120 letters)
              </label>
              <Textarea
                id="introduction"
                name="description"
                placeholder="Introduction"
                rows={3}
                value={post.description} // Prefill with the fetched description
                onChange={handleInputChange}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
                maxLength={120}
              />
            </div>

            <div>
              <label htmlFor="content">Content</label>
              <Textarea
                id="content"
                name="content"
                placeholder="Content"
                rows={20}
                value={post.content} // Prefill with the fetched content
                onChange={handleInputChange}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
          </form>
          <DeletePostDialog onDelete={() => handleDelete(postId)} />
        </main>
      )}
    </div>
  );
}

function SkeletonLoading() {
  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Edit article</h2>
        <div className="space-x-2">
          <Button className="px-8 py-2 rounded-full" variant="outline" disabled>
            Save as draft
          </Button>
          <Button className="px-8 py-2 rounded-full" disabled>
            Save
          </Button>
        </div>
      </div>

      <div className="space-y-7 max-w-4xl">
        <div>
          <Skeleton className="h-4 w-32 mb-2 bg-[#EFEEEB]" />
          <div className="flex items-end space-x-4">
            <Skeleton className="h-64 w-full max-w-lg bg-[#EFEEEB]" />
            <Skeleton className="h-10 w-48 bg-[#EFEEEB]" />
          </div>
        </div>

        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-10 w-full max-w-lg bg-[#EFEEEB]" />
        </div>

        <div>
          <Skeleton className="h-4 w-32 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-10 w-full max-w-lg bg-[#EFEEEB]" />
        </div>

        <div>
          <Skeleton className="h-4 w-16 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-10 w-full bg-[#EFEEEB]" />
        </div>

        <div>
          <Skeleton className="h-4 w-64 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-24 w-full bg-[#EFEEEB]" />
        </div>

        <div>
          <Skeleton className="h-4 w-24 mb-2 bg-[#EFEEEB]" />
          <Skeleton className="h-80 w-full bg-[#EFEEEB]" />
        </div>
      </div>

      <Skeleton className="h-6 w-32 mt-4 bg-[#EFEEEB]" />
    </main>
  );
}

function DeletePostDialog({ onDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="underline underline-offset-2 hover:text-muted-foreground text-sm font-medium flex items-center gap-1 mt-4">
          <Trash2 className="h-5 w-5" />
          Delete article
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-md flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Delete Post
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-row mb-2 justify-center font-medium text-center text-muted-foreground">
          Do you want to delete this post?
        </AlertDialogDescription>
        <div className="flex flex-row gap-4">
          <AlertDialogCancel className="bg-background px-10 py-6 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={onDelete}
            className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-6 text-lg px-10"
          >
            Delete
          </Button>
        </div>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

```

### File: `client/src/page/admin/AdminEditCategoryPage.jsx`

```javascript
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { AdminSidebar } from "@/components/AdminWebSection";
import axios from "axios";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminEditCategoryPage() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/categories/${categoryId}`
        );
        setCategoryName(response.data.name);
      } catch {
        toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">
                Failed to fetch category data.
              </h2>
              <p className="text-sm">Please try again later.</p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));
        navigate("/admin/category-management");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId, navigate]);

  const handleSave = async () => {
    if (!categoryName) {
      setErrorMessage("Category name is required.");
      return;
    }

    setIsSaving(true);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/categories/${categoryId}`,
        {
          name: categoryName,
        }
      );

      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Category updated successfully
            </h2>
            <p className="text-sm">
              Your category has been successfully updated.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));

      navigate("/admin/category-management");
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Failed to update category
            </h2>
            <p className="text-sm">
              Something went wrong while updating the category. Please try again
              later.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      navigate("/admin/category-management");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/categories/${categoryId}`
      );

      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Deleted category successfully
            </h2>
            <p className="text-sm">The category has been removed</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Failed to delete category
            </h2>
            <p className="text-sm">
              Something went wrong while deleting the category. Please try again
              later.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main content */}
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <main className="flex-1 p-8 bg-gray-50 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Edit Category</h2>
            <Button
              className="px-8 py-2 rounded-full"
              onClick={handleSave}
              disabled={isSaving}
            >
              Save
            </Button>
          </div>
          <div className="space-y-7 max-w-md">
            <div className="relative space-y-1">
              <label
                htmlFor="category-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category Name
              </label>
              <Input
                id="category-name"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category name"
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  errorMessage ? "border-red-500" : ""
                }`}
              />
              {errorMessage && (
                <p className="text-red-500 text-xs absolute">{errorMessage}</p>
              )}
            </div>
          </div>
          <DeleteCategoryDialog
            onDelete={() => handleDelete(categoryId)}
            onLoading={isLoading}
          />
        </main>
      )}
    </div>
  );
}

function SkeletonLoading() {
  return (
    <main className="flex-1 p-8 bg-gray-50 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Edit Category</h2>
        <Button className="px-8 py-2 rounded-full" disabled>
          Save
        </Button>
      </div>
      <div className="space-y-7 max-w-md">
        <div className="relative space-y-1">
          <Skeleton className="h-5 w-32 mb-1 bg-[#EFEEEB]" />
          <Skeleton className="h-10 w-full rounded-sm bg-[#EFEEEB]" />
        </div>
      </div>
      <Skeleton className="h-6 w-36 mt-6 bg-[#EFEEEB]" />
    </main>
  );
}

function DeleteCategoryDialog({ onDelete }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="underline underline-offset-2 hover:text-muted-foreground text-sm font-medium flex items-center gap-1 mt-6">
          <Trash2 className="h-5 w-5" />
          Delete Category
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-md flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Delete Category
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-row mb-2 justify-center font-medium text-center text-muted-foreground">
          Do you want to delete this Category?
        </AlertDialogDescription>
        <div className="flex flex-row gap-4">
          <AlertDialogCancel className="bg-background px-10 py-6 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors">
            Cancel
          </AlertDialogCancel>
          <Button
            onClick={onDelete}
            className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-6 text-lg px-10"
          >
            Delete
          </Button>
        </div>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

```

### File: `client/src/page/admin/AdminLoginPage.jsx`

```javascript
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!email.trim()) {
      setIsErrorEmail(true);
      valid = false;
    } else {
      setIsErrorEmail(false);
    }

    if (!password.trim()) {
      setIsErrorPassword(true);
      valid = false;
    } else {
      setIsErrorPassword(false);
    }

    if (valid) {

      console.log("Logging in with:", { email, password });



      navigate("/");
    }
  };
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex justify-center items-center p-4 my-4 flex-grow">
        <div className="w-full max-w-2xl bg-[#EFEEEB] rounded-sm shadow-md px-3 sm:px-20 py-14">
          <p className="text-md text-orange-300 text-center mb-4">
            Admin panel
          </p>
          <h2 className="text-4xl font-semibold text-center mb-6 text-foreground">
            Log in
          </h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="relative space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  isErrorEmail ? "border-red-500" : ""
                }`}
              />
              {isErrorEmail && (
                <p className="text-red-500 text-xs absolute">
                  Please enter a valid email.
                </p>
              )}
            </div>
            <div className="relative space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  isErrorPassword ? "border-red-500" : ""
                }`}
              />
              {isErrorPassword && (
                <p className="text-red-500 text-xs absolute">
                  Please enter your password.
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

```

### File: `client/src/page/admin/AdminNotificationPage.jsx`

```javascript
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminSidebar } from "@/components/AdminWebSection";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminNotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/notifications`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleView = (postId) => {
    navigate(`/post/${postId}`);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffInMs = now - notifTime;
    const diffInMinutes = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <h2 className="text-2xl font-semibold mb-6">Notification</h2>

        <div className="space-y-4">
          {isLoading ? (
            Array(5)
              .fill()
              .map((_, index) => (
                <div key={index}>
                  <div className="p-4 rounded-lg flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <Skeleton className="w-10 h-10 rounded-full bg-[#EFEEEB]" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-3/4 bg-[#EFEEEB]" />
                        <Skeleton className="h-3 w-1/2 bg-[#EFEEEB]" />
                      </div>
                    </div>
                  </div>
                  <hr className="border-t border-gray-200 my-4" />
                </div>
              ))
          ) : notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id}>
                <div className="p-4 rounded-lg flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage
                        src={notification.user_avatar}
                        alt={notification.user_name}
                      />
                      <AvatarFallback>
                        {notification.user_name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-sm font-bold inline">
                        {notification.user_name}
                      </h3>
                      <p className="text-sm font-normal inline">
                        {notification.type === "comment"
                          ? " commented on "
                          : " liked "}
                        your article: {notification.article_title}
                      </p>
                      {notification.type === "comment" && notification.content && (
                        <p className="mt-1 text-sm text-gray-500">
                          {notification.content}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-orange-400">
                        {formatTimeAgo(notification.created_at)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleView(notification.post_id)}
                    className="underline underline-offset-2 hover:text-muted-foreground text-sm font-medium"
                  >
                    View
                  </button>
                </div>
                <hr className="border-t border-gray-200 my-4" />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No notifications yet
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

```

### File: `client/src/page/admin/AdminProfilePage.jsx`

```javascript
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminSidebar } from "@/components/AdminWebSection";
import { useAuth } from "@/contexts/authentication";
import { toast } from "sonner";
import axios from "axios";

export default function AdminProfilePage() {
  const { state, fetchUser } = useAuth();
  const [profile, setProfile] = useState({
    image: "",
    name: "",
    username: "",
    email: "",
    bio: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {

        setProfile({
          image: state.user.profilePic || "",
          name: state.user.name || "",
          username: state.user.username || "",
          email: state.user.email || "",
          bio: state.user.bio || "",
        });
      } catch {
        toast.custom((t) => (
          <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">
                Failed to fetch profile
              </h2>
              <p className="text-sm">Please try again later.</p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));
      }
    };

    fetchProfile();
  }, [state.user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;


    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Invalid file type</h2>
            <p className="text-sm">
              Please upload a valid image file (JPEG, PNG, GIF, WebP).
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      return;
    }


    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">File too large</h2>
            <p className="text-sm">Please upload an image smaller than 5MB.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
      return;
    }

    setImageFile(file);
    setProfile((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("username", profile.username);
      formData.append("bio", profile.bio);

      if (imageFile) {
        formData.append("imageFile", imageFile);
      }

      await axios.put(
        `${import.meta.env.VITE_API_URL}/profile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">
              Profile updated successfully
            </h2>
            <p className="text-sm">Your profile changes have been saved.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } catch {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Failed to update profile</h2>
            <p className="text-sm">Please try again later.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsSaving(false);
      fetchUser();
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Profile</h2>
          <Button
            className="px-8 py-2 rounded-full"
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>

        <div>
          <div className="flex items-center mb-6">
            <Avatar className="w-24 h-24 mr-4">
              <AvatarImage
                src={profile.image}
                alt="Profile picture"
                className="object-cover"
              />
              <AvatarFallback>{profile.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <label
              htmlFor="profile-upload"
              className="px-8 py-2 bg-background rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors cursor-pointer"
            >
              <span>Upload profile picture</span>
              <input
                id="profile-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>
          </div>

          <form
            className="space-y-7 max-w-2xl"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label htmlFor="name">Name</label>
              <Input
                id="name"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <Input
                id="username"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                disabled
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
              />
            </div>
            <div>
              <label htmlFor="bio">Bio</label>
              <Textarea
                id="bio"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself..."
                className="mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground min-h-[120px]"
                maxLength={500}
              />
              <p className="text-sm text-muted-foreground mt-1">
                {profile.bio?.length || 0}/500 characters
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

```

### File: `client/src/page/admin/AdminResetPasswordPage.jsx`

```javascript
/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminSidebar } from "@/components/AdminWebSection";
import { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useAuth } from "@/contexts/authentication";

export default function AdminResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [valid, setValid] = useState({
    password: true,
    newPassword: true,
    confirmNewPassword: true,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { logout } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidPassword = password.trim() !== "";
    const isValidNewPassword = newPassword.trim() !== "" && newPassword.length >= 8;
    const isValidConfirmPassword =
      confirmNewPassword.trim() !== "" && confirmNewPassword === newPassword;

    setValid({
      password: isValidPassword,
      newPassword: isValidNewPassword,
      confirmNewPassword: isValidConfirmPassword,
    });

    if (isValidPassword && isValidNewPassword && isValidConfirmPassword) {
      setIsDialogOpen(true);
    }
  };

  const handleResetPassword = async () => {
    try {
      setIsDialogOpen(false);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          oldPassword: password,
          newPassword: newPassword,
        }
      );

      if (response.status === 200) {
        toast.custom((t) => (
          <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">Password Changed!</h2>
              <p className="text-sm">
                Your password has been changed successfully. You will be logged out in 3 seconds. Please log in again with your new password.
              </p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));

        // Logout after 3 seconds for security
        setTimeout(() => {
          logout();
        }, 3000);
      }
    } catch (error) {
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Error</h2>
            <p className="text-sm">
              {error.response?.data?.error ||
                "Something went wrong. Please try again."}
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-gray-50 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Reset Password</h2>
          <Button className="px-8 py-2 rounded-full" onClick={handleSubmit}>
            Reset Password
          </Button>
        </div>

        <div className="space-y-7 max-w-md">
          <div className="relative">
            <label
              htmlFor="current-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current password
            </label>
            <Input
              id="current-password"
              type="password"
              placeholder="Current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${!valid.password ? "border-red-500" : ""
                }`}
            />
            {!valid.password && (
              <p className="text-red-500 text-xs absolute mt-1">
                This field is required
              </p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New password
            </label>
            <Input
              id="new-password"
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${!valid.newPassword ? "border-red-500" : ""
                }`}
            />
            {!valid.newPassword && (
              <p className="text-red-500 text-xs absolute mt-1">
                Password must be at least 8 characters
              </p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="confirm-new-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm new password
            </label>
            <Input
              id="confirm-new-password"
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${!valid.confirmNewPassword ? "border-red-500" : ""
                }`}
            />
            {!valid.confirmNewPassword && (
              <p className="text-red-500 text-xs absolute mt-1">
                Passwords do not match
              </p>
            )}
          </div>
        </div>
      </main>
      <ResetPasswordModal
        dialogState={isDialogOpen}
        setDialogState={setIsDialogOpen}
        resetFunction={handleResetPassword}
      />
    </div>
  );
}

function ResetPasswordModal({ dialogState, setDialogState, resetFunction }) {
  return (
    <AlertDialog open={dialogState} onOpenChange={setDialogState}>
      <AlertDialogContent className="bg-white rounded-md pt-16 pb-6 max-w-[22rem] sm:max-w-md flex flex-col items-center">
        <AlertDialogTitle className="text-3xl font-semibold pb-2 text-center">
          Reset password
        </AlertDialogTitle>
        <AlertDialogDescription className="flex flex-col mb-2 justify-center font-medium text-center text-muted-foreground px-4">
          <p>Do you want to reset your password?</p>
          <p className="text-sm mt-2 text-orange-500">
            Note: You will be logged out after changing your password for security reasons.
          </p>
        </AlertDialogDescription>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => setDialogState(false)}
            className="bg-background px-10 py-4 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={resetFunction}
            className="rounded-full text-white bg-foreground hover:bg-muted-foreground transition-colors py-4 text-lg px-10 "
          >
            Reset
          </button>
        </div>
        <AlertDialogCancel className="absolute right-4 top-2 sm:top-4 p-1 border-none">
          <X className="h-6 w-6" />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

```

### File: `client/src/utils/jwtIntercepter.js`

```javascript
import axios from "axios";

function jwtInterceptor() {
  axios.interceptors.request.use((req) => {
    const hasToken = Boolean(window.localStorage.getItem("token"));

    if (hasToken) {
      req.headers = {
        ...req.headers,
        Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      };
    }

    return req;
  });

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.error.includes("Unauthorized")
      ) {
        window.localStorage.removeItem("token");
        window.location.replace("/");
      }
      return Promise.reject(error);
    }
  );
}

export default jwtInterceptor;

```

### File: `client/tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ["Poppins", "sans-serif"]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
  },
  plugins: [import("tailwindcss-animate")],
};

```

### File: `client/vercel.json`

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}

```

### File: `client/vite.config.js`

```javascript
import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

```

### File: `server/.env`

```text
SUPABASE_URL=https://jbzdwpcbfcasmzkkwgpx.supabase.co
SUPABASE_ANON_KEY=sb_publishable_o_HqedreyR4q30HSIMkFSg_SW30uqYd
SUPABASE_SERVICE_ROLE_KEY=sb_publishable_o_HqedreyR4q30HSIMkFSg_SW30uqYd
VITE_API_URL=http://localhost:4001
```

### File: `server/.gitignore`

```text
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local
vercel.json
.env


# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

### File: `server/app.mjs`

```javascript
import "dotenv/config";
import express from "express";
import cors from "cors";
import postRouter from "./src/apps/postRouter.mjs";
import categoryRouter from "./src/apps/categoryRouter.mjs";
import authRouter from "./src/apps/auth.mjs";
import profileRouter from "./src/apps/profileRouter.mjs";
import notificationRouter from "./src/apps/notificationRouter.mjs";
import messageRouter from "./src/apps/messageRouter.mjs";

const app = express();
const port = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to My Personal Blog API Server! 👋");
});

app.use("/posts", postRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/notifications", notificationRouter);
app.use("/messages", messageRouter);

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server is running at ${port}`);
  });
}

// Export for Vercel
export default app;

```

### File: `server/package.json`

```json
{
  "name": "wannasingh-blog-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon app.mjs",
    "devStart": "nodemon app.mjs",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "engines": {
    "node": "22.x"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.106.2",
    "bcrypt": "^6.0.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.1",
    "multer": "^1.4.5-lts.1",
    "nodemon": "^3.1.7",
    "swagger-jsdoc": "^6.2.8",
    "swagger-ui-express": "^5.0.1"
  },
  "devDependencies": {
    "@types/cors": "^2.8.17",
    "@types/express": "^5.0.0",
    "@types/pg": "^8.11.10"
  }
}

```

### File: `server/skills-lock.json`

```json
{
  "version": 1,
  "skills": {
    "supabase": {
      "source": "supabase/agent-skills",
      "sourceType": "github",
      "skillPath": "skills/supabase/SKILL.md",
      "computedHash": "51ae9f6923569a1766a6c918db355ea46625a8b6881f25053d17b2358fa9345a"
    }
  }
}

```

### File: `server/src/apps/auth.mjs`

```javascript
import { Router } from "express";
import supabase from "../utils/db.mjs";
import bcrypt from "bcrypt";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  const { email, password, username, name } = req.body;

  try {

    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);

    if (checkError) {
      console.error("Error checking username:", checkError);
      return res.status(500).json({ error: "Database error checking username" });
    }

    if (existingUser.length > 0) {
      return res.status(400).json({ error: "This username is already taken" });
    }

    const { data, error: supabaseError } = await supabase.auth.signUp({
      email,
      password,
    });


    if (supabaseError) {
      if (supabaseError.code === "user_already_exists") {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }

      return res
        .status(400)
        .json({ error: "Failed to create user. Please try again." });
    }
    const supabaseUserId = data.user.id;


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          id: supabaseUserId,
          username,
          name,
          password: hashedPassword,
          role: "user",
        },
      ])
      .select();

    if (insertError) {
      console.error("Error creating user profile:", insertError);
      return res
        .status(500)
        .json({ error: "Failed to create user profile in database" });
    }

    res.status(201).json({
      message: "User created successfully",
      user: newUser[0],
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase Login Error:", error);
      
      // Handle email not confirmed
      if (error.code === "email_not_confirmed") {
        return res.status(400).json({
          error: "Please confirm your email address before logging in. Check your inbox for a confirmation link.",
        });
      }
      
      // Handle invalid credentials
      if (
        error.code === "invalid_credentials" ||
        error.message.includes("Invalid login credentials")
      ) {
        return res.status(400).json({
          error: "Your password is incorrect or this email doesn’t exist",
        });
      }
      return res.status(400).json({ error: error.message });
    }
    console.log(data);
    return res.status(200).json({
      message: "Signed in successfully",
      access_token: data.session.access_token,
    });
  } catch {
    return res.status(500).json({ error: "An error occurred during login" });
  }
});

authRouter.get("/get-user", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {

    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
      return res.status(401).json({ error: "Unauthorized or token expired" });
    }

    const supabaseUserId = data.user.id;
    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", supabaseUserId)
      .single();

    if (profileError) {
      return res.status(500).json({ error: "Failed to fetch user profile" });
    }

    res.status(200).json({
      id: data.user.id,
      email: data.user.email,
      username: userProfile.username,
      name: userProfile.name,
      role: userProfile.role,
      profilePic: userProfile.profile_pic,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

authRouter.put("/reset-password", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { oldPassword, newPassword } = req.body;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  if (!newPassword) {
    return res.status(400).json({ error: "New password is required" });
  }

  try {

    const { data: userData, error: userError } = await supabase.auth.getUser(
      token
    );

    if (userError) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    const { data: loginData, error: loginError } =
      await supabase.auth.signInWithPassword({
        email: userData.user.email,
        password: oldPassword,
      });

    if (loginError) {
      return res.status(400).json({ error: "Invalid old password" });
    }


    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: "Password updated successfully",
      user: data.user,
    });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default authRouter;

```

### File: `server/src/apps/categoryRouter.mjs`

```javascript
import express from "express";
import supabase from "../utils/db.mjs";
import protectAdmin from "../middleware/protectAdmin.mjs";

const categoryRouter = express.Router();

categoryRouter.get("/", async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*")
      .order("id");

    if (error) {
      throw error;
    }

    return res.status(200).json(categories);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to fetch categories" });
  }
});

categoryRouter.get("/:categoryId", async (req, res) => {
  const { id } = req.params;
  try {
    const { data: category, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.json(category);
  } catch {
    return res.status(500).json({ error: "Failed to fetch category" });
  }
});

categoryRouter.post("/", protectAdmin, async (req, res) => {
  const { name } = req.body;
  try {
    const { error } = await supabase.from("categories").insert([{ name }]);
    if (error) {
      throw error;
    }
    return res.status(201).json({ message: "Created category successfully" });
  } catch {
    return res.status(500).json({ error: "Failed to create category" });
  }
});

categoryRouter.put("/:id", protectAdmin, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const { data, error } = await supabase
      .from("categories")
      .update({ name })
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(201).json({ message: "Updated category successfully" });
  } catch {
    return res.status(500).json({ error: "Failed to update category" });
  }
});

categoryRouter.delete("/:categoryId", protectAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      throw error;
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.json({ message: "Deleted category successfully" });
  } catch {
    return res.status(500).json({ error: "Failed to delete category" });
  }
});

export default categoryRouter;

```

### File: `server/src/apps/messageRouter.mjs`

```javascript
import { Router } from "express";
import supabase from "../utils/db.mjs";
import protectUser from "../middleware/protectUser.mjs";

const messageRouter = Router();

// Get all conversations for a user
messageRouter.get("/conversations", protectUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        sender:users!messages_sender_id_fkey(id, name, profile_pic),
        receiver:users!messages_receiver_id_fkey(id, name, profile_pic)
      `)
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Group by conversation
    const conversations = {};
    data.forEach((msg) => {
      const otherUserId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
      if (!conversations[otherUserId]) {
        conversations[otherUserId] = {
          user: msg.sender_id === userId ? msg.receiver : msg.sender,
          lastMessage: msg.message,
          lastMessageTime: msg.created_at,
          unreadCount: 0,
        };
      }
      if (!msg.is_read && msg.receiver_id === userId) {
        conversations[otherUserId].unreadCount++;
      }
    });

    const conversationList = Object.values(conversations);
    return res.status(200).json(conversationList);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get conversations" });
  }
});

// Get messages with a specific user
messageRouter.get("/:userId", protectUser, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const otherUserId = req.params.userId;

    const { data, error } = await supabase
      .from("messages")
      .select(`
        *,
        sender:users!messages_sender_id_fkey(id, name, profile_pic)
      `)
      .or(
        `and(sender_id.eq.${currentUserId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${currentUserId})`
      )
      .order("created_at", { ascending: true });

    if (error) throw error;

    // Mark messages as read (only messages sent TO current user FROM other user)
    const { data: updatedMessages, error: updateError } = await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("receiver_id", currentUserId)
      .eq("sender_id", otherUserId)
      .eq("is_read", false)
      .select();

    if (updateError) {
      console.error("Error marking messages as read:", updateError);
    } else if (updatedMessages && updatedMessages.length > 0) {
      console.log(`Marked ${updatedMessages.length} messages as read`);
      // Update the data to reflect the read status
      data.forEach(msg => {
        if (msg.receiver_id === currentUserId && msg.sender_id === otherUserId) {
          msg.is_read = true;
        }
      });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get messages" });
  }
});

// Send a message
messageRouter.post("/", protectUser, async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId, message } = req.body;

    if (!receiverId || !message || message.trim().length === 0) {
      return res.status(400).json({ message: "Receiver and message are required" });
    }

    const { data, error } = await supabase
      .from("messages")
      .insert([
        {
          sender_id: senderId,
          receiver_id: receiverId,
          message: message.trim(),
        },
      ])
      .select();

    if (error) throw error;

    return res.status(201).json(data[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to send message" });
  }
});

// Get unread message count
messageRouter.get("/unread/count", protectUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const { count, error } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("receiver_id", userId)
      .eq("is_read", false);

    if (error) throw error;

    return res.status(200).json({ count: count || 0 });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ count: 0 });
  }
});

// Simple in-memory store for typing status (in production, use Redis)
const typingStatus = new Map();

// Set typing status
messageRouter.post("/typing", protectUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { receiverId } = req.body;
    
    const key = `${userId}-${receiverId}`;
    typingStatus.set(key, Date.now());
    
    // Auto-clear after 3 seconds
    setTimeout(() => {
      typingStatus.delete(key);
    }, 3000);
    
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update typing status" });
  }
});

// Get typing status
messageRouter.get("/typing/:userId", protectUser, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const otherUserId = req.params.userId;
    
    const key = `${otherUserId}-${currentUserId}`;
    const lastTyping = typingStatus.get(key);
    
    // Consider typing if last update was within 2 seconds
    const isTyping = lastTyping && (Date.now() - lastTyping < 2000);
    
    return res.status(200).json({ isTyping });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ isTyping: false });
  }
});

export default messageRouter;

```

### File: `server/src/apps/notificationRouter.mjs`

```javascript
import { Router } from "express";
import supabase from "../utils/db.mjs";
import protectAdmin from "../middleware/protectAdmin.mjs";

const notificationRouter = Router();

// Get all notifications for admin (only their posts)
notificationRouter.get("/", protectAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;
    console.log('Admin ID:', adminId); // Debug log

    // First get all post IDs created by this admin
    const { data: adminPosts, error: postsError } = await supabase
      .from("posts")
      .select("id")
      .eq("user_id", adminId);

    console.log('Admin Posts:', adminPosts); // Debug log

    if (postsError) {
      console.error('Posts Error:', postsError);
      throw postsError;
    }

    const postIds = adminPosts.map(post => post.id);
    console.log('Post IDs:', postIds); // Debug log

    if (postIds.length === 0) {
      return res.status(200).json([]);
    }

    // Get notifications for those posts
    const { data, error } = await supabase
      .from("notifications")
      .select(`
        *,
        users!notifications_user_id_fkey(name, profile_pic),
        posts!notifications_post_id_fkey(title)
      `)
      .in("post_id", postIds)
      .order("created_at", { ascending: false })
      .limit(50);

    console.log('Notifications:', data); // Debug log

    if (error) {
      console.error('Notifications Error:', error);
      throw error;
    }

    const formattedData = data.map((notification) => ({
      id: notification.id,
      type: notification.type,
      user_name: notification.users?.name,
      user_avatar: notification.users?.profile_pic,
      article_title: notification.posts?.title,
      post_id: notification.post_id,
      content: notification.content,
      created_at: notification.created_at,
      is_read: notification.is_read,
    }));

    return res.status(200).json(formattedData);
  } catch (err) {
    console.error('Error in notifications route:', err);
    return res.status(500).json({
      message: "Server could not read notifications",
      error: err.message,
    });
  }
});

// Get unread notification count
notificationRouter.get("/unread-count", protectAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;

    // First get all post IDs created by this admin
    const { data: adminPosts, error: postsError } = await supabase
      .from("posts")
      .select("id")
      .eq("user_id", adminId);

    if (postsError) throw postsError;

    const postIds = adminPosts.map(post => post.id);

    if (postIds.length === 0) {
      return res.status(200).json({ count: 0 });
    }

    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .in("post_id", postIds)
      .eq("is_read", false);

    if (error) throw error;

    return res.status(200).json({ count: count || 0 });
  } catch (err) {
    console.error(err);
    return res.status(200).json({ count: 0 });
  }
});

// Mark notification as read
notificationRouter.put("/:notificationId/read", protectAdmin, async (req, res) => {
  try {
    const notificationId = req.params.notificationId;

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", notificationId);

    if (error) throw error;

    return res.status(200).json({ message: "Notification marked as read" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server could not update notification",
    });
  }
});

// Mark all notifications as read
notificationRouter.put("/read-all", protectAdmin, async (req, res) => {
  try {
    const adminId = req.user.id;

    // First get all post IDs created by this admin
    const { data: adminPosts, error: postsError } = await supabase
      .from("posts")
      .select("id")
      .eq("user_id", adminId);

    if (postsError) throw postsError;

    const postIds = adminPosts.map(post => post.id);

    if (postIds.length === 0) {
      return res.status(200).json({ message: "No notifications to update" });
    }

    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .in("post_id", postIds)
      .eq("is_read", false);

    if (error) throw error;

    return res.status(200).json({ message: "All notifications marked as read" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server could not update notifications",
    });
  }
});

export default notificationRouter;

```

### File: `server/src/apps/postRouter.mjs`

```javascript
import { Router } from "express";
import supabase from "../utils/db.mjs";
import protectAdmin from "../middleware/protectAdmin.mjs";
import protectUser from "../middleware/protectUser.mjs";
import multer from "multer";

const postRouter = Router();

const multerUpload = multer({ storage: multer.memoryStorage() });

const imageFileUpload = multerUpload.fields([
  { name: "imageFile", maxCount: 1 },
]);


postRouter.post("/", [imageFileUpload, protectAdmin], async (req, res) => {
  const newPost = req.body;
  const file = req.files.imageFile[0];
  const userId = req.user.id; // Get user ID from JWT

  const bucketName = "articles";
  const filePath = `posts/${Date.now()}`;

  try {

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadError) throw uploadError;


    const {
      data: { publicUrl },
    } = supabase.storage.from(bucketName).getPublicUrl(uploadData.path);


    const { error: insertError } = await supabase.from("posts").insert([
      {
        title: newPost.title,
        image: publicUrl,
        category_id: parseInt(newPost.category_id),
        description: newPost.description,
        content: newPost.content,
        status_id: parseInt(newPost.status_id),
        user_id: userId, // Add user_id
      },
    ]);

    if (insertError) throw insertError;

    return res.status(201).json({ message: "Created post successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Server could not create post because database connection`,
    });
  }
});


postRouter.get("/", async (req, res) => {
  try {
    const category = req.query.category || "";
    const keyword = req.query.keyword || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 6;

    const safePage = Math.max(1, page);
    const safeLimit = Math.max(1, Math.min(100, limit));
    const from = (safePage - 1) * safeLimit;
    const to = from + safeLimit - 1;


    let query = supabase
      .from("posts")
      .select(`
        *, 
        categories!inner(name), 
        statuses!inner(status),
        users!posts_user_id_fkey(id, name, profile_pic)
      `, { count: "exact" })
      .eq("status_id", 2);


    if (category) {
      query = query.ilike("categories.name", `%${category}%`);
    }

    if (keyword) {

      query = query.or(
        `title.ilike.%${keyword}%,description.ilike.%${keyword}%,content.ilike.%${keyword}%`
      );
    }


    const { data, count, error } = await query
      .order("date", { ascending: false })
      .range(from, to);

    if (error) throw error;


    const results = {
      totalPosts: count,
      totalPages: Math.ceil(count / safeLimit),
      currentPage: safePage,
      limit: safeLimit,
      posts: data.map((post) => ({
        ...post,
        category: post.categories?.name,
        status: post.statuses?.status,
        author: post.users || { name: "Wannasingh K.", profile_pic: null },
      })),
    };

    if (to + 1 < count) {
      results.nextPage = safePage + 1;
    }
    if (from > 0) {
      results.previousPage = safePage - 1;
    }

    return res.status(200).json(results);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server could not read post because database issue",
    });
  }
});


postRouter.get("/admin", protectAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`*, categories(name), statuses(status)`)
      .order("date", { ascending: false });

    if (error) throw error;

    const posts = data.map((post) => ({
      ...post,
      category: post.categories?.name,
      status: post.statuses?.status,
    }));

    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({
      message: "Server could not read posts because of a database issue",
    });
  }
});


postRouter.get("/:postId", async (req, res) => {
  const postIdFromClient = req.params.postId;

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`*, categories(name), statuses(status)`)
      .eq("id", postIdFromClient)
      .eq("status_id", 2)
      .single();

    if (error || !data) {
      return res.status(404).json({
        message: `Server could not find a requested post (post id: ${postIdFromClient})`,
      });
    }

    return res.status(200).json({
      ...data,
      category: data.categories?.name,
      status: data.statuses?.status,
    });
  } catch (err) {
    return res.status(500).json({
      message: `Server could not read post because database issue`,
    });
  }
});


postRouter.get("/admin/:postId", protectAdmin, async (req, res) => {
  const postIdFromClient = req.params.postId;

  try {
    const { data, error } = await supabase
      .from("posts")
      .select(`*, categories(name), statuses(status)`)
      .eq("id", postIdFromClient)
      .single();

    if (error || !data) {
      return res.status(404).json({
        message: `Server could not find a requested post (post id: ${postIdFromClient})`,
      });
    }

    return res.status(200).json({
      ...data,
      category: data.categories?.name,
      status: data.statuses?.status,
    });
  } catch {
    return res.status(500).json({
      message: `Server could not read post because database issue`,
    });
  }
});


postRouter.put(
  "/:postId",
  [imageFileUpload, protectAdmin],
  async (req, res) => {
    const postIdFromClient = req.params.postId;
    const updatedPost = { ...req.body, date: new Date() };
    const bucketName = "articles";

    try {
      let publicUrl = updatedPost.image;
      const file = req.files?.imageFile?.[0];

      if (file) {
        const filePath = `posts/${Date.now()}`;
        const { data, error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file.buffer, {
            contentType: file.mimetype,
            upsert: false,
          });

        if (error) throw error;

        const response = supabase.storage
          .from(bucketName)
          .getPublicUrl(data.path);

        publicUrl = response.data.publicUrl;
      }

      const { data, error } = await supabase
        .from("posts")
        .update({
          title: updatedPost.title,
          image: publicUrl,
          category_id: parseInt(updatedPost.category_id),
          description: updatedPost.description,
          content: updatedPost.content,
          status_id: parseInt(updatedPost.status_id),
          date: updatedPost.date,
        })
        .eq("id", postIdFromClient)
        .select();

      if (error) throw error;

      if (!data || data.length === 0) {
        return res.status(404).json({
          message: `Server could not find a requested post to update (post id: ${postIdFromClient})`,
        });
      }

      return res.status(200).json({
        message: "Updated post successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: `Server could not update post due to an error`,
      });
    }
  }
);


postRouter.delete("/:postId", protectAdmin, async (req, res) => {
  const postIdFromClient = req.params.postId;

  try {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postIdFromClient)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: `Server could not find a requested post to delete (post id: ${postIdFromClient})`,
      });
    }

    return res.status(200).json({
      message: "Deleted post successfully",
    });
  } catch {
    return res.status(500).json({
      message: `Server could not delete post because database connection`,
    });
  }
});


postRouter.get("/:postId/comments", async (req, res) => {
  const postIdFromClient = req.params.postId;

  try {
    const { data, error } = await supabase
      .from("comments")
      .select(`*, users(name, username, profile_pic, role)`)
      .eq("post_id", postIdFromClient)
      .order("created_at", { ascending: false });

    if (error) throw error;

    const formattedData = data.map((comment) => ({
      ...comment,
      name: comment.users?.name,
      username: comment.users?.username,
      profile_pic: comment.users?.profile_pic,
      role: comment.users?.role,
    }));

    return res.status(200).json(formattedData);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: `Server could not read comments because database connection`,
    });
  }
});


postRouter.post("/:postId/comments", protectUser, async (req, res) => {
  const postIdFromClient = req.params.postId;
  const { id: userId } = req.user;
  const { comment } = req.body;

  if (!comment || comment.trim().length === 0) {
    return res.status(400).json({ message: "Comment content cannot be empty" });
  }

  if (comment.length > 500) {
    return res.status(400).json({
      message: "Comment content exceeds the maximum length of 500 characters",
    });
  }
  try {
    // Insert comment
    const { error: commentError } = await supabase.from("comments").insert([
      {
        post_id: postIdFromClient,
        user_id: userId,
        comment_text: comment,
      },
    ]);

    if (commentError) throw commentError;

    // Get post author to create notification
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .select("user_id")
      .eq("id", postIdFromClient)
      .single();

    if (!postError && postData && postData.user_id !== userId) {
      // Only create notification if commenter is not the post author
      await supabase.from("notifications").insert([
        {
          user_id: userId,
          post_id: postIdFromClient,
          type: "comment",
          content: comment.substring(0, 100), // Store first 100 chars
        },
      ]);
    }

    return res.status(201).json({ message: "Created comment successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message:
        "Server could not create comment due to a database connection issue",
      error: err.message,
    });
  }
});


postRouter.get("/:postId/likes", async (req, res) => {
  const postIdFromClient = req.params.postId;
  try {
    const { count, error } = await supabase
      .from("likes")
      .select("*", { count: "exact", head: true })
      .eq("post_id", postIdFromClient);

    if (error) throw error;

    return res.status(200).json({ like_count: count });
  } catch {
    return res.status(500).json({
      message: `Server could not count likes because database connection`,
    });
  }
});


postRouter.post("/:postId/likes", protectUser, async (req, res) => {
  const postIdFromClient = req.params.postId;
  const userId = req.user.id;
  try {
    // Insert like
    const { error: likeError } = await supabase.from("likes").insert([
      {
        post_id: postIdFromClient,
        user_id: userId,
      },
    ]);

    if (likeError) throw likeError;

    // Get post author to create notification
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .select("user_id")
      .eq("id", postIdFromClient)
      .single();

    if (!postError && postData && postData.user_id !== userId) {
      // Only create notification if liker is not the post author
      await supabase.from("notifications").insert([
        {
          user_id: userId,
          post_id: postIdFromClient,
          type: "like",
          content: null,
        },
      ]);
    }

    return res.status(201).json({ message: "Created like successfully" });
  } catch (err) {
    return res.status(500).json({
      message:
        "Server could not create like because of a database connection issue",
      error: err.message,
    });
  }
});


postRouter.delete("/:postId/likes", protectUser, async (req, res) => {
  const postIdFromClient = req.params.postId;
  const userId = req.user.id;
  try {
    const { data, error } = await supabase
      .from("likes")
      .delete()
      .eq("post_id", postIdFromClient)
      .eq("user_id", userId)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res
        .status(404)
        .json({ message: "Like not found or you do not own this like" });
    }

    return res.status(200).json({ message: "Deleted like successfully" });
  } catch (err) {
    return res.status(500).json({
      message: `Server could not delete like due to a database connection issue`,
      error: err.message,
    });
  }
});

export default postRouter;

```

### File: `server/src/apps/profileRouter.mjs`

```javascript
import { Router } from "express";
import supabase from "../utils/db.mjs";
import protectUser from "../middleware/protectUser.mjs";
import multer from "multer";

const profileRouter = Router();
const multerUpload = multer({ storage: multer.memoryStorage() });
const imageFileUpload = multerUpload.fields([
  { name: "imageFile", maxCount: 1 },
]);

// Get main author (first admin user) for homepage
profileRouter.get("/author", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, username, profile_pic, bio")
      .eq("role", "admin")
      .order("created_at", { ascending: true })
      .limit(1)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "Author not found" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to get author profile",
      error: err.message,
    });
  }
});

// Get user profile by ID (public)
profileRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, username, profile_pic, role, bio")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to get user profile",
      error: err.message,
    });
  }
});

profileRouter.put("/", [imageFileUpload, protectUser], async (req, res) => {
  const { id: userId } = req.user;
  const { name, username, bio } = req.body;
  const file = req.files?.imageFile?.[0];


  if (!userId) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

  if (name && (name.trim().length === 0 || name.length > 100)) {
    return res
      .status(400)
      .json({ message: "Name cannot be empty or exceed 100 characters" });
  }

  if (username && (username.trim().length === 0 || username.length > 50)) {
    return res
      .status(400)
      .json({ message: "Username cannot be empty or exceed 50 characters" });
  }

  if (bio && bio.length > 500) {
    return res
      .status(400)
      .json({ message: "Bio cannot exceed 500 characters" });
  }

  let profilePicUrl = null;

  try {
    if (file) {
      const bucketName = "profiles";
      const filePath = `profiles/${userId}-${Date.now()}`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false,
        });

      if (error) {
        console.error("Upload Error:", error);
        throw new Error("Failed to upload profile picture to storage");
      }


      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(data.path);
      profilePicUrl = publicUrl;
    }


    const updateData = {};
    if (name) updateData.name = name;
    if (username) updateData.username = username;
    if (bio !== undefined) updateData.bio = bio; // Allow empty string to clear bio
    if (profilePicUrl) updateData.profile_pic = profilePicUrl;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No fields to update provided" });
    }


    const { error: updateError } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", userId);

    if (updateError) {
      throw updateError;
    }

    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Failed to update profile",
      error: err.message,
    });
  }
});

export default profileRouter;

```

### File: `server/src/middleware/postValidation.mjs`

```javascript


function validatePostData(req, res, next) {
  const { title, image, category_id, description, content, status_id } =
    req.body;

  // Check for required fields
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

  if (!category_id) {
    return res.status(400).json({ message: "Category ID is required" });
  }

  if (!description) {
    return res.status(400).json({ message: "Description is required" });
  }

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  if (!status_id) {
    return res.status(400).json({ message: "Status ID is required" });
  }

  // type validations
  if (typeof title !== "string") {
    return res.status(400).json({ message: "Title must be a string" });
  }

  if (typeof image !== "string") {
    return res.status(400).json({ message: "Image must be a string URL" });
  }

  if (typeof category_id !== "number") {
    return res.status(400).json({ message: "Category ID must be a number" });
  }

  if (typeof description !== "string") {
    return res.status(400).json({ message: "Description is must be a string" });
  }

  if (typeof content !== "string") {
    return res.status(400).json({ message: "Content is must be a string" });
  }

  if (typeof status_id !== "number") {
    return res.status(400).json({ message: "Status ID must be a number" });
  }

  next();
}

export default validatePostData;

```

### File: `server/src/middleware/protectAdmin.mjs`

```javascript
import supabase from "../utils/db.mjs";


const protectAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {

    const { data: authData, error: authError } = await supabase.auth.getUser(
      token
    );

    if (authError || !authData.user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }


    const supabaseUserId = authData.user.id;


    const { data: userRole, error: dbError } = await supabase
      .from("users")
      .select("role")
      .eq("id", supabaseUserId)
      .single();

    if (dbError || !userRole) {
      return res.status(404).json({ error: "User role not found" });
    }


    req.user = { ...authData.user, role: userRole.role };


    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "Forbidden: You do not have admin access" });
    }


    next();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectAdmin;

```

### File: `server/src/middleware/protectUser.mjs`

```javascript
import supabase from "../utils/db.mjs";


const protectUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  try {

    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }


    req.user = { ...data.user };


    next();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectUser;

```

### File: `server/src/utils/db.mjs`

```javascript
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

export default supabase;

```

### File: `server/test-db.mjs`

```javascript
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase
    .from("posts")
    .select(`
      *, 
      categories!inner(name), 
      statuses!inner(status),
      users!posts_user_id_fkey(id, name, profile_pic)
    `);
  console.log("Data length:", data?.length);
  console.log("Error:", error);
}

test();

```

### File: `server/vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "app.mjs",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/app.mjs"
    }
  ]
}

```

