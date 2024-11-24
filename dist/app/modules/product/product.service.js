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
exports.BikeService = void 0;
const product_model_1 = require("./product.model");
const createBikeobDB = (bikeData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.BikeModel.create(bikeData);
    return result;
});
const getAllBikeFromDB = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (filter = {}) {
    const result = yield product_model_1.BikeModel.find(filter);
    return result;
});
const getSingleBikeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.BikeModel.findOne({ _id: id });
    return result;
});
const updateBike = (id, updatedBikeData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.BikeModel.findByIdAndUpdate(id, updatedBikeData, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new Error(`Bike with ID ${id} not found`);
    }
    return result;
});
const deleteBike = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.BikeModel.findByIdAndDelete(id);
    return result;
});
exports.BikeService = {
    createBikeobDB,
    getAllBikeFromDB,
    getSingleBikeFromDB,
    updateBike,
    deleteBike,
};
