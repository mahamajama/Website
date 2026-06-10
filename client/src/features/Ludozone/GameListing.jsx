import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectList, getList } from "./ludozoneSlice.js";

export default function GameListing({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return (
        <>
        <tr className={`game-listing ${isOpen ? 'open' : ''}`}>
            <td className="game-name" onClick={toggleOpen}>{data.name}</td>
            <td>{data.completed_min_date}</td>
            <td>{data.released_date}</td>
            <td>{data.platform}</td>
        </tr>
        <tr colSpan={10} className={`game-listing-details-wrapper ${isOpen ? 'open' : ''}`}>
            <td className={`game-listing-details`}>
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
                {data.started_date &&
                    <td>{data.started_date}</td>
                }
            </td>
        </tr>
        </>
    );
}