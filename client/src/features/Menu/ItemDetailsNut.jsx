import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setEquipped, selectEquipped } from "../../gameSlice";

export default function ItemDetailsNut() {
    const dispatch = useDispatch();
    const [isEquipped, setIsEquipped] = useState(false);
    const equipped = useSelector(selectEquipped);

    useEffect(() => {
        setIsEquipped(equipped === 'nut');
    }, [equipped]);

    function handleClickEquip() {
        if (equipped === 'nut') {
            dispatch(setEquipped(null));
        } else {
            dispatch(setEquipped('nut'));
        }
    }

    return (
        <button 
            onClick={handleClickEquip}
            type="button"
        >
            {isEquipped ? 'UNEQUIP' : 'EQUIP'}
        </button>
    );
}