import { useState } from "react";

function TestCode({ num }) {
  // TOOGLE
  const [open, setOpen] = useState(false);

  const [testName, setTestName] = useState(`Test ${num + 1}`);

  console.log(num);
  return (
    <div className="toogle-code">
      <button>
        <div>{testName}</div>
        <div>{`>`}</div>
      </button>
    </div>
  );
}

export default TestCode;
