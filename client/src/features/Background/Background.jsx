import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { createPortal } from "react-dom";

import './background.css';
import Mystify from "./Mystify";
import { selectMenuIsOpen } from "../../gameSlice";
import ScrollingBackground from "./ScrollingBackground";

export default function Background({ type }) {
    const [background, setBackground] = useState(<Mystify />);
    const menuIsOpen = useSelector(selectMenuIsOpen);

    const backgrounds = {
        mystify: <Mystify />,
        hotFire: <ScrollingBackground imageSrc="/images/hotfire/hotFire_bg.jpg" xSpeed={-0.3} ySpeed={-0.17} />,
    }

    useEffect(() => {
        if (type && Object.hasOwn(backgrounds, type)) {
            setBackground(backgrounds[type]);
        }
    }, [type]);

    return (
        <>
        {createPortal(    
            <div id="background" className={menuIsOpen ? 'blurred' : ''}>
                {background}
            </div>
        , document.getElementById('root'))}
        </>
    );
}