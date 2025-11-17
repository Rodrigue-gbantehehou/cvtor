// app/login/page.tsx
"use client";
import React, { useState } from "react";
import supabase from "@/lib/supabaseClient";
import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin() {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      // La session est automatiquement stockée dans Supabase client
      // Récupère le token si tu veux appeler le backend
      const session = await supabase.auth.getSession();
      const token = session.data.session?.access_token;
      console.log("token:", token);

      // Option: après login, rediriger vers dashboard
      router.push("/dashboard");
    } catch (err: any) {
      alert(err.message || "Erreur connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Connexion</h1>

        <AuthForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleLogin}
          submitLabel={loading ? "Connexion..." : "Se connecter"}
        />

        <p className="mt-4 text-sm text-gray-600">
          Pas de compte ? <a href="/register" className="text-blue-600">S'inscrire</a>
        </p>
      </div>
    </div>
  );
}
