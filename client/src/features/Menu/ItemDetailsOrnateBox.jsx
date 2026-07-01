import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { openWindow } from "../../components/Windows/windowsSlice";

export default function ItemDetailsOrnateBox() {
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState(['', '', '', '', '', '']);

    const code = 'b0oBi3';
    
    const lockedMessages = [
        `The code didn't seem to work.`,
        `The lid doesn't budge.`,
        `The box remains tightly locked.`,
        `The code seems to be incorrect.`,
        `Nope.`,
        `This must be the wrong code.`,
        `The box stays stubbornly stuck.`,
    ];

    function handleSubmitCode(e) {
        e.preventDefault();

        const inputCode = inputs.join('');
        const unlocked = inputCode === code;

        if (unlocked) {
            dispatch(openWindow({
                id: uuidv4(),
                label: 'Ornate Box',
                text: ['You open the box.', 'The box is empty.'],
            }));
        } else {
            const i = Math.floor(Math.random() * lockedMessages.length);
            dispatch(openWindow({
                id: uuidv4(),
                label: 'Ornate Box',
                text: [lockedMessages[i]],
            }));
        }
    }

    function handleChangeInput(e, i) {
        const element = e.target;
        const value = element.value;
        let newInputs = [...inputs];
        newInputs[i] = value;
        setInputs(newInputs);
        if (value) {
            element.nextElementSibling.focus();
            element.nextElementSibling.select();
        } ;
    }

    return (
        <form>
            <div className="item-details-code-input-container">
                {inputs.map((input, i) => {
                    return (
                        <input 
                            className="item-details-code-input"
                            type="text" 
                            maxLength="1" 
                            onClick={(e)=>e.target.select()}
                            onChange={(e)=>handleChangeInput(e, i)}
                            value={inputs[i]}
                            key={`boxInput_${i}`}
                        />
                    );
                })}
            </div>
            <button className="item-details-submit" type="submit" onClick={handleSubmitCode}>Open the box</button>
        </form>
    );
}