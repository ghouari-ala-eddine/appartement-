import React, { useState, useEffect } from 'react';
import type { Apartment } from '../types';
import { BedIcon, BathIcon, AreaIcon, CheckIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface ApartmentDetailModalProps {
  apartment: Apartment;
  onClose: () => void;
  onToggleCompare: (apartment: Apartment) => void;
  isInCompare: boolean;
}

const ApartmentDetailModal: React.FC<ApartmentDetailModalProps> = ({ apartment, onClose, onToggleCompare, isInCompare }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTourBooked, setTourBooked] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % apartment.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + apartment.images.length) % apartment.images.length);
  };

  const handleBookTour = () => {
    if (isTourBooked) return;
    setTourBooked(true);
    setTimeout(() => {
      setTourBooked(false);
    }, 4000);
  };
  
  const mapEmbedUrl = `https://maps.google.com/maps?q=${apartment.latitude},${apartment.longitude}&z=15&output=embed`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${apartment.latitude},${apartment.longitude}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/70 text-gray-800 rounded-full p-2 hover:bg-white z-30 transition">
            <CloseIcon className="h-6 w-6" />
          </button>
          <div className="relative w-full h-96 bg-gray-100">
            {apartment.images.map((img, index) => (
              <img key={index} src={img} alt={`${apartment.title} - ${index + 1}`} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`} />
            ))}
             {apartment.images.length > 1 && (
                <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 text-gray-800 rounded-full p-2 hover:bg-white z-20 transition">
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 text-gray-800 rounded-full p-2 hover:bg-white z-20 transition">
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 z-20">
                      <div className="flex justify-center space-x-2 rtl:space-x-reverse p-2 bg-black/40 rounded-xl backdrop-blur-sm">
                          {apartment.images.map((img, index) => (
                              <button
                                  key={index}
                                  onClick={(e) => {
                                      e.stopPropagation();
                                      setCurrentImageIndex(index);
                                  }}
                                  className={`w-16 h-10 rounded-md overflow-hidden transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black/50 focus:ring-white ${
                                      index === currentImageIndex ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100 hover:scale-105'
                                  }`}
                              >
                                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                              </button>
                          ))}
                      </div>
                  </div>
                </>
              )}
          </div>
        </div>
        
        <div className="p-8 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">{apartment.title}</h2>
              <p className="text-md text-gray-500 mt-1">{apartment.location}</p>
            </div>
            <div className="text-left rtl:text-right flex-shrink-0">
                <p className="text-3xl font-bold text-cyan-600">
                    {apartment.price.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">درهم/شهرياً</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse border-y border-gray-200 py-4 my-6">
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-lg">
                <BedIcon className="w-6 h-6 text-cyan-600" />
                <span className="font-semibold">{apartment.bedrooms}</span>
                <span className="text-gray-600">غرف</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-lg">
                <BathIcon className="w-6 h-6 text-cyan-600" />
                <span className="font-semibold">{apartment.bathrooms}</span>
                <span className="text-gray-600">حمامات</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse text-lg">
                <AreaIcon className="w-6 h-6 text-cyan-600" />
                <span className="font-semibold">{apartment.area}</span>
                <span className="text-gray-600">م²</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-3">الوصف</h3>
            <p className="text-gray-700 leading-relaxed">{apartment.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold mb-3">المميزات</h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
              {apartment.amenities.map(amenity => (
                <li key={amenity} className="flex items-center">
                  <CheckIcon className="w-5 h-5 text-green-500 ml-2 rtl:ml-0 rtl:mr-2 flex-shrink-0"/>
                  <span className="text-gray-700">{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-3">الموقع على الخريطة</h3>
            <div className="rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <iframe 
                    width="100%" 
                    height="300"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={mapEmbedUrl}
                    title="Apartment Location"
                ></iframe>
            </div>
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-cyan-600 font-semibold hover:underline">
              عرض بحجم أكبر على خرائط جوجل
            </a>
          </div>

        </div>

        <div className="p-6 bg-gray-50 border-t mt-auto">
           <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {isTourBooked ? (
                <div className="flex-1 flex items-center justify-center space-x-2 rtl:space-x-reverse bg-green-100 text-green-800 font-bold py-3 px-4 rounded-lg text-lg transition-all duration-300">
                    <CheckIcon className="w-6 h-6"/>
                    <span>تم الحجز! سنتواصل معك قريباً.</span>
                </div>
            ) : (
                <button 
                    onClick={handleBookTour}
                    className="flex-1 bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 transition-transform transform hover:scale-105 shadow-lg text-lg">
                  احجز جولة
                </button>
            )}
            <button 
              onClick={() => onToggleCompare(apartment)}
              className={`flex-1 font-bold py-3 px-4 rounded-lg transition-all text-lg
                ${isInCompare ? 'bg-red-100 text-red-700 border-2 border-red-200 hover:bg-red-200' : 'bg-white text-cyan-600 border-2 border-cyan-600 hover:bg-cyan-50'}`}
            >
              {isInCompare ? 'إزالة من المقارنة' : 'إضافة للمقارنة'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentDetailModal;