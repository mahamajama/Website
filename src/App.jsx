import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';

import { selectMenuIsOpen } from './gameSlice';
import Homepage from './features/Homepage/Homepage';
import Background from './features/Background/Background';
import ModalManager from './components/Modals/ModalManager';
import Menu from './features/Menu/Menu';

if (mobileCheck()) {
  document.body.classList.add("mobile")
}

async function handleRequest(request) {
  let resp = await fetch(request.url, request);

  let newResp = new Response(resp.body, {
    headers: resp.headers,
    status: resp.status
  })

  if (request.url.endsWith(".wav")) {
    newResp.headers.set("Content-Type", "audio/vnd.wav");
  }

  console.log(newResp);

  return newResp;
}
addEventListener("fetch", event => event.respondWith(handleRequest(event.request)));

export default function App() {
  const menuIsOpen = useSelector(selectMenuIsOpen);
  return (
    <>
      <Menu />
      <div id="container" className={menuIsOpen ? 'blurred' : ''}>
        <div className="main-content-container content-container">
          <Homepage />
        </div>
        <ModalManager />
        <Background />
      </div>
    </>
  )
}
