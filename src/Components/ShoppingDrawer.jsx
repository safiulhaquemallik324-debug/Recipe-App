import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

function ShoppingDrawer({ shoppingList, clearShoppingList }) {
  return (
    <aside className="shopping-drawer">
      <h2>
        <FiShoppingCart />
        Shopping List
      </h2>

      <p className="item-count">{shoppingList.length} items</p>

      {shoppingList.length === 0 ? (
        <div className="empty-list">
          <p>No ingredients added yet.</p>
        </div>
      ) : (
        <ul className="shopping-items">
          {shoppingList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}

      <button className="clear-btn" onClick={clearShoppingList}>
        <FiTrash2 />
        Clear All
      </button>
    </aside>
  );
}

export default ShoppingDrawer;