import { createReducer } from '@reduxjs/toolkit';

import { MAP_ACTION } from './actions';
import { MapState, Marker } from './types';

const initialState: MapState = {
  markers: [],
  selectedCoordinates: null,
  selectedLocation: null,
};

export const mapReducer = createReducer(initialState, (builder) => {
  builder.addCase(MAP_ACTION.setMarkers, (state, { payload }) => {
    return {
      ...state,
      markers: payload,
    };
  });
  builder.addCase(MAP_ACTION.setMarker, (state, { payload }) => {
    return {
      ...state,
      markers: [...state.markers, payload],
    };
  });
  builder.addCase(MAP_ACTION.selectCoordinates, (state, { payload }) => {
    return {
      ...state,
      selectedCoordinates: payload,
    };
  });
  builder.addCase(MAP_ACTION.clearSelectedCoordinates, (state) => {
    return {
      ...state,
      selectedCoordinates: null,
    };
  });
  builder.addCase(MAP_ACTION.selectLocation, (state, { payload }) => {
    return {
      ...state,
      selectedLocation: state.markers.find(
        (marker) => marker.id === payload.markerId
      ) as Marker,
    };
  });
  builder.addCase(MAP_ACTION.clearSelectedLocation, (state) => {
    return {
      ...state,
      selectedLocation: null,
    };
  });
});
