import { StatsCards } from '@/components/admin/StatsCards';
import { Card } from '@/components/admin/ui/Card';
import { Button } from "@/components/admin/ui/Button";
import { getDashboardStats } from '@/lib/services/adminService';

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord Admin</h1>
          <p className="text-gray-600 mt-2">Bienvenue sur votre panel d'administration</p>
        </div>
        <Button>Générer un rapport</Button>
      </div>

      {/* Statistiques */}
      <StatsCards />

      {/* Contenu principal */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Derniers utilisateurs */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Derniers utilisateurs</h2>
            <Button variant="outline" size="sm">Voir tout</Button>
          </div>
          <div className="space-y-4">
            {stats.recentUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                  {user.profile?.full_name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{user.profile?.full_name || 'Utilisateur sans nom'}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {formatDate(user.created_at)}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Derniers exports */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Derniers exports</h2>
            <Button variant="outline" size="sm">Voir tout</Button>
          </div>
          <div className="space-y-4">
            {stats.recentExports.map((exp) => (
              <div key={exp.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  exp.status === 'done' ? 'bg-green-100 text-green-600' :
                  exp.status === 'failed' ? 'bg-red-100 text-red-600' :
                  'bg-yellow-100 text-yellow-600'
                }`}>
                  {exp.format.toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {exp.resume?.title || 'CV sans titre'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {exp.status === 'done' ? 'Export réussi' :
                     exp.status === 'failed' ? 'Échec de l\'export' :
                     'En cours de traitement'}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  {formatDate(exp.created_at)}
                </span>
              </div>
            ))}
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