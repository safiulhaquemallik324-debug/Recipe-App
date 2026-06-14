import { FaIceCream } from "react-icons/fa";
import { GiNoodles, GiChickenOven, GiCow } from "react-icons/gi";
import { MdOutlineSetMeal } from "react-icons/md";

function CategoryFilter({ onCategoryClick }) {
  const categories = [
    { name: "Chicken", icon: <GiChickenOven /> },
    { name: "Beef", icon: <GiCow /> },
    { name: "Seafood", icon: <MdOutlineSetMeal /> },
    { name: "Dessert", icon: <FaIceCream /> },
    { name: "Pasta", icon: <GiNoodles /> },
  ];

  return (
    <section className="categories">
      <h2>Popular Categories</h2>

      <div className="category-list">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategoryClick(category.name)}
          >
            <span>{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryFilter;