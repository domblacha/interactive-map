import asyncFetch from '@/helpers/asyncFetch';
import { Marker, CreateMarkerPayload } from './types';

const GET_ALL_MARKERS_URL = 'marker';
const CREATE_MARKER = 'marker/create';

export const getAllMarkersApi = async () =>
  await asyncFetch<Marker[]>({
    url: GET_ALL_MARKERS_URL,
  });

export const createMarkerApi = async (body: CreateMarkerPayload) =>
  await asyncFetch<Marker>({
    url: CREATE_MARKER,
    body,
    method: 'POST',
  });
