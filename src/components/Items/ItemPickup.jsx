import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectFlags, addToInventory } from "../../gameSlice";

export default function ItemPickup({ name, imageSrc, id }) {
    const dispatch = useDispatch();
    const flags = useSelector(selectFlags);
    const [gotItem, setGotItem] = useState(false);
    useEffect(() => {
        if (!gotItem && flags.includes(`got ${name}`)) {
            setGotItem(true);
        }
    }, [flags])

    function handleClick(e) {
        dispatch(addToInventory(name));
        setGotItem(true);
    }

    return (
        <>
        {!gotItem &&
            <button 
                id={id}
                className="item-pickup" 
                style={{background: `center / cover url(${imageSrc})`}}
                onClick={handleClick}
                type="button"
            ></button>
        }
        </>
    );
}