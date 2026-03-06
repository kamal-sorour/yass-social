import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import ThemeToggle from "../../components/ThemeToggle";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  const { saveAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const loginMutation = useMutation({
    mutationFn: async (values) => {
      const { data } = await axios.post(
        `https://route-posts.routemisr.com/users/signin`,
        values
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      saveAuthData(data?.data?.token, data?.data?.user);
      localStorage.setItem("token", data?.data?.token);
      toast.success(data.message);

      setTimeout(() => {
        navigate("/app");
      }, 1500);
    },
    onError: (err) => {
      const errorMsg =
        err.response?.data?.errors ||
        err.response?.data?.message ||
        "Something went wrong";
      toast.error(errorMsg);
      console.log(err);
    },
  });

  function login(values) {
    loginMutation.mutate(values);
  }

  return (
    <>
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
            =
            <Link to="/signup" className="hidden sm:block">
              <span className="text-sm font-bold text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors px-2">
                Sign up
              </span>
            </Link>
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 sm:px-6 sm:py-2.5 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 dark:hover:shadow-white/20 transition-all duration-300"
              >
                Log in
              </motion.button>
            </Link>
          </div>
        </motion.nav>
      </div>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-neutral-50 dark:bg-neutral-950 pt-24 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] right-[20%] w-150 h-150 bg-purple-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-[20%] left-[20%] w-125 h-125 bg-indigo-500/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-5xl bg-white dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 dark:shadow-black/50 border border-neutral-200/60 dark:border-neutral-800 overflow-hidden flex flex-col md:flex-row-reverse z-10"
        >
          <div className="hidden md:flex w-full md:w-5/12 relative p-10 lg:p-12 flex-col justify-between overflow-hidden bg-neutral-950 text-white">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-linear-to-bl from-purple-900 via-indigo-900 to-black opacity-90" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-8">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                Welcome back
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                Pick up where <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-400">
                  you left off.
                </span>
              </h2>
              <p className="mt-4 text-indigo-100/80 leading-relaxed text-lg">
                Your audience has been waiting. Dive back into your creative
                space and see what's new on Yass.
              </p>
            </div>

            <motion.div
              whileHover={{ y: -5 }}
              className="relative z-10 mt-12 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
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
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-tight">
                  +124
                </p>
                <p className="text-white/60 text-sm">New followers this week</p>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative bg-white dark:bg-neutral-900">
            <div className="max-w-md mx-auto w-full relative z-10">
              <div className="md:hidden text-center mb-10">
                <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                  Welcome back
                </h1>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  Sign in to continue to Yass.
                </p>
              </div>

              <div className="hidden md:block mb-10">
                <h3 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                  Sign in to Yass
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  Enter your details to access your account.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit(login)}>
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email is not in format",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}

                <div className="space-y-1">
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "password is required",
                      pattern: {
                        value:
                          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                        message:
                          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password.message}
                    </p>
                  )}
                  <div className="flex justify-end pt-1">
                    <Link
                      to="/reset-password"
                      className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                    variant="primary"
                    size="lg"
                    className={`w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 shadow-xl shadow-neutral-900/20 dark:shadow-white/10 transition-all duration-300 flex justify-center items-center gap-2 ${
                      loginMutation.isPending
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {loginMutation.isPending ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-current"
                          xmlns="http://www.w3.org/2000/svg"
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
                        Processing...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </div>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-linear-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-neutral-200 dark:to-neutral-700" />
                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                  Or continue with
                </span>
                <div className="flex-1 h-px bg-linear-to-l from-transparent via-neutral-200 dark:via-neutral-700 to-neutral-200 dark:to-neutral-700" />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>

              <p className="mt-10 text-center text-sm text-neutral-600 dark:text-neutral-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}