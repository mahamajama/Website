import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { explodeLetter, flipLetters } from "../../features/Homepage/homeSlice";
import PageTitle from "../../components/PageTitle/PageTitle";
import LetterBomb from '../../components/PageTitle/LetterBomb';

import sound from '../../utils/audio';
import { colorRoulette } from '../../utils/effects';

const totakasSong = new sound("sounds/MP_totakassong.wav");

export default function Homepage() {
  const dispatch = useDispatch();

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

  const letterBomb = (
    <LetterBomb 
      initCount={4}
      letterIndex={5}
      onExplode={handleExplode}
    />
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
        4: toggleFlipLetters,
      }}
      children={{
        5: letterBomb,
      }}
    />
    </>
  );
}