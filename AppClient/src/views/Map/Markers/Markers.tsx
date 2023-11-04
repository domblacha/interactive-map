import React from 'react';
import { Marker } from 'react-map-gl';
import RoomIcon from '@mui/icons-material/Room';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectMarkers } from '@/store/map/selectors';
import { MAP_ACTION } from '@/store/map/actions';

const Markers = React.memo(() => {
  const dispatch = useAppDispatch();
  const markers = useAppSelector(selectMarkers);

  const handleOnMarkerClick = (markerId: string) => {
    dispatch(MAP_ACTION.selectLocation({ markerId }));
  };

  return markers.map((marker) => (
    <Marker
      key={marker.id}
      longitude={marker.longitude}
      latitude={marker.latitude}
    >
      <RoomIcon
        color="secondary"
        sx={{ cursor: 'pointer' }}
        onClick={() => handleOnMarkerClick(marker.id)}
      />
    </Marker>
  ));
});

export default Markers;

Markers.displayName = 'Markers';
