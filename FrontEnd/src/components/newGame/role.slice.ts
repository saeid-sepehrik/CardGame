import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGameRole, IRole } from "../../models/models";
import axios from "axios";

export interface stepState {
  roleSelected: IRole[];
  receivedRole: boolean;
}

const initialState: stepState = {
  roleSelected: [],
  receivedRole: false,
};

export const setRole = createAsyncThunk(
  "role/role",
  async (dataRoleGame: IGameRole[]) => {
    const ids: string[] = [];
    const gameRoleTemp: IGameRole[] = dataRoleGame;
    gameRoleTemp.map((m) => ids.push(m.id_role));
    const article = {
      ids: ids,
    };
    const resp = await axios.post(
      "http://localhost:3000/api/role/game/game/",
      article
    );
    return { data: resp.data.data };
  }
);

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setDataRoleSelected: (state, action) => {
      state.roleSelected = action.payload;
      state.receivedRole = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setRole.pending, () => {});
    builder.addCase(setRole.rejected, () => {});
    builder.addCase(setRole.fulfilled, (state, action) => {
      state.roleSelected = action.payload.data;
      state.receivedRole = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setDataRoleSelected } = roleSlice.actions;

export default roleSlice.reducer;
