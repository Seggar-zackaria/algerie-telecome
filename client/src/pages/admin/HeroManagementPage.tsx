import { useState, useCallback } from "react";
import { Plus } from "lucide-react";
import { useHeroSlides, useDeleteHeroSlideMutation } from "@/hooks/useHeroSlide";
import { Button } from "@/components/ui/button";
import type { HeroSlide } from "@/services/heroSlide.service";
import { HeroSlideList } from "./components/HeroSlideList";
import { HeroSlideForm } from "./components/HeroSlideForm";

export function HeroManagementPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  
  const { data: slides, isLoading } = useHeroSlides();
  const deleteMutation = useDeleteHeroSlideMutation();

  const handleEdit = useCallback((slide: HeroSlide) => {
    setEditingSlide(slide);
    setIsOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
      deleteMutation.mutate(id);
  }, [deleteMutation]);

  const handleAddNew = () => {
      setEditingSlide(null);
      setIsOpen(true);
  }

  const handleSuccess = () => {
      // Form component handles closing, but we might want to trigger toast here or just rely on react-query invalidation
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Hero Section</h2>
          <p className="text-muted-foreground">
            Manage the slides displayed on the home page hero carousel.
          </p>
        </div>
        <Button onClick={handleAddNew}>
            <Plus className="mr-2 h-4 w-4" /> Add Slide
        </Button>
      </div>

      <HeroSlideList 
        slides={slides} 
        isLoading={isLoading} 
        onEdit={handleEdit} 
        onDelete={handleDelete}
      />

      <HeroSlideForm 
        isOpen={isOpen}
        onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) setEditingSlide(null);
        }}
        editingSlide={editingSlide}
        onSuccess={handleSuccess}
        slideCount={slides ? slides.length : 0}
      />
    </div>
  );
}
