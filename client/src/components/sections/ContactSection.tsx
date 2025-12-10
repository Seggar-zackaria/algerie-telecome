import { MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ContactSection = () => {
    return (
        <section id="location" className="py-24 bg-white">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-primary overflow-hidden shadow-2xl relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="grid lg:grid-cols-2">
                        <div className="p-12 lg:p-16 text-white space-y-8 relative z-10">
                            <h2 className="text-3xl font-bold">Rendez-nous visite</h2>
                            <p className="text-blue-100 text-lg">
                                Venez découvrir nos installations et rencontrer notre équipe. Nous sommes impatients de vous accueillir.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Annaba & Sétif</h4>
                                        <p className="text-blue-200">Nos centres principaux</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Horaires d'ouverture</h4>
                                        <p className="text-blue-200">Dim - Jeu: 08:00 - 17:00</p>
                                    </div>
                                </div>
                            </div>
                            
                            <Button className="bg-white text-primary hover:bg-gray-100 hover:text-blue-700 rounded-full px-8 py-6 text-lg font-semibold shadow-lg">
                                Obtenir l'itinéraire
                            </Button>
                        </div>
                        <div className="bg-gray-200 h-96 lg:h-auto relative">
                             {/* Map Placeholder or simple image */}
                            <img 
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                                alt="Map Location" 
                                className="w-full h-full object-cover opacity-90" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-primary/50 to-transparent lg:hidden"></div>
                        </div>
                    </div>
                </div>
             </div>
        </section>
    )
}
