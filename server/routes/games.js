import express from 'express';
import * as games from '../controllers/games.js';

const router = express.Router();

router.route('/').get(games.getList);

export default router;