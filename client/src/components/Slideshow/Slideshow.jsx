import { useState, useEffect, useRef } from "react";

import './slideshow.css';

const sampleSlides = [
    {
        title: 'Slide Title',
        content: <img src="images/portfolio/projects/jamashop/jamashop_slide01.gif" />,
        description: 
            `This is a slide description. It isn't displayed by default.

            Primary features:
            - Formats paragraphs
            - Formats unordered lists
            - That's it, really`,
    },
];

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
                                {slide.title && 
                                    <h3>{slide.title}<span className="slide-number">{`${i + 1}/${slides.length}`}</span></h3>
                                }
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