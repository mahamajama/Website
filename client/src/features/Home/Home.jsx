import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './home.css';

import HomeTitle from './HomeTitle';
import Portfolio from '../Portfolio/Portfolio';

export default function Home() {
  const dispatch = useDispatch();

  return (
    <>
    <HomeTitle />
    <Portfolio />
    </>
  );
}