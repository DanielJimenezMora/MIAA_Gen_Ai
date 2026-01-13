import { useState, useEffect } from 'react';
import ItineraryTicket from './ItineraryTicket';
import DayView from './DayView';
import LoadingModal from './LoadingModal';
import SpecificDataModal from './SpecificDataModal';
import type { SavedItinerary, TravelPreferences, DaySchedule } from '../types/itinerary';

export default function TravelPlannerApp() {
  const [savedItineraries, setSavedItineraries] = useState<SavedItinerary[]>([]);
  const [selectedItinerary, setSelectedItinerary] = useState<SavedItinerary | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [pendingItinerary, setPendingItinerary] = useState<SavedItinerary | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showSpecificDataModal, setShowSpecificDataModal] = useState(false);
  const [specificDataRequest, setSpecificDataRequest] = useState<any>(null);
  const [collectedSpecificData, setCollectedSpecificData] = useState<Record<string, string>>({});

  // Cargar itinerarios guardados del localStorage
  useEffect(() => {
    const stored = localStorage.getItem('travel-itineraries');
    if (stored) {
      setSavedItineraries(JSON.parse(stored));
    }
  }, []);

  // Guardar en localStorage cuando cambien los itinerarios
  useEffect(() => {
    if (savedItineraries.length > 0) {
      localStorage.setItem('travel-itineraries', JSON.stringify(savedItineraries));
    } else {
      // Si ya no hay itinerarios, limpiar el storage para evitar que reaparezcan al recargar
      localStorage.removeItem('travel-itineraries');
    }
  }, [savedItineraries]);

  const [preferences, setPreferences] = useState<TravelPreferences>({
    destination: '',
    duration: 3,
    budget: 'medio',
    interests: [],
    restrictions: ''
  });

  const interestOptions = [
    'cultura', 'gastronomía', 'aire libre', 'aventura',
    'playa', 'montaña', 'historia', 'vida nocturna'
  ];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const parseItineraryIntoDays = (itinerary: string): DaySchedule[] => {
    const days: DaySchedule[] = [];
    const dayRegex = /DÍA (\d+):\s*(.+?)(?=\n|$)/gi;
    const sections = itinerary.split(/(?=DÍA \d+)/gi);

    sections.forEach((section) => {
      const dayMatch = section.match(/DÍA (\d+):\s*(.+?)(?=\n|$)/i);
      if (!dayMatch) return;

      const dayNum = parseInt(dayMatch[1]);
      const title = dayMatch[2].trim();

      // Buscar secciones sin emojis, solo por texto
      const morningMatch = section.match(/Mañana[^\n]*\n([\s\S]*?)(?=Tarde|Noche|Presupuesto estimado|DÍA|$)/i);
      const afternoonMatch = section.match(/Tarde[^\n]*\n([\s\S]*?)(?=Noche|Presupuesto estimado|DÍA|$)/i);
      const eveningMatch = section.match(/Noche[^\n]*\n([\s\S]*?)(?=Presupuesto estimado|DÍA|$)/i);
      const budgetMatch = section.match(/Presupuesto estimado[^\n]*:\s*(.+?)(?=\n|$)/i);

      const parseActivities = (text: string | undefined): string[] => {
        if (!text) return ['No hay actividades programadas'];
        const activities = text
          .split('\n')
          .map(line => line.trim())
          .filter(line => line.startsWith('-'))
          .map(line => line.substring(1).trim())
          .filter(line => line.length > 0);
        
        return activities.length > 0 ? activities : ['No hay actividades programadas'];
      };

      days.push({
        day: dayNum,
        title,
        morning: parseActivities(morningMatch?.[1]),
        afternoon: parseActivities(afternoonMatch?.[1]),
        evening: parseActivities(eveningMatch?.[1]),
        budget: budgetMatch?.[1]?.trim()
      });
    });

    return days;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    proceedWithItineraryGeneration();
  };

  const proceedWithItineraryGeneration = async (specificData?: Record<string, string>) => {
    setLoading(true);
    setShowLoadingModal(true);

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          preferences,
          specificData: specificData || collectedSpecificData 
        })
      });

      const data = await response.json();
      
      if (data.needsSpecificData) {
        setShowLoadingModal(false);
        setSpecificDataRequest(data.dataRequest);
        setShowSpecificDataModal(true);
        return;
      }
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      const newItinerary: SavedItinerary = {
        id: isEditing && selectedItinerary ? selectedItinerary.id : Date.now().toString(),
        preferences: { ...preferences },
        itinerary: data.itinerary,
        createdAt: new Date().toISOString()
      };

      setPendingItinerary(newItinerary);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al generar el itinerario. Por favor intenta de nuevo.');
      setShowLoadingModal(false);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSpecificDataComplete = (data: Record<string, string>) => {
    setCollectedSpecificData(data);
    setShowSpecificDataModal(false);
    proceedWithItineraryGeneration(data);
  };
  
  const handleSpecificDataSkip = () => {
    setShowSpecificDataModal(false);
    proceedWithItineraryGeneration({});
  };

  const handleLoadingComplete = () => {
    if (pendingItinerary) {
      if (isEditing && selectedItinerary) {
        // Actualizar itinerario existente
        setSavedItineraries(prev => 
          prev.map(it => it.id === pendingItinerary.id ? pendingItinerary : it)
        );
      } else {
        // Agregar nuevo itinerario
        setSavedItineraries(prev => [pendingItinerary, ...prev]);
      }
      setSelectedItinerary(pendingItinerary);
      setShowForm(false);
      setIsEditing(false);
    }
    setShowLoadingModal(false);
    setPendingItinerary(null);
  };

  const handleEdit = () => {
    if (selectedItinerary) {
      setPreferences(selectedItinerary.preferences);
      setIsEditing(true);
      setShowForm(true);
    }
  };

  const handleDelete = (id: string) => {
    setSavedItineraries(prev => prev.filter(it => it.id !== id));
    if (selectedItinerary?.id === id) {
      setSelectedItinerary(null);
      setShowForm(true);
    }
  };

  const handleNewItinerary = () => {
    setSelectedItinerary(null);
    setShowForm(true);
    setIsEditing(false);
    setPreferences({
      destination: '',
      duration: 3,
      budget: 'medio',
      interests: [],
      restrictions: ''
    });
  };

  const handleClearAll = () => {
    const ok = typeof window !== 'undefined'
      ? window.confirm('¿Deseas vaciar todos los viajes guardados? Esta acción no se puede deshacer.')
      : true;
    if (!ok) return;
    // Limpiar todos los viajes guardados y el estado asociado
    setSavedItineraries([]);
    setSelectedItinerary(null);
    setShowForm(true);
    setIsEditing(false);
    // Limpieza inmediata de storage para reflejarse al recargar
    try {
      localStorage.removeItem('travel-itineraries');
    } catch {}
  };

  return (
    <>
      <LoadingModal 
        isOpen={showLoadingModal}
        onComplete={handleLoadingComplete}
        destination={preferences.destination}
      />
      
      <SpecificDataModal
        show={showSpecificDataModal}
        request={specificDataRequest}
        onComplete={handleSpecificDataComplete}
        onSkip={handleSpecificDataSkip}
      />
      <SpecificDataModal
        show={showSpecificDataModal}
        request={specificDataRequest}
        onComplete={handleSpecificDataComplete}
        onSkip={handleSpecificDataSkip}
      />
      
    <div className="flex h-screen bg-transparent">
      {/* Sidebar */}
      <div className={`
        ${sidebarOpen ? 'w-80' : 'w-16'} 
        bg-slate-950/95 backdrop-blur-xl border-r border-white/30 transition-all duration-300 flex flex-col shadow-2xl
      `}>
        <div className="p-4 border-b border-gray-200/30 flex justify-between items-center backdrop-blur-sm">
          {sidebarOpen && (
            <div className="flex items-center gap-2 px-2 pt-6 mb-4">
              <span className="text-5xl">✈️</span>
              <h2 className="font-bold text-3xl text-gray-100"> Mis Viajes</h2>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/50 rounded-xl transition-all cursor-pointer text-gray-600 hover:text-gray-900 shadow-sm"
          >
            {sidebarOpen ? '←' : '→'}
          </button>
        </div>

        {sidebarOpen && (
          <>
            <button
              onClick={handleNewItinerary}
              className="m-4 px-4 py-3 bg-linear-to-r from-blue-700 to-purple-600 text-white rounded-2xl font-bold hover:from-blue-800 hover:to-purple-700 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:scale-[1.02]"
            >
              <span className="text-xl">✨</span>
              Nuevo Viaje
            </button>

            <div className="mx-4 mb-2 flex items-center gap-2">
              <button
                type="button"
                onClick={handleClearAll}
                disabled={savedItineraries.length === 0}
                className={`px-4 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 backdrop-blur-sm transition-all ${
                  savedItineraries.length === 0
                    ? 'bg-gray-300 text-gray-500 border border-gray-300 cursor-not-allowed shadow-sm'
                    : 'bg-red-600 text-white border border-red-700 cursor-pointer shadow-lg hover:shadow-xl hover:bg-red-700 hover:scale-[1.02]'
                }`}
                title="Vaciar todos los viajes guardados"
              >
                🗑️ Vaciar viajes
              </button>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  savedItineraries.length === 0
                    ? 'bg-gray-200 text-gray-600 border-gray-300'
                    : 'bg-red-100 text-red-700 border-red-200'
                }`}
                title="Contador de viajes guardados"
              >
                {savedItineraries.length === 0 ? 'Sin viajes' : `${savedItineraries.length} viajes`}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-2">
              {savedItineraries.length === 0 ? (
                <div className="text-center py-12 text-gray-600">
                  <p className="text-5xl mb-3">🌍</p>
                  <p className="text-sm font-medium">No hay viajes guardados</p>
                </div>
              ) : (
                savedItineraries.map(itinerary => (
                  <ItineraryTicket
                    key={itinerary.id}
                    itinerary={itinerary}
                    isActive={selectedItinerary?.id === itinerary.id}
                    onClick={() => {
                      setSelectedItinerary(itinerary);
                      setShowForm(false);
                    }}
                    onDelete={() => handleDelete(itinerary.id)}
                  />
                ))
              )}
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          <div className="flex items-center justify-center gap-4 mb-12">
            <h1 className="text-6xl font-bold text-center bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              🌍 Travel Planner AI
            </h1>
          </div>

          {showForm ? (
            <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/40">
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                {isEditing ? '✏️ Editar Itinerario' : '🎆 Nuevo Itinerario'}
              </h2>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">🌍 Destino</label>
                <input
                  type="text"
                  value={preferences.destination}
                  onChange={(e) => setPreferences({ ...preferences, destination: e.target.value })}
                  className="w-full px-5 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 placeholder-gray-500 transition-all backdrop-blur-sm shadow-sm"
                  placeholder="Ej: París, Tokio, Cancún..."
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">
                  ⏱️ Duración (días): <span className="text-blue-600 font-bold">{preferences.duration}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="30"
                  value={preferences.duration}
                  onChange={(e) => setPreferences({ ...preferences, duration: parseInt(e.target.value) })}
                  className="w-full cursor-pointer accent-blue-500"
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">💰 Presupuesto</label>
                <select
                  value={preferences.budget}
                  onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
                  className="w-full px-5 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 cursor-pointer transition-all backdrop-blur-sm shadow-sm"
                >
                  <option value="bajo">💸 Bajo ($)</option>
                  <option value="medio">💵 Medio ($$)</option>
                  <option value="alto">💰 Alto ($$$)</option>
                  <option value="lujo">💎 Lujo ($$$$)</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-3">🎯 Intereses</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {interestOptions.map(interest => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-4 py-3 rounded-2xl font-medium transition-all cursor-pointer shadow-sm ${
                        preferences.interests.includes(interest)
                          ? 'bg-linear-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md scale-[1.02]'
                          : 'bg-white/50 text-gray-700 hover:bg-white/70 hover:text-gray-900 border border-gray-200 backdrop-blur-sm'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-3">
                  📝 Restricciones o preferencias especiales
                </label>
                <textarea
                  value={preferences.restrictions}
                  onChange={(e) => setPreferences({ ...preferences, restrictions: e.target.value })}
                  className="w-full px-5 py-4 bg-white/50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 placeholder-gray-500 transition-all backdrop-blur-sm shadow-sm"
                  rows={4}
                  placeholder="Ej: vegetariano, accesibilidad, evitar lugares concurridos..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]"
              >
                {loading ? '🌌 Generando itinerario...' : (isEditing ? '🔄 Regenerar Itinerario' : '✨ Generar Itinerario')}
              </button>
              
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditing(false);
                  }}
                  className="w-full mt-3 bg-white/50 text-gray-700 font-semibold py-3 px-6 rounded-2xl hover:bg-white/70 hover:text-gray-900 transition-all cursor-pointer border border-gray-200 backdrop-blur-sm"
                >
                  Cancelar
                </button>
              )}
            </form>
          ) : selectedItinerary && (
            <div>
              <div className="bg-linear-to-r from-blue-900 to-blue-600 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-6 border border-white/40">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-4xl font-bold mb-3 bg-white bg-clip-text text-transparent">
                      🌍 {selectedItinerary.preferences.destination.toUpperCase()}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-semibold shadow-sm">
                        ⏱️ {selectedItinerary.preferences.duration} días
                      </span>
                      <span className="px-4 py-2 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-full text-sm font-semibold shadow-sm">
                        💰 {selectedItinerary.preferences.budget}
                      </span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleEdit}
                    className="px-5 py-3 bg-linear-to-r from-blue-950 to-blue-800 text-white rounded-2xl hover:from-blue-950 hover:to-blue-900 transition-all font-semibold flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  >
                    <span>✏️</span>
                    Editar
                  </button>
                </div>
                
                {selectedItinerary.preferences.interests.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-3">🎯 Intereses:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedItinerary.preferences.interests.map(interest => (
                        <span key={interest} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedItinerary.preferences.restrictions && (
                  <div className="mt-5 p-4 bg-linear-to-r from-blue-200/80 to-blue-100/50 rounded-2xl border border-blue-900 shadow-sm">
                    <p className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <span>⚠️</span> Consideraciones:
                    </p>
                    <p className="text-sm text-gray-800">{selectedItinerary.preferences.restrictions}</p>
                  </div>
                )}
              </div>

              {/* Vista por días */}
              {parseItineraryIntoDays(selectedItinerary.itinerary).map(day => (
                <DayView key={day.day} day={day} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
