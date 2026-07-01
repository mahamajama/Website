import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";

import './equipment.css';

import { timer } from "../../utils/helpers";
import { selectEquipped, setEquipped, selectInventory, updateItem } from "../../gameSlice";
import { allItems } from "../../gameSlice";
import EquipNut from "./EquipNut";

export default function EquipmentManager() {
    const dispatch = useDispatch();
    const location = useLocation();
    
    const [itemData, setItemData] = useState(null);
    const [component, setComponent] = useState(null);

    const items = useSelector(selectInventory);
    const equipped = useSelector(selectEquipped);

    const roastingTimer = useRef(null);
    const roastTime = 10000;

    const components = {
        nut: <EquipNut 
            onRoasting={handleRoasting}
            onStoppedRoasting={handleStopRoasting}
            roasted={itemData ? itemData.roasted : false} 
        />,
    }

    useEffect(() => {
        const item = items.find(item => item.name === equipped);
        setItemData(item || null);
    }, [equipped, items]);

    useEffect(() => {
        if (itemData) setComponent(components[itemData.name]);
        else setComponent(null);
    }, [itemData]);

    function handleClickUnequip() {
        dispatch(setEquipped(null));
    }

    function handleRoasting() {
        if (itemData && itemData.roasted) return;

        if (!roastingTimer.current) {
            roastingTimer.current = new timer(onFinishedRoasting, roastTime);
        } else {
            console.log(roastingTimer.current);
            roastingTimer.current.start();
        }
    }

    function handleStopRoasting() {
        if (itemData && itemData.roasted) return;

        if (roastingTimer.current) {
            roastingTimer.current.pause();
        }
    }

    function onFinishedRoasting() {
        const currentNut = items.find(item => item.name === 'nut');
        dispatch(updateItem({
            ...currentNut,
            displayName: 'Roasted Nut',
            icon: 'images/items/roastedNut.png',
            fullImage: 'images/items/roastedNut_full.png',
            description: `A large nut that looks similar to a chestnut. It's been roasted to perfection.`,
            roasted: true
        }));
    }

    return (
        <div id="equipment-manager">
            <div className={`equipment-info ${equipped ? 'open' : ''}`}>
                <h4>Equipped:</h4>
                <div className="equipment-info-wrapper">
                    <img src={itemData ? itemData.icon : null} />
                    <p>{itemData ? itemData.displayName : 'Nothing equipped'}</p>
                    <button onClick={handleClickUnequip}>UNEQUIP</button>
                </div>
            </div>
            {component}
        </div>
    );
}



