import { useSelector } from "react-redux";
import { selectWindows, openWindow } from "./windowsSlice";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

import './windows.css';
import Window from "./Window";

export default function WindowManager() {
    const windows = useSelector(selectWindows);

    useEffect(() => {
        //console.log(windows);
    }, [windows])

    return (
        <div className="window-manager">
            {windows.map(window => {
                return (
                    <Window
                        id={window.id}
                        label={window.label}
                        text={window.text}
                        children={window.children}
                        persistent={window.persistent}
                        key={window.id}
                    />
                )
            })}
        </div>
    );
}