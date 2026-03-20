import * as gamesModel from '../models/games.js';

export const getList = async (req, res, next) => {
    try {
        const list = await gamesModel.getList();
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}