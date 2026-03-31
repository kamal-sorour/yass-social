import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import ThemeToggle from "../../components/ThemeToggle";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { SEO } from "../../components/SEO";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      rePassword: "",
    },
    mode: "onSubmit",
  });

  const watchPassword = watch("password");

  const signupMutation = useMutation({
    mutationFn: async (values) => {
      const { data } = await axios.post(
        `https://route-posts.routemisr.com/users/signup`,
        values
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    },
    onError: (err) => {
      const errorMsg =
        err.response?.data?.errors ||
        err.response?.data?.message ||
        "Something went wrong";
      toast.error(errorMsg);
    },
  });

  function signUp(values) {
    signupMutation.mutate(values);
  }

  return (
    <>
      <SEO 
        title="Sign Up"
        description="Create your Yass Route account today. Join thousands of creators shaping the future of social media."
        keywords="Yass Route signup, create account, join social media, new user"
        url="/signup"
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

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-neutral-50 dark:bg-neutral-950 pt-24 pb-12 px-4 sm:px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] left-[20%] w-150 h-150 bg-indigo-500/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute bottom-[10%] right-[20%] w-125 h-125 bg-fuchsia-500/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-5xl bg-white dark:bg-neutral-900 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 dark:shadow-black/50 border border-neutral-200/60 dark:border-neutral-800 overflow-hidden flex flex-col md:flex-row z-10"
        >
          <div className="hidden md:flex w-full md:w-5/12 relative p-10 lg:p-12 flex-col justify-between overflow-hidden bg-neutral-950 text-white">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-purple-900 to-black opacity-90" />
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Join the beta
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                Your world, <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-fuchsia-400">
                  unfiltered.
                </span>
              </h2>
              <p className="mt-4 text-indigo-100/80 leading-relaxed text-lg">
                Join thousands of creators shaping the future of social media.
                No algorithms, just pure connection.
              </p>
            </div>

            <motion.div
              whileHover={{ y: -5 }}
              className="relative z-10 mt-12 p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
            >
              <div className="flex gap-1 mb-3 text-amber-400">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm font-medium text-white/90 italic mb-4">
                "The cleanest social experience I've ever used. Completely
                changed how I share my work."
              </p>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img
                    src="https://i.pravatar.cc/100?img=1"
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-neutral-900 object-cover"
                  />
                  <img
                    src="https://i.pravatar.cc/100?img=5"
                    alt="User"
                    className="w-8 h-8 rounded-full border-2 border-neutral-900 object-cover"
                  />
                  <div className="w-8 h-8 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-[10px] font-bold">
                    +50k
                  </div>
                </div>
                <div className="text-xs text-white/60">Creators joined</div>
              </div>
            </motion.div>
          </div>

          <div className="w-full md:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative bg-white dark:bg-neutral-900">
            <div className="max-w-md mx-auto w-full relative z-10">
              <div className="md:hidden text-center mb-10">
                <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                  Welcome to Yass
                </h1>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  Start your creative journey today.
                </p>
              </div>

              <div className="hidden md:block mb-10">
                <h3 className="text-3xl font-extrabold text-neutral-900 dark:text-white">
                  Create an account
                </h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                  Let's get you set up in seconds.
                </p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit(signUp)}>
                <div>
                  <Input
                    label="Full name"
                    type="text"
                    placeholder="Kamal Mohamed"
                    {...register("name", {
                      required: "Full name is required.",
                      minLength: {
                        value: 3,
                        message: "Full name must be at least 3 characters",
                      },
                      maxLength: {
                        value: 15,
                        message: "Full name must be at most 15 characters",
                      },
                    })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    label="User name"
                    type="text"
                    placeholder="Username"
                    {...register("username", {
                      required: "Username is required.",
                      pattern: {
                        value: /^[a-z0-9_]{3,30}$/,
                        message:
                          "Username must be between 3 and 30 characters and can only contain letters, numbers, and underscores",
                      },
                    })}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>

                <div>
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
                </div>

                <div>
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
                </div>

                <div>
                  <Input
                    label="Confirm password"
                    type="password"
                    placeholder="••••••••"
                    {...register("rePassword", {
                      required: "Confirm password is required",
                      validate: (val) => {
                        if (watchPassword != val) {
                          return "passwords are inmatch";
                        }
                      },
                    })}
                  />
                  {errors.rePassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.rePassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    label="Date of birth"
                    type="date"
                    {...register("dateOfBirth", {
                      required: "Date of birth is required",
                      validate: (value) => {
                        const selectedDate = new Date(value);
                        const currentYear = new Date().getFullYear();
                        if (currentYear - selectedDate.getFullYear() < 18) {
                          return "Age must be at least 18..";
                        }
                        return true;
                      },
                    })}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex gap-5">
                    <Input
                      label="Male"
                      type="radio"
                      value="male"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                    />
                    <Input
                      label="Female"
                      type="radio"
                      value="female"
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                    />
                  </div>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.gender.message}
                    </p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={signupMutation.isPending}
                    variant="primary"
                    size="lg"
                    className={`w-full bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-900 shadow-xl shadow-neutral-900/20 dark:shadow-white/10 transition-all duration-300 flex justify-center items-center gap-2 ${
                      signupMutation.isPending
                        ? "opacity-70 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {signupMutation.isPending ? (
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
                      "Create account"
                    )}
                  </Button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm text-neutral-600 dark:text-neutral-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}