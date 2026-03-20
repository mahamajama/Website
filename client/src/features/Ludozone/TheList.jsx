import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectList, getList } from "./ludozoneSlice.js";
import GameListing from "./GameListing.jsx";

const sortBy = {
    completed: {
        desc: (a, b) => b.completed_max_epoch - a.completed_max_epoch,
        asc: (a, b) => a.completed_max_epoch - b.completed_max_epoch,
    },
    released: {
        desc: (a, b) => b.released_epoch - a.released_epoch,
        asc: (a, b) => a.released_epoch - b.released_epoch,
    },
    alphabetical: {
        asc: (a, b) => {
            const aTrimmed = trimName(a.name);
            const bTrimmed = trimName(b.name);
            if(aTrimmed < bTrimmed) return -1;
            if(aTrimmed > bTrimmed) return 1;
            return 0;
        },
        desc: (a, b) => {
            const aTrimmed = trimName(a.name);
            const bTrimmed = trimName(b.name);
            if(aTrimmed < bTrimmed) return 1;
            if(aTrimmed > bTrimmed) return -1;
            return 0;
        },
    },
}

function trimName(name) {
    let trimmed = name.toLowerCase();
    trimmed = trimmed.trim();

    if (trimmed.slice(0, 2) === `a `) { // starts with 'A '
        trimmed = trimmed.substring(2);
    } else if (trimmed.slice(0, 4) === `the `) { // starts with 'The '
        trimmed = trimmed.substring(4);
    }
    
    return trimmed;
}

export default function TheList() {
    const dispatch = useDispatch();

    const [listToRender, setListToRender] = useState([]);
    const [options, setOptions] = useState({
        sort: 'completed',
        reverse: false,
        platform: 'all',
    });
    const list = useSelector(selectList);

    useEffect(() => {
        if (!list.length) fetchList();

        const sorted = [...list];
        setListToRender(sorted);
    }, [list]);

    useEffect(() => {
        const order = options.reverse ? 'asc' : 'desc';
        const sorted = list.toSorted(sortBy[options.sort][order]);
        setListToRender(sorted);
    }, [options]);

    function fetchList() {
        dispatch(getList());
    }

    function handleChangeSort(sort) {
        let newOptions = {...options};
        if (sort === options.sort) {
            newOptions.reverse = !newOptions.reverse;
        } else {
            newOptions.sort = sort;
            newOptions.reverse = false;
        }
        setOptions(newOptions);
    }

    return (
        <div id="the-list">
            <h1>THE LIST</h1>
            <p>of games I have beaten</p>
            <div className="the-list-options">
                <button onClick={()=>handleChangeSort('completed')} type="button">Completed</button>
                <button onClick={()=>handleChangeSort('released')} type="button">Released</button>
            </div>
            <div className="the-list-data">
                
            </div>
            <ol>
                {listToRender.map((game, i) => {
                    trimName(game.name);
                    return (
                        <GameListing data={game} key={`theList_${i}`} />
                    );
                })}
            </ol>
        </div>
    );
}