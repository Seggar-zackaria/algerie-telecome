import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { useRegistrationsQuery, useUpdateRegistrationStatusMutation } from "@/hooks/useRegistrations";
import type { Registration } from "@/hooks/useRegistrations";
import { Check, X, Eye } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


export const RegistrationsPage = () => {
  const { data: registrations, isLoading } = useRegistrationsQuery();
  const updateStatusMutation = useUpdateRegistrationStatusMutation();

  const columns: ColumnDef<Registration>[] = [
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nom" />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
    },
    {
      accessorKey: "status",
      header: "Statut",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            variant={
              status === "APPROVED"
                ? "default" // You might want custom variants in Badge for colors
                : status === "REJECTED"
                ? "destructive"
                : "secondary"
            }
            className={
                status === "APPROVED" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                status === "REJECTED" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
            }
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => {
        return new Date(row.getValue("createdAt")).toLocaleDateString();
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const registration = row.original;

        return (
          <div className="flex gap-2">
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                    >
                        <Eye className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Détails de l'Inscription</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="font-semibold text-sm text-gray-500">Nom Complet</h4>
                                <p className="text-gray-900">{registration.fullName}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-gray-500">Email</h4>
                                <p className="text-gray-900">{registration.email}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-gray-500">Téléphone</h4>
                                <p className="text-gray-900">{registration.phone}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-sm text-gray-500">Type</h4>
                                <p className="text-gray-900 capitalize">{registration.type}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-sm text-gray-500">Centre</h4>
                                <p className="text-gray-900">{registration.center || '-'}</p>
                            </div>
                             <div>
                                <h4 className="font-semibold text-sm text-gray-500">Nature de l'espace</h4>
                                <p className="text-gray-900 capitalize">{registration.spaceType?.replace(/_/g, ' ') || '-'}</p>
                            </div>
                             <div className="col-span-2">
                                <h4 className="font-semibold text-sm text-gray-500">Message</h4>
                                <p className="text-gray-900 whitespace-pre-wrap">{registration.message || '-'}</p>
                            </div>
                             <div className="col-span-2">
                                <h4 className="font-semibold text-sm text-gray-500">Date</h4>
                                <p className="text-gray-900">{new Date(registration.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {registration.status === "PENDING" && (
                <>
                    <Button
                    variant="ghost"
                    size="icon"
                    className="text-green-600 hover:bg-green-50 hover:text-green-700"
                    onClick={() =>
                        updateStatusMutation.mutate({
                        id: registration.id,
                        status: "APPROVED",
                        })
                    }
                    disabled={updateStatusMutation.isPending}
                    >
                    <Check className="w-4 h-4" />
                    </Button>
                    <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() =>
                        updateStatusMutation.mutate({
                        id: registration.id,
                        status: "REJECTED",
                        })
                    }
                    disabled={updateStatusMutation.isPending}
                    >
                    <X className="w-4 h-4" />
                    </Button>
                </>
            )}
          </div>
        );
      },
    },
  ];

  if (isLoading) {
      return <div>Chargement...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Inscriptions</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden p-4">
        <DataTable 
            columns={columns} 
            data={registrations || []} 
            searchKey="email" 
        />
      </div>
    </div>
  );
};
