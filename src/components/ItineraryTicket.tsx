import { useState } from 'react';
import type { SavedItinerary } from '../types/itinerary';

interface ItineraryTicketProps {
  itinerary: SavedItinerary;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
}

export default function ItineraryTicket({ itinerary, isActive, onClick, onDelete }: ItineraryTicketProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showDeleteConfirm) {
      onDelete();
    } else {
      setShowDeleteConfirm(true);
      setTimeout(() => setShowDeleteConfirm(false), 3000);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-2xl cursor-pointer transition-all border backdrop-blur-xl mb-3 shadow-lg
        ${isActive 
          ? 'bg-white/90 border-blue-300 shadow-xl scale-[1.02]' 
          : 'bg-white/60 border-white/40 hover:border-white/60 hover:bg-white/70 hover:shadow-xl'
        }
      `}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-gray-900 truncate flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            {itinerary.preferences.destination}
          </h3>
          <p className="text-xs text-gray-500 font-medium mt-0.5">{formatDate(itinerary.createdAt)}</p>
        </div>
        <button
          onClick={handleDelete}
          className={`
            ml-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer shadow-sm
            ${showDeleteConfirm 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-red-50 text-red-600 hover:bg-red-100'
            }
          `}
        >
          {showDeleteConfirm ? '¿Eliminar?' : '🗑️'}
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-2">
        <span className="px-3 py-1.5 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-full text-xs font-semibold shadow-sm">
          ⏱️ {itinerary.preferences.duration} días
        </span>
        <span className="px-3 py-1.5 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-full text-xs font-semibold shadow-sm">
          💰 {itinerary.preferences.budget}
        </span>
      </div>
      
      <div className="flex flex-wrap gap-1.5">
        {itinerary.preferences.interests.slice(0, 3).map(interest => (
          <span key={interest} className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
            {interest}
          </span>
        ))}
        {itinerary.preferences.interests.length > 3 && (
          <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium border border-purple-400/30">
            +{itinerary.preferences.interests.length - 3}
          </span>
        )}
      </div>
    </div>
  );
}
