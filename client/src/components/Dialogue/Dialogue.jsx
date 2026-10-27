import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import './dialogue.css';
import { selectDialogueLines, setDialogieLine } from "../../gameSlice";

export default function Dialogue({ name, script, open, onEnd, onEmit }) {
    const dispatch = useDispatch();

    const [lineToRender, setLineToRender] = useState('');
    const [optionsToRender, setOptionsToRender] = useState([]);
    const [isLineComplete, setIsLineComplete] = useState(false);

    const currentLine = useRef(0);
    const lineBuffer = useRef('');
    const character = useRef(0);
    const optionsBuffer = useRef([]);
    const option = useRef(0);
    const timeout = useRef(null);

    const charsPerTic = 2;
    const messageSpeed = 20;
    const pauseSpeed = 200;
    const optionSpeed = 150;

    const dialogueLines = useSelector(selectDialogueLines);

    useEffect(() => {
        if (!script) return;
        //startDialogue();
    }, [script]);

    useEffect(() => {
        if (open) {
            startDialogue();
        }
    }, [open]);

    // useEffect(() => {
    //     console.log(`Current line: ${currentLine.current}`);
    // }, [currentLine.current]);

    function emit(message) {
        if (onEmit) onEmit(message);
    }

    function startDialogue() {
        if (timeout.current) clearTimeout(timeout.current);

        setLineToRender('');
        if (dialogueLines[name]) currentLine.current = dialogueLines[name];
        else currentLine.current = 0;
        
        if (currentLine.current < script.length) showLine();
    }

    function showLine() {
        //console.log(`Showing line: ${currentLine.current}`);
        if (timeout.current) clearTimeout(timeout.current);

        setIsLineComplete(false);
        setOptionsToRender([]);

        character.current = 0;
        lineBuffer.current = '';
        option.current = 0;
        optionsBuffer.current = [];

        const current = script[currentLine.current];
        const line = current.line;

        if (current.emit) emit(current.emit);
        if (current.anchor && name) {
            dispatch(setDialogieLine({
                name: name,
                line: currentLine.current
            }));
        }

        printNextCharacter();
        
        function printNextCharacter() {
            if (currentLine.current > script.length) return;
    
            if (line != null && character.current < line.length) {
                if (line.charAt(character.current) === "@") {
                    character.current++;
                    timeout.current = setTimeout(printNextCharacter, pauseSpeed);
                } else {
                    lineBuffer.current += line.charAt(character.current);
                    setLineToRender(lineBuffer.current);
                    character.current++;
                    timeout.current = setTimeout(printNextCharacter, messageSpeed);
                }
            } else {
                setIsLineComplete(true);
                showOptions();
            }
        }
    }

    function showOptions() {
        const options = script[currentLine.current].options;
        if (!options || !options.length) {
            if (currentLine.current < script.length - 1) {
                optionsBuffer.current[0] = { option: 'Next' };
            } else {
                optionsBuffer.current[0] = { option: 'End', end: true };
            }
            setOptionsToRender([...optionsBuffer.current]);
        } else {
            showNextOption();
        }

        function showNextOption() {
            optionsBuffer.current[option.current] = options[option.current];
            setOptionsToRender([...optionsBuffer.current]);
    
            option.current++;
            if (option.current < options.length) {
                timeout.current = setTimeout(showNextOption, optionSpeed);
            }
        }
    }

    function interruptLine() {
        if (timeout.current) clearTimeout(timeout.current);
        const line = script[currentLine.current].line.replaceAll('@', '');
        lineBuffer.current = line;
        setLineToRender(line);
        setIsLineComplete(true);
        showOptions();
    }

    function handleClickWindow() {
        if (!isLineComplete) interruptLine();
    }
    
    function handleClickOption(option) {
        if (!option.target) {
            currentLine.current++;
        } else if (option.target === 'end') {
            currentLine.current = script.length - 1;
        } else {
            const targetLine = script.findIndex(line => {
                if (line.key && line.key === option.target) {
                    return true;
                }
                return false;
            });
            if (targetLine > -1) currentLine.current = targetLine;
            else currentLine.current++;
        }

        if (option.emit) emit(option.emit);

        if (option.end) {
            if (option.anchorNext && currentLine.current < script.length && name) {
                dispatch(setDialogieLine({
                    name: name,
                    line: currentLine.current
                }));
            }
            if (onEnd) onEnd(); 
        } else if (currentLine.current < script.length) {
            showLine();
        }
    }

    return (
        <div className="dialogue" onClick={handleClickWindow}>
            <p>{lineToRender}</p>
            <ol>{optionsToRender.map((option, i) => {
                return (
                    <DialogueOption 
                        option={option} 
                        onClick={handleClickOption}
                        key={`D_option_${i}`}
                    />
                );
            })}</ol>
        </div>
    );
}

function DialogueOption({ option, onClick }) {
    function handleClick() {
        if (onClick) onClick(option);
    }

    return (
        <li className="dialogue-option">
            <button type="button" onClick={handleClick}>
                {option.option}
            </button>
        </li>
    );
}




const exampleScript = [
    {
        line: `This is a test line.`,
    },
    {
        line: `Another test line here, but this time it's a little bit longer.`,
        options: [
            {
                option: `Test default behavior...`,
            },
            {
                option: `Test out timing...`,
                target: 'timingTest',
            },
            {
                option: `Test the final line of dialogue...`,
                target: 'end',
            },
            {
                option: `Test ending dialogue...`,
                end: true,
            },
        ],
    },
    {
        line: `You've just gone to the next line in the list.`,
        options: [
            {
                option: `Yay!`,
            },
            {
                option: `Test out timing...`,
                target: 'timingTest',
            },
            {
                option: `Test the final line of dialogue...`,
                target: 'end',
            },
        ],
    },
    {
        line: `Yep, it's pretty exciting to see things working.`,
    },
    {
        line: `Here's@ a test@@@ of adjusting timing@@.@@.@@.`,
        options: [
            {
                option: 'Wow.'
            },
        ],
        key: 'timingTest',
    },
    {
        line: `I know, I know.`,
    },
    {
        line: `And now, we've reached the end of our dialogue.@@ Goodbye!`,
    },
];