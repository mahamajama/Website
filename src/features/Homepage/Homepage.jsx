import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import './Homepage.css';

import { explodeLetter, flipLetters } from "../../features/Homepage/homeSlice";
import { setFlag, selectFlags, allItems } from '../../gameSlice';
import { createModal } from '../../components/Modals/modalSlice';
import PageTitle from "../../components/PageTitle/PageTitle";
import ItemPickup from '../../components/Items/ItemPickup';
import LetterBomb from '../../components/PageTitle/LetterBomb';

import sound from '../../utils/audio';
import { colorRoulette } from '../../utils/effects';
import { getTranslate } from '../../utils/helpers';

import totakasSrc from '/sounds/MP_totakasSong.wav?url';
const totakasSong = new sound(totakasSrc);

export default function Homepage() {
  const dispatch = useDispatch();

  const timRunRef = useRef(null);
  const boxPickupContainer = useRef(null);
  const nutPickupContainer = useRef(null);

  const e1IsOpen = useRef(false);
  const e2IsOpen = useRef(false);

  const s = useRef(null);
  const sIsSticky = useRef(false);
  const sOffset = useRef(null);

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
      'This is a test for the modals.',
      `If you're seeing this, then you passed!`,
      'Congratulations!'
    ];
    dispatch(createModal({
      id: uuidv4(),
      label: 'Modal Test',
      text: modalText,
    }))
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

  const dragS = useCallback((moveEvent) => {
    if (s.current) {
      const newX = moveEvent.clientX - sOffset.current[0];
      const newY = moveEvent.clientY - sOffset.current[1];
      s.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  }, [s, sIsSticky, sOffset])

  function handleClickS(e) {
    if (!s.current) s.current = e.target;
    
    if (sIsSticky.current) {
      sIsSticky.current = false;
      
      s.current.parentElement.style.animationPlayState = 'running';
      s.current.style.transition = null;

      window.removeEventListener('mousemove', dragS, true);
    } else {
      sIsSticky.current = true;

      const translate = getTranslate(s.current);
      let offsetX = e.clientX - s.current.offsetLeft - translate[0];
      let offsetY = e.clientY - s.current.offsetTop - translate[1];

      sOffset.current = [offsetX, offsetY];
      s.current.parentElement.style.animationPlayState = 'paused';
      s.current.style.transition = 'none';

      window.addEventListener('mousemove', dragS, true);
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
    <>
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
    </>
  );
}