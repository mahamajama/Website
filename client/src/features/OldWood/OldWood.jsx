import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import './oldWood.css';
import { openWindow } from '../../components/Windows/windowsSlice';
import Background from '../Background/Background';
import Crow from './Crow';
import WiseOwl from './WiseOwl';
import SchlemosHouse from './SchlemosHouse';

export default function OldWood() {
    const dispatch = useDispatch();
    const [schlemosHouseIsOpen, setSchlemosHouseIsOpen] = useState(false);

    function handleClickDoor() {
        setSchlemosHouseIsOpen(true);
        // dispatch(openWindow({
        //     id: uuidv4(),
        //     label: 'Wooden Door',
        //     text: ['The door is locked tight.'],
        // }));
    }

    function handleCloseSchlemosHouse() {
        setSchlemosHouseIsOpen(false);
    }

    return (
        <>
        <div id="old-wood">
            <div id="tall-tree-container">
                <img
                    id="tall-tree" 
                    className="select-disable" 
                    src="/images/oldwood/tallTree.png" 
                    width="300px" 
                    draggable="false" 
                />
                <img 
                    id="tree-bottom" 
                    className="select-disable" 
                    src="/images/oldwood/tallTree_bottom.png" 
                    width="1000px"  
                    draggable="false" 
                />
                <Crow />
                <WiseOwl />
                <div id="schlemos-house-container">
                    <button type="button" id="tall-tree-door-button" onClick={handleClickDoor}></button>
                    <SchlemosHouse open={schlemosHouseIsOpen} onClose={handleCloseSchlemosHouse} />
                </div>
            </div>
        </div>
        <Background type="oldWood" >
            <div className="old-wood-background-container">
                <img 
                    id="sun" 
                    className="select-disable"
                    src="/images/oldwood/sun.png" 
                    width="490px"
                    draggable="false"
                />
            </div>
        </Background>
        </>
    );
}