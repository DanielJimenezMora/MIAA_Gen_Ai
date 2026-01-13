import { useState } from 'react';

interface SpecificDataRequest {
  type: 'mundial_2026' | 'flight_costs' | 'event_tickets' | 'accommodation_prices';
  title: string;
  description: string;
  fields: {
    name: string;
    label: string;
    type: 'text' | 'number' | 'select' | 'textarea';
    placeholder?: string;
    options?: string[];
    required?: boolean;
  }[];
}

interface SpecificDataModalProps {
  show: boolean;
  request: SpecificDataRequest | null;
  onComplete: (data: Record<string, string>) => void;
  onSkip: () => void;
}

export default function SpecificDataModal({ show, request, onComplete, onSkip }: SpecificDataModalProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  if (!show || !request) return null;

  const handleInputChange = (fieldName: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleSubmit = () => {
    onComplete(formData);
    setFormData({});
  };

  const handleSkip = () => {
    onSkip();
    setFormData({});
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'mundial_2026': return '⚽';
      case 'flight_costs': return '✈️';
      case 'event_tickets': return '🎫';
      case 'accommodation_prices': return '🏨';
      default: return '❓';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-2xl w-full p-8 border border-white/50 max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{getIcon(request.type)}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            {request.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">
            {request.description}
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <span>💡</span> ¿Por qué pedimos esto?
          </h3>
          <p className="text-blue-800 text-sm">
            Para evitar información incorrecta, necesitamos que proporciones los datos específicos que tienes. 
            Esto nos ayuda a generar un itinerario más preciso y confiable.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {request.fields.map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 font-semibold mb-2">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              
              {field.type === 'text' || field.type === 'number' ? (
                <input
                  type={field.type}
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 placeholder-gray-500 transition-all backdrop-blur-sm shadow-sm"
                  placeholder={field.placeholder}
                />
              ) : field.type === 'select' ? (
                <select
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 cursor-pointer transition-all backdrop-blur-sm shadow-sm"
                >
                  <option value="">Seleccionar...</option>
                  {field.options?.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === 'textarea' ? (
                <textarea
                  value={formData[field.name] || ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-900 placeholder-gray-500 transition-all backdrop-blur-sm shadow-sm"
                  placeholder={field.placeholder}
                  rows={3}
                />
              ) : null}
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleSkip}
            className="flex-1 bg-white/70 text-gray-700 font-semibold py-3 px-6 rounded-2xl hover:bg-white/90 transition-all cursor-pointer border border-gray-200 backdrop-blur-sm"
          >
            🚫 Continuar sin estos datos
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02]"
          >
            ✅ Usar estos datos
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Estos datos se usarán solo para generar tu itinerario y no se guardan permanentemente.
          </p>
        </div>
      </div>
    </div>
  );
}