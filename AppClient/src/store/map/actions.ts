import { createAction } from '@reduxjs/toolkit';

import { CreateMarkerPayload, MarkerPayload, MarkersPayload } from './types';

const MAP_GET_ALL_MARKERS = 'map/getAllMarkers';
const MAP_SET_MARKERS = 'map/setMarkers';
const MAP_CREATE_MARKER = 'map/createMarker';
const MAP_SET_MARKER = 'map/setMarker';

export const MAP_ACTION = {
  getAllMarkers: createAction(MAP_GET_ALL_MARKERS),
  setMarkers: createAction<MarkersPayload>(MAP_SET_MARKERS),
  createMarker: createAction<CreateMarkerPayload>(MAP_CREATE_MARKER),
  setMarker: createAction<MarkerPayload>(MAP_SET_MARKER),
};
