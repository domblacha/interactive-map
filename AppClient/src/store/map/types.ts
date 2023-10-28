export interface Marker {
  id: string;
  userId: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export interface MapState {
  markers: Marker[];
}

export interface CreateMarkerPayload {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export type MarkersPayload = Marker[];
export type MarkerPayload = Marker;
