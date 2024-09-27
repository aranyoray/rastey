import React, { useEffect, useRef, useState } from 'react';
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api';

// Map component
const Map = ({ mapType }) => {
  const mapRef = useRef(null);
  const [heatmapData, setHeatmapData] = useState([]);

  // Styles for the map container
  const mapContainerStyle = {
    width: '100%',
    height: '500px',  // Adjusted height for better display
  };

  // Initial center location: Bangalore coordinates
  const center = {
    lat: 12.9716,
    lng: 77.5946,
  };

  // Effect hook to fetch heatmap data based on the selected map type (walkability or busyness)
  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        const response = await fetch(`/api/${mapType}`);
        const data = await response.json();
        setHeatmapData(data.map(point => new google.maps.LatLng(point.lat, point.lng)));
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      }
    };

    fetchHeatmapData();
  }, [mapType]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={12}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {heatmapData.length > 0 && (
          <HeatmapLayer
            data={heatmapData}
            options={{
              radius: 20,
              opacity: 0.6,
            }}
          />
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;