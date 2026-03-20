import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import GlslCanvas from "glslCanvas";

import './background.css';

function getVec4FromColor(color) {
    const r = parseInt(color.substr(1,2), 16) / 255;
    const g = parseInt(color.substr(3,2), 16) / 255;
    const b = parseInt(color.substr(5,2), 16) / 255;
    const a = 1;
    return {
        r: r, 
        g: g, 
        b: b, 
        a: a,
    };
}

export default function ShaderBackground() {
    const [mounted, setMounted] = useState(false);
    const [frag, setFrag] = useState(null);

    const [bgColor, setBgColor] = useState(`#000000`);

    const canvasRef = useRef(null);
    const sandboxRef = useRef(null);

    const bgColorInputRef = useRef(null);

    useEffect(() => {
        if (!mounted && canvasRef.current && bgColorInputRef.current) {
            sandboxRef.current = new GlslCanvas(canvasRef.current);
            loadShader();
            bgColorInputRef.current.addEventListener('change', onChangeBgColor);
            setMounted(true);
        }
    }, [canvasRef.current, bgColorInputRef.current]);

    useEffect(() => {
        if (frag && bgColor) {
            sandboxRef.current.load(frag);

            const bg = getVec4FromColor(bgColor);
            sandboxRef.current.setUniform('u_bgColor', bg.r, bg.g, bg.b, bg.a);
        }
    }, [frag, bgColor]);

    async function loadShader() {
        try {
            const response = await fetch('src/shaders/shader.frag');
            const shader = await response.text();
            setFrag(shader);
        } catch (error) {
            console.log(error.message);
        }
    }

    function onChangeBgColor(e) {
        setBgColor(e.target.value);
    }
    
    return (
        <div className="shader-background">
            <div className="shader-controls">
                <input 
                    defaultValue={bgColor} 
                    ref={bgColorInputRef}
                    type="color" 
                />
            </div>
            <canvas className="background-canvas" ref={canvasRef}></canvas>
        </div>
    );
}