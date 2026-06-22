import { useState, useEffect, useRef } from "react";

export default function ScrollingBackground({ imageSrc, xSpeed, ySpeed }) {
    const [mounted, setMounted] = useState(false);
    const [image, setImage] = useState(null);
    const [initiated, setInitiated] = useState(false);

    const canvas = useRef(null);
    const ctx = useRef(null);

    const lastFrame = useRef(null);
    const position = useRef({ x: 0, y: 0 });

    const pattern = useRef(null);
    const imgSize = useRef({ x: 255, y: 255 });
    const repeat = useRef({ x: 25, y: 100 });

    useEffect(() => {
        if (!mounted && canvas.current) {
            setMounted(true);

            const fireBG = new Image();
            fireBG.src = imageSrc;
            fireBG.onload = () => {
                setImage(fireBG);
            }
        }
    }, [canvas.current]);

    useEffect(() => {
        if (image) {
            initCanvas();
        }
    }, [image]);

    function initCanvas() {
        ctx.current = canvas.current.getContext('2d');
        
        canvas.current.width = window.innerWidth;
        canvas.current.height = window.innerHeight;

        position.current.x = 0;
        position.current.y = 0;

        if (image) initImage();
    }

    function initImage() {
        imgSize.current.x = image.width;
        imgSize.current.y = image.height;

        repeat.current.x = Math.ceil(canvas.current.width / imgSize.current.x) + 1;
        repeat.current.y = 100;

        pattern.current = ctx.current.createPattern(image, "repeat");
        
        pattern.current.setTransform(new DOMMatrix([1,0,0,1, position.current.x, position.current.y]));
        ctx.current.fillStyle = pattern.current;

        draw();

        if (lastFrame.current) cancelAnimationFrame(lastFrame.current);
        lastFrame.current = requestAnimationFrame((t) => scroll(t));

        setInitiated(true);
    }

    function scroll(t) {
        if (pattern.current) {
            position.current.x += xSpeed;
            position.current.y += ySpeed;

            pattern.current.setTransform(new DOMMatrix([1,0,0,1, position.current.x, position.current.y]));

            draw();
        }
        
        lastFrame.current = requestAnimationFrame((t) => scroll(t));
    }

    function draw() {
        ctx.current.fillRect(
            0, 0, 
            repeat.current.x * imgSize.current.x, 
            repeat.current.y * imgSize.current.y
        );
    }

    return (
        <>
        <canvas className={`background-canvas ${initiated ? '' : 'hidden'}`} ref={canvas}></canvas>
        </>
    );
}
