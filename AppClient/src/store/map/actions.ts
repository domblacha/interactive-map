import { createAction } from '@reduxjs/toolkit';

import {
  CreateMarkerPayload,
  MarkerPayload,
  MarkersPayload,
  SelectCoordinatesPayload,
} from './types';

const MAP_GET_ALL_MARKERS = 'map/getAllMarkers';
const MAP_SET_MARKERS = 'map/setMarkers';
const MAP_CREATE_MARKER = 'map/createMarker';
const MAP_SET_MARKER = 'map/setMarker';
const MAP_SELECT_COORDINATES = 'map/selectCoordinates';
const MAP_CLEAR__SELECTED_COORDINATES = 'map/clearSelectedCoordinates';

export const MAP_ACTION = {
  getAllMarkers: createAction(MAP_GET_ALL_MARKERS),
  setMarkers: createAction<MarkersPayload>(MAP_SET_MARKERS),
  createMarker: createAction<CreateMarkerPayload>(MAP_CREATE_MARKER),
  setMarker: createAction<MarkerPayload>(MAP_SET_MARKER),
  selectCoordinates: createAction<SelectCoordinatesPayload>(
    MAP_SELECT_COORDINATES
  ),
  clearSelectedCoordinates: createAction(MAP_CLEAR__SELECTED_COORDINATES),
};
