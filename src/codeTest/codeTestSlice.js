import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
const letters = [
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const defaultCode = `console.log("Hello Word!")`;
const initialState = {
  iterations: 5000,
  // estado inicial
  setupCode: `// setup your data or function to be called
  const arr = [0,10,20,30, 25, 15, 12, 2, 143, 15, 0, 10, 20, 30, 25, 15, 12, 2, 143, 15, 10, 20, 10, 20, 30, 25, 15, 12, 2, 143,
  1, 0, 10, 20, 30, 25, 15, 12, 2, 143, 15, 10, 20, 10, 20, 30, 25, 15, 12, 2,
  143, 1, 0, 10, 20, 30, 25, 15, 12, 2, 143, 15, 10, 20, 10, 20, 30, 25, 15, 12,
  2, 143, 1, 0, 10, 20, 30, 25, 15, 12, 2, 143, 15, 10, 20, 10, 20, 30, 25, 15,
  12, 2, 143, 1,]
  function greaterThan10(n) { return n > 10}
  `,
  testCodes: [
    {
      id: 1,
      name: "Test A",
      code: `var filter = function (arr, fn) {
    let ans = [];
    for (var i = 0; i < arr.length; i++) {
         if(fn(arr[i], i)){ 
            ans.push(arr[i]) 
            }
    }
    return ans
};
filter(arr, greaterThan10)`,
    },
    {
      id: 2,
      name: "Test B",
      code: `var filter = function(arr, fn) {
    return arr.filter(fn)
};
filter(arr, greaterThan10)`,
    },
  ],
  results: { boxplot: [], averageSpeed: [], scatter: [] },
};

const codeTestSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setIterations(state, action) {
      state.iterations = action.payload;
    },
    setSetupCode(state, action) {
      state.setupCode = action.payload;
    },
    addTestCode(state) {
      const name = "Test " + letters.shift(0);
      const id =
        state.testCodes.length > 0
          ? Math.max(...state.testCodes.map((test) => test.id)) + 1
          : 1;
      const existingTest = state.testCodes.find((test) => test.id === name);
      if (!existingTest) {
        state.testCodes.push({ id, name, code: defaultCode });
      }
    },
    updateSetupCode(state, action) {
      state.setupCode = action.payload;
    },
    updateTestCode(state, action) {
      const { id, name, code } = action.payload;
      const testIndex = state.testCodes.findIndex((test) => test.id === id);

      if (testIndex !== -1) {
        // Atualiza o objeto do teste correspondente
        state.testCodes[testIndex] = {
          ...state.testCodes[testIndex],
          name,
          code,
        };
      }
    },
    deleteTestCode(state, action) {
      const idToDelete = action.payload;
      console.log("Deleting test with ID:", idToDelete); // Adicione um log aqui
      state.testCodes = state.testCodes.filter(
        (test) => test.id !== idToDelete
      );
      console.log("Test Codes after deletion:", state.testCodes);
    },
    runTests(state) {
      const results = { boxplot: [], averageSpeed: [] };
      state.testCodes.forEach((test) => {
        const testFunction = new Function(state.setupCode + "\n\n" + test.code);
        const iterations = state.iterations; // Número de vezes que deseja rodar os testes
        let totalTime = 0;
        let gotit = 0;
        for (let i = 0; gotit < iterations; i++) {
          const startTime = performance.now();
          testFunction();
          const endTime = performance.now();
          const duration = endTime - startTime;
          if (duration) {
            totalTime += duration;
            results.boxplot.push({ name: test.name, value: duration });
            gotit++;
          }
        }
        results.averageSpeed.push({
          name: test.name,
          averageTime: totalTime / iterations,
        });
      });
      state.results = { ...state.results, ...results };
    },
    setResults(state) {
      const results = state.results;
      state.results = results;
    },
  },
});

// exporta reducers
export const {
  reducerName,
  addTestCode,
  updateTestCode,
  updateSetupCode,
  deleteTestCode,
  runTests,
  setResults,
  setIterations,
} = codeTestSlice.actions;
export default codeTestSlice.reducer;
