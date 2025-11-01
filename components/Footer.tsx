
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg text-gray-900 mb-4">السكن العصري</h3>
            <p className="text-gray-600">بوابتك لإيجاد منزل أحلامك بسهولة ويسر.</p>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-cyan-600">عن الشركة</a></li>
              <li><a href="#" className="text-gray-600 hover:text-cyan-600">عقاراتنا</a></li>
              <li><a href="#" className="text-gray-600 hover:text-cyan-600">الأسئلة الشائعة</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-4">تواصل معنا</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-cyan-600">البريد الإلكتروني</a></li>
              <li><a href="#" className="text-gray-600 hover:text-cyan-600">فيسبوك</a></li>
              <li><a href="#" className="text-gray-600 hover:text-cyan-600">تويتر</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-4">قانوني</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-cyan-600">سياسة الخصوصية</a></li>
              <li><a href="#" className="text-gray-600 hover:text-cyan-600">شروط الاستخدام</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} السكن العصري. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
