import { useState, useEffect, useRef } from "react";

import './graph.css';
import { ease } from "../../utils/helpers";

export default function Graph({ yMin, yMax, data }) {
    const [mounted, setMounted] = useState(false);
    
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const canvasSizeRef = useRef({ width: 1000, height: 600 });
    const lastFrameRef = useRef(null);
    const barGradientRef = useRef(null);
    const startRef = useRef(undefined);

    const duration = 800;

    const barsRef = useRef([]);

    const keys = Object.keys(data);
    const values = Object.values(data);
    const dataLength = keys.length;
    const graphLength = (dataLength + 1);

    const min = yMin || Math.min(...values, 0);
    const max = yMax || getMax(values);
    const range = max - min;

    useEffect(() => {
        if (!mounted && canvasRef.current) {
            init();
            setMounted(true);
        }
    }, [canvasRef.current]);

    function getMax(values) {
        const maxValue = Math.max(...values);
        if (maxValue < 1) return 1;
        else if (maxValue <= 5) return 5;
        else if (maxValue <= 10) return 10;
        else if (maxValue <= 25) {
            const rem = maxValue % 5;
            return maxValue + (5 - rem);
        }
        else if (maxValue <= 100) {
            const rem = maxValue % 10;
            return maxValue + (10 - rem);
        }
        else if (maxValue <= 250) {
            const rem = maxValue % 50;
            return maxValue + (50 - rem);
        }
        else if (maxValue <= 1000) {
            const rem = maxValue % 100;
            return maxValue + (100 - rem);
        }
        else if (maxValue <= 2500) {
            const rem = maxValue % 250;
            return maxValue + (250 - rem);
        }
        else {
            const rem = maxValue % 500;
            return maxValue + (500 - rem);
        }
    }

    function init() {
        ctxRef.current = canvasRef.current.getContext("2d");

        barGradientRef.current = ctxRef.current.createLinearGradient(0, canvasSizeRef.current.height, 0, 0);
        barGradientRef.current.addColorStop(0, "blue");
        barGradientRef.current.addColorStop(0.4, "lime");
        barGradientRef.current.addColorStop(0.9, "yellow");

        canvasRef.current.width = canvasSizeRef.current.width;
        canvasRef.current.height = canvasSizeRef.current.height;

        ctxRef.current.fillStyle = barGradientRef.current;

        barsRef.current = [];
        for (let i = 0; i < dataLength; i++) {
            const key = keys[i];
            const value = values[i];
            const xPos = ((i + 1) / graphLength) * canvasSizeRef.current.width;
            const scale = ((value + min) / range) * canvasSizeRef.current.height;
            const yPos = canvasSizeRef.current.height - scale;
            const delay = duration + i * 75;

            barsRef.current.push({
                key: key,
                value: value,
                x: xPos,
                y: yPos,
                width: 8,
                height: scale,
                done: false,
                delay: delay,
            });
        }

        if (lastFrameRef.current) cancelAnimationFrame(lastFrameRef.current);
        lastFrameRef.current = requestAnimationFrame(animate);
    }

    function animate(t) {
        if (!startRef.current) startRef.current = t;
        const delta = t - startRef.current;

        drawBars(delta);

        const allDone = barsRef.current.every(bar => bar.done);
        if (!allDone) {
            lastFrameRef.current = requestAnimationFrame(animate);
        } else {
            console.log('Bar graph done!');
        }
    }

    function drawBars(t) {
        for (let i = 0; i < dataLength; i++) {
            if (barsRef.current[i].done) return;

            const x = barsRef.current[i].x;
            const width = barsRef.current[i].width;
            const targetHeight = barsRef.current[i].height;
            const height = ease.easeOutExpo(t, 0, targetHeight, barsRef.current[i].delay);
            const y = barsRef.current[i].y + (targetHeight - height);

            drawBar(x, y, width, height);

            if (height >= targetHeight) {
                barsRef.current[i].done = true;
            }
        }
        
        function drawBar(x, y, width, height) {
            ctxRef.current.beginPath();
            ctxRef.current.rect(x, y, width, height);
            ctxRef.current.fill();
        }
    }
    
    return (
        <div className="graph">
            <div className="graph-wrapper">
                <div>
                    <canvas className="graph-canvas" ref={canvasRef}></canvas>
                    <div className="graph-y-labels">
                        <p>{max}</p>
                        <p>{max / 2}</p>
                        <p>0</p>
                    </div>
                </div>
            </div>
            <div className="graph-x-labels">
                <div></div>
                {keys.map((key, i) => {
                    return (
                        <div key={`graphXLabel_${i}`}>
                            <p>{key}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}