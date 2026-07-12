"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useLogin } from "../../../hooks/admin/useLogin";

export default function LoginForm(): React.JSX.Element {
  const { form, serverError, isLoading, onSubmit } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-yellow-500/20 bg-[#1A1A1A] p-8 shadow-2xl">

        {/* Header */}

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-wider text-yellow-500">
            ZASHAM
          </h1>

          <p className="mt-1 text-xs uppercase tracking-[0.35em] text-gray-400">
            Enterprises
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-white">
            Admin Login
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              placeholder="admin@zashamenterprises.com"
              {...register("email")}
              className="w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 text-white outline-none transition focus:border-yellow-500"
            />

            {errors.email && (
              <p className="mt-2 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className="w-full rounded-lg border border-yellow-500/20 bg-[#111111] px-4 py-3 pr-12 text-white outline-none transition focus:border-yellow-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Server Error */}

          {serverError && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {serverError}
            </div>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-yellow-500 px-4 py-3 font-semibold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-gray-500">
          © 2026 Zasham Enterprises
        </p>
      </div>
    </div>
  );
}