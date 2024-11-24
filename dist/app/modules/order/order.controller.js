"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const getOrderBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, product, quantity, totalPrice } = req.body;
        if (!email || !product || !quantity || !totalPrice) {
            return res.status(400).json({
                message: 'Invalid request data',
                status: false,
            });
        }
        const newOrder = yield (0, order_service_1.createOrder)(email, product, quantity, totalPrice);
        res.status(200).json({
            message: 'Order created successfully',
            status: true,
            data: newOrder,
        });
    }
    catch (error) {
        res.status(404).json({
            message: error.message || 'Failed to create order',
            status: false,
        });
    }
});
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalRevenue = yield (0, order_service_1.calculateTotalRevenue)();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to calculate revenue',
            status: false,
            error: error.message,
        });
    }
});
exports.orderController = { getOrderBike, calculateRevenue };
