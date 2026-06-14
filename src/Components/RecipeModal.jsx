import { FiX } from "react-icons/fi";
import { FaGlobeAsia, FaUtensils, FaYoutube } from "react-icons/fa";

function RecipeModal({ meal, onClose }) {
  // MealDB ingredients extract korar function
  const getIngredients = () => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }

    return ingredients;
  };

  const ingredients = getIngredients();

  return (
    <div className="modal-overlay">
      <div className="recipe-modal">
        <button className="modal-close" onClick={onClose}>
          <FiX />
        </button>

        <img
          className="modal-img"
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />

        <div className="modal-content">
          <h2>{meal.strMeal}</h2>

          <div className="modal-tags">
            <span>
              <FaGlobeAsia />
              {meal.strArea}
            </span>

            <span>
              <FaUtensils />
              {meal.strCategory}
            </span>
          </div>

          <h3>Ingredients</h3>

          <ul className="ingredients-list">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Instructions</h3>

          <p className="instructions">{meal.strInstructions}</p>

          {meal.strYoutube && (
            <a
              className="youtube-btn"
              href={meal.strYoutube}
              target="_blank"
              rel="noreferrer"
            >
              <FaYoutube />
              Watch Tutorial
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecipeModal;