'use client'; 

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import L from 'leaflet';

// Fix marker icon not showing issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon.src ?? icon,
  shadowUrl: iconShadow.src ?? iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function GymMap({
  onLocationSelect,
  center,
  isMarked,
  markLoc
}: {
  onLocationSelect?: (lat: number, lng: number) => void,
  center: [number, number],
  isMarked?: boolean,
  markLoc?: [number, number]
}) {
  const [marker, setMarker] = useState<[number, number] | null>(null);
  function ClickHandler() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarker([lat, lng]);
        onLocationSelect?.(lat, lng);
      },
    });
    return null;
  }

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <ClickHandler />
      {(marker && !isMarked) && <Marker position={marker} />}
      {(isMarked && markLoc) && <Marker position={markLoc} />}
    </MapContainer>
  );
}
