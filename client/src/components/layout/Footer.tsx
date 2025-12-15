import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <img src="/logo-telecom.svg" alt="Skills Center" className="h-10 w-auto" />
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('footer_description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">{t('footer_quick_links')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">{t('nav_home')}</a></li>
              <li><a href="#about" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">{t('nav_about')}</a></li>
              <li><a href="#spaces" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">{t('nav_spaces')}</a></li>
              <li><a href="#contact" className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">{t('nav_contact')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span>{t('footer_address')}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+213 12 34 56 78</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600 text-sm">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>contact@skillscenter.dz</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">{t('footer_follow_us')}</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-pink-600 hover:text-white hover:border-pink-600 transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-300">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            {t('footer_rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};
