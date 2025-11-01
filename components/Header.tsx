import React from 'react';
import { LogoIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <LogoIcon className="w-8 h-8 text-cyan-600" />
            <span className="text-2xl font-bold text-gray-900">السكن العصري</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
            <a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">الرئيسية</a>
            <a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">عقاراتنا</a>
            <a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">خدماتنا</a>
            <a href="#" className="text-gray-600 hover:text-cyan-600 transition-colors">تواصل معنا</a>
          </nav>
          <div className="flex items-center">
            <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors shadow-sm font-semibold">
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;