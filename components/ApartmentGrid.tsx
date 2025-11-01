import React from 'react';
import type { Apartment } from '../types';
import ApartmentCard from './ApartmentCard';

interface ApartmentGridProps {
  apartments: Apartment[];
  onSelectApartment: (apartment: Apartment) => void;
  onToggleCompare: (apartment: Apartment) => void;
  comparisonList: Apartment[];
}

const ApartmentGrid: React.FC<ApartmentGridProps> = ({ apartments, onSelectApartment, onToggleCompare, comparisonList }) => {
  if (apartments.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-500">عذراً، لا توجد شقق تطابق معايير البحث الحالية.</p>
        <p className="text-gray-400 mt-2">حاول تعديل الفلاتر أو توسيع نطاق البحث.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {apartments.map(apt => (
        <ApartmentCard 
            key={apt.id} 
            apartment={apt} 
            onSelect={onSelectApartment}
            onToggleCompare={onToggleCompare}
            isInCompare={comparisonList.some(item => item.id === apt.id)}
        />
      ))}
    </div>
  );
};

export default ApartmentGrid;