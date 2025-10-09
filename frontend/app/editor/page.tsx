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
        const message = res.message || (res.source === 'openai' 
          ? 'Contenu généré avec succès par l\'IA!' 
          : 'Clé API OpenAI non configurée. Données d\'exemple utilisées.')
        alert(res.source === 'openai' ? '✅ ' + message : '⚠️ ' + message)
      }
    } catch (error: any) {
      alert('❌ Erreur: ' + (error.message || 'Une erreur est survenue'))
    } finally { 
      setGenLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 border-b border-indigo-500/30 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <span className="text-2xl font-bold text-white">CVtor</span>
            <span className="text-sm text-white/70">Éditeur</span>
          </Link>
          <div className="flex gap-3">
            <button
              className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-all disabled:opacity-50 border border-white/20"
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
              {exporting==='pdf'? '⏳ Export...' : '📄 Exporter PDF'}
            </button>

            <button
              className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all disabled:opacity-50"
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
              {exporting==='docx'? '⏳ Export...' : '📝 Exporter DOCX'}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto p-6 grid grid-cols-[360px_1fr_400px] gap-6">
        <aside className="space-y-6">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">📋 Configuration</h2>
            <Selectors />
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">📑 Sections</h2>
              <span className="text-xs text-slate-400">Glisser-déposer</span>
            </div>
            {loading && <div className="text-sm text-slate-400">Chargement…</div>}
            {error && <div className="text-sm text-red-400">{error}</div>}
            {!loading && template && (
              <DndList
                sections={template.sections}
                onMove={moveSection}
                selectedIndex={selected ?? undefined}
                onSelect={(i)=>setSelected(i)}
              />
            )}
          </div>

          <div className="bg-gradient-to-br from-fuchsia-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl p-5 border border-fuchsia-500/30 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-3">✨ Génération IA</h2>
            <p className="text-sm text-slate-300 mb-3">
              Utilisez l'IA pour générer automatiquement le contenu de votre CV
            </p>
            <textarea
              className="w-full bg-slate-800/80 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm mb-3 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent"
              rows={3}
              placeholder="Ex: Développeur Full Stack avec 5 ans d'expérience en React et Node.js..."
              value={aiPrompt}
              onChange={(e)=>setAiPrompt(e.target.value)}
            />
            <button
              className="w-full px-4 py-2.5 rounded-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white font-medium transition-all disabled:opacity-50"
              disabled={!template || genLoading}
              onClick={handleGenerateAI}
            >
              {genLoading? '⏳ Génération en cours...' : '✨ Générer avec l\'IA'}
            </button>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">🎨 Style</h2>
            <StylePanel
              selectedIndex={selected}
              onChange={(style) => {
                if (selected==null) return
                updateSectionStyle(selected, style)
              }}
            />
          </div>
        </aside>

        <section className="bg-slate-100 rounded-xl shadow-2xl overflow-auto border border-slate-200 flex items-start justify-center py-6">
          <div className="bg-white rounded-lg shadow-xl" style={{ width: '210mm', minHeight: '297mm' }}>
            <div className="bg-gradient-to-r from-slate-100 to-slate-50 px-4 py-3 border-b border-slate-200">
              <h2 className="text-sm font-semibold text-slate-700">👁️ Prévisualisation en temps réel</h2>
            </div>
            {previewHtmlContent ? (
              <iframe
                title="Preview"
                srcDoc={previewHtmlContent}
                className="w-full border-0"
                style={{ height: '297mm' }}
              />
            ) : (
              <div className="p-8 text-center text-slate-400" style={{ height: '297mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div className="text-6xl mb-4">📄</div>
                <p>Aucune prévisualisation disponible</p>
                <p className="text-sm mt-2">Sélectionnez un template et des données pour commencer</p>
              </div>
            )}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-5 border border-slate-700/50 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">✏️ Édition de Contenu</h2>
            <ContentEditor />
          </div>
        </aside>
      </div>
    </div>
  )
}
