import { useState } from 'react';

interface TravelPreferences {
  destination: string;
  duration: number;
  budget: string;
  interests: string[];
  restrictions: string;
}

export default function TravelForm() {
  const [preferences, setPreferences] = useState<TravelPreferences>({
    destination: '',
    duration: 3,
    budget: 'medio',
    interests: [],
    restrictions: ''
  });

  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState<string | null>(null);

  const interestOptions = [
    'cultura',
    'gastronomía',
    'aire libre',
    'aventura',
    'playa',
    'montaña',
    'historia',
    'vida nocturna'
  ];

  const handleInterestToggle = (interest: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setItinerary(null);

    try {
      const response = await fetch('/api/generate-itinerary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences })
      });

      const data = await response.json();
      setItinerary(data.itinerary);
    } catch (error) {
      console.error('Error:', error);
      setItinerary('Error al generar el itinerario. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Travel Planner AI
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Destino
          </label>
          <input
            type="text"
            value={preferences.destination}
            onChange={(e) => setPreferences({ ...preferences, destination: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ej: París, Tokio, Cancún..."
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Duración (días): {preferences.duration}
          </label>
          <input
            type="range"
            min="1"
            max="30"
            value={preferences.duration}
            onChange={(e) => setPreferences({ ...preferences, duration: parseInt(e.target.value) })}
            className="w-full"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Presupuesto
          </label>
          <select
            value={preferences.budget}
            onChange={(e) => setPreferences({ ...preferences, budget: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="bajo">Bajo ($)</option>
            <option value="medio">Medio ($$)</option>
            <option value="alto">Alto ($$$)</option>
            <option value="lujo">Lujo ($$$$)</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Intereses (selecciona varios)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {interestOptions.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  preferences.interests.includes(interest)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Restricciones o preferencias especiales
          </label>
          <textarea
            value={preferences.restrictions}
            onChange={(e) => setPreferences({ ...preferences, restrictions: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            placeholder="Ej: vegetariano, accesibilidad, evitar lugares concurridos..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-linear-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generando itinerario...' : 'Generar Itinerario'}
        </button>
      </form>

      {itinerary && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Tu Itinerario Personalizado</h2>
          <div className="prose prose-lg max-w-none">
            <pre className="whitespace-pre-wrap text-gray-700 font-sans">{itinerary}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
