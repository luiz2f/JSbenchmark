import { configureStore } from "@reduxjs/toolkit";
import codeTestSlice from "../codeTest/codeTestSlice";

const store = configureStore({
  reducer: {
    codeTest: codeTestSlice.reducer,
  },
});

export default store;
