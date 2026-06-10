import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './pageTitle.css';
import PageTitleLetter from './PageTitleLetter';

export default function PageTitle({ title, actions, children }) {
    const wordIds = useRef([]);
    const [titleToRender, setTitleToRender] = useState(getTitleToRender);

    function getTitleToRender() {
        let wordsToRender = [];
        let letterIndex = 0;

        const words = title.split(' ');
        for (let i = 0; i < words.length; i++) {
            if (i > wordIds.current.length - 1) {
                wordIds.current.push(uuidv4());
            }
            let wordToRender = [];
            const word = words[i];
            for (let j = 0; j < word.length; j++) {
                let clickAction = null;
                if (actions && actions[letterIndex]) clickAction = actions[letterIndex];
                let letterChildren = null;
                if (children && children[letterIndex]) letterChildren = children[letterIndex];
                wordToRender.push(
                    {
                        letter: word[j],
                        index: letterIndex,
                        onClick: clickAction,
                        children: letterChildren,
                        key: uuidv4(),
                    }   
                );
                letterIndex++;
            }
            wordsToRender.push(wordToRender);
        }

        return wordsToRender;
    }

    useEffect(() => {
        setTitleToRender(getTitleToRender());
    }, [title])

    return (
        <div className="page-title">
            {titleToRender.map((word, i) => {
                return (
                    <div className="page-title-word" key={wordIds.current[i]}>
                        {word.map(letter => {
                            return (
                                <div 
                                    className='letter-container-container' 
                                    style={{ animationDelay: `${letter.index * 0.25}s` }} 
                                    key={letter.key}
                                >
                                    <PageTitleLetter 
                                        letter={letter.letter} 
                                        index={letter.index} 
                                        onClick={letter.onClick}
                                    />
                                    {letter.children}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
}