import React, { useState } from 'react';
import ConfirmationDialog from './ConfirmationDialog';

interface ComparisonBarProps {
  count: number;
  onCompare: () => void;
  onClear: () => void;
}

const ComparisonBar: React.FC<ComparisonBarProps> = ({ count, onCompare, onClear }) => {
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const handleConfirmClear = () => {
    onClear();
    setConfirmOpen(false);
  };

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 bg-gray-800 text-white z-40 shadow-2xl animate-slide-up">
        <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="bg-cyan-600 text-white text-lg font-bold rounded-full w-10 h-10 flex items-center justify-center">{count}</span>
              <span className="text-lg font-semibold">شقة مختارة للمقارنة</span>
            </div>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <button
                onClick={() => setConfirmOpen(true)}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-5 rounded-lg transition-colors">
                مسح الكل
              </button>
              <button
                onClick={onCompare}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105 shadow-lg">
                قارن الآن
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationDialog
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirmClear}
        title="تأكيد المسح"
        message="هل أنت متأكد من أنك تريد مسح جميع المقارنات؟"
      />
    </>
  );
};

export default ComparisonBar;
