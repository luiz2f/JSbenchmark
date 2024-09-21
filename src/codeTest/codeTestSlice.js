import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // estado inicial
  setupCode: "",
  testCodes: [],
  results: [],
};

const codeTestSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setSetupCode(state, action) {
      state.setupCode = action.payload;
    },
    addTestCode(state, action) {
      const { id, code } = action.payload;
      const existingTest = state.testCodes.find((test) => test.id === id);
      if (!existingTest) {
        state.testCodes.push({ id, code });
      }
    },
    setResults(state, action) {
      state.results = action.payload;
    },
  },
});

// exporta reducers
export const { reducerName, addTestCode, setResults } = codeTestSlice.actions;
export default codeTestSlice.reducer;
