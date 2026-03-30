
import express from 'express';
import ShopController from '../controllers/shopController.js';
import authPublic from "../middleware/middlewarePublic.js";
import auth from "../middleware/middlewareRoutes.js";

const controller = new ShopController;
const route = express.Router();

route.get('/checkout/:id', auth, controller.checkoutView);
route.get('/payment/:id', auth, controller.pagamentoView);
route.get('/shopProduct/:id', authPublic, controller.shopProductView);

route.post('/payment/:id', auth, controller.pagamento);
export default route;
