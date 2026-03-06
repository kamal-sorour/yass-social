import { motion } from "framer-motion";

const variants = {
  primary:
    "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30",
  secondary:
    "bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-neutral-700 hover:bg-white dark:hover:bg-neutral-700 hover:border-neutral-300 dark:hover:border-neutral-600",
  ghost:
    "bg-transparent text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
  outline:
    "bg-transparent border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50",
};

const sizes = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-2xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  as = "button",
  ...props
}) {
  const Component = motion[as] || motion.button;

  return (
    <Component
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center font-semibold transition-all duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}