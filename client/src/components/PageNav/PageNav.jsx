import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

import './pageNav.css';
import { lerp } from '../../utils/helpers';

export default function PageNav({ sections }) {
    const [mounted, setMounted] = useState(false);

    const rootRef = useRef(document.getElementById('root'));
    const containerRef = useRef(document.getElementById('container'));

    useEffect(() => {
        rootRef.current = document.getElementById('root');
        containerRef.current = document.getElementById('container');
    }, []);
    useEffect(() => {
        if (!mounted && containerRef.current && rootRef.current) {
            setMounted(true);
        }
    }, [containerRef.current, rootRef.current]);

    function handleNavigate(e) {
        const secId = e.target.getAttribute('data-section');
        const element = document.getElementById(secId);
        const scrollPos = element ? element.offsetTop : 0;
        scrollTo(0, scrollPos);
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
        </>
    );
}