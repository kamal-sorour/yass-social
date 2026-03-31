import { motion } from 'framer-motion';
import PostCard from '../../components/feed/PostCard';
import { useBookmarks } from '../../hooks/useUsers';
import { SEO } from "../../components/SEO";

export default function Saved() {
  const { data, isLoading, isError } = useBookmarks();
  
  const savedPosts = data?.data?.bookmarks || [];

  return (
    <>
      <SEO 
        title="Saved Posts"
        description="View your saved and bookmarked posts on Yass Route."
        url="/app/saved"
        noindex={true}
      />
      <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 pb-20">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Saved Posts</h1>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1 text-sm">
              Your personal collection of bookmarked posts. Only you can see what you've saved.
            </p>
          </div>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <svg className="animate-spin h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        </div>
      ) : isError ? (
        <div className="text-center py-12 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-2xl">
          Failed to load saved posts.
        </div>
      ) : savedPosts.length > 0 ? (
        <div className="space-y-6">
          {savedPosts.map((post) => (
            <PostCard key={`saved-${post._id}`} post={post} />
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-16 text-center bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-100 dark:border-neutral-800 shadow-sm"
        >
          <div className="w-24 h-24 bg-neutral-50 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6">
            <svg className="w-12 h-12 text-neutral-300 dark:text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">No saved posts yet</h3>
          <p className="text-neutral-500 max-w-sm mx-auto leading-relaxed">
            When you see a post you want to keep, click the save icon and it will show up here for you to read later.
          </p>
        </motion.div>
      )}
    </div>
    </>
  );
}