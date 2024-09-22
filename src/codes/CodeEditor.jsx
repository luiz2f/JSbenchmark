import { javascript } from "@codemirror/lang-javascript";
import { vscodeLight, vscodeLightInit } from "@uiw/codemirror-theme-vscode";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function CodeEditor({ num, test }) {
  //Editar nome do código
  //DARKMODE APLICATION

  const data = useSelector((state) => state.codeTest);
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(
    test ? `console.log("Hello World")` : data.setupCode
  );
  const [testName, setTestName] = useState(test ? `Test ${num + 1}` : "Setup");

  useEffect(() => {
    if (test) {
      const selectedCode = data?.testCodes?.find((item) => item.id === num + 1);
      if (selectedCode) {
        setValue(selectedCode.code);
      }
    }
  }, []);
  // useEffect(() => {
  //   if (type !== "setup") {
  //     const selectedCode = data.find((item) => item.id === num + 1);
  //     if (selectedCode) {
  //       setValue(selectedCode.code);
  //     }
  //   } else {
  //     setValue(useSelector((state) => state.codeTest.setupCode));
  //   }
  // }, [type, num, data]);

  function handleChange(e) {
    setValue(e);
  }

  const customVscodeLight = vscodeLightInit({
    settings: { lineHighlight: "#99999926" },
  });

  return (
    <div className={`toogle-code ${open ? "open" : ""} `}>
      <button onClick={() => setOpen((prev) => !prev)}>
        <div>{testName}</div>
        <div>{`>`}</div>
      </button>
      <div className="code-box">
        <ReactCodeMirror
          value={value}
          onChange={(e) => handleChange(e)}
          theme={customVscodeLight}
          extensions={[javascript({ jsx: true })]}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
