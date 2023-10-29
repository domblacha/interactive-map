import React from 'react';
import { Marker } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';

import { useAppSelector } from '@/store/hooks';
import { selectMarkers } from '@/store/map/selectors';

const Markers = React.memo(() => {
  const markers = useAppSelector(selectMarkers);

  return markers.map((marker) => (
    <Marker
      key={marker.id}
      longitude={marker.longitude}
      latitude={marker.latitude}
    >
      <RoomIcon color="secondary" />
    </Marker>
  ));
});

export default Markers;

Markers.displayName = 'Markers';
