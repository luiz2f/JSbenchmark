import { useDispatch, useSelector } from "react-redux";
import { setIterations } from "../codeTest/codeTestSlice";

function Setup() {
  const { iterations } = useSelector((state) => state.codeTest);
  const dispatch = useDispatch();

  function handleChange(e) {
    dispatch(setIterations(e.target.value));
  }
  function steps(iterations) {
    const digitCount = iterations.toString().length;
    let newnum = 10 ** (digitCount - 1);
    if (iterations - newnum === 0) {
      newnum = 10 ** (digitCount - 2);
    }
    return newnum;
  }
  function handleKeyDown(e) {
    // Permitir teclas de controle e números
    if (
      !(
        (
          (e.key >= "0" && e.key <= "9") || // Permite números
          [
            "Backspace",
            "Tab",
            "Enter",
            "Delete",
            "ArrowLeft",
            "ArrowRight",
          ].includes(e.key)
        ) // Teclas de controle
      )
    ) {
      e.preventDefault();
    }
  }
  return (
    <div className="setup">
      <div>Nº of iterations</div>
      <input
        pattern="\d*"
        type="number"
        min={0}
        value={iterations}
        onChange={(e) => handleChange(e)}
        onKeyDown={handleKeyDown}
        step={steps(iterations)}
      />
    </div>
  );
}

export default Setup;
