import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';

import { selectWindows, selectFocused, setFocused, closeWindow } from "./windowsSlice";
import Dialogue from "../Dialogue/Dialogue";

export default function Window({ id, focused, label, text, script, persistent, closed, onClose }) {
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);

    const windowRef = useRef(null);
    const topBar = useRef(null);
    const content = useRef(null);
    const closeButton = useRef(null);
    const offset = useRef([0, 0]);

    function onMouseDown(e) {
        if (closeButton.current.contains(e.target)) return;
        offset.current = [e.offsetX, e.offsetY];
        window.addEventListener('mousemove', dragWindow, true);
        dispatch(setFocused(id));
    }

    function onMouseUp(e) {
        window.removeEventListener('mousemove', dragWindow, true);
    }

    function dragWindow(e) {
        const newX = e.clientX - offset.current[0];
        const newY = e.clientY - offset.current[1];
        windowRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    function focusWindow() {
        windowRef.current.classList.add('focused');
        windowRef.current.parentElement.appendChild(windowRef.current);

        if (persistent) {
            content.current.classList.remove('close');
            topBar.current.classList.remove('close');
            windowRef.current.classList.remove('closed');
            content.current.classList.add('open');
            topBar.current.classList.add('open');
            windowRef.current.classList.add('open');
        }
    }

    function close() {
        closeButton.current.enabled = false;
        content.current.classList.add('close');
        topBar.current.classList.add('close');
        content.current.addEventListener('animationend', onWindowClosed, true);
    }

    function onWindowClosed(e) {
        if (e.animationName === `closeWindow`) {
            content.current.removeEventListener('animationend', onWindowClosed, true);
            if (onClose) onClose();
            if (persistent) {
                windowRef.current.classList.add('closed');
                windowRef.current.classList.remove('focused');
                dispatch(setFocused(null));
            }
            dispatch(closeWindow(id));
        }
    }

    useEffect(() => {
        if (!mounted && windowRef.current) setMounted(true);
    }, [windowRef.current]);

    useEffect(() => {
        if (mounted) {
            content.current.addEventListener('animationend', onOpened);
            function onOpened(e) {
                content.current.removeEventListener('animationend', onOpened);
                topBar.current.classList.remove('open');
                content.current.classList.remove('open');
            }
            closeButton.current.enabled = true;
            const xPos = windowRef.current.offsetLeft;
            const yPos = windowRef.current.offsetTop;
            windowRef.current.style.top = 0;
            windowRef.current.style.left = 0;
            windowRef.current.style.transform = `translate(calc(${xPos}px - 50%), calc(${yPos}px - 50%))`;
        }
    }, [mounted]);

    useEffect(() => {
        if (topBar.current) {
            window.addEventListener('mouseup', onMouseUp, false);
            topBar.current.addEventListener('mousedown', onMouseDown, false);
            return () => {
                window.removeEventListener('mouseup', onMouseUp, false);
                topBar.current?.removeEventListener('mousedown', onMouseDown, false);
            }
        }
    }, [topBar.current]);

    useEffect(() => {
        if (windowRef.current) {
            if (focused) {
                focusWindow();
            } else {
                windowRef.current.classList.remove('focused');
            }
        }
    }, [focused]);

    useEffect(() => {
        if (closed) close();
        else focusWindow();
    }, [closed])

    function handleClickContainer(e) {
        dispatch(setFocused(id));
    }

    function handleClickClose(e) {
        close();
    }

    return (
        <>
        <div className="window" onClick={handleClickContainer} ref={windowRef}>
            <div className="window-top-bar open" ref={topBar}>
                {label && <h2 className="window-label select-disable">{label}</h2>}
                <button className="window-close-button" onClick={handleClickClose} type="button" ref={closeButton}></button>
            </div>
            <div className="window-content open" ref={content}>
                {text && text.map(line => <p key={uuidv4()}>{line}</p>)}
                {script && <Dialogue script={script} open={!closed} onEnd={close} />}
            </div>
        </div>
        </>
    );
}