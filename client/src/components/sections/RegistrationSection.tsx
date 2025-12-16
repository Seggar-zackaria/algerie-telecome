
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
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const schema = z.object({
  fullName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  type: z.string().min(1, "Veuillez sélectionner un type"),
  center: z.string().min(1, "Veuillez sélectionner un centre"),
  spaceType: z.string().min(1, "Veuillez sélectionner la nature de l'espace"),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export const RegistrationSection = () => {
  const { t } = useTranslation();
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
    <section id="register" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Animated Watermark Logo */}
      <motion.div 
        className="absolute -bottom-20 -left-20 pointer-events-none select-none z-0"
        initial={{ opacity: 0, y: 100, scale: 0.8, rotate: -10 }}
        whileInView={{ opacity: 0.30, y: 0, scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <img src="/logo-telecom.svg" alt="logo" className="w-[60rem] h-auto" />
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-gray-900 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">{t('register_title')}</h2>
            <p className="text-gray-600">{t('register_subtitle')}</p>
          </div>

          {success ? (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{t('register_success_title')}</h3>
                <p className="mt-2 text-gray-600">{t('register_success_message')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">{t('register_form_name')}</Label>
                        <Input id="fullName" {...register("fullName")} placeholder={t('register_form_name_placeholder')} />
                        {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">{t('register_form_email')}</Label>
                        <Input id="email" type="email" {...register("email")} placeholder={t('register_form_email_placeholder')} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="phone">{t('register_form_phone')}</Label>
                        <Input id="phone" {...register("phone")} placeholder={t('register_form_phone_placeholder')} />
                        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">{t('register_form_type')}</Label>
                        <select 
                            id="type"
                            {...register("type")}
                            className={cn(
                                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                        >
                            <option value="">{t('register_form_type_select')}</option>
                            <option value="student">{t('register_form_type_student')}</option>
                            <option value="professional">{t('register_form_type_professional')}</option>
                            <option value="startup">{t('register_form_type_startup')}</option>
                        </select>
                        {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="center">Centre de Compétences</Label>
                        <select 
                            id="center"
                            {...register("center")}
                            className={cn(
                                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                        >
                            <option value="">Sélectionnez un centre</option>
                            <option value="Annaba">Skill Center Annaba</option>
                            <option value="Setif">Skill Center Setif</option>
                        </select>
                        {errors.center && <p className="text-sm text-red-500">{errors.center.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="spaceType">Nature de l'espace à exploiter</Label>
                        <select 
                            id="spaceType"
                            {...register("spaceType")}
                            className={cn(
                                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            )}
                        >
                            <option value="">Sélectionnez la nature de l'espace</option>
                            <option value="espace_formation">Espace Formation</option>
                            <option value="espace_conference">Espace Conférence</option>
                            <option value="espace_networking_coworking">Espace Networking/Coworking</option>
                            <option value="espace_podcast">Espace Podcast</option>
                        </select>
                        {errors.spaceType && <p className="text-sm text-red-500">{errors.spaceType.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">{t('register_form_message')}</Label>
                    <Textarea id="message" {...register("message")} placeholder={t('register_form_message_placeholder')} />
                </div>

                <Button type="submit" className="w-full text-lg py-6 bg-primary hover:bg-primary/90 text-white shadow-lg transition-all duration-300 hover:shadow-xl translate-y-0 hover:-translate-y-1">{t('register_submit')}</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
