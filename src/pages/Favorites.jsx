import { useEffect, useState } from "react";

import Navbar from "../Components/Navbar";
import RecipeCard from "../Components/RecipeCard";
import RecipeModal from "../Components/RecipeModal";
import Footer from "../Components/Footer";

function Favorites({ theme, toggleTheme }) {
    const [selectedMeal, setSelectedMeal] = useState(null);

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (meal) => {
        setFavorites(favorites.filter((item) => item.idMeal !== meal.idMeal));
    };

    return (
        <div className="app">
            <Navbar
                favoritesCount={favorites.length}
                theme={theme}
                toggleTheme={toggleTheme}
            />

            <main className="favorites-page">
                <div className="section-header">
                    <h2>My Favorites</h2>
                </div>

                {favorites.length === 0 && (
                    <p className="no-result">No favorite recipes added yet.</p>
                )}

                <div className="recipe-grid favorites-grid">
                    {favorites.map((meal) => (
                        <RecipeCard
                            key={meal.idMeal}
                            meal={meal}
                            onViewRecipe={setSelectedMeal}
                            onToggleFavorite={toggleFavorite}
                            isFavorite={true}
                        />
                    ))}
                </div>
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

export default Favorites;