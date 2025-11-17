"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEditorStore } from '../../store/editor'
import DndList from '../../components/editor/DndList'
import Selectors from '../../components/editor/Selectors'
import StylePanel from '../../components/editor/StylePanel'
import ContentEditor from '../../components/editor/ContentEditor'
import { exportPdf, exportDocx, generateContent, previewHtml } from '../../lib/api'
import supabase from '../../lib/supabaseClient'

export default function EditorPage() {
  const router = useRouter()
  const { template, data, setTemplate, setData, moveSection, selected, setSelected, updateSectionStyle } = useEditorStore()

  // ---------- Auth ----------
  const [loadingUser, setLoadingUser] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        router.push('/login')
        return
      }
      const { data: userData } = await supabase.auth.getUser()
      setUser(userData.user)
      setLoadingUser(false)
    }

    checkUser()

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) router.push('/login')
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  if (loadingUser) return <div className="flex items-center justify-center h-screen text-white">Chargement utilisateur…</div>

  // ---------- Editor State ----------
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
      try { setLoading(false) }
      catch (e: any) { setError(e?.message || 'Erreur chargement'); setLoading(false) }
    }
    loadDefaults()
  }, [])

  useEffect(() => {
    async function refreshPreview() {
      if (!template || !data) return
      try {
        const res = await previewHtml(template, data)
        setPreviewHtmlContent(res.html)
      } catch (e) { console.error("[preview] Erreur:", e) }
    }
    refreshPreview()
  }, [template, data])

  const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    return session?.access_token
  }

  // ---------- Handlers ----------
  const handleGenerateAI = async () => {
    if (!template) return
    try {
      setGenLoading(true)
      const token = await getToken()
      const res = await generateContent({
        prompt: aiPrompt || undefined,
        role: aiPrompt || 'Professionnel expérimenté',
        data
      }, token)
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
    } finally { setGenLoading(false) }
  }

  const handleExport = async (format: 'pdf' | 'docx') => {
    if (!template || !data) return
    try {
      setExporting(format)
      const token = await getToken()
      const res = format === 'pdf'
        ? await exportPdf(template, data, `CV_preview.pdf`, token)
        : await exportDocx(template, data, `CV_preview.docx`, token)
      if (res?.url) window.open(res.url, '_blank')
    } finally { setExporting(null) }
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
                onClick={() => handleExport('pdf')}
              >
                {exporting==='pdf'? '⏳' : '📄'} <span className="hidden sm:inline">Exporter PDF</span>
              </button>

              <button
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm sm:text-base font-medium transition-all disabled:opacity-50"
                disabled={!template || !data || exporting!==null}
                onClick={() => handleExport('docx')}
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
                onClick={() => handleExport('pdf')}
              >
                {exporting==='pdf'? '⏳ Export...' : '📄 Exporter PDF'}
              </button>

              <button
                className="w-full px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium transition-all disabled:opacity-50"
                disabled={!template || !data || exporting!==null}
                onClick={() => handleExport('docx')}
              >
                {exporting==='docx'? '⏳ Export...' : '📝 Exporter DOCX'}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main editor + sidebar + preview */}
      <div className="max-w-screen-2xl mx-auto p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Sidebar et sections restent identiques */}
          {/* ...ton code pour sidebar, ContentEditor, Selectors, StylePanel, DnDList, IA... */}

          {/* Preview section */}
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
                    style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}
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
