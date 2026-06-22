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
            title: 'Town Square',
            content: <img src="images/portfolio/projects/jamashop/jamashop_slide01.gif" />,
            description: 
                `Jamashop is a web app that lets users create storefronts to sell their own products.

                Primary features:
                - A fun and responsive user interface
                - Create an account to open multiple storefronts per user
                - Add products to those storefronts
                - Use a simple image cropping tool to upload custom profile and product images
                - Filter products using a tag based system
                - Shop sections can be added, removed, and customized using product tags and section names
                - Save your favorite shops for quick access and updates`,
        },
        {
            title: 'Vendors',
            content: <img src="images/portfolio/projects/jamashop/jamashop_slide02.png" />,
            description: 
                `The idea came from the first database design I sketched out for the as-yet-unplanned e-commerce app. There was a table called Vendors that seemed like a waste to only have one row. 
                
                Believe it or not, I'm pretty unfamiliar with Etsy, and the comparison didn't even occur to me until much later. It also didn't occur to me that this was going to add a layer of complexity that was probably not advisable to take on for a solo portfolio project.
            
                But the benefit of this complexity is that it forced me to learn a lot about how to manage the interweaving web of dependencies that come with focusing your software on user generated content. 
                
                Giving users ownership of their own store pages means you can't just design a store page and be done with it. You have to build a system to generate store pages based on a set of preferences.`,
        },
        {
            title: 'Challenges',
            content: <img src="images/portfolio/projects/jamashop/jamashop_slide03.gif" />,
            description: 
                `My biggest enemies in this project were time and scope. I knew going into it that I would barely be able to scratch the surface of the feature set this concept would entail as a full product. So, I had to make a lot of compromises in choosing what to focus on.
                
                Things left on the cutting room floor due to time constraints:
                - Social features: Mainly a comment/review system with the option to rate products out of 5 stars
                - Custom backgrounds: Currently, navigating the app changes the background randomly from a sample set. The intention is to allow vendors to set custom backgrounds based on shop section
                - More custom shop sections: These might include a set of featured products, cross-promotional ad sections, or customer comment highlights
                - Improving the product management flow: I would like to add a way to manage/add/remove products in bulk to make the process less cumbersome

                Time and manpower could go a long way into these and some other general improvements/polish, but in keeping with the project's original scope as an educational exercise and portfolio piece, I just couldn't justify continuing development.`,
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
            title: 'Onedit, Twodit, Reddit, Bluedit',
            content: <img src="images/portfolio/projects/bluedit/bluedit_slide01.gif" />,
            description: 
                `The goal for Bluedit was to create a reddit browsing app using whatever scraps of functionality I could squeeze out of Reddit's JSON API. If you're unfamiliar with this, try adding '.json' to the end of any reddit url. It'll give you a JSON file with the pages raw data. (Reddit began charging for use of their normal API in 2023.)
            
                The broader concept grew from the name itself. Rather than RED-dit, my alternate version would be BLUE-dit. Get it?
                
                So, with that vague idea in mind, and considering the limitations of Reddit's free API, I set out to make a Reddit browsing experience focused around a calming, blue, aquatic theme; sort of a form over function piece with an emphasis on appealing animations and transitions.`,
        },
        {
            title: 'Three.js',
            content: <img src="images/portfolio/projects/bluedit/bluedit_slide02.png" />,
            description: 
                `Admittedly, part of the reason I chose this direction was because it gave me an excuse to dip my toes into learning Three.js, a 3D graphics library for javascript.
                
                The setup was relatively simple, involving only three elements and minimal 3D modeling: a ground plane, a water surface plane, and a skybox, to simulate a calm, shallow pond setting.
                
                The hard part was making the water's surface ripple on each click, dynamically reflecting, refracting, and responding to the light and environment. The result of this ended up being surprisingly convincing and, combined with a feast's worth of css animations, created a smooth and engaging user experience.`,
        },
        {
            title: 'Choppy Waters',
            content: <img src="images/portfolio/projects/bluedit/bluedit_slide03.gif" />,
            description: 
                `After some testing and some research, it became clear the approach I took to create these ripple effects was perhaps not the most optimal.
                
                The rippling effect was achieved by updating the individual vertices on the water plane every frame of animation, setting their velocity based on their distance from the user's mouse position. And although that worked fine on my desktop computer, directly manipulating a 3D mesh is a very CPU intensive process that lower-end devices like smartphones can struggle to keep up with.
                
                A better approach would have been to make a shader, shifting that processing load onto the GPU. Unfortunately, learning how to code shaders was definitely not within the scope of this project (though it's definitely something I plan on exploring in the future). Slightly reducing the number of effects when on a mobile device helped, but a universal solution would be more ideal.`
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
            title: 'First Order of Business',
            content: <img src="images/portfolio/projects/cgcn/cgcn_slide01.png" />,
            description: 
                `I was told a rebranding was imminent on my first day at CGCN, when I met their CEO. CGCN's branding had been the same since the company started, and they wanted an update to signal their success.
            
                Key considerations included:
                - Showcase their connectedness in the capital
                - Bridge the gap to their new PR branch
                - 'slick', 'boutique', 'silver'
                
                After finalizing the logo and creating the design guide, the next few weeks would be making sure every piece of collateral was consistent with the new style. This means designing new business cards, envelopes, letterheads, email signatures, handbooks, and most importantly proposals, which needed several variations depending on their intended audience.`,
        },
        {
            title: 'And a Website',
            content: <img src="images/portfolio/projects/cgcn/cgcn_slide02.png" />,
            description: 
                `Of course, after a rebranding, the need for a new wesbite is kind of self evident.
                
                My role was to provide the design for the main page of the new website, establishing it's design language, and working closely with leadership to ensure it included features to emphasize their connectedness and positive press.
                
                Then I contracted a design firm we had a previous relationship with to develop the site and extend the design across the remaining pages.`,
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