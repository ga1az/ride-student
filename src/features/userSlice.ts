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
    setVehicle: (state, action) => {
      state.marca = action.payload.marca;
      state.color = action.payload.color;
      state.placa = action.payload.placa;
      state.capacidad = action.payload.capacidad;
      localStorage.setItem("vehiculo", JSON.stringify(action.payload));
    },
  },
});

export const { loginUser, logOutUser, setVehicle } = userSlice.actions;
export const selectUser = (state: any) => state.user.user;
export default userSlice.reducer;
