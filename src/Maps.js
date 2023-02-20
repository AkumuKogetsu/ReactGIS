import { marker } from "leaflet";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "./Maps.css";
import GPTcode from "./GPTcode";

function Maps(props) {
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  const position = [51.505, -0.09];

  function JumpToLocation(props) {
    const { selectPosition } = props;
    const map = useMap();

    useEffect(() => {
      if (selectPosition) {
        map.setView(
          { lat: selectPosition?.lat, lon: selectPosition?.lon },
          map.getZoom(),
          { animate: true }
        );
      }
    }, [selectPosition]);
    return null;
  }

  function ResetCenterView() {
    const [centerView, setCenterView] = useState(null);
    const map = useMapEvent({
      click() {
        map.locate();
      },
      locationfound(e) {
        setCenterView(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        console.log(e.latlng);
      },
    });
  }

  function AddMarker() {
    const [markerPosition, setMarkerPosition] = useState(null);
    const map = useMap();

    const handleDoubleClick = useCallback(
      (e) => {
        const { lat, lng } = e.latlng;
        if (markerPosition) {
          map.removeLayer(markerPosition);
          setMarkerPosition(null);
        } else {
          const newMarker = marker([lat, lng]).addTo(map);
          setMarkerPosition(newMarker);
        }
      },
      [markerPosition, map]
    );

    useMapEvent("dblclick", handleDoubleClick);

    return null;
  }

  return position === null ? null : (
    <div className="App">
      <MapContainer center={position} zoom={13} doubleClickZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectPosition && (
          <Marker position={locationSelection}>
            <Popup></Popup>
          </Marker>
        )}
        <JumpToLocation selectPosition={selectPosition} />
        <GPTcode />
      </MapContainer>
    </div>
  );
}

export default Maps;
