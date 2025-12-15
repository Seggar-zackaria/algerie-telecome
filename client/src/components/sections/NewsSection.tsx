import { Button } from "@/components/ui/button";
import { useContentQuery } from "@/hooks/useContent";
import { useTranslation } from 'react-i18next';
import { getLocalizedContent } from '@/lib/i18n-utils';

export const NewsSection = () => {
    const { data: allContent, isLoading } = useContentQuery();
    const { t, i18n } = useTranslation();

    const news = allContent?.filter(item => item.type === 'NEWS' || item.type === 'EVENT');

    if (isLoading) {
        return (
            <section id="news" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">{t('news_section_title')}</h2>
                            <p className="mt-4 text-lg text-gray-600">{t('news_section_subtitle')}</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                             <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 rounded-xl aspect-video mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                             </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id="news" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">{t('news_section_title')}</h2>
                        <p className="mt-4 text-lg text-gray-600">{t('news_section_subtitle')}</p>
                    </div>
                    <Button variant="outline" className="hidden md:flex">{t('news_view_all')}</Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                     {news?.slice(0, 3).map((item) => (
                        <div key={item.id} className="group cursor-pointer">
                            <div className="bg-gray-200 rounded-xl aspect-video mb-4 overflow-hidden">
                                <img 
                                    src={item.imageUrl || `https://source.unsplash.com/random/800x600?tech,event&sig=${item.id}`} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                    alt={getLocalizedContent(item.title, i18n.language)} 
                                />
                            </div>
                            <span className="text-primary text-sm font-semibold">{item.type}</span>
                            <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-primary transition-colors">
                                {getLocalizedContent(item.title, i18n.language)}
                            </h3>
                            <p className="text-gray-600 line-clamp-2">
                                {getLocalizedContent(item.body, i18n.language)}
                            </p>
                        </div>
                     ))}
                     {(!news || news.length === 0) && (
                        <div className="col-span-3 text-center text-gray-500 py-12">
                            {t('news_empty')}
                        </div>
                     )}
                </div>
            </div>
        </section>
    )
}
