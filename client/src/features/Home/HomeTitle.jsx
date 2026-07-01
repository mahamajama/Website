import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { setJColor, selectJColor, explodeO1, explodeO2, selectO1Exploded, selectO2Exploded, flipLetters, selectFlipped, setSPosition, selectSPosition } from "./homeSlice";
import { setFlag, selectFlags, allItems, selectInventory } from '../../gameSlice';
import { openWindow } from '../../components/Windows/windowsSlice';
import PageTitle from "../../components/PageTitle/PageTitle";
import ItemPickup from '../../components/Items/ItemPickup';
import LetterBomb from '../../components/PageTitle/LetterBomb';

import sound from '../Audio/audio.js';
import { blipSound } from '../../utils/effects';
import { getTranslate } from '../../utils/helpers';

import totakasSrc from '/sounds/MP_totakasSong.wav?url';
import PageTitleLetter from '../../components/PageTitle/PageTitleLetter.jsx';
import { Link } from 'react-router';
const totakasSong = new sound(totakasSrc);

export default function HomeTitle() {
    const dispatch = useDispatch();

    const flags = useSelector(selectFlags);
    const inventory = useSelector(selectInventory);

    const jColor = useSelector(selectJColor);
    const o1Exploded = useSelector(selectO1Exploded);
    const o2Exploded = useSelector(selectO2Exploded);
    const lettersAreFlipped = useSelector(selectFlipped);
    const sPosition = useSelector(selectSPosition);

    const jColorTimeout = useRef(null);

    const timRunRef = useRef(null);
    const boxPickupContainer = useRef(null);
    const nutPickupContainer = useRef(null);

    const e1IsOpen = useRef(false);
    const e2IsOpen = useRef(false);

    const s = useRef(null);
    const sIsSticky = useRef(false);
    const sOffset = useRef(null);
    const mousePos = useRef({ x: 0, y: 0 })
    const scrollPos = useRef({
        init: { x: 0, y: 0 },
        delta: { x: 0, y: 0 },
    });

    function colorRoulette(e) {
        const tics = 16;
        let colors = [
            '#ff0000', '#ff9900', '#ffff00', '#00ff00',
            '#00ffff', '#0000ff', '#ff00ff', '#9900ff',
        ];

        let currentColor = '#ffffff';
        function getRandomColor() {
            const i = Math.floor(Math.random() * colors.length);
            const newColor = colors[i];
            colors[i] = currentColor;
            currentColor = newColor;
            return currentColor;
        }

        let i = 0;
        let delay = 100;
        function spinColor() {
            delay *= 1.1;
            const newColor = getRandomColor();
            e.target.children[0].children[0].style.color = getRandomColor();
            i++;

            blipSound.replay();

            if (i < tics) {
                jColorTimeout.current = setTimeout(() => {
                    spinColor();
                }, delay);
            } else {
                dispatch(setJColor(newColor));
            }
        }

        if (jColorTimeout.current) clearTimeout(jColorTimeout.current);
        spinColor();
    }

    function fallOffscreen(e) {
        e.target.classList.add('pointer-disable');
        e.target.parentElement.style.animationPlayState = 'paused';
        e.target.children[0].children[0].style.animation = "letterRotateZ 1s linear infinite";
        e.target.children[0].style.animation = "letterFall 5s linear 1 forwards";
        e.target.children[0].addEventListener('animationend', onAnimationEnd);
        function onAnimationEnd() {
            e.target.children[0].removeEventListener('animationend', onAnimationEnd);
            dispatch(explodeO1());
        }
    }

    function revealBox(e) {
        if (e1IsOpen.current) {
            e.target.style.transform = "translate(0, 0)";
            e1IsOpen.current = false;
        } else {
            e.target.style.transform = "translate(0, -30px)";
            e1IsOpen.current = true;
            if (!flags.includes("found ornate box")) {
                timRunRef.current.classList.add("revealed");
                dispatch(setFlag("found ornate box"));
            }
            if (!inventory.find(item => item.name === 'ornateBox')) {
                boxPickupContainer.current.classList.add("revealed");
            }
        }
    }

    function revealNut(e) {
        if (e2IsOpen.current) {
            e.target.style.transformOrigin = 'bottom right';
            e.target.style.transform = "rotate(0deg)";
            e2IsOpen.current = false;
        } else {
            e.target.style.transformOrigin = 'bottom right';
            e.target.style.transform = "rotate(45deg)";
            e2IsOpen.current = true;
            if (!inventory.find(item => item.name === 'nut')) {
                nutPickupContainer.current.classList.add("revealed");
            }
        }
    }

    function windowTest(e) {
        if (e.target.style.animation) {
            e.target.style.animation = null;
            e.target.offsetHeight;
        }
        e.target.style.animation = "lockOut 0.7s 1";
        const windowText = [
            'This is a test for the draggable windows.',
            `If you're seeing this, then you passed!`,
            'Congratulations!'
        ];
        dispatch(openWindow({
            id: uuidv4(),
            label: 'Window Test',
            text: windowText,
        }));
    }

    function handleExplode(letterIndex) {
        dispatch(explodeO2());
        totakasSong.play();
    }

    function toggleFlipLetters(e) {
        if (e.target.style.animation) {
            e.target.style.animation = null;
            e.target.offsetHeight;
        }
        e.target.style.animation = "lockOut 0.7s 1";
        dispatch(flipLetters());
    }

    const onMoveS = (e) => {
        mousePos.current = { x: e.pageX, y: e.pageY };
        moveS();
    };
    
    const onScrollS = (e) => {
        scrollPos.current.delta.x = scrollPos.current.init.x - e.target.scrollLeft;
        scrollPos.current.delta.y = scrollPos.current.init.y - e.target.scrollTop;
        moveS();
    }

    const moveS = () => {
        const newX = mousePos.current.x - sOffset.current[0] - scrollPos.current.delta.x;
        const newY = mousePos.current.y - sOffset.current[1] - scrollPos.current.delta.y;
        s.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }

    function handleClickS(e) {
        if (!s.current) s.current = e.target;
        
        const container = document.getElementById('container');

        if (sIsSticky.current) {
            sIsSticky.current = false;
            
            s.current.parentElement.style.animationPlayState = 'running';
            s.current.style.transition = null;

            container.removeEventListener('mousemove', onMoveS, true);
            container.removeEventListener('scroll', onScrollS, true);

            const finalX = mousePos.current.x - sOffset.current[0] - scrollPos.current.delta.x;
            const finalY = mousePos.current.y - sOffset.current[1] - scrollPos.current.delta.y;
            dispatch(setSPosition({ x: finalX, y: finalY }));
        } else {
            sIsSticky.current = true;

            const translate = getTranslate(s.current);
            let offsetX = e.pageX - s.current.offsetLeft - translate[0];
            let offsetY = e.pageY - s.current.offsetTop - translate[1];

            sOffset.current = [offsetX, offsetY];
            scrollPos.current = {
                init: { x: container.scrollLeft, y: container.scrollTop },
                delta: { x: 0, y: 0 },
            };

            s.current.parentElement.style.animationPlayState = 'paused';
            s.current.style.transition = 'none';

            container.addEventListener('mousemove', onMoveS, true);
            container.addEventListener('scroll', onScrollS, true);
        }
    }

    return (
        <div className="page-title">
            <div className="page-title-word">
                <PageTitleLetter 
                    letter="J" 
                    index={0} 
                    onClick={colorRoulette} 
                    delay={0}
                    exploded={false}
                    flipped={lettersAreFlipped}
                    color={jColor}
                >
                </PageTitleLetter>
                <PageTitleLetter 
                    letter="O" 
                    index={1} 
                    onClick={fallOffscreen} 
                    delay={0.25}
                    exploded={o1Exploded}
                    flipped={lettersAreFlipped}
                >
                </PageTitleLetter>
                <PageTitleLetter 
                    letter="E" 
                    index={2} 
                    onClick={revealBox} 
                    delay={0.5}
                    exploded={false}
                    flipped={lettersAreFlipped}
                >
                    <div className="letter-children-container" ref={boxPickupContainer}>
                        <img 
                            id="tim-run" 
                            className="select-disable"
                            src="images/home/timRun.gif" 
                            width="22" 
                            height="18" 
                            ref={timRunRef}
                        />
                        <ItemPickup
                            itemData={allItems.ornateBox} 
                            id="ornate-box-pickup"
                        />
                    </div>
                </PageTitleLetter>
                <PageTitleLetter 
                    letter="Y" 
                    index={3} 
                    onClick={windowTest} 
                    delay={0.75}
                    exploded={false}
                    flipped={lettersAreFlipped}
                >
                </PageTitleLetter>
            </div>
            <div className="page-title-word">
                <PageTitleLetter 
                    letter="R" 
                    index={4} 
                    onClick={toggleFlipLetters} 
                    delay={1}
                    exploded={false}
                    flipped={lettersAreFlipped}
                >
                </PageTitleLetter>
                <div className="letter-wrapper">
                    <PageTitleLetter 
                        letter="O" 
                        index={5} 
                        onClick={null} 
                        delay={1.25}
                        exploded={o2Exploded}
                        flipped={lettersAreFlipped}
                    >
                        <LetterBomb 
                            initCount={4}
                            letterIndex={5}
                            onExplode={handleExplode}
                            hasExploded={o2Exploded}
                        />
                    </PageTitleLetter>
                    <div className={`hot-fire-hole ${o2Exploded ? 'visible' : ''}`}>
                        <img className="select-disable" src="/images/home/hotFireHole_front.gif" />
                        <Link to="/hotfire"></Link>
                    </div>
                </div>
                <PageTitleLetter 
                    letter="S" 
                    index={6} 
                    onClick={handleClickS} 
                    delay={1.5}
                    exploded={false}
                    flipped={lettersAreFlipped}
                    position={sPosition}
                >
                </PageTitleLetter>
                <PageTitleLetter 
                    letter="E" 
                    index={7} 
                    onClick={revealNut} 
                    delay={1.75}
                    exploded={false}
                    flipped={lettersAreFlipped}
                >
                    <div className="letter-children-container" ref={nutPickupContainer}>
                        <ItemPickup
                            itemData={allItems.nut} 
                            id="nut-pickup"
                        />
                    </div>
                </PageTitleLetter>
            </div>
            
        </div>
    );
}