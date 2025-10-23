import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isDebugMode } from "../../gameSlice";
import Dropdown from "../../components/Dropdown/Dropdown";
    
let flavors = {
    
    mystify: {
        name: "Mystify",
        shapeN: 12,
        vertices: 4,
        speed: 2,
        distance: 7,
        lineweight: 1,
        lineJoin: 'bevel',
        frequency: 3,
        hue: getRandomColor(),
        saturation: 100,
        lightness: 60,
        colorChangeSpeed: 0.25,
        blendMode: null,
        fill: false,
        speedChange: 1,
    },

    millennium: {
        name: "Millennium",
        shapeN: 12,
        vertices: 3,
        speed: 2,
        distance: 6,
        lineweight: 8,
        lineJoin: 'round',
        frequency: 1,
        hue: 200,
        saturation: 100,
        lightness: 60,
        colorChangeSpeed: 0,
        blendMode: 'screen',
        fill: false,
        speedChange: 0,
    },

    labyrinth: {
        name: "Labyrinth",     
        shapeN: 30,
        vertices: 3,
        speed: 0.5,
        distance: 11,
        lineweight: 255,
        lineJoin: 'bevel',
        frequency: 0,
        hue: 240,
        saturation: 25,
        lightness: 60,
        colorChangeSpeed: 0,
        blendMode: 'source-out',
        fill: false,
        speedChange: 0,
    },
    
    anxiety: {
        name: "Anxiety",
        shapeN: 4,
        vertices: 600,
        speed: 10,
        distance: 1,
        lineweight: 5,
        lineJoin: 'miter',
        frequency: 0,
        hue: getRandomColor(),
        saturation: 0,
        lightness: 90,
        colorChangeSpeed: 0,
        blendMode: 'xor',
        fill: false,
        speedChange: 0,
    },
    
    plasma: {
        name: "Plasma",
        shapeN: 16,
        vertices: 6,
        speed: 0.4,
        distance: 50,
        lineweight: 255,
        lineJoin: 'round',
        frequency: 0.9,
        hue: getRandomColor(),
        saturation: 100,
        lightness: 60,
        colorChangeSpeed: 0.02,
        blendMode: null,
        fill: false,
        speedChange: 0,
    },
    
    sundance: {
        name: "Sundance",
        shapeN: 100,
        vertices: 2,
        speed: 1,
        distance: 4,
        lineweight: 2,
        lineJoin: 'miter',
        frequency: 0.1,
        hue: getRandomColor(),
        saturation: 100,
        lightness: 50,
        colorChangeSpeed: 0.01,
        blendMode: null,
        fill: false,
        speedChange: 0,
    },
    
    bebop: {
        name: "Bebop",
        shapeN: 3,
        vertices: 3,
        speed: 4,
        distance: 255,
        lineweight: 1,
        lineJoin: 'miter',
        frequency: 0.1,
        hue: getRandomColor(),
        saturation: 55,
        lightness: 60,
        colorChangeSpeed: 0.01,
        blendMode: 'xor',
        fill: true,
        speedChange: 0,
    },
    
    craftFair: {
        name: "Craft Fair",
        shapeN: 5,
        vertices: 3,
        speed: 4,
        distance: 15,
        lineweight: 1,
        lineJoin: 'miter',
        frequency: 45,
        hue: getRandomColor(),
        saturation: 100,
        lightness: 60,
        colorChangeSpeed: 0.01,
        blendMode: 'difference',
        fill: true,
        speedChange: 0,
    },

}

function getRandomColor() {
    return Math.random() * 360;
}

function getRandomFlavor(obj) {
    var keys = Object.keys(obj)
    return obj[keys[keys.length * Math.random() << 0]];
};

let speeds = [];
let cache = [];
let currentFlavor = flavors.mystify;
let interval = currentFlavor.distance;
let iterations = interval * currentFlavor.shapeN;
let lastFrame = null;
function mystify(canvas, ctx, t) {
    //if (!lastFrame) lastFrame = t - 6;
    //const delta = t - lastFrame;
    
    if (window.innerWidth > 800) {
        canvas.width = window.innerWidth;
    } else {
        canvas.width = 800;
    }
    canvas.height = window.innerHeight;

    ctx.globalCompositeOperation = currentFlavor.blendMode;
    ctx.lineWidth = currentFlavor.lineweight;
    ctx.lineJoin = currentFlavor.lineJoin;
    
    function getColor(s) {
        
        var color = currentFlavor.hue + s * currentFlavor.frequency;
        
        if (currentFlavor.hue == 360) {
            currentFlavor.hue = 0;
        }
        return 'hsl(' + color +', '+ currentFlavor.saturation + '%, '+ currentFlavor.lightness +'%)';
    }
    
    currentFlavor.hue += currentFlavor.colorChangeSpeed;
    
    let allShapesStroked = false;
    for (let s = 0; s < currentFlavor.shapeN; s++) { //action happens here

        ctx.strokeStyle = getColor(s);
        ctx.beginPath();

        if (s === 0) {
            setNewStroke();
        } 
        else if (allShapesStroked || cache.length >= interval * s + 1) {
            setOldStroke(s);
        }

        ctx.closePath();
        ctx.stroke();
        
        if (currentFlavor.fill) {
            ctx.fillStyle = getColor(s);
            ctx.fill();
        }
    }

    if (!allShapesStroked) {
        if (cache.length >= iterations) allShapesStroked = true;
    }

    lastFrame = requestAnimationFrame((t) => mystify(canvas, ctx, t));

    function setNewStroke() {
        let toCache = [];
        for (let v = 0; v < currentFlavor.vertices; v++) {
                
            let vXSpeed = speeds[v][0];
            let vYSpeed = speeds[v][1];
            let vXPos = cache[0][v][0];
            let vYPos = cache[0][v][1];
            
            vXPos += vXSpeed;
            vYPos += vYSpeed;
                
            if (vXPos >= canvas.width) {
                vXSpeed = Math.abs(vXSpeed) * -1;
            } else if (vXPos <= 0) {
                vXSpeed = Math.abs(vXSpeed);
            }

            if (vYPos >= canvas.height) {
                vYSpeed = Math.abs(vYSpeed) * -1;
            } else if (vYPos <= 0) {
                vYSpeed = Math.abs(vYSpeed);
            }
            
            if (v === 0) {
                ctx.moveTo(vXPos, vYPos);
            } else {
                ctx.lineTo(vXPos, vYPos);
            }

            speeds[v][0] = vXSpeed;
            speeds[v][1] = vYSpeed;
            toCache.push([vXPos, vYPos]);
        }
        
        const storage = cache.unshift(toCache);
        if (storage > iterations) {
            cache.pop();
        }
    }

    function setOldStroke(s) {
        for (let v = 0; v < currentFlavor.vertices; v++) {
            let i = s * interval;
            let newPos = cache[i][v];
            if (v === 0) {
                ctx.moveTo(newPos[0], newPos[1]);
            } else {
                ctx.lineTo(newPos[0], newPos[1]);
            }
        }
    }
}

function initMystify(canvas, targetFlavor) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    cache = [];
    speeds = [];

    currentFlavor = targetFlavor;

    const ctx = canvas.getContext("2d", { alpha: false });

    interval = currentFlavor.distance;
    iterations = interval * currentFlavor.shapeN;
    
    function calcXSpeed() {
        return (Math.random() * (currentFlavor.speed * 2)) - currentFlavor.speed;
    }
    function calcYSpeed(xSpeed) {
        return currentFlavor.speed - Math.abs(xSpeed);
    }

    const startX = canvas.width / 2;
    const startY = canvas.height / 2;
    
    let toCache = [];
    for (let v = 0; v < currentFlavor.vertices; v++) {
        const xSpeed = calcXSpeed();
    
        speeds.push([xSpeed, calcYSpeed(xSpeed)]);
        toCache.push([startX, startY]);
    }
    cache.push(toCache);

    if (lastFrame) cancelAnimationFrame(lastFrame);
    lastFrame = requestAnimationFrame((t) => mystify(canvas, ctx, t));
}

export default function Mystify() {
    const [flavor, setFlavor] = useState('mystify');
    const backgroundCanvas = useRef(null);
    const debugMode = useSelector(isDebugMode);
    
    useEffect(() => {
        if (backgroundCanvas.current) {
            initMystify(backgroundCanvas.current, currentFlavor);
        }
    }, [backgroundCanvas.current]);

    useEffect(() => {
        const newFlavor = flavors[flavor];
        if (backgroundCanvas.current && newFlavor != currentFlavor) {
            initMystify(backgroundCanvas.current, newFlavor);
        }
    }, [flavor])

    return (
        <>
        {debugMode &&
            <div className="flavor-menu">
            <Dropdown 
                options={{
                    Mystify: `mystify`,
                    Millennium: 'millennium',
                    Plasma: 'plasma',
                    Bebop: 'bebop',
                    Sundance: 'sundance',
                    'Craft Fair': 'craftFair',
                }}
                onOptionSelected={(e) => {
                    setFlavor(e.target.getAttribute('data-value'));
                }}
                selection={currentFlavor.name}
            />
        </div>
        }
        <canvas className="background-canvas" ref={backgroundCanvas}></canvas>
        </>
    );
}