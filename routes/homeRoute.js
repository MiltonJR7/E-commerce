
import express from 'express';
import HomeController from '../controllers/homeController.js';

const controller = new HomeController;
const route = express.Router();

route.get('/', controller.homeView);
export default route;