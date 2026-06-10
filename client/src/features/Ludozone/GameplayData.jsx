import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectList } from "./ludozoneSlice.js";
import Graph from "../../components/Graphs/Graph.jsx";

export default function GameplayData() {
    const [mounted, setMounted] = useState(false);
    const list = useSelector(selectList);

    const [data, setData] = useState(null);

    useEffect(() => {
        if (!mounted && list && list.length) {
            getData(list);
            setMounted(true);
        }
    }, [list]);

    function getData(list) {
        let oldest = list[0];
        let newest = list[0];

        let completedByDay = {};
        let completedByMonth = {
            January: 0,
            February: 0,
            March: 0,
            April: 0,
            May: 0,
            June: 0,
            July: 0,
            August: 0,
            September: 0,
            October: 0,
            November: 0,
            December: 0,
        };
        let completedByYear = {};
        let completedByDayOfTheWeek = {
            "Sunday": 0, 
            "Monday": 0, 
            "Tuesday": 0, 
            "Wednesday": 0, 
            "Thursday": 0, 
            "Friday": 0, 
            "Saturday": 0,
        };
        
        let releasedByDay = {};
        let releasedByMonth = {...completedByMonth};
        let releasedByYear = {};

        let platform = {};

        for (let i = 0; i < list.length; i++) {
            const game = list[i];

            const releasedEpoch = parseInt(game.released_epoch);

            const releaseSplit = game.released_date.split(' ');
            const completeSplit = game.completed_min_date.split(' ');

            const releaseYear = releaseSplit[2];
            const releaseMonth = releaseSplit[0];
            const releaseDay = releaseSplit[1].split(',')[0];

            const completeYear = completeSplit[2];
            const completeMonth = completeSplit[0];
            const completeDay = completeSplit[1].split(',')[0];

            const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            const completeDayOfTheWeek = dayNames[new Date(game.completed_min).getDay()];

            if (releasedEpoch < parseInt(oldest.released_epoch)) {
                oldest = game;
            } else if (releasedEpoch > parseInt(newest.released_epoch)) {
                newest = game;
            }

            if (game.completed_min_date !== 'February 27, 1994') {
                addGameData(completedByYear, completeYear);
                addGameData(completedByMonth, completeMonth);
                addGameData(completedByDay, completeDay);
                addGameData(completedByDayOfTheWeek, completeDayOfTheWeek);
            }

            addGameData(releasedByYear, releaseYear);
            addGameData(releasedByMonth, releaseMonth);
            addGameData(releasedByDay, releaseDay);

            addGameData(platform, game.platform);
        }

        setData({
            newest: newest,
            oldest: oldest,
            completedByYear: sortObjectByKey(completedByYear),
            completedByMonth: completedByMonth,
            completedByDay: completedByDay,
            completedByDayOfTheWeek: completedByDayOfTheWeek,
            releasedByYear: sortObjectByKey(releasedByYear),
            releasedByMonth: releasedByMonth,
            releasedByDay: releasedByDay,
            platform: sortObjectByValue(platform),
        });

        function addGameData(obj, prop) {
            if (!obj[prop]) {
                obj[prop] = 1;
            } else {
                obj[prop]++;
            }
        }

        function sortObjectByKey(object) {
            let sorted = {};

            let k = Object.keys(object);

            k.sort(function(a, b) {
                return a - b;
            });

            for (let i = 0; i < k.length; i++) {
                sorted[k[i]] = object[k[i]];
            }

            return sorted;
        }

        function sortObjectByValue(object, asc = false) {
            let sorted = {};

            let k = Object.keys(object);
            let v = Object.values(object);
            let arr = [];
            
            for (let i = 0; i < k.length; i++) {
                arr.push([k[i], v[i]]);
            }

            arr.sort(function(a, b) {
                if (asc)
                    return a[1] - b[1];
                else
                    return b[1] - a[1];
            });

            for (let i = 0; i < arr.length; i++) {
                sorted[arr[i][0]] = arr[i][1];
            }

            return sorted;
        }
    }



    return (
        <div className="gameplay-data">
            <h1>DATA</h1>
            {mounted &&
                <>
                <section>
                    <h2></h2>
                    <div className="gameplay-data-item">
                        <h3>Total games completed:</h3>
                        <p className="total-beaten">{list.length}</p>
                    </div>
                    <div className="gameplay-data-item">
                        <h3>Newest game completed:</h3>
                        <p>{`${data.newest.name} (${data.newest.released_date})`}</p>
                    </div>
                    <div className="gameplay-data-item">
                        <h3>Oldest game completed:</h3>
                        <p>{`${data.oldest.name} (${data.oldest.released_date})`}</p>
                    </div>
                </section>
                <section>
                    <h2></h2>
                    <div className="gameplay-data-graph">
                        <h3>By Year Completed</h3>
                        <Graph data={data.completedByYear} />
                    </div>
                    <div className="gameplay-data-graph">
                        <h3>By Month Completed</h3>
                        <Graph data={data.completedByMonth} />
                    </div>
                    <div className="gameplay-data-graph">
                        <h3>By Day Completed</h3>
                        <Graph data={data.completedByDayOfTheWeek} />
                    </div>
                    <div className="gameplay-data-graph">
                        <h3>By Year Released</h3>
                        <Graph data={data.releasedByYear} />
                    </div>
                    <div className="gameplay-data-graph">
                        <h3>By Platform</h3>
                        <Graph data={data.platform} />
                    </div>
                </section>
                </>
            }
        </div>
    );
}