import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Homepage.css';

import { explodeLetter, flipLetters } from "../../features/Homepage/homeSlice";
import { setFlag, selectFlags } from '../../gameSlice';
import PageTitle from "../../components/PageTitle/PageTitle";
import ItemPickup from '../../components/Items/ItemPickup';
import LetterBomb from '../../components/PageTitle/LetterBomb';

import sound from '../../utils/audio';
import { colorRoulette } from '../../utils/effects';

import totakasSrc from '/sounds/MP_totakasSong.wav?url';
const totakasSong = new sound(totakasSrc);

export default function Homepage() {
  const dispatch = useDispatch();

  const timRunRef = useRef(null);
  const boxPickupContainer = useRef(null);
  const nutPickupContainer = useRef(null);

  const E1IsOpen = useRef(false);
  const E2IsOpen = useRef(false);

  function fallOffscreen(e) {
    e.target.classList.add('pointer-disable');
    e.target.style.animationPlayState = 'paused';
    e.target.children[0].children[0].style.animation = "letterRotateZ 1s linear infinite";
    e.target.children[0].style.animation = "letterFall 5s linear 1 forwards";
    e.target.children[0].addEventListener('animationend', onAnimationEnd);
    function onAnimationEnd() {
        e.target.children[0].removeEventListener('animationend', onAnimationEnd);
        e.target.children[0].style.display = 'none';
    }
  }

  function revealBox(e) {
    if (E1IsOpen.current) {
      e.target.style.transform = "translate(0, 0)";
      E1IsOpen.current = false;
    } else {
      e.target.style.transform = "translate(0, -30px)";
      E1IsOpen.current = true;
      timRunRef.current.classList.add("revealed");
      boxPickupContainer.current.classList.add("revealed");
      dispatch(setFlag("found ornate box"));
    }
  }

  function revealNut(e) {
    if (E2IsOpen.current) {
      e.target.style.transformOrigin = 'bottom right';
      e.target.style.transform = "rotate(0deg)";
      E2IsOpen.current = false;
    } else {
      e.target.style.transformOrigin = 'bottom right';
      e.target.style.transform = "rotate(45deg)";
      E2IsOpen.current = true;
      nutPickupContainer.current.classList.add("revealed");
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
          name="ornate box"
          imageSrc="images/items/ornateBox.png" 
          id="ornate-box-pickup"
        />
      </div>
    </>
  );

  const nutPickup = (
    <div className="letter-children-container" ref={nutPickupContainer}>
      <ItemPickup
        name="nut"
        imageSrc="images/items/nut.png"
        id="nut-pickup"
      />
    </div>
  );

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

  return (
    <>
    <PageTitle 
      title="JOEY ROSE"
      actions={{
        0: colorRoulette,
        1: fallOffscreen,
        2: revealBox,
        4: toggleFlipLetters,
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