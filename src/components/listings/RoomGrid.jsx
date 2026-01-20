import React from 'react';
import RoomCard from './RoomCard';

const RoomGrid = ({ rooms = [] }) => {
  if (rooms.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-charcoal/70">No rooms available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default RoomGrid;
