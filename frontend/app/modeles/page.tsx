'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function ModelesPage() {
  const [isDark, setIsDark] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('tous')
  const [colorFilter, setColorFilter] = useState('tous')

  const templates = [
    { 
      id: 1, 
      name: 'Classique', 
      category: 'traditionnel', 
      color: 'amber', 
      description: 'Élégant et intemporel', 
      gradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20',
      barColor: 'bg-amber-600',
      barLight: 'bg-amber-400'
    },
    { 
      id: 2, 
      name: 'Moderne', 
      category: 'créatif', 
      color: 'indigo', 
      description: 'Créatif et dynamique', 
      gradient: 'from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20',
      barColor: 'bg-indigo-600',
      barLight: 'bg-indigo-400'
    },
    { 
      id: 3, 
      name: 'Professional', 
      category: 'professionnel', 
      color: 'cyan', 
      description: 'Sobre et efficace', 
      gradient: 'from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20',
      barColor: 'bg-teal-600',
      barLight: 'bg-teal-400'
    },
    { 
      id: 4, 
      name: 'Tokyo', 
      category: 'minimaliste', 
      color: 'slate', 
      description: 'Minimaliste et épuré', 
      gradient: 'from-slate-50 to-blue-50 dark:from-slate-900/20 dark:to-blue-900/20',
      barColor: 'bg-slate-700 dark:bg-slate-500',
      barLight: 'bg-slate-500 dark:bg-slate-400'
    },
    { 
      id: 5, 
      name: 'Créatif', 
      category: 'créatif', 
      color: 'pink', 
      description: 'Audacieux et original', 
      gradient: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
      barColor: 'bg-pink-600',
      barLight: 'bg-pink-400'
    },
    { 
      id: 6, 
      name: 'Executive', 
      category: 'professionnel', 
      color: 'blue', 
      description: 'Leadership et expérience', 
      gradient: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20',
      barColor: 'bg-blue-600',
      barLight: 'bg-blue-400'
    },
    { 
      id: 7, 
      name: 'Tech', 
      category: 'créatif', 
      color: 'emerald', 
      description: 'Pour les développeurs', 
      gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
      barColor: 'bg-emerald-600',
      barLight: 'bg-emerald-400'
    },
    { 
      id: 8, 
      name: 'Simple', 
      category: 'minimaliste', 
      color: 'gray', 
      description: 'Épuré et direct', 
      gradient: 'from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20',
      barColor: 'bg-gray-600',
      barLight: 'bg-gray-400'
    },
  ]

  const filteredTemplates = templates.filter(template => {
    const categoryMatch = categoryFilter === 'tous' || template.category === categoryFilter
    const colorMatch = colorFilter === 'tous' || template.color === colorFilter
    return categoryMatch && colorMatch
  })

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-[#0f1420] transition-colors">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0f1420]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">CVtor</span>
              </Link>
              
              <div className="hidden md:flex items-center gap-6">
                <Link href="/modeles" className="text-indigo-600 dark:text-indigo-400 font-medium">Modèles</Link>
                <Link href="/#ia" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">IA</Link>
                <Link href="/tarifs" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Tarifs</Link>
                <Link href="/#footer" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</Link>
                <button 
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {isDark ? '🌞' : '🌙'}
                </button>
                <Link href="/editor" className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg hover:from-indigo-700 hover:to-cyan-700 transition-all shadow-lg shadow-indigo-500/30">
                  Créer un CV
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <div className="pt-24 pb-12">
          <div className="container mx-auto px-6">
            {/* En-tête */}
            <div className="text-center mb-12">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Nos modèles
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Choisis le modèle qui correspond à ton style et personnalise-le à ta guise
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Barre latérale des filtres */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 sticky top-28">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Filtres</h3>
                  
                  {/* Catégorie */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Catégorie</label>
                    <select 
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                    >
                      <option value="tous">Tous</option>
                      <option value="traditionnel">Traditionnel</option>
                      <option value="professionnel">Professionnel</option>
                      <option value="créatif">Créatif</option>
                      <option value="minimaliste">Minimaliste</option>
                    </select>
                  </div>

                  {/* Couleur */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Couleur</label>
                    <select 
                      value={colorFilter}
                      onChange={(e) => setColorFilter(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
                    >
                      <option value="tous">Toutes</option>
                      <option value="indigo">Indigo</option>
                      <option value="cyan">Cyan</option>
                      <option value="amber">Orange</option>
                      <option value="pink">Rose</option>
                      <option value="blue">Bleu</option>
                      <option value="emerald">Vert</option>
                      <option value="gray">Gris</option>
                    </select>
                  </div>

                  {/* Format */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Format</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">A4</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded text-indigo-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Letter</span>
                      </label>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setCategoryFilter('tous')
                      setColorFilter('tous')
                    }}
                    className="w-full mt-6 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    Réinitialiser
                  </button>
                </div>
              </aside>

              {/* Grille de modèles */}
              <div className="flex-1">
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  {filteredTemplates.length} modèle{filteredTemplates.length > 1 ? 's' : ''} trouvé{filteredTemplates.length > 1 ? 's' : ''}
                </div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.map((template) => (
                    <Link 
                      key={template.id} 
                      href={`/editor?template=${template.name.toLowerCase()}`}
                      className="group"
                    >
                      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-indigo-500">
                        <div className={`aspect-[3/4] bg-gradient-to-br ${template.gradient} p-4 relative`}>
                          <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                            <div className={`h-2 ${template.barColor} rounded w-3/4 mb-2`}></div>
                            <div className={`h-1.5 ${template.barLight} rounded w-1/2 mb-3`}></div>
                            <div className="space-y-1.5">
                              <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                              <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                              <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{template.name}</h3>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{template.description}</p>
                          <button className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                            Utiliser ce modèle
                          </button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {filteredTemplates.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">Aucun modèle ne correspond à tes critères</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-12">
          <div className="container mx-auto px-6 py-8">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 CVtor – Imaginé par Akemar Service 💡
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
