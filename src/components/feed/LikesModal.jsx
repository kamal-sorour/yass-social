import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePostLikes } from "../../hooks/usePosts";

export default function LikesModal({ postId, onClose }) {
  const { data, isLoading } = usePostLikes(postId);
  const likes = data?.data?.likes || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-neutral-900 w-full max-w-sm rounded-3xl p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-xl text-neutral-900 dark:text-white">
            Likes
          </h3>
          <button
            onClick={onClose}
            className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="max-h-72 overflow-y-auto space-y-2 pr-2">
          {isLoading ? (
            <div className="flex justify-center py-6">
              <svg
                className="animate-spin h-6 w-6 text-indigo-600"
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
          ) : likes.length === 0 ? (
            <div className="text-center text-sm py-4 text-neutral-500">
              No likes yet.
            </div>
          ) : (
            likes.map((user) => (
              <Link
                key={user._id}
                to={`/app/profile/${user._id}`}
                className="flex items-center gap-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 p-2 rounded-2xl transition-colors"
              >
                <img
                  src={user.photo}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-sm text-neutral-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    @{user.username || "user"}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
}