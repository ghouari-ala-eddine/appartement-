import React, { useState, useMemo, useCallback } from 'react';
import L from 'leaflet';
// FIX: Import the shared Filters type to fix type mismatch for 'priceRange'.
import type { Apartment, Filters } from './types';
import { APARTMENTS_DATA } from './constants';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ApartmentGrid from './components/ApartmentGrid';
import ApartmentDetailModal from './components/ApartmentDetailModal';
import Footer from './components/Footer';
import ComparisonBar from './components/ComparisonBar';
import ComparisonView from './components/ComparisonView';
import ViewToggle from './components/ViewToggle';
import ApartmentsMap from './components/ApartmentsMap';
import { ClearAreaIcon } from './components/Icons';

function App() {
  const [apartments] = useState<Apartment[]>(APARTMENTS_DATA);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [filters, setFilters] = useState<Filters>({
    location: '',
    priceRange: [0, 10000],
    bedrooms: 0,
    amenities: [],
  });
  const [comparisonList, setComparisonList] = useState<Apartment[]>([]);
  const [isCompareViewVisible, setCompareViewVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [drawnBounds, setDrawnBounds] = useState<L.LatLngBounds | null>(null);

  const allAmenities = useMemo(() => {
    const amenitySet = new Set<string>();
    apartments.forEach(apt => {
        apt.amenities.forEach(amenity => amenitySet.add(amenity));
    });
    return Array.from(amenitySet).sort();
  }, [apartments]);

  const filteredApartments = useMemo(() => {
    return apartments.filter(apt => {
      const locationMatch = filters.location === '' || apt.location.toLowerCase().includes(filters.location.toLowerCase());
      const priceMatch = apt.price >= filters.priceRange[0] && apt.price <= filters.priceRange[1];
      const bedroomsMatch = filters.bedrooms === 0 || apt.bedrooms >= filters.bedrooms;
      const amenitiesMatch = filters.amenities.every(amenity => apt.amenities.includes(amenity));
      const boundsMatch = !drawnBounds || drawnBounds.contains([apt.latitude, apt.longitude]);
      return locationMatch && priceMatch && bedroomsMatch && amenitiesMatch && boundsMatch;
    });
  }, [apartments, filters, drawnBounds]);

  const handleSelectApartment = useCallback((apartment: Apartment) => {
    setSelectedApartment(apartment);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedApartment(null);
  }, []);

  const handleToggleCompare = useCallback((apartment: Apartment) => {
    setComparisonList(prevList => {
      const isInList = prevList.some(item => item.id === apartment.id);
      if (isInList) {
        return prevList.filter(item => item.id !== apartment.id);
      } else {
        if (prevList.length < 4) { // Limit comparison to 4 items
            return [...prevList, apartment];
        }
        // Optionally, add a user notification that the limit is reached
        return prevList; 
      }
    });
  }, []);

  const handleClearCompare = useCallback(() => {
    setComparisonList([]);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">اكتشف مسكن أحلامك</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">تصفح مجموعة مختارة من أفضل الشقق السكنية في أرقى المواقع.</p>
        </div>
        <SearchBar 
          filters={filters} 
          setFilters={setFilters} 
          allAmenities={allAmenities}
        />
        <div className="my-6 flex justify-end items-center gap-4">
            {drawnBounds && (
                <button 
                    onClick={() => setDrawnBounds(null)}
                    className="flex items-center space-x-2 rtl:space-x-reverse font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 bg-red-100 text-red-700 hover:bg-red-200"
                    aria-label="مسح منطقة البحث المحددة"
                >
                    <ClearAreaIcon className="w-5 h-5" />
                    <span>مسح منطقة البحث</span>
                </button>
            )}
            <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
        
        {viewMode === 'grid' ? (
            <ApartmentGrid 
                apartments={filteredApartments} 
                onSelectApartment={handleSelectApartment}
                onToggleCompare={handleToggleCompare}
                comparisonList={comparisonList}
            />
        ) : (
            <ApartmentsMap 
                apartments={filteredApartments}
                onSelectApartment={handleSelectApartment}
                onBoundsChange={setDrawnBounds}
                drawnBounds={drawnBounds}
            />
        )}
      </main>
      <Footer />
      {selectedApartment && (
        <ApartmentDetailModal
          apartment={selectedApartment}
          onClose={handleCloseModal}
          onToggleCompare={handleToggleCompare}
          isInCompare={comparisonList.some(item => item.id === selectedApartment.id)}
        />
      )}
      {comparisonList.length > 0 && (
        <ComparisonBar 
            count={comparisonList.length} 
            onCompare={() => setCompareViewVisible(true)}
            onClear={handleClearCompare}
        />
      )}
      {isCompareViewVisible && (
        <ComparisonView 
            apartments={comparisonList}
            onClose={() => setCompareViewVisible(false)}
        />
      )}
    </div>
  );
}

export default App;