import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

import './background.css';
import Mystify from "./Mystify";
import { selectMenuIsOpen } from "../../gameSlice";

export default function Background() {
    const menuIsOpen = useSelector(selectMenuIsOpen);

    return (
        <div id="background-container" className={menuIsOpen ? 'blurred' : ''}>
            <Mystify />
        </div>
    );
}