
import Background from '../Background/Background';
import './hotFire.css';

import HotFireTitle from "./HotFireTitle";


export default function HotFire() {


    return (
        <>
        <div id="hot-fire">
            <HotFireTitle />
        </div>
        <Background type="hotFire" />
        </>
    );
}