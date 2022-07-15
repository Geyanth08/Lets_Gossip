import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { updateUser } = userSlice.actions;

export const selectUser = (state) => state.user.userDetails;

export default userSlice.reducer;
