import { useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { useAllContentAdminQuery, useDeleteContentMutation } from "@/hooks/useContent";
import type { Content } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { ContentList } from "./components/ContentList";
import { ContentForm } from "./components/ContentForm";

export const ContentPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingContent, setEditingContent] = useState<Content | null>(null);

    const { data: contents, isLoading } = useAllContentAdminQuery();
    const deleteMutation = useDeleteContentMutation();

    const handleEdit = useCallback((item: Content) => {
        setEditingContent(item);
        setIsOpen(true);
    }, []);

    const handleDelete = useCallback((id: string) => {
        deleteMutation.mutate(id);
    }, [deleteMutation]);

    const handleAddNew = () => {
        setEditingContent(null);
        setIsOpen(true);
    };

    const handleSuccess = () => {
        setIsOpen(false);
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-800">Événements et Nouveautés</h2>
            <p className="text-muted-foreground">
                Gérez les actualités et événements affichés sur le site.
            </p>
        </div>
        
        <Button onClick={handleAddNew} className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Ajouter
        </Button>

        <ContentForm 
            isOpen={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) setEditingContent(null);
            }}
            editingContent={editingContent}
            onSuccess={handleSuccess}
        />
      </div>

      <ContentList 
        data={contents || []} 
        isLoading={isLoading} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
      />
    </div>
  );
};
