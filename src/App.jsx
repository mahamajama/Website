import { useState } from 'react';
import './App.css';
import PageTitle from './components/PageTitle/PageTitle';
import Portfolio from './features/Portfolio/Portfolio';
import Background from './features/Background/Background';

export default function App() {

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

  function colorRoulette(e) {
    const tics = 16;
    const colors = [
      '#ff0000', '#ff9900', '#ffff00', '#00ff00',
      '#00ffff', '#0000ff', '#ff00ff', '#9900ff',
    ];
    function getRandomColor() {
      const i = Math.floor(Math.random() * colors.length);
      return colors[i];
    }

    let i = 0;
    let delay = 100;
    function spinColor() {
      delay *= 1.1;
      e.target.children[0].children[0].style.color = getRandomColor();
      i++;

      if (i < tics) {
        setTimeout(() => {
          spinColor();
        }, delay);
      }
    }

    spinColor();
  }

  return (
    <>
      <div className="main-content-container">
        <PageTitle 
          title="JOEY ROSE"
          actions={{
            0: colorRoulette,
            1: fallOffscreen,
          }}
        />
        <div className='page-description'>
          <p>Welcome to the personal website of Joey Rose!</p>
          <p>For now, there is nothing here.</p>
        </div>
      </div>
      <Background />
    </>
  )
}
