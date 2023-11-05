import { createAction } from '@reduxjs/toolkit';

import {
  CommentPayload,
  CreateCommentPayload,
  CreateMarkerPayload,
  MarkerPayload,
  MarkersPayload,
  SelectCoordinatesPayload,
  SelectLocationPayload,
} from './types';

export const MAP_ACTION = {
  getAllMarkers: createAction('map/getAllMarkers'),
  setMarkers: createAction<MarkersPayload>('map/setMarkers'),
  createMarker: createAction<CreateMarkerPayload>('map/createMarker'),
  setMarker: createAction<MarkerPayload>('map/setMarker'),
  selectCoordinates: createAction<SelectCoordinatesPayload>(
    'map/selectCoordinates'
  ),
  clearSelectedCoordinates: createAction('map/clearSelectedCoordinates'),
  selectLocation: createAction<SelectLocationPayload>('map/selectLocation'),
  clearSelectedLocation: createAction('map/clearSelectedLocation'),
  createComment: createAction<CreateCommentPayload>('map/createComment'),
  setComment: createAction<CommentPayload>('map/setComment'),
};
