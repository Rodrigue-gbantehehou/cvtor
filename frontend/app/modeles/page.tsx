'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Category {
  id: number
  name: string
  slug: string
  description?: string
}

interface Template {
  id: number
  title: string
  slug: string
  description?: string
  price: number
  thumbnail_url?: string
  category?: Category
  is_active: boolean
}

export default function ModelesPage() {
  const [isDark, setIsDark] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('tous')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [templates, setTemplates] = useState<Template[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTemplates()
    fetchCategories()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/templates`)
      setTemplates(response.data)
    } catch (error) {
      console.error('Error fetching templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/categories`)
      setCategories(response.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const filteredTemplates = templates.filter(template => {
    const categoryMatch = categoryFilter === 'tous' || template.category?.slug === categoryFilter
    return categoryMatch
  })

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-[#0f1420] transition-colors">
        {/* Navbar responsive */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0f1420]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 py-4">
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
                <Link href="/modeles" className="block px-4 py-2 text-indigo-600 dark:text-indigo-400 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Modèles
                </Link>
                <Link href="/#ia" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  IA
                </Link>
                <Link href="/tarifs" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  Tarifs
                </Link>
                <Link href="/#footer" className="block px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
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

        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6">
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
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button 
                    onClick={() => {
                      setCategoryFilter('tous')
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
                
                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400">Chargement des templates...</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                      <Link 
                        key={template.id} 
                        href={`/editor?template=${template.slug}`}
                        className="group"
                      >
                        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-indigo-500">
                          {template.thumbnail_url ? (
                            <div className="aspect-[3/4] relative">
                              <img 
                                src={`${API_URL}${template.thumbnail_url}`} 
                                alt={template.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="aspect-[3/4] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 relative">
                              <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm">
                                <div className="h-2 bg-indigo-600 rounded w-3/4 mb-2"></div>
                                <div className="h-1.5 bg-indigo-400 rounded w-1/2 mb-3"></div>
                                <div className="space-y-1.5">
                                  <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                                  <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-5/6"></div>
                                  <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded w-4/6"></div>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-semibold text-gray-900 dark:text-white">{template.title}</h3>
                              {template.price > 0 && (
                                <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{template.price}€</span>
                              )}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{template.description || 'Template professionnel'}</p>
                            {template.category && (
                              <span className="inline-block text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded mb-3">
                                {template.category.name}
                              </span>
                            )}
                            <button className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                              Utiliser ce modèle
                            </button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

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
