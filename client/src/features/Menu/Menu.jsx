import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router';

import { setMenuIsOpen, selectMenuIsOpen, selectNotification, setNotification, selectIsDebugMode, selectInventory } from '../../gameSlice';
import Inventory from './Inventory';
import './menu.css';
import ItemDetails from './ItemDetails';
import VolumeController from '../../components/VolumeController/VolumeController';
import MenuNotification from './MenuNotification';

const sampleItemSlides = [
    {
        title: 'Slide Title',
        content: <img src="images/portfolio/projects/jamashop/jamashop_slide01.gif" />,
        description: 
            `This is a slide description. It isn't displayed by default.

            Primary features:
            - Formats paragraphs
            - Formats unordered lists
            - That's it, really`,
    },
    {
        title: 'Slide Title',
        content: <img src="images/portfolio/projects/jamashop/jamashop_slide01.gif" />,
        description: 
            `This is a slide description. It isn't displayed by default.

            Primary features:
            - Formats paragraphs
            - Formats unordered lists
            - That's it, really`,
    },
    {
        title: 'Slide Title',
        content: <img src="images/portfolio/projects/jamashop/jamashop_slide01.gif" />,
        description: 
            `This is a slide description. It isn't displayed by default.

            Primary features:
            - Formats paragraphs
            - Formats unordered lists
            - That's it, really`,
    },
];

export default function Menu() {
    const dispatch = useDispatch();
    let location = useLocation();

    const [selectedItem, setSelectedItem] = useState(null);
    const [itemSlides, setItemSlides] = useState([]);

    const isOpen = useSelector(selectMenuIsOpen);
    const inventory = useSelector(selectInventory);
    const notification = useSelector(selectNotification);
    const isDebugMode = useSelector(selectIsDebugMode);

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

    useEffect(() => {
        if (selectedItem) setSelectedItem(new Number(selectedItem));
    }, [inventory]);

    function toggleOpen() {
        dispatch(setMenuIsOpen(!isOpen));
    }

    function handleItemSelected(item, i) {
        if (item && i !== selectedItem) {
            setSelectedItem(i);
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
                <ItemDetails items={inventory} selected={selectedItem} open={isOpen} />
                <div id="menu" className={isOpen ? 'open' : ''}>
                    <div className="menu-content-container content-container">
                        <nav className="main-nav">
                            {isDebugMode && 
                            <>
                                <NavLink to="/" className="nav-link">HOME</NavLink>
                                <NavLink to="/ludozone" className="nav-link">LUDOZONE</NavLink>
                                <NavLink to="/coolbox" className="nav-link">COOLBOX</NavLink>
                                <NavLink to="/shader" className="nav-link">OLDWOOD</NavLink>
                            </>
                            }
                        </nav>
                        <Inventory items={inventory} onItemSelected={handleItemSelected} selected={selectedItem} />
                    </div>
                </div>
            </div>
        </div>
    );
}