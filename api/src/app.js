import express from 'express';
import https from 'https';
import fs from 'fs';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cors from 'cors';

import routes from './app.routes';

/**
 * Configuration of service
 */
const app = express();
app.use(helmet());
app.use(bodyParser.json({ limit: '20mb', extended: true }));
app.use(cors({
  origin: '*',
  methods: 'POST, GET, PUT, DELETE, OPTIONS, PATCH',
}));

/**
 * Routes
 */
app.use(routes);

/**
 * Initializing server
 */
if (process.env.NODE_ENV === 'PRODUCTION') {
  https.createServer({
    key: fs.readFileSync('/var/etc/certbot/server.key'),
    cert: fs.readFileSync('/var/etc/certbot/server.crt'),
  }, app).listen(process.env.APP_PORT, () => {
    console.log(`> Server is running on port ${process.env.APP_PORT} in mode ${process.env.NODE_ENV}`);
  });
} else {
  app.listen(process.env.APP_PORT, () => {
    console.log(`> Server is running on port ${process.env.APP_PORT} in mode ${process.env.NODE_ENV}`);
  });
}
