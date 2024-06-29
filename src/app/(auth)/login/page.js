"use client";
import {useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";
import {IoEye, IoEyeOff} from "react-icons/io5";
import Logo from "@/assets/logo";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {toast} from "react-hot-toast";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        {
          username: data.username,
          password: data.password,
        }
      );
      toast.success("Successfully Logged In");
      localStorage.setItem("accessToken", response.data.data.accessToken);
      localStorage.setItem("refreshToken", response.data.data.refreshToken);
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
      <div className="dark:bg-darkColor-300 w-4xl border-border-100 dark:border-darkColor-400 rounded-lg border bg-white p-4 sm:w-[500px]">
        <h2 className="border-border-100 dark:border-darkColor-400 mb-4 flex items-center justify-center gap-2 border-b pb-4 text-center text-xl font-medium">
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
              className="border-border-100 dark:border-darkColor-400 w-full rounded-md border px-4 py-2"
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
                className="border-border-100 dark:border-darkColor-400 w-full rounded-md border px-4 py-2"
              />
              <button
                type="button"
                className="dark:text-darkColor-400 absolute inset-y-0 right-0 px-4 py-2 text-[#ddd]"
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
            className="border-border-100 dark:border-darkColor-400 bg-gradient-primary w-full rounded-md py-2 text-white hover:bg-blue-600"
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
