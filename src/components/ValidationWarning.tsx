interface ValidationWarningProps {
  show: boolean;
  onClose: () => void;
}

export default function ValidationWarning({ show, onClose }: ValidationWarningProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-orange-200">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Sistema Anti-Alucinaciones
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Este proyecto implementa medidas para detectar y prevenir información incorrecta generada por IA
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
              <span>🔍</span> Validación Automática
            </h3>
            <p className="text-blue-800 text-sm">
              El sistema detecta precios irreales, fechas incorrectas y eventos futuros que requieren verificación
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-2xl border border-green-200">
            <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
              <span>🌐</span> Búsqueda en Internet
            </h3>
            <p className="text-green-800 text-sm">
              Para eventos como el Mundial 2026, se consulta información actualizada en tiempo real usando Serper API (Google Search)
            </p>
          </div>

          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200">
            <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
              <span>📋</span> RAG Knowledge Base
            </h3>
            <p className="text-orange-800 text-sm">
              Se combina información de la base de conocimiento local con datos actualizados para mejor precisión
            </p>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-2xl border border-red-200 mb-6">
          <h3 className="font-semibold text-red-900 mb-2 flex items-center gap-2">
            <span>🚨</span> Advertencias Importantes
          </h3>
          <ul className="text-red-800 text-sm space-y-1">
            <li>• Los precios de eventos especiales siempre requieren verificación oficial</li>
            <li>• Las fechas futuras pueden cambiar sin previo aviso</li>
            <li>• Los boletos para eventos deportivos internacionales suelen agotarse</li>
            <li>• Se recomienda consultar fuentes oficiales antes de realizar reservas</li>
          </ul>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-linear-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02]"
        >
          ✅ Entendido
        </button>
      </div>
    </div>
  );
}