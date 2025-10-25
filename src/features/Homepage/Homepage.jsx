import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { explodeLetter, lettersExploded } from "../../features/Homepage/homeSlice";
import PageTitle from "../../components/PageTitle/PageTitle";
import LetterBomb from '../../components/PageTitle/LetterBomb';

import sound from '../../utils/audio';
import { colorRoulette } from '../../utils/effects';

const totakasSong = new sound("sounds/MP_totakassong.wav");

export default function Homepage() {
  const dispatch = useDispatch();
  //const exploded = useSelector(lettersExploded);

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

  return (
    <>
    <PageTitle 
      title="JOEY ROSE"
      actions={{
        0: colorRoulette,
        1: fallOffscreen,
      }}
      children={{
        5: letterBomb,
      }}
    />
    <div className='page-description'>
      <p>Welcome to the personal website of Joey Rose!</p>
      <p>For now, there is nothing here.</p>
    </div>
    </>
  );
}