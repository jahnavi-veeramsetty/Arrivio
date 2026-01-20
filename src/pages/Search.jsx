import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";

import Filters from "../components/search/Filters";

/* ================= PROPERTY DATA ================= */

const allProperties = [
  {
    id: 1,
    city: "Berlin",
    title: "Minimalist Loft in Kreuzberg",
    price: 1450,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop",
    furnished: true,
    parking: false,
    wifi: true
  },
  {
    id: 2,
    city: "Berlin",
    title: "Sunny Apartment in Mitte",
    price: 1800,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop",
    furnished: true,
    parking: true,
    wifi: true
  },
  {
    id: 3,
    city: "Berlin",
    title: "Artist Studio in Neukölln",
    price: 1200,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop",
    furnished: false,
    parking: false,
    wifi: true
  },
  {
    id: 4,
    city: "Munich",
    title: "Modern Flat near Englischer Garten",
    price: 2100,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1512918760532-446595d04f19?q=80&w=1000&auto=format&fit=crop",
    furnished: true,
    parking: true,
    wifi: true
  },
  {
    id: 5,
    city: "Munich",
    title: "Bavarian Chic in Schwabing",
    price: 1950,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1000&auto=format&fit=crop",
    furnished: true,
    parking: false,
    wifi: true
  },
  {
    id: 6,
    city: "Frankfurt",
    title: "Skyline View Penthouse",
    price: 2400,
    rating: 5.0,
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1000&auto=format&fit=crop",
    furnished: true,
    parking: true,
    wifi: true
  },
  {
    id: 7,
    city: "Frankfurt",
    title: "Business Suite in Westend",
    price: 1750,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=1000&auto=format&fit=crop",
    furnished: false,
    parking: true,
    wifi: true
  },
  {
    id: 8,
    city: "Cologne",
    title: "Belgian Quarter Altbau",
    price: 1350,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da97ee87?q=80&w=1000&auto=format&fit=crop",
    furnished: true,
    parking: false,
    wifi: true
  },
  {
    id: 9,
    city: "Cologne",
    title: "Riverside Apartment Deutz",
    price: 1550,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1534349762913-96c87130f6bf?q=80&w=1000&auto=format&fit=crop",
    furnished: true,
    parking: true,
    wifi: true
  }
];

/* ================= COMPONENT ================= */

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialCity = location.state?.location || "";

  const [searchTerm, setSearchTerm] = useState(initialCity);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    furnished: false,
    parking: false,
    wifi: false,
    city: ""
  });

  /* 🔹 SYNC CITY FROM CITY GRID */
  useEffect(() => {
    if (initialCity) {
      setFilters((prev) => ({
        ...prev,
        city: initialCity
      }));
      setSearchTerm(initialCity);
    }
  }, [initialCity]);

  /* 🔹 SYNC FILTER CITY → SEARCH BAR */
  useEffect(() => {
    if (filters.city !== "") {
      setSearchTerm(filters.city);
    }
  }, [filters.city]);

  /* ================= FILTER LOGIC ================= */

  const filteredProperties = allProperties.filter((p) => {
    const matchesSearch =
      p.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      searchTerm === "";

    const matchesFilterPrice =
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
      matchesFilterPrice &&
      matchesAmenities &&
      matchesCity
    );
  });

  /* ================= UI ================= */

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

      {/* GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => navigate(`/property/${property.id}`)}
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
