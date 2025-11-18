import { Card } from './ui/Card'
import { getDashboardStats } from '@/lib/services/adminService';

interface StatCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: string;
  trend: 'up' | 'down' | 'stable';
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'orange';
}

export async function StatsCards() {
  const stats = await getDashboardStats()

  const statsCards: StatCardProps[] = [
    {
      title: 'Utilisateurs',
      value: stats.totalUsers,
      description: 'Utilisateurs inscrits',
      icon: '👥',
      trend: 'up',
      color: 'blue'
    },
    {
      title: 'CV Créés',
      value: stats.totalResumes,
      description: 'CV générés au total',
      icon: '📄',
      trend: 'up',
      color: 'green'
    },
    {
      title: 'Modèles',
      value: stats.totalTemplates,
      description: 'Modèles disponibles',
      icon: '🎨',
      trend: 'stable',
      color: 'purple'
    },
    {
      title: 'Exports',
      value: stats.totalExports,
      description: `PDF: ${stats.exportsByType.pdf} • DOCX: ${stats.exportsByType.docx}`,
      icon: '📤',
      trend: 'up',
      color: 'orange'
    }
  ]

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {statsCards.map((stat, index) => (
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
              stat.color === 'orange' ? 'bg-orange-100' :
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