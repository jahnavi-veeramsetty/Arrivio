import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// --- IMPORT LOCAL ASSETS ---
import berlin from '../../assets/cities/berlin.jpeg';
import munich from '../../assets/cities/munich.jpeg';
import dusseldorf from '../../assets/cities/dusseldorf.jpeg';
import frankfurt from '../../assets/cities/frankfurt.jpeg';
import cologne from '../../assets/cities/cologne.jpeg';
import aachen from '../../assets/cities/aachen.jpeg';
import bonn from '../../assets/cities/bonn.jpeg';
import hamburg from '../../assets/cities/hamburg.jpg';

// --- CITY META (UI ONLY) ---
const cityMeta = {
  aachen: { img: aachen, description: "Innovation Hub", price: "580" },
  berlin: { img: berlin, description: "Creative Capital", price: "750" },
  bonn: { img: bonn, description: "Historic Charm", price: "650" },
  cologne: { img: cologne, description: "Media City", price: "720" },
  dusseldorf: { img: dusseldorf, description: "Fashion & Art", price: "780" },
  frankfurt: { img: frankfurt, description: "Finance Center", price: "850" },
  munich: { img: munich, description: "Tech & Tradition", price: "950" },
  hamburg: { img: hamburg, description: "Harbor Lifestyle", price: "780" },
};

const CityGridPage = () => {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/cities")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map((city) => {
        const slug = city.slug?.toLowerCase();
        const meta = cityMeta[slug] || {};

        return {
          name: city.name,
          slug: slug,
          count: city.totalUnits,
          price: meta.price || "700",
          description: meta.description || "Premium Living",
          img: meta.img || berlin,
        };
      });


        formatted.push({
          name: "All Cities",
          all: true,
          count: 128,
          price: "—",
          description: "Explore Everything",
          img: berlin,
        });

        setCities(formatted);
      });
  }, []);

  const handleCityClick = (city) => {
    if (city.all) {
      navigate('/search');
    } else {
      navigate('/search', { state: { location: city.name } });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#EAE8E4] px-4 md:px-12 pt-28 pb-12 flex flex-col">

      {/* HEADER */}
      <div className="flex flex-col items-center justify-center mb-12 border-b border-[#1A1A1A]/10 pb-10">
        <h2 className="font-serif text-5xl md:text-7xl text-[#2C3E30] leading-tight mb-4 text-center">
          Select your <span className="italic text-[#C2B280]">destination.</span>
        </h2>

        <p className="text-[#1A1A1A]/60 font-sans text-sm md:text-lg max-w-xl text-center leading-relaxed">
          From the creative avenues of Berlin to the historic streets of Bonn.
          Explore our curated collection of premium apartments.
        </p>
      </div>

      {/* CITY GRID — ORIGINAL JSX RESTORED */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-full mx-auto w-full pb-12">
        {cities.map((city, index) => (
          <motion.div
            key={city.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8, scale: 1.03 }}
            transition={{
              delay: index * 0.05,
              duration: 0.18,
              ease: "easeOut"
            }}
            onClick={() => handleCityClick(city)}
            className="group relative h-[320px] rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl"
          >


            {/* IMAGE */}
            <img
              src={city.img}
              alt={city.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0"
            />

            {/* OVERLAYS */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/30 transition-colors duration-500"></div>

            {/* COUNT BADGE */}
            <div className="absolute top-6 right-6 flex items-center gap-2 transition-all duration-300 opacity-100 translate-y-0 md:opacity-0 md:translate-y-[-5px] md:group-hover:opacity-100 md:group-hover:translate-y-0">
              <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse"></div>
              <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">
                {city.count} Units
              </span>
            </div>

            {/* CENTER CONTENT */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
              <div className="flex flex-col items-center transform transition-transform duration-500 translate-y-[-10px] md:translate-y-0 md:group-hover:-translate-y-4">

                <p className="text-white/70 font-serif italic text-sm mb-2 transition-all duration-500 opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                  {city.description}
                </p>

                <h3 className="text-white font-serif text-5xl tracking-tight font-medium drop-shadow-2xl mb-1">
                  {city.name}
                </h3>

                <div className="h-[2px] bg-[#C2B280] mt-2 transition-all duration-500 ease-out w-12 md:w-0 md:group-hover:w-16"></div>
              </div>

              {/* BOTTOM CTA */}
              <div className="absolute bottom-8 transition-all duration-500 delay-150 opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[#C2B280] text-xs font-bold uppercase tracking-widest mb-1">
                    Starting from €{city.price}
                  </span>

                  <div className="flex items-center gap-2 text-white border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-[#2C3E30] transition-colors bg-white/5 backdrop-blur-sm">
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      View Homes
                    </span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </div>
            </div>

            {/* INNER BORDER */}
            <div className="absolute inset-3 border border-white/10 rounded-[24px] pointer-events-none transition-colors group-hover:border-white/20"></div>

          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CityGridPage;
