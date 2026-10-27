import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { restartAnimation } from "../../utils/effects";
import Actor from "../../components/Actor/Actor";
import DialogueBox from "../../components/Dialogue/DialogueBox";

const schlemoStates = [
    {
        name: 'idle',
        animation: {
            spriteSheet: 'images/oldwood/schlemo_idle.png',
            totalFrames: 1,
        },
    },
    {
        name: 'greeting',
        animation: {
            spriteSheet: 'images/oldwood/schlemo_excited_spritesheet.png',
            totalFrames: 6,
            map: [0, 1, 3, 2, 3, 5, 4],
        },
    },
    {
        name: 'excited',
        animation: {
            spriteSheet: 'images/oldwood/schlemo_excited_spritesheet.png',
            totalFrames: 6,
            map: [0, 1, 3, 2, 3, 5, 4],
        },
    },
    {
        name: 'love',
        animation: {
            spriteSheet: 'images/oldwood/schlemo_love_spritesheet.png',
            totalFrames: 12,
            loop: true,
        },
    },
];

const schlemoScript = [
    {
        line: `"Hi! I'm Schlemo!"`,
        emit: 'greeting',
        options: [
            {
                option: `"Hi, Schlemo!"`,
            },
            {
                option: `"Bye, Schlemo!" (leave)`,
                end: true,
            },
        ],
    },
    {
        line: `"Would you like to test dialogue emissions?"`,
        emit: 'idle',
        options: [
            {
                option: `"Sure."`,
            },
            {
                option: `"Nope!" (leave)`,
                end: true,
            },
        ],
    },
    {
        line: `"If emissions work, my state has changed! @@@Also this is now an anchor!"`,
        emit: 'love',
        anchor: true,
        options: [
            {
                option: `again`,
                target: 'emissionsTest'
            },
            { option: 'done' },
        ],
        key: 'emissionsTest',
    },
    {
        line: `"Here's some more dialogue to test out that anchor."`,
        emit: 'idle',
    },
    {
        line: `"Now go on and test it!"`,
    },
];

export default function Schlemo({ closeDialogueTrigger }) {
    const dispatch = useDispatch();
    const [state, setState] = useState('idle');
    const [trigger, setTrigger] = useState(false);
    const [dialogieIsOpen, setDialogueIsOpen] = useState(false);

    const schlemoHeadContainer = useRef(null);

    function changeState(newState) {
        setState(newState);
        setTrigger(!trigger);
    }
    
    useEffect(() => {
        if (!dialogieIsOpen) {
            changeState('idle');
        }
    }, [dialogieIsOpen]);

    useEffect(() => {
        setDialogueIsOpen(false);
    }, [closeDialogueTrigger]);

    function handleClick() {
        setDialogueIsOpen(!dialogieIsOpen);
    }

    function handleDialogueEmit(message) {
        changeState(message);
    }

    return (
        <div id="schlemo">
            <div 
                id="schlemo-head-container" 
                className={state} 
                ref={schlemoHeadContainer}
            >
                <Actor
                    id="schlemo-head"
                    className={state}
                    state={state}
                    stateList={schlemoStates}
                    trigger={trigger}
                    width={54}
                    height={72}
                />
            </div>
            <DialogueBox
                name="Schlemo"
                script={schlemoScript}
                open={dialogieIsOpen}
                onEmit={handleDialogueEmit}
                onEnd={()=>setDialogueIsOpen(false)}
            />
            <div className="interaction-box" onClick={handleClick}></div>
        </div>
    );
}