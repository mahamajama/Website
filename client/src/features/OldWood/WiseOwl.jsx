import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import Actor from '../../components/Actor/Actor.jsx';
import Dialogue from "../../components/Dialogue/Dialogue.jsx";
import { openWindow } from "../../components/Windows/windowsSlice.js";

import { hootSound } from '../../components/Actor/actors.js';
import DialogueBox from "../../components/Dialogue/DialogueBox.jsx";

const owlStates = [
    {
        name: 'idle',
        animation: {
            spriteSheet: 'images/oldwood/wiseOwl.png',
            totalFrames: 1,
        },
    },
    {
        name: 'hoot',
        animation: {
            spriteSheet: 'images/oldwood/wiseOwl_hoot_spritesheet.png',
            totalFrames: 4,
            map: [0, 1, 1, 2, 3, 0],
        },
        sound: hootSound,
    },
];

const wiseOwlScript = [
    {
        line: `"Hoot." (I am the wise owl of these woods. I will share my wisdom with you.)`,
        options: [
            {
                option: `Consider this noble creature's words... (leave)`,
                end: true,
                anchorNext: true,
            },
        ],
    },
    {
        line: `"Hoot." (Brush your teeth two times per day. Do not skip flossing.)`,
        options: [
            {
                option: `Accept the owl's wisdom... (leave)`,
                end: true,
                anchorNext: true,
            },
        ],
    },
    {
        line: `"Hoot." (Using unsalted butter allows for more careful control of your seasoning level.)`,
        options: [
            {
                option: `Reguard the newfound confidence in your judgement... (leave)`,
                end: true,
                anchorNext: true,
            },
        ],
    },
    {
        line: `"Hoot." (Exercise is a healthy and effective way to reduce stress.)`,
        options: [
            {
                option: `Knod solemnly... (leave)`,
                end: true,
                anchorNext: true,
            },
        ],
    },
    {
        line: `"Hoot." (The garish floating name holds more than one secret.)`,
        options: [
            {
                option: `Reflect on the small mysteries of everyday life... (leave)`,
                end: true,
                anchorNext: true,
            },
        ],
    },
    {
        line: `"Hoot." (I have shared with you all of the wisdom I possess that you are currently ready to handle.)`,
        options: [
            {
                option: `Accept your own limitations with the knowledge that they may one day be surpassed... (leave)`,
                end: true,
            },
        ],
    },
];

export default function WiseOwl() {
    const dispatch = useDispatch();
    const [state, setState] = useState('idle');
    const [trigger, setTrigger] = useState(false);
    const [dialogieIsOpen, setDialogueIsOpen] = useState(false);
    
    function handleClickOwl() {
        setState('hoot');
        setTrigger(!trigger);
        setDialogueIsOpen(true);
    }

    function handleDialogueEmit(message) {
        return;
    }

    return (
        <div id="wise-owl-container">
            <Actor 
                id="wise-owl" 
                onClick={handleClickOwl} 
                state={state} 
                stateList={owlStates} 
                trigger={trigger}
                width={78}
                height={112}
            />
            <DialogueBox
                name="Wise Owl"
                script={wiseOwlScript}
                open={dialogieIsOpen}
                onEmit={handleDialogueEmit}
                onEnd={()=>setDialogueIsOpen(false)}
            />
        </div>
    );
}