import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { appApi } from "../../utility/appApi";
import { IGame, IGameRole, IMessage, Iplayer } from "../../models/models";

export interface IGameRoleFull {
  _id: string;
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
  edite: boolean;
  newMessage: boolean;
}

export interface waitingState {
  receivedGame: boolean;
  receivedRoleGame: boolean;
  receivedPlayer: boolean;
  countUpdateedRoleGame: number;
  UpdateedRoleGame: boolean;
  ReadyForGetDataRoleGameFull: boolean;
  loading: boolean;
  countAllPlayer: number;
  countJoined: number;
  codeGame: number;
  dataRoleGame: IGameRole[];
  dataMessages: IMessage[];
  dataGame: IGame;
  dataRoleGameFull: IGameRoleFull[];
  dataPlayer: Iplayer[];
  CountActivePlayer: number;
}

const initialState: waitingState = {
  receivedGame: false,
  receivedRoleGame: false,
  receivedPlayer: false,
  countUpdateedRoleGame: 0,
  UpdateedRoleGame: false,
  ReadyForGetDataRoleGameFull: false,
  loading: true,
  countAllPlayer: 0,
  countJoined: 0,
  codeGame: 0,
  dataRoleGame: [],
  dataMessages: [],
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
      _id: "",
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
      edite: false,
      newMessage: false,
    },
  ],
  dataPlayer: [],
  CountActivePlayer: 10,
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
  async (data: { data: IGameRole; updateGameRoleFull?: boolean }) => {
    await appApi.put("/gameRole/" + data.data._id, data);
    return { updateGameRoleFull: data.updateGameRoleFull };
  }
);

export const sendNewMessage = createAsyncThunk(
  "game/sendNewMessage",
  async (data: IMessage) => {
    const resp = await appApi.post("/message/", data);
    return { data: resp.data.data };
  }
);

export const setRoleGame = createAsyncThunk("game/rolegame", async () => {
  const resp = await appApi.get("/gameRole/" + localStorage.getItem("idGame"));
  return { data: resp.data.data };
});

export const setDataMessagesPlayer = createAsyncThunk(
  "game/setMessagesPlayer",
  async (id: string) => {
    const resp = await appApi.get("/message/player/" + id);
    return { data: resp.data.data };
  }
);

export const setAlluser = createAsyncThunk("game/alluser", async () => {
  const resp = await appApi.get("/gameRole/" + localStorage.getItem("idGame"));
  console.log(resp.data);
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
    setCountActivePlayer: (state) => {
      let c = 0;
      state.dataRoleGameFull.map((m) => {
        if (m.status == 2) c++;
      });
      state.CountActivePlayer = c;
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
    builder.addCase(updateRoleGame.fulfilled, (state, action) => {
      state.countUpdateedRoleGame += 1;
      if (state.countUpdateedRoleGame === state.countAllPlayer) {
        state.UpdateedRoleGame = true;
      }
      if (action.payload.updateGameRoleFull) {
        state.receivedRoleGame = false;
      }
    });
    builder.addCase(sendNewMessage.fulfilled, () => {});
    builder.addCase(setDataMessagesPlayer.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(setDataMessagesPlayer.fulfilled, (state, action) => {
      state.dataMessages = action.payload.data;
      state.loading = false;
    });
  },
});
export const {
  setDataGameRoleFull,
  setloading,
  setreceivedRoleGame,
  setCountActivePlayer,
} = gameSlice.actions;
export default gameSlice.reducer;
