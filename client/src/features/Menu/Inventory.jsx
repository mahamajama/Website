

export default function Inventory({ items, onItemSelected, selected }) {
    return (
        <div id="inventory">
            <div className="inventory-title-container">
                <h2>Inventory</h2>
            </div>
            <div className="inventory-items-container">
                {items.map((item, i) => {
                    const selectedClass = selected === i ? 'selected' : '';
                    return (
                        <button 
                            className={`inventory-item-button ${selectedClass}`} 
                            onClick={()=> onItemSelected(item, i)}
                            key={`inventoryListing_${item.name}`} 
                            type="button"
                        >
                            <img src={item.icon} />
                        </button>
                    );
                })}
                {!items.length &&
                    <p>You currently have no items</p>
                }
            </div>
        </div>
    );
}