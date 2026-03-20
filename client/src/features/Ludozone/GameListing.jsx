import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectList, getList } from "./ludozoneSlice.js";

export default function GameListing({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <li className={`game-listing ${isOpen ? 'open' : ''}`}>
            <button onClick={toggleOpen} type="button">
                <h2 className="game-name">{data.name}</h2>
            </button>
            <div className={`game-listing-details-wrapper ${isOpen ? 'open' : ''}`}>
                <div className={`game-listing-details`}>
                    <div className="game-listing-detail">
                        <h3>Completed:</h3>
                        <p>{data.completed_min_date}</p>
                    </div>
                    {data.started && 
                        <div className="game-listing-detail">
                            <h3>Started:</h3>
                            <p>{data.started}</p>
                        </div>
                    }
                    {data.completion_description &&
                        <div className="game-listing-detail">
                            <h3>Completion Details:</h3>
                            <p>{data.completion_description}</p>
                        </div>
                    }
                    {data.notes &&
                        <div className="game-listing-detail">
                            <h3>Notes:</h3>
                            <p>{data.notes}</p>
                        </div>
                    }
                    {data.released &&
                        <div className="game-listing-detail">
                            <h3>Released:</h3>
                            <p>{data.released_date}</p>
                        </div>
                    }
                    {data.platform && 
                        <div className="game-listing-detail">
                            <h3>Platform:</h3>
                            <p>{data.platform}</p>
                        </div>
                    }
                </div>
            </div>
        </li>
    );
}