import { javascript } from "@codemirror/lang-javascript";
import { vscodeDark, vscodeLightInit } from "@uiw/codemirror-theme-vscode";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useState } from "react";
import { LuChevronDown, LuTrash2 } from "react-icons/lu";
import { useDispatch } from "react-redux";
import {
  deleteTestCode,
  updateSetupCode,
  updateTestCode,
} from "../store/slices/codeTestSlice";

function CodeEditor({ name, id, isTest, code, index, darkMode }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [testCode, setTestCode] = useState(code);
  const testName = name ? name : "Setup";
  const colorSt = isTest ? `var(--color${index + 1})` : "var(--color-10)";
  const customVscodeLight = vscodeLightInit({
    settings: { lineHighlight: "#99999926" },
  });
  const theme = darkMode ? vscodeDark : customVscodeLight;

  function handleChange(e) {
    // talvez reestruturar depois pra mudança só ocorrer na hora do run
    setTestCode(e);
    if (isTest) {
      dispatch(updateTestCode({ id, name: testName, code: e }));
    } else {
      dispatch(updateSetupCode(e));
    }
  }

  function handleDeleteTest(e) {
    e.stopPropagation();
    dispatch(deleteTestCode(id));
  }

  return (
    <div className={`toogle-code ${open ? "open" : ""} `}>
      <button onClick={() => setOpen((prev) => !prev)}>
        <div style={{ color: colorSt }}>{testName}</div>
        <div className="flex">
          <div className="icon">
            <LuChevronDown />
          </div>
          {isTest && (
            <div className="delete" onClick={(e) => handleDeleteTest(e)}>
              <LuTrash2 />
            </div>
          )}
        </div>
      </button>
      <div className="code-box">
        <ReactCodeMirror
          maxHeight="80vh"
          value={testCode}
          onChange={(e) => handleChange(e)}
          theme={theme}
          extensions={[javascript({ jsx: true })]}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
