import express from 'express';
import { BikeController } from './product.controller';

const router = express.Router();

router.post('/create-a-bike', BikeController.createBike);
router.get('/', BikeController.getAllBikes);
router.get('/:bikeID', BikeController.getSingleBike);
router.put('/:bikeID', BikeController.updateBike);
router.delete('/:bikeID', BikeController.DeleteBike);

export const BikeRoutes = router;
