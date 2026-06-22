import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setFlag, selectFlags, allItems, selectInventory } from '../../gameSlice';
import { openWindow } from '../../components/Windows/windowsSlice';
import ItemPickup from '../../components/Items/ItemPickup';
import LetterBomb from '../../components/PageTitle/LetterBomb';

import sound from '../Audio/audio.js';
import { blipSound } from '../../utils/effects';
import { getTranslate } from '../../utils/helpers';

import PageTitleLetter from '../../components/PageTitle/PageTitleLetter.jsx';
import { Link } from 'react-router';

export default function HotFireTitle() {
    const dispatch = useDispatch();

    const flags = useSelector(selectFlags);
    const inventory = useSelector(selectInventory);
    const mousePos = useRef({ x: 0, y: 0 })

    return (
        <div className="page-title">
            <div className="page-title-word">
                <PageTitleLetter 
                    letter="F" 
                    index={0} 
                    delay={0}
                >
                </PageTitleLetter>
                <PageTitleLetter 
                    letter="F" 
                    index={1} 
                    delay={0.2}
                >
                </PageTitleLetter>
                <PageTitleLetter 
                    letter="F" 
                    index={2} 
                    delay={0.6}
                >
                </PageTitleLetter>
                <PageTitleLetter 
                    letter="F" 
                    index={3} 
                    delay={0.35}
                >
                </PageTitleLetter>
            </div>
            <div className="page-title-word">
                <PageTitleLetter 
                    letter="F" 
                    index={4} 
                    delay={0.55}
                >
                </PageTitleLetter>
                <div className="letter-wrapper">
                    <PageTitleLetter 
                        letter="F" 
                        index={5} 
                        delay={0}
                        exploded={true}
                    >
                    </PageTitleLetter>
                    <div className={`hot-fire-hole visible`}>
                        <img className="select-disable" src="/images/home/hotFireHole_back.png" />
                        <Link to="/"></Link>
                    </div>
                </div>
                <PageTitleLetter 
                    letter="F" 
                    index={6} 
                    delay={0.3}
                >
                </PageTitleLetter>
                <PageTitleLetter 
                    letter="F" 
                    index={7} 
                    delay={0.8}
                >
                </PageTitleLetter>
            </div>
        </div>
    );
}