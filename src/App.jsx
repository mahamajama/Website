import { useState, useEffect } from 'react';
import './App.css';

import Homepage from './features/Homepage/Homepage';
import Background from './features/Background/Background';

if (mobileCheck()) {
  document.body.classList.add
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

  return (
    <>
      <div className="main-content-container">
        <Homepage />
      </div>
      <Background />
    </>
  )
}
