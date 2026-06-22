import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router';
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
    const location = useLocation();

    const [mounted, setMounted] = useState(false);

    const menuIsOpen = useSelector(selectMenuIsOpen);

    const containerRef = useRef(null);
    const prevLocationRef = useRef(location.pathname);

    useEffect(() => {
        if (!mounted && containerRef.current) {
            setMounted(true);
        }
    }, [containerRef.current]);

    useEffect(() => {
        const path = location.pathname;
        if (mounted && path !== prevLocationRef.current) {
            containerRef.current.scroll({
                top: 0,
                left: 0, 
                behavior: 'smooth'
            });
        }
        prevLocationRef.current = path;
    }, [location]);

    return (
        <>
        <Menu />
        <main id="container" className={menuIsOpen ? 'blurred' : ''} ref={containerRef}>
            <Outlet />
        </main>
        <WindowManager />
        </>
    )
}
