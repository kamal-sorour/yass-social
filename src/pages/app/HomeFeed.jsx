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
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0,0,256,256">
                <g fill="#735791" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"><g transform="scale(10.66667,10.66667)"><path d="M12,2.09961l-11,9.90039h3v9h7v-6h2v6h7v-9h3zM12,4.79102l6,5.40039v0.80859v8h-3v-6h-6v6h-3v-8.80859z"></path></g></g>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">
                Home
              </h1>
              <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">
                Welcome back! here's what's new
              </p>
            </div>
          </div>
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