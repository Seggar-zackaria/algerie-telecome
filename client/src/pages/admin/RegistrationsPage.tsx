import { useState, useEffect } from "react";
import api from "@/lib/api";
import { Check, X, Search } from "lucide-react";

interface Registration {
  id: string;
  fullName: string;
  email: string;
  type: string;
  status: string;
  createdAt: string;
}

export const RegistrationsPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data } = await api.get("/registrations");
      setRegistrations(data);
    } catch (error) {
      console.error("Failed to fetch registrations", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      await api.patch(`/registrations/${id}`, { status });
      fetchRegistrations();
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Registrations</h1>
        <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Name</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Type</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {loading ? (
              <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : registrations.map((reg) => (
              <tr key={reg.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{reg.fullName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{reg.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{reg.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    reg.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                    reg.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {reg.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(reg.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 flex gap-2">
                  {reg.status === 'PENDING' && (
                    <>
                      <button onClick={() => updateStatus(reg.id, 'APPROVED')} className="p-1 text-green-600 hover:bg-green-50 rounded"><Check className="w-4 h-4" /></button>
                      <button onClick={() => updateStatus(reg.id, 'REJECTED')} className="p-1 text-red-600 hover:bg-red-50 rounded"><X className="w-4 h-4" /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
