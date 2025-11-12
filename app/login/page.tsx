"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/lib/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();
  const [isLoggesIn, setIsLoggedIn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await fetch("/api/clients/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Login failed");

      login(json.token, json.user);
      toast.success("Logged in successfully!");
      setIsLoggedIn(true);
      if (user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      toast.error(err.message || "Login error");
    }
  };

  return (
    <div className="h-screen max-w-md mx-auto mt-10 p-6 bg-white shadow rounded flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email")}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded-md focus:ring-purple-500 border-purple-100"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}

        <input
          {...register("password")}
          placeholder="Password"
          type="password"
          className="w-full p-2 border rounded-md focus:ring-purple-500 border-purple-100"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          {isLoggesIn ? (
        <div className="flex items-center justify-center space-x-2">
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-t-transparent border-blue-400"></div>
        <span className="ml-2">Logging...</span>
        </div>
          ) : ("Login")}
        </button>

        <p className="text-sm mt-2">
          Don't have an account?{" "}
          <a href="/register" className="text-purple-600">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}
