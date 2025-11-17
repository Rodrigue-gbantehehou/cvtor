// components/AuthForm.tsx
"use client";
import React from "react";

type Props = {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  onSubmit: () => Promise<void>;
  submitLabel?: string;
  children?: React.ReactNode;
};

export default function AuthForm({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  submitLabel = "Envoyer",
  children,
}: Props) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="max-w-md mx-auto p-6 bg-white rounded-md shadow"
    >
      <label className="block mb-2">
        <span className="text-sm">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>

      <label className="block mb-4">
        <span className="text-sm">Mot de passe</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          required
        />
      </label>

      {children}

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {submitLabel}
      </button>
    </form>
  );
}
