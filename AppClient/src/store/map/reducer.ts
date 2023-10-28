import { createReducer } from '@reduxjs/toolkit';

import { MAP_ACTION } from './actions';
import { MapState } from './types';

const initialState: MapState = {
  markers: [],
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
});
