'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Resume {
  id: number
  title: string
  template_name: string
  created_at: string
  updated_at: string | null
}

interface Quota {
  subscription_plan: string
  current_count: number
  max_resumes: number | null
  can_create_more: boolean
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [resumes, setResumes] = useState<Resume[]>([])
  const [quota, setQuota] = useState<Quota | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    
    if (!token) {
      router.push('/login')
      return
    }

    if (userData) {
      setUser(JSON.parse(userData))
    }

    fetchData(token)
  }, [])

  const fetchData = async (token: string) => {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      
      const [resumesRes, quotaRes] = await Promise.all([
        axios.get(`${API_URL}/resumes`, { headers }),
        axios.get(`${API_URL}/resumes/quota`, { headers })
      ])

      setResumes(resumesRes.data)
      setQuota(quotaRes.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  const handleUpgrade = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${API_URL}/stripe/create-checkout-session`,
        { plan: 'premium' },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      window.location.href = response.data.checkout_url
    } catch (error) {
      console.error('Error creating checkout session:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-lg text-gray-600 dark:text-gray-400">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
              CVtor
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Mon Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gérez tous vos CV professionnels
          </p>
        </div>

        {quota && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  Plan {quota.subscription_plan === 'free' ? 'Gratuit' : 'Premium'}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {quota.current_count} / {quota.max_resumes || '∞'} CV créés
                </p>
              </div>
              {quota.subscription_plan === 'free' && (
                <button
                  onClick={handleUpgrade}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg hover:from-indigo-700 hover:to-cyan-700 transition-all shadow-lg"
                >
                  Passer à Premium
                </button>
              )}
            </div>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Mes CV ({resumes.length})
            </h2>
            <Link
              href="/editor"
              className={`px-6 py-2 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg hover:from-indigo-700 hover:to-cyan-700 transition-all shadow-lg ${!quota?.can_create_more ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Créer un nouveau CV
            </Link>
          </div>

          {resumes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Vous n'avez pas encore créé de CV
              </p>
              <Link
                href="/editor"
                className="inline-block px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white rounded-lg hover:from-indigo-700 hover:to-cyan-700 transition-all"
              >
                Créer mon premier CV
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {resumes.map((resume) => (
                <div
                  key={resume.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {resume.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Modèle: {resume.template_name} • Créé le{' '}
                        {new Date(resume.created_at).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <Link
                      href={`/editor?resume=${resume.id}`}
                      className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                    >
                      Éditer
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
