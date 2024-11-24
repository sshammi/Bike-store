import express, { Application } from 'express';
import cors from 'cors';
import { BikeRoutes } from './app/modules/product/product.route';
import { OrderRoutes } from './app/modules/order/order.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', BikeRoutes);
app.use('/api/orders', OrderRoutes);

export default app;
