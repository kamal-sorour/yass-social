import { motion } from "framer-motion";
import CreatePost from "../../components/feed/CreatePost";
import PostCard from "../../components/feed/PostCard";
import SuggestedFriends from "../../components/feed/SuggestedFriends";
import { useHomeFeed } from "../../hooks/usePosts";
import { PostCardSkeleton } from "../../components/SkeletonLoading";

export default function HomeFeed() {
  const { data, isLoading, isError } = useHomeFeed(1);
  const posts = data?.data?.posts || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:px-8 flex gap-8 justify-center items-start pb-20">
      <div className="flex-1 max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Home
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mt-1">
            Welcome back! Here's what's happening.
          </p>
        </motion.div>

        <div className="space-y-6">
          <CreatePost />

          {isLoading ? (
            [...Array(3)].map((_, i) => <PostCardSkeleton key={i} />)
          ) : isError ? (
            <div className="text-center py-8 text-red-500">
              Failed to load feed.
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-10 text-neutral-500 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800">
              No posts to show. Follow some friends!
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
  );
}