import { useState, useEffect } from 'react';

interface LoadingModalProps {
  isOpen: boolean;
  onComplete: () => void;
  destination: string;
}

export default function LoadingModal({ isOpen, onComplete, destination }: LoadingModalProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    '🔍 Analizando preferencias de viaje...',
    '🌍 Explorando destinos y atracciones...',
    '🏨 Buscando mejores opciones de alojamiento...',
    '🍽️ Investigando gastronomía local...',
    '🎯 Personalizando actividades...',
    '✨ Creando tu itinerario perfecto...'
  ];

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setCurrentStep('');
      setIsComplete(false);
      return;
    }

    let currentProgress = 0;
    let stepIndex = 0;

    const interval = setInterval(() => {
      currentProgress += Math.random() * 15 + 5;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setCurrentStep('¡Listo! Tu itinerario está completo 🎉');
        setIsComplete(true);
        clearInterval(interval);
      } else {
        setProgress(Math.min(currentProgress, 99));
        
        const newStepIndex = Math.min(
          Math.floor((currentProgress / 100) * steps.length),
          steps.length - 1
        );
        
        if (newStepIndex !== stepIndex) {
          stepIndex = newStepIndex;
          setCurrentStep(steps[stepIndex]);
        }
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-md w-full p-10 animate-in slide-in-from-bottom duration-500 border border-white/50">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce" style={{ animationDuration: '2s' }}>🚀</div>
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Generando tu viaje a {destination}
          </h2>
          <p className="text-gray-600 text-sm font-medium">
            Nuestro asistente de IA está trabajando en tu itinerario...
          </p>
        </div>

        {/* Barra de progreso */}
        <div className="mb-8">
          <div className="bg-gray-200/50 rounded-full h-3 overflow-hidden border border-gray-300/30 shadow-inner">
            <div
              className="bg-linear-to-r from-blue-500 to-purple-600 h-full transition-all duration-500 ease-out flex items-center justify-end pr-2 shadow-lg"
              style={{ width: `${progress}%` }}
            >
              {progress > 10 && (
                <span className="text-white text-xs font-black drop-shadow-lg relative z-10">
                  {Math.round(progress)}%
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Estado actual */}
        <div className="text-center mb-6">
          <p className="text-gray-700 font-medium min-h-6 transition-all text-sm animate-pulse">
            {currentStep}
          </p>
        </div>

        {/* Botón Ver (solo cuando está completo) */}
        {isComplete && (
          <button
            onClick={onComplete}
            className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          >
            🎉 Ver mi itinerario
          </button>
        )}

        {/* Animación de puntos si aún está cargando */}
        {!isComplete && (
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-2.5 h-2.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2.5 h-2.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2.5 h-2.5 bg-linear-to-r from-blue-500 to-purple-600 rounded-full animate-bounce shadow-sm" style={{ animationDelay: '300ms' }}></div>
          </div>
        )}
      </div>
    </div>
  );
}
