// utils/heatmapUtils.js

export const generateHeatmapData = (locations) => {
    return locations.map(location => ({
      location: new google.maps.LatLng(location.lat, location.lng),
      weight: location.intensity || 1,
    }));
  };