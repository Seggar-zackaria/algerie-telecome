import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MoveVertical, Edit2, Trash2, ImageOff } from "lucide-react";
import { getLocalizedContent } from "@/lib/i18n-utils";
import type { HeroSlide } from "@/services/heroSlide.service";

interface HeroSlideListProps {
  slides: HeroSlide[] | undefined;
  isLoading: boolean;
  onEdit: (slide: HeroSlide) => void;
  onDelete: (id: string) => void;
}

export function HeroSlideList({ slides, isLoading, onEdit, onDelete }: HeroSlideListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Slides</CardTitle>
        <CardDescription>
          Drag and drop to reorder (coming soon) or use the order field.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground animate-pulse">Loading slides...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Order</TableHead>
                <TableHead className="w-[120px]">Image</TableHead>
                <TableHead>Title (EN)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slides?.map((slide) => (
                <TableRow key={slide.id} className="group hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MoveVertical className="h-4 w-4" />
                      {slide.order}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="h-12 w-20 overflow-hidden rounded-md border bg-muted flex items-center justify-center">
                      {slide.imageUrl ? (
                           <img 
                           src={slide.imageUrl} 
                           alt="Slide" 
                           className="h-full w-full object-cover"
                           onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden'); }}
                         />
                      ) : null}
                      <ImageOff className={`h-4 w-4 text-muted-foreground ${slide.imageUrl ? 'hidden' : ''}`} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium truncate max-w-[200px]">{getLocalizedContent(slide.title, 'en')}</div>
                    {slide.subtitle && (
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">{slide.subtitle}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={slide.isActive ? "default" : "secondary"} className={slide.isActive ? "bg-green-500/15 text-green-700 hover:bg-green-500/25 border-green-200" : ""}>
                      {slide.isActive ? "Active" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(slide)}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Slide</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this slide? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => onDelete(slide.id)}>
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
                  <TableCell colSpan={5} className="text-center h-32 text-muted-foreground">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <ImageOff className="h-8 w-8 opacity-50" />
                        <p>No slides found. Create one to get started.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
