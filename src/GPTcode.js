import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

function GPTcode() {
  const [markers, setMarkers] = useState([]);

  function handleAddMarker(e) {
    const newMarker = {
      id: Date.now(),
      position: e.latlng,
    };
    setMarkers((markers) => [...markers, newMarker]);
  }

  function handleDeleteMarker(id) {
    setMarkers((markers) => markers.filter((marker) => marker.id !== id));
  }

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} doubleClickZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={marker.position}
          eventHandlers={{ dblclick: () => handleDeleteMarker(marker.id) }}
        >
          <Popup>{`Latitude: ${marker.position.lat.toFixed(
            5
          )}, Longitude: ${marker.position.lng.toFixed(5)}`}</Popup>
        </Marker>
      ))}

      <MapEventHandler onDblClick={handleAddMarker} />
    </MapContainer>
  );
}

function MapEventHandler({ onDblClick }) {
  useMapEvents({
    dblclick: onDblClick,
  });
  return null;
}

export default GPTcode;
