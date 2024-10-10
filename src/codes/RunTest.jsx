import { runTests } from "../store/slices/codeTestSlice";

function RunTest({ isDisabledRunTest, dispatch }) {
  function handleRunTest() {
    dispatch(runTests());
  }

  return (
    <button
      disabled={isDisabledRunTest}
      onClick={() => handleRunTest()}
      className="btn run-test"
    >
      Run Test
    </button>
  );
}

export default RunTest;
