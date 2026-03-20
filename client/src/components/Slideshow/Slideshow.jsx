import { useState, useEffect, useRef } from "react";

import './slideshow.css';

export default function Slideshow({ slides }) {
    const width = useRef(340);
    const position = useRef(0);
    const slidesRef = useRef(null);

    useEffect(() => {
        if (slidesRef.current) {
            width.current = slidesRef.current.offsetWidth;
        }
    }, [slidesRef.current])

    function moveSlides() {
        slidesRef.current.style.transform = `translateX(${position.current * -100}%)`;
    }

    function handleClickPrevSlide() {
        const min = 0;
        position.current = Math.max(position.current - 1, min);
        moveSlides();
    }

    function handleClickNextSlide() {
        const max = slides.length - 1;
        position.current = Math.min(position.current + 1, max);
        moveSlides();
    }

    return (
        <div className="slideshow">
            <div className="slides-container">
                <div className="slides" ref={slidesRef}>
                    {slides && slides.map((slide, i) => {
                        return (
                            <div className="slide" key={`slide_${i}_${slide.title}`}>
                                {slide.title && <h4>{slide.title}</h4>}
                                <div className="slide-content">
                                    {slide.content}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="slide-nav">
                    <button className="prev-slide-button" onClick={handleClickPrevSlide} type="button">
                        {`<-`}
                    </button>
                    <button className="next-slide-button" onClick={handleClickNextSlide} type="button">
                        {`->`}
                    </button>
                </div>
            </div>
        </div>
    );
}