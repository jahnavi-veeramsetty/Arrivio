import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Wifi, Layout, Wind, Coffee, 
  CheckCircle, Star, ShieldCheck, Calendar 
} from 'lucide-react';

// --- MOCK DATA (Ideally this comes from an API or Context based on ID) ---
const property = {
  id: 1,
  title: "Minimalist Loft in Kreuzberg",
  address: "Oranienstraße 24, 10999 Berlin",
  price: 1450,
  rating: 4.9,
  reviews: 24,
  specs: {
    sqm: 85,
    rooms: 2,
    bath: 1
  },
  description: "Experience the authentic Berlin vibe in this carefully curated industrial loft. High ceilings, exposed concrete, and floor-to-ceiling windows create an atmosphere of creative freedom. Located in the heart of Kreuzberg, you are steps away from the city's best coffee roasters and art galleries.",
  amenities: [
    { icon: Wifi, label: "High-Speed WiFi" },
    { icon: Layout, label: "Dedicated Workspace" },
    { icon: Wind, label: "Air Conditioning" },
    { icon: Coffee, label: "Premium Coffee Machine" },
    { icon: ShieldCheck, label: "24/7 Security" },
  ],
  images: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1000&auto=format&fit=crop", // Main
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=500&auto=format&fit=crop", // Side 1
    "https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=500&auto=format&fit=crop"  // Side 2
  ]
};

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="min-h-screen bg-[#EAE8E4] pt-24 pb-12 px-4 md:px-8">
      
      <div className="max-w-7xl mx-auto">
        
        {/* --- NAVIGATION --- */}
        <button 
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-2 text-[#2C3E30]/60 hover:text-[#2C3E30] transition-colors mb-8 font-medium"
        >
          <div className="p-2 rounded-full bg-white/50 group-hover:bg-white transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm uppercase tracking-widest font-bold">Back to Search</span>
        </button>

        {/* --- IMAGE GALLERY (BENTO GRID) --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[500px] mb-12 rounded-[2rem] overflow-hidden shadow-2xl border border-white/40"
        >
          {/* Main Image (Left, Spans 3 cols) */}
          <div className="md:col-span-3 h-full relative group">
             <img src={property.images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
             <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
          </div>
          
          {/* Side Images (Right, Stacked) */}
          <div className="hidden md:flex flex-col gap-4 h-full">
            <div className="h-1/2 relative group overflow-hidden">
               <img src={property.images[1]} alt="Side 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="h-1/2 relative group overflow-hidden">
               <img src={property.images[2]} alt="Side 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               
               {/* "View All" Overlay */}
               <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-serif italic text-lg border-b border-white pb-1">View All Photos</span>
               </button>
            </div>
          </div>
        </motion.div>


        {/* --- MAIN CONTENT LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: DETAILS */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Title Block */}
            <div>
               <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-serif text-[#1A1A1A] mb-2">{property.title}</h1>
                    <div className="flex items-center gap-2 text-[#5C5C50]">
                        <MapPin size={16} />
                        <span className="font-sans text-sm md:text-base">{property.address}</span>
                    </div>
                  </div>
               </div>
               
               {/* Specs Bar */}
               <div className="flex items-center gap-6 mt-6 py-4 border-y border-[#2C3E30]/10">
                  <div className="text-center">
                    <span className="block text-xl font-bold text-[#2C3E30]">{property.specs.sqm}</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#5C5C50]">m²</span>
                  </div>
                  <div className="w-[1px] h-8 bg-[#2C3E30]/10"></div>
                  <div className="text-center">
                    <span className="block text-xl font-bold text-[#2C3E30]">{property.specs.rooms}</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#5C5C50]">Rooms</span>
                  </div>
                  <div className="w-[1px] h-8 bg-[#2C3E30]/10"></div>
                  <div className="text-center">
                    <span className="block text-xl font-bold text-[#2C3E30]">{property.specs.bath}</span>
                    <span className="text-[10px] uppercase tracking-widest text-[#5C5C50]">Bath</span>
                  </div>
               </div>
            </div>

            {/* Description */}
            <div>
               <h3 className="font-serif text-xl text-[#1A1A1A] mb-4">About this home</h3>
               <p className="font-sans text-[#5C5C50] leading-relaxed text-lg">
                 {property.description}
               </p>
            </div>

            {/* Amenities */}
            <div>
               <h3 className="font-serif text-xl text-[#1A1A1A] mb-6">Premium Amenities</h3>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.amenities.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 bg-white/40 rounded-xl border border-white/60">
                       <item.icon size={20} className="text-[#2C3E30]" />
                       <span className="text-[#1A1A1A] font-medium text-sm">{item.label}</span>
                    </div>
                  ))}
               </div>
            </div>

          </div>


          {/* RIGHT COLUMN: STICKY BOOKING CARD */}
          <div className="lg:col-span-1">
             <div className="sticky top-28">
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-[#2C3E30]/5">
                   
                   <div className="flex justify-between items-end mb-6">
                      <div>
                         <span className="text-3xl font-serif font-bold text-[#2C3E30]">€{property.price}</span>
                         <span className="text-[#5C5C50] text-sm ml-1">/ month</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm font-bold text-[#1A1A1A]">
                         <Star size={14} className="fill-[#C2B280] text-[#C2B280]" />
                         {property.rating}
                         <span className="text-[#5C5C50] font-normal underline cursor-pointer">({property.reviews} reviews)</span>
                      </div>
                   </div>

                   {/* Date Picker Dummy */}
                   <div className="border border-[#EAE8E4] rounded-xl p-4 mb-6 cursor-pointer hover:border-[#2C3E30]/30 transition-colors">
                      <div className="flex items-center gap-3 text-[#5C5C50]">
                         <Calendar size={18} />
                         <span className="text-sm font-medium">Select Move-in Date</span>
                      </div>
                   </div>

                   {/* Costs Breakdown */}
                   <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-sm text-[#5C5C50]">
                         <span>Monthly Rent</span>
                         <span>€{property.price}</span>
                      </div>
                      <div className="flex justify-between text-sm text-[#5C5C50]">
                         <span>Service Fee</span>
                         <span>€0</span>
                      </div>
                      <div className="flex justify-between text-sm text-[#5C5C50]">
                         <span>Deposit</span>
                         <span>€{property.price * 2}</span>
                      </div>
                      <div className="h-[1px] bg-[#EAE8E4] my-2"></div>
                      <div className="flex justify-between text-base font-bold text-[#1A1A1A]">
                         <span>Total First Month</span>
                         <span>€{property.price * 3}</span>
                      </div>
                   </div>

                   {/* Action Button */}
                   <button className="w-full py-4 bg-[#2C3E30] text-[#EAE8E4] rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#1A1A1A] hover:scale-[1.02] transition-all shadow-lg">
                      Request to Book
                   </button>
                   
                   <p className="text-center text-[10px] text-[#5C5C50] mt-4">
                      You won't be charged yet.
                   </p>

                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default PropertyDetails;