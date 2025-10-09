import './globals.css'
import React from 'react'

export const metadata = {
  title: 'CVTOR Editor',
  description: 'Éditeur de modèles de CV',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="p-4 border-b border-slate-800 bg-slate-900/40">
          <h1 className="text-xl font-semibold">CVTOR — Éditeur</h1>
        </div>
        <main className="p-4">{children}</main>
      </body>
    </html>
  )
}
