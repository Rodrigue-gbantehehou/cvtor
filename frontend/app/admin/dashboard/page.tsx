import { StatsCards } from '@/components/admin/StatsCards'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
          <p className="text-gray-600 mt-2">Bienvenue sur votre panel d'administration</p>
        </div>
        <Button>Générer Rapport</Button>
      </div>

      {/* Statistiques */}
      <StatsCards />

      {/* Contenu principal */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Activité récente */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité Récente</h2>
          <div className="space-y-4">
            {[
              { action: 'Nouveau template créé', user: 'John Doe', time: 'Il y a 2 min' },
              { action: 'Template modifié', user: 'Jane Smith', time: 'Il y a 15 min' },
              { action: 'Utilisateur inscrit', user: 'Mike Johnson', time: 'Il y a 1 heure' },
              { action: 'Catégorie ajoutée', user: 'Sarah Wilson', time: 'Il y a 2 heures' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">par {activity.user}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Performances */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performances</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Taux de conversion</span>
                <span className="font-medium text-gray-900">68%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Templates vendus</span>
                <span className="font-medium text-gray-900">45/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Satisfaction clients</span>
                <span className="font-medium text-gray-900">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Templates populaires */}
        <Card className="p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Templates Populaires</h2>
          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Template</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Catégorie</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Prix</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Ventes</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-600">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: 'Portfolio Pro', category: 'Professionnel', price: '€49', sales: 23, status: 'Actif' },
                  { name: 'Blog Moderne', category: 'Blog', price: '€39', sales: 18, status: 'Actif' },
                  { name: 'E-commerce', category: 'Commerce', price: '€79', sales: 12, status: 'Actif' },
                  { name: 'CV Créatif', category: 'Personnel', price: '€29', sales: 8, status: 'En pause' },
                ].map((template, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 text-sm font-medium text-gray-900">{template.name}</td>
                    <td className="py-3 text-sm text-gray-600">{template.category}</td>
                    <td className="py-3 text-sm text-gray-600">{template.price}</td>
                    <td className="py-3 text-sm text-gray-600">{template.sales}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        template.status === 'Actif' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {template.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}