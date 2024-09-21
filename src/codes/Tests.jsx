import { useState } from "react";
import TestCode from "./TestCode";

function Tests() {
  const [error, setError] = useState(false);
  const [testCount, setTestCount] = useState(2);
  function addTest() {
    if (testCount < 5) {
      setTestCount((prev) => prev + 1);
    } else setError(true);
  }

  return (
    <>
      {Array.from({ length: testCount }).map((_, index) => (
        <TestCode key={index} num={index} />
      ))}

      {error ? <p className="err">Max test units: 5</p> : ""}
      <div className="test-btns">
        <button className="btn add-test" onClick={() => addTest()}>
          + Add Test
        </button>
        <button className="btn run-test">Run Test</button>
      </div>
    </>
  );
}

export default Tests;
