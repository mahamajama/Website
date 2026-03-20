import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { explodeLetter, flipLetters } from "./homeSlice";
import { setFlag, selectFlags, allItems } from '../../gameSlice';
import { openWindow } from '../../components/Windows/windowsSlice';
import PageTitle from "../../components/PageTitle/PageTitle";
import ItemPickup from '../../components/Items/ItemPickup';
import LetterBomb from '../../components/PageTitle/LetterBomb';

import sound from '../Audio/audio.js';
import { colorRoulette } from '../../utils/effects';
import { getTranslate } from '../../utils/helpers';

import totakasSrc from '/sounds/MP_totakasSong.wav?url';
const totakasSong = new sound(totakasSrc);

export default function HomepageTitle() {
  const dispatch = useDispatch();

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

  function fallOffscreen(e) {
    e.target.classList.add('pointer-disable');
    e.target.parentElement.style.animationPlayState = 'paused';
    e.target.children[0].children[0].style.animation = "letterRotateZ 1s linear infinite";
    e.target.children[0].style.animation = "letterFall 5s linear 1 forwards";
    e.target.children[0].addEventListener('animationend', onAnimationEnd);
    function onAnimationEnd() {
        e.target.children[0].removeEventListener('animationend', onAnimationEnd);
        e.target.children[0].style.display = 'none';
    }
  }

  function revealBox(e) {
    if (e1IsOpen.current) {
      e.target.style.transform = "translate(0, 0)";
      e1IsOpen.current = false;
    } else {
      e.target.style.transform = "translate(0, -30px)";
      e1IsOpen.current = true;
      timRunRef.current.classList.add("revealed");
      boxPickupContainer.current.classList.add("revealed");
      dispatch(setFlag("found ornate box"));
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
      nutPickupContainer.current.classList.add("revealed");
    }
  }

  function modalTest(e) {
    if (e.target.style.animation) {
      e.target.style.animation = null;
      e.target.offsetHeight;
    }
    e.target.style.animation = "lockOut 0.7s 1";
    const modalText = [
      'This is a test for the draggable windows.',
      `If you're seeing this, then you passed!`,
      'Congratulations!'
    ];
    dispatch(openWindow({
      id: uuidv4(),
      label: 'Window Test',
      text: modalText,
    }));
  }

  function handleExplode(letterIndex) {
    dispatch(explodeLetter(letterIndex));
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

  const letterBomb = (
    <LetterBomb 
      initCount={4}
      letterIndex={5}
      onExplode={handleExplode}
    />
  );

  const timRun = (
    <>
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
    </>
  );

  const nutPickup = (
    <div className="letter-children-container" ref={nutPickupContainer}>
      <ItemPickup
        itemData={allItems.nut} 
        id="nut-pickup"
      />
    </div>
  );

  return (
    <PageTitle 
      title="JOEY ROSE"
      actions={{
        0: colorRoulette,
        1: fallOffscreen,
        2: revealBox,
        3: modalTest,
        4: toggleFlipLetters,
        6: handleClickS,
        7: revealNut,
      }}
      children={{
        2: timRun,
        5: letterBomb,
        7: nutPickup,
      }}
    />
  );
}