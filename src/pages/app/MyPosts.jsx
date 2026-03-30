import { motion } from "framer-motion";
import CreatePost from "../../components/feed/CreatePost";
import PostCard from "../../components/feed/PostCard";
import { useUserPosts } from "../../hooks/useUsers";
import { useAuthContext } from "../../hooks/useAuth";
import { PostCardSkeleton } from "../../components/SkeletonLoading";
import SuggestedFriends from "../../components/feed/SuggestedFriends";

export default function MyPosts() {
  const { user } = useAuthContext();
  const { data, isLoading, isError } = useUserPosts(user?._id, {
    enabled: !!user?._id,
  });
  const posts = data?.data?.posts || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:px-8 flex gap-8 justify-center items-start pb-20">


      <div className="flex-1 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                My Posts
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">
                Manage your timeline and share your thoughts.
              </p>
            </div>
          </div>
        </motion.div>

        <CreatePost />
        
        {isLoading ? (
          [...Array(3)].map((_, i) => <PostCardSkeleton key={i} />)
        ) : isError ? (
          <div className="flex flex-col items-center justify-center py-12 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800">
            <svg
              className="w-12 h-12 text-red-500 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p className="text-neutral-700 dark:text-neutral-300 font-medium">
              Failed to load your posts.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        ) : posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-16 text-center bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm"
          >
            <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-indigo-400 dark:text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
              No posts yet
            </h3>
            <p className="text-neutral-500 max-w-sm mx-auto leading-relaxed">
              You haven't shared anything on your timeline yet. Use the area
              above to create your first post!
            </p>
          </motion.div>
        ) : (
          posts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
      <div className="hidden lg:block w-85 shrink-0 sticky top-24">
        <SuggestedFriends />
      </div>
    </div>
  );
}