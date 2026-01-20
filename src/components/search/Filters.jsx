import React, { useState, useRef, useEffect } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const cities = [
  "Berlin",
  "Munich",
  "Frankfurt",
  "Cologne",
  "Bonn",
  "Aachen"
];

const Filters = ({ onFilterChange, activeCity }) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef(null);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    furnished: false,
    parking: false,
    wifi: false,
    city: ""
  });

  /* 🔹 SYNC CITY FROM SEARCH PAGE */
  useEffect(() => {
    if (activeCity !== filters.city) {
      setFilters((prev) => ({
        ...prev,
        city: activeCity || ""
      }));
    }
  }, [activeCity]);

  const update = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const resetFilters = () => {
    const reset = {
      minPrice: "",
      maxPrice: "",
      furnished: false,
      parking: false,
      wifi: false,
      city: ""
    };
    setFilters(reset);
    onFilterChange(reset);
  };

  /* ---------- outside click ---------- */
  useEffect(() => {
    const handleOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setIsOpen((prev) => !prev)}
        className="p-3 bg-white rounded-full border border-black/10 shadow-sm"
      >
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.span key="filter">
              <SlidersHorizontal size={18} />
            </motion.span>
          ) : (
            <motion.span key="close">
              <X size={18} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            className="absolute right-0 mt-4 w-72 bg-white rounded-xl border p-4 shadow-xl z-50 space-y-4"
          >
            {/* CITY */}
            <div>
              <p className="text-sm font-medium mb-2">City</p>
              <div className="flex flex-wrap gap-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() =>
                      update(
                        "city",
                        filters.city === city ? "" : city
                      )
                    }
                    className={`px-3 py-1 rounded-full text-xs font-medium border
                      ${
                        filters.city === city
                          ? "bg-[#2C3E30] text-white"
                          : "bg-white text-black/70"
                      }
                    `}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE */}
            <div>
              <label className="text-sm font-medium">
                Price Range (€)
              </label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={(e) =>
                    update("minPrice", e.target.value)
                  }
                  className="border rounded-lg px-3 py-2"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={(e) =>
                    update("maxPrice", e.target.value)
                  }
                  className="border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            {/* AMENITIES */}
            <div className="space-y-2 text-sm">
              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={filters.furnished}
                  onChange={(e) =>
                    update("furnished", e.target.checked)
                  }
                />
                Furnished
              </label>

              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={filters.parking}
                  onChange={(e) =>
                    update("parking", e.target.checked)
                  }
                />
                Parking
              </label>

              <label className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={filters.wifi}
                  onChange={(e) =>
                    update("wifi", e.target.checked)
                  }
                />
                WiFi
              </label>
            </div>

            <button
              onClick={resetFilters}
              className="w-full text-sm font-semibold text-[#2C3E30] pt-2"
            >
              Reset filters
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Filters;
