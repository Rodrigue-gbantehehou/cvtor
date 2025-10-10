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
        <section className="container mx-auto px-6 py-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-6 leading-tight">
                Crée ton CV<br />
                professionnel<br />
                en quelques clics
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
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
        <section id="modeles" className="container mx-auto px-6 py-16 bg-gray-50 dark:bg-gray-900/50">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-3">Modèles</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10">
            Explore de modèles créatifs et prêts à l'emploi
          </p>
          
          <div className="grid md:grid-cols-4 gap-6">
            {/* Template Classique */}
            <Link href="/editor" className="group">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="aspect-[3/4] bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 p-4 relative">
                  <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                    <div className="h-2 bg-amber-600 rounded w-3/4 mb-2"></div>
                    <div className="h-1.5 bg-amber-400 rounded w-1/2 mb-3"></div>
                    <div className="space-y-1.5">
                      <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                      <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Classique</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Élégant et intemporel</p>
                </div>
              </div>
            </Link>

            {/* Template Moderne */}
            <Link href="/editor" className="group">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="aspect-[3/4] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 relative">
                  <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                    <div className="h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded w-3/4 mb-2"></div>
                    <div className="h-1.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded w-1/2 mb-3"></div>
                    <div className="space-y-1.5">
                      <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                      <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Moderne</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Créatif et dynamique</p>
                </div>
              </div>
            </Link>

            {/* Template Professional */}
            <Link href="/editor" className="group">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="aspect-[3/4] bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-4 relative">
                  <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm flex gap-2">
                    <div className="w-8 h-8 bg-teal-600 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-1.5 bg-teal-600 rounded w-3/4 mb-1"></div>
                      <div className="h-1 bg-teal-400 rounded w-1/2 mb-2"></div>
                      <div className="space-y-1">
                        <div className="h-0.5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="h-0.5 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Professional</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Sobre et efficace</p>
                </div>
              </div>
            </Link>

            {/* Template Tokyo */}
            <Link href="/editor" className="group">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/20 dark:to-blue-900/20 p-4 relative">
                  <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                    <div className="h-2 bg-slate-700 dark:bg-slate-500 rounded w-3/4 mb-2"></div>
                    <div className="h-1.5 bg-slate-500 dark:bg-slate-400 rounded w-1/2 mb-3"></div>
                    <div className="space-y-1.5">
                      <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                      <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Tokyo</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Minimaliste et épuré</p>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Fonctionnalités Section */}
        <section id="fonctionnalites" className="container mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-10">Fonctionnalités</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Rédaction assistée par IA</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Génère du contenu professionnel automatiquement</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Réorganise les sections en un clic</p>
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
                <p className="text-sm text-gray-600 dark:text-gray-400">Télécharge en PDF ou DOCX instantanément</p>
              </div>
            </div>
          </div>
        </section>

        {/* Témoignages Section */}
        <section id="temoignages" className="container mx-auto px-6 py-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-10">Témoignages</h2>
          
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
        <footer id="footer" className="border-t border-gray-200 dark:border-gray-800 mt-12">
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
