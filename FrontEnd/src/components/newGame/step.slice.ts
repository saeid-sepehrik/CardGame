import { createSlice } from '@reduxjs/toolkit'

export interface stepState{
    value : number
}

const initialState: stepState ={
    value: 0,
};

export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    incrementByAmount: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {incrementByAmount } = stepSlice.actions

export default stepSlice.reducer