import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  useNotificationsList,
  useMarkAsRead,
  useMarkAllAsRead,
} from "../../hooks/useNotifications";

const typeIcons = {
  like_post: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  comment_post: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
      />
    </svg>
  ),
  share_post: (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  ),
};

const getNotificationText = (type) => {
  switch (type) {
    case "like_post":
      return "liked your post.";
    case "comment_post":
      return "commented on your post.";
    case "share_post":
      return "shared your post.";
    default:
      return "interacted with you.";
  }
};

export default function Notifications() {
  const navigate = useNavigate();
  const { data, isLoading } = useNotificationsList(1);
  const { mutate: markRead } = useMarkAsRead();
  const { mutate: markAllRead, isPending: isMarkingAll } = useMarkAllAsRead();

  const notificationsList = data?.data?.notifications || [];

  const handleNotificationClick = (notif) => {
    if (!notif.isRead) {
      markRead(notif._id);
    }
    if (notif.entityType === "post") {
      navigate(`/app/post/${notif.entityId}`);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 pb-24">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1 text-sm">
            Stay up to date with your activity
          </p>
        </div>
        {notificationsList.length > 0 && (
          <button
            onClick={() => markAllRead()}
            disabled={isMarkingAll}
            className="px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold rounded-xl hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors disabled:opacity-50"
          >
            Mark all as read
          </button>
        )}
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : notificationsList.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800">
          <div className="w-20 h-20 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-neutral-300 dark:text-neutral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-neutral-900 dark:text-white">
            No notifications yet
          </p>
          <p className="text-sm mt-1 text-neutral-500">
            When someone interacts with you, it will show up here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notificationsList.map((notif, i) => (
            <motion.div
              key={notif._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <div
                onClick={() => handleNotificationClick(notif)}
                className={`flex items-start gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200 ${
                  !notif.isRead
                    ? "bg-indigo-50/50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30"
                    : "bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700"
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl shrink-0 ${
                    notif.type === "like_post"
                      ? "bg-red-100 text-red-500 dark:bg-red-900/30"
                      : notif.type === "comment_post"
                      ? "bg-blue-100 text-blue-500 dark:bg-blue-900/30"
                      : "bg-green-100 text-green-500 dark:bg-green-900/30"
                  }`}
                >
                  {typeIcons[notif.type]}
                </div>
                <img
                  src={notif.actor?.photo || "https://via.placeholder.com/150"}
                  alt=""
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-neutral-900 dark:text-white text-sm">
                    <span className="font-bold">{notif.actor?.name}</span>{" "}
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {getNotificationText(notif.type)}
                    </span>
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      !notif.isRead
                        ? "text-indigo-600 dark:text-indigo-400 font-medium"
                        : "text-neutral-400"
                    }`}
                  >
                    {new Date(notif.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                {!notif.isRead && (
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0 mt-2 shadow-sm" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}