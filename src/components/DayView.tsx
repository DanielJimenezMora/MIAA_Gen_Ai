import { useState } from 'react';
import type { DaySchedule } from '../types/itinerary';

interface DayViewProps {
  day: DaySchedule;
}

export default function DayView({ day }: DayViewProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('morning');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const TimeSection = ({ 
    title, 
    emoji, 
    items, 
    bgColor, 
    sectionKey 
  }: { 
    title: string; 
    emoji: string; 
    items: string[]; 
    bgColor: string;
    sectionKey: string;
  }) => {
    const isExpanded = expandedSection === sectionKey;

    return (
      <div className={`rounded-2xl overflow-hidden ${bgColor} mb-4 border backdrop-blur-xl shadow-lg`}>
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full px-6 py-4 flex justify-between items-center hover:bg-white/5 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{emoji}</span>
            <span className="font-semibold text-lg text-gray-800">{title}</span>
          </div>
          <svg
            className={`w-5 h-5 transition-transform text-gray-500 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isExpanded && (
          <div className="px-6 pb-4 space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 bg-white/40 backdrop-blur-md p-4 rounded-xl border border-white/30 shadow-sm">
                <span className="text-blue-600 mt-0.5 font-medium">▸</span>
                <p className="text-gray-800 flex-1 leading-relaxed text-sm">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-6 border border-white/40">
      <div className="border-b border-gray-200/50 pb-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-linear-to-br from-blue-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
            {day.day}
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{day.title}</h2>
            <p className="text-sm text-gray-600 font-medium mt-1">🗓️ Día {day.day}</p>
          </div>
        </div>
      </div>

      <TimeSection
        title="Mañana"
        emoji="🌅"
        items={day.morning}
        bgColor="bg-linear-to-r from-yellow-100/80 to-orange-100/80 border-orange-200"
        sectionKey="morning"
      />

      <TimeSection
        title="Tarde"
        emoji="🌞"
        items={day.afternoon}
        bgColor="bg-linear-to-r from-blue-100/80 to-cyan-100/80 border-blue-200"
        sectionKey="afternoon"
      />

      <TimeSection
        title="Noche"
        emoji="🌙"
        items={day.evening}
        bgColor="bg-linear-to-r from-purple-100/80 to-indigo-100/80 border-purple-200"
        sectionKey="evening"
      />

      {day.budget && (
        <div className="mt-6 p-5 bg-linear-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-md rounded-2xl border border-green-200 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💵</span>
            <p className="font-semibold text-gray-800">
              Presupuesto estimado: <span className="text-green-700 font-bold">{day.budget}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
