import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IGame, IGameRole, IRole, Iplayer } from "../../models/models";
import { joinDataType } from "./joinGame";
import { appApi } from "../../utility/appApi";

export interface player {
  dataPlayer: Iplayer;
  dataGame: IGame;
  dataRoleGame: IGameRole;
  dataRole: IRole;
  incorrectCodeGame: boolean;
}

const initialState: player = {
  dataPlayer: {
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
  dataRoleGame: {
    _id: "",
    id_game: "",
    id_role: "",
    id_user: "",
    status: 1,
    score: 0,
  },
  dataRole: {
    _id: "",
    title: "",
    title_fn: "",
    is_active: true,
    mask_code_scenarios: 0,
    just_one: true,
    pic_path: "",
    dsc: "",
    group: "",
    color: "",
  },
  incorrectCodeGame: false,
};

export const setRoleGame = createAsyncThunk("player/rolegame", async () => {
  const resp = await appApi.get(
    "/gameRole/player/" + localStorage.getItem("idPlayer")
  );
  return { data: resp.data.data };
});

export const setRole = createAsyncThunk("player/role", async () => {
  const resp = await appApi.get(
    "/role/getById/" + localStorage.getItem("idRolePlayer")
  );
  return { data: resp.data.data };
});

export const joinPlayer = createAsyncThunk(
  "player/joinPlayer",
  async (joinData: joinDataType) => {
    const resp = await appApi.post("player/", joinData);
    return { data: resp.data.data };
  }
);

export const getGamewithCode = createAsyncThunk(
  "player/getGameWithCode",
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
      if (action.payload.data[0].status === 1)
        state.dataGame = action.payload.data[0];
      else {
        state.incorrectCodeGame = true;
      }
    });

    builder.addCase(joinPlayer.pending, () => {});
    builder.addCase(joinPlayer.rejected, () => {});
    builder.addCase(joinPlayer.fulfilled, (state, action) => {
      state.dataPlayer = action.payload.data;
      localStorage.setItem("idGamePlayer", state.dataGame._id);
      localStorage.setItem("idPlayer", state.dataPlayer._id);
    });

    builder.addCase(setRoleGame.pending, () => {});
    builder.addCase(setRoleGame.rejected, () => {});
    builder.addCase(setRoleGame.fulfilled, (state, action) => {
      state.dataRoleGame = action.payload.data[0];
      localStorage.setItem("idRoleGamePlayer", state.dataRoleGame._id);
      localStorage.setItem("idRolePlayer", state.dataRoleGame.id_role);
    });

    builder.addCase(setRole.pending, () => {});
    builder.addCase(setRole.rejected, () => {});
    builder.addCase(setRole.fulfilled, (state, action) => {
      state.dataRole = action.payload.data;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setIncorrectCodeGame } = playerSlice.actions;

export default playerSlice.reducer;
