import { useForm, useWatch, type Resolver } from "react-hook-form";
import { useState, useMemo, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/lib/api";
import { Plus, Edit2, Trash2, FileText } from "lucide-react";
import { useAllContentAdminQuery, useDeleteContentMutation, useCreateContentMutation, useUpdateContentMutation } from "@/hooks/useContent";
import type { Content } from "@/hooks/useContent";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from "@/components/ui/dialog";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import type { ColumnDef } from "@tanstack/react-table";

// Zod schema for validation
const contentSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  body: z.string().min(1, "Le contenu est requis"),
  type: z.enum(["NEWS", "EVENT", "TESTIMONIAL", "ABOUT_SECTION"]),
  published: z.boolean().default(true),
  imageUrl: z.string().optional(),
});

type ContentFormValues = z.infer<typeof contentSchema>;

export const ContentPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const { data: contents, isLoading } = useAllContentAdminQuery();
    const deleteMutation = useDeleteContentMutation();
    const createMutation = useCreateContentMutation();
    const updateMutation = useUpdateContentMutation();

    const form = useForm<ContentFormValues>({
        resolver: zodResolver(contentSchema) as Resolver<ContentFormValues>,
        defaultValues: {
            title: "",
            body: "",
            type: "NEWS",
            published: true,
            imageUrl: ""
        },
    });

    const isPublished = useWatch({ control: form.control, name: "published" });
    const imageUrl = useWatch({ control: form.control, name: "imageUrl" });

    const onSubmit = (data: ContentFormValues) => {
        const payload = {
            ...data,
            imageUrl: data.imageUrl === "" ? undefined : data.imageUrl
        };

        if (editingId) {
            updateMutation.mutate({ id: editingId, ...payload }, {
                onSuccess: () => {
                    setIsOpen(false);
                    setEditingId(null);
                    form.reset();
                }
            });
        } else {
            createMutation.mutate(payload, {
                onSuccess: () => {
                    setIsOpen(false);
                    form.reset();
                }
            });
        }
    };

    const handleEdit = useCallback((item: Content) => {
        setEditingId(item.id);
        form.reset({
            title: item.title,
            body: item.body,
            type: item.type,
            published: item.published,
            imageUrl: item.imageUrl || ""
        });
        setIsOpen(true);
    }, [form]);

    const handleAddNew = () => {
        setEditingId(null);
        form.reset({
            title: "",
            body: "",
            type: "NEWS",
            published: true,
            imageUrl: ""
        });
        setIsOpen(true);
    };

    const columns = useMemo<ColumnDef<Content>[]>(() => [
        {
            accessorKey: "title",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Titre" />
            ),
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{row.getValue("title")}</span>
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
                        <Button variant="ghost" size="icon" className="hover:text-blue-600" onClick={() => handleEdit(item)}>
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
                                        Cette action est irréversible. Cela supprimera définitivement l'élément "{item.title}" de la base de données.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                    <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => deleteMutation.mutate(item.id)}>
                                        Supprimer
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                );
            },
        },
    ], [deleteMutation, handleEdit]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-800">Événements et Nouveautés</h2>
            <p className="text-muted-foreground">
                Gérez les actualités et événements affichés sur le site.
            </p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) { setEditingId(null); form.reset(); }
        }}>
            <DialogTrigger asChild>
                <Button onClick={handleAddNew} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                    Ajouter
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{editingId ? "Modifier le contenu" : "Ajouter un nouvel élément"}</DialogTitle>
                    <DialogDescription>
                        {editingId ? "Modifiez les détails ci-dessous." : "Remplissez les détails ci-dessous pour créer un nouveau contenu."}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Titre</Label>
                        <Input 
                            id="title" 
                            {...form.register("title")}
                            placeholder="Titre de l'article"
                        />
                        {form.formState.errors.title && (
                            <p className="text-sm text-red-500">{form.formState.errors.title.message}</p>
                        )}
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <select 
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            {...form.register("type")}
                        >
                            <option value="NEWS">Actualité</option>
                            <option value="EVENT">Événement</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="body">Contenu</Label>
                        <Textarea 
                            id="body" 
                            {...form.register("body")}
                            className="min-h-[100px]"
                            placeholder="Contenu de l'article..."
                        />
                        {form.formState.errors.body && (
                            <p className="text-sm text-red-500">{form.formState.errors.body.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">Image</Label>
                        <div className="flex flex-col gap-2">
                             <Input 
                                id="imageUpload" 
                                type="file" 
                                accept="image/*"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;

                                    const formData = new FormData();
                                    formData.append('image', file);

                                    try {
                                        const response = await api.post('/upload', formData, {
                                            headers: {
                                                'Content-Type': 'multipart/form-data',
                                            },
                                        });
                                        const fullUrl = response.data.filePath;
                                        form.setValue("imageUrl", fullUrl);
                                    } catch (error) {
                                        console.error("Upload failed", error);
                                        alert("Échec du téléchargement de l'image");
                                    }
                                }}
                            />
                            
                            <Input 
                                id="imageUrl" 
                                {...form.register("imageUrl")}
                                placeholder="URL de l'image (auto-rempli après upload)"
                                readOnly
                            />
                            
                            {imageUrl && (
                                <div className="relative aspect-video w-full max-w-[200px] overflow-hidden rounded-md border mt-2">
                                    <img 
                                        src={imageUrl} 
                                        alt="Aperçu" 
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label>Statut de publication</Label>
                            <div className="text-[0.8rem] text-muted-foreground">
                                {isPublished ? "Visible sur le site" : "Brouillon (caché)"}
                            </div>
                        </div>
                        <Switch 
                            checked={isPublished}
                            onCheckedChange={(checked) => form.setValue("published", checked)}
                        />
                    </div>

                    <DialogFooter>
                        <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                            {editingId ? "Enregistrer" : "Créer"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
      </div>

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
                    data={contents || []} 
                    searchKey="title" 
                />
            )}
        </CardContent>
      </Card>
    </div>
  );
};

