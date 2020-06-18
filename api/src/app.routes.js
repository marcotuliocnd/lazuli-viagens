import express from 'express';
import AppController from './app.controller';

const route = express.Router();
const appController = new AppController();

route.get('/', appController.status);

export default route;
