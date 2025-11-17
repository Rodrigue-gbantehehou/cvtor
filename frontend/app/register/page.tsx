// app/register/page.tsx
"use client";
import React, { useState } from "react";
import AuthForm from "@/components/AuthForm";
import supabase from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleRegister() {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }, // stocké dans user metadata
        },
      });

      if (error) throw error;

      // Supabase envoie un e-mail de confirmation selon le settings du project
      // data peut contenir session si confirmation automatique
      console.log("signup result:", data);
      alert("Compte créé — vérifie ton email si confirmation requise.");
      router.push("/login");
    } catch (err: any) {
      alert(err.message || "Erreur inscription");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-xl">
        <h1 className="text-2xl font-bold mb-4">Créer un compte</h1>

        <AuthForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          onSubmit={handleRegister}
          submitLabel={loading ? "Création..." : "S'inscrire"}
        >
          <label className="block mb-4">
            <span className="text-sm">Nom complet</span>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </label>
        </AuthForm>
      </div>
    </div>
  );
}
