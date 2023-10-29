export interface Marker {
  id: string;
  userId: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MapState {
  markers: Marker[];
  selectedCoordinates: Coordinates | null;
}

export interface CreateMarkerPayload {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export type SelectCoordinatesPayload = Coordinates;
export type MarkersPayload = Marker[];
export type MarkerPayload = Marker;
