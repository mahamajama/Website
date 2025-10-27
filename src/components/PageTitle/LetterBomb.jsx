import { useState, useEffect, useRef } from "react";
import sound from '../../utils/audio';

const warningSound = new sound("sounds/SCD_warning.wav");
const explosionSound = new sound("sounds/SSB_fireball.wav");

const explosionImg = new Image();
explosionImg.src = "assets/home/O2Explosion.gif";

export default function LetterBomb({ initCount, letterIndex, onExplode }) {
    const [exploded, setExploded] = useState(false);
    const [count, setCount] = useState(getInitCount);
    const [showCount, setShowCount] = useState(false);

    const countdown = useRef(null);
    const explosion = useRef(null);

    function getInitCount() {
        if (initCount) return initCount;
        else return 4;
    }

    function handleClick(e) {
        if (!exploded) {
            if (!showCount) setShowCount(true);
            setCount(count - 1);
        }
    }

    function pulse() {
        if (countdown.current) {
            resetPulse();
            countdown.current.offsetHeight;
            countdown.current.classList.add('pulse');
            countdown.current.addEventListener('animationend', resetPulse);
            warningSound.play();
        }
    }
    function resetPulse() {
        countdown.current.removeEventListener('animationend', resetPulse);
        countdown.current.classList.remove('pulse');
    }

    useEffect(() => {
        explosionImg.src = `assets/home/O2Explosion.gif?${new Date().getTime()}`;
        explosionImg.onload = () => { console.log("should load"); }
    }, [])

    useEffect(() => {
        if (count > 0) {
            pulse();
        } else {
            setExploded(true);
        } 
    }, [count])

    useEffect(() => {
        if (exploded) {
            if (onExplode) onExplode(letterIndex);
            explosion.current.src = null;
            requestAnimationFrame(() => {
                explosion.current.src = explosionImg.src;
                explosionSound.play();
                setTimeout(() => {
                    explosion.current.classList.add('exploded');
                }, 2000)
            })
        }
    }, [exploded])

    return (
        <>
        {!exploded &&
            <div className="letter-bomb" onClick={handleClick}>
                <p className={`letter-bomb-countdown select-disable ${showCount ? 'visible' : ''}`} ref={countdown}>{count}</p>
            </div>
        }
        <img className={`letter-explosion select-disable`} src={null} ref={explosion} />
        </>
    );
}