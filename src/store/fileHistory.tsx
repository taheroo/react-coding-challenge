import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'fileHistory',
  initialState: [],
  reducers: {
    filesLoaded: (state, action) => {
      if (localStorage.getItem(`file-history`)) {
        const f = `[${localStorage.getItem(`file-history`)}]`;
        return JSON.parse(f);
      }
      return [];
    },
    fileAdded: (state, action) => {
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
    },
    fileRemoved: (state, action) =>
      state.filter((file) => file.id !== action.payload.id),
  },
});

export const { filesLoaded, fileAdded, fileRemoved } = slice.actions;
export default slice.reducer;
