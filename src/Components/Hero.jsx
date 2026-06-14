import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getMealSuggestions } from "../Services/mealApi.js";

function Hero({ onSearch }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const result = await getMealSuggestions(value);
    setSuggestions(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setSuggestions([]);
  };

  const handleSuggestionClick = (mealName) => {
    setQuery(mealName);
    onSearch(mealName);
    setSuggestions([]);
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Discover Your Next <br />
          <span>Favorite Meal</span> 😋
        </h1>

        <p>
          Search recipes, save your favorites, and add ingredients to your
          shopping list.
        </p>

        <form className="search-box" onSubmit={handleSubmit}>
          <FiSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search for pizza, pasta, chicken..."
            value={query}
            onChange={handleChange}
          />

          <button type="submit">Search</button>

          {suggestions.length > 0 && (
            <div className="suggestions-box">
              {suggestions.map((meal) => (
                <div
                  className="suggestion-item"
                  key={meal.idMeal}
                  onClick={() => handleSuggestionClick(meal.strMeal)}
                >
                  <img src={meal.strMealThumb} alt={meal.strMeal} />
                  <span>{meal.strMeal}</span>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>

      <div className="hero-img">
        <img
          src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600"
          alt="Pasta Bowl"
        />
      </div>
    </section>
  );
}

export default Hero;