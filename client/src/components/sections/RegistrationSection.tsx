
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api";
import { useState } from "react";
import { cn } from "@/lib/utils";

const schema = z.object({
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  type: z.string().min(1, "Veuillez sélectionner un type"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const RegistrationSection = () => {
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await api.post('/registrations', data);
      setSuccess(true);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <section id="register" className="py-24 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-gray-900">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Rejoignez-nous</h2>
            <p className="text-gray-600">Inscrivez-vous pour accéder à nos espaces et événements.</p>
          </div>

          {success ? (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Inscription réussie !</h3>
                <p className="mt-2 text-gray-600">Nous vous contacterons très prochainement.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Nom complet</Label>
                        <Input id="fullName" {...register("fullName")} placeholder="Votre nom" />
                        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" {...register("email")} placeholder="votre@email.com" />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input id="phone" {...register("phone")} placeholder="05 XX XX XX XX" />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Je suis</Label>
                        <select 
                            id="type"
                            {...register("type")}
                            className={cn(
                                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                        >
                            <option value="">Sélectionnez...</option>
                            <option value="student">Étudiant</option>
                            <option value="professional">Professionnel</option>
                            <option value="startup">Startup</option>
                        </select>
                        {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">Message (Optionnel)</Label>
                    <Textarea id="message" {...register("message")} placeholder="Dites-nous en plus..." />
                </div>

                <Button type="submit" className="w-full text-lg py-6">Envoyer ma demande</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
