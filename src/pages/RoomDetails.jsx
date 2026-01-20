import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Star, Wifi, Coffee, Monitor, CheckCircle, 
  Shield, User, ArrowLeft, Heart, Share2, Sparkles 
} from 'lucide-react';
import Button from '../components/common/Button';

const RoomDetails = () => {
  // In a real app, use: const { id } = useParams();

  // Mock Data
  const room = {
    title: "Sun-drenched Studio in Berlin Mitte",
    location: "Torstraße, 10119 Berlin",
    type: "Private Studio",
    rating: 4.9,
    reviews: 24,
    price: 950,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80", // Main
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a1c002085aa2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: [
      { icon: <Wifi size={20} />, label: "Fast Wifi (500mbps)" },
      { icon: <Monitor size={20} />, label: "Work Desk" },
      { icon: <Coffee size={20} />, label: "Coffee Machine" },
      { icon: <User size={20} />, label: "Weekly Cleaning" },
      { icon: <Shield size={20} />, label: "24/7 Security" },
    ],
    description: "Experience the heartbeat of Berlin in this fully furnished, designer studio. Located directly on Torstraße, you are steps away from the city's best cafes, galleries, and startups. The space features floor-to-ceiling windows, a dedicated ergonomic workspace, and a rain shower. Perfect for digital nomads and professionals.",
    host: {
      name: "Anna S.",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
    }
  };

  return (
    <div className="min-h-screen bg-softWhite pt-28 pb-20">
      
      {/* Top Navigation / Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Link to="/search" className="inline-flex items-center text-charcoal/60 hover:text-forestGreen transition-colors gap-2 font-medium text-sm group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/>
          Back to Search
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-forestGreen mb-3">
              {room.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/70">
              <span className="flex items-center gap-1 font-bold text-charcoal">
                <Star size={16} className="text-forestGreen fill-current" />
                {room.rating}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="underline cursor-pointer hover:text-forestGreen">{room.reviews} reviews</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <MapPin size={16} />
                {room.location}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="bg-forestGreen/10 text-forestGreen px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide">
                Verified
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-warmSand rounded-full text-sm font-medium hover:bg-white hover:shadow-md transition-all">
              <Share2 size={16} /> <span className="hidden sm:inline">Share</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-warmSand rounded-full text-sm font-medium hover:bg-white hover:shadow-md transition-all">
              <Heart size={16} /> <span className="hidden sm:inline">Save</span>
            </button>
          </div>
        </div>

        {/* Image Grid (Airbnb Style) */}
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[300px] md:h-[500px] mb-12 rounded-3xl overflow-hidden shadow-sm">
          <div className="col-span-4 md:col-span-2 row-span-2 relative group cursor-pointer">
            <img src={room.images[0]} alt="Main" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
          </div>
          <div className="hidden md:block col-span-1 row-span-1 relative group cursor-pointer">
            <img src={room.images[1]} alt="Detail 1" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="hidden md:block col-span-1 row-span-1 relative group cursor-pointer">
            <img src={room.images[2]} alt="Detail 2" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="hidden md:block col-span-1 row-span-1 relative group cursor-pointer">
            <img src={room.images[3]} alt="Detail 3" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </div>
          <div className="hidden md:block col-span-1 row-span-1 relative group cursor-pointer">
            <img src={room.images[4]} alt="Detail 4" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <button className="absolute bottom-4 right-4 bg-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg hover:scale-105 transition-transform">
              Show all photos
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
          
          {/* LEFT: Details */}
          <div className="lg:col-span-2 space-y-10">
            
            {/* Host Info */}
            <div className="flex items-center justify-between border-b border-warmSand/30 pb-8">
              <div>
                <h3 className="text-xl font-heading font-bold text-charcoal">Hosted by {room.host.name}</h3>
                <p className="text-charcoal/60 text-sm">{room.host.role}</p>
              </div>
              <img src={room.host.image} alt={room.host.name} className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover" />
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b border-warmSand/30 pb-8">
                <div className="flex gap-4">
                    <div className="p-2 bg-warmSand/20 rounded-lg h-fit text-forestGreen"><CheckCircle size={24}/></div>
                    <div>
                        <h4 className="font-bold text-charcoal">Self Check-in</h4>
                        <p className="text-sm text-charcoal/60">Check yourself in with the smart lock.</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="p-2 bg-warmSand/20 rounded-lg h-fit text-forestGreen"><Monitor size={24}/></div>
                    <div>
                        <h4 className="font-bold text-charcoal">Designed for Work</h4>
                        <p className="text-sm text-charcoal/60">Fast wifi and dedicated workspace.</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="border-b border-warmSand/30 pb-8">
              <h3 className="text-xl font-heading font-bold text-charcoal mb-4">About this home</h3>
              <p className="text-charcoal/80 leading-relaxed font-body">
                {room.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="border-b border-warmSand/30 pb-8">
              <h3 className="text-xl font-heading font-bold text-charcoal mb-6">What this place offers</h3>
              <div className="grid grid-cols-2 gap-4">
                {room.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-charcoal/80">
                    <span className="text-forestGreen/70">{item.icon}</span>
                    <span className="font-body text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
              <button className="mt-6 border border-charcoal text-charcoal px-6 py-3 rounded-lg font-bold text-sm hover:bg-charcoal hover:text-white transition-all">
                  Show all amenities
              </button>
            </div>

            {/* Map Placeholder */}
            <div>
              <h3 className="text-xl font-heading font-bold text-charcoal mb-4">Where you'll be</h3>
              <div className="w-full h-80 bg-warmSand/10 rounded-2xl border border-warmSand/30 flex items-center justify-center relative overflow-hidden group">
                 {/* Decorative Map Pattern */}
                 <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2F4F4F 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                 <div className="text-center z-10 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/50">
                   <MapPin size={32} className="mx-auto text-forestGreen mb-2" />
                   <p className="font-heading font-bold text-forestGreen">Berlin Mitte</p>
                   <p className="text-xs text-charcoal/60 mt-1">Exact location provided after booking</p>
                 </div>
              </div>
            </div>

          </div>

          {/* RIGHT: Sticky Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white p-6 rounded-2xl border border-warmSand/40 shadow-xl shadow-warmSand/10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-3xl font-heading font-bold text-forestGreen">€{room.price}</span>
                  <span className="text-charcoal/60 text-lg"> / month</span>
                </div>
              </div>

              {/* Date Selection Mockup */}
              <div className="border border-charcoal/20 rounded-xl mb-4 overflow-hidden">
                <div className="grid grid-cols-2 border-b border-charcoal/20">
                   <div className="p-3 border-r border-charcoal/20 hover:bg-gray-50 cursor-pointer transition-colors">
                     <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/60">Check-in</label>
                     <div className="text-sm font-medium text-charcoal mt-1">Oct 1</div>
                   </div>
                   <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                     <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/60">Check-out</label>
                     <div className="text-sm font-medium text-charcoal mt-1">Dec 31</div>
                   </div>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                   <label className="block text-[10px] font-bold uppercase tracking-wider text-charcoal/60">Guests</label>
                   <div className="text-sm font-medium text-charcoal mt-1">1 Guest</div>
                </div>
              </div>

              <Button variant="primary" className="w-full justify-center py-4 text-lg mb-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02]">
                Request to Book
              </Button>

              <div className="text-center text-xs text-charcoal/50 mb-6">
                You won't be charged yet
              </div>

              <div className="space-y-3 pt-4">
                <div className="flex justify-between text-charcoal/80 text-sm">
                  <span className="underline decoration-charcoal/30">€{room.price} x 3 months</span>
                  <span>€{room.price * 3}</span>
                </div>
                <div className="flex justify-between text-charcoal/80 text-sm">
                  <span className="underline decoration-charcoal/30">Service fee</span>
                  <span>€0</span>
                </div>
                <div className="my-4 border-t border-warmSand/50"></div>
                <div className="flex justify-between font-bold text-forestGreen text-lg">
                  <span>Total</span>
                  <span>€{room.price * 3}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-warmSand/10 p-4 rounded-xl flex gap-3 items-start border border-warmSand/30">
                <Sparkles size={20} className="text-mutedGold flex-shrink-0 mt-0.5" />
                <div>
                   <p className="font-bold text-sm text-charcoal">This is a rare find.</p>
                   <p className="text-xs text-charcoal/70">Anna's place is usually booked.</p>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RoomDetails;