import { useState } from "react";
import api from "@/lib/api";
import { Plus, Edit, Trash } from "lucide-react";
import { useAllContentAdminQuery, useDeleteContentMutation, useCreateContentMutation } from "@/hooks/useContent";
import type { ContentType, CreateContentInput } from "@/hooks/useContent";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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

export const ContentPage = () => {
  const { data: contents, isLoading } = useAllContentAdminQuery();
  const deleteMutation = useDeleteContentMutation();
  const createMutation = useCreateContentMutation();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const [newContent, setNewContent] = useState<CreateContentInput>({
    title: "",
    body: "",
    type: "NEWS",
    published: true,
    imageUrl: ""
  });

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(newContent, {
        onSuccess: () => {
            setIsCreateOpen(false);
            setNewContent({ title: "", body: "", type: "NEWS", published: true, imageUrl: "" });
        }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Content Management</h1>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Content
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add New Content</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreate} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input 
                            id="title" 
                            value={newContent.title} 
                            onChange={(e) => setNewContent({ ...newContent, title: e.target.value })} 
                            required 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <select 
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            value={newContent.type} 
                            onChange={(e) => setNewContent({ ...newContent, type: e.target.value as ContentType })}
                        >
                            <option value="NEWS">News</option>
                            <option value="EVENT">Event</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="body">Body</Label>
                        <Textarea 
                            id="body" 
                            value={newContent.body} 
                            onChange={(e) => setNewContent({ ...newContent, body: e.target.value })} 
                            required 
                        />
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
                                        setNewContent({ ...newContent, imageUrl: fullUrl });
                                    } catch (error) {
                                        console.error("Upload failed", error);
                                        alert("Failed to upload image");
                                    }
                                }}
                            />
                            {newContent.imageUrl && (
                                <div className="relative aspect-video w-full max-w-[200px] overflow-hidden rounded-md border">
                                    <img 
                                        src={newContent.imageUrl} 
                                        alt="Preview" 
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
                             <Input 
                                id="imageUrl" 
                                value={newContent.imageUrl || ''} 
                                onChange={(e) => setNewContent({ ...newContent, imageUrl: e.target.value })} 
                                placeholder="Or enter Image URL manually"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Title</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Type</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Status</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Date</th>
              <th className="px-6 py-4 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : contents?.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600 uppercase">{item.type}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {item.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 flex gap-3">
                  <button className="text-gray-400 hover:text-blue-600"><Edit className="w-4 h-4" /></button>
                  <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <button className="text-gray-400 hover:text-red-600">
                             <Trash className="w-4 h-4" />
                          </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the content item "{item.title}" from the database.
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={() => deleteMutation.mutate(item.id)}>
                                  Delete
                              </AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
                </td>
              </tr>
            ))}
            {(!isLoading && (!contents || contents.length === 0)) && (
                 <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No content found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
