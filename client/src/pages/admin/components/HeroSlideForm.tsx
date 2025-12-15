import { useState, useCallback, useEffect } from "react";
import { useForm, type Resolver, useWatch, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateHeroSlideMutation, useUpdateHeroSlideMutation } from "@/hooks/useHeroSlide";
import { useUploadMutation } from "@/hooks/useUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import type { HeroSlide } from "@/services/heroSlide.service";
import type { LocalizedContent } from "@/lib/i18n-utils";

import { heroSlideBodySchema as slideSchema } from "@/lib/validation";

// Ensure schema forces valid URL for frontend (server schema only checks min(1))
const frontendSlideSchema = slideSchema.extend({
    imageUrl: z.string().url("Must be a valid URL").min(1, "Image is required"),
});

export type SlideFormValues = z.infer<typeof frontendSlideSchema>;

interface HeroSlideFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingSlide: HeroSlide | null;
  onSuccess: () => void;
  slideCount: number;
}

export function HeroSlideForm({ 
  isOpen, 
  onOpenChange, 
  editingSlide, 
  onSuccess,
  slideCount 
}: HeroSlideFormProps) {
  const [activeTab, setActiveTab] = useState("fr");
  
  const createMutation = useCreateHeroSlideMutation();
  const updateMutation = useUpdateHeroSlideMutation();
  const uploadMutation = useUploadMutation();

  const form = useForm<SlideFormValues>({
    resolver: zodResolver(frontendSlideSchema) as Resolver<SlideFormValues>,
    defaultValues: {
      title: { en: "", fr: "", ar: "" },
      subtitle: "",
      description: { en: "", fr: "", ar: "" },
      imageUrl: "",
      order: slideCount + 1,
      isActive: true,
    },
  });

  const isActive = useWatch({ control: form.control, name: "isActive" });

  const normalize = useCallback((val: LocalizedContent | string) => {
       if (!val) return { en: '', fr: '', ar: '' };
       if (typeof val === 'string') return { en: val, fr: val, ar: val };
       return { 
          en: val?.en || '', 
          fr: val?.fr || '', 
          ar: val?.ar || '' 
       };
  }, []);

  const normalizeOptional = useCallback((val: LocalizedContent | string | undefined) => {
      if (!val) return undefined; 
       if (typeof val === 'string') return { en: val, fr: val, ar: val };
       return {
          en: val?.en || '', 
          fr: val?.fr || '', 
          ar: val?.ar || '' 
       };
  }, []);

  useEffect(() => {
    if (isOpen) {
        if (editingSlide) {
            form.reset({
              title: normalize(editingSlide.title),
              subtitle: editingSlide.subtitle || "",
              description: normalizeOptional(editingSlide.description),
              imageUrl: editingSlide.imageUrl,
              order: editingSlide.order,
              isActive: editingSlide.isActive,
            });
        } else {
            form.reset({
              title: { en: "", fr: "", ar: "" },
              subtitle: "",
              description: { en: "", fr: "", ar: "" },
              imageUrl: "",
              order: slideCount + 1,
              isActive: true,
            });
        }
    }
  }, [isOpen, editingSlide, form, normalize, normalizeOptional, slideCount]);

  const onSubmit = (data: SlideFormValues) => {
    const submissionData = {
        ...data,
        order: Number(data.order) || 0
    };

    if (editingSlide) {
      updateMutation.mutate(
        { id: editingSlide.id, data: submissionData },
        {
          onSuccess: () => {
            onOpenChange(false);
            form.reset();
            onSuccess();
          },
        }
      );
    } else {
      createMutation.mutate(submissionData, {
        onSuccess: () => {
          onOpenChange(false);
          form.reset();
          onSuccess();
        },
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadMutation.mutate(file, {
      onSuccess: (data) => {
        form.setValue("imageUrl", data.filePath);
      },
      onError: (error) => {
        console.error("Upload failed", error);
        alert("Failed to upload image"); 
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        onOpenChange(open);
        if(!open) form.reset();
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingSlide ? "Edit Slide" : "Add New Slide"}</DialogTitle>
          <DialogDescription>
            Create or edit a slide. Use the tabs to manage content in different languages.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="fr">🇫🇷 Français</TabsTrigger>
              <TabsTrigger value="en">🇬🇧 English</TabsTrigger>
              <TabsTrigger value="ar">🇩🇿 العربية</TabsTrigger>
            </TabsList>
            
            {(["fr", "en", "ar"] as const).map((lang) => (
                <TabsContent key={lang} value={lang} className="space-y-4 mt-4">
                    <div className="grid gap-2">
                        <Label htmlFor={`title.${lang}`}>Title ({lang.toUpperCase()})</Label>
                        <Input 
                            id={`title.${lang}`} 
                            {...form.register(`title.${lang}` as Path<SlideFormValues>)} 
                            placeholder={`Title in ${lang}`}
                            dir={lang === 'ar' ? 'rtl' : 'ltr'}
                        />
                        {form.formState.errors.title?.[lang as keyof typeof form.formState.errors.title] && (
                             <p className="text-sm text-red-500">{form.formState.errors.title?.[lang]?.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor={`description.${lang}`}>Description ({lang.toUpperCase()})</Label>
                        <Textarea 
                            id={`description.${lang}`} 
                            {...form.register(`description.${lang}` as Path<SlideFormValues>)} 
                            placeholder={`Description in ${lang}`}
                            dir={lang === 'ar' ? 'rtl' : 'ltr'}
                            className="h-24"
                        />
                    </div>
                </TabsContent>
            ))}
          </Tabs>

          <div className="grid gap-4 py-4 border-y border-border/50">
               <div className="grid gap-2">
                <Label htmlFor="subtitle">Subtitle (Shared)</Label>
                <Input id="subtitle" {...form.register("subtitle")} placeholder="e.g. Fiber Optics" />
              </div>

              <div className="grid gap-2">
                <Label>Image</Label>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          className="cursor-pointer" 
                          disabled={uploadMutation.isPending}
                        />
                        {uploadMutation.isPending && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                    </div>
                    <Input {...form.register("imageUrl")} placeholder="Image URL" readOnly className="bg-muted" />
                    {form.formState.errors.imageUrl && (
                        <p className="text-sm text-red-500">{form.formState.errors.imageUrl.message}</p>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="order">Order Priority</Label>
                    <Input type="number" id="order" {...form.register("order")} />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-card">
                    <div className="space-y-0.5">
                        <Label className="text-base">Active Status</Label>
                        <p className="text-xs text-muted-foreground">Visible on homepage</p>
                    </div>
                    <Switch 
                        checked={isActive}
                        onCheckedChange={(checked) => form.setValue("isActive", checked)}
                    />
                </div>
              </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending || uploadMutation.isPending}>
              {editingSlide ? "Save Changes" : "Create Slide"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
