import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  generalData: null,
};

const generalDataSlice = createSlice({
  name: 'generalData',
  initialState,
  reducers: {
    setGeneralData: (state, action) => {
      state.generalData = action.payload;
    },
  },
});

export const { setGeneralData } = generalDataSlice.actions;
export default generalDataSlice.reducer;
