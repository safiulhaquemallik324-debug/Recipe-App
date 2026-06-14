import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Favorites from "./pages/Favorites";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === "light" ? "dark" : "light"
    );
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Home theme={theme} toggleTheme={toggleTheme} />}
      />

      <Route
        path="/favorites"
        element={<Favorites theme={theme} toggleTheme={toggleTheme} />}
      />
    </Routes>
  );
}

export default App;