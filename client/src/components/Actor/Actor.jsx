import { useState, useRef, useEffect } from "react";

import './actors.css';
import { Animation } from "./actors";

export default function Actor({ id, className, stateList, onClick, state, trigger, width, height }) {
    const [mounted, setMounted] = useState(false);
    //const [state, setState] = useState('idle');

    const canvas = useRef(null);
    const ctx = useRef(null);

    const states = useRef({});

    const currentAnimation = useRef(null);
    const currentSound = useRef(null);

    useEffect(() => {
        if (!mounted && canvas.current) {
            setMounted(true);
            initCanvas();
            initStates(stateList);
        }
    }, [canvas.current]);

    useEffect(() => {
        if (states.current[state]) {
            setAnimation(states.current[state].animation);
            if (states.current[state].sound) {
                setSound(states.current[state].sound);
            }
        }
    }, [trigger]);
    
    function initCanvas() {
        ctx.current = canvas.current.getContext('2d');
        
        canvas.current.width = width;
        canvas.current.height = height;
        
        ctx.current.imageSmoothingEnabled = false;
    }
    
    function initStates(stateList) {
        for (let i = 0; i < stateList.length; i++) {
            const data = stateList[i];
            const map = data.animation.map?.length ? data.animation.map : null;
            const loop = data.animation.loop ? data.animation.loop : false;
            const sound = data.sound || null;

            const spriteSheet = new Image();
            spriteSheet.src = data.animation.spriteSheet;
            spriteSheet.onload = function() {
                const animation = new Animation(
                    spriteSheet, ctx.current, data.animation.totalFrames, 
                    0, 0, 2, // xPos, yPos, scale
                    map, loop
                );


                if (!states.current[data.name]) {
                    states.current[data.name] = {
                        animation: animation,
                        sound: sound,
                    }
                    if (data.name === 'idle') {
                        requestAnimationFrame(() => {
                            animation.play();
                        });
                    }
                }
            }
        }
	}

    function setAnimation(animation) {
        if (currentAnimation.current) currentAnimation.current.cancel();
        animation.play();
        currentAnimation.current = animation;
    }

    function setSound(sound) {
        if (currentSound.current) currentSound.current.stop();
        sound.replay();
        currentSound.current = sound;
    }
    
    function handleClick() {
        if (onClick) onClick();
    }

    return (
        <canvas 
            id={id ? id : ''}
            className={`actor ${className ? className : ''}`}
            onClick={handleClick} 
            ref={canvas}
        >
        </canvas>
    );
}