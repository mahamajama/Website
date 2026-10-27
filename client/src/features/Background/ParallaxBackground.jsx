import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function lerp(start, end, speed) {
  return start += (end - start) * speed;
}

const oldWoodLayers = [
    {
        src: '/images/oldwood/forestBG_mtHorizon.png',
        speed: 0.01,
        top: 140,
        scale: 2,
    },
    {
        src: '/images/oldwood/forestBG_ocean.png',
        speed: 0.01,
        top: 360,
        scale: 2,
        repeat: 'repeat-x',
    },
    {
        src: '/images/oldwood/forestBG_treeline.png',
        speed: 0.1,
        top: 650,
        scale: 2,
        repeat: 'repeat-x',
    },
    {
        src: '/images/oldwood/forestBG_treeline.png',
        speed: 0.14,
        top: 760,
        scale: 2,
        repeat: 'repeat-x',
        position: '-40px 0%',
    },
    {
        src: '/images/oldwood/forestBG_treeline.png',
        speed: 0.17,
        top: 880,
        scale: 2,
        repeat: 'repeat-x',
        position: '60px 0%',
    },
    {
        src: '/images/oldwood/forestBG_nearTop.png',
        speed: 0.3,
        top: 1020,
        scale: 2,
        repeat: 'repeat-x',
    },
    {
        src: '/images/oldwood/forestBG_near.png',
        speed: 0.3,
        top: 1220,
        scale: 2,
        repeat: 'repeat',
    },
    {
        src: '/images/oldwood/forestBG_nearTop.png',
        speed: 0.4,
        top: 1560,
        scale: 2,
        repeat: 'repeat-x',
        position: '-72px 0%',
    },
    {
        src: '/images/oldwood/forestBG_near.png',
        speed: 0.4,
        top: 1760,
        scale: 2,
        repeat: 'repeat',
        position: '-72px 0%',
    },
    {
        src: '/images/oldwood/forestBG_nearTop.png',
        speed: 0.58,
        top: 2600,
        scale: 2,
        repeat: 'repeat-x',
        position: '60px 0%',
    },
    {
        src: '/images/oldwood/forestBG_near.png',
        speed: 0.58,
        top: 2800,
        scale: 2,
        repeat: 'repeat',
        position: '60px 0%',
    },
    {
        src: '/images/oldwood/forestBG_frontTop.png',
        speed: 0.7,
        top: 3800,
        scale: 2,
        repeat: 'repeat-x',
    },
    {
        src: '/images/oldwood/forestBG_front.png',
        speed: 0.7,
        top: 4640,
        scale: 2,
        repeat: 'repeat',
    },
];

export default function ParallaxBackground() {
    const dispatch = useDispatch();

    const [mounted, setMounted] = useState(false);

    const [layers, setLayers] = useState(oldWoodLayers);
    const layerRefs = useRef([]);

    const container = useRef(null);
    
    useEffect(() => {
        return () => {
            if (container.current) container.current.removeEventListener('scroll', handleScroll);
        }
    }, []);
    
    useEffect(() => {
        if (!mounted) {
            container.current = document.getElementById('container');
            container.current.addEventListener('scroll', handleScroll, { passive: true });
            setMounted(true);
        }
    }, []);

    function handleScroll(e) {
        const scrollTop = e.target.scrollTop;
        for (let i = 0; i < layerRefs.current.length; i++) {
            const y = scrollTop * layers[i].speed;
            layerRefs.current[i].style.transform = `translate(0px, -${y}px)`;
        }
    }

    function initImage(layer, element, i) {
        const image = new Image();
        image.onload = () => { init(); }
        image.src = layer.src;

        function init() {
            element.style.zIndex = i;
            //element.style.height = `${image.height}px`;
            element.style.background = `url(${layer.src})`;
            element.style.top = `${layer.top}px`;

            if (layer.scale) {
                element.style.backgroundSize = `${image.width * layer.scale}px`;
                //element.style.height = `${image.height * layer.scale}px`;
            }

            if (layer.repeat) element.style.backgroundRepeat = layer.repeat;
            else element.style.backgroundRepeat = 'no-repeat';

            if (layer.position) element.style.backgroundPosition = layer.position;

            const y = (container.current.scrollTop * layer.speed);
            element.style.transform = `translate(0px, -${y}px)`;
        }

    }

    return (
        <div className="parallax-background">
            {layers.map((layer, i) => {
                function assignRef(element) {
                    if (element) {
                        layerRefs.current[i] = element;
                        initImage(layer, element, i);
                    }
                }
                return (
                    <div className="parallax-layer" ref={assignRef} key={`p-layer_${i}`}></div>
                );
            })}
        </div>
    );
}









