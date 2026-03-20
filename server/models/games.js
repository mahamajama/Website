import * as db from '../db.js';

const select = {
    default: `games.name as "name", 
        list.started,
        list.completed_min,
        extract(epoch from list.completed_min) AS completed_min_epoch,
        to_char(list.completed_min, 'FMMonth FMDD, YYYY') AS completed_min_date,
        list.completed_max,
        extract(epoch from list.completed_max) AS completed_max_epoch,
        to_char(list.completed_max, 'FMMonth FMDD, YYYY') AS completed_max_date,
        list.completion_description, 
        list.notes, 
        platforms.name as "platform", 
        games.released,
        extract(epoch from games.released) AS released_epoch,
        to_char(games.released, 'FMMonth FMDD, YYYY') AS released_date,
        list.dlc`,
}

const join = {
    default: `JOIN games ON list.game_id = games.id 
        JOIN platforms ON list.platform_id = platforms.id`,
}

const orderBy = {
    completed: {
        old: `ORDER BY list.completed_max DESC`,
        new: `ORDER BY list.completed_max DESC`,
    },
}

export const getList = async () => {
    try {
        const query = `SELECT ${select.default} FROM list ${join.default} ${orderBy.completed.new}`;
        const result = await db.query(query);
        if (result.rows?.length) {
            return result.rows;
        }
        return [];
    } catch (error) {
        throw new Error(error);
    }
}






