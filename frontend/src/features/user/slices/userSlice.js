import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    createNewUserAction: (state, action) => {
      state.currentUser = action.payload;
    },
    logInUserAction: (state, action) => {
      state.currentUser = action.payload;
    },
    logOutUserAction: (state) => {
      state.currentUser = null;
    },
  },
});

export const { createNewUserAction, logInUserAction, logOutUserAction } =
  userSlice.actions;

export default userSlice.reducer;
