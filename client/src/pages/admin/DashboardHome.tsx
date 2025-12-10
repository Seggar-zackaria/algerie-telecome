
export const DashboardHome = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Registrations" value="128" change="+12%" />
        <StatCard title="Pending Approvals" value="5" change="Requires Action" urgent />
        <StatCard title="Total Views" value="1,234" change="+5%" />
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
        <p className="text-gray-500">No recent activity to show.</p>
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
