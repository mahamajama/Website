import { useState, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import { useSelector } from "react-redux";

import './frame.css';
import { selectMenuIsOpen } from "../../gameSlice";
import { ignoreTransition } from "../../utils/effects";

export default function Frame({ className, children }) {
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const menuIsOpen = useSelector(selectMenuIsOpen);

    const rootRef = useRef(document.getElementById('root'));
    const frameRef = useRef(null);
    const buttonRef = useRef(null);
    const borderRef = useRef(null);
    const contentRef = useRef(null);

    const borderTimeouts = useRef([]);

    useEffect(() => {
        rootRef.current = document.getElementById('root');
    }, []);

    useEffect(() => {
        if (!mounted && rootRef.current) {
            setMounted(true);
        }
    }, [rootRef.current]);

    useEffect(() => {
        if (!mounted) return;

        if (menuIsOpen) {
            frameRef.current.classList.add('blurred');
        } else {
            frameRef.current.classList.remove('blurred');
        }
    }, [menuIsOpen]);

    useEffect(() => {
        if (!mounted) return;

        if (isOpen) {
            open();
        } else {
            close();
        }
    }, [isOpen]);

    function open() {
        reset();
        
        const rect = buttonRef.current.getBoundingClientRect();
        setToRect(rect, frameRef.current);
        
        frameRef.current.classList.add('open');

        const borders = borderRef.current.children;
        const delay = 100;
        for (let i = 0; i < borders.length; i++) {
            setToRect(rect, borders[i]);
            clearTimeout(borderTimeouts.current[i]);
            borderTimeouts.current[i] = setTimeout(() => {
                borders[i].classList.add('open');
            }, i * delay);
        }

        contentRef.current.classList.add('open');
    }

    function close() {
        resetElementSize(frameRef.current);
        frameRef.current.classList.remove('open');
        frameRef.current.classList.add('close');

        contentRef.current.classList.remove('open');
        contentRef.current.classList.add('close');

        frameRef.current.addEventListener('animationend', onClosed);
    }

    function onClosed(e) {
        if (e.animationName === 'closeFrame') {
            reset();
        }
    }

    function reset() {
        frameRef.current.removeEventListener('animationend', onClosed);

        frameRef.current.classList.remove('close');
        
        const borders = borderRef.current.children;
        for (let i = 0; i < borders.length; i++) {
            borders[i].classList.remove('open');
        }

        contentRef.current.classList.remove('close');
    }

    function setToRect(rect, element) {
        const width = rect.right - rect.left;
        const height = rect.bottom - rect.top;
        
        element.style.top = `${rect.top}px`;
        element.style.left = `${rect.left}px`;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
    }

    function resetElementSize(element) {
        element.style.top = '0px';
        element.style.left = '0px';
        element.style.width = `100%`;
        element.style.height = '100%';
    }

    function toggleIsOpen() {
        setIsOpen(!isOpen);
    }

    function handleClickButton() {
        setIsOpen(true);
    }

    function handleClickClose() {
        setIsOpen(false);
    }

    function handleClickBackground() {
        setIsOpen(false);
    }

    return (
        <div className={`frame-container ${className ? className : ''}`}>
            <div className="frame-button" onClick={handleClickButton} ref={buttonRef}>
                <div className="frame-button-border"></div>
                <div className="frame-button-border-shadow"></div>
            </div>
            {mounted && createPortal(
                <div className="frame" ref={frameRef}>
                    <div className="frame-content-wrapper" ref={contentRef}>
                        <button className="frame-close-button" onClick={handleClickClose} type="button">X</button>
                        <div className="frame-content">
                            {isOpen && children}
                        </div>
                        <div className="frame-content-background"></div>
                    </div>
                    <div className="frame-background" onClick={handleClickBackground} ref={borderRef}>
                        <div className="frame-border"></div>
                        <div className="frame-border"></div>
                        <div className="frame-border"></div>
                        <div className="frame-border"></div>
                    </div>
                </div>
            , rootRef.current)}
        </div>
    );
}