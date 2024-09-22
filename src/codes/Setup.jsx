import { javascript } from "@codemirror/lang-javascript";
import { vscodeLight } from "@uiw/codemirror-theme-vscode";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useState } from "react";
import { useSelector } from "react-redux";

function Setup() {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(
    useSelector((state) => state.codeTest.setupCode)
  );

  function handleChange(e) {
    setValue(e);
  }

  return (
    <div className={`toogle-code ${open ? "open" : ""}`}>
      <button onClick={() => setOpen((prev) => !prev)}>
        <div>Setup</div>

        <div>{`>`}</div>
      </button>
      <div className="code-box">
        <ReactCodeMirror
          maxWidth="100%"
          value={value}
          onChange={(e) => handleChange(e)}
          theme={vscodeLight}
          extensions={[javascript({ jsx: true })]}
        />
      </div>
    </div>
  );
}

export default Setup;
