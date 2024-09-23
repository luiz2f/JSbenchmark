import { useDispatch, useSelector } from "react-redux";
import CodeEditor from "./CodeEditor";
import { useState } from "react";
import { addTestCode, runTests } from "../codeTest/codeTestSlice";

function Codes() {
  const { testCodes, setupCode } = useSelector((state) => state.codeTest);
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  function addTest() {
    if (testCodes?.length < 5) {
      dispatch(addTestCode());
    } else setError(true);
  }

  function handleRunTest() {
    dispatch(runTests());
  }

  return (
    <div className="codes">
      <CodeEditor isTest={false} code={setupCode} />
      {testCodes.map((_, index) => {
        const test = testCodes[index];
        return (
          <CodeEditor
            key={test?.id}
            id={test?.id}
            name={test?.name}
            isTest={true}
            code={test?.code}
          />
        );
      })}

      {error ? <p className="err">Max test units: 5</p> : ""}
      <div className="test-btns">
        <button className="btn add-test" onClick={() => addTest()}>
          + Add Test
        </button>
        <button onClick={() => handleRunTest()} className="btn run-test">
          Run Test
        </button>
      </div>
    </div>
  );
}

export default Codes;
