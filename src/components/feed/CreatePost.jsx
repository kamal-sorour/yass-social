import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker from "emoji-picker-react";
import toast from "react-hot-toast";
import { useCreatePost } from "../../hooks/usePosts";
import { useAuthContext } from "../../hooks/useAuth";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [privacy, setPrivacy] = useState("public");
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const fileInputRef = useRef(null);
  const privacyRef = useRef(null);
  const emojiRef = useRef(null);

  const { user } = useAuthContext();
  const { mutate: createPost, isPending } = useCreatePost();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (privacyRef.current && !privacyRef.current.contains(event.target))
        setShowPrivacyMenu(false);
      if (emojiRef.current && !emojiRef.current.contains(event.target))
        setShowEmojiPicker(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onEmojiClick = (emojiObject) => {
    setContent((prev) => prev + emojiObject.emoji);
  };

  const handleSubmit = () => {
    if (!content.trim() && !imageFile) return;

    const formData = new FormData();
    if (content.trim()) formData.append("body", content);
    if (imageFile) formData.append("image", imageFile);
    formData.append("privacy", privacy);

    createPost(formData, {
      onSuccess: () => {
        setContent("");
        removeImage();
        setPrivacy("public");
        setShowEmojiPicker(false);
        toast.success("Post created successfully!");
      },
    });
  };

  const privacyOptions = [
    {
      id: "public",
      label: "Public",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      id: "following",
      label: "Following",
      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
      id: "only_me",
      label: "Only Me",
      icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
    },
  ];

  const currentPrivacy = privacyOptions.find((opt) => opt.id === privacy);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-neutral-900 rounded-2xl p-4 sm:p-6 shadow-sm border border-neutral-100 dark:border-neutral-800 mb-6"
    >
      <div className="flex items-start gap-3 sm:gap-4 mb-4">
        <img
          src={user?.photo || "https://via.placeholder.com/150"}
          alt={user?.name || "User"}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover shrink-0 ring-2 ring-white dark:ring-neutral-900 shadow-sm"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-neutral-900 dark:text-white truncate">
              {user?.name}
            </h3>
            <div className="relative" ref={privacyRef}>
              <button
                onClick={() => setShowPrivacyMenu(!showPrivacyMenu)}
                className="flex items-center gap-1 px-2 py-0.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 rounded-full text-xs font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
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
                    d={currentPrivacy.icon}
                  />
                </svg>
                {currentPrivacy.label}
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
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <AnimatePresence>
                {showPrivacyMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="absolute left-0 top-full mt-1 w-40 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-100 dark:border-neutral-700 overflow-hidden z-20"
                  >
                    {privacyOptions.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setPrivacy(opt.id);
                          setShowPrivacyMenu(false);
                        }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-sm ${
                          privacy === opt.id
                            ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700"
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
                            strokeWidth={2}
                            d={opt.icon}
                          />
                        </svg>
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPending}
            placeholder={`Let's Create a Post ${
              user?.name?.split(" ")[0] || ""
            }`}
            className="w-full text-left bg-transparent text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none resize-none min-h-15 text-lg sm:text-xl"
          />
        </div>
      </div>

      <AnimatePresence>
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative mb-4 rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex justify-center"
          >
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-100 object-contain"
            />
            <button
              onClick={removeImage}
              disabled={isPending}
              className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between pt-3 border-t border-neutral-100 dark:border-neutral-800">
        <div
          className="flex items-center gap-1 sm:gap-2 relative"
          ref={emojiRef}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
            disabled={isPending}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-600 hover:text-purple-500 dark:hover:text-purple-900/20 transition-colors disabled:opacity-50"
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
            <span className="text-sm font-medium hidden sm:block">
              Photo/video
            </span>
          </button>

          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            disabled={isPending}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-neutral-600 hover:text-yellow-500 dark:hover:text-yellow-300/20 transition-colors disabled:opacity-50"
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
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm font-medium hidden sm:block">
              Feeling/activity
            </span>
          </button>

          <AnimatePresence>
            {showEmojiPicker && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 z-50 mt-2"
              >
                <EmojiPicker onEmojiClick={onEmojiClick} theme="auto" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending || (!content.trim() && !imageFile)}
          className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 dark:disabled:bg-blue-800 text-white text-sm font-semibold rounded-xl transition-colors flex items-center gap-2"
        >
          {isPending ? (
            <svg
              className="animate-spin h-4 w-4 text-white"
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
            <>
              Post
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
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}