"use client"
import { create } from 'zustand'

export type Section = { type: string; label: string; columns?: number; style?: any }

export type Template = {
  templateName: string
  fonts?: any
  colors?: any
  layout?: { twoColumn?: boolean; sidebarWidth?: string; margins?: string }
  sections: Section[]
}

export type ResumeData = any

type State = {
  template: Template | null
  templateName: string | null
  data: ResumeData | null
  setTemplate: (t: Template) => void
  setTemplateName: (name: string) => void
  setData: (d: ResumeData) => void
  moveSection: (from: number, to: number) => void
  selected: number | null
  setSelected: (i: number | null) => void
  updateSectionStyle: (index: number, style: Partial<{ align: string; color: string; size: number }>) => void
}

export const useEditorStore = create<State>((set, get) => ({
  template: null,
  templateName: null,
  data: null,

  setTemplate: (t) => set({ template: t, templateName: t.templateName }),
  setTemplateName: (name) => set({ templateName: name }),

  setData: (d) => set({ data: d }),

  moveSection: (from, to) => {
    const t = get().template
    if (!t) return
    const list = [...t.sections]
    const [item] = list.splice(from, 1)
    list.splice(to, 0, item)
    set({ template: { ...t, sections: list } })
  },

  selected: null,
  setSelected: (i) => set({ selected: i }),

  updateSectionStyle: (index, style) => {
    const t = get().template
    if (!t) return
    const list = t.sections.map((s, i) =>
      i === index ? { ...s, style: { ...(s.style || {}), ...style } } : s
    )
    set({ template: { ...t, sections: list } })
  }
}))
