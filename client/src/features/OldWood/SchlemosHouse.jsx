import { useState } from "react";

import Scene from "../../components/Scenes/Scene.jsx";
import Schlemo from "./Schlemo.jsx";



export default function SchlemosHouse({ open, onOpen, onClose }) {
    const [closeDialogueTrigger, setCloseDialogueTrigger] = useState(false);

    function handleOpen() {
        if (onOpen) onOpen();
    }
    
    function handleClose() {
        setCloseDialogueTrigger(!closeDialogueTrigger);
        if (onClose) onClose();
    }

    return (
        <div id="schlemos-house">
            <Scene open={open} onOpen={handleOpen} onClose={handleClose}>
                <img className="select-disable" src="images/oldwood/schlemosHouse.png" draggable="false" />
                <Schlemo closeDialogueTrigger={closeDialogueTrigger} />
            </Scene>
        </div>
    );
}