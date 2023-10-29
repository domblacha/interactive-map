import { RootState } from '../store.types';

export const selectMapState = (state: RootState) => state.map;

export const selectMarkers = (state: RootState) =>
  selectMapState(state).markers;
