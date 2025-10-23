

export default function PageTitleLetter({ letter, index, onClick }) {
    const delay = 0.25;
    const style = {
        animationDelay: `${index * delay}s`,
    }

    function handleClick(e) {
        if (onClick) onClick(e);
    }

    return(
        <div className="letter-container" style={style} onClick={handleClick}>
            <div className="letter-action-container">
                <h1 className="select-disable">{letter ? letter : 'F'}</h1>
            </div>
        </div>
    );
}