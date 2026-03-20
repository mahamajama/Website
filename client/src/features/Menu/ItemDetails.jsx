import { useRef, useEffect, useState } from "react";

const initialItemData = {
    name: '',
    displayName: '',
    icon: null,
    fullImage: null,
    description: '',
}

export default function ItemDetails({ item }) {
    const [selection, setSelection] = useState(initialItemData);
    useEffect(() => {
        if (item) setSelection(item);
    }, [item]);

    function handleSubmitCode(e) {
        e.preventDefault();
    }

    return (
        <>
            <div className="selection-image-container">
                <img src={selection.fullImage} />
            </div>
            <div className="selection-details-container">
                <div className="selection-details">
                    <h1>{selection.displayName}</h1>
                    <p>{selection.description}</p>
                    {selection.name === 'ornateBox' &&
                        <form>
                            <div className="item-details-code-input-container">
                                <input className="item-details-code-input" type="text" maxLength="1" />
                                <input className="item-details-code-input" type="text" maxLength="1" />
                                <input className="item-details-code-input" type="text" maxLength="1" />
                                <input className="item-details-code-input" type="text" maxLength="1" />
                                <input className="item-details-code-input" type="text" maxLength="1" />
                                <input className="item-details-code-input" type="text" maxLength="1" />
                            </div>
                            <button className="item-details-submit" type="submit" onClick={handleSubmitCode}>Open the box</button>
                        </form>
                    }
                </div>
            </div>
        </>
    );
}