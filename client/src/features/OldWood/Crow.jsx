import { useState, useRef, useEffect } from "react";

import Actor from '../../components/Actor/Actor.jsx';

import { caw1Sound, caw2Sound } from '../../components/Actor/actors.js';

const crowStates = [
    {
        name: 'idle',
        animation: {
            spriteSheet: 'images/oldwood/crowIdle.png',
            totalFrames: 1,
        },
    },
    {
        name: 'caw1',
        animation: {
            spriteSheet: 'images/oldwood/crowCaw01_spritesheet.png',
            totalFrames: 9,
            map: [6, 0, 1, 2, 3, 5, 0, 1, 2, 2, 3, 4, 6, 7, 8],
        },
        sound: caw1Sound,
    },
    {
        name: 'caw2',
        animation: {
            spriteSheet: 'images/oldwood/crowCaw02_spritesheet.png',
            totalFrames: 11,
            map: [6, 0, 1, 2, 3, 5, 0, 1, 2, 9, 10, 9, 2, 3, 4, 6, 7, 8],
        },
        sound: caw2Sound,
    },
];

export default function Crow() {
    const [crowState, setCrowState] = useState('idle');
    const [crowTrigger, setCrowTrigger] = useState(false);

    const canvas = useRef(null);
    const ctx = useRef(null);
    
    function handleClickCrow() {
        const rand = Math.ceil(Math.random() * 3);
        if (rand < 2) {
            setCrowState('caw2');
            setCrowTrigger(!crowTrigger);
        }
        else {
            setCrowState('caw1');
            setCrowTrigger(!crowTrigger);
        }
    }

    return (
        <div id="crow-container">
            <Actor 
                id="crow" 
                onClick={handleClickCrow} 
                state={crowState} 
                stateList={crowStates} 
                trigger={crowTrigger}
                width={80}
                height={90}
            />
        </div>
    );
}