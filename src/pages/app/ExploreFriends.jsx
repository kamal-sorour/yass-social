import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSuggestions, useToggleFollow } from "../../hooks/useUsers";
import { ExploreFriendSkeleton } from "../../components/SkeletonLoading";
import { SEO } from "../../components/SEO";

export default function ExploreFriends() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSuggestions(40);
  const { mutate: toggleFollow } = useToggleFollow();

  const [loadingId, setLoadingId] = useState(null);
  const [followedIds, setFollowedIds] = useState(new Set());

  const suggestions = data?.data?.suggestions || [];

  const filteredUsers = suggestions.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      (user.username &&
        user.username.toLowerCase().includes(search.toLowerCase()))
  );

  const handleFollow = (userId, userName) => {
    setLoadingId(userId);

    toggleFollow(userId, {
      onSuccess: (res) => {
        setLoadingId(null);

        if (res.data?.following) {
          setFollowedIds((prev) => new Set(prev).add(userId));
          toast.success(`You are now following ${userName}`);
        } else {
          setFollowedIds((prev) => {
            const next = new Set(prev);
            next.delete(userId);
            return next;
          });

          toast.success(`Unfollowed ${userName}`);
        }
      },
      onError: () => {
        setLoadingId(null);
        toast.error("Something went wrong!");
      },
    });
  };

  return (
    <>
      <SEO 
        title="Suggested Friends"
        description="Find and connect with new creators, friends, and popular users on Yass Route."
        url="/app/suggestions"
        type="website"
      />
      <div className="max-w-6xl mx-auto px-4 py-8 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          All Suggested Friends
        </h1>

        <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold px-3 py-1 rounded-full text-sm">
          {suggestions.length}
        </span>
      </div>

      <div className="relative mb-8">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          type="text"
          placeholder="Search by name or username..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {isLoading
          ? [...Array(8)].map((_, i) => <ExploreFriendSkeleton key={i} />)
          : filteredUsers.map((user, i) => {
              const isFollowing = followedIds.has(user._id);
              const isBtnLoading = loadingId === user._id;

              return (
                <motion.div
                  key={user._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <Link to={`/app/profile/${user._id}`}>
                        <img
                          src={user.photo}
                          alt={user.name}
                          className="w-14 h-14 rounded-full object-cover border border-neutral-100 dark:border-neutral-700"
                        />
                      </Link>

                      <div>
                        <Link
                          to={`/app/profile/${user._id}`}
                          className="hover:underline"
                        >
                          <h3 className="font-bold text-neutral-900 dark:text-white capitalize">
                            {user.name}
                          </h3>
                        </Link>

                        <p className="text-sm text-neutral-500 mt-0.5">
                          @{user.username ? user.username : "user route"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleFollow(user._id, user.name)}
                      disabled={isBtnLoading}
                      className={`flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-sm transition-colors w-28 disabled:opacity-70 ${
                        isFollowing
                          ? "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200"
                          : "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                      }`}
                    >
                      {isBtnLoading ? (
                        <svg
                          className="animate-spin w-4 h-4"
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
                      ) : isFollowing ? (
                        "Following"
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                            />
                          </svg>
                          Follow
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2 mt-5">
                    <span className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 text-xs font-medium rounded-full">
                      {user.followersCount + (isFollowing ? 1 : 0)} followers
                    </span>

                    {user.mutualFollowersCount > 0 && (
                      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-medium rounded-full">
                        {user.mutualFollowersCount} mutual
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
      </div>
    </div>
    </>
  );
}