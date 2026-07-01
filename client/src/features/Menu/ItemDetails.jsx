import { useRef, useEffect, useState } from "react";
import Slideshow from "../../components/Slideshow/Slideshow";
import ItemDetailsOrnateBox from "./ItemDetailsOrnateBox";
import ItemDetailsNut from "./ItemDetailsNut";

const initialItemData = {
    name: '',
    displayName: '',
    icon: null,
    fullImage: null,
    description: '',
}

export default function ItemDetails({ items, selected, open }) {
    const [selection, setSelection] = useState(null);
    const [selectionComponent, setSelectionComponent] = useState(null);
    const [wheelRotation, setWheelRotation] = useState(0);
    
    const wheelImageDistance = 36;

    const itemComponents = {
        ornateBox: <ItemDetailsOrnateBox />,
        nut: <ItemDetailsNut />,
    }

    useEffect(() => {
        const newItem = items[selected];
        if (newItem) {
            setSelection(newItem);
            const newComponent = itemComponents[newItem.name];
            setSelectionComponent(newComponent || null);
        } else {
            setSelection(null);
            setSelectionComponent(null);
        }
        setWheelRotation(-selected * wheelImageDistance);
    }, [selected]);

    return (
        <div id="item-details" className={`${open && selection ? 'open' : ''}`}>
                <div className="item-wheel" style={{ rotate: `${wheelRotation}deg` }}>
                    {items.map((item, i) => {
                        const selectedClass = i === selected ? 'selected' : '';
                        const initRotation = i * wheelImageDistance;
                        const currentRotation = -(initRotation + wheelRotation);
                        return (
                            <div 
                                className={`item-details-image-container-container ${selectedClass}`}
                                style={{ rotate: `${initRotation}deg` }}
                                key={`itemDisplayImage_${item.name}`}
                            >
                                <div 
                                    className={`item-details-image-container ${selectedClass}`}
                                    style={{ rotate: `${currentRotation}deg` }}
                                >
                                    <img 
                                        className={`${selectedClass} select-disable`} 
                                        src={item.fullImage}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="selection-details-container">
                    {selection && 
                        <div className="selection-details">
                            <h1 className="item-details-name">{selection.displayName}</h1>
                            <p className="item-details-description">{selection.description}</p>
                            {selectionComponent && selectionComponent}
                        </div>
                    }
                </div>
        </div>
    );
}