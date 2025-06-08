import React, { useEffect, useState } from 'react';
import { defaultSkip, type Skip } from '../types/skip';



interface Props {
  postcode: string;
  area: string;
  onContinue: (skip: Skip) => void;
}

const SkipSelector: React.FC<Props> = ({ postcode, area, onContinue }) => {
  const [skips, setSkips] = useState<Skip[]>([defaultSkip]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://app.wewantwaste.co.uk/api/skips/by-location?postcode=${postcode}&area=${area}`)
      .then((res) => res.json())
      .then((data) => {
        setSkips(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch skips', err);
        setLoading(false);
      });
  }, [postcode, area]);

  const selected = skips.find((s) => s.id === selectedId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Choose Your Skip Size</h1>
        <p className="text-gray-600">Select the skip size that best suits your needs</p>
      </header>

      {/* Loader */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, idx) => (
      <div
        key={idx}
        className=" rounded-xl shadow-md p-4 animate-pulse flex flex-col gap-4 bg-white"
      >
        <div className="bg-gray-200 h-40 w-full rounded-md" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-5 bg-gray-300 rounded w-1/4" />
        <div className="mt-auto h-8 bg-gray-200 rounded w-full" />
      </div>
    ))}
  </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skips.map((skip) => {
            const isSelected = skip.id === selectedId;
            return (
              <button
                key={skip.id}
                onClick={() => setSelectedId(skip.id)}
                className={`group relative border rounded-xl overflow-hidden shadow hover:shadow-lg transition-all p-4 text-left flex flex-col gap-3 focus:outline-none ${
                  isSelected ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white'
                }`}
                aria-pressed={isSelected}
              >
                {/* Badge */}
                <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded shadow">
                  {skip.size} Yards
                </span>

                {/* Image */}
                <img
                  src={'https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/4-yarder-skip.jpg'}
                  alt={`${skip.size}-yard skip`}
                  className="w-full h-80 object-contain"
                />

                {/* Details */}
                <div>
                  <h2 className="text-lg font-semibold">{skip.size} Yard Skip</h2>
                  <p className="text-sm text-gray-600">{skip.hire_period_days}-day hire period</p>
                  <p className="text-xl font-bold text-blue-700 mt-1">£{skip.price_before_vat}</p>
                </div>

                {/* CTA */}
                <div className="mt-auto w-full text-center">
                  <div
                    className={`w-full h-10 flex items-center justify-center text-sm font-medium  rounded ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 group-hover:bg-blue-100'
                    }`}
                  >
                    {isSelected ? 'Selected' : 'Select this skip'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Bottom bar */}
      {selected && (
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-300 px-4 py-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center z-50 gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="font-semibold text-base">{selected.size} Yard Skip</span>
            <span className="text-blue-700 font-bold text-base">£{selected.price_before_vat}</span>
            <span className="text-gray-600 text-sm">{selected.hire_period_days}-day hire</span>
          </div>
          <button
            onClick={() => onContinue(selected)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-2 rounded transition"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default SkipSelector;
