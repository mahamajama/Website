

import './ludozone.css';
import Background from '../Background/Background';
import LudozoneTitle from "./LudozoneTitle";
import TheList from "./TheList";


export default function Ludozone() {

    return (
        <>
        <div id="ludozone">
            <LudozoneTitle />
            <img className="jupiter" src='/images/ludozone/jupiterRotationx5.gif' />
            <TheList />
        </div>
        <Background type="ludozone" />
        </>
    );
}