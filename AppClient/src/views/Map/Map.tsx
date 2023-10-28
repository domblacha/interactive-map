import { useCallback, useMemo, useState } from 'react';
import ReactMapGL, { Marker, PointerEvent, ViewportProps } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';

import { useAppSelector } from '@/store/hooks';
import { selectMarkers } from '@/store/map/selectors';
import AddLocationModal from './AddLocationModal';

const MIN_LONGITUDE = 19.659970559886762;
const MAX_LONGITUDE = 20.22832106155512;
const MIN_LATITUDE = 49.94263135854484;
const MAX_LATITUDE = 50.19319323997475;

const Map = () => {
  const [isAddLocationModalOpen, setIsAddLocationModal] = useState(false);
  const [selectedMarkerCoordinates, setSelectedMarkerCoordinates] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [viewport, setViewport] = useState({
    latitude: 50.0619474,
    longitude: 19.9368564,
    width: '100vw',
    height: '100vh',
    zoom: 11,
    minZoom: 10,
    maxZoom: 15,
  } as ViewportProps);

  const markers = useAppSelector(selectMarkers);

  const markerList = useMemo(() => {
    console.log('render markers');
    return markers.map((marker) => (
      <Marker
        key={marker.id}
        longitude={marker.longitude}
        latitude={marker.latitude}
      >
        <RoomIcon color="secondary" />
      </Marker>
    ));
  }, [markers]);

  const handleMapClick = (event: PointerEvent) => {
    setSelectedMarkerCoordinates({
      latitude: event.lngLat[1],
      longitude: event.lngLat[0],
    });
    setIsAddLocationModal(true);
  };

  const handleViewport = useCallback((viewport: ViewportProps) => {
    if (viewport.longitude < MIN_LONGITUDE) {
      viewport.longitude = MIN_LONGITUDE;
    }

    if (viewport.longitude > MAX_LONGITUDE) {
      viewport.longitude = MAX_LONGITUDE;
    }

    if (viewport.latitude < MIN_LATITUDE) {
      viewport.latitude = MIN_LATITUDE;
    }

    if (viewport.latitude > MAX_LATITUDE) {
      viewport.latitude = MAX_LATITUDE;
    }

    setViewport(viewport);
  }, []);

  return (
    <>
      <AddLocationModal
        isOpen={isAddLocationModalOpen}
        onClose={setIsAddLocationModal}
        coordinates={selectedMarkerCoordinates}
      />
      <ReactMapGL
        {...viewport}
        mapStyle={import.meta.env.VITE_MAPBOX_MAP_STYLE}
        mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
        onViewportChange={handleViewport}
        onClick={handleMapClick}
      >
        {markerList}
      </ReactMapGL>
    </>
  );
};

export default Map;
