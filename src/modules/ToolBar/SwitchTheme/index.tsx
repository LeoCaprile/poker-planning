import React, { useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useSwitchThemeStore } from "../store";
import { Theme } from "../types";

const SwitchTheme = () => {
  const { setTheme, theme } = useSwitchThemeStore();

  const toggleTheme = () => {
    setTheme(theme === Theme.DARK ? Theme.LIGHT : Theme.DARK);
  };

  useEffect(() => {
    useSwitchThemeStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const body = document.body;
    body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      className="btn btn-info btn-circle absolute ml-5 mt-5"
      onClick={toggleTheme}
    >
      {theme === Theme.LIGHT ? (
        <FiMoon className="w-5 h-5" />
      ) : (
        <FiSun className="w-5 h-5" />
      )}
    </button>
  );
};

export default SwitchTheme;
