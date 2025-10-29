import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectModals, selectFocused, setFocused, closeModal } from "./modalSlice";

export default function Modal({ children, id, label, persistent }) {
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);

    const modals = useSelector(selectModals);
    const focusedModal = useSelector(selectFocused);

    const modal = useRef(null);
    const topBar = useRef(null);
    const content = useRef(null);
    const closeButton = useRef(null);
    const offset = useRef([0, 0]);

    function onMouseDown(e) {
        if (closeButton.current.contains(e.target)) return;
        offset.current = [e.offsetX, e.offsetY];
        window.addEventListener('mousemove', dragModal, true);
        dispatch(setFocused(id));
    }

    function onMouseUp(e) {
        window.removeEventListener('mousemove', dragModal, true);
    }

    function dragModal(e) {
        const newX = e.clientX - offset.current[0];
        const newY = e.clientY - offset.current[1];
        modal.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    useEffect(() => {
        if (!mounted && modal.current) setMounted(true);
    }, [modal.current])

    useEffect(() => {
        if (mounted) {
            content.current.addEventListener('animationend', onOpened);
            function onOpened(e) {
                content.current.removeEventListener('animationend', onOpened);
                topBar.current.classList.remove('open');
                content.current.classList.remove('open');
            }
            closeButton.current.enabled = true;
            const xPos = modal.current.offsetLeft;
            const yPos = modal.current.offsetTop;
            modal.current.style.top = 0;
            modal.current.style.left = 0;
            modal.current.style.transform = `translate(calc(${xPos}px - 50%), calc(${yPos}px - 50%))`;
        }
    }, [mounted])

    useEffect(() => {
        if (topBar.current) {
            window.addEventListener('mouseup', onMouseUp, false);
            topBar.current.addEventListener('mousedown', onMouseDown, false);
            return () => {
                window.removeEventListener('mouseup', onMouseUp, false);
                topBar.current?.removeEventListener('mousedown', onMouseDown, false);
            }
        }
    }, [topBar.current])

    useEffect(() => {
        if (modal.current) {
            if (focusedModal === id) {
                modal.current.classList.add('focused');
                modal.current.parentElement.appendChild(modal.current);
            } else {
                modal.current.classList.remove('focused');
            }
        }
    }, [focusedModal])

    function handleClickContainer(e) {
        dispatch(setFocused(id));
    }

    function handleClickClose(e) {
        closeButton.current.enabled = false;
        content.current.classList.add('close');
        topBar.current.classList.add('close');
        content.current.addEventListener('animationend', onModalClosed);
        function onModalClosed(e) {
            content.current.removeEventListener('animationend', onModalClosed);
            if (persistent) {
                modal.current.classList.add('closed');
                modal.current.classList.remove('focused');
            } else {
                dispatch(closeModal(id));
            }
        }
    }

    return (
        <>
        <div className="modal-container" onClick={handleClickContainer} ref={modal}>
            <div className="modal-top-bar open" ref={topBar}>
                {label && <h2 className="modal-label select-disable">{label}</h2>}
                <button className="modal-close-button" onClick={handleClickClose} type="button" ref={closeButton}></button>
            </div>
            <div className="modal-content-container open" ref={content}>
                {children}
            </div>
        </div>
        </>
    );
}