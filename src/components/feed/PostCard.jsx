import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "../../hooks/useAuth";
import {
  useDeletePost,
  useUpdatePost,
  useToggleLike,
  useToggleBookmark,
  useSharePost,
} from "../../hooks/usePosts";
import { useCreateComment } from "../../hooks/useComments";
import LikesModal from "./LikesModal";

const formatDate = (dateString) => {
  const options = {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

export default function PostCard({ post, detailed = false }) {
  const { user: currentUser } = useAuthContext();
  const isOwner = currentUser?._id === post?.user?._id;
  const initialLiked = post.likes?.includes(currentUser?._id) || false;

  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(post.likesCount || 0);
  const [bookmarked, setBookmarked] = useState(post.bookmarked || false);
  const [showMenu, setShowMenu] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentImage, setCommentImage] = useState(null);
  const [commentImagePreview, setCommentImagePreview] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.body || "");
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(post.image || null);

  const [showLikesModal, setShowLikesModal] = useState(false);
  const [showShareInput, setShowShareInput] = useState(false);
  const [shareText, setShareText] = useState("");

  const menuRef = useRef(null);
  const postFileInputRef = useRef(null);
  const commentFileInputRef = useRef(null);

  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
  const { mutate: toggleLike } = useToggleLike();
  const { mutate: toggleBookmark } = useToggleBookmark();
  const { mutate: createComment, isPending: isCommenting } = useCreateComment();
  const { mutate: sharePost, isPending: isSharing } = useSharePost();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target))
        setShowMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
    toggleLike(post._id, {
      onError: () => {
        setLiked(liked);
        setLikeCount((c) => (liked ? c + 1 : c - 1));
        toast.error("Something went wrong with the like");
      },
    });
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toggleBookmark(post._id, {
      onSuccess: () =>
        toast.success(
          bookmarked ? "Post removed from saved" : "Post saved successfully"
        ),
      onError: () => {
        setBookmarked(bookmarked);
        toast.error("Failed to save post");
      },
    });
    setShowMenu(false);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(post._id, {
        onSuccess: () => toast.success("Post deleted successfully"),
      });
    }
    setShowMenu(false);
  };

  const handlePostImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveEdit = () => {
    const formData = new FormData();
    if (editContent.trim()) formData.append("body", editContent);
    if (editImageFile) formData.append("image", editImageFile);

    updatePost(
      { postId: post._id, formData },
      {
        onSuccess: () => {
          setIsEditing(false);
          toast.success("Post updated successfully");
        },
      }
    );
  };

  const handleCommentImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCommentImage(file);
      setCommentImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim() && !commentImage) return;
    const formData = new FormData();
    if (commentText.trim()) formData.append("content", commentText);
    if (commentImage) formData.append("image", commentImage);

    createComment(
      { postId: post._id, formData },
      {
        onSuccess: () => {
          setCommentText("");
          setCommentImage(null);
          setCommentImagePreview(null);
          if (commentFileInputRef.current)
            commentFileInputRef.current.value = "";
        },
      }
    );
  };

  const handleShareSubmit = () => {
    sharePost(
      { postId: post._id, body: shareText },
      {
        onSuccess: () => {
          setShowShareInput(false);
          setShareText("");
        },
      }
    );
  };

  const renderSharedPost = (shared) => {
    if (!shared) return null;
    return (
      <div className="mt-4 border border-neutral-200 dark:border-neutral-700 rounded-xl p-4 bg-neutral-50 dark:bg-neutral-800/50">
        <Link
          to={`/app/profile/${shared.user?._id}`}
          className="flex items-center gap-2 mb-2"
        >
          <img
            src={shared.user?.photo}
            alt={shared.user?.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="font-semibold text-sm text-neutral-900 dark:text-white">
            {shared.user?.name}
          </span>
          <span className="text-xs text-neutral-500">
            · {formatDate(shared.createdAt)}
          </span>
        </Link>
        {shared.body && (
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            {shared.body}
          </p>
        )}
        {shared.image && (
          <img
            src={shared.image}
            alt="Shared content"
            className="w-full mt-2 rounded-lg max-h-75 object-cover"
          />
        )}
      </div>
    );
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`bg-white dark:bg-neutral-900 rounded-2xl overflow-visible shadow-sm border ${
          isEditing
            ? "border-indigo-500"
            : "border-neutral-100 dark:border-neutral-800"
        } transition-all duration-300 flex flex-col mb-6 ${
          isDeleting ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between gap-4">
            <Link
              to={`/app/profile/${post.user?._id}`}
              className="flex items-center gap-3 flex-1 min-w-0"
            >
              <img
                src={post.user?.photo}
                alt={post.user?.name}
                className="w-12 h-12 rounded-full object-cover shrink-0 ring-2 ring-white shadow-sm"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-neutral-900 dark:text-white truncate">
                  {post.user?.name}
                </p>
                <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <span className="truncate">@{post.user?.username}</span>
                  <span>·</span>
                  <span>{formatDate(post.createdAt)}</span>
                  {isOwner && (
                    <>
                      <span>·</span>
                      <span className="capitalize text-xs">{post.privacy}</span>
                    </>
                  )}
                </div>
              </div>
            </Link>

            {!isEditing && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-600 transition-colors focus:outline-none"
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-700 overflow-hidden z-10"
                    >
                      <div className="py-1">
                        {isOwner ? (
                          <>
                            <button
                              onClick={() => {
                                setIsEditing(true);
                                setShowMenu(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 flex items-center gap-2"
                            >
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
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>{" "}
                              Edit Post
                            </button>
                            <button
                              onClick={handleDelete}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                            >
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>{" "}
                              Delete Post
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={handleBookmark}
                            className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700 flex items-center gap-2"
                          >
                            {bookmarked ? (
                              <>
                                <svg
                                  className="w-4 h-4"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>{" "}
                                Unsave Post
                              </>
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
                                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                  />
                                </svg>{" "}
                                Save Post
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="mt-4">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 border-none focus:ring-2 focus:ring-indigo-500 text-neutral-900 dark:text-white resize-none min-h-25"
                placeholder="What's on your mind?"
              />
            </div>
          ) : (
            post.body && (
              <p className="mt-4 text-neutral-800 dark:text-neutral-200 leading-relaxed whitespace-pre-wrap">
                {post.body}
              </p>
            )
          )}

          {post.sharedPost && renderSharedPost(post.sharedPost)}
        </div>

        {(isEditing ? editImagePreview : post.image) && (
          <div className="relative w-full bg-neutral-100 dark:bg-neutral-800 max-h-125 overflow-hidden flex items-center justify-center group">
            <img
              src={isEditing ? editImagePreview : post.image}
              alt="Post content"
              className="w-full h-auto object-contain max-h-125"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={postFileInputRef}
                  onChange={handlePostImageChange}
                />
                <button
                  onClick={() => postFileInputRef.current?.click()}
                  className="px-4 py-2 bg-white text-black rounded-lg text-sm font-medium"
                >
                  Change Image
                </button>
                <button
                  onClick={() => {
                    setEditImageFile(null);
                    setEditImagePreview(null);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )}

        {isEditing && !editImagePreview && (
          <div className="px-6 pb-4">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={postFileInputRef}
              onChange={handlePostImageChange}
            />
            <button
              onClick={() => postFileInputRef.current?.click()}
              className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:underline"
            >
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                />
              </svg>{" "}
              Add Image
            </button>
          </div>
        )}

        {isEditing && (
          <div className="px-6 py-3 border-t border-neutral-100 dark:border-neutral-800 flex justify-end gap-3 bg-neutral-50 dark:bg-neutral-900">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditContent(post.body || "");
                setEditImagePreview(post.image || null);
              }}
              disabled={isUpdating}
              className="px-4 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveEdit}
              disabled={
                isUpdating || (!editContent.trim() && !editImagePreview)
              }
              className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-lg"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {!isEditing && (
          <>
            <AnimatePresence>
              {showShareInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 py-4 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-100 dark:border-neutral-800"
                >
                  <textarea
                    value={shareText}
                    onChange={(e) => setShareText(e.target.value)}
                    placeholder="Say something about this..."
                    className="w-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3 resize-none min-h-20"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowShareInput(false)}
                      disabled={isSharing}
                      className="px-4 py-1.5 text-sm font-medium text-neutral-600 hover:bg-neutral-200 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleShareSubmit}
                      disabled={isSharing}
                      className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg flex items-center gap-2"
                    >
                      {isSharing ? (
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
                      ) : (
                        "Share Now"
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="px-6 py-4 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 w-full mt-4">
              <div className="flex items-center gap-6">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 transition-colors ${
                    liked
                      ? "text-red-500"
                      : "text-neutral-500 hover:text-red-500"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill={liked ? "currentColor" : "none"}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <span
                  onClick={() => setShowLikesModal(true)}
                  className="text-sm font-medium text-neutral-500 hover:underline cursor-pointer"
                >
                  {likeCount.toLocaleString()}
                </span>

                <button className="flex items-center gap-2 text-neutral-500 hover:text-indigo-600 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    {post.commentsCount || 0}
                  </span>
                </button>

                <button
                  onClick={() => setShowShareInput(!showShareInput)}
                  className="flex items-center gap-2 text-neutral-500 hover:text-indigo-600 transition-colors"
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
                      strokeWidth={1.5}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    {post.sharesCount || 0}
                  </span>
                </button>
              </div>
              {!detailed && (
                <Link
                  to={`/app/post/${post._id}`}
                  className="px-4 py-1.5 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
                >
                  View details
                </Link>
              )}
            </div>

            {post.topComment && (
              <div className="px-6 py-3 mb-4 bg-neutral-80 dark:bg-neutral-800/20 mx-4 mt-4 rounded-xl border border-neutral-700">
                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={post.topComment.commentCreator.photo}
                    alt={post.topComment.commentCreator.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold text-neutral-700">
                    {post.topComment.commentCreator.name}
                  </span>
                  <span className="text-[10px] text-neutral-500">
                    Top Comment
                  </span>
                </div>
                <p className="text-sm text-neutral-600 pl-7 line-clamp-2">
                  {post.topComment.content}
                </p>
              </div>
            )}

            <div className="px-6 py-3 bg-neutral-80 dark:bg-neutral-800/20 rounded-xl ">
              {commentImagePreview && (
                <div className="relative inline-block mb-3">
                  <img
                    src={commentImagePreview}
                    alt="Preview"
                    className="h-20 w-auto rounded-lg object-cover border border-neutral-200"
                  />
                  <button
                    onClick={() => {
                      setCommentImage(null);
                      setCommentImagePreview(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                  >
                    <svg
                      className="w-3 h-3"
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
              )}
              <div className="flex gap-3 items-center">
                <img
                  src={currentUser?.photo || "https://via.placeholder.com/150"}
                  alt="Your avatar"
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                />
                <div className="flex-1 relative flex items-center bg-white border border-neutral-200 rounded-full pr-2 dark:border-neutral-700 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-300 focus-within:ring-indigo-500 focus-within:border-indigo-500 focus-within:ring-1 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={commentFileInputRef}
                    onChange={handleCommentImageChange}
                  />
                  <button
                    onClick={() => commentFileInputRef.current?.click()}
                    className="p-2 ml-1 text-neutral-400 hover:text-indigo-600 transition-colors rounded-full"
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
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleCommentSubmit()
                    }
                    placeholder="Write a comment..."
                    className="w-full bg-transparent text-sm px-2 py-2.5 focus:outline-none text-neutral-80 dark:text-neutral-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                  />
                  <button
                    onClick={handleCommentSubmit}
                    disabled={
                      (!commentText.trim() && !commentImage) || isCommenting
                    }
                    className="p-1.5 mr-1 bg-indigo-600 text-white rounded-full disabled:bg-neutral-300 transition-colors shrink-0"
                  >
                    {isCommenting ? (
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
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.article>

      {showLikesModal && (
        <LikesModal
          postId={post._id}
          onClose={() => setShowLikesModal(false)}
        />
      )}
    </>
  );
}