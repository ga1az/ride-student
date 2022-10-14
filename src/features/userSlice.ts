import { createSlice } from "@reduxjs/toolkit";

const initial = () => {
  if (localStorage.getItem("usuario")) {
    return JSON.parse(localStorage.getItem("usuario")!);
  }
  return {
    userName: null,
    userEmail: null,
    userUid: null,
  };
};

const initalState = initial;

export const userSlice = createSlice({
  name: "user",
  initialState: initalState,
  reducers: {
    loginUser: (state, action) => {
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.userUid = action.payload.userUid;
      localStorage.setItem("usuario", JSON.stringify(action.payload));
    },
    logOutUser: (state) => {
      state.userName = null;
      state.userEmail = null;
      state.userUid = null;
      localStorage.removeItem("usuario");
    },
  },
});

export const { loginUser, logOutUser } = userSlice.actions;
export const selectUser = (state: any) => state.user.user;
export default userSlice.reducer;
