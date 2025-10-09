"use client"
import React, { useEffect, useState } from 'react'
import { useEditorStore } from '../../store/editor'
import DndList from '../../components/editor/DndList'
import Selectors from '../../components/editor/Selectors'
import StylePanel from '../../components/editor/StylePanel'
import { exportPdf, exportDocx, generateContent, previewHtml } from '../../lib/api'

export default function EditorPage() {
  const { template, data, setTemplate, setData, moveSection, selected, setSelected, updateSectionStyle } = useEditorStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [exporting, setExporting] = useState<'pdf'|'docx'|null>(null)
  const [genLoading, setGenLoading] = useState(false)
  const [previewHtmlContent, setPreviewHtmlContent] = useState<string>("")

  // chargement initial
  useEffect(() => {
    async function loadDefaults() {
      try {
        // Par défaut, on peut charger le premier template et dataset si besoin
        setLoading(false)
      } catch (e: any) {
        setError(e?.message || 'Erreur chargement')
        setLoading(false)
      }
    }
    loadDefaults()
  }, [])

  // prévisualisation HTML en direct
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

  return (
    <div className="grid grid-cols-[340px_1fr] gap-4">
      <aside className="space-y-4 p-3 rounded border border-slate-800 bg-slate-900/40">
        <Selectors />
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Sections</h3>
          <div className="text-xs text-slate-400">Glisser-déposer pour réordonner</div>
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

        {/* Boutons d’export */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <div className="text-sm font-semibold">Export</div>
          <div className="flex gap-2">
            <button
              className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50"
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
            >{exporting==='pdf'? 'Export PDF…' : 'Exporter PDF'}</button>

            <button
              className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50"
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
            >{exporting==='docx'? 'Export DOCX…' : 'Exporter DOCX'}</button>
          </div>
        </div>

        {/* Génération IA */}
        <div className="pt-4 border-t border-slate-800 space-y-2">
          <div className="text-sm font-semibold">Génération IA</div>
          <button
            className="px-3 py-2 rounded bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50"
            disabled={!template || genLoading}
            onClick={async () => {
              if (!template) return
              try {
                setGenLoading(true)
                const res = await generateContent({ role: 'Candidat', data })
                if (res?.data) setData(res.data)
              } finally { setGenLoading(false) }
            }}
          >{genLoading? 'Génération…' : 'Générer contenu'}</button>
        </div>

        {/* Panneau style */}
        <div className="pt-4 border-t border-slate-800">
          <StylePanel
            selectedIndex={selected}
            onChange={(style) => {
              if (selected==null) return
              updateSectionStyle(selected, style)
            }}
          />
        </div>
      </aside>

      <section className="border border-slate-700 rounded bg-white text-black">
        {previewHtmlContent ? (
          <iframe
            title="Preview"
            srcDoc={previewHtmlContent}
            className="w-full h-screen"
          />
        ) : (
          <div className="p-4 text-slate-400">Aucune prévisualisation disponible</div>
        )}
      </section>
    </div>
  )
}
