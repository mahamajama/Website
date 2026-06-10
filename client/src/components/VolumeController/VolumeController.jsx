import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import './volumeController.css';
import { selectMasterVolume, setMasterVolume } from "../../features/Audio/audioSlice";

export default function VolumeController() {
    const dispatch = useDispatch();
    const [displayVolume, setDisplayVolume] = useState(10);
    const lastVolume = useRef(5);
    const masterVolume = useSelector(selectMasterVolume);

    function mute() {
        lastVolume.current = displayVolume;

        setDisplayVolume(0);
        dispatch(setMasterVolume(0));
    }

    function updateVolume(displayVolume) {
        const tenthVolume = displayVolume * 0.1
        const newVolume = tenthVolume * tenthVolume;

        setDisplayVolume(displayVolume);
        dispatch(setMasterVolume(newVolume));
    }

    function handleChangeVolume(e) {
        const newDisplayVolume = e.target.value;
        updateVolume(newDisplayVolume);
    }

    function handleClickMute() {
        if (displayVolume == 0) {
            updateVolume(lastVolume.current);
        } else {
            mute();
        }
    }

    return (
        <div className="volume-controller">
            <div className="volume-slider-wrapper">
                <input 
                    type="range" 
                    id="volume" 
                    name="volume" 
                    min="0" 
                    max="10" 
                    step="any"
                    value={displayVolume}
                    onChange={handleChangeVolume}
                />
            </div>
            <button onClick={handleClickMute} type="button">
                <img className={`volume-icon ${displayVolume == 0 ? 'hidden' : ''}`} src={`icons/soundOn.svg`} />
                <img className={`volume-icon ${displayVolume != 0 ? 'hidden' : ''}`} src={`icons/soundOff.svg`} />
            </button>
            <p className="volume-controller-current">{parseFloat(displayVolume).toFixed(1)}</p>
        </div>
    );
}