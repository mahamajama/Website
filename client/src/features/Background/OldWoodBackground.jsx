import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function lerp(start, end, speed) {
  return start += (end - start) * speed;
}

class ParallaxLayer {
    constructor(offset, image, repeatX, repeatY) {
        this.offset = offset;
        this.image = image;
        this.imgSize = { x: image.width, y: image.height };
        this.repeat = { x: repeatX, y: repeatY };
    }
}

export default function OldWoodBackground({ imageSrc }) {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    const [mounted, setMounted] = useState(false);

    const canvas = useRef(null);
    const ctx = useRef(null);
    const container = useRef(null);

    const scrollPos = useRef({ x: 0, y: 0 });
    const position = useRef({ x: 0, y: 0 });

    const pattern = useRef(null);
    const imgSize = useRef({ x: 255, y: 255 });
    const repeat = useRef({ x: 25, y: 100 });
    
    useEffect(() => {
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            if (container.current) container.current.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        }
    }, []);
    
    useEffect(() => {
        if (!mounted && canvas.current) {
            container.current = document.getElementById('container');
            container.current.addEventListener('scroll', handleScroll, { passive: true });

            initCanvas();
            setMounted(true);
        }
    }, [canvas.current, image]);

    useEffect(() => {
        const img = new Image();
        img.onload = () => { setImage(img); }
        img.src = imageSrc;
    }, [imageSrc]);

    useEffect(() => {
        if (mounted) {
            initImage();
        }
    }, [image]);

    function handleResize(e) {
        if (canvas.current) {
            canvas.current.width = window.innerWidth;
            canvas.current.height = window.innerHeight;

            ctx.current.fillStyle = pattern.current;

            repeat.current.x = Math.ceil(canvas.current.width / imgSize.current.x) + 1;
            repeat.current.y = 100;
            
            draw();
        }
    }

    function handleScroll(e) {
        const scrollSpeed = 0.6;
        scrollPos.current.x = container.current.scrollLeft * scrollSpeed;
        scrollPos.current.y = container.current.scrollTop * scrollSpeed;
        
        if (pattern.current) pattern.current.setTransform(new DOMMatrix([1,0,0,1, -scrollPos.current.x, -scrollPos.current.y]));

        draw();
    }

    function initCanvas() {
        ctx.current = canvas.current.getContext('2d');
        
        canvas.current.width = window.innerWidth;
        canvas.current.height = window.innerHeight;
        
        position.current.x = 0;
        position.current.y = 0;
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
    }

    function draw() {
        ctx.current.fillRect(
            0, 0, 
            repeat.current.x * imgSize.current.x, 
            repeat.current.y * imgSize.current.y
        );
    }

    return <canvas className="background-canvas" ref={canvas}></canvas>;
}









