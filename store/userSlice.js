import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user_info: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.user_info = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user_info = null;
    },
  },
});

export const { setUserInfo, setIsAuthenticated, logout } = userSlice.actions;
export default userSlice.reducer;
