import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router';

import { setMenuIsOpen, selectMenuIsOpen, selectNotification, setNotification } from '../../gameSlice';
import Inventory from './Inventory';
import './menu.css';
import ItemDetails from './ItemDetails';
import VolumeController from '../../components/VolumeController/VolumeController';
import MenuNotification from './MenuNotification';

export default function Menu() {
    const dispatch = useDispatch();
    let location = useLocation();

    const [selectedItem, setSelectedItem] = useState();

    const isOpen = useSelector(selectMenuIsOpen);
    const notification = useSelector(selectNotification);

    const prevLocation = useRef(location.pathname);

    useEffect(() => {
        if (!isOpen) setSelectedItem(null);
    }, [isOpen]);

    useEffect(() => {
        if (location.pathname !== prevLocation.current) {
            dispatch(setMenuIsOpen(false));
        }
        prevLocation.current = location.pathname;
    }, [location]);

    function toggleOpen() {
        dispatch(setMenuIsOpen(!isOpen));
    }

    function handleItemSelected(item) {
        if (item && item != selectedItem) {
            setSelectedItem(item);
        }
    }

    return (
        <div id="menu-manager">
            <div className="menu-toolbar">
                <VolumeController />
                <button className="hamburger" onClick={toggleOpen} type="button"></button>
                <MenuNotification message={notification} />
            </div>
            <div id="menu-container">
                <div id="selection-info" className={isOpen && selectedItem ? 'open' : ''}>
                    <ItemDetails item={selectedItem} />
                </div>
                <div id="menu" className={isOpen ? 'open' : ''}>
                    <div className="menu-content-container content-container">
                        <nav className="main-nav">
                            <NavLink to="/" className="nav-link">HOME</NavLink>
                            <NavLink to="/coolbox" className="nav-link">COOLBOX</NavLink>
                            <NavLink to="/ludozone" className="nav-link">LUDOZONE</NavLink>
                            <NavLink to="/shader" className="nav-link">OLDWOOD</NavLink>
                        </nav>
                        <Inventory onItemSelected={handleItemSelected} />
                    </div>
                </div>
            </div>
        </div>
    );
}