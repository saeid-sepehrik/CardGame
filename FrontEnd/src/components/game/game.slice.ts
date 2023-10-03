import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appApi } from "../../utility/appApi";
import { IGame, IGameRole, Iplayer } from "../../models/models";

export interface IGameRoleFull {
  id: string;
  id_game: string;
  id_role: string;
  id_user: string;
  status: number;
  score: number;
  pic_path: string;
  color: string;
  title: string;
  group: string;
  user_name: string;
}

export interface waitingState {
  receivedGame: boolean;
  receivedRoleGame: boolean;
  receivedPlayer: boolean;
  countUpdateedRoleGame: number;
  UpdateedRoleGame: boolean;
  loading: boolean;
  countAllPlayer: number;
  countJoined: number;
  codeGame: number;
  dataRoleGame: IGameRole[];
  dataGame: IGame;
  dataRoleGameFull: IGameRoleFull[];
  dataPlayer: Iplayer[];
}

const initialState: waitingState = {
  receivedGame: false,
  receivedRoleGame: false,
  receivedPlayer: false,
  countUpdateedRoleGame: 0,
  UpdateedRoleGame: false,
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
      id_user: "",
      user_name: "",
      status: 0,
      pic_path: "",
      color: "",
      title: "",
      group: "",
      score: 0,
    },
  ],
  dataPlayer: [],
};

export const updateGame = createAsyncThunk(
  "game/updateGame",
  async (data: IGame) => {
    const resp = await appApi.put("/game/" + localStorage.getItem("idGame"), {
      data,
    });
    return { data: resp.data.data };
  }
);

export const updateRoleGame = createAsyncThunk(
  "game/updateRoleGame",
  async (data: IGameRole) => {
    await appApi.put("/gameRole/" + data._id, {
      data,
    });
    // return { data: resp.data.data };
  }
);

export const setRoleGame = createAsyncThunk("game/rolegame", async () => {
  const resp = await appApi.get("/gameRole/" + localStorage.getItem("idGame"));
  return { data: resp.data.data };
});

export const setAlluser = createAsyncThunk("game/alluser", async () => {
  const resp = await appApi.get("/gameRole/" + localStorage.getItem("idGame"));
  return { count: resp.data.data.length };
});

export const setGame = createAsyncThunk("game/setGame", async () => {
  const resp = await appApi.get("/game/" + localStorage.getItem("idGame"));

  // const resp2 = await appApi.get("/gameRole/" + localStorage.getItem("idGame"));

  // const ps = [appApi.get("/game/" + localStorage.getItem("idGame")), appApi.get("/gameRole/" + localStorage.getItem("idGame"))];
  // const results = await Promise.allSettled(ps);

  return { data: resp.data.data[0] };
});

export const setPlayer = createAsyncThunk("game/player", async () => {
  const resp = await appApi.get(
    "/player/joinGame/" + localStorage.getItem("idGame")
  );
  return { data: resp.data.data };
});

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setDataGameRoleFull: (state, action) => {
      state.dataRoleGameFull = action.payload;
    },
    setloading: (state, action) => {
      state.loading = action.payload;
    },
    setreceivedRoleGame: (state, action) => {
      state.receivedRoleGame = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setGame.pending, () => {});
    builder.addCase(setGame.fulfilled, (state, action) => {
      state.dataGame = action.payload.data;
      state.codeGame = state.dataGame.code;
      state.receivedGame = true;
    });

    builder.addCase(setRoleGame.pending, () => {});
    builder.addCase(setRoleGame.fulfilled, (state, action) => {
      state.dataRoleGame = action.payload.data;
      state.receivedRoleGame = true;
    });

    builder.addCase(setAlluser.pending, () => {});
    builder.addCase(setAlluser.fulfilled, (state, action) => {
      state.countAllPlayer = action.payload.count;
    });
    builder.addCase(setPlayer.pending, () => {});
    builder.addCase(setPlayer.fulfilled, (state, action) => {
      state.dataPlayer = action.payload.data;
      state.countJoined = action.payload.data.length;
      state.receivedPlayer = true;
    });
    builder.addCase(updateGame.fulfilled, (state, action) => {
      state.dataGame = action.payload.data;
    });
    builder.addCase(updateRoleGame.fulfilled, (state) => {
      state.countUpdateedRoleGame += 1;
      if (state.countUpdateedRoleGame === state.countAllPlayer) {
        state.UpdateedRoleGame = true;
      }
    });
  },
});
export const { setDataGameRoleFull, setloading, setreceivedRoleGame } =
  gameSlice.actions;
export default gameSlice.reducer;