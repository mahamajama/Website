import { useState, useEffect, useRef } from "react";

export default function PortfolioExperience() {

    return (
        <section id="portfolio-experience">
            <div className="portfolio-section-content">
                <h1 className="portfolio-section-name">Experience</h1>
                <div className="experience-list">
                    <div className="experience">
                        <h2>CGCN :: <span>Creative Director</span></h2>
                        <p>2019 - 2023</p>
                        <ul>
                            <li>Was creative</li>
                            <li>Had responsibilities</li>
                        </ul>
                    </div>
                    <div className="experience">
                        <h2>Definers :: <span>Graphic Designer</span></h2>
                        <p>2016 - 2019</p>
                        <ul>
                            <li>Was creative</li>
                            <li>Had responsibilities</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}