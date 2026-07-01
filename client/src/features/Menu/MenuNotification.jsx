import { useState, useEffect, useRef } from "react";

import { ignoreTransformTransitionTemp, ignoreTransition, ignoreTransitionTemp } from "../../utils/effects";
import { selectInventory } from "../../gameSlice";

export default function MenuNotification({ message }) {
    const [mounted, setMounted] = useState(false);
    const [cards, setCards] = useState([
        {
            message: '',
            index: 3,
            open: false,
        },
        {
            message: '',
            index: 0,
            open: false,
        },
        {
            message: '',
            index: 1,
            open: false,
        },
        {
            message: '',
            index: 2,
            open: false,
        },
    ]);

    const nextIndexRef = useRef(0);

    const containerRef = useRef(null);
    const cardsRef = useRef([null, null, null, null]);
    const timeoutsRef = useRef([null, null, null, null]);

    const delay = 1400;

    useEffect(() => {
        if (!mounted && containerRef.current) {
            cardsRef.current = [...containerRef.current.children];
            setMounted(true);
        }
    }, [containerRef.current]);

    useEffect(() => {
        if (message) {
            displayMessage(message);
        }
    }, [message]);

    function displayMessage(message) {
        const newCards = [...cards];
        const index = new Number(nextIndexRef.current);

        newCards[index].message = message;
        newCards[index].open = true;

        if (timeoutsRef.current[index]) {
            clearTimeout(timeoutsRef.current[index]);
        }
        timeoutsRef.current[index] = setTimeout(() => {
            closeCard(index);
        }, delay);

        for (let i = 0; i < newCards.length; i++) {
            let newIndex = newCards[i].index + 1;
            if (newIndex > newCards.length - 1) newIndex = 0;
            newCards[i].index = newIndex;
        }

        ignoreTransformTransitionTemp(cardsRef.current[index], 'translate(0, 0) scale(1)');
        ignoreTransitionTemp(cardsRef.current[index], 'opacity', '1');
        ignoreTransitionTemp(cardsRef.current[index], 'width', '0px');

        setCards(newCards);

        let next = nextIndexRef.current - 1;
        if (next < 0) next = cardsRef.current.length - 1;
        nextIndexRef.current = next;
    }

    function closeCard(index) {
        const newCards = [...cards];
        newCards[index].open = false;
        setCards(newCards);
    }

    function toggleIsOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <div id="menu-notification-container" ref={containerRef}>
            <MNotification 
                message={cards[0].message} 
                index={cards[0].index} 
                open={cards[0].open}
            />
            <MNotification 
                message={cards[1].message} 
                index={cards[1].index} 
                open={cards[1].open}
            />
            <MNotification 
                message={cards[2].message} 
                index={cards[2].index} 
                open={cards[2].open}
            />
            <MNotification 
                message={cards[3].message} 
                index={cards[3].index} 
                open={cards[3].open}
            />
        </div>
    );
}

function MNotification({ message, index, open }) {
    const [toRender, setToRender] = useState(null);

    useEffect(() => {
        if (message) {
            setToRender(parseMessage(message));
        }
    }, [message]);

    function parseMessage(message) {
        let parsed;

        const itemReg = /<item>([^>]+)<\/item>/ig;
        const boldReg = /<bold>([^>]+)<\/bold>/ig;
        const tagReg = /<[^>]+>/ig;

        const itemName = itemReg.exec(message)[1];
        const b = message.split(itemReg);
        b[b.indexOf(itemName)] = <span className="item-flair">{itemName}</span>;
        parsed = b;

        return <p key={`notificationMessage_${message}`}>{parsed}</p>;
    }

    return (
        <div className={`menu-notification index-${index} ${open ? 'open' : ''}`}>
            <div className="menu-notification-wrapper">
                {toRender}
            </div>
        </div>
    );
}