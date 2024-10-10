import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
};

const darkModeSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
  },
});

// exporta reducers
export const { setDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
