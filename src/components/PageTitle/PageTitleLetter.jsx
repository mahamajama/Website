import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { lettersExploded, flipped } from "../../features/Homepage/homeSlice";
import { ignoreTransition } from "../../utils/effects";

export default function PageTitleLetter({ letter, index, onClick, children }) {
    const [isMounted, setIsMounted] = useState(false);
    const [isExploded, setIsExploded] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const explodedList = useSelector(lettersExploded);
    const lettersAreFlipped = useSelector(flipped);

    const letterElement = useRef(null);

    function handleClick(e) {
        if (onClick) onClick(e);
    }

    useEffect(() => {
        if (explodedList.includes(index)) setIsExploded(true);
    }, [explodedList])

    const flipDelay = index * 0.1 * 1000;
    let currentTimeout;
    useEffect(() => {
        if (isMounted) {
            if (letterElement.current) {
                clearTimeout(currentTimeout);
                currentTimeout = setTimeout(() => {
                    const finalRotation = lettersAreFlipped ? '1620deg' : '0deg';
                    letterElement.current.style.rotate = finalRotation;
                    setIsFlipped(lettersAreFlipped);
                }, flipDelay);
            }
        } else {
            if (letterElement.current) {
                const finalRotation = lettersAreFlipped ? '1620deg' : '0deg';
                ignoreTransition(letterElement.current, 'rotate', finalRotation);
            }
        }
    }, [lettersAreFlipped])

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return(
        <div className="letter-container" onClick={handleClick}>
            {!isExploded &&
                <div className="letter-action-container">
                    <h1 className="select-disable" ref={letterElement}>{letter ? letter : 'F'}</h1>
                </div>
            }
            {children}
        </div>
    );
}