import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './home.css';

import { selectIsPortfolio } from '../../gameSlice';

import HomeTitle from './HomeTitle';
import Portfolio from '../Portfolio/Portfolio';
import Background from '../Background/Background';

export default function Home() {
  const dispatch = useDispatch();
  const isPortfolio = useSelector(selectIsPortfolio);

  return (
    <>
    <div id="home">
        <HomeTitle />
        {isPortfolio && <Portfolio />}
    </div>
    <Background type="mystify" />
    </>
  );
}