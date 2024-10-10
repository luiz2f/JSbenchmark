import { useEffect, useState } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../store/slices/darkModeSlice";

function DarkModeToggle() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.darkMode);
  useEffect(() => {
    const darkPref = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (darkPref) {
      dispatch(setDarkMode());
    }
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => dispatch(setDarkMode())}
      className={`dark-btn ${darkMode ? "active" : ""}`}
    >
      <div className="icon-container">
        <div className="icon-tr">
          <LuMoon className="moon" />
          <LuSun className="sun" />
        </div>
      </div>
    </button>
  );
}

export default DarkModeToggle;
