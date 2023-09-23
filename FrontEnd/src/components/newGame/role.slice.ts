import { createSlice } from "@reduxjs/toolkit";
import { IRole } from "../../models/models";

export interface stepState {
  roleSelected: IRole[];
}

const initialState: stepState = {
  roleSelected: [],
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setDataRoleSelected: (state, action) => {
      state.roleSelected = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDataRoleSelected } = roleSlice.actions;

export default roleSlice.reducer;
