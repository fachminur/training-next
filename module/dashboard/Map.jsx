import React from "react";

import {
  GoogleMap,
  LoadScript,
  Marker,
  Circle,
  // InfoWindow,
} from "@react-google-maps/api";

const Map = () => {
  const [peta, setPeta] = React.useState({
    lat: 0.1893,
    lng: 117.9213,
  });
  const [zoom, setZoom] = React.useState(4);
 
  return (
    <div className="h-full w-full">
      
      <LoadScript
        region={"indonesian"}
        googleMapsApiKey={process.env.GOOGLE_API_KEY}
      >
        <GoogleMap
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            border: "1px solid #ccc",
          }}
          zoom={zoom}
          center={peta}
          options={{
            mapTypeControl: false,
            controlSize: false,
            fullscreenControl: true,
            streetViewControl: false,
            zoomControl: false,
          }}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
};

export default Map;
