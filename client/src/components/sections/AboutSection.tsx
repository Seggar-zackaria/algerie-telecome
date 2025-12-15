import { CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const AboutSection = () => {
    const { t } = useTranslation();

    return (
        <section id="about" className="py-24 bg-white relative overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000"
                                alt="Collaboration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Experience Badge */}
                        <div className="absolute -bottom-6 -right-6 rtl:-left-6 rtl:right-auto bg-white p-6 rounded-xl shadow-xl border border-gray-100 hidden md:block">
                            <p className="text-4xl font-bold text-primary">100%</p>
                            <p className="text-gray-500 font-medium">{t('about_badge_innovation')}</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary text-sm font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            {t('nav_about')}
                        </div>
                        <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                            {t('about_title')}
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            {t('about_description')}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            {[
                                t('about_item_training'),
                                t('about_item_equipment'),
                                t('about_item_community'),
                                t('about_item_support')
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
