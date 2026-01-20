import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const cities = [
  'Dusseldorf', 'Aachen', 'Bonn', 'Cologne', 'Berlin', 'Munich', 'Frankfurt'
];

const SearchBar = ({ onSearch, initialValue = '', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(initialValue);

  // Sync state if initialValue changes
  useEffect(() => {
    if (initialValue) {
      setSelectedCity(initialValue);
    }
  }, [initialValue]);

  const handleSelect = (city) => {
    setSelectedCity(city);
    setIsOpen(false);
    if (onSearch) {
      onSearch(city);
    }
  };

  return (
    <div className={`relative w-full ${className} z-30`}>
      {/* The Select Box - Styled to match Filters.jsx inputs */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between 
          bg-white border-2 rounded-lg px-4 py-3
          transition-all duration-200 group
          ${isOpen 
            ? 'border-forestGreen ring-2 ring-forestGreen/10' 
            : 'border-warmSand hover:border-forestGreen/50'
          }
        `}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          <MapPin 
            size={20} 
            className={`flex-shrink-0 transition-colors ${selectedCity ? 'text-forestGreen' : 'text-charcoal/40'}`} 
          />
          
          {selectedCity ? (
            <span className="font-heading font-medium text-charcoal text-lg truncate">
              {selectedCity}
            </span>
          ) : (
            <span className="font-body text-charcoal/50 text-base">
              Select a city...
            </span>
          )}
        </div>

        <ChevronDown
          size={20}
          className={`text-charcoal/40 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-forestGreen' : 'group-hover:text-charcoal/60'}`}
        />
      </button>

      {/* The Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.99 }}
              animate={{ opacity: 1, y: 8, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.99 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 bg-white rounded-lg shadow-xl border border-warmSand/50 overflow-hidden z-50"
            >
              <div className="max-h-60 overflow-y-auto scrollbar-thin">
                <div className="px-4 py-2 text-xs font-semibold text-earthBrown uppercase tracking-wider bg-warmSand/20">
                  Locations
                </div>
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => handleSelect(city)}
                    className={`
                      w-full text-left px-4 py-3 
                      flex items-center justify-between
                      transition-colors duration-150 font-body
                      ${selectedCity === city 
                        ? 'bg-forestGreen/5 text-forestGreen font-medium' 
                        : 'text-charcoal hover:bg-forestGreen/5 hover:text-forestGreen'
                      }
                    `}
                  >
                    <span>{city}</span>
                    {selectedCity === city && <Check size={16} />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Scrollbar Style */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
            width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
            background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
            background: #d4d4d4; 
            border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;