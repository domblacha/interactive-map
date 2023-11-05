import { createReducer } from '@reduxjs/toolkit';

import { MAP_ACTION } from './actions';
import { MapState, Marker } from './types';

const initialState: MapState = {
  markers: [],
  selectedCoordinates: undefined,
  selectedLocation: undefined,
};

export const mapReducer = createReducer(initialState, (builder) => {
  builder.addCase(MAP_ACTION.setMarkers, (state, { payload }) => {
    state.markers = payload;
  });

  builder.addCase(MAP_ACTION.setMarker, (state, { payload }) => {
    state.markers.push(payload);
  });

  builder.addCase(MAP_ACTION.selectCoordinates, (state, { payload }) => {
    state.selectedCoordinates = payload;
  });

  builder.addCase(MAP_ACTION.clearSelectedCoordinates, (state) => {
    state.selectedCoordinates = initialState.selectedCoordinates;
  });

  builder.addCase(MAP_ACTION.selectLocation, (state, { payload }) => {
    state.selectedLocation = state.markers.find(
      (marker) => marker.id === payload.markerId
    );
  });

  builder.addCase(MAP_ACTION.clearSelectedLocation, (state) => {
    state.selectedLocation = initialState.selectedLocation;
  });

  builder.addCase(MAP_ACTION.setComment, (state, { payload }) => {
    state.markers
      .find((marker) => marker.id === payload.markerId)
      ?.comments.push(payload);
    state.selectedLocation?.comments.push(payload);
  });
});
