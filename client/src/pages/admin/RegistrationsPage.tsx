import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { useRegistrationsQuery, useUpdateRegistrationStatusMutation } from "@/hooks/useRegistrations";
import type { Registration } from "@/hooks/useRegistrations";
import { Check, X } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export const RegistrationsPage = () => {
  const { data: registrations, isLoading } = useRegistrationsQuery();
  const updateStatusMutation = useUpdateRegistrationStatusMutation();

  const columns: ColumnDef<Registration>[] = [
    {
      accessorKey: "fullName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
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
      header: "Status",
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
        if (registration.status !== "PENDING") return null;

        return (
          <div className="flex gap-2">
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
          </div>
        );
      },
    },
  ];

  if (isLoading) {
      return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Registrations</h1>
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
