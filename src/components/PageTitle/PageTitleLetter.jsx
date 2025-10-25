import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { lettersExploded } from "../../features/Homepage/homeSlice";

export default function PageTitleLetter({ letter, index, onClick, children }) {
    const [isExploded, setIsExploded] = useState(false);
    const explodedList = useSelector(lettersExploded);

    function handleClick(e) {
        if (onClick) onClick(e);
    }

    useEffect(() => {
        if (explodedList.includes(index)) setIsExploded(true);
    }, [explodedList])

    return(
        <div className="letter-container" onClick={handleClick}>
            {!isExploded &&
                <div className="letter-action-container">
                    <h1 className="select-disable">{letter ? letter : 'F'}</h1>
                </div>
            }
            {children}
        </div>
    );
}