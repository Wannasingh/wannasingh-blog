import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import { Toaster } from "@/components/ui/sonner";
import NotFoundPage from "./pages/NotFoundpage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SignUpSuccessPage from "./pages/SignUpSuccessPage";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import AdminArticleManagementPage from "./pages/admin/AdminArticlePage";
import AdminLogin from "./pages/admin/AdminLoginPage";
import AdminCategoryManagementPage from "./pages/admin/AdminCategoryPage";
import AdminProfilePage from "./pages/admin/AdminProfilePage";
import AdminResetPasswordPage from "./pages/admin/AdminResetPasswordPage";
import AdminCreateArticlePage from "./pages/admin/AdminCreateArticle";
import AdminNotificationPage from "./pages/admin/AdminNotificationPage";
import AdminCreateCategoryPage from "./pages/admin/AdminCreateCategoryPage";
import AdminEditCategoryPage from "./pages/admin/AdminEditCategoryPage";
import AdminEditArticlePage from "./pages/admin/AdminEditArticlePage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:postId" element={<ViewPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-up/success" element={<SignUpSuccessPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          {/* Admin Section */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/article-management"
            element={<AdminArticleManagementPage />}
          />
          <Route
            path="/admin/article-management/create"
            element={<AdminCreateArticlePage />}
          />
          <Route
            path="/admin/article-management/edit/:postId"
            element={<AdminEditArticlePage />}
          />
          <Route
            path="/admin/category-management"
            element={<AdminCategoryManagementPage />}
          />
          <Route
            path="/admin/category-management/create"
            element={<AdminCreateCategoryPage />}
          />
          <Route
            path="/admin/category-management/edit/:categoryId"
            element={<AdminEditCategoryPage />}
          />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route
            path="/admin/notification"
            element={<AdminNotificationPage />}
          />
          <Route
            path="/admin/reset-password"
            element={<AdminResetPasswordPage />}
          />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          unstyled: true,
        }}
      />
    </div>
  );
}

export default App;
