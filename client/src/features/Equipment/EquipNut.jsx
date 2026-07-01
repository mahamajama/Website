import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

import { nutSound } from "../../utils/effects";
import { selectMenuIsOpen } from "../../gameSlice";

export default function EquipNut({ onEquipped, onUnequipped, onRoasting, onStoppedRoasting, roasted }) {
    const location = useLocation();
    const [isRoasting, setIsRoasting] = useState(false);

    const menuIsOpen = useSelector(selectMenuIsOpen);
    
    const smoke = useRef(null);
    const timeout = useRef(null);
    const cursor = useRef({ x: 0, y: 0 });

    const cursorClass = useRef('nut-cursor');

    function setCursor() {
        if (roasted) {
            document.body.classList.add('roasted-nut-cursor');
            document.body.classList.remove('nut-cursor');
        } else {
            document.body.classList.add('nut-cursor');
        }
    }

    function playNutSound() {
        nutSound.replay();
    }

    function playSmokeEffect() {
        smoke.current = new smokeCursor({
            initMousePos: {
                x: cursor.current.x,
                y: cursor.current.y
            }
        });
    }

    function resetSmokeEffect() {
        if (timeout.current) clearTimeout(timeout.current);
        if (smoke.current) smoke.current.destroy();
    }

    function onMouseMove(e) {
        cursor.current.x = e.clientX;
        cursor.current.y = e.clientY;
    }

    useEffect(() => {
        if (isRoasting) {
            if (onRoasting) onRoasting();
            timeout.current = setTimeout(playSmokeEffect, 2500);
        } else {
            if (onStoppedRoasting) onStoppedRoasting();
            resetSmokeEffect();
        }
    }, [isRoasting]);

    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', playNutSound);
        setCursor();
        
        if (onEquipped) onEquipped();
        
        return () => {
            document.body.classList.remove('nut-cursor');
            document.body.classList.remove('roasted-nut-cursor');
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('click', playNutSound);
            resetSmokeEffect();
            if (onUnequipped) onUnequipped();
        }
    }, []);

    useEffect(() => {
        if (!roasted && location.pathname === '/hotfire' && !menuIsOpen) {
            setIsRoasting(true);
        } else {
            setIsRoasting(false);
        }
    }, [location, menuIsOpen]);

    useEffect(() => {
        if (roasted) {
            resetSmokeEffect();
            setCursor();
        }
    }, [roasted]);

    return (
        <div id="equip-nut"></div>
    );
}


// cursor effect based on: https://github.com/tholman/cursor-effects
export function smokeCursor(options) {
    let hasWrapperEl = options && options.element;
    let element = hasWrapperEl || document.body;
    
    let width = window.innerWidth;
    let height = window.innerHeight;
    let cursor = { x: width / 2, y: width / 2 };
    if (options && options.initMousePos) cursor = options.initMousePos;
    let offset = { x: 10, y: 5 };
    let particles = [];
    let interval;
    let canvas, context, animationFrame;

    let canvImages = [];

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    // Re-initialise or destroy the cursor when the prefers-reduced-motion setting changes
    prefersReducedMotion.onchange = () => {
        if (prefersReducedMotion.matches) {
            destroy();
        } else {
            init();
        }
    };

    function init() {
        // Don't show the cursor trail if the user has prefers-reduced-motion enabled
        if (prefersReducedMotion.matches) {
            console.log(
                "This browser has prefers reduced motion turned on, so the cursor did not init"
            );
            return false;
        }

        canvas = document.createElement("canvas");
        context = canvas.getContext("2d");

        canvas.style.top = "0px";
        canvas.style.left = "0px";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = options?.zIndex || "9999999999";

        if (hasWrapperEl) {
            canvas.style.position = "absolute";
            element.appendChild(canvas);
            canvas.width = element.clientWidth;
            canvas.height = element.clientHeight;
        } else {
            canvas.style.position = "fixed";
            document.body.appendChild(canvas);
            canvas.width = width;
            canvas.height = height;
        }

        bindEvents();
        loop();
    }

    // Bind events that are needed
    function bindEvents() {
        interval = setInterval(addParticlesOnCursor, 220);
        element.addEventListener("mousemove", onMouseMove);
        //element.addEventListener("touchmove", onTouchMove, { passive: true });
        //element.addEventListener("touchstart", onTouchMove, { passive: true });
        window.addEventListener("resize", onWindowResize);
    }

    function onWindowResize(e) {
        width = window.innerWidth;
        height = window.innerHeight;

        if (hasWrapperEl) {
            canvas.width = element.clientWidth;
            canvas.height = element.clientHeight;
        } else {
            canvas.width = width;
            canvas.height = height;
        }
    }

    function onTouchMove(e) {
        if (e.touches.length > 0) {
            cursor.x = e.touches[0].clientX;
            cursor.y = e.touches[0].clientY;
        }
    }

    function onMouseMove(e) {
        if (hasWrapperEl) {
            const boundingRect = element.getBoundingClientRect();
            cursor.x = e.clientX - boundingRect.left;
            cursor.y = e.clientY - boundingRect.top;
        } else {
            cursor.x = e.clientX;
            cursor.y = e.clientY;
        }
    }

    function addParticle(x, y, img) {
        particles.push(new Particle(x, y, img));
    }

    function addParticlesOnCursor() {
        const x = cursor.x + offset.x;
        const y = cursor.y + offset.y;
        addParticle(x, y);
    }

    function updateParticles() {
        if (particles.length == 0) {
            return;
        }

        context.clearRect(0, 0, width, height);

        // Update
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(context);
        }

        // Remove dead particles
        for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].lifeSpan < 0) {
            particles.splice(i, 1);
        }
        }

        if (particles.length == 0) {
            context.clearRect(0, 0, width, height);
        }
    }

    function loop() {
        updateParticles();
        animationFrame = requestAnimationFrame(loop);
    }

    function destroy() {
        if (interval) clearInterval(interval);
        canvas.remove();
        cancelAnimationFrame(animationFrame);
        element.removeEventListener("mousemove", onMouseMove);
        element.removeEventListener("touchmove", onTouchMove);
        element.removeEventListener("touchstart", onTouchMove);
        window.addEventListener("resize", onWindowResize);
    };

    function Particle(x, y, canvasItem) {
        const lifeSpan = Math.floor(Math.random() * 60 + 120);
        this.initialLifeSpan = lifeSpan; //
        this.lifeSpan = lifeSpan; //ms
        this.velocity = {
            x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 10),
            y: -0.4 + Math.random() * -1,
        };
        this.position = { x: x, y: y };
        this.canv = canvasItem;

        this.baseDimension = 4;

        this.update = function (context) {
            this.lifeSpan = Math.max(this.lifeSpan - 1, 0);
            const factor = (this.initialLifeSpan - this.lifeSpan) / this.initialLifeSpan;
            const scale = 0.5 + (factor) * 20;
            const alpha = 1 - factor;

            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y * alpha;
            this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 80;
            this.velocity.y -= (0.01 + Math.random() / 500);

            const xPos = this.position.x - (this.baseDimension / 2) * scale;
            const yPos = this.position.y - this.baseDimension / 2;
            const size = this.baseDimension * scale;
            const radius = size / 2;

            const gradient = context.createRadialGradient(xPos + radius, yPos + radius, radius * 0.5, xPos + radius, yPos + radius, radius);
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(1, 'transparent');
            
            //context.globalCompositeOperation = 'destination-over';
            context.globalAlpha = alpha;
            context.fillStyle = gradient;
            context.fillRect(xPos, yPos, size, size);

            context.closePath();
        };
    }

    init();


    return {
        destroy: destroy
    }
}