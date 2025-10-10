"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useEditorStore } from '../../store/editor'
import DndList from '../../components/editor/DndList'
import Selectors from '../../components/editor/Selectors'
import StylePanel from '../../components/editor/StylePanel'
import ContentEditor from '../../components/editor/ContentEditor'
import { exportPdf, exportDocx, generateContent, previewHtml } from '../../lib/api'

export default function EditorPage() {
  const { template, data, setTemplate, setData, moveSection, selected, setSelected, updateSectionStyle } = useEditorStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [exporting, setExporting] = useState<'pdf'|'docx'|null>(null)
  const [genLoading, setGenLoading] = useState(false)
  const [previewHtmlContent, setPreviewHtmlContent] = useState<string>("")
  const [aiPrompt, setAiPrompt] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    async function loadDefaults() {
      try {
        setLoading(false)
      } catch (e: any) {
        setError(e?.message || 'Erreur chargement')
        setLoading(false)
      }
    }
    loadDefaults()
  }, [])

  useEffect(() => {
    async function refreshPreview() {
      if (!template || !data) return
      try {
        const res = await previewHtml(template, data)
        setPreviewHtmlContent(res.html)
      } catch (e) {
        console.error("[preview] Erreur:", e)
      }
    }
    refreshPreview()
  }, [template, data])

  const handleGenerateAI = async () => {
    if (!template) return
    try {
      setGenLoading(true)
      const res = await generateContent({ 
        prompt: aiPrompt || undefined,
        role: aiPrompt || 'Professionnel expérimenté', 
        data 
      })
      if (res?.data) {
        setData(res.data)
        const isSuccess = res.source === 'openai' || res.source === 'huggingface'
        const message = res.message || (isSuccess
          ? 'Contenu généré avec succès par l\'IA!' 
          : 'Génération IA indisponible. Données d\'exemple utilisées.')
        alert(isSuccess ? '✅ ' + message : '⚠️ ' + message)
      }
    } catch (error: any) {
      alert('❌ Erreur: ' + (error.message || 'Une erreur est survenue'))
    } finally { 
      setGenLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header responsive */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 border-b border-indigo-500/30 shadow-lg sticky top-0 z-50">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
              <span className="text-xl sm:text-2xl font-bold text-white">CVtor</span>
              <span className="hidden sm:inline text-sm text-white/70">Éditeur</span>
            </Link>
            
            {/* Desktop actions */}
            <div className="hidden lg:flex gap-3">
              <button
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm sm:text-base font-medium transition-all disabled:opacity-50 border border-white/20"
                disabled={!template || !data || exporting!==null}
                onClick={async () => {
                  if (!template || !data) return
                  try {
                    setExporting('pdf')
                    const res = await exportPdf(template, data, 'CV_preview.pdf')
                    const url = res.url ? `${res.url}` : undefined
                    if (url) window.open(url, '_blank')
                  } finally { setExporting(null) }
                }}
              >
                {exporting==='pdf'? '⏳' : '📄'} <span className="hidden sm:inline">Exporter PDF</span>
              </button>

              <button
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm sm:text-base font-medium transition-all disabled:opacity-50"
                disabled={!template || !data || exporting!==null}
                onClick={async () => {
                  if (!template || !data) return
                  try {
                    setExporting('docx')
                    const res = await exportDocx(template, data, 'CV_preview.docx')
                    const url = res.url ? `${res.url}` : undefined
                    if (url) window.open(url, '_blank')
                  } finally { setExporting(null) }
                }}
              >
                {exporting==='docx'? '⏳' : '📝'} <span className="hidden sm:inline">Exporter DOCX</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile dropdown menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-white/20 space-y-2">
              <button
                className="w-full px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-all disabled:opacity-50 border border-white/20"
                disabled={!template || !data || exporting!==null}
                onClick={async () => {
                  if (!template || !data) return
                  try {
                    setExporting('pdf')
                    const res = await exportPdf(template, data, 'CV_preview.pdf')
                    const url = res.url ? `${res.url}` : undefined
                    if (url) window.open(url, '_blank')
                  } finally { setExporting(null); setMobileMenuOpen(false) }
                }}
              >
                {exporting==='pdf'? '⏳ Export...' : '📄 Exporter PDF'}
              </button>

              <button
                className="w-full px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-all disabled:opacity-50"
                disabled={!template || !data || exporting!==null}
                onClick={async () => {
                  if (!template || !data) return
                  try {
                    setExporting('docx')
                    const res = await exportDocx(template, data, 'CV_preview.docx')
                    const url = res.url ? `${res.url}` : undefined
                    if (url) window.open(url, '_blank')
                  } finally { setExporting(null); setMobileMenuOpen(false) }
                }}
              >
                {exporting==='docx'? '⏳ Export...' : '📝 Exporter DOCX'}
              </button>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Sidebar toggle button for mobile/tablet */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-indigo-500/50 transition-all flex items-center justify-center"
          >
            {sidebarOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

          {/* Sidebar - responsive */}
          <aside className={`
            fixed lg:static inset-y-0 left-0 z-30
            w-80 sm:w-96 lg:w-[340px] xl:w-96
            bg-slate-900 lg:bg-transparent
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto
            lg:flex-shrink-0
            pt-16 lg:pt-0
          `}>
            {/* Overlay for mobile */}
            {sidebarOpen && (
              <div
                className="lg:hidden fixed inset-0 bg-black/50 -z-10"
                onClick={() => setSidebarOpen(false)}
              />
            )}

            <div className="p-4 lg:p-0 space-y-4 lg:space-y-6 pb-24 lg:pb-0">
              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700/50 shadow-xl">
                <h2 className="text-base sm:text-lg font-bold text-white mb-4">✏️ Édition de Contenu</h2>
                <ContentEditor />
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700/50 shadow-xl">
                <h2 className="text-base sm:text-lg font-bold text-white mb-4">📋 Configuration</h2>
                <Selectors />
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700/50 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base sm:text-lg font-bold text-white">📑 Sections</h2>
                  <span className="text-xs text-slate-400">Glisser-déposer</span>
                </div>
                {loading && <div className="text-sm text-slate-400">Chargement…</div>}
                {error && <div className="text-sm text-red-400">{error}</div>}
                {!loading && template && (
                  <DndList
                    sections={template.sections}
                    onMove={moveSection}
                    selectedIndex={selected ?? undefined}
                    onSelect={(i)=>{setSelected(i); setSidebarOpen(false)}}
                  />
                )}
              </div>

              <div className="bg-gradient-to-br from-fuchsia-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-fuchsia-500/30 shadow-xl">
                <h2 className="text-base sm:text-lg font-bold text-white mb-3">✨ Génération IA</h2>
                <p className="text-xs sm:text-sm text-slate-300 mb-3">
                  Utilisez l'IA pour générer automatiquement le contenu de votre CV
                </p>
                <textarea
                  className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm mb-3 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
                  rows={3}
                  placeholder="Ex: Développeur Full Stack avec 5 ans d'expérience..."
                  value={aiPrompt}
                  onChange={(e)=>setAiPrompt(e.target.value)}
                />
                <button
                  className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white text-sm font-medium transition-all disabled:opacity-50"
                  disabled={!template || genLoading}
                  onClick={handleGenerateAI}
                >
                  {genLoading? '⏳ Génération en cours...' : '✨ Générer avec l\'IA'}
                </button>
              </div>

              <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-slate-700/50 shadow-xl">
                <h2 className="text-base sm:text-lg font-bold text-white mb-4">🎨 Style</h2>
                <StylePanel
                  selectedIndex={selected}
                  onChange={(style) => {
                    if (selected==null) return
                    updateSectionStyle(selected, style)
                  }}
                />
              </div>
            </div>
          </aside>

          {/* Preview section - responsive */}
          <section className="flex-1 bg-slate-100 rounded-xl shadow-2xl overflow-auto border border-slate-200">
            <div className="sticky top-0 bg-gradient-to-r from-slate-100 to-slate-50 px-3 sm:px-4 py-2 sm:py-3 border-b border-slate-200 z-10">
              <h2 className="text-xs sm:text-sm font-semibold text-slate-700">👁️ Prévisualisation en temps réel</h2>
            </div>
            
            <div className="flex items-start justify-center p-3 sm:p-4 lg:p-6">
              <div className="w-full max-w-[210mm] bg-white rounded-lg shadow-xl">
                {previewHtmlContent ? (
                  <iframe
                    title="Preview"
                    srcDoc={previewHtmlContent}
                    className="w-full border-0 rounded-lg"
                    style={{ 
                      height: 'calc(100vh - 200px)',
                      minHeight: '500px'
                    }}
                  />
                ) : (
                  <div className="p-8 text-center text-slate-400 flex flex-col items-center justify-center" style={{ minHeight: '500px' }}>
                    <div className="text-4xl sm:text-6xl mb-4">📄</div>
                    <p className="text-sm sm:text-base">Aucune prévisualisation disponible</p>
                    <p className="text-xs sm:text-sm mt-2">Sélectionnez un template et des données pour commencer</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
