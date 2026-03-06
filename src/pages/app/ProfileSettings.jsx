import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useChangePassword } from "../../hooks/useUsers";
import { useAuthContext } from "../../hooks/useAuth";
import ThemeToggle from "../../components/ThemeToggle";
import { motion } from "framer-motion";

const Input = ({ label, error, ...props }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
      {label}
    </label>
    <input
      className={`w-full px-4 py-2.5 rounded-xl border ${
        error ? "border-red-500" : "border-neutral-200 dark:border-neutral-700"
      } bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all`}
      {...props}
    />
    {error && <span className="text-xs text-red-500">{error.message}</span>}
  </div>
);

export default function ProfileSettings() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { mutate: updatePassword, isPending } = useChangePassword();
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  const watchNewPassword = watch("newPassword");

  const onSubmit = (data) => {
    updatePassword(
      { password: data.currentPassword, newPassword: data.newPassword },
      {
        onSuccess: () => {
          toast.success("Password changed successfully! Please login again.");
          logout();
          navigate("/login");
        },
        onError: (error) => {
          toast.error(
            error?.response?.data?.message || "Failed to change password"
          );
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 lg:px-8">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
        Settings
      </h1>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden mb-10">
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Security & Password
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            Update your password to keep your account secure.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••"
            error={errors.currentPassword}
            {...register("currentPassword", {
              required: "Current password is required",
            })}
          />

          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            error={errors.newPassword}
            {...register("newPassword", {
              required: "New password is required",
              pattern: {
                value:
                  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                message:
                  "Must be at least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char",
              },
            })}
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="••••••••"
            error={errors.rePassword}
            {...register("rePassword", {
              required: "Please confirm your new password",
              validate: (val) =>
                val === watchNewPassword || "Passwords do not match",
            })}
          />

          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-xl transition-colors w-full sm:w-auto"
            >
              {isPending ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 overflow-hidden"
      >
        <div className="p-6 border-b border-neutral-100 dark:border-neutral-800">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Appearance
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Customize how Yass looks
          </p>
        </div>
        <div className="p-6 flex items-center justify-between">
          <div>
            <p className="font-medium text-neutral-900 dark:text-white">
              Theme
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Switch between light and dark mode
            </p>
          </div>
          <ThemeToggle />
        </div>
      </motion.section>
    </div>
  );
}