import { useSelector } from "react-redux";
import { selectWindows, selectFocused } from "./windowsSlice";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import './windows.css';
import Window from "./Window";

export default function WindowManager() {
    const windows = useSelector(selectWindows);
    const focused = useSelector(selectFocused);

    useEffect(() => {
        //console.log(windows);
    }, [focused]);

    return (
        <div className="window-manager">
            {windows.map(window => {
                const isFocused = focused === window.id;
                return (
                    <Window
                        id={window.id}
                        label={window.label}
                        focused={isFocused}
                        text={window.text}
                        script={window.script}
                        persistent={window.persistent}
                        closed={window.closed}
                        onClose={window.onClose}
                        key={window.id}
                    />
                )
            })}
        </div>
    );
}