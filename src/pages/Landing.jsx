import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import Button from "../components/Button";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";
import Kimo from "../assets/kimo.jpg";
import { SEO } from "../components/SEO";

const features = [
  {
    title: "Express Yourself",
    description:
      "Share moments, ideas, and creativity with the world. Your voice matters.",
    gradient: "from-pink-500 to-rose-500",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    title: "Stay Connected",
    description:
      "Build meaningful connections with people who share your passions.",
    gradient: "from-indigo-500 to-blue-500",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
        />
      </svg>
    ),
  },
  {
    title: "Beautiful Design",
    description: "Create stunning posts with our intuitive, elegant interface.",
    gradient: "from-fuchsia-500 to-purple-500",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
        />
      </svg>
    ),
  },
  {
    title: "Your Privacy",
    description:
      "Control who sees what. Your data, your rules. End-to-end encrypted.",
    gradient: "from-emerald-500 to-teal-500",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    title: "Lightning Fast",
    description:
      "Smooth, responsive experience. Built on cutting-edge edge infrastructure.",
    gradient: "from-amber-500 to-orange-500",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    title: "Real Conversations",
    description:
      "Meaningful comments and direct messages. Connect authentically without spam.",
    gradient: "from-sky-500 to-cyan-500",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    ),
  },
];

const steps = [
  {
    num: "01",
    title: "Create Account",
    desc: "Sign up in seconds using email or social. No lengthy forms or complex verifications.",
  },
  {
    num: "02",
    title: "Build Profile",
    desc: "Customize your space. Add your bio, upload your best photos, and define your vibe.",
  },
  {
    num: "03",
    title: "Start Connecting",
    desc: "Discover creators, follow your passions, and join a community that celebrates you.",
  },
];

const testimonials = [
  {
    quote:
      "Yass completely changed how I share my creative work. The design is stunning and the community is unmatched. Finally, a place that respects aesthetics.",
    author: "Sarah Chen",
    handle: "@sarah.design",
    role: "Digital Artist",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    quote:
      "No clutter, just beautiful connections and a space where my photography actually shines. The lack of algorithm noise is a breath of fresh air.",
    author: "Mike Johnson",
    handle: "@mikej_photo",
    role: "Photographer",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    quote:
      "The best social experience I've had. Clean, fast, and actually enjoyable. It feels like it was built by people who truly care about the user.",
    author: "Emma Wilson",
    handle: "@emma.dev",
    role: "Frontend Developer",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
];

export default function Landing() {

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <SEO 
        title="Welcome"
        description="Join Yass Route today. The ultimate community to explore trends, share amazing moments, and connect with people globally."
        keywords="social media, Yass Route, connect globally, share photos, social networking"
        url="/"
        type="website"
      />
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
        <motion.nav
          initial={{ y: -40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-2xl border border-white/50 dark:border-neutral-700/50 shadow-2xl shadow-neutral-900/5 dark:shadow-black/40 rounded-full px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between pointer-events-auto"
        >
          <div className="shrink-0 flex items-center">
            <div className="hidden sm:block">
              <Logo size="lg" />
            </div>
            <div className="block sm:hidden">
              <Logo size="md" />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />

            <div className="hidden sm:block w-px h-6 bg-neutral-200 dark:bg-neutral-800 mx-1" />

            <Link to="/login" className="hidden sm:block">
              <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors px-2">
                Log in
              </span>
            </Link>

            <Link to="/signup">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 dark:hover:shadow-white/20 transition-all duration-300"
              >
                Get Started
              </motion.button>
            </Link>
          </div>
        </motion.nav>
      </div>

      <section className="relative overflow-hidden pt-20 sm:pt-25 md:pt-30 lg:pt-35 pb-15 lg:pb-25 bg-neutral-50 dark:bg-neutral-950">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-400/20 dark:bg-indigo-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-400/20 dark:bg-fuchsia-600/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="max-w-2xl text-center lg:text-left z-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium text-sm mb-6 border border-indigo-200 dark:border-indigo-800/50"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                The new era of social is here
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-[1.1]">
                Your World,{" "}
                <span className="relative whitespace-nowrap">
                  <span className="relative z-10 bg-linear-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
                    Unfiltered.
                  </span>
                </span>
              </h1>

              <p className="mt-6 text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Step into Yass. The only social platform designed for authentic
                connections, stunning visual expression, and absolutely zero
                noise.
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to="/signup">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-shadow"
                  >
                    Join the Movement
                  </Button>
                </Link>
                <Link to="/app">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto flex items-center justify-center gap-2 group"
                  >
                    Explore Feeds
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex items-center justify-center lg:justify-start gap-4"
              >
                <div className="flex -space-x-3">
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-950 object-cover"
                      src={`https://i.pravatar.cc/100?img=${i + 10}`}
                      alt="User avatar"
                    />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-white dark:border-neutral-950 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-xs font-bold text-neutral-600 dark:text-neutral-300">
                    50k+
                  </div>
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  Creators already
                  <br />
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    joined Yass
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <div className="relative h-125 lg:h-150 w-full hidden md:block">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-[10%] left-[10%] w-70 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl rounded-3xl p-4 shadow-2xl shadow-neutral-200/50 dark:shadow-black/50 border border-white/50 dark:border-white/10 z-20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={Kimo}
                    alt="Kimo avatar"
                    className="w-8 h-8 rounded-full from-pink-500 to-yellow-500"
                  />
                  <div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white">
                      Kimo Mohamed
                    </div>
                    <div className="text-xs text-neutral-500">2 mins ago</div>
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600"
                  alt="Post"
                  className="w-full h-48 object-cover rounded-2xl mb-3"
                />
                <div className="flex items-center justify-between px-1">
                  <div className="flex gap-3">
                    <button className="text-pink-500 hover:scale-110 transition-transform">
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                    <button className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </button>
                  </div>
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                    1,204 likes
                  </span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute top-[40%] right-[5%] w-60 bg-indigo-600/90 backdrop-blur-md rounded-3xl rounded-tr-sm p-5 shadow-xl shadow-indigo-500/30 border border-indigo-400/30 z-30"
              >
                <p className="text-white text-sm font-medium leading-relaxed">
                  "Just published my new design portfolio on Yass! The reach is
                  insane 🔥"
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
                className="absolute top-[25%] left-[60%] w-65 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/50 dark:border-white/10 z-10 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-neutral-900 dark:text-white">
                    Profile Verified
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    You're ready to shine ✨
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 7, repeat: Infinity }}
                className="absolute top-[65%] right-[15%] w-80 bg-white/10 backdrop-blur-2xl rounded-3xl p-6 shadow-2xl border border-white/20 z-20"
              >
                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <div className="text-xs text-neutral-400">Posts</div>
                    <div className="text-xl font-bold text-white">10K</div>
                  </div>

                  <div>
                    <div className="text-xs text-neutral-400">Views</div>
                    <div className="text-xl font-bold text-white">10M</div>
                  </div>

                  <div>
                    <div className="text-xs text-neutral-400">Followers</div>
                    <div className="text-xl font-bold text-white">1M</div>
                  </div>

                  <div>
                    <div className="text-xs text-neutral-400">Shares</div>
                    <div className="text-xl font-bold text-white">70K</div>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white dark:bg-neutral-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16 lg:mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Everything you need, <br className="hidden sm:block" />
              <span className="text-neutral-400 dark:text-neutral-500 font-medium">
                perfectly placed.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] lg:auto-rows-[240px] gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2 lg:row-span-2 relative rounded-3xl overflow-hidden group bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800"
            >
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200"
                alt="Share instantly"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-8 lg:p-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-wide uppercase mb-4 border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  Live Sharing
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-3">
                  Share instantly
                </h3>
                <p className="text-neutral-300 max-w-md text-lg leading-relaxed">
                  Post photos, thoughts, and moments in seconds. High-fidelity
                  uploads that make your content shine.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative rounded-3xl overflow-hidden group bg-linear-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-blue-900/20 border border-indigo-100 dark:border-indigo-800/30 p-8 flex flex-col justify-between"
            >
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-indigo-900/50 shadow-sm border border-indigo-50 dark:border-indigo-700/50 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                🌍
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  Connect globally
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Reach people across the world without borders or barriers.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative rounded-3xl overflow-hidden group bg-linear-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-950/40 dark:to-pink-900/20 border border-fuchsia-100 dark:border-fuchsia-800/30 p-8 flex flex-col justify-between"
            >
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-fuchsia-900/50 shadow-sm border border-fuchsia-50 dark:border-fuchsia-700/50 flex items-center justify-center text-3xl group-hover:-translate-y-2 transition-transform duration-500">
                ✨
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                  Discover trends
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Smart algorithms that show you exactly what's hot right now.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative rounded-3xl overflow-hidden group bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800"
            >
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
                alt="Messages"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-700 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-neutral-900/50 to-neutral-900" />

              <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Messages that matter
                </h3>
                <p className="text-neutral-400 text-sm">
                  Real, encrypted conversations. No spam, just people you care
                  about.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 relative rounded-3xl overflow-hidden group bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800"
            >
              <img
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200"
                alt="Creative Space"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent" />

              <div className="absolute inset-y-0 left-0 p-8 lg:p-10 flex flex-col justify-center max-w-lg">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                  Your creative space
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Design your profile your way. Choose your colors, arrange your
                  grids, and let your unique personality shine through every
                  pixel.
                </p>
                <div className="mt-6 flex gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-rose-500" />
                  <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-violet-500" />
                  <div className="w-8 h-8 rounded-full border-2 border-white/20 bg-emerald-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px w-full bg-linear-to-r from-transparent via-neutral-200 dark:via-neutral-800 to-transparent" />
        <div className="absolute -left-40 top-40 w-96 h-96 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -right-40 bottom-40 w-96 h-96 bg-fuchsia-500/5 dark:bg-fuchsia-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-24"
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
              <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-semibold text-sm tracking-wide uppercase">
                Core Features
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Engineered for connection
            </h2>
            <p className="mt-6 text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              We stripped away the noise and focused on what truly matters.
              Every pixel is designed to elevate your social experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group relative p-8 rounded-3xl bg-white dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800 overflow-hidden hover:shadow-2xl hover:shadow-neutral-200/50 dark:hover:shadow-black/50 transition-all duration-500"
              >
                <div
                  className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.03] dark:group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/50 text-neutral-600 dark:text-neutral-400 group-hover:text-white transition-all duration-500 relative z-10 overflow-hidden`}
                  >
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${feature.gradient} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`}
                    />
                    <div className="relative z-20 transition-transform duration-500 group-hover:scale-110">
                      {feature.icon}
                    </div>
                  </div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-neutral-900 group-hover:to-neutral-600 dark:group-hover:from-white dark:group-hover:to-neutral-400 transition-all">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-white dark:bg-neutral-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20 lg:mb-28"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Your journey starts{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-fuchsia-500">
                here
              </span>
            </h2>
            <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Three simple steps to unlock a world of authentic connections.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden md:block absolute top-14 left-[16.66%] w-[66.66%] h-0.5 bg-neutral-100 dark:bg-neutral-800" />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "66.66%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
              className="hidden md:block absolute top-14 left-[16.66%] h-0.5 bg-linear-to-r from-indigo-500 via-purple-500 to-fuchsia-500 shadow-[0_0_15px_rgba(168,85,247,0.5)] z-0"
            />

            <div className="grid md:grid-cols-3 gap-12 lg:gap-8 relative z-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.2, duration: 0.6 }}
                  className="relative flex flex-col items-center group"
                >
                  <div className="w-28 h-28 rounded-full bg-white dark:bg-neutral-900 border-8 border-white dark:border-neutral-900 shadow-xl dark:shadow-none dark:ring-1 dark:ring-neutral-800 flex items-center justify-center relative z-20 group-hover:scale-110 transition-transform duration-500 ease-out mb-8">
                    <div className="absolute inset-0 rounded-full bg-linear-to-tr from-indigo-500 to-fuchsia-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
                    <span className="text-3xl font-black bg-linear-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                      {step.num}
                    </span>
                  </div>

                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-full relative bg-neutral-50 dark:bg-neutral-800/30 p-8 rounded-3xl border border-neutral-100 dark:border-neutral-800 text-center overflow-hidden hover:border-indigo-500/30 dark:hover:border-indigo-500/30 transition-colors duration-300"
                  >
                    <div className="absolute -top-10 -right-4 text-[150px] font-black text-neutral-900/3 dark:text-white/2 select-none pointer-events-none font-sans leading-none">
                      {step.num.replace("0", "")}
                    </div>

                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                        {step.title}
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>

                  {i < steps.length - 1 && (
                    <div className="md:hidden h-12 w-0.5 bg-linear-to-b from-indigo-500/50 to-transparent my-4" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
        <div className="absolute top-10 left-10 md:left-1/4 text-[250px] text-indigo-500/5 dark:text-indigo-500/10 font-serif leading-none select-none pointer-events-none">
          "
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 lg:mb-24"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight">
              Loved by creatives{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-rose-400 to-orange-400">
                everywhere
              </span>
            </h2>
            <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Don't just take our word for it. See what our early adopters are
              saying about their Yass experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`relative group ${i === 1 ? "md:mt-12" : ""}`}
              >
                <div className="h-full p-8 rounded-3xl bg-white/60 dark:bg-neutral-900/40 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-800/50 hover:border-indigo-500/30 dark:hover:border-indigo-400/30 shadow-xl shadow-neutral-200/20 dark:shadow-none hover:shadow-2xl transition-all duration-500 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-6 text-amber-400">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className="w-5 h-5 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-lg text-neutral-800 dark:text-neutral-200 leading-relaxed font-medium mb-8">
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="flex items-center gap-4 pt-6 border-t border-neutral-100 dark:border-neutral-800/50">
                    <div className="relative">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white dark:ring-neutral-950"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                        {t.author}
                      </h4>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 flex flex-col sm:flex-row sm:gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                          {t.handle}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span>{t.role}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative rounded-[3rem] overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-purple-900 to-black opacity-90" />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-fuchsia-500/30 rounded-full blur-[120px] pointer-events-none mix-blend-screen"
              />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
              <motion.img
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                src="https://i.pravatar.cc/100?img=1"
                className="absolute top-[15%] left-[10%] w-14 h-14 rounded-full border-2 border-white/20 shadow-xl opacity-60 blur-[1px]"
              />
              <motion.img
                animate={{ y: [0, 25, 0] }}
                transition={{ duration: 6, repeat: Infinity, delay: 1 }}
                src="https://i.pravatar.cc/100?img=2"
                className="absolute bottom-[20%] left-[15%] w-20 h-20 rounded-full border-2 border-white/20 shadow-xl opacity-40 blur-[2px]"
              />
              <motion.img
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 2 }}
                src="https://i.pravatar.cc/100?img=3"
                className="absolute top-[25%] right-[12%] w-16 h-16 rounded-full border-2 border-white/20 shadow-xl opacity-70 blur-[1px]"
              />
              <motion.img
                animate={{ y: [0, 30, 0] }}
                transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
                src="https://i.pravatar.cc/100?img=4"
                className="absolute bottom-[15%] right-[18%] w-12 h-12 rounded-full border-2 border-white/20 shadow-xl opacity-50 blur-[2px]"
              />
            </div>

            <div className="relative z-20 px-6 py-20 sm:py-24 lg:px-16 text-center">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="mx-auto w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 flex items-center justify-center mb-8 shadow-2xl"
              >
                <Logo size="lg" className="text-white drop-shadow-lg" />
              </motion.div>

              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-lg">
                Your audience <br className="hidden sm:block" />
                is waiting.
              </h2>

              <p className="mt-4 text-xl sm:text-2xl text-indigo-100/80 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                Join the fastest growing community of creators. Claim your space
                on Yass before your username is gone.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/signup" className="w-full sm:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-10 py-5 rounded-full bg-white text-indigo-950 font-bold text-lg shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    Get Started Free
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </motion.button>
                </Link>

                <p className="text-sm text-indigo-200/60 mt-4 sm:mt-0 sm:ml-4">
                  No credit card required. <br className="hidden sm:block" />{" "}
                  Takes 30 seconds.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
