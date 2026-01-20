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
