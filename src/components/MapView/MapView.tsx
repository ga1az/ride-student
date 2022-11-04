import mapboxgl from "mapbox-gl";
import React from "react";
import { TOKEN } from "../../local.env";
import "./styles/MapView.css";
interface ModalInfoViajeProps {
  ride: any;
}
export interface MapViewInterface {}

const MapView = ({ ride }: ModalInfoViajeProps) => {
  const mapDiv = React.useRef<HTMLDivElement>(null);
  const [cords, setCords] = React.useState<any>([]);

  React.useEffect(() => {
    async function getRideCords() {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${ride.destino}.json?access_token=${TOKEN}&autocomplete=true&types=address&country=cl&language=es`;
      const response = await fetch(endpoint);
      const data = await response.json();
      setCords(data?.features[0].center);
    }

    getRideCords();
    const map = new mapboxgl.Map({
      container: mapDiv.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-73.07009428373095, -36.80761796776942],
      zoom: 9,
    });
    return () => map.remove();
  }, []);
  return (
    <div
      className="mapview"
      ref={mapDiv}
      style={{
        backgroundColor: "red",
        height: "40rem",
      }}
    >
      MapView
    </div>
  );
};

export default MapView;
