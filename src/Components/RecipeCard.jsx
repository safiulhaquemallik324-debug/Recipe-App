import { FaHeart, FaStar, FaGlobeAsia, FaUtensils } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";

function RecipeCard({
  meal,
  onViewRecipe,
  onToggleFavorite,
  isFavorite,
  onAddIngredients,
}) {
  return (
    <div className="recipe-card">
      <div className="card-img">
        <img src={meal.strMealThumb} alt={meal.strMeal} />

        <button
          className={`heart-btn ${isFavorite ? "active-heart" : ""}`}
          onClick={() => onToggleFavorite(meal)}
        >
          <FaHeart />
        </button>
      </div>

      <div className="card-content">
        <h3>{meal.strMeal}</h3>

        <p className="rating">
          <FaStar />
          <span>4.8</span>
        </p>

        <div className="card-info">
          <span>
            <FaGlobeAsia />
            {meal.strArea}
          </span>

          <span>
            <FaUtensils />
            {meal.strCategory}
          </span>
        </div>

        <div className="card-actions">
          <button className="add-btn" onClick={() => onAddIngredients(meal)}>
            <FiShoppingCart />
            Add Ingredients
          </button>

          <button className="view-btn" onClick={() => onViewRecipe(meal)}>
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;