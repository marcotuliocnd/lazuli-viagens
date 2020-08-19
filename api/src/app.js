import express from 'express';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

import databaseFactory from './config/database.config';

import routes from './app.routes';

/**
 * Configuration of service
 */
const app = express();
databaseFactory();
app.use(helmet());
app.use(bodyParser.json({ limit: '20mb', extended: true }));
app.use(cors({
  origin: '*',
  methods: 'POST, GET, PUT, DELETE, OPTIONS, PATCH',
}));

/**
 * Routes
 */
app.use('/', routes);
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

/**
 * Initializing server
 */
if (process.env.NODE_ENV === 'PRODUCTION') {
  https.createServer({
    key: fs.readFileSync('/home/seguid/ssl/certs/seguidororganico_com_br_f479d_260f7_1605568481_b71f8e4b6543bebe69434b0abc2043aa.crt'),
    cert: fs.readFileSync('/home/seguid/ssl/keys/f479d_260f7_1fec9854bdb81daf7fd46281711567f2.key'),
  }, app).listen(process.env.APP_PORT, () => {
    console.log(`> Server is running on port ${process.env.APP_PORT} in mode ${process.env.NODE_ENV}`);
  });
} else {
  app.listen(process.env.APP_PORT, () => {
    console.log(`> Server is running on port ${process.env.APP_PORT} in mode ${process.env.NODE_ENV}`);
  });
}
