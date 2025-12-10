import { useState } from "react";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2, Edit2, MoveVertical } from "lucide-react";
import { useHeroSlides, useCreateHeroSlideMutation, useDeleteHeroSlideMutation, useUpdateHeroSlideMutation } from "@/hooks/useHeroSlide";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const slideSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string("Must be a valid URL"),
  order: z.union([z.string(), z.number()]).default(0),
  isActive: z.boolean().default(true),
});

type SlideFormValues = z.infer<typeof slideSchema>;

import type { HeroSlide } from "@/services/heroSlide.service"; // Prepare import for handleEdit

export function HeroManagementPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const { data: slides, isLoading } = useHeroSlides();
  const createMutation = useCreateHeroSlideMutation();
  const updateMutation = useUpdateHeroSlideMutation();
  const deleteMutation = useDeleteHeroSlideMutation();

  const form = useForm<SlideFormValues>({
    resolver: zodResolver(slideSchema) as Resolver<SlideFormValues>,
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      imageUrl: "",
      order: 0,
      isActive: true,
    },
  });

  const isActive = useWatch({ control: form.control, name: "isActive" });

  const onSubmit = (data: SlideFormValues) => {
    const submissionData = {
        ...data,
        order: Number(data.order) || 0
    };

    if (editingId) {
      updateMutation.mutate(
        { id: editingId, data: submissionData },
        {
          onSuccess: () => {
            setIsOpen(false);
            setEditingId(null);
            form.reset();
          },
        }
      );
    } else {
      createMutation.mutate(submissionData, {
        onSuccess: () => {
          setIsOpen(false);
          form.reset();
        },
      });
    }
  };

  const handleEdit = (slide: HeroSlide) => {
    setEditingId(slide.id);
    form.reset({
      title: slide.title,
      subtitle: slide.subtitle || "",
      description: slide.description || "",
      imageUrl: slide.imageUrl,
      order: slide.order,
      isActive: slide.isActive,
    });
    setIsOpen(true);
  };



  const handleAddNew = () => {
      setEditingId(null);
      form.reset({
          title: "",
          subtitle: "",
          description: "",
          imageUrl: "",
          order: slides ? slides.length + 1 : 0,
          isActive: true
      });
      setIsOpen(true);
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
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) { setEditingId(null); form.reset(); }
        }}>
          <DialogTrigger asChild>
            <Button onClick={handleAddNew}>
              <Plus className="mr-2 h-4 w-4" /> Add Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Slide" : "Add New Slide"}</DialogTitle>
              <DialogDescription>
                Create a new slide for the hero carousel. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...form.register("title")} placeholder="e.g. Innovation First" />
                {form.formState.errors.title && (
                  <p className="text-sm text-red-500">{String(form.formState.errors.title.message)}</p>
                )}
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="subtitle">Subtitle (Optional)</Label>
                <Input id="subtitle" {...form.register("subtitle")} placeholder="e.g. Fiber Optics" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...form.register("description")} placeholder="Short description..." />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image</Label>
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
                          
                          // Construct URL. Backend returns relative path "/uploads/..."
                          // We use the relative path directly, relying on Vite proxy in dev
                          // and proper serving in prod.
                          const fullUrl = response.data.filePath;
                          
                          form.setValue("imageUrl", fullUrl);
                        } catch (error) {
                          console.error("Upload failed", error);
                          alert("Failed to upload image");
                        }
                      }}
                    />
                    <div className="flex gap-2">
                      <Input id="imageUrl" {...form.register("imageUrl")} placeholder="Image URL will appear here" readOnly />
                    </div>
                </div>
                {form.formState.errors.imageUrl && (
                  <p className="text-sm text-red-500">{String(form.formState.errors.imageUrl.message)}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="order">Order Priority</Label>
                    <Input type="number" id="order" {...form.register("order")} />
                </div>
                 <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <Label>Active Status</Label>
                    </div>
                    <Switch 
                        checked={isActive}
                        onCheckedChange={(checked) => form.setValue("isActive", checked)}
                    />
                </div>
              </div>

              <DialogFooter>
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingId ? "Save Changes" : "Create Slide"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Slides</CardTitle>
          <CardDescription>
            Drag and drop to reorder (coming soon) or use the order field.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading slides...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Order</TableHead>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {slides?.map((slide) => (
                  <TableRow key={slide.id}>
                    <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                            <MoveVertical className="h-4 w-4 text-muted-foreground" />
                            {slide.order}
                        </div>
                    </TableCell>
                    <TableCell>
                      <div className="h-10 w-16 overflow-hidden rounded bg-muted">
                        <img 
                            src={slide.imageUrl} 
                            alt={slide.title} 
                            className="h-full w-full object-cover"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://placehold.co/100x60?text=No+Img'; }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{slide.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {slide.description}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={slide.isActive ? "default" : "secondary"}>
                        {slide.isActive ? "Active" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(slide)}>
                                <Edit2 className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the slide
                                            from the database.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => deleteMutation.mutate(slide.id)}>
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!slides?.length && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                            No slides found. Create one to get started.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
