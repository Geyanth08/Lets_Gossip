import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  roomId: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateRoom: (state, action) => {
      state.roomId = action.payload;
    },
  },
});

export const { updateRoom } = appSlice.actions;

export const selectRoom = (state) => state.app.roomId;

export default appSlice.reducer;
