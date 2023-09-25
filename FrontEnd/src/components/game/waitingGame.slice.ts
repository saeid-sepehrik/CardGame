import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appApi } from "../../utility/appApi";
import { IGame, IGameRole } from "../../models/models";

export interface IGameRoleFull {
  id: string;
  id_game: string;
  id_role: string;
  status: number;
  pic_path: string;
  color: string;
  title: string;
  group: string;
}

export interface waitingState {
  loading: boolean;
  countAllPlayer: number;
  countJoined: number;
  codeGame: number;
  dataRoleGame: IGameRole[];
  dataGame: IGame;
  dataRoleGameFull: IGameRoleFull[];
}

const initialState: waitingState = {
  loading: true,
  countAllPlayer: 0,
  countJoined: 0,
  codeGame: 0,
  dataRoleGame: [],
  dataGame: {
    _id: "",
    code_scenario: 0,
    title_game_type: "",
    title_scenario: "",
    status: 0,
    code: 0,
  },
  dataRoleGameFull: [
    {
      id: "",
      id_game: "",
      id_role: "",
      status: 0,
      pic_path: "",
      color: "",
      title: "",
      group: "",
    },
  ],
};

export const setRoleGame = createAsyncThunk(
  "waitingGame/rolegame",
  async () => {
    const resp = await appApi.get(
      "/gameRole/" + localStorage.getItem("idGame")
    );
    const countAll = 2;
    return { data: resp.data.data, count: countAll };
  }
);

const waitingGameSlice = createSlice({
  name: "waitingGame",
  initialState,
  reducers: {
    setDataGame: (state, action) => {
      state.dataGame = action.payload;
      state.codeGame = state.dataGame.code;
    },
    setDataGameRoleFull: (state, action) => {
      state.dataRoleGameFull = action.payload;
      state.loading = false;
    },
    setCountJoined: (state, action) => {
      state.countJoined = action.payload;
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setRoleGame.pending, () => {});
    builder.addCase(setRoleGame.fulfilled, (state, action) => {
      state.dataRoleGame = action.payload.data;
      state.countAllPlayer = state.dataRoleGame.length;
    });
  },
});
export const { setDataGame, setDataGameRoleFull, setCountJoined, setloading } =
  waitingGameSlice.actions;
export default waitingGameSlice.reducer;
