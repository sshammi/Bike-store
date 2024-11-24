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
exports.orderService = exports.calculateTotalRevenue = exports.createOrder = void 0;
const product_model_1 = require("../product/product.model");
const order_model_1 = require("./order.model");
const createOrder = (email, product, quantity, totalPrice) => __awaiter(void 0, void 0, void 0, function* () {
    const existingProduct = yield product_model_1.BikeModel.findById(product);
    if (!existingProduct) {
        throw new Error('Product not found');
    }
    if (existingProduct.quantity < quantity) {
        throw new Error('Insufficient stock');
    }
    existingProduct.quantity -= quantity;
    if (existingProduct.quantity === 0) {
        existingProduct.inStock = false;
    }
    yield existingProduct.save();
    const newOrder = yield order_model_1.OrderModel.create({
        email,
        product,
        quantity,
        totalPrice,
    });
    return newOrder;
});
exports.createOrder = createOrder;
const calculateTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.aggregate([
        {
            $lookup: {
                from: 'bikes',
                localField: 'product',
                foreignField: '_id',
                as: 'bikeDetails',
            },
        },
        {
            $unwind: '$bikeDetails',
        },
        {
            $addFields: {
                orderRevenue: { $multiply: ['$bikeDetails.price', '$quantity'] },
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$orderRevenue' },
            },
        },
    ]);
    return result.length > 0 ? result[0].totalRevenue : 0;
});
exports.calculateTotalRevenue = calculateTotalRevenue;
exports.orderService = { createOrder: exports.createOrder, calculateTotalRevenue: exports.calculateTotalRevenue };
