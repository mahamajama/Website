import { useState, useEffect, useRef } from "react";

import './slideshow.css';

export default function Slideshow({ slides, onChange }) {
    const [position, setPosition] = useState(0);

    const width = useRef(340);
    const slidesRef = useRef(null);
    
    useEffect(() => {
        if (slidesRef.current) {
            width.current = slidesRef.current.offsetWidth;
        }
    }, [slidesRef.current]);
    
    useEffect(() => {
        moveSlides();
        if (onChange) onChange(position);
    }, [position]);

    function moveSlides() {
        slidesRef.current.style.transform = `translateX(${position * -100}%)`;
    }

    function handleClickPrevSlide() {
        const min = 0;
        setPosition(Math.max(position - 1, min));
    }

    function handleClickNextSlide() {
        const max = slides.length - 1;
        setPosition(Math.min(position + 1, max));
    }

    return (
        <div className="slideshow">
            <div className="slides-container">
                <div className="slides" ref={slidesRef}>
                    {slides && slides.map((slide, i) => {
                        return (
                            <div className={`slide slide-position-${i - position}`} key={`slide_${i}_${slide.title}`}>
                                {slide.title && <h3>{slide.title}</h3>}
                                <div className="slide-content">
                                    {slide.content}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="slide-nav">
                    <button 
                        className="prev-slide-button" 
                        onClick={handleClickPrevSlide} 
                        disabled={position <= 0}
                        type="button"
                    >
                        {`<-`}
                    </button>
                    <button 
                        className="next-slide-button" 
                        onClick={handleClickNextSlide} 
                        disabled={position >= slides.length - 1}
                        type="button"
                    >
                        {`->`}
                    </button>
                </div>
            </div>
        </div>
    );
}