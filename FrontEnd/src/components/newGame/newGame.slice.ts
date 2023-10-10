import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  IGameRole,
  IGameType as IGameType,
  IRole,
  IScenario,
} from "../../models/models";
import axios from "axios";
import { appApi } from "../../utility/appApi";

export interface stepState {
  roleSelected: IRole[];
  dataRole: IRole[];
  receivedRole: boolean;
  scenarioSelected: IScenario;
  gameTypeSelected: IGameType;
  group: string[];
  groupCount: number[];
}

const initialState: stepState = {
  roleSelected: [],
  dataRole: [],
  gameTypeSelected: {
    title: "",
    is_active: true,
    pic_path: "",
    dsc: "",
  },
  receivedRole: false,
  scenarioSelected: {
    id_game_type: "",
    title: "",
    title_fn: "",
    code: 0,
    is_active: true,
    pic_path: "",
    dsc: "",
  },
  group: [],
  groupCount: [],
};

export const setRoleWithRoleGame = createAsyncThunk(
  "newGame/role",
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

export const setDataRoleNewGame = createAsyncThunk(
  "newGame/setDataRoleNewGame",
  async (data: { code: number; lang: string }) => {
    const resp = await appApi.get(`role/` + data.code);
    return { data: resp.data.data, lang: data.lang };
  }
);

export const roleSlice = createSlice({
  name: "newGame",
  initialState,
  reducers: {
    setDataRoleSelected: (state, action) => {
      state.roleSelected = action.payload;
      state.receivedRole = true;
    },
    setDataRole: (state, action) => {
      state.dataRole = action.payload;
    },
    setGameTypeSelected: (state, action) => {
      state.gameTypeSelected = action.payload;
    },
    setScenarioSelected: (state, action) => {
      state.scenarioSelected = action.payload;
    },
    setgroupCount: (state, action) => {
      state.groupCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setRoleWithRoleGame.pending, () => {});
    builder.addCase(setRoleWithRoleGame.rejected, () => {});
    builder.addCase(setRoleWithRoleGame.fulfilled, (state, action) => {
      state.roleSelected = action.payload.data;
      state.receivedRole = true;
    });
    builder.addCase(setDataRoleNewGame.pending, () => {});
    builder.addCase(setDataRoleNewGame.rejected, () => {});
    builder.addCase(setDataRoleNewGame.fulfilled, (state, action) => {
      state.dataRole = action.payload.data;
      const a: Array<string> = [];
      action.payload.data.map((m: IRole) => {
        a.push((m as any)["group_" + action.payload.lang]);
      });
      const ba: Array<string> = [...new Set(a)];
      state.group = ba;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setDataRoleSelected,
  setGameTypeSelected,
  setScenarioSelected,
  setgroupCount,
  setDataRole,
} = roleSlice.actions;

export default roleSlice.reducer;
