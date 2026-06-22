import { useState, useEffect, useRef } from "react";

import Frame from "../../components/Frame/Frame";
import Slideshow from "../../components/Slideshow/Slideshow";
import SkillsList from "./SkillsList";

export default function ProjectDetails({ className, data }) {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [description, setDescription] = useState([{ m: '' }]);
    const [descriptionToRender, setDescriptionToRender] = useState(['']);

    const toRender = useRef(['']);
    const p = useRef(0);
    const c = useRef(0);
    const timeout = useRef(null);

    const charsPerTic = 2;
    const messageSpeed = 0;
    const pauseSpeed = 100;

    useEffect(() => {
        if (!description) return;
        printDescription();
    }, [description]);

    function getLines(string) {
        const split = string.split(`\n`);
        const lines = split.map(str => {
            const trimmed = str.trim();
            let line = {
                m: trimmed,
                type: 'p',
            };
            if (trimmed.slice(0, 2) === `- `) {
                line.type = 'li';
            };
            return line;
        });
        return lines;
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
        const string = description[p.current].m;
        if (string != null && c.current < string.length) {
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

        function advanceChar(string) {
            const actual = c.current + charsPerTic;
            const n = Math.min(actual, string.length - 1);
            c.current = n;
            endOfP = actual >= string.length;
        }
    }

    function handleSlideChanged(slideIndex) {
        const currentSlide = data.slides[slideIndex];
        if (data.slides && currentSlide) {
            const description = getLines(currentSlide.description || '');
            setDescription(description);
            setCurrentSlideIndex(slideIndex);
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
                        {data.slides && <h4 className="project-slide-counter">{`${currentSlideIndex + 1}/${data.slides.length}`}</h4>}
                        {descriptionToRender.map((paragraph, i) => {
                            if (description[i] && description[i].type === 'li') {
                                return <li key={`pDDesc_line${i}`}>{paragraph}</li>;
                            } else {
                                return <p key={`pDDesc_line${i}`}>{paragraph}</p>;
                            }
                        })}
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