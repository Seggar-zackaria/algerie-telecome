import { useState, useCallback, useEffect } from "react";
import { useForm, type Resolver, useWatch, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCreateContentMutation, useUpdateContentMutation } from "@/hooks/useContent";
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
import type { Content } from "@/hooks/useContent";
import type { LocalizedContent } from "@/lib/i18n-utils";

import { contentFormSchema as contentSchema, ContentType } from "@/lib/validation";

export type ContentFormValues = z.infer<typeof contentSchema>;

interface ContentFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  editingContent: Content | null;
  onSuccess: () => void;
}

export function ContentForm({ 
  isOpen, 
  onOpenChange, 
  editingContent, 
  onSuccess 
}: ContentFormProps) {
  const [activeTab, setActiveTab] = useState("fr");
  
  const createMutation = useCreateContentMutation();
  const updateMutation = useUpdateContentMutation();
  const uploadMutation = useUploadMutation();

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema) as Resolver<ContentFormValues>,
    defaultValues: {
      title: { en: "", fr: "", ar: "" },
      body: { en: "", fr: "", ar: "" },
      type: "NEWS",
      published: true,
      imageUrl: ""
    },
  });

  const isPublished = useWatch({ control: form.control, name: "published" });
  const imageUrl = useWatch({ control: form.control, name: "imageUrl" });

  const normalize = useCallback((val: LocalizedContent | string) => {
       if (typeof val === 'string') return { en: val, fr: val, ar: val };
       return { 
          en: val?.en || '', 
          fr: val?.fr || '', 
          ar: val?.ar || '' 
       };
  }, []);

  useEffect(() => {
    if (isOpen) {
        if (editingContent) {
            form.reset({
                title: normalize(editingContent.title),
                body: normalize(editingContent.body),
                type: editingContent.type,
                published: editingContent.published,
                imageUrl: editingContent.imageUrl || ""
            });
        } else {
            form.reset({
                title: { en: "", fr: "", ar: "" },
                body: { en: "", fr: "", ar: "" },
                type: "NEWS",
                published: true,
                imageUrl: ""
            });
        }
    }
  }, [isOpen, editingContent, form, normalize]);

  const onSubmit = (data: ContentFormValues) => {
    const payload = {
        ...data,
        imageUrl: data.imageUrl === "" ? undefined : data.imageUrl
    };

    if (editingContent) {
      updateMutation.mutate(
        { id: editingContent.id, ...payload }, 
        {
          onSuccess: () => {
            onOpenChange(false);
            form.reset();
            onSuccess();
          },
        }
      );
    } else {
      createMutation.mutate(payload, {
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
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingContent ? "Modifier le contenu" : "Ajouter un nouvel élément"}</DialogTitle>
          <DialogDescription>
            Remplissez les détails en Français, Anglais et Arabe.
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
                        <Label htmlFor={`title.${lang}`}>Titre ({lang.toUpperCase()})</Label>
                        <Input 
                            id={`title.${lang}`} 
                            {...form.register(`title.${lang}` as Path<ContentFormValues>)} 
                            placeholder={`Titre en ${lang}`}
                            dir={lang === 'ar' ? 'rtl' : 'ltr'}
                        />
                        {form.formState.errors.title?.[lang as keyof typeof form.formState.errors.title] && (
                             <p className="text-sm text-red-500">{form.formState.errors.title?.[lang]?.message}</p>
                        )}
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor={`body.${lang}`}>Contenu ({lang.toUpperCase()})</Label>
                        <Textarea 
                            id={`body.${lang}`} 
                            {...form.register(`body.${lang}` as Path<ContentFormValues>)} 
                            placeholder={`Contenu en ${lang}`}
                            className="min-h-[150px]"
                            dir={lang === 'ar' ? 'rtl' : 'ltr'}
                        />
                        {form.formState.errors.body?.[lang as keyof typeof form.formState.errors.body] && (
                            <p className="text-sm text-red-500">{form.formState.errors.body?.[lang]?.message}</p>
                        )}
                    </div>
                </TabsContent>
            ))}
          </Tabs>

          <div className="grid gap-4 py-4 border-y border-border/50">
               <div className="grid gap-2">
                  <Label htmlFor="type">Type de contenu</Label>
                  <select 
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      {...form.register("type")}
                  >
                      <option value={ContentType.NEWS}>Actualité</option>
                      <option value={ContentType.EVENT}>Événement</option>
                  </select>
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
                    <Input {...form.register("imageUrl")} placeholder="URL de l'image" readOnly className="bg-muted" />
                    
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

               <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-card">
                  <div className="space-y-0.5">
                      <Label className="text-base">Statut de publication</Label>
                      <p className="text-xs text-muted-foreground">{isPublished ? "Visible sur le site" : "Brouillon (caché)"}</p>
                  </div>
                  <Switch 
                      checked={isPublished}
                      onCheckedChange={(checked) => form.setValue("published", checked)}
                  />
              </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Annuler
            </Button>
            <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending || uploadMutation.isPending}>
              {editingContent ? "Enregistrer" : "Créer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
