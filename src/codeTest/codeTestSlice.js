import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // estado inicial
  setupCode: `const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]`,
  testCodes: [
    {
      id: 1,
      code: `function somaParesLoop(arr) {
    let soma = 0;
    for (let num of arr) {
        if (num % 2 === 0) {
            soma += num;
        }
    }
    return soma;
}
    somaParesLoop(numeros)`,
    },
    {
      id: 2,
      code: `function somaParesFilter(arr) {
    return arr.filter(num => num % 2 === 0).reduce((acc, num) => acc + num, 0);
    somaParesFilter(numeros)
}`,
    },
  ],
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
