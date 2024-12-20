import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import { Toaster } from "@/components/ui/sonner";
import NotFoundPage from "./pages/NotFoundPage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SignUpSuccessPage from "./pages/SignUpSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminArticleManagementPage from "./pages/admin/AdminArticlePage";
import AdminCategoryManagementPage from "./pages/admin/AdminCategoryPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import AdminResetPasswordPage from "./pages/admin/AdminResetPasswordPage";
import AdminCreateArticlePage from "./pages/admin/AdminCreateArticle";
import AdminNotificationPage from "./pages/admin/AdminNotificationPage";
import AdminCreateCategoryPage from "./pages/admin/AdminCreateCategoryPage";
import AdminEditCategoryPage from "./pages/admin/AdminEditCategoryPage";
import AdminEditArticlePage from "./pages/admin/AdminEditArticlePage";
import { useAuth } from "@/contexts/authentication"; // Import useAuth to check auth state
import jwtInterceptor from "./utils/jwtIntercepter.js";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AuthenticationRoute from "./components/auth/AuthenticationRoute";

jwtInterceptor();

function App() {
  const { isAuthenticated, state } = useAuth();

  return (
    <div className="App">
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
    </div>
  );
}

export default App;