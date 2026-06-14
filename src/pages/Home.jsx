import { useEffect, useState } from "react";

import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import CategoryFilter from "../Components/CategoryFilter";
import RecipeCard from "../Components/RecipeCard";
import RecipeModal from "../Components/RecipeModal";
import ShoppingDrawer from "../Components/ShoppingDrawer";
import Footer from "../Components/Footer";
import SkeletonCard from "../Components/SkeletonCard";
import Pagination from "../Components/Pagination";

import { searchMeals } from "../Services/mealApi.js";

function Home({ theme, toggleTheme }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("Trending Recipes");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem("shoppingList");
    return saved ? JSON.parse(saved) : [];
  });

  const recipesPerPage = 4;

  const lastRecipe = currentPage * recipesPerPage;
  const firstRecipe = lastRecipe - recipesPerPage;
  const currentRecipes = meals.slice(firstRecipe, lastRecipe);
  const totalPages = Math.ceil(meals.length / recipesPerPage);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  const loadTrendingRecipes = async () => {
    setLoading(true);
    setCurrentPage(1);

    const trendingList = ["chicken", "pasta", "seafood", "dessert"];
    const randomMeal =
      trendingList[Math.floor(Math.random() * trendingList.length)];

    const result = await searchMeals(randomMeal);

    setMeals(result);
    setSectionTitle("Trending Recipes");
    setLoading(false);
  };

  useEffect(() => {
    loadTrendingRecipes();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setCurrentPage(1);

    const result = await searchMeals(query);

    setMeals(result);
    setSectionTitle(`Search Results for "${query}"`);
    setLoading(false);
  };

  const handleCategoryClick = async (category) => {
    setLoading(true);
    setCurrentPage(1);

    const result = await searchMeals(category);

    setMeals(result);
    setSectionTitle(`${category} Recipes`);
    setLoading(false);
  };

  const toggleFavorite = (meal) => {
    const exists = favorites.find((item) => item.idMeal === meal.idMeal);

    if (exists) {
      setFavorites(favorites.filter((item) => item.idMeal !== meal.idMeal));
    } else {
      setFavorites([...favorites, meal]);
    }
  };

  const getIngredients = (meal) => {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure || ""} ${ingredient}`.trim());
      }
    }

    return ingredients;
  };

  const addIngredientsToList = (meal) => {
    const ingredients = getIngredients(meal);

    const newItems = ingredients.filter(
      (item) => !shoppingList.includes(item)
    );

    setShoppingList([...shoppingList, ...newItems]);
  };

  const clearShoppingList = () => {
    setShoppingList([]);
  };

  return (
    <div className="app">
      <Navbar
        favoritesCount={favorites.length}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      <Hero onSearch={handleSearch} />

      <main className="main-content">
        <section className="recipes-section">
          <CategoryFilter onCategoryClick={handleCategoryClick} />

          <div className="section-header">
            <h2>{sectionTitle}</h2>
            <button onClick={loadTrendingRecipes}>View Trending</button>
          </div>

          {loading && (
            <div className="recipe-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          )}

          {!loading && meals.length === 0 && (
            <p className="no-result">No recipes found.</p>
          )}

          {!loading && (
            <>
              <div className="recipe-grid">
                {currentRecipes.map((meal) => (
                  <RecipeCard
                    key={meal.idMeal}
                    meal={meal}
                    onViewRecipe={setSelectedMeal}
                    onToggleFavorite={toggleFavorite}
                    isFavorite={favorites.some(
                      (item) => item.idMeal === meal.idMeal
                    )}
                    onAddIngredients={addIngredientsToList}
                  />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </section>

        <ShoppingDrawer
          shoppingList={shoppingList}
          clearShoppingList={clearShoppingList}
        />
      </main>

      <Footer />

      {selectedMeal && (
        <RecipeModal
          meal={selectedMeal}
          onClose={() => setSelectedMeal(null)}
        />
      )}
    </div>
  );
}

export default Home;