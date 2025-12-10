import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'Qui sommes-nous?', href: '#about' },
    { name: 'Nos Espaces', href: '#spaces' },
    { name: 'Localisation', href: '#location' },
  ];

  return (
    <nav className={ "fixed top-0 w-full z-50 py-5 transition-all duration-300 ease-in-out mix-blend-difference text-white"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight">
                Skills Center
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Pill */}
          <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-1 bg-white/40 backdrop-blur-xl border border-white/20 px-2 py-1.5 rounded-xl shadow-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 text-sm text-white font-medium hover:text-black transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pl-2 border-l border-gray-300/50 ml-2">
                 <button className="p-2 hover:text-black transition-colors text-gray-700">
                    <Menu className="w-4 h-4" />
                 </button>
              </div>
            </div>
          </div>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center">
            <Button className="bg-[#0099ff] hover:bg-[#007acc] text-white font-medium px-6 py-2 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all">
              S'inscrire
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary focus:outline-none p-2 bg-white/50 backdrop-blur-sm rounded-lg"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[70px] mx-4 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-xl transition-all duration-300 ease-in-out origin-top",
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        )}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary hover:bg-blue-50/50 rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 px-4">
            <Button className="w-full bg-[#0099ff] hover:bg-[#007acc] text-white rounded-lg py-6 text-lg shadow-md">
              <Link to="/auth/register-admin">
                S'inscrire
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
