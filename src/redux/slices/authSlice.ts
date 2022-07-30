import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IAuth } from "../../@types/IAuth";

const initialState: IAuth = {
  email: "",
  token: "",
  id: "",
  name: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuth>) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    removeUser: (state) => {
      state.email = "";
      state.token = "";
      state.id = "";
      state.name = "";
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;
