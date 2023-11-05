import asyncFetch from '@/helpers/asyncFetch';
import { Marker, CreateMarkerPayload, CreateCommentPayload } from './types';

const GET_ALL_MARKERS_URL = 'marker';
const CREATE_MARKER_URL = 'marker/create';
const CREATE_COMMENT_URL = 'comment';

export const getAllMarkersApi = async () =>
  await asyncFetch<Marker[]>({
    url: GET_ALL_MARKERS_URL,
  });

export const createMarkerApi = async (body: CreateMarkerPayload) =>
  await asyncFetch<Marker>({
    url: CREATE_MARKER_URL,
    body,
    method: 'POST',
  });

export const createCommentApi = async (body: CreateCommentPayload) =>
  await asyncFetch<Comment>({
    url: CREATE_COMMENT_URL,
    body,
    method: 'POST',
  });
