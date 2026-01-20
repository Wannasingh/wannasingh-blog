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
