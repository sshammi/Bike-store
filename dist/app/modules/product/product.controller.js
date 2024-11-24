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
exports.BikeController = void 0;
const product_service_1 = require("./product.service");
const product_model_1 = require("./product.model");
const createBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bike: bikeData } = req.body;
        const newBike = new product_model_1.BikeModel(bikeData);
        const result = yield newBike.save();
        res.status(200).json({
            message: 'Bike created successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve bikes',
            success: false,
            error,
        });
    }
});
const getAllBikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        let filter = {};
        const validFilterFields = ['name', 'brand', 'category'];
        if (searchTerm &&
            typeof searchTerm === 'string' &&
            searchTerm.trim().length > 0) {
            filter = {
                $or: validFilterFields.map((field) => ({
                    [field]: searchTerm,
                })),
            };
        }
        const result = yield product_service_1.BikeService.getAllBikeFromDB(filter);
        res.status(200).json({
            message: 'Bikes retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to retrieve bikes',
            success: false,
            error,
        });
    }
});
const getSingleBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bikeID } = req.params;
        const result = yield product_service_1.BikeService.getSingleBikeFromDB(bikeID);
        if (!result) {
            return res.status(404).json({
                message: 'Bike not found',
                status: false,
                data: {},
            });
        }
        res.status(200).json({
            message: 'Bike retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Failed to retrieve bike',
            success: false,
            error,
        });
    }
});
const updateBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bikeID } = req.params;
        const updatedBikeData = req.body;
        const updatedBike = yield product_service_1.BikeService.updateBike(bikeID, updatedBikeData);
        if (!updatedBike) {
            return res.status(404).json({
                message: 'Bike not found',
                status: false,
                data: {},
            });
        }
        res.status(200).json({
            message: 'Bike updated successfully',
            success: true,
            data: updatedBike,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to update bike',
            success: false,
            error,
        });
    }
});
const DeleteBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bikeID } = req.params;
        const deletedBike = yield product_service_1.BikeService.deleteBike(bikeID);
        if (!deletedBike) {
            return res.status(404).json({
                message: 'Bike not found',
                status: false,
                data: {},
            });
        }
        res.status(200).json({
            message: 'Bike deleted successfully',
            status: true,
            data: {},
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Failed to delete bike',
            status: false,
            error: error.message || 'Internal server error',
        });
    }
});
exports.BikeController = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    DeleteBike,
};
