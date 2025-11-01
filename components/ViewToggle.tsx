import React from 'react';
import { GridIcon, MapIcon } from './Icons';

interface ViewToggleProps {
  viewMode: 'grid' | 'map';
  setViewMode: (mode: 'grid' | 'map') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, setViewMode }) => {
  const baseClasses = "flex items-center space-x-2 rtl:space-x-reverse font-semibold py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500";
  const activeClasses = "bg-cyan-600 text-white shadow";
  const inactiveClasses = "bg-white text-gray-600 hover:bg-gray-100";

  return (
    <div className="flex bg-white p-1 rounded-lg shadow-sm border">
      <button
        onClick={() => setViewMode('grid')}
        className={`${baseClasses} ${viewMode === 'grid' ? activeClasses : inactiveClasses}`}
        aria-pressed={viewMode === 'grid'}
      >
        <GridIcon className="w-5 h-5" />
        <span>عرض شبكي</span>
      </button>
      <button
        onClick={() => setViewMode('map')}
        className={`${baseClasses} ${viewMode === 'map' ? activeClasses : inactiveClasses}`}
        aria-pressed={viewMode === 'map'}
      >
        <MapIcon className="w-5 h-5" />
        <span>عرض الخريطة</span>
      </button>
    </div>
  );
};

export default ViewToggle;