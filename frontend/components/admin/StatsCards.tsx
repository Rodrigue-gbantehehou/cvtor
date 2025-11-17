import { createClient } from '@/lib/supabase/server'
import { Card } from './ui/Card'

interface Template {
  price?: number;
  // Add other properties from the template object if needed
}

export async function StatsCards() {
  const supabase = await createClient()

  // Récupérer les statistiques
  const [
    templatesResponse,
    usersResponse,
    categoriesResponse,
    revenueResponse
  ] = await Promise.all([
    supabase.from('templates').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('templates').select('category'),
    supabase.from('templates').select('price')
  ])

  const templatesCount = templatesResponse.count || 0
  const usersCount = usersResponse.count || 0
  const categoriesCount = new Set(categoriesResponse.data?.map((t: { category: string }) => t.category)).size
  const totalRevenue = revenueResponse.data?.reduce((sum: number, template: Template) => sum + (template.price || 0), 0) || 0

  const stats = [
    {
      title: 'Total Templates',
      value: templatesCount,
      description: '+12% depuis le mois dernier',
      icon: '🎨',
      trend: 'up',
      color: 'blue'
    },
    {
      title: 'Utilisateurs',
      value: usersCount,
      description: '+8 nouveaux utilisateurs',
      icon: '👥',
      trend: 'up',
      color: 'green'
    },
    {
      title: 'Catégories',
      value: categoriesCount,
      description: 'Catégories actives',
      icon: '📁',
      trend: 'stable',
      color: 'purple'
    },
    {
      title: 'Revenu Total',
      value: `€${totalRevenue}`,
      description: '+18% depuis le mois dernier',
      icon: '💰',
      trend: 'up',
      color: 'yellow'
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className={`text-xs mt-2 ${
                stat.trend === 'up' ? 'text-green-600' : 
                stat.trend === 'down' ? 'text-red-600' : 'text-gray-500'
              }`}>
                {stat.description}
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              stat.color === 'blue' ? 'bg-blue-100' :
              stat.color === 'green' ? 'bg-green-100' :
              stat.color === 'purple' ? 'bg-purple-100' :
              'bg-yellow-100'
            }`}>
              <span className="text-2xl">{stat.icon}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}