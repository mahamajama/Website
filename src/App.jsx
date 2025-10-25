import { useState, useEffect } from 'react';
import './App.css';

import Homepage from './features/Homepage/Homepage';
import Background from './features/Background/Background';

export default function App() {

  return (
    <>
      <div className="main-content-container">
        <Homepage />
      </div>
      <Background />
    </>
  )
}
