import { motion } from "framer-motion";
import PostCard from "../../components/feed/PostCard";
import SuggestedFriends from "../../components/feed/SuggestedFriends";
import { usePosts } from "../../hooks/usePosts";
import { PostCardSkeleton } from "../../components/SkeletonLoading";
import CreatePost from "../../components/feed/CreatePost";
import { SEO } from "../../components/SEO";

export default function Community() {
  const { data, isLoading, isError } = usePosts(1);
  const posts = data?.data?.posts || [];

  return (
    <>
      <SEO 
        title="Community"
        description="Discover trending posts and explore the Yass Route community."
        url="/app/community"
        type="website"
      />
      <div className="max-w-7xl mx-auto px-4 py-6 lg:px-8 flex gap-8 justify-center items-start pb-20">
        <div className="flex-1 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center justify-between"
        >
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              <svg
                className="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Community
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">
              Discover what's happening around the world right now.
            </p>
          </div>
        </motion.div>

        <CreatePost />

        <div className="space-y-6">
          {isLoading ? (
            [...Array(4)].map((_, i) => <PostCardSkeleton key={i} />)
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
                Failed to load community posts.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-sm font-medium"
              >
                Try Again
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-neutral-300 dark:text-neutral-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <p className="text-lg font-medium text-neutral-900 dark:text-white">
                No posts available
              </p>
              <p className="text-sm mt-1 text-neutral-500">
                Be the first to share something with the community!
              </p>
            </div>
          ) : (
            posts.map((post) => <PostCard key={post._id} post={post} />)
          )}
        </div>
      </div>

      <div className="hidden lg:block w-85 shrink-0 sticky top-24">
        <SuggestedFriends />
      </div>
    </div>
    </>
  );
}