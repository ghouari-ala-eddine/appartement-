import React, { useState, useEffect, useRef } from 'react';
// FIX: Import the shared Filters type from `types.ts`.
import type { Filters } from '../types';
import { ChevronDownIcon } from './Icons';

interface SearchBarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  allAmenities: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ filters, setFilters, allAmenities }) => {
  const [isAmenitiesOpen, setAmenitiesOpen] = useState(false);
  const amenitiesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (amenitiesRef.current && !amenitiesRef.current.contains(event.target as Node)) {
        setAmenitiesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], value] }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFilters(prev => {
        const currentAmenities = prev.amenities;
        const newAmenities = currentAmenities.includes(amenity)
            ? currentAmenities.filter(a => a !== amenity)
            : [...currentAmenities, amenity];
        return { ...prev, amenities: newAmenities };
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg mb-12 sticky top-20 z-30">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
        <div>
          <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-1">الموقع</label>
          <input
            type="text"
            name="location"
            id="location"
            value={filters.location}
            onChange={handleInputChange}
            placeholder="مثال: دبي، جميرا..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition"
          />
        </div>
        <div>
          <label htmlFor="bedrooms" className="block text-sm font-semibold text-gray-700 mb-1">عدد غرف النوم</label>
          <select
            name="bedrooms"
            id="bedrooms"
            value={filters.bedrooms}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition bg-white"
          >
            <option value={0}>الكل</option>
            <option value={1}>1+</option>
            <option value={2}>2+</option>
            <option value={3}>3+</option>
            <option value={4}>4+</option>
          </select>
        </div>
        
        <div className="relative" ref={amenitiesRef}>
          <label htmlFor="amenities" className="block text-sm font-semibold text-gray-700 mb-1">المميزات</label>
          <button
            type="button"
            id="amenities"
            onClick={() => setAmenitiesOpen(!isAmenitiesOpen)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 transition bg-white text-right flex justify-between items-center"
          >
            <span className="text-gray-700 truncate">
              {filters.amenities.length > 0 ? `${filters.amenities.length} ميزة محددة` : 'اختر المميزات'}
            </span>
            <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ${isAmenitiesOpen ? 'transform -rotate-180' : ''}`} />
          </button>
          {isAmenitiesOpen && (
            <div className="absolute top-full mt-2 w-full max-h-60 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-xl z-50">
              <ul className="p-2 space-y-1">
                {allAmenities.map(amenity => (
                  <li key={amenity}>
                    <label className="flex items-center space-x-3 rtl:space-x-reverse p-2 rounded-md hover:bg-gray-100 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                      />
                      <span className="text-gray-800">{amenity}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="md:col-span-3 lg:col-span-1">
          <label htmlFor="priceRange" className="block text-sm font-semibold text-gray-700 mb-1">
            السعر الأقصى: <span className="font-bold text-cyan-600">{filters.priceRange[1].toLocaleString()} درهم</span>
          </label>
          <input
            type="range"
            name="priceRange"
            id="priceRange"
            min="1000"
            max="10000"
            step="500"
            value={filters.priceRange[1]}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
          />
        </div>
        <div className="md:col-span-3 lg:col-span-1">
            <button className="w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-cyan-700 transition-transform transform hover:scale-105 shadow-md">
                بحث
            </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;