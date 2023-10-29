import { useCallback, useState } from 'react';
import ReactMapGL, { PointerEvent, ViewportProps } from 'react-map-gl';

import Markers from './Markers';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MAP_ACTION } from '@/store/map/actions';
import { selectUser } from '@/store/user/selectors';

const MIN_LONGITUDE = 19.659970559886762;
const MAX_LONGITUDE = 20.22832106155512;
const MIN_LATITUDE = 49.94263135854484;
const MAX_LATITUDE = 50.19319323997475;

const Map = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const [viewport, setViewport] = useState({
    latitude: 50.0619474,
    longitude: 19.9368564,
    width: '100vw',
    height: '100vh',
    zoom: 11,
    minZoom: 10,
    maxZoom: 15,
  } as ViewportProps);

  const handleMapClick = useCallback((event: PointerEvent) => {
    if (!user.isLoggedIn) {
      return;
    }

    dispatch(
      MAP_ACTION.selectCoordinates({
        latitude: event.lngLat[1],
        longitude: event.lngLat[0],
      })
    );
  }, []);

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
    <ReactMapGL
      {...viewport}
      mapStyle={import.meta.env.VITE_MAPBOX_MAP_STYLE}
      mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_API_KEY}
      onViewportChange={handleViewport}
      onClick={handleMapClick}
    >
      <Markers />
    </ReactMapGL>
  );
};

export default Map;
