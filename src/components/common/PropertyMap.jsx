import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icon for selected location (green/primary color)
const selectedLocationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to update map center when center prop changes
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

const PropertyMap = ({ listings = [], center = [51.1657, 10.4515], zoom = 6, showCenterMarker = false, centerMarkerTitle = '' }) => {
  return (
    <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg border-2 border-warmSand/50">
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
        className="rounded-2xl"
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Center location marker (for selected city) */}
        {showCenterMarker && centerMarkerTitle && (
          <Marker position={center} icon={selectedLocationIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-heading font-semibold text-forestGreen text-sm">
                  {centerMarkerTitle}
                </h3>
              </div>
            </Popup>
          </Marker>
        )}
        {/* Property listings markers */}
        {listings.map((listing, index) => (
          <Marker key={index} position={[listing.lat, listing.lng]}>
            <Popup>
              <div className="p-2">
                <h3 className="font-heading font-semibold text-charcoal text-sm mb-1">
                  {listing.title}
                </h3>
                <p className="font-body text-forestGreen font-medium text-base">
                  €{listing.price}/month
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
