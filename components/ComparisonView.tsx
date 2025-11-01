import React, { useMemo } from 'react';
import type { Apartment } from '../types';
import { CheckIcon, CrossIcon, CloseIcon } from './Icons';

interface ComparisonViewProps {
  apartments: Apartment[];
  onClose: () => void;
}

const ComparisonView: React.FC<ComparisonViewProps> = ({ apartments, onClose }) => {
    
    const allAmenities = useMemo(() => {
        const amenitySet = new Set<string>();
        apartments.forEach(apt => {
            apt.amenities.forEach(amenity => amenitySet.add(amenity));
        });
        return Array.from(amenitySet).sort();
    }, [apartments]);

    const features = [
        { label: 'السعر', key: 'price' },
        { label: 'غرف النوم', key: 'bedrooms' },
        { label: 'الحمامات', key: 'bathrooms' },
        { label: 'المساحة (م²)', key: 'area' },
    ];
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">مقارنة الشقق</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                <CloseIcon className="h-7 w-7" />
            </button>
        </div>
        <div className="overflow-x-auto overflow-y-auto">
            <table className="w-full text-right border-collapse">
                <thead className="sticky top-0 bg-gray-50 z-10">
                    <tr>
                        <th className="p-4 font-semibold text-gray-600 border-b border-l w-1/5">الميزة</th>
                        {apartments.map(apt => (
                            <th key={apt.id} className="p-4 border-b border-l">
                                <p className="font-bold text-lg text-cyan-600">{apt.title}</p>
                                <p className="text-sm text-gray-500">{apt.location}</p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {features.map(feature => (
                        <tr key={feature.key}>
                            <td className="p-4 font-semibold text-gray-800 bg-gray-50 border-l">{feature.label}</td>
                            {apartments.map(apt => (
                                <td key={apt.id} className="p-4 text-center border-l text-lg font-medium">
                                    {feature.key === 'price' ? apt.price.toLocaleString() : apt[feature.key as keyof Apartment]}
                                </td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={apartments.length + 1} className="p-3 bg-cyan-50 text-cyan-800 font-bold text-lg">
                            المميزات
                        </td>
                    </tr>
                    {allAmenities.map(amenity => (
                        <tr key={amenity}>
                             <td className="p-4 font-semibold text-gray-800 bg-gray-50 border-l">{amenity}</td>
                             {apartments.map(apt => (
                                <td key={apt.id} className="p-4 text-center border-l">
                                    {apt.amenities.includes(amenity) ? 
                                        <CheckIcon className="w-7 h-7 text-green-500 mx-auto" /> 
                                        : <CrossIcon className="w-6 h-6 text-red-400 mx-auto" />
                                    }
                                </td>
                             ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;