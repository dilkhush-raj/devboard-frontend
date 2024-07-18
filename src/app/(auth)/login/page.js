"use client";
import {useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";
import {IoEye, IoEyeOff} from "react-icons/io5";
import Logo from "@/assets/logo";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";
import useUserStore from "@/stores/useUserStore";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const updateUser = useUserStore((state) => state.setUser);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_SERVER_BASE_URL}/api/v1/users/login`,
        {
          username: data.username,
          password: data.password,
        },
        {
          withCredentials: true, // This is important to include cookies in requests
        }
      );
      const user = response.data.user;
      updateUser(user);
      toast.success("Successfully Logged In");
      router.push("/");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Invalid username or password");
      } else {
        toast.error("Failed to login");
      }
      console.error("There was an error!", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/loginbg.jpg')] bg-cover bg-center px-4">
      <div className="w-4xl rounded-lg border border-border-100 bg-white p-4 dark:border-darkColor-400 dark:bg-darkColor-300 sm:w-[500px]">
        <h2 className="mb-4 flex items-center justify-center gap-2 border-b border-border-100 pb-4 text-center text-xl font-medium dark:border-darkColor-400">
          Log In to <Logo />
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block">Username</label>
            <input
              {...register("username", {
                required: true,
                pattern: /^[a-zA-Z0-9-_]+$/,
                minLength: 3,
              })}
              className="w-full rounded-md border border-border-100 px-4 py-2 dark:border-darkColor-400"
            />
            {errors.username && (
              <span className="text-xs text-red-500">
                Username must only contain letters, numbers, hyphens, and
                underscores
              </span>
            )}
          </div>

          <div>
            <label className="mb-1 block">Password</label>
            <div className="relative">
              <input
                {...register("password", {required: true, minLength: 6})}
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
            {errors.password && (
              <span className="text-xs text-red-500">
                Password must be at least 6 characters
              </span>
            )}
          </div>

          <button
            type="submit"
            className="hover:bg-blue-600 w-full rounded-md border-border-100 bg-gradient-primary py-2 text-white dark:border-darkColor-400"
          >
            Log In
          </button>
        </form>
      </div>
      <Link href="/" className="py-2 text-white hover:underline">
        Back to home
      </Link>
    </main>
  );
}
