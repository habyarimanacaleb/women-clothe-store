"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormInputs } from "@/utils/zod.schema";
import { useAuth } from "@/lib/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      const res = await fetch("/api/clients/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Registration failed");

      // Use context to log in immediately
      login(json.token, json.user);
      toast.success("Registered successfully!");
      setIsSubmitted(true);
      navigate.push("/login");
    } catch (err: any) {
      toast.error(err.message || "Registration error");
    }
  };

  return (
    <div className="max-w-md h-screen mx-auto mt-10 p-6 bg-white shadow rounded flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full p-2 border rounded-md focus:ring-purple-500 border-purple-100"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

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

        <select
          {...register("role")}
          className="w-full p-2 border rounded-md focus:ring-purple-500 border-purple-100"
        >
          <option value="">Select Role</option>
          <option value="client">Client</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && (
          <p className="text-red-500 text-sm">{errors.role.message}</p>
        )}

        <button
          type="submit"
          className="w-full p-2 bg-purple-600  text-white rounded-lg hover:bg-purple-700"
        >
          {isSubmitted ? (
        <div className="flex items-center justify-center space-x-2">
        <div className="w-8 h-8 rounded-full animate-spin border-2 border-t-transparent border-blue-400"></div>
        <span className="ml-2">Registering...</span>
        </div>
          ) : ("Register")}
        </button>

        <p className="text-sm mt-2">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
