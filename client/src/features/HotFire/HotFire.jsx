import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import './hotFire.css';

import { selectEquipped } from '../../gameSlice';
import Background from '../Background/Background';
import HotFireTitle from "./HotFireTitle";

export default function HotFire() {
    const equipped = useSelector(selectEquipped);

    useEffect(() => {
        
    }, [equipped]);

    return (
        <>
        <div id="hot-fire">
            <HotFireTitle />
        </div>
        <Background type="hotFire" />
        </>
    );
}