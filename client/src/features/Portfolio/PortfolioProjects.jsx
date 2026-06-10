import { useState, useEffect, useRef } from "react";

import { skills } from "./portfolioHelpers";
import Slideshow from "../../components/Slideshow/Slideshow";
import ProjectDetails from "./ProjectDetails";

const jamashopData = {
    name: 'Jamashop',
    tagline: 'An e-commerce web app where users create their own shops.',
    skills: {
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
    },
    slides: [
        {
            title: 'Slide title',
            content: <img src="images/portfolio/projects/jamashop/jamashop_slide01.gif" />,
            description: `This is a description.`,
        },
        {
            title: 'Slide title',
            content: <img src="images/items/ornateBox_full.png" />,
            description: `This is another a description.`,
        },
        {
            title: 'Slide title',
            content: <img src="images/items/ornateBox_full.png" />,
            description: 
                `Observe how they can be multiple paragraphs.

                At least, I hope this works. I havent tested it or anything.`
            ,
        },
    ]
}

const blueditData = {
    name: 'Bluedit',
    tagline: 'A more calming way to browse reddit.',
    skills: {
        tech: [
            skills.react,
            skills.express,
            skills.node,
            skills.three,
        ],
        tools: [
            skills.photoshop,
        ],
        languages: [
            skills.javascript,
            skills.css,
            skills.html,
        ],
    },
    slides: [
        {
            title: 'Slide title',
            content: <img src="images/portfolio/projects/jamashop/jamashop_slide01.gif" />,
            description: `This is a description.`,
        },
        {
            title: 'Slide title',
            content: <img src="images/items/ornateBox_full.png" />,
            description: `This is another a description.`,
        },
        {
            title: 'Slide title',
            content: <img src="images/items/ornateBox_full.png" />,
            description: 
                `Observe how they can be multiple paragraphs.

                At least, I hope this works. I havent tested it or anything.`
            ,
        },
    ]
}

const cgcnData = {
    name: 'CGCN Rebrand',
    tagline: `A rebranding for the fuckin' ages, dawg.`,
    skills: {
        tech: [],
        tools: [
            skills.photoshop,
            skills.illustrator,
            skills.indesign,
            skills.xd,
        ],
        languages: [],
    },
    slides: [
        {
            title: 'Rebrand',
            content: <img src="images/portfolio/projects/cgcn/cgcn_slide01.png" />,
            description: `This is a description.`,
        },
        {
            title: 'Website Redesign',
            content: <img src="images/portfolio/projects/cgcn/cgcn_slide02.png" />,
            description: `This is another a description.`,
        },
        {
            title: 'Collateral',
            content: <img src="images/items/ornateBox_full.png" />,
            description: 
                `Observe how they can be multiple paragraphs.

                At least, I hope this works. I havent tested it or anything.`
            ,
        },
    ]
}

export default function PortfolioProjects() {
    const distance = useRef(340);
    const position = useRef(0);
    const slides = useRef(null);

    return (
        <section id="portfolio-projects">
            <div className="portfolio-section-content">
                <h1 className="portfolio-section-name">Projects</h1>
                <div className="portfolio-project-list">
                    <ProjectDetails className="jamashop portfolio-project" data={jamashopData} />
                    <ProjectDetails className="bluedit portfolio-project" data={blueditData} />
                    <ProjectDetails className="cgcn portfolio-project" data={cgcnData} />
                </div>
            </div>
        </section>
    );
}