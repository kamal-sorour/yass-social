import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useSuggestions, useToggleFollow } from "../../hooks/useUsers";
import { SuggestedFriendSkeleton } from "../SkeletonLoading";

export default function SuggestedFriends() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useSuggestions(5);
  const { mutate: toggleFollow } = useToggleFollow();

  const [loadingId, setLoadingId] = useState(null);
  const [followedIds, setFollowedIds] = useState(new Set());

  const suggestions = data?.data?.suggestions || [];

  const filteredUsers = suggestions.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.username?.toLowerCase().includes(search.toLowerCase())
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
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 p-6 w-full max-w-85">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold flex items-center gap-2 text-neutral-900 dark:text-white">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          Suggested Friends
        </h2>
      </div>

      <div className="relative mb-6">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search friends..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all placeholder:text-neutral-400"
        />
      </div>

      <div className="space-y-4">
        {isLoading
          ? [...Array(5)].map((_, i) => <SuggestedFriendSkeleton key={i} />)
          : filteredUsers.map((user) => {
              const isFollowing = followedIds.has(user._id);
              const isBtnLoading = loadingId === user._id;

              return (
                <div
                  key={user._id}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <Link to={`/app/profile/${user._id}`} className="shrink-0">
                    <img
                      src={user.photo}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-transparent hover:ring-blue-500 transition-all"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/app/profile/${user._id}`}>
                      <p className="font-semibold text-neutral-900 dark:text-white truncate text-sm hover:underline">
                        {user.name}
                      </p>
                    </Link>
                    <p className="text-[10px] text-neutral-500 mt-0.5">
                      {user.followersCount + (isFollowing ? 1 : 0)} followers
                    </p>
                  </div>
                  <button
                    onClick={() => handleFollow(user._id, user.name)}
                    disabled={isBtnLoading}
                    className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-xs transition-colors shrink-0 w-20 ${
                      isFollowing
                        ? "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700"
                        : "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    }`}
                  >
                    {isBtnLoading ? (
                      <svg
                        className="animate-spin w-3.5 h-3.5"
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
                          className="w-3.5 h-3.5"
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
              );
            })}
      </div>

      <Link to="/app/suggestions">
        <button className="w-full mt-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 font-medium text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
          View more
        </button>
      </Link>
    </div>
  );
}