import { useState, useEffect, useRef } from "react";

export default function SkillsList({ name, list }) {

    return (
        <div className="skills-list">    
            <h2>{name}</h2>
            <ul>
                {list.map((skill, i) => {
                    return (
                        <li className="skills-listing" key={`skTech_${i}`}>
                            <img src={skill.logo} />
                            <h3>{skill.name}</h3>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}