import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Wifi, Car, Home, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const RoomCard = ({ room, index = 0 }) => {
  const {
    id,
    image,
    price,
    location,
    amenities = [],
    verified = true,
  } = room;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.06,
        duration: 0.25,
        ease: "easeOut",
      }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="relative"
    >
      <Link
        to={`/property/${id}`}
        className="block group bg-white rounded-[1.75rem] overflow-hidden border border-warmSand/50 shadow-md hover:shadow-2xl transition-shadow duration-300"
      >
        {/* IMAGE */}
        <div className="relative h-52 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={location}
              className="
                absolute inset-0 w-full h-full object-cover
                transition-transform duration-[1400ms] ease-out
                group-hover:scale-110
              "
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-warmSand">
              <Home className="text-forestGreen/30" size={64} />
            </div>
          )}

          {/* GRADIENT */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* VERIFIED */}
          {verified && (
            <div className="absolute top-5 right-5 bg-forestGreen text-white px-3 py-1 rounded-full flex items-center gap-1 text-[11px] font-semibold shadow">
              <CheckCircle size={14} />
              Verified
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {/* Location */}
          <div className="flex items-start gap-2 mb-2">
            <MapPin
              size={18}
              className="text-forestGreen mt-0.5"
            />
            <p className="text-charcoal font-medium leading-snug">
              {location}
            </p>
          </div>

          {/* Price */}
          <div className="mb-4">
            <span className="text-2xl font-heading font-bold text-forestGreen">
              €{price}
            </span>
            <span className="text-charcoal/70 ml-1">/month</span>
          </div>

          {/* Amenities */}
          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {amenities.map((amenity, i) => {
                const icons = {
                  wifi: <Wifi size={16} />,
                  parking: <Car size={16} />,
                  furnished: <Home size={16} />,
                };

                return (
                  <div
                    key={i}
                    className="flex items-center gap-1 text-charcoal/70 text-sm"
                  >
                    {icons[amenity.toLowerCase()] || <Home size={16} />}
                    <span className="capitalize">{amenity}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* INNER BORDER */}
        <div className="absolute inset-3 border border-black/5 rounded-[22px] pointer-events-none group-hover:border-black/10 transition-colors" />
      </Link>
    </motion.div>
  );
};

export default RoomCard;
