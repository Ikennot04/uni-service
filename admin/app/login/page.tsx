"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center">
      <form className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <div className="text-2xl font-semibold">Log in</div>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            className="input validator"
            placeholder="Email"
            required
          />
          <p className="validator-hint hidden">Required</p>
        </fieldset>

        <label className="fieldset">
          <span className="label">Password</span>
          <input
            type="password"
            className="input validator"
            placeholder="Password"
            required
          />
          <span className="validator-hint hidden">Required</span>
        </label>

        <button className="btn btn-neutral mt-4" type="submit">
          Login
        </button>
        <button className="btn btn-ghost mt-1" type="reset">
          Reset
        </button>
      </form>
    </div>
  );
}
