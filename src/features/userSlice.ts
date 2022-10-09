import { createSlice } from "@reduxjs/toolkit";

const initalState = {
  userName: null,
  userEmail: null,
  userUid: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initalState,
  reducers: {
    loginUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userUid = action.payload.userUid;
    },
    logOutUser: (state) => {
      state.userName = null;
      state.userEmail = null;
      state.userUid = null;
    },
  },
});

export const { loginUser, logOutUser } = userSlice.actions;
export const selectUser = (state: any) => state.user.user;
export default userSlice.reducer;
