import { javascript } from "@codemirror/lang-javascript";
import { vscodeLight } from "@uiw/codemirror-theme-vscode";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function TestCode({ num }) {
  const data = useSelector((state) => state.codeTest.testCodes);
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(`console.log("HelloWord")`);

  //Editar nome do código
  //Resolver Scroll X
  //Resolver Select que nao aparece
  const [testName, setTestName] = useState(`Test ${num + 1}`);

  useEffect(() => {
    const selectedCode = data.find((item) => item.id === num + 1);
    if (selectedCode) {
      setValue(selectedCode.code);
    }
  }, []);
  console.log(data);
  function handleChange(e) {
    setValue(e);
  }

  //DARKMODE APLICATION

  return (
    <div className={`toogle-code ${open ? "open" : ""}`}>
      <button onClick={() => setOpen((prev) => !prev)}>
        <div>{testName}</div>
        <div>{`>`}</div>
      </button>
      <div className="code-box">
        <ReactCodeMirror
          value={value}
          onChange={(e) => handleChange(e)}
          theme={vscodeLight}
          extensions={[javascript]}
        />
      </div>
    </div>
  );
}

export default TestCode;
