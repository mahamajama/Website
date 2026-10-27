import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { createPortal } from 'react-dom';

import { selectMenuIsOpen } from "../../gameSlice";
import { getPositionInWindow } from "../../utils/helpers";

import './scenes.css';

export default function Scene({ children, className, triggerElement, open, onClose }) {
    const [mounted, setMounted] = useState(false);

    const rootRef = useRef(document.getElementById('root'));
    const container = useRef(null);
    const sceneElement = useRef(null);
    const blackout = useRef(null);
    const cover = useRef(null);

    const timeout = useRef(null);

    const menuIsOpen = useSelector(selectMenuIsOpen);

    function openScene() {
        blackout.current.removeEventListener('transitionend', onBlackoutClosed, true);
        if (timeout.current) clearTimeout(timeout.current);
        blackout.current.classList.remove('closed');
        blackout.current.classList.add('open');
        sceneElement.current.classList.remove('closed');
        sceneElement.current.classList.add('open');
        timeout.current = setTimeout(onBlackout, 1000);
    }

    function onBlackout() {
        cover.current.classList.remove('closed');
        cover.current.classList.add('open');
    }

    function closeScene() {
        if (timeout.current) clearTimeout(timeout.current);
        blackout.current.classList.remove('open');
        blackout.current.classList.add('closed');
        cover.current.classList.remove('open');
        cover.current.classList.add('closed');
        sceneElement.current.classList.remove('open');
        sceneElement.current.classList.add('closed');
        blackout.current.addEventListener('transitionend', onBlackoutClosed, true);
    }
    
    function onBlackoutClosed(e) {
        blackout.current?.removeEventListener('transitionend', onBlackoutClosed, true);
        if (onClose) onClose();
    }

    useEffect(() => {
        rootRef.current = document.getElementById('root');
    }, []);

    useEffect(() => {
        if (!mounted && rootRef.current) {
            setMounted(true);
        }
    }, [rootRef.current]);


    useEffect(() => {
        if (triggerElement) {
            getPositionInWindow(triggerElement);
        }
    }, [triggerElement]);

    useEffect(() => {
        //console.log(`Scene is open: ${open}`);
        if (open) openScene();
    }, [open]);

    function handleClickClose() {
        closeScene();
    }

    useEffect(() => {
        if (!container.current) return;
        if (menuIsOpen) {
            container.current?.classList.add('blurred');
        } else {
            container.current?.classList.remove('blurred');
        }
    }, [menuIsOpen]);

    return (
        <>
        {mounted && createPortal(   
            <div className={`scene-container ${className ? className : ''}`} ref={container}>
                <button 
                    className={`scene-close-button ${open ? 'open' : 'closed'}`} 
                    onClick={handleClickClose} 
                    type="button"
                >
                    X
                </button>
                <div className={`blackout`} ref={blackout}>
                    <div className="scene" ref={sceneElement}>
                        <div className={`scene-cover`} ref={cover}></div>
                        <div className="scene-content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        , rootRef.current)}
        </>
    );
}