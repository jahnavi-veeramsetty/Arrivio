import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Wifi, Car, Home, CheckCircle } from 'lucide-react';

const RoomCard = ({ room }) => {
  const {
    id,
    image,
    price,
    location,
    amenities = [],
    verified = true,
  } = room;

  return (
    <Link 
      to={`/property/${id}`}
      className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-warmSand/50"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-warmSand overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={location} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Home className="text-forestGreen/30" size={64} />
          </div>
        )}
        
        {/* Verified Badge */}
        {verified && (
          <div className="absolute top-3 right-3 bg-forestGreen text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-medium">
            <CheckCircle size={14} />
            Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Location */}
        <div className="flex items-start gap-2 mb-2">
          <MapPin className="text-forestGreen mt-0.5 flex-shrink-0" size={18} />
          <p className="text-charcoal font-medium">{location}</p>
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
          <div className="flex flex-wrap gap-3">
            {amenities.map((amenity, index) => {
              const icons = {
                wifi: <Wifi size={16} />,
                parking: <Car size={16} />,
                furnished: <Home size={16} />,
              };
              
              return (
                <div 
                  key={index}
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
    </Link>
  );
};

export default RoomCard;
