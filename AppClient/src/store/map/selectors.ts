import { RootState } from '../store.types';

export const selectMarkers = (state: RootState) => state.map.markers;
