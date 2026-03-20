import { useRef, useState, useEffect } from 'react';

import './dropdown.css';
import { v4 as uuidv4 } from 'uuid';
import { expandSection, collapseSection } from '../../utils/effects';
import { isEmpty } from '../../utils/helpers';

export default function Dropdown({ onOptionSelected, options, selection }) {
    const [currentSelection, setCurrentSelection] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [optionsToRender, setOptionsToRender] = useState([]);

    const container = useRef(null);
    const dropdown = useRef(null);

    function getOptionsToRender() {
        let arr = [];
        const keys = Object.keys(options);
        for (let i = 0; i < keys.length; i++) {
            const label = keys[i];
            const value = options[label];
            arr.push(
                <li 
                    className={selection === label ? 'selection' : ''}
                    data-value={value} 
                    onClick={handleClickOption} 
                    key={uuidv4()}
                >
                    {label}
                </li>
            );
            if (selection === '' && i === 0) {
                setCurrentSelection(label);
            }
        }
        return arr;
    }

    useEffect(() => {
        if (options) {
            setOptionsToRender(getOptionsToRender());
            if (!selection) {
                setCurrentSelection(Object.keys(options)[0]);
            }
        }
    }, [options]);

    useEffect(() => {
        if (isOpen) {
            dropdown.current.classList.remove('hidden');
            expandSection(dropdown.current);
            window.addEventListener("click", handleOutsideClick);
        } else {
            collapseSection(dropdown.current, (element) => {
                element.classList.add('hidden');
            });
        }
    }, [isOpen]);

    useEffect(() => {
        if (selection && !isEmpty(options)) {
            if (selection === 'default') {
                setCurrentSelection(Object.keys(options)[0]);
            } else {
                setCurrentSelection(selection);
            }
        }
    }, [selection]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOption = (e) => {
        setCurrentSelection(e.target.textContent);
        onOptionSelected(e);
        setIsOpen(false);
    }

    const handleOutsideClick = (e) => {
        if (container.current && isOpen) {
            const isOutsideClick = !container.current.contains(e.target);
            if (isOutsideClick) {
                setIsOpen(false);
                window.removeEventListener("click", handleOutsideClick);
            }
        }
    }

    return (
        <>
        <div className="custom-select" ref={container}>
            <button className='dropdown-button' type="button" onClick={toggleDropdown}>{currentSelection}</button>
            <menu className="select-dropdown hidden" ref={dropdown}>
                {optionsToRender}
            </menu>
        </div>
        </>
    );
}