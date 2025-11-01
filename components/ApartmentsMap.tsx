import React, { useEffect, useRef } from 'react';
import type { Apartment } from '../types';
import L from 'leaflet';
import 'leaflet-draw';

interface ApartmentsMapProps {
  apartments: Apartment[];
  onSelectApartment: (apartment: Apartment) => void;
  onBoundsChange: (bounds: L.LatLngBounds | null) => void;
  drawnBounds: L.LatLngBounds | null;
}

// Default Leaflet icon fix
const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

const ApartmentsMap: React.FC<ApartmentsMapProps> = ({ apartments, onSelectApartment, onBoundsChange, drawnBounds }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const drawnItemsRef = useRef<L.FeatureGroup>(new L.FeatureGroup());

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      const map = L.map(mapContainerRef.current).setView([25.2048, 55.2708], 11); // Centered on Dubai
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Add draw layer and controls
      map.addLayer(drawnItemsRef.current);
      const drawControl = new (L as any).Control.Draw({
        position: 'topright',
        draw: {
          polygon: false, polyline: false, circle: false, circlemarker: false, marker: false,
          rectangle: {
            shapeOptions: {
              color: '#0891b2', // cyan-600 from tailwind
              fillColor: '#06b6d4', // cyan-500
              fillOpacity: 0.2,
            },
            showArea: false,
          },
        },
        edit: {
          featureGroup: drawnItemsRef.current,
          remove: false, 
          edit: false,
        },
      });
      map.addControl(drawControl);

      map.on((L as any).Draw.Event.CREATED, (event: any) => {
        const layer = event.layer;
        drawnItemsRef.current.clearLayers();
        drawnItemsRef.current.addLayer(layer);
        onBoundsChange(layer.getBounds());
      });
    }
  }, [onBoundsChange]);

  useEffect(() => {
    // Clear drawn rectangle from map if bounds are cleared externally
    if (!drawnBounds && drawnItemsRef.current) {
      drawnItemsRef.current.clearLayers();
    }
  }, [drawnBounds]);


  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    if (apartments.length === 0) return;

    // Add new markers
    apartments.forEach(apt => {
      const marker = L.marker([apt.latitude, apt.longitude]).addTo(map);
      
      const popupContent = `
        <div class="w-60">
          <img src="${apt.imageUrl}" alt="${apt.title}" class="w-full h-32 object-cover rounded-t-lg" />
          <div class="p-3">
            <h4 class="font-bold text-md mb-1 truncate">${apt.title}</h4>
            <p class="text-cyan-600 font-semibold text-lg">${apt.price.toLocaleString()} درهم</p>
            <button id="popup-btn-${apt.id}" class="w-full mt-2 bg-cyan-600 text-white text-sm py-2 px-3 rounded-md hover:bg-cyan-700 transition-colors">
              عرض التفاصيل
            </button>
          </div>
        </div>
      `;

      const popup = marker.bindPopup(popupContent, {
          closeButton: true
      });

      popup.on('add', () => {
          const btn = document.getElementById(`popup-btn-${apt.id}`);
          if (btn) {
              btn.onclick = () => onSelectApartment(apt);
          }
      });
      markersRef.current.push(marker);
    });
    
    // Adjust map view to fit all markers, but only if no area is drawn
    if (markersRef.current.length > 0 && !drawnBounds) {
        const group = L.featureGroup(markersRef.current);
        map.fitBounds(group.getBounds().pad(0.1));
    }


  }, [apartments, onSelectApartment, drawnBounds]);

  if (apartments.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-xl text-gray-500">عذراً، لا توجد شقق تطابق معايير البحث الحالية.</p>
        <p className="text-gray-400 mt-2">لا يمكن عرض أي مواقع على الخريطة. حاول تعديل الفلاتر أو مسح منطقة البحث.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-xl shadow-lg overflow-hidden border">
        <div ref={mapContainerRef} className="map-container" />
    </div>
  );
};

export default ApartmentsMap;