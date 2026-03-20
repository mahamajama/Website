

import { groupBy } from '../../utils/helpers.js';
import { skills } from './portfolioHelpers.js';
import SkillsList from './SkillsList.jsx';

export default function PortfolioSkills() {
    const portfolioSkills = groupBy(Object.values(skills), 'type');

    return (
        <section id="portfolio-skills">
            <div className="portfolio-section-content">
                <h1 className="portfolio-section-name">Skills</h1>
                <SkillsList name="Tech" list={portfolioSkills.Technology} />
                <SkillsList name="Tools" list={portfolioSkills.Tool} />
                <SkillsList name="Languages" list={portfolioSkills.Language} />
            </div>
        </section>
    );
}