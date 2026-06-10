import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import './pageNav.css';
import { lerp } from '../../utils/helpers';

export default function PageNav({ sections }) {
    const [mounted, setMounted] = useState(false);

    const rootRef = useRef(document.getElementById('root'));
    const containerRef = useRef(document.getElementById('container'));
    const progressRef = useRef(null);
    const heightRef = useRef(999);

    useEffect(() => {
        rootRef.current = document.getElementById('root');
        containerRef.current = document.getElementById('container');
    }, []);

    useEffect(() => {
        if (!mounted && containerRef.current && rootRef.current && progressRef.current) {
            heightRef.current = containerRef.current.scrollHeight - containerRef.current.offsetHeight;
            const pos = 1 - ((heightRef.current - containerRef.current.scrollTop) / heightRef.current);
            progressRef.current.style.transform = `translateY(-50%) scaleX(${pos})`;
            containerRef.current.addEventListener('scroll', onScroll, { passive: true });
            setMounted(true);
        }
    }, [containerRef.current, rootRef.current, progressRef.current]);

    function handleNavigate(e) {
        const secId = e.target.getAttribute('data-section');
        const element = document.getElementById(secId);
        const scrollPos = element ? element.offsetTop : 0;
        scrollTo(0, scrollPos);
    }

    function onScroll(e) {
        if (!progressRef.current) return;
        const scroll = e.target.scrollTop;
        const pos = 1 - ((heightRef.current - scroll) / heightRef.current);
        progressRef.current.style.transform = `translateY(-50%) scaleX(${pos})`;
    }

    function scrollTo(targetX, targetY) {
        containerRef.current.scroll({
            top: targetY,
            left: targetX, 
            behavior: 'smooth'
        });
    }

    return (
        <>
        <div className="page-nav">
            <div className="page-nav-links">
                {Object.keys(sections).map((secName, i) => {
                    return (
                        <a 
                            onClick={handleNavigate} 
                            data-section={sections[secName]}
                            key={`pageNav_${i}`}
                        >
                            {secName}
                        </a>
                    );
                })}
            </div>
            <div className="page-nav-progress" ref={progressRef}></div>
        </div>
        </>
    );
}