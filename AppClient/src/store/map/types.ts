export interface Marker {
  id: string;
  userId: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  authorName: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  markerId: string;
  text: string;
  authorName: string;
  rating: number;
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

export interface CreateCommentPayload {
  markerId: string;
  text: string;
  rating: number;
}

export type SelectCoordinatesPayload = Coordinates;

export type SelectLocationPayload = {
  markerId: string;
};

export type MarkersPayload = Marker[];

export type MarkerPayload = Marker;

export type CommentPayload = Comment;
