import { Button } from "@/components/ui/button";
import { useContentQuery } from "@/hooks/useContent";

export const NewsSection = () => {
    const { data: news, isLoading } = useContentQuery('NEWS');

    if (isLoading) {
        return (
             <section id="news" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">Actualités & Événements</h2>
                            <p className="mt-4 text-lg text-gray-600">Restez informés de nos dernières activités.</p>
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
                        <h2 className="text-3xl font-bold text-gray-900">Actualités & Événements</h2>
                        <p className="mt-4 text-lg text-gray-600">Restez informés de nos dernières activités.</p>
                    </div>
                    <Button variant="outline" className="hidden md:flex">Voir tout</Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                     {news?.slice(0, 3).map((item) => (
                        <div key={item.id} className="group cursor-pointer">
                            <div className="bg-gray-200 rounded-xl aspect-video mb-4 overflow-hidden">
                                <img 
                                    src={item.imageUrl || `https://source.unsplash.com/random/800x600?tech,event&sig=${item.id}`} 
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                    alt={item.title} 
                                />
                            </div>
                            <span className="text-primary text-sm font-semibold">{item.type}</span>
                            <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                            <p className="text-gray-600 line-clamp-2">{item.body}</p>
                        </div>
                     ))}
                     {(!news || news.length === 0) && (
                        <div className="col-span-3 text-center text-gray-500 py-12">
                            Aucune actualité pour le moment.
                        </div>
                     )}
                </div>
            </div>
        </section>
    )
}
