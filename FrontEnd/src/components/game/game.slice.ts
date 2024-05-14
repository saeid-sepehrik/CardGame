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
  loading: boolean;
  dataRoleGame: IGameRole[];
  dataMessages: IMessage[];
  dataGame: IGame;
  dataRoleGameFull: IGameRoleFull[];
  dataPlayer: Iplayer[];
}

const initialState: waitingState = {
  loading: true,
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
    const resp = await appApi.put("/gameRole/" + data.data._id, data);
    return {
      data: resp.data.data[0],
      updateGameRoleFull: data.updateGameRoleFull,
    };
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

export const setGame = createAsyncThunk("game/setGame", async () => {
  const resp = await appApi.get("/game/" + localStorage.getItem("idGame"));
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
  },
  extraReducers: (builder) => {
    builder.addCase(setGame.pending, () => {});
    builder.addCase(setGame.fulfilled, (state, action) => {
      state.dataGame = action.payload.data;
    });

    builder.addCase(setRoleGame.pending, () => {});
    builder.addCase(setRoleGame.fulfilled, (state, action) => {
      state.dataRoleGame = action.payload.data;
    });

    builder.addCase(setPlayer.pending, () => {});
    builder.addCase(setPlayer.fulfilled, (state, action) => {
      state.dataPlayer = action.payload.data;
    });
    builder.addCase(updateGame.fulfilled, (state, action) => {
      state.dataGame = action.payload.data;
    });
    builder.addCase(updateRoleGame.fulfilled, (state, action) => {
      const index = state.dataRoleGame
        .map((m) => {
          return m._id;
        })
        .indexOf(action.payload.data._id);
      state.dataRoleGame.splice(index, 1, action.payload.data);
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
export const { setDataGameRoleFull, setloading } = gameSlice.actions;
export default gameSlice.reducer;
