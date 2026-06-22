import { useState, useEffect, useRef } from "react";

export default function PortfolioExperience() {

    return (
        <section id="portfolio-experience">
            <div className="portfolio-section-content">
                <h1 className="portfolio-section-name">Experience</h1>
                <div className="experience-list">
                    <div className="experience">
                        <h2>CGCN :: <span>Creative Director</span></h2>
                        <p className="experience-time">2019 - 2023</p>
                        <ul>
                            <li><b>Cross-Functional Leadership:</b> Orchestrated the end-to-end rebranding and digital overhaul of the primary agency website; oversaw third-party development and deployment to ensure technical performance and design fidelity</li>
                            <li><b>Product Strategy:</b> Collaborated directly with executive leadership to translate complex public affairs goals into functional digital platforms and visual narratives</li>
                            <li><b>UI/UX & Web Implementation:</b> Designed and deployed multiple high-traffic, issue-based public affairs websites for national clients; utilized CMS platforms (Squarespace) and custom CSS/HTML to meet rapid-response deployment timelines</li>
                            <li><b>Project Management:</b> Managed the creative lifecycle for internal and client-facing digital products, including branding, research documents, pitch decks, and social media advertising campaigns</li>
                            <li><b>Design Systems:</b> Developed and maintained unified branding materials used across all company digital and print assets, ensuring consistency across diverse media outlets</li>
                        </ul>
                    </div>
                    <div className="experience">
                        <h2>Definers :: <span>Graphic Designer</span></h2>
                        <p className="experience-time">2016 - 2019</p>
                        <ul>
                            <li><b>Product Branding & UI Design:</b> Designed and managed the development of internal company websites and client-facing digital platforms, ensuring high legibility and brand consistency</li>
                            <li><b>High-Impact Digital Campaigns:</b> Created branding, digital/print assets, and websites for national media campaigns featured in major news outlets (CNN, NYT, WSJ)</li>
                            <li><b>Cross-Functional Collaboration:</b> Partnered with researchers, developers, and account leads to translate complex data into interactive pitch decks, whitebooks, digital memos, and proposals</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}