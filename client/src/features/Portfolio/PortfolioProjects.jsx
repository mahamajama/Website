import { useState, useEffect, useRef } from "react";
import Slideshow from "../../components/Slideshow/Slideshow";
import ProjectDetails from "./ProjectDetails";

export default function PortfolioProjects() {
    const distance = useRef(340);
    const position = useRef(0);
    const slides = useRef(null);

    return (
        <section id="portfolio-projects">
            <div className="portfolio-section-content">
                <h1 className="portfolio-section-name">Projects</h1>
                <ProjectDetails />
            </div>
        </section>
    );
}