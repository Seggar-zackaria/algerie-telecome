import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  action?: string;
  className?: string;
}

export const FeatureCard = ({ title, description, image, action = "Découvrir", className }: FeatureCardProps) => {
  return (
    <div className={cn("group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1", className)}>
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/0 transition-colors z-10" />
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-6 relative z-20 bg-white">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
          {description}
        </p>
        <Button variant="ghost" className="group/btn p-0 hover:bg-transparent text-primary hover:text-blue-700 font-semibold flex items-center gap-2">
          {action}
          <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
};
