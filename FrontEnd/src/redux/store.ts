import { configureStore } from "@reduxjs/toolkit";
import stepSlice from "../components/newGame/step.slice";
import authSlice from "../components/auth/auth.slice";
import waitingGameSlice from "../components/game/waitingGame.slice";
import roleSlice from "../components/newGame/role.slice";

export const store = configureStore({
  reducer: {
    step: stepSlice,
    auth: authSlice,
    waiting: waitingGameSlice,
    role: roleSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
