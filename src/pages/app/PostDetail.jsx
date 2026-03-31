import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import PostCard from "../../components/feed/PostCard";
import { useSinglePost } from "../../hooks/usePosts";
import {
  usePostComments,
  useDeleteComment,
  useUpdateComment,
  useCommentReplies,
  useCreateReply,
  useToggleLikeComment,
} from "../../hooks/useComments";
import { useAuthContext } from "../../hooks/useAuth";
import { SEO } from "../../components/SEO";

const ReplyItem = ({ reply, postId }) => {
  const { user: currentUser } = useAuthContext();
  const isOwner = currentUser?._id === reply.commentCreator?._id;
  const initialLiked = reply.likes?.includes(currentUser?._id) || false;

  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(reply.likesCount || 0);
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(reply.content || "");
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(reply.image || null);

  const menuRef = useRef(null);
  const fileInputRef = useRef(null);

  const { mutate: deleteReply, isPending: isDeleting } = useDeleteComment();
  const { mutate: updateReply, isPending: isUpdating } = useUpdateComment();
  const { mutate: toggleLike } = useToggleLikeComment();

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
    toggleLike(
      { postId, commentId: reply._id },
      {
        onError: () => {
          setLiked(liked);
          setLikeCount((c) => (liked ? c + 1 : c - 1));
          toast.error("Failed to like reply");
        },
      }
    );
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this reply?")) {
      deleteReply({ postId, commentId: reply._id });
    }
    setShowMenu(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveEdit = () => {
    const formData = new FormData();
    if (editContent.trim()) formData.append("content", editContent);
    if (editImageFile) formData.append("image", editImageFile);

    updateReply(
      { postId, commentId: reply._id, formData },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-2 ${
        isDeleting ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <Link to={`/app/profile/${reply.commentCreator?._id}`}>
        <img
          src={reply.commentCreator?.photo || "https://via.placeholder.com/150"}
          alt=""
          className="w-6 h-6 rounded-full object-cover mt-1"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <div
          className={`bg-neutral-100 dark:bg-neutral-800/80 p-2.5 rounded-2xl rounded-tl-none inline-block max-w-full relative group ${
            isEditing
              ? "w-full bg-white dark:bg-neutral-900 border border-indigo-500"
              : ""
          }`}
        >
          <div className="flex items-center justify-between gap-4 mb-0.5">
            <Link to={`/app/profile/${reply.commentCreator?._id}`}>
              <span className="font-semibold text-xs text-neutral-900 dark:text-white hover:underline">
                {reply.commentCreator?.name}
              </span>
            </Link>
            {isOwner && !isEditing && (
              <div
                className="relative opacity-0 group-hover:opacity-100 transition-opacity"
                ref={menuRef}
              >
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-0.5 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500"
                >
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-1 w-28 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-100 dark:border-neutral-700 overflow-hidden z-10"
                    >
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-[11px] text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        className="w-full text-left px-3 py-2 text-[11px] text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="mt-1 w-full">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 text-xs rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-500 resize-none min-h-12.5"
              />
              {editImagePreview && (
                <div className="relative mt-2 w-max group/img">
                  <img
                    src={editImagePreview}
                    alt="Edit preview"
                    className="rounded-lg max-h-24 object-cover border border-neutral-200 dark:border-neutral-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center gap-2 rounded-lg transition-opacity">
                    <button
                      onClick={() => {
                        setEditImageFile(null);
                        setEditImagePreview(null);
                      }}
                      className="p-1 bg-red-500 text-white rounded-full"
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
                </div>
              )}
              <div className="flex justify-between items-center mt-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[10px] font-medium text-indigo-600 hover:underline flex items-center gap-1"
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                    />
                  </svg>{" "}
                  Add Image
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditContent(reply.content || "");
                      setEditImagePreview(reply.image || null);
                    }}
                    className="px-2 py-1 text-[10px] text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={
                      isUpdating || (!editContent.trim() && !editImagePreview)
                    }
                    className="px-2 py-1 text-[10px] text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-md transition-colors"
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                {reply.content}
              </p>
              {reply.image && (
                <img
                  src={reply.image}
                  alt="Reply attachment"
                  className="mt-2 rounded-lg max-h-32 object-cover border border-neutral-200 dark:border-neutral-700"
                />
              )}
            </>
          )}
        </div>
        {!isEditing && (
          <div className="flex items-center gap-4 mt-1.5 ml-2 text-[10px] text-neutral-500">
            <span>
              {new Date(reply.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <button
              onClick={handleLike}
              className={`font-medium transition-colors ${
                liked ? "text-red-500" : "hover:text-indigo-600"
              }`}
            >
              {likeCount > 0 ? `${likeCount} ` : ""}Like
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const CommentItem = ({ comment, postId }) => {
  const { user: currentUser } = useAuthContext();
  const isOwner = currentUser?._id === comment.commentCreator?._id;
  const initialLiked = comment.likes?.includes(currentUser?._id) || false;

  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content || "");
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(
    comment.image || null
  );
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyImage, setReplyImage] = useState(null);
  const [replyImagePreview, setReplyImagePreview] = useState(null);

  const [liked, setLiked] = useState(initialLiked);
  const [likeCount, setLikeCount] = useState(comment.likesCount || 0);

  const menuRef = useRef(null);
  const fileInputRef = useRef(null);
  const replyFileInputRef = useRef(null);

  const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment();
  const { mutate: updateComment, isPending: isUpdating } = useUpdateComment();
  const { mutate: createReply, isPending: isReplying } = useCreateReply();
  const { mutate: toggleLike } = useToggleLikeComment();

  const { data: repliesData, isLoading: isLoadingReplies } = useCommentReplies(
    postId,
    comment._id
  );
  const replies = repliesData?.data?.replies || [];

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
    toggleLike(
      { postId, commentId: comment._id },
      {
        onError: () => {
          setLiked(liked);
          setLikeCount((c) => (liked ? c + 1 : c - 1));
          toast.error("Failed to like comment");
        },
      }
    );
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteComment({ postId, commentId: comment._id });
    }
    setShowMenu(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditImageFile(file);
      setEditImagePreview(URL.createObjectURL(file));
    }
  };

  const handleReplyImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReplyImage(file);
      setReplyImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveEdit = () => {
    const formData = new FormData();
    if (editContent.trim()) formData.append("content", editContent);
    if (editImageFile) formData.append("image", editImageFile);

    updateComment(
      { postId, commentId: comment._id, formData },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
  };

  const handleReplySubmit = () => {
    if (!replyText.trim() && !replyImage) return;
    const formData = new FormData();
    if (replyText.trim()) formData.append("content", replyText);
    if (replyImage) formData.append("image", replyImage);

    createReply(
      { postId, commentId: comment._id, formData },
      {
        onSuccess: () => {
          setReplyText("");
          setReplyImage(null);
          setReplyImagePreview(null);
          if (replyFileInputRef.current) replyFileInputRef.current.value = "";
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-neutral-900 p-4 rounded-2xl border ${
        isEditing
          ? "border-indigo-500"
          : "border-neutral-100 dark:border-neutral-800"
      } shadow-sm flex gap-3 ${
        isDeleting ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      <Link to={`/app/profile/${comment.commentCreator?._id}`}>
        <img
          src={
            comment.commentCreator?.photo || "https://via.placeholder.com/150"
          }
          alt={comment.commentCreator?.name}
          className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-neutral-100 dark:ring-neutral-800"
        />
      </Link>
      <div className="flex-1 min-w-0">
        <div className="bg-neutral-50 dark:bg-neutral-800/50 p-3 rounded-2xl rounded-tl-none inline-block max-w-full w-full relative group">
          <div className="flex items-center justify-between gap-4 mb-1">
            <Link to={`/app/profile/${comment.commentCreator?._id}`}>
              <span className="font-semibold text-sm text-neutral-900 dark:text-white hover:underline">
                {comment.commentCreator?.name}
              </span>
            </Link>
            {isOwner && !isEditing && (
              <div
                className="relative opacity-0 group-hover:opacity-100 transition-opacity"
                ref={menuRef}
              >
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  className="p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-500"
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
                      d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {showMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute right-0 mt-1 w-32 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-100 dark:border-neutral-700 overflow-hidden z-10"
                    >
                      <button
                        onClick={() => {
                          setIsEditing(true);
                          setShowMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
          {isEditing ? (
            <div className="mt-2 w-full">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full p-2 text-sm rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-indigo-500 resize-none min-h-15"
              />
              {editImagePreview && (
                <div className="relative mt-2 w-max group/img">
                  <img
                    src={editImagePreview}
                    alt="Edit preview"
                    className="rounded-lg max-h-32 object-cover border border-neutral-200 dark:border-neutral-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center gap-2 rounded-lg transition-opacity">
                    <button
                      onClick={() => {
                        setEditImageFile(null);
                        setEditImagePreview(null);
                      }}
                      className="p-1 bg-red-500 text-white rounded-full"
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
                </div>
              )}
              <div className="flex justify-between items-center mt-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs font-medium text-indigo-600 hover:underline flex items-center gap-1"
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
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                    />
                  </svg>{" "}
                  Add Image
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setEditContent(comment.content || "");
                      setEditImagePreview(comment.image || null);
                    }}
                    className="px-3 py-1 text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={
                      isUpdating || (!editContent.trim() && !editImagePreview)
                    }
                    className="px-3 py-1 text-xs text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 rounded-md transition-colors"
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {comment.content && (
                <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
                  {comment.content}
                </p>
              )}
              {comment.image && (
                <img
                  src={comment.image}
                  alt="Comment attachment"
                  className="mt-2 rounded-xl max-h-48 object-cover border border-neutral-200 dark:border-neutral-700"
                />
              )}
            </>
          )}
        </div>
        {!isEditing && (
          <div className="flex items-center gap-4 mt-2 ml-2 text-xs text-neutral-500">
            <span>
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <button
              onClick={handleLike}
              className={`font-medium transition-colors ${
                liked ? "text-red-500" : "hover:text-indigo-600"
              }`}
            >
              {likeCount > 0 ? `${likeCount} ` : ""}Like
            </button>
            <button
              onClick={() => setShowReplyInput(!showReplyInput)}
              className="font-medium hover:text-indigo-600 transition-colors"
            >
              Reply
            </button>
          </div>
        )}

        <AnimatePresence>
          {showReplyInput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 flex flex-col gap-2 overflow-hidden"
            >
              {replyImagePreview && (
                <div className="relative inline-block ml-8 w-max">
                  <img
                    src={replyImagePreview}
                    alt="Preview"
                    className="h-16 w-auto rounded-lg object-cover border border-neutral-200 dark:border-neutral-700"
                  />
                  <button
                    onClick={() => {
                      setReplyImage(null);
                      setReplyImagePreview(null);
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
              <div className="flex gap-2 items-center">
                <img
                  src={currentUser?.photo || "https://via.placeholder.com/150"}
                  alt="User"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div className="flex-1 flex items-center bg-neutral-100 dark:bg-neutral-800 rounded-full px-1">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={replyFileInputRef}
                    onChange={handleReplyImageChange}
                  />
                  <button
                    onClick={() => replyFileInputRef.current?.click()}
                    className={`p-1.5 rounded-full ${
                      replyImage
                        ? "text-indigo-600"
                        : "text-neutral-400 hover:text-indigo-600"
                    }`}
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
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleReplySubmit()}
                    placeholder={`Reply to ${comment.commentCreator?.name}...`}
                    className="flex-1 bg-transparent text-xs px-2 py-2 focus:outline-none"
                  />
                  <button
                    onClick={handleReplySubmit}
                    disabled={(!replyText.trim() && !replyImage) || isReplying}
                    className="text-indigo-600 disabled:text-neutral-400 p-1.5"
                  >
                    {isReplying ? (
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
            </motion.div>
          )}
        </AnimatePresence>

        {replies.length > 0 && (
          <div className="mt-3 pl-4 border-l-2 border-neutral-100 dark:border-neutral-800 space-y-3">
            {replies.map((reply) => (
              <ReplyItem key={reply._id} reply={reply} postId={postId} />
            ))}
          </div>
        )}

        {isLoadingReplies && (
          <div className="text-xs text-neutral-500 mt-2 pl-4">
            Loading replies...
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: postData, isLoading: isPostLoading } = useSinglePost(id);
  const post = postData?.data?.post;
  const { data: commentsData, isLoading: isCommentsLoading } = usePostComments(
    id,
    1
  );
  const comments = commentsData?.data?.comments || [];

  if (isPostLoading)
    return <div className="text-center py-10">Loading post...</div>;
  if (!post)
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center text-neutral-600 dark:text-neutral-400">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
          Post not found
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          Go back
        </button>
      </div>
    );

  return (
    <>
      <SEO 
        title={post.content ? `${post.content.substring(0, 50)}...` : `Post on Yass Route`}
        description={post.content || "View this post and join the conversation on Yass Route."}
        image={post.image}
        url={`/app/post/${post._id}`}
        type="article"
      />
      <div className="max-w-2xl mx-auto px-4 py-6 lg:px-8 pb-20">
        <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
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
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>{" "}
        Back
      </button>
      <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-2xl border border-neutral-100 dark:border-neutral-800">
        <PostCard post={post} detailed={true} />
      </div>
      <div className="mt-8">
        <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-6 pl-2">
          Comments ({post.commentsCount || 0})
        </h3>
        {isCommentsLoading ? (
          <div className="text-center text-neutral-500 py-4">
            Loading comments...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center text-neutral-500 py-8 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-100 dark:border-neutral-800">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentItem
                key={comment._id}
                comment={comment}
                postId={post._id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
    </>
  );
}