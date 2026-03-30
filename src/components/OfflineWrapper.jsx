import { useEffect } from "react";
import { Offline } from "react-detect-offline";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function OfflineToast() {

  useEffect(() => {
    const handleOnline = () => {
      toast.success("Back online 🚀", {
        style: {
          borderRadius: "12px",
          background: "linear-gradient(to right, #6366f1, #a855f7)",
          color: "#fff",
        },
      });
    };

    window.addEventListener("online", handleOnline);
    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-9999 w-[95%] max-w-lg"
      >
        <div className="relative p-px rounded-2xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-[0_0_40px_rgba(168,85,247,0.35)]">

          <div className="flex items-center gap-4 rounded-2xl px-5 py-4 backdrop-blur-xl
            bg-white/80 text-gray-800
            dark:bg-gray-900/90 dark:text-white
          ">

            {/* Icon */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-11 h-11 flex items-center justify-center rounded-full 
                bg-red-500/10 border border-red-500/30"
            >
              <svg
                className="w-5 h-5 text-red-500 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12 12h.01M8.464 15.536a5 5 0 010-7.072M5.636 18.364a9 9 0 010-12.728"
                />
              </svg>
            </motion.div>

            {/* Text */}
            <div className="flex-1">
              <h3 className="text-sm font-semibold">
                You're offline
              </h3>
              <p className="text-xs opacity-70">
                Check your internet connection.
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => window.location.reload()}
              className="px-3 py-1.5 text-xs rounded-lg border transition-all
                bg-black/5 border-black/10 hover:bg-black/10
                dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10
              "
            >
              Relod the page
            </button>

          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function OfflineWrapper() {
  return (
    <Offline>
      <OfflineToast />
    </Offline>
  );
}