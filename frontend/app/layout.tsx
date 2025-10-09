import './globals.css'
import React from 'react'

export const metadata = {
  title: 'CVtor - Éditeur de CV Professionnel avec IA',
  description: 'Créez un CV professionnel en quelques minutes avec l\'IA',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased">{children}</body>
    </html>
  )
}
