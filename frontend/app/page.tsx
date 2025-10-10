'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [isDark, setIsDark] = useState(true)

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-[#0f1420] transition-colors">
        {/* Navigation */}
        <nav className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">CVtor</span>
              </div>
              
              <div className="hidden md:flex items-center gap-8">
                <a href="#modeles" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Modèles</a>
                <a href="#fonctionnalites" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">IA</a>
                <a href="#temoignages" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Tarifs</a>
                <a href="#footer" className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">Contact</a>
                <button 
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-label="Toggle theme"
                >
                  {isDark ? '🌞' : '🌙'}
                </button>
                <Link href="/editor" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Connexion
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Crée ton CV<br />
                professionnel<br />
                en quelques clics
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                CVtor t'aide à rédiger, structurer et styliser ton CV en un instant.
              </p>
              <div className="flex gap-4">
                <Link 
                  href="/editor" 
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Commencer gratuitement
                </Link>
                <Link 
                  href="#modeles" 
                  className="px-8 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 font-medium"
                >
                  Voir les modèles
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative w-full aspect-square">
                {/* Document illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-2xl transform rotate-3 p-6">
                    <div className="space-y-3">
                      <div className="h-4 bg-blue-600/30 rounded w-3/4"></div>
                      <div className="h-4 bg-blue-600/20 rounded w-1/2"></div>
                      <div className="mt-6 space-y-2">
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 text-yellow-400">✨</div>
                <div className="absolute top-1/4 -right-8 w-6 h-6 text-blue-400">•</div>
                <div className="absolute bottom-1/4 -left-8 w-6 h-6 text-blue-400">•</div>
              </div>
            </div>
          </div>
        </section>

        {/* Modèles Section */}
        <section id="modeles" className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Modèles</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12">
            Explore de modèles créatifs et prêts à l'emploi
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Évolution</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">rapide par IA</p>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Essayer ce modèle
              </button>
            </div>

            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Glisser déposer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">facile</p>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Essayer ce modèle
              </button>
            </div>

            <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Export de</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">cinématique</p>
              <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Essayer ce modèle
              </button>
            </div>
          </div>
        </section>

        {/* Fonctionnalités Section */}
        <section id="fonctionnalites" className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Fonctionnalités</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Rédaction assistée par IA</h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Glisser-déposer facile</h3>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Exporter en un clic</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages Section */}
        <section id="temoignages" className="container mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Témoignages</h2>
          
          <div className="max-w-3xl">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-lg italic mb-4">
                    "Grâce à CVtor, j'ai décroché mon premier job !"
                  </p>
                  <button className="px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm">
                    Commencer maintenant
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="footer" className="border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <a href="#" className="hover:text-gray-900 dark:hover:text-white">À propos</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white">CGU</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white">Confidentialité</a>
                <a href="#" className="hover:text-gray-900 dark:hover:text-white">Contact</a>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                © 2025 CVtor · Intégrera par Assistant Service
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
