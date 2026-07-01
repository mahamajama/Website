

import './portfolio.css';
import PortfolioExperience from './PortfolioExperience';
import PortfolioProjects from './PortfolioProjects';
import PortfolioSkills from './PortfolioSkills';
import PageNav from '../../components/PageNav/PageNav';
import PortfolioContact from './PortfolioContact';

export default function Portfolio() {
    return (
        <>
        <div className="portfolio content-container">
            <div className="scroll-indicator">
                <h1>PORTFOLIO</h1>
                <div className="indicator-arrow"></div>
            </div>
            <PortfolioSkills />
            <PortfolioProjects />
            <PortfolioExperience />
            <PortfolioContact />
        </div>
        <PageNav sections={{
            'TOP': '',
            'SKILLS': 'portfolio-skills',
            'PROJECTS': 'portfolio-projects',
            'EXPERIENCE': 'portfolio-experience',
            'CONTACT': 'portfolio-contact',
        }} />
        </>
    );
}