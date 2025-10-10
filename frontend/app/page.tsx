'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  const [isDark, setIsDark] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-[#0f1420] transition-colors">
        {/* Navbar flottante responsive */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0f1420]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">CVtor</span>
              </div>
              
              {/* Desktop menu */}
              <div className="hidden md:flex items-center gap-6">
                <Link href="/modeles" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Modèles</Link>
                <Link href="#ia" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">IA</Link>
                <Link href="/tarifs" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Tarifs</Link>
                <Link href="#footer" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link>
                <button 
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle theme"
                >
                  {isDark ? '🌞' : '🌙'}
                </button>
                <Link href="/editor" className="px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                  Connexion
                </Link>
                <Link href="/editor" className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg hover:from-indigo-700 hover:to-cyan-700 transition-all shadow-lg shadow-indigo-500/30">
                  Créer un CV
                </Link>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {/* Mobile menu dropdown */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                <Link href="/modeles" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Modèles
                </Link>
                <Link href="#ia" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  IA
                </Link>
                <Link href="/tarifs" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Tarifs
                </Link>
                <Link href="#footer" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Contact
                </Link>
                <button 
                  onClick={() => setIsDark(!isDark)}
                  className="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  {isDark ? '🌞 Mode clair' : '🌙 Mode sombre'}
                </button>
                <Link href="/editor" className="block px-4 py-2 text-center bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg hover:from-indigo-700 hover:to-cyan-700 transition-all shadow-lg shadow-indigo-500/30">
                  Créer un CV
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section responsive */}
        <section className="container mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-12 sm:pb-20">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-indigo-100 to-cyan-100 dark:from-indigo-900/30 dark:to-cyan-900/30 rounded-full mb-4 sm:mb-6">
                <span className="text-xs sm:text-sm font-medium bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">✨ Nouveau : IA intégrée</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Crée ton CV
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-cyan-600 to-orange-500 bg-clip-text text-transparent">
                  professionnel
                </span>
                <br />
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  en quelques clics
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-lg">
                CVtor t'aide à rédiger, structurer et styliser ton CV en un instant.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link 
                  href="/editor" 
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-xl hover:from-indigo-700 hover:to-cyan-700 font-medium shadow-xl shadow-indigo-500/30 hover:shadow-2xl transition-all text-center"
                >
                  Commencer gratuitement
                </Link>
                <Link 
                  href="/modeles" 
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-indigo-600 dark:hover:border-indigo-500 font-medium transition-all text-center"
                >
                  Voir les modèles
                </Link>
              </div>
              <p className="mt-4 sm:mt-6 text-sm text-gray-500 dark:text-gray-400">
                Ton CV. Ton style. En un clic. 🚀
              </p>
            </div>
            
            <div className="relative hidden md:block">
              <div className="relative w-full aspect-square">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-80 bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-900/20 dark:to-cyan-900/20 rounded-2xl shadow-2xl transform rotate-3 p-6">
                    <div className="space-y-3">
                      <div className="h-4 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded w-3/4"></div>
                      <div className="h-4 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded w-1/2"></div>
                      <div className="mt-6 space-y-2">
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 text-3xl">✨</div>
                <div className="absolute top-1/4 -right-8 w-12 h-12 bg-orange-400 rounded-full opacity-20"></div>
                <div className="absolute bottom-1/4 -left-8 w-16 h-16 bg-cyan-400 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Modèles responsive */}
        <section id="modeles" className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Modèles professionnels
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Explore des modèles créatifs et prêts à l'emploi
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Template Classique */}
            <Link href="/editor?template=classique" className="group">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-indigo-500">
                <div className="aspect-[3/4] bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-3 sm:p-4 relative">
                  <div className="absolute inset-3 sm:inset-4 bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3 shadow-sm">
                    <div className="h-1.5 sm:h-2 bg-amber-600 rounded w-3/4 mb-1.5 sm:mb-2"></div>
                    <div className="h-1 sm:h-1.5 bg-amber-400 rounded w-1/2 mb-2 sm:mb-3"></div>
                    <div className="space-y-1 sm:space-y-1.5">
                      <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                      <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1">Classique</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">Élégant et intemporel</p>
                  <button className="hidden sm:block w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Essayer ce modèle
                  </button>
                </div>
              </div>
            </Link>

            {/* Template Moderne */}
            <Link href="/editor?template=moderne" className="group">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-indigo-500">
                <div className="aspect-[3/4] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-3 sm:p-4 relative">
                  <div className="absolute inset-3 sm:inset-4 bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3 shadow-sm">
                    <div className="h-1.5 sm:h-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded w-3/4 mb-1.5 sm:mb-2"></div>
                    <div className="h-1 sm:h-1.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded w-1/2 mb-2 sm:mb-3"></div>
                    <div className="space-y-1 sm:space-y-1.5">
                      <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                      <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1">Moderne</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">Créatif et dynamique</p>
                  <button className="hidden sm:block w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Essayer ce modèle
                  </button>
                </div>
              </div>
            </Link>

            {/* Template Professional */}
            <Link href="/editor?template=professional" className="group">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-indigo-500">
                <div className="aspect-[3/4] bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-3 sm:p-4 relative">
                  <div className="absolute inset-3 sm:inset-4 bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3 shadow-sm flex gap-2">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 bg-teal-600 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="h-1 sm:h-1.5 bg-teal-600 rounded w-3/4 mb-0.5 sm:mb-1"></div>
                      <div className="h-0.5 sm:h-1 bg-teal-400 rounded w-1/2 mb-1 sm:mb-2"></div>
                      <div className="space-y-0.5 sm:space-y-1">
                        <div className="h-0.5 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        <div className="h-0.5 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1">Professional</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">Sobre et efficace</p>
                  <button className="hidden sm:block w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Essayer ce modèle
                  </button>
                </div>
              </div>
            </Link>

            {/* Template Tokyo */}
            <Link href="/editor?template=tokyo" className="group">
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-indigo-500">
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/20 dark:to-blue-900/20 p-3 sm:p-4 relative">
                  <div className="absolute inset-3 sm:inset-4 bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3 shadow-sm">
                    <div className="h-1.5 sm:h-2 bg-slate-700 dark:bg-slate-500 rounded w-3/4 mb-1.5 sm:mb-2"></div>
                    <div className="h-1 sm:h-1.5 bg-slate-500 dark:bg-slate-400 rounded w-1/2 mb-2 sm:mb-3"></div>
                    <div className="space-y-1 sm:space-y-1.5">
                      <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                      <div className="h-0.5 sm:h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1">Tokyo</h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">Minimaliste et épuré</p>
                  <button className="hidden sm:block w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Essayer ce modèle
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Section Fonctionnalités responsive */}
        <section id="ia" className="bg-gray-50 dark:bg-gray-900/50 py-12 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Fonctionnalités puissantes
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                Tout ce dont tu as besoin pour créer un CV parfait
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-indigo-500 to-cyan-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-6 sm:w-7 h-6 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg mb-2">IA de rédaction</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Génère du contenu professionnel automatiquement avec l'IA</p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-6 sm:w-7 h-6 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg mb-2">Glisser-déposer</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Réorganise les sections facilement par glisser-déposer</p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-6 sm:w-7 h-6 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg mb-2">Export PDF/DOCX</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Télécharge ton CV en PDF ou DOCX instantanément</p>
              </div>

              <div className="bg-white dark:bg-gray-900 p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <svg className="w-6 sm:w-7 h-6 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg mb-2">Mode clair/sombre</h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Travaille avec le thème qui te convient le mieux</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Témoignages responsive */}
        <section id="temoignages" className="container mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Ce qu'ils en disent
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 rounded-2xl p-6 sm:p-8 text-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl">
                  👨‍💼
                </div>
                <div className="flex-1">
                  <p className="text-base sm:text-lg italic mb-2">
                    "Grâce à CVtor, j'ai décroché mon premier job en 2 semaines !"
                  </p>
                  <p className="text-xs sm:text-sm text-white/80">— Amadou K.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-6 sm:p-8 text-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl">
                  👩‍💻
                </div>
                <div className="flex-1">
                  <p className="text-base sm:text-lg italic mb-2">
                    "L'IA a vraiment transformé mon CV. Super outil !"
                  </p>
                  <p className="text-xs sm:text-sm text-white/80">— Marie D.</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 text-xl sm:text-2xl">
                  👨‍🎓
                </div>
                <div className="flex-1">
                  <p className="text-base sm:text-lg italic mb-2">
                    "Simple, rapide et professionnel. Je recommande !"
                  </p>
                  <p className="text-xs sm:text-sm text-white/80">— Ibrahim S.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer responsive */}
        <footer id="footer" className="border-t border-gray-200 dark:border-gray-800 mt-8 sm:mt-12">
          <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">CVtor</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ton CV. Ton style. En un clic.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Produit</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link href="/modeles" className="hover:text-indigo-600 dark:hover:text-indigo-400">Modèles</Link></li>
                  <li><Link href="/tarifs" className="hover:text-indigo-600 dark:hover:text-indigo-400">Tarifs</Link></li>
                  <li><Link href="#ia" className="hover:text-indigo-600 dark:hover:text-indigo-400">Fonctionnalités</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Entreprise</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">À propos</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Légal</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">CGU</a></li>
                  <li><a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">Confidentialité</a></li>
                </ul>
              </div>
            </div>
            
            <div className="pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                © 2025 CVtor – Imaginé par Akemar Service 💡
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
