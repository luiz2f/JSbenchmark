import { createSlice } from "@reduxjs/toolkit";
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
  loading: false,
  progress: 0,
  iterations: 1000,
  // estado inicial
  setupCode: `// setup your data or function to be called
const arr = [ 18, 15, 15, 18, 12, 16, 8, -12, -12, -14, 16, -6, 15, 0, 18, -13, 3, 15, -13, 6, -3, 6, -5, 0, -7, 12, 13, 6, 6, 5, -9, 8, 0, 19,  -10, -13, -13, 6, 10, -6, 12, 12, -2, 0, 10, -1, -14, -11, -10, 19, -4, 7, -9, -15, 11, 14, 0, -8, 3, 9, -13, 11, -15, 4, -9, 5, 12, 0, -1, -8, -6, -9, -5, -4, -2, -14, -9, -5, -8, 11, -4,  -7, 11, -8, 19, 15, -2, 6, 11, -7, -7, 19, 19, -3, 14, -4, 3,  -2, -9, -10 ];
function greaterThan10(n) { return n > 10}`,
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
// call your test function
filter(arr, greaterThan10)`,
    },
    {
      id: 2,
      name: "Test B",
      code: `var filter = function(arr, fn) {
    return arr.filter(fn)
};
// call your test function 
filter(arr, greaterThan10)`,
    },
  ],

  preResults: { boxplot: [], averageSpeed: {}, scatter: [] },
  results: { boxplot: [], averageSpeed: [], scatter: [] },
};

const codeTestSlice = createSlice({
  name: "codeTest",
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
      state.testCodes = state.testCodes.filter(
        (test) => test.id !== idToDelete
      );
    },
    updateProgress(state) {
      state.progress = state.progress + 1;
    },
    runTests(state) {
      const results = { boxplot: [], averageSpeed: [] };
      state.progress = 0;
      state.testCodes.forEach((test) => {
        const testFunction = new Function(state.setupCode + "\n\n" + test.code);
        const iterations = state.iterations; // Número de vezes que deseja rodar os testes
        let totalTime = 0;
        let gotit = 0;
        while (gotit < iterations) {
          const startTime = performance.now();
          testFunction();
          const endTime = performance.now();
          const duration = endTime - startTime;
          if (duration) {
            totalTime += duration;
            results.boxplot.push({ name: test.name, value: duration });
            gotit++;
            codeTestSlice.caseReducers.updateProgress(state);
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
  runTestRerender,
  runTests,
  setResults,
  setIterations,
  updateProgress,
} = codeTestSlice.actions;
export default codeTestSlice.reducer;
