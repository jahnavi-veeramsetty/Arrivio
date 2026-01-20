import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const rawTestimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Digital Nomad",
    location: "ARRIVIO Austin",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    content: "I was worried about moving to a new city alone, but ARRIVIO made it instant. I had a community of friends within 24 hours of unpacking.",
    rating: 5
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Software Engineer",
    location: "ARRIVIO Seattle",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    content: "The flexibility is a game changer. Being able to transfer my lease from Seattle to Austin when my project changed saved me so much stress.",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Graduate Student",
    location: "ARRIVIO Boston",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    content: "It's not just a room; it's a lifestyle. The weekly events are curated perfectly, and having all utilities included makes budgeting easier.",
    rating: 5
  },
  {
    id: 4, // Added a duplicate/extra for better flow if needed, or just repeat the list
    name: "David Kim",
    role: "Architect",
    location: "ARRIVIO Berlin",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80",
    content: "The design quality is unmatched. Living in a space that feels curated and intentional has completely changed my daily workflow.",
    rating: 5
  }
];

// Duplicate list for infinite scroll effect
const testimonials = [...rawTestimonials, ...rawTestimonials];

const TestimonialsSection = () => {
  return (
    // Background: Warm Stone (#EAE8E4)
    <section className="py-24 bg-[#EAE8E4] overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* --- HEADER --- */}
        <div className="text-center">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-3 mb-6 opacity-60"
           >
              <div className="w-8 h-[1px] bg-[#2C3E30]"></div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2C3E30] font-sans">
                 Community Voices
              </span>
              <div className="w-8 h-[1px] bg-[#2C3E30]"></div>
           </motion.div>

           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-tight mb-6"
           >
              Stories from the <br/>
              <span className="italic text-[#2C3E30]">Community.</span>
           </motion.h2>
           
           <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-[#5C5C50] font-sans text-lg max-w-2xl mx-auto"
           >
              Don't just take our word for it. Here is what it's like to live at Arrivio.
           </motion.p>
        </div>
      </div>


      {/* --- INFINITE MARQUEE --- */}
      <div className="relative w-full">
         
         {/* Gradient Masks for Fade In/Out Effect at edges */}
         <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#EAE8E4] to-transparent z-10 pointer-events-none"></div>
         <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#EAE8E4] to-transparent z-10 pointer-events-none"></div>

         <div className="flex overflow-hidden">
            <motion.div
               className="flex gap-8 px-4"
               animate={{ x: ["0%", "-50%"] }} // Moves half the total width (since list is doubled)
               transition={{ 
                  repeat: Infinity, 
                  ease: "linear", 
                  duration: 40 // Adjust speed here (higher = slower)
               }}
            >
               {testimonials.map((testimonial, index) => (
                  <div
                     key={`${testimonial.id}-${index}`}
                     className="w-[350px] md:w-[450px] flex-shrink-0"
                  >
                     {/* GLASS CARD */}
                     <div className="bg-[#F5F5F0]/60 backdrop-blur-md border border-white/60 p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
                        
                        {/* Quote Icon */}
                        <div className="absolute top-8 right-8 text-[#2C3E30]/10">
                           <Quote size={48} fill="currentColor" />
                        </div>

                        {/* Rating */}
                        <div className="flex gap-1 mb-6 text-[#C2B280]">
                           {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                           ))}
                        </div>

                        {/* Content */}
                        <p className="text-[#1A1A1A]/80 font-serif text-lg leading-relaxed mb-8 flex-grow italic">
                           "{testimonial.content}"
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-4 mt-auto">
                           <img 
                              src={testimonial.image} 
                              alt={testimonial.name}
                              className="w-12 h-12 rounded-full object-cover border border-[#2C3E30]/20"
                           />
                           <div>
                              <h4 className="font-sans font-bold text-[#1A1A1A] text-sm">
                                 {testimonial.name}
                              </h4>
                              <p className="text-[10px] text-[#5C5C50] font-bold uppercase tracking-wider">
                                 {testimonial.role} • {testimonial.location}
                              </p>
                           </div>
                        </div>

                     </div>
                  </div>
               ))}
            </motion.div>
         </div>
      </div>

    </section>
  );
};

export default TestimonialsSection;