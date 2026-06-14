import { Link } from "react-router-dom";
import { FaUtensils, FaHeart } from "react-icons/fa";
import { FiShoppingCart, FiSun, FiMoon } from "react-icons/fi";

function Navbar({ favoritesCount = 0, theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <h2 className="logo">
        <FaUtensils />
        Recipe<span>Hub</span>
      </h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/favorites">
          <FaHeart />
          Favorites ({favoritesCount})
        </Link>

        <button className="cart-btn">
          <FiShoppingCart />
          List (0)
        </button>

        <button
          type="button"
          className="theme-btn"
          onClick={() => {
            console.log("BUTTON CLICKED");
            console.log(theme);
            console.log(toggleTheme);

            toggleTheme();
          }}
        >
          {theme === "dark" ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;