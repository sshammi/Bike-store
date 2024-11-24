"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/create-a-bike', product_controller_1.BikeController.createBike);
router.get('/', product_controller_1.BikeController.getAllBikes);
router.get('/:bikeID', product_controller_1.BikeController.getSingleBike);
router.put('/:bikeID', product_controller_1.BikeController.updateBike);
router.delete('/:bikeID', product_controller_1.BikeController.DeleteBike);
exports.BikeRoutes = router;
