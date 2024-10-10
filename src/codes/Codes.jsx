import { useDispatch, useSelector } from "react-redux";
import CodeEditor from "./CodeEditor";
import { useState } from "react";
import { addTestCode } from "../store/slices/codeTestSlice";
import Setup from "../setup/Setup";
import RunTest from "./RunTest";

function Codes() {
  const { testCodes, setupCode, iterations } = useSelector(
    (state) => state.codeTest
  );
  const testCodesSize = testCodes?.length;
  const { darkMode } = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const isDisabledRunTest = iterations < 1 || testCodesSize <= 0;
  const isDisabledTests = testCodesSize > 4;

  function addTest() {
    if (testCodesSize < 5) {
      dispatch(addTestCode());
    } else setError(true);
  }

  return (
    <div className="codes">
      <CodeEditor isTest={false} code={setupCode} darkMode={darkMode} />
      {testCodes.map((_, index) => {
        const test = testCodes[index];
        return (
          <CodeEditor
            index={index}
            key={test?.id}
            id={test?.id}
            name={test?.name}
            isTest={true}
            code={test?.code}
            darkMode={darkMode}
          />
        );
      })}

      {error ? <p className="err">Max test units: 5</p> : ""}
      <Setup iterations={iterations} />

      <div className="test-btns">
        <button
          disabled={isDisabledTests}
          className="btn add-test"
          onClick={() => addTest()}
        >
          {isDisabledTests ? "5 tests limit" : "+ Add Test"}
        </button>
        <RunTest
          iterations={iterations}
          isDisabledRunTest={isDisabledRunTest}
          dispatch={dispatch}
        />
      </div>
    </div>
  );
}

export default Codes;
