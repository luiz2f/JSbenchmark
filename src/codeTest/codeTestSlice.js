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
  iterations: 5000,
  // estado inicial
  setupCode: `// setup your data or function to be called
  const data = [
  { value: 1, description: "Um" },
  { value: 2, description: "Dois" },
  { value: 3, description: "Três" },
  { value: 4, description: "Quatro" },
  { value: 5, description: "Cinco" },
  { value: 6, description: "Seis" },
  { value: 7, description: "Sete" },
  { value: 8, description: "Oito" },
  { value: 9, description: "Nove" },
  { value: 10, description: "Dez" },
];`,
  testCodes: [
    {
      id: 1,
      name: "Test A",
      code: `//  insert your function
      function sumEvensAndOdds(arr) {
    const evenSum = arr
      .filter(({ value }) => value % 2 === 0)
      .reduce((acc, { value }) => acc + value, 0);
      
    const oddSum = arr
      .filter(({ value }) => value % 2 !== 0)
      .reduce((acc, { value }) => acc + value, 0);

    return { evenSum, oddSum };
  }
  //  call her
  sumEvensAndOdds(data)`,
    },
    {
      id: 2,
      name: "Test B",
      code: `//  insert your function
      function sumEvensAndOdds(arr) {
    const sums = { evenSum: 0, oddSum: 0 };

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].value % 2 === 0) {
        sums.evenSum += arr[i].value;
      } else {
        sums.oddSum += arr[i].value;
      }
    }

    return sums;
  }
  //  call her
  sumEvensAndOdds(data)`,
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
      const results = [];
      const times = [];
      state.testCodes.forEach((test) => {
        const testFunction = new Function(state.setupCode + test.code);
        const iterations = state.iterations; // Número de vezes que deseja rodar os testes
        let totalTime = 0;

        for (let i = 0; i < iterations; i++) {
          const startTime = performance.now();
          testFunction();
          const endTime = performance.now();
          const duration = endTime - startTime;
          totalTime += duration;
          times.push(duration);
        }

        const averageTime = totalTime / iterations;
        results.push({
          name: test.name,
          averageTime,
          times,
        });
      });
      state.results = results;
      console.log(results);
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
} = codeTestSlice.actions;
export default codeTestSlice.reducer;
