import { configureStore } from "@reduxjs/toolkit";
import codeTestSlice from "./slices/codeTestSlice";
import darkModeSlice from "./slices/darkModeSlice";

const store = configureStore({
  reducer: {
    codeTest: codeTestSlice,
    darkMode: darkModeSlice,
  },
});

export default store;
