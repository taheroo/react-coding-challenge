import { createAction } from '@reduxjs/toolkit';

// Action creators
export const filesLoaded = createAction(`filesLoaded`);
export const fileAdded = createAction(`fileAded`);
export const fileRemoved = createAction(`fileRemoved`);

// Reducer
export default function reducer(state = [], action) {
  switch (action.type) {
    case filesLoaded.type: {
      if (localStorage.getItem(`file-history`)) {
        const f = `[${localStorage.getItem(`file-history`)}]`;
        return JSON.parse(f);
      }
      return [];
    }
    case fileAdded.type:
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          lastModified: action.payload.lastModified,
          size: action.payload.size,
          type: action.payload.type,
        },
      ];
    case fileRemoved.type:
      return state.filter((file) => file.id !== action.payload.id);
    default:
      return state;
  }
}
