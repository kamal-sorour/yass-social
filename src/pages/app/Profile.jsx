import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthContext } from "../../hooks/useAuth";
import {
  useMyProfile,
  useUserProfile,
  useUserPosts,
  useToggleFollow,
  useUploadPhoto,
} from "../../hooks/useUsers";
import PostCard from "../../components/feed/PostCard";
import { PostCardSkeleton } from "../../components/SkeletonLoading";

export default function Profile() {
  const { id } = useParams();
  const { user: currentUser, saveAuthData } = useAuthContext();

  const profileId = id || currentUser?._id;
  const isOwnProfile = profileId === currentUser?._id;

  const { data: myProfileData, isLoading: isMyProfileLoading } = useMyProfile({
    enabled: isOwnProfile,
  });
  const { data: otherProfileData, isLoading: isOtherProfileLoading } =
    useUserProfile(profileId, { enabled: !isOwnProfile && !!profileId });

  const profileUser = isOwnProfile
    ? myProfileData?.data?.user
    : otherProfileData?.data?.user;
  const isFollowing = otherProfileData?.data?.isFollowing;

  const { data: postsData, isLoading: isPostsLoading } = useUserPosts(
    profileId,
    { enabled: !!profileId }
  );
  const posts = postsData?.data?.posts || [];

  const { mutate: toggleFollow, isPending: isFollowingPending } =
    useToggleFollow();
  const { mutate: uploadPhoto, isPending: isUploadingPhoto } = useUploadPhoto();

  const photoInputRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [profileId]);

  const handleFollowToggle = () => {
    if (!profileId) return;
    toggleFollow(profileId);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("photo", file);

      uploadPhoto(formData, {
        onSuccess: (res) => {
          if (res.data?.photo && currentUser) {
            saveAuthData(localStorage.getItem("token"), {
              ...currentUser,
              photo: res.data.photo,
            });
          }
        },
      });
    }
  };

  const isProfileLoading = isOwnProfile
    ? isMyProfileLoading
    : isOtherProfileLoading;

  if (isProfileLoading) {
    return (
      <div className="flex justify-center items-center py-40">
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
    );
  }

  if (!profileUser) {
    return (
      <div className="flex justify-center py-20 text-neutral-500">
        User not found or something went wrong.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <div className="h-48 sm:h-64 lg:h-80 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-b-3xl overflow-hidden relative">
          {profileUser.cover ? (
            <img
              src={profileUser.cover}
              alt="Cover"
              className="w-full h-full object-cover opacity-90"
            />
          ) : (
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
          )}
        </div>

        <div className="px-4 sm:px-8 lg:px-12 -mt-16 relative">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-neutral-100 dark:border-neutral-800 p-6 sm:p-8 backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              <div className="relative group">
                <img
                  src={profileUser.photo || "https://via.placeholder.com/150"}
                  alt={profileUser.name}
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-white dark:ring-neutral-900 shadow-lg shrink-0 bg-neutral-100 dark:bg-neutral-800 ${
                    isUploadingPhoto ? "opacity-50" : ""
                  }`}
                />
                {isOwnProfile && (
                  <>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={photoInputRef}
                      onChange={handlePhotoChange}
                    />
                    <button
                      onClick={() => photoInputRef.current?.click()}
                      disabled={isUploadingPhoto}
                      className="absolute bottom-2 right-2 p-2 bg-indigo-600 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-lg disabled:bg-indigo-400"
                    >
                      {isUploadingPhoto ? (
                        <svg
                          className="animate-spin h-4 w-4"
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
                      ) : (
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
                            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                  </>
                )}
              </div>

              <div className="flex-1 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white capitalize flex items-center gap-2">
                      {profileUser.name}
                    </h1>
                    <p className="text-neutral-500 dark:text-neutral-400 mt-1">
                      @{profileUser.username}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    {isOwnProfile ? (
                      <Link to="/app/profile/settings">
                        <button className="px-6 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                          Edit Profile
                        </button>
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={handleFollowToggle}
                          disabled={isFollowingPending}
                          className={`px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 ${
                            isFollowing
                              ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                              : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/25"
                          }`}
                        >
                          {isFollowing ? "UnFollow" : "Follow"}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-8 mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {posts.length}
                    </span>
                    <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Posts
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {profileUser.followersCount || 0}
                    </span>
                    <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Followers
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                      {profileUser.followingCount || 0}
                    </span>
                    <span className="text-xs font-medium text-neutral-500 uppercase tracking-wider">
                      Following
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 px-4 sm:px-8 lg:px-12 max-w-2xl mx-auto w-full">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
          Posts
        </h2>
        {isPostsLoading ? (
          [...Array(3)].map((_, i) => <PostCardSkeleton key={i} />)
        ) : posts.length === 0 ? (
          <div className="text-center text-neutral-500 py-16 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800">
            <p className="text-lg font-medium text-neutral-900 dark:text-white">
              No posts yet
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
