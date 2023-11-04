export interface Marker {
  id: string;
  userId: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  authorName: string;
  comments: Comment[];
  ratings: Rating[];
}

interface Comment {
  text: string;
  authorName: string;
}

interface Rating {
  value: number;
  authorName: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MapState {
  markers: Marker[];
  selectedCoordinates: Coordinates | null;
  selectedLocation: Marker | null;
}

export interface CreateMarkerPayload {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}

export type SelectCoordinatesPayload = Coordinates;
export type SelectLocationPayload = {
  markerId: string;
};
export type MarkersPayload = Marker[];
export type MarkerPayload = Marker;
