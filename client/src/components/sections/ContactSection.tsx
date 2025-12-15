import { MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { AlgeriaMap } from '@/components/ui/AlgeriaMap';

export const ContactSection = () => {
    const { t } = useTranslation();

    return (
        <section id="location" className="py-24 bg-gray-50">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl bg-white overflow-hidden shadow-xl border border-gray-100 relative"
                >
                    <div className="grid lg:grid-cols-2">
                        <div className="p-12 lg:p-16 space-y-8 relative z-10">
                            <div>
                                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#2979FF] to-[#00E5FF] mb-4">
                                    {t('contact_title')}
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    {t('contact_description')}
                                </p>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-blue-50 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg text-gray-900">{t('contact_centers_title')}</h4>
                                        <p className="text-gray-500">{t('contact_centers_subtitle')}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 group">
                                    <div className="p-3 bg-blue-50 text-primary rounded-xl group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg text-gray-900">{t('contact_hours_title')}</h4>
                                        <p className="text-gray-500">{t('contact_hours_subtitle')}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <Button className="bg-gradient-to-r from-[#2979FF] to-[#00E5FF] hover:opacity-90 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-blue-200 transition-all hover:shadow-xl hover:-translate-y-1">
                                {t('contact_get_directions')}
                            </Button>
                        </div>
                        <div className="bg-gray-100 h-96 lg:h-auto relative overflow-hidden p-8 flex items-center justify-center">
                             <AlgeriaMap />
                             {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </motion.div>
             </div>
        </section>
    )
}
