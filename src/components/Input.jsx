export default function Input({
  label,
  error,
  className = "",
  containerClassName = "",
  ...props
}) {
  return (
    <div className={containerClassName}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-400 mb-1.5">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500
          focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500
          transition-all duration-200
          ${
            error
              ? "border-red-300 dark:border-red-700 focus:ring-red-500/30 focus:border-red-500"
              : ""
          }
          ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}