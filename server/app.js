"use strict";
import fs from 'fs';
import express from 'express';
import 'dotenv/config';
import https from 'https';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';

import session from './middleware/session.js'
import errorHandler from './middleware/errorHandler.js';
import loadRoutes from './routes/index.js';

const __dirname = import.meta.dirname;

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, }));
app.use(helmet());
app.use(session);
app.use(morgan('dev', { stream: fs.createWriteStream('./app.log', { flags: 'a' }) }));
const routes = loadRoutes(app);

const server = https.Server({
  key: fs.readFileSync("localhost-key.pem"),
  cert: fs.readFileSync("localhost.pem"),
}, app);

app.use(errorHandler);

app.get('/', (req, res) => {
  res.json({ message: `Welcome to Joey's Personal API` });
});

server.listen(port, () => {
  console.log(`App listening on port ${port} at ${Date.now()}`);
});







