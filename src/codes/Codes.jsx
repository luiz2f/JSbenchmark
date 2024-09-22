import CodeEditor from "./CodeEditor";
import { useState } from "react";

function Codes() {
  const [error, setError] = useState(false);
  const [testCount, setTestCount] = useState(2);
  function addTest() {
    if (testCount < 5) {
      setTestCount((prev) => prev + 1);
    } else setError(true);
  }

  return (
    <div className="codes">
      <CodeEditor test={false} />
      {Array.from({ length: testCount }).map((_, index) => (
        <CodeEditor key={index} num={index} test={true} />
      ))}

      {error ? <p className="err">Max test units: 5</p> : ""}
      <div className="test-btns">
        <button className="btn add-test" onClick={() => addTest()}>
          + Add Test
        </button>
        <button className="btn run-test">Run Test</button>
      </div>
    </div>
  );
}

export default Codes;
