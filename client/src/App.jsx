import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import './App.css';

import { selectMenuIsOpen } from './gameSlice';
import Background from './features/Background/Background';
import WindowManager from './components/Windows/WindowManager';
import Menu from './features/Menu/Menu';

if (mobileCheck()) {
    document.body.classList.add("mobile");
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
        <main id="container" className={menuIsOpen ? 'blurred' : ''}>
            <Outlet />
        </main>
        <Background />
        <WindowManager />
        </>
    )
}
