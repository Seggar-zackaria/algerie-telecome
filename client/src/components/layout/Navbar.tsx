import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useAuth } from '@/context/auth-store';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: t('nav_home'), href: '/' },
    { name: t('nav_about'), href: '/#about' },
    { name: t('nav_spaces'), href: '/#spaces' },
    { name: t('nav_location'), href: '/#location' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    // If we're on the home page
    if (location.pathname === '/') {
      // For home link
      if (href === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // For specific sections
      const elementId = href.replace('/#', '');
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to the page with hash
      navigate(href);
    }
  };

  return (
    <nav className={ "fixed top-0 w-full z-50 py-5 transition-all duration-300 ease-in-out bg-black/5 backdrop-blur-lg" }>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={(e) => handleNavClick(e, '/')}>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Skill Center</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center space-x-1 bg-white/40 backdrop-blur-xl border border-white/20 px-2 py-1.5 rounded-xl shadow-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2 text-sm text-white font-medium hover:text-black transition-all duration-200 cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
              <div className="pl-2 border-l md:hidden border-gray-300/50 ml-2">
                 <button className="p-2 hover:text-black transition-colors text-gray-700">
                    <Menu className="w-4 h-4" />
                 </button>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher />
            {isAuthenticated && user?.role === 'ADMIN' && (
              <Button asChild className="bg-[#0099ff] hover:bg-[#007acc] text-white font-medium px-6 py-2 h-auto rounded-lg shadow-lg hover:shadow-xl transition-all">
                <Link to="/admin">
                  Dashboard
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-primary focus:outline-none p-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-[90px] mx-4 bg-white/75 backdrop-blur-2xl text-black border border-white/20 rounded-2xl shadow-xl transition-all duration-300 ease-in-out origin-top",
          isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0 pointer-events-none"
        )}
      >
        <div className="px-4 pt-4 pb-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-4 py-3 text-base font-bold hover:bg-blue-50/50 rounded-lg transition-colors cursor-pointer"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          {isAuthenticated && user?.role === 'ADMIN' && (
            <div className="pt-4 px-4">
              <Button asChild className="w-full bg-[#0099ff] hover:bg-[#007acc] text-white rounded-lg py-6 text-lg shadow-md">
                <Link to="/admin">
                  Dashboard
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
