import { useMemo } from "react";
import {
  DataTable,
} from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Trash2, FileText } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import { getLocalizedContent } from "@/lib/i18n-utils";
import type { Content } from "@/hooks/useContent";

interface ContentListProps {
  data: Content[];
  isLoading: boolean;
  onEdit: (item: Content) => void;
  onDelete: (id: string) => void;
}

export function ContentList({ data, isLoading, onEdit, onDelete }: ContentListProps) {
    const columns = useMemo<ColumnDef<Content>[]>(() => [
        {
            accessorKey: "title",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Titre (FR)" />
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]" title={getLocalizedContent(row.original.title, 'fr')}>
                        {getLocalizedContent(row.original.title, 'fr')}
                    </span>
                </div>
            )
        },
        {
            accessorKey: "type",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Type" />
            ),
            cell: ({ row }) => {
                const type = row.getValue("type") as string;
                const label = type === 'NEWS' ? 'ACTUALITÉ' : type === 'EVENT' ? 'ÉVÉNEMENT' : type;
                return <span className="uppercase text-xs font-semibold">{label}</span>;
            },
        },
        {
            accessorKey: "published",
            header: "Statut",
            cell: ({ row }) => {
                const published = row.getValue("published") as boolean;
                return (
                    <Badge variant={published ? "default" : "secondary"} className={published ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'}>
                        {published ? 'Publié' : 'Brouillon'}
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
                return new Date(row.getValue("createdAt")).toLocaleDateString('fr-FR');
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="hover:text-blue-600" onClick={() => onEdit(item)}>
                             <Edit2 className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Êtes-vous absolument sûr ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Cette action est irréversible. Cela supprimera définitivement l'élément "{getLocalizedContent(item.title, 'fr')}" de la base de données.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => onDelete(item.id)}>
                                        Supprimer
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                );
            },
        },
    ], [onEdit, onDelete]);

  return (
    <Card>
        <CardHeader>
            <CardTitle>Liste des contenus</CardTitle>
            <CardDescription>
                Gérez, modifiez et supprimez vos actualités et événements.
            </CardDescription>
        </CardHeader>
        <CardContent>
             {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">Chargement des données...</div>
            ) : (
                <DataTable 
                    columns={columns} 
                    data={data || []} 
                    searchKey="title" 
                />
            )}
        </CardContent>
    </Card>
  );
}
