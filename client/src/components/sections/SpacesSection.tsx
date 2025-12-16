import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AnimatedPath = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end end"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
    
    // Royal Blue: #4169E1
    // Royal Purple: #7851A9

    return (
        <div ref={ref} className="absolute inset-0 pointer-events-none hidden lg:block z-0">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                   {/* Animated Gradient: Cyan to Electric Blue (Fiber Optic Theme) */}
                   <linearGradient id="royalGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.3">
                            <animate attributeName="stop-color" values="#00E5FF;#2979FF;#00E5FF" dur="4s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="50%" stopColor="#2979FF" stopOpacity="0.6">
                             <animate attributeName="stop-color" values="#2979FF;#00E5FF;#2979FF" dur="4s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.3">
                             <animate attributeName="stop-color" values="#00E5FF;#2979FF;#00E5FF" dur="4s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>
                    
                    {/* Glow Filter */}
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                {/* Main Path 1 (Center) */}
                <motion.path
                    d="M 50 0 C 90 20, 90 30, 50 50 S 10 80, 50 100"
                    fill="none"
                    stroke="url(#royalGradient)"
                    strokeWidth="0.8"
                    style={{ pathLength }}
                    filter="url(#glow)"
                />
                
                {/* Data Flow Packet for Path 1 */}
                <motion.path
                    d="M 50 0 C 90 20, 90 30, 50 50 S 10 80, 50 100"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeDasharray="1 15"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -16 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    opacity="0.8"
                    mask="url(#fadeMask)"
                    filter="url(#glow)"
                    style={{ pathLength }}
                />

                 {/* Path 2 (Left Offset) */}
                 <motion.path
                    d="M 48 0 C 88 20, 88 30, 48 50 S 8 80, 48 100"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="0.3"
                    style={{ pathLength }}
                    opacity="0.4"
                />
                
                <motion.path
                    d="M 48 0 C 88 20, 88 30, 48 50 S 8 80, 48 100"
                    fill="none"
                    stroke="#2979FF"
                    strokeWidth="0.8"
                    strokeDasharray="2 25"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -27 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    opacity="0.5"
                    style={{ pathLength }}
                />

                 {/* Path 3 (Right Offset) */}
                 <motion.path
                    d="M 52 0 C 92 20, 92 30, 52 50 S 12 80, 52 100"
                    fill="none"
                    stroke="#2979FF"
                    strokeWidth="0.3"
                    style={{ pathLength }}
                    opacity="0.4"
                />

                <motion.path
                    d="M 52 0 C 92 20, 92 30, 52 50 S 12 80, 52 100"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="0.8"
                    strokeDasharray="2 30"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -32 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    opacity="0.5"
                    style={{ pathLength }}
                />
            </svg>
        </div>
    );
};

export const SpacesSection = () => {
  const { t } = useTranslation();

  const spaces = [
    {
      title: t('spaces_innovation_title'),
      description: t('spaces_innovation_desc'),
      items: [
        t('spaces_innovation_item1'),
        t('spaces_innovation_item2'),
        t('spaces_innovation_item3'),
      ],
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
      alt: "Innovation",
    },
    {
      title: t('spaces_training_title'),
      description: t('spaces_training_desc'),
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
      alt: "Training",
    },
    {
      title: t('spaces_collab_title'),
      description: t('spaces_collab_desc'),
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000",
      alt: "Collaboration",
    },
  ];

  return (
    <section id="spaces" className="py-24 bg-gray-50 overflow-hidden relative">
      <AnimatedPath />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32 relative z-10">
        {spaces.map((space, index) => (
          <div 
            key={index} 
            className={cn(
              "grid lg:grid-cols-2 gap-16 items-center",
              index % 2 === 1 && "lg:grid-flow-row-dense"
            )}
          >
            {/* Image Block */}
            <div className={cn("relative", index % 2 === 1 && "lg:col-start-2")}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img
                  src={space.image}
                  alt={space.alt}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Decorative elements */}
              <div className={cn(
                "absolute -z-10 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob",
                index % 2 === 0 ? "bg-blue-300 top-0 -left-10" : "bg-purple-300 bottom-0 -right-10"
              )}></div>
            </div>

            {/* Content Block */}
            <div className={cn("space-y-6", index % 2 === 1 && "lg:col-start-1")}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-100 shadow-sm text-primary text-sm font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {t('nav_spaces')}
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                {space.title}
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {space.description}
              </p>

              {space.items && (
                <div className="pt-4 space-y-3">
                  {space.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
