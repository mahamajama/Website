import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { setFlag, selectFlags, allItems } from '../../gameSlice';
import { openWindow } from '../../components/Windows/windowsSlice';
import PageTitle from "../../components/PageTitle/PageTitle";
import ItemPickup from '../../components/Items/ItemPickup';
import LetterBomb from '../../components/PageTitle/LetterBomb';

import { colorRoulette } from '../../utils/effects';

export default function LudozoneTitle() {
  const dispatch = useDispatch();

  return (
    <PageTitle 
      title="LUDOZONE"
      actions={{
        5: colorRoulette,
      }}
      children={{}}
    />
  );
}