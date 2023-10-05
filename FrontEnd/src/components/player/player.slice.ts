import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGame, Iplayer } from "../../models/models";
import { joinDataType } from "./joinGame";
import { appApi } from "../../utility/appApi";

export interface player {
  player: Iplayer;
  dataGame: IGame;
  incorrectCodeGame: boolean;
}

const initialState: player = {
  player: {
    _id: "",
    name: "",
    id_game: "",
  },
  dataGame: {
    _id: "",
    code_scenario: 0,
    title_game_type: "",
    title_scenario: "",
    status: 1,
    code: 0,
  },
  incorrectCodeGame: false,
};

export const joinPlayer = createAsyncThunk(
  "player/joinPlayer",
  async (joinData: joinDataType) => {
    const resp = await appApi.post("player/", joinData);
    return { data: resp.data.data };
  }
);

export const getGamewithCode = createAsyncThunk(
  "game/getGameWithCode",
  async (code: number) => {
    const resp = await appApi.get("/game/withCode/" + code);
    return { data: resp.data.data };
  }
);

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setIncorrectCodeGame: (state, action) => {
      state.incorrectCodeGame = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGamewithCode.pending, () => {});
    builder.addCase(getGamewithCode.rejected, (state) => {
      state.incorrectCodeGame = true;
    });
    builder.addCase(getGamewithCode.fulfilled, (state, action) => {
      state.dataGame = action.payload.data[0];
    });

    builder.addCase(joinPlayer.pending, () => {});
    builder.addCase(joinPlayer.rejected, () => {});
    builder.addCase(joinPlayer.fulfilled, (state, action) => {
      console.log(action.payload.data);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setIncorrectCodeGame } = playerSlice.actions;

export default playerSlice.reducer;
