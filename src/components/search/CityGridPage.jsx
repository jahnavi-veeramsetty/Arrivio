import React from 'react';
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

// ALPHABETICAL ORDER
const cities = [
  { id: 1, name: "Aachen", count: 8, price: "580", img: aachen, description: "Innovation Hub" },
  { id: 2, name: "Berlin", count: 42, price: "750", img: berlin, description: "Creative Capital" },
  { id: 3, name: "Bonn", count: 9, price: "650", img: bonn, description: "Historic Charm" },
  { id: 4, name: "Cologne", count: 12, price: "720", img: cologne, description: "Media City" },
  { id: 5, name: "Dusseldorf", count: 24, price: "780", img: dusseldorf, description: "Fashion & Art" },
  { id: 6, name: "Frankfurt", count: 15, price: "850", img: frankfurt, description: "Finance Center" },
  { id: 7, name: "Munich", count: 18, price: "950", img: munich, description: "Tech & Tradition" },
  {
    id: 8,
    name: "All Cities",
    count: 128,
    price: "—",
    img: berlin,
    description: "Explore Everything",
    all: true,
  },
];

const CityGridPage = () => {
  const navigate = useNavigate();

  const handleCityClick = (city) => {
    if (city.all) {
      navigate('/search');
    } else {
      navigate('/search', { state: { location: city.name } });
    }
  };


  return (
    <div className="min-h-screen w-full bg-[#EAE8E4] px-4 md:px-12 pt-28 pb-12 flex flex-col">
      
      {/* --- HEADER SECTION (Centered, Colored, No Button) --- */}
      <div className="flex flex-col items-center justify-center mb-12 border-b border-[#1A1A1A]/10 pb-10">
        
        {/* Main Title: Green + Gold Accent */}
        <h2 className="font-serif text-5xl md:text-7xl text-[#2C3E30] leading-tight mb-4 text-center">
           Select your <span className="italic text-[#C2B280]">destination.</span>
        </h2>

        {/* Subtext */}
        <p className="text-[#1A1A1A]/60 font-sans text-sm md:text-lg max-w-xl text-center leading-relaxed">
           From the creative avenues of Berlin to the historic streets of Bonn. 
           Explore our curated collection of premium apartments.
        </p>

      </div>

      {/* --- CITY GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-full mx-auto w-full pb-12">
        {cities.map((city, index) => (
            <motion.div 
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleCityClick(city)} 
              className="group relative h-[320px] rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500"
            >
                {/* Image */}
                <img 
                  src={city.img} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[10%] group-hover:grayscale-0" 
                  alt={city.name} 
                  loading="lazy" 
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
                <div className="absolute inset-0 bg-black/0 md:group-hover:bg-black/30 transition-colors duration-500"></div>

                {/* --- Top Right Badge (Count) --- */}
                {/* Mobile: Always Visible | Desktop: Hidden until hover */}
                <div className="absolute top-6 right-6 flex items-center gap-2 transition-all duration-300 opacity-100 translate-y-0 md:opacity-0 md:translate-y-[-5px] md:group-hover:opacity-100 md:group-hover:translate-y-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse"></div>
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest drop-shadow-md">{city.count} Units</span>
                </div>

                {/* --- Center Content --- */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                    
                    {/* Content Wrapper */}
                    <div className="flex flex-col items-center transform transition-transform duration-500 translate-y-[-10px] md:translate-y-0 md:group-hover:-translate-y-4">
                        
                        {/* Description */}
                        <p className="text-white/70 font-serif italic text-sm mb-2 transition-all duration-500 opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                          {city.description}
                        </p>
                        
                        {/* Title */}
                        <h3 className="text-white font-serif text-5xl tracking-tight font-medium drop-shadow-2xl mb-1">
                          {city.name}
                        </h3>
                        
                        {/* Decorative Line */}
                        <div className="h-[2px] bg-[#C2B280] mt-2 transition-all duration-500 ease-out w-12 md:w-0 md:group-hover:w-16"></div>
                    </div>

                    {/* --- Bottom Action (Explore) --- */}
                    <div className="absolute bottom-8 transition-all duration-500 delay-150 opacity-100 translate-y-0 md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0">
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-[#C2B280] text-xs font-bold uppercase tracking-widest mb-1">Starting from €{city.price}</span>
                          <div className="flex items-center gap-2 text-white border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-[#2C3E30] transition-colors bg-white/5 backdrop-blur-sm">
                              <span className="text-[10px] font-bold uppercase tracking-widest">View Homes</span>
                              <ArrowRight size={12} />
                          </div>
                        </div>
                    </div>
                </div>

                {/* Inner Border */}
                <div className="absolute inset-3 border border-white/10 rounded-[24px] pointer-events-none transition-colors group-hover:border-white/20"></div>
            </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CityGridPage;