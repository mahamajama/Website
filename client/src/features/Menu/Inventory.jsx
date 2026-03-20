import { useSelector } from "react-redux";

import { selectInventory, allItems } from "../../gameSlice";

export default function Inventory({ onItemSelected }) {
    const inventory = useSelector(selectInventory);

    return (
        <div id="inventory">
            <h2 className="menu-label">Inventory</h2>
            <div className="inventory-items-container">
                {inventory.map(item => {
                    return (
                        <button 
                            className="inventory-item-button" 
                            onClick={()=> onItemSelected(item)}
                            key={item.name} 
                            type="button"
                        >
                            <img src={item.icon} />
                        </button>
                    );
                })}
            </div>
        </div>
    );
}