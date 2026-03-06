import { motion } from "framer-motion";

export const SuggestedFriendSkeleton = () => (
  <div className="flex items-center gap-3 p-2 rounded-xl">
    <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
    <div className="flex-1 space-y-2">
      <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
      <div className="h-2 w-16 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
    </div>
    <div className="w-20 h-8 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
  </div>
);

export const ExploreFriendSkeleton = () => (
  <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
          <div className="h-3 w-16 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
        </div>
      </div>
      <div className="w-24 h-9 rounded-xl bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
    </div>
    <div className="flex items-center gap-2 mt-5">
      <div className="h-6 w-20 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
      <div className="h-6 w-16 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse" />
    </div>
  </div>
);

export const PostCardSkeleton = () => (
  <div className="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-100 dark:border-neutral-800 mb-6">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-full bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      <div className="flex-1 space-y-2">
        <div className="h-4 w-32 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
        <div className="h-3 w-24 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 w-full bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
      <div className="h-4 w-5/6 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
    </div>
    <div className="w-full h-64 bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse mb-4" />
    <div className="flex gap-6 border-t border-neutral-100 dark:border-neutral-800 pt-4">
      <div className="w-12 h-6 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
      <div className="w-12 h-6 bg-neutral-200 dark:bg-neutral-800 rounded animate-pulse" />
    </div>
  </div>
);