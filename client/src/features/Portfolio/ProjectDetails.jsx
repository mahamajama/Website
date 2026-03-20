import { useState, useEffect, useRef } from "react";

import { skills } from "./portfolioHelpers";
import Frame from "../../components/Frame/Frame";
import Slideshow from "../../components/Slideshow/Slideshow";
import SkillsList from "./SkillsList";

const projectOne = [
    {
        title: 'Slide title',
        content: <img src="images/items/ornateBox_full.png" />,
    },
    {
        title: 'Slide title',
        content: <img src="images/items/ornateBox_full.png" />,
    },
    {
        title: 'Slide title',
        content: <img src="images/items/ornateBox_full.png" />,
    },
];

const projectSkills = {
    tech: [
        skills.react,
        skills.express,
        skills.node,
    ],
    tools: [
        skills.photoshop,
    ],
    languages: [
        skills.javascript,
        skills.css,
        skills.html,
    ],
};

export default function ProjectDetails() {

    return (
        <>
        <Frame>
            <div className="project-details">
                <h1 className="project-details-name">Project Name</h1>
                <p className="project-details-tagline">This would be where a short project tagline goes.</p>
                <Slideshow slides={projectOne} />
                <a className="project-link">View live demo...</a>
                <div className="project-details-info">
                    <div className="project-details-description">
                        <p>Whereas the above was a short tagline, this would be where a much longer description of the project goes.</p>
                        <p>
                            I'm not sure how I want to structure these, exactly. But it can probably be pretty informal.
                            Normally they'd probably be a fair bit longer than this, but I'm typing it in code itself, and it's pretty ugly.
                        </p>
                    </div>
                    <div className="project-details-skills">
                        <h2>STACK</h2>
                        <p>--------</p>
                        <SkillsList name="Tech" list={projectSkills.tech} />
                        <SkillsList name="Tools" list={projectSkills.tools} />
                        <SkillsList name="Languages" list={projectSkills.languages} />
                    </div>
                </div>
            </div>
        </Frame>
        </>
    );
}