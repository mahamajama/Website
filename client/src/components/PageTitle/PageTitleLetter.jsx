import { useEffect, useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { selectFlipped } from "../../features/Home/homeSlice";
import { ignoreTransition } from "../../utils/effects";

export default function PageTitleLetter({ letter, index, onClick, delay, exploded, flipped, children }) {
    const [mounted, setMounted] = useState(false);
    const [isExploded, setIsExploded] = useState(false);

    const lettersAreFlipped = useSelector(selectFlipped);

    const letterRef = useRef(null);
    const timeoutRef = useRef(null);
    
    useEffect(() => {
        if (!mounted && letterRef.current) {
            if (flipped) {
                ignoreTransition(letterRef.current, 'rotate', '1620deg');
            }
            setMounted(true);
        }
    }, [letterRef.current]);
    
    useEffect(() => {
        setIsExploded(exploded);
    }, [exploded]);
    
    useEffect(() => {
        flip();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [flipped]);
    
    const flipDelay = index * 0.1 * 1000;
    useEffect(() => {
        flip();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [lettersAreFlipped]);

    function handleClick(e) {
        if (onClick) onClick(e);
    }

    function flip() {
        if (letterRef.current) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                if (letterRef.current) {
                    const finalRotation = flipped ? '1620deg' : '0deg';
                    letterRef.current.style.rotate = finalRotation;
                }
            }, flipDelay);
        }
    }

    return(
        <div 
            className='letter-container-container' 
            style={{ animationDelay: `${delay}s` }} 
        >
            {!isExploded &&
                <div className="letter-container" onClick={handleClick}>
                    <div className="letter-action-container">
                        <h1 className="select-disable" ref={letterRef}>{letter ? letter : 'F'}</h1>
                    </div>
                </div>
            }
            {children}
        </div>
    );
}