import { useDispatch } from "react-redux";
import { setIterations } from "../store/slices/codeTestSlice";

function Setup({ iterations }) {
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
    return Math.max(newnum, 1);
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
    <div className={`setup ${iterations > 0 ? "" : "err"}`}>
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
