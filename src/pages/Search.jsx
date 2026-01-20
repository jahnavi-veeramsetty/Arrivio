import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

import Filters from "../components/search/Filters";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  /* =======================
     READ DATA FROM LINK
     ======================= */

  const initialCity = location.state?.location || "";
  const initialMinPrice = location.state?.minPrice || "";
  const initialMaxPrice = location.state?.maxPrice || "";

  /* =======================
     STATE
     ======================= */

  const [searchTerm, setSearchTerm] = useState(initialCity);
  const [allProperties, setAllProperties] = useState([]);

  const [filters, setFilters] = useState({
    minPrice: initialMinPrice,
    maxPrice: initialMaxPrice,
    furnished: false,
    parking: false,
    wifi: false,
    city: initialCity
  });

  /* =======================
     FETCH LISTINGS
     ======================= */

  useEffect(() => {
    let url = "http://localhost:5000/api/listings";

    if (filters.city) {
      url += `?city=${filters.city}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllProperties(data))
      .catch(console.error);
  }, [filters.city]);

  /* =======================
     FILTER LOGIC
     ======================= */

  const filteredProperties = allProperties.filter((p) => {
    const matchesSearch =
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchTerm === "";

    const matchesPrice =
      (!filters.minPrice || p.price >= Number(filters.minPrice)) &&
      (!filters.maxPrice || p.price <= Number(filters.maxPrice));

    const matchesAmenities =
      (!filters.furnished || p.furnished) &&
      (!filters.parking || p.parking) &&
      (!filters.wifi || p.wifi);

    const matchesCity =
      !filters.city || p.city === filters.city;

    return (
      matchesSearch &&
      matchesPrice &&
      matchesAmenities &&
      matchesCity
    );
  });

  /* =======================
     UI
     ======================= */

  return (
    <div className="min-h-screen bg-[#EAE8E4] pt-28 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6">

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2C3E30]/60">
              {filteredProperties.length} Results Found
            </span>

            <h1 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mt-2">
              Stays in{" "}
              <span className="italic text-[#2C3E30]">
                {filters.city || "Germany"}
              </span>
            </h1>
          </div>

          {/* SEARCH + FILTER */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <SearchIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40"
                size={18}
              />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search city..."
                className="w-full bg-white/50 border rounded-full py-3 pl-12 pr-4"
              />
            </div>

            <Filters
              onFilterChange={setFilters}
              activeCity={filters.city}
            />
          </div>
        </div>
      </div>

      {/* LISTINGS GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property, index) => (
          <motion.div
            key={property._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => navigate(`/property/${property._id}`)}
            className="cursor-pointer"
          >
            <img
              src={property.image}
              alt={property.title}
              className="h-[280px] w-full object-cover rounded-2xl"
            />

            <h3 className="mt-3 font-serif text-xl">
              {property.title}
            </h3>

            <p className="text-sm opacity-70">
              €{property.price} / month
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Search;
