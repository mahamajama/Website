import { useEffect } from "react";

import Dialogue from "./Dialogue";

export default function DialogueBox({ className, script, name, open, onEnd, onEmit }) {


    function handleEnd() {
        if (onEnd) onEnd();
    }

    function handleEmit(message) {
        if (onEmit) onEmit(message);
    }

    return (
        <div className={`dialogue-box ${className ? className : ''} ${open ? 'open' : 'closed'}`}>
            {name && <h1>{`${name}:`}</h1>}
            <Dialogue
                name={name}
                script={script}
                open={open}
                onEnd={handleEnd}
                onEmit={handleEmit}
            />
        </div>
    );
}