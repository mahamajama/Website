import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setMenuIsOpen, selectMenuIsOpen } from '../../gameSlice';
import Inventory from './Inventory';
import './Menu.css';

export default function Menu() {
    const dispatch = useDispatch();
    const isOpen = useSelector(selectMenuIsOpen);
    const [selectedItem, setSelectedItem] = useState();

    function toggleOpen() {
        const newOpenState = !isOpen;
        dispatch(setMenuIsOpen(newOpenState));
        if (!newOpenState) setSelectedItem(null);
    }

    function handleItemSelected(item) {
        if (item && item != selectedItem) {
            setSelectedItem(item);
        }
    }

    function handleSubmitCode(e) {
        e.preventDefault();
    }

    return (
        <div id="menu-manager">
            <div className="content-container">
                <button className="hamburger" onClick={toggleOpen} type="button">MENU</button>
            </div>
            <div id="menu-container">
                <div id="selection-info" className={isOpen && selectedItem ? 'open' : ''}>
                    {selectedItem &&
                        <>
                            <div className="selection-image-container">
                                <img src={`/images/items/ornateBox_full.png`} />
                            </div>
                            <div className="selection-details-container">
                                <div className="selection-details">
                                    <h1>{selectedItem.displayName}</h1>
                                    <p>{selectedItem.description}</p>
                                    <form>
                                        <div className="item-details-code-input-container">
                                            <input className="item-details-code-input" type="text" maxLength="1" />
                                            <input className="item-details-code-input" type="text" maxLength="1" />
                                            <input className="item-details-code-input" type="text" maxLength="1" />
                                            <input className="item-details-code-input" type="text" maxLength="1" />
                                            <input className="item-details-code-input" type="text" maxLength="1" />
                                            <input className="item-details-code-input" type="text" maxLength="1" />
                                        </div>
                                        <button className="item-details-submit" type="submit" onClick={handleSubmitCode}>Open the box</button>
                                    </form>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <div id="menu" className={isOpen ? 'open' : ''}>
                    <div className="content-container">
                        <Inventory onItemSelected={handleItemSelected} />
                    </div>
                </div>
            </div>
        </div>
    );
}