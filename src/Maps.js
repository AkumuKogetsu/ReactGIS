import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, Popup, useMap } from "react-leaflet";
import "./Maps.css";

function Maps(props) {
  const { selectPosition } = props;
  const locationSelection = [selectPosition?.lat, selectPosition?.lon];
  const position = [51.505, -0.09];

  function ResetCenterView(props) {
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
  // const [error, setError] = useState(null);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [places, setPlaces] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     "https://raw.githubusercontent.com/leighhalliday/react-leaflet-demo/master/src/data/skateboard-parks.json"
  //   )
  //     .then((res) => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setPlaces(result.features); //Set kepala array "features" sini instead atas marker
  //       },
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     );
  // }, []);

  return (
    <div className="App">
      <MapContainer center={position} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {selectPosition && (
          <Marker position={locationSelection}>
            <Popup></Popup>
          </Marker>
        )}
        <ResetCenterView selectPosition={selectPosition} />
      </MapContainer>
    </div>
  );
}

export default Maps;
