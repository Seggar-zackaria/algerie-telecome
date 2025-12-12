
import { useDashboardStatsQuery } from "@/hooks/useStats";
import { Loader2 } from "lucide-react";

export const DashboardHome = () => {
  const { data: stats, isLoading } = useDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Inscriptions Totales" 
          value={stats?.registration.total.toString() || "0"} 
          change={`${stats?.registration.pending} En attente`}
          urgent={!!stats?.registration.pending}
        />
        <StatCard 
          title="Contenus Publiés" 
          value={stats?.content.total.toString() || "0"} 
          change="Actualités & Événements" 
        />
        <StatCard 
          title="Slides Actifs" 
          value={stats?.heroSlides.active.toString() || "0"} 
          change="Sur la page d'accueil" 
        />
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Activité Récente (Nouvelles Inscriptions)</h3>
        {stats?.recentActivity && stats.recentActivity.length > 0 ? (
            <div className="space-y-4">
                {stats.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div>
                            <p className="font-medium text-gray-900">{activity.fullName}</p>
                            <p className="text-sm text-gray-500">{activity.email}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                activity.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                activity.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                                {activity.status === 'PENDING' ? 'En attente' : activity.status}
                            </span>
                            <span className="text-xs text-gray-400">
                                {new Date(activity.createdAt).toLocaleDateString('fr-FR')}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
             <p className="text-gray-500">Aucune activité récente à afficher.</p>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, urgent }: { title: string; value: string; change: string; urgent?: boolean }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">{title}</h3>
            <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{value}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded ${urgent ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                    {change}
                </span>
            </div>
        </div>
    )
}
