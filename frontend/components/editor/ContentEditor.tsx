"use client"
import React, { useState } from 'react'
import { useEditorStore } from '../../store/editor'

export default function ContentEditor() {
  const { data, setData } = useEditorStore()
  const [activeTab, setActiveTab] = useState<'profile' | 'summary' | 'experience' | 'skills'>('profile')

  if (!data) {
    return (
      <div className="text-sm text-slate-400">
        Chargez des données pour commencer l'édition
      </div>
    )
  }

  const updateProfile = (key: string, value: string) => {
    setData({
      ...data,
      profile: { ...data.profile, [key]: value }
    })
  }

  const updateContact = (key: string, value: string) => {
    setData({
      ...data,
      profile: {
        ...data.profile,
        contacts: { ...data.profile?.contacts, [key]: value }
      }
    })
  }

  const updateSummary = (value: string) => {
    setData({ ...data, summary: value })
  }

  const addExperience = () => {
    setData({
      ...data,
      experience: [
        ...(data.experience || []),
        { company: 'Nouvelle entreprise', role: 'Poste', start: '2024', end: 'Présent', bullets: ['Réalisation'] }
      ]
    })
  }

  const updateExperience = (index: number, field: string, value: any) => {
    const experiences = [...(data.experience || [])]
    experiences[index] = { ...experiences[index], [field]: value }
    setData({ ...data, experience: experiences })
  }

  const deleteExperience = (index: number) => {
    const experiences = [...(data.experience || [])]
    experiences.splice(index, 1)
    setData({ ...data, experience: experiences })
  }

  const addSkillGroup = () => {
    setData({
      ...data,
      skills: {
        groups: [
          ...(data.skills?.groups || []),
          { label: 'Nouvelle catégorie', items: ['Compétence'] }
        ]
      }
    })
  }

  const updateSkillGroup = (index: number, field: string, value: any) => {
    const groups = [...(data.skills?.groups || [])]
    groups[index] = { ...groups[index], [field]: value }
    setData({ ...data, skills: { groups } })
  }

  const deleteSkillGroup = (index: number) => {
    const groups = [...(data.skills?.groups || [])]
    groups.splice(index, 1)
    setData({ ...data, skills: { groups } })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-slate-700 pb-2">
        {(['profile', 'summary', 'experience', 'skills'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-t text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
            }`}
          >
            {tab === 'profile' && '👤 Profil'}
            {tab === 'summary' && '📝 Résumé'}
            {tab === 'experience' && '💼 Expérience'}
            {tab === 'skills' && '🔧 Compétences'}
          </button>
        ))}
      </div>

      <div className="max-h-[600px] overflow-y-auto pr-2 space-y-4">
        {activeTab === 'profile' && (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Nom</label>
              <input
                type="text"
                value={data.profile?.name || ''}
                onChange={(e) => updateProfile('name', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Titre</label>
              <input
                type="text"
                value={data.profile?.title || ''}
                onChange={(e) => updateProfile('title', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Photo (URL)</label>
              <input
                type="text"
                value={data.profile?.photo || ''}
                onChange={(e) => updateProfile('photo', e.target.value)}
                placeholder="https://exemple.com/photo.jpg"
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Email</label>
              <input
                type="email"
                value={data.profile?.contacts?.envelope || ''}
                onChange={(e) => updateContact('envelope', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Téléphone</label>
              <input
                type="text"
                value={data.profile?.contacts?.phone || ''}
                onChange={(e) => updateContact('phone', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Localisation</label>
              <input
                type="text"
                value={data.profile?.contacts?.['map-marker-alt'] || ''}
                onChange={(e) => updateContact('map-marker-alt', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">LinkedIn</label>
              <input
                type="text"
                value={data.profile?.contacts?.linkedin || ''}
                onChange={(e) => updateContact('linkedin', e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        {activeTab === 'summary' && (
          <div>
            <label className="text-xs text-slate-400 block mb-2">Résumé professionnel</label>
            <textarea
              value={data.summary || ''}
              onChange={(e) => updateSummary(e.target.value)}
              rows={8}
              className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Décrivez votre profil professionnel..."
            />
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-4">
            <button
              onClick={addExperience}
              className="w-full px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
            >
              + Ajouter une expérience
            </button>
            {(data.experience || []).map((exp: any, idx: number) => (
              <div key={idx} className="bg-slate-700/50 rounded-lg p-3 space-y-2 border border-slate-600">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-indigo-400">Expérience #{idx + 1}</span>
                  <button
                    onClick={() => deleteExperience(idx)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
                <input
                  type="text"
                  value={exp.company || ''}
                  onChange={(e) => updateExperience(idx, 'company', e.target.value)}
                  placeholder="Entreprise"
                  className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-white text-sm"
                />
                <input
                  type="text"
                  value={exp.role || ''}
                  onChange={(e) => updateExperience(idx, 'role', e.target.value)}
                  placeholder="Poste"
                  className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-white text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={exp.start || ''}
                    onChange={(e) => updateExperience(idx, 'start', e.target.value)}
                    placeholder="Début"
                    className="bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-white text-sm"
                  />
                  <input
                    type="text"
                    value={exp.end || ''}
                    onChange={(e) => updateExperience(idx, 'end', e.target.value)}
                    placeholder="Fin"
                    className="bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-white text-sm"
                  />
                </div>
                <textarea
                  value={(exp.bullets || []).join('\n')}
                  onChange={(e) => updateExperience(idx, 'bullets', e.target.value.split('\n'))}
                  placeholder="Réalisations (une par ligne)"
                  rows={3}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-white text-sm"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-4">
            <button
              onClick={addSkillGroup}
              className="w-full px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium"
            >
              + Ajouter une catégorie
            </button>
            {(data.skills?.groups || []).map((group: any, idx: number) => (
              <div key={idx} className="bg-slate-700/50 rounded-lg p-3 space-y-2 border border-slate-600">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-indigo-400">Catégorie #{idx + 1}</span>
                  <button
                    onClick={() => deleteSkillGroup(idx)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    🗑️ Supprimer
                  </button>
                </div>
                <input
                  type="text"
                  value={group.label || ''}
                  onChange={(e) => updateSkillGroup(idx, 'label', e.target.value)}
                  placeholder="Nom de la catégorie"
                  className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-white text-sm"
                />
                <textarea
                  value={(group.items || []).join('\n')}
                  onChange={(e) => updateSkillGroup(idx, 'items', e.target.value.split('\n').filter(s => s.trim()))}
                  placeholder="Compétences (une par ligne)"
                  rows={4}
                  className="w-full bg-slate-800 border border-slate-600 rounded px-2 py-1.5 text-white text-sm"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
