import { useState, useEffect } from 'react';
import './PageTitle.css';
import PageTitleLetter from './PageTitleLetter';

export default function PageTitle({ title, actions }) {
    const [titleToRender, setTitleToRender] = useState(getTitleToRender);

    function getTitleToRender() {
        let wordsToRender = [];
        let letterIndex = 0;

        const words = title.split(' ');
        for (let i = 0; i < words.length; i++) {
            let wordToRender = [];

            const word = words[i];
            for (let j = 0; j < word.length; j++) {
                let clickAction = null;
                if (actions && actions[j]) clickAction = actions[letterIndex];
                wordToRender.push(
                    <PageTitleLetter 
                        letter={word[j]} 
                        index={letterIndex} 
                        onClick={clickAction}
                        key={`titleLetter_${letterIndex}`}
                    />
                );
                letterIndex++;
            }
            wordsToRender.push(
                <div className="page-title-word" key={`titleWord_${i}`}>{wordToRender}</div>
            );
        }

        return wordsToRender;
    }

    useEffect(() => {
        setTitleToRender(getTitleToRender());
    }, [title])

    return (
        <div className="page-title">
            {titleToRender}
        </div>
    );
}