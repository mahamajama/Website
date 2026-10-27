import { useState, useEffect, useRef } from "react";

import ProjectDetails from "./ProjectDetails";
import { jamashopData, blueditData, cgcnData } from "./portfolioProjectData.jsx";

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