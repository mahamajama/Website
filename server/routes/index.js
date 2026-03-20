import gamesRouter from './games.js';

export default function routes(app) {
    app.use('/api/games', gamesRouter);
}