"use client";
import {useForm} from "react-hook-form";
import {useState, useEffect, useCallback} from "react";
import axios from "axios";
import {IoEye, IoEyeOff} from "react-icons/io5";
import Logo from "@/assets/logo";
import Link from "next/link";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      toast.loading("Registering...");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/users/register`,
        {
          fullname: data.fullname,
          username: data.username,
          email: data.email,
          password: data.password,
        }
      );
      toast.success("Successfully Registered");
      router.push("/login");
    } catch (error) {
      toast.error("Failed to register");
      console.error("There was an error!", error);
    }
  };

  const checkUsernameAvailability = async (username) => {
    setCheckingUsername(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/users/checkUsernameAvailability?username=${username}`
      );
      if (response.status === 200) {
        setUsernameAvailable(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setUsernameAvailable(false);
      }
    } finally {
      setCheckingUsername(false);
    }
  };

  const debouncedCheckUsernameAvailability = useCallback();
  // debounce((username) => {
  //   checkUsernameAvailability(username);
  // }, 500),
  // []

  const username = watch("username");

  useEffect(() => {
    if (username) {
      debouncedCheckUsernameAvailability(username);
    } else {
      setUsernameAvailable(null);
    }
  }, [username, debouncedCheckUsernameAvailability]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/signupbg.jpg')] bg-cover bg-center px-4">
      <div className="w-4xl rounded-lg border border-border-100 bg-white p-4 dark:border-darkColor-400 dark:bg-darkColor-300 sm:w-[500px]">
        <h2 className="mb-4 flex items-center justify-center gap-2 border-b border-border-100 pb-4 text-center text-xl font-medium dark:border-darkColor-400">
          Sign Up to <Logo />
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block">Full Name</label>
            <input
              {...register("fullname", {required: true, minLength: 3})}
              className="w-full rounded-md border border-border-100 px-4 py-2 dark:border-darkColor-400"
            />
            {errors.fullname && (
              <span className="text-xs text-red-500">
                * Full Name is required
              </span>
            )}
          </div>

          <div>
            <label className="mb-1 block">Username</label>
            <input
              {...register("username", {
                required: true,
                pattern: /^[a-zA-Z0-9-_]+$/,
                minLength: 3,
                onBlur: () => checkUsernameAvailability(username),
              })}
              className="w-full rounded-md border border-border-100 px-4 py-2 dark:border-darkColor-400"
            />
            {usernameAvailable === false && (
              <span className="text-xs text-red-500">
                Username is not available
              </span>
            )}
            {usernameAvailable === true && username && (
              <span className="text-blue text-xs">Username is available</span>
            )}

            {errors.username && (
              <span className="text-xs text-red-500">
                Username must only contain letters, numbers, hyphens, and
                underscores
              </span>
            )}
          </div>

          <div>
            <label className="mb-1 block">Email</label>
            <input
              {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
              className="w-full rounded-md border border-border-100 px-4 py-2 dark:border-darkColor-400"
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                Valid Email is required
              </span>
            )}
          </div>

          <div>
            <label className="mb-1 block">Password</label>

            <input
              {...register("password", {required: true, minLength: 6})}
              type={showPassword ? "text" : "password"}
              className="w-full rounded-md border border-border-100 px-4 py-2 dark:border-darkColor-400"
            />
            {errors.password && (
              <span className="text-xs text-red-500">
                Password must be at least 6 characters
              </span>
            )}
          </div>

          <div>
            <label className="mb-1 block">Confirm Password</label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
                type={showPassword ? "text" : "password"}
                className="w-full rounded-md border border-border-100 px-4 py-2 dark:border-darkColor-400"
              />

              <button
                type="button"
                className="absolute inset-y-0 right-0 px-4 py-2 text-[#ddd] dark:text-darkColor-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEye /> : <IoEyeOff />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-md border-border-100 bg-gradient-primary py-2 text-white hover:bg-blue-600 dark:border-darkColor-400"
          >
            Sign Up
          </button>
        </form>
      </div>
      <Link href="/" className="py-2 text-white hover:underline">
        Back to home
      </Link>
    </main>
  );
}
