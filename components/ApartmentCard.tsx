import React from 'react';
import type { Apartment } from '../types';
import { BedIcon, BathIcon, AreaIcon, CompareIcon } from './Icons';

interface ApartmentCardProps {
  apartment: Apartment;
  onSelect: (apartment: Apartment) => void;
  onToggleCompare: (apartment: Apartment) => void;
  isInCompare: boolean;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, onSelect, onToggleCompare, isInCompare }) => {
  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleCompare(apartment);
  }
  
  return (
    <div 
        className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group flex flex-col cursor-pointer"
        onClick={() => onSelect(apartment)}
    >
      <div className="relative">
        <img className="w-full h-56 object-cover" src={apartment.imageUrl} alt={apartment.title} />
        <div className="absolute top-0 right-0 bg-cyan-600 text-white py-1 px-3 m-4 rounded-full text-sm font-semibold">
          جديد
        </div>
        <button 
          onClick={handleCompareClick}
          className={`absolute top-4 left-4 rounded-full p-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500
            ${isInCompare ? 'bg-cyan-600 text-white' : 'bg-white/70 text-gray-800 hover:bg-white'}`}
          aria-label={isInCompare ? 'إزالة من المقارنة' : 'إضافة للمقارنة'}
        >
          <CompareIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <p className="text-sm font-semibold text-gray-500 mb-1">{apartment.location}</p>
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">{apartment.title}</h3>
        <div className="flex-grow"></div>
        <p className="text-2xl font-bold text-cyan-600 my-4">
          {apartment.price.toLocaleString()} <span className="text-sm text-gray-500 font-normal">درهم/شهرياً</span>
        </p>
        <div className="border-t border-gray-200 pt-4 flex justify-between text-gray-600">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <BedIcon className="w-5 h-5 text-gray-400" />
                <span>{apartment.bedrooms} غرف</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <BathIcon className="w-5 h-5 text-gray-400" />
                <span>{apartment.bathrooms} حمامات</span>
            </div>
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <AreaIcon className="w-5 h-5 text-gray-400" />
                <span>{apartment.area} م²</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentCard;