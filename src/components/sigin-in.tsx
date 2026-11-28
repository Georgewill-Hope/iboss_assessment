"use client";

import React, { useState } from "react";
import CustomInput from "./custom-input";
import { useAuthStore } from "@/store/auth-store";

const SignIn = () => {
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);


  React.useEffect(() => {
    console.log("Updated authentication:", isAuthenticated);
  }, [isAuthenticated]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);

    const success = login(username, password);

    if (success) {
      setPending(false);
      window.location.href = "/admin/orders";
    } else {
      setPending(false);
      setError("Invalid username or password");
    }
  };

  return (
    <main className="mx-auto min-h-screen max-w-xl px-5 py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.2em] text-[#bd5c3d]">
        Nook Books administration
      </p>
      <h1 className="mt-3 font-serif text-5xl">Admin login</h1>
      <p className="mt-4 text-sm leading-6 text-[#73796f]">
        Sign in to manage bookstore orders.
      </p>
      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <CustomInput
          id="admin-username"
          label="Username"
          value={username}
          setValue={setUsername}
          type="text"
        />

        <CustomInput
          id="admin-password"
          label="Password"
          value={password}
          setValue={setPassword}
          type="password"
        />

        {error && (
          <p
            aria-live="polite"
            className="rounded-md bg-red-50 p-3 text-sm text-red-800"
          >
            {error}
          </p>
        )}
        <button
          className="w-full rounded-sm bg-[#27372d] px-5 py-4 text-sm text-white disabled:opacity-60"
          disabled={pending}
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </main>
  );
};

export default SignIn;
