import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

// Double click to add marker
// Single click on marker to show latlong
// Double click on marker again to remove marker
function AddMultipleMarker() {
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
    <div>
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
    </div>
  );
}

function MapEventHandler({ onDblClick }) {
  useMapEvents({
    dblclick: onDblClick,
  });
  return null;
}

export default AddMultipleMarker;
