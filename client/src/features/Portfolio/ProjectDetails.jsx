import { useState, useEffect, useRef } from "react";

import Frame from "../../components/Frame/Frame";
import Slideshow from "../../components/Slideshow/Slideshow";
import SkillsList from "./SkillsList";

export default function ProjectDetails({ className, data }) {
    const [description, setDescription] = useState(['']);
    const [descriptionToRender, setDescriptionToRender] = useState(['']);

    const toRender = useRef(['']);
    const p = useRef(0);
    const c = useRef(0);
    const timeout = useRef(null);

    const messageSpeed = 1;
    const pauseSpeed = 100;

    useEffect(() => {
        if (!description) return;
        printDescription();
    }, [description]);

    function getParagraphs(string) {
        const split = string.split(`\n\n`);
        return split;
    }

    function printDescription() {
        if (timeout.current) clearTimeout(timeout.current);

        p.current = 0;
        c.current = 0;
        toRender.current = [];
        for (let i = 0; i < description.length; i++) {
            toRender.current.push('');
        }

        printNext();
    }
    
    function printNext() {
        const string = description[p.current];
        if (string && c.current < string.length) {
            if (string.charAt(c.current) === "@") {
                c.current++;
                timeout.current = setTimeout(printNext, pauseSpeed);
            } else {
                toRender.current[p.current] += string.charAt(c.current);
                setDescriptionToRender(toRender.current.map(paragraph => paragraph.toString()));
                c.current++;
                timeout.current = setTimeout(printNext, messageSpeed);
            }
        } else {
            p.current++;
            if (p.current < description.length) {
                c.current = 0;
                timeout.current = setTimeout(printNext, messageSpeed);
            }
        }
    }

    function handleSlideChanged(slideIndex) {
        const currentSlide = data.slides[slideIndex];
        if (data.slides && currentSlide) {
            const description = getParagraphs(currentSlide.description || '');
            setDescription(description);
        }
    }

    return (
        <>
        <Frame className={className}>
            <div className="project-details">
                <p className="project-details-label">PROJECT FILE::</p>
                <h1 className="project-details-name">{data.name}</h1>
                <p className="project-details-tagline">{data.tagline}</p>
                {data.slides && <Slideshow slides={data.slides} onChange={handleSlideChanged} />}
                {data.demoUrl && <a className="project-link" href={datademoUrl}>View live demo...</a>}
                <div className="project-details-info">
                    <div className="project-details-description">
                        {descriptionToRender.map(paragraph => <p>{paragraph}</p>)}
                    </div>
                    <div className="project-details-skills">
                        <h2>STACK</h2>
                        <p>--------</p>
                        <SkillsList name="Tech" list={data.skills.tech} />
                        <SkillsList name="Tools" list={data.skills.tools} />
                        <SkillsList name="Languages" list={data.skills.languages} />
                    </div>
                </div>
            </div>
        </Frame>
        </>
    );
}