"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeModel = void 0;
const mongoose_1 = require("mongoose");
const bikeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Bike name is required'],
        trim: true,
        minlength: [1, 'Bike name is required'],
        maxlength: [50, 'Bike name cannot exceed 50 characters'],
    },
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        trim: true,
        minlength: [1, 'Brand name is required'],
        maxlength: [50, 'Brand name cannot exceed 30 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price must be a positive number'],
    },
    category: {
        type: String,
        enum: ['Mountain', 'Road', 'Hybrid', 'Electric'],
        required: [true, 'Category is required'],
        validate: {
            validator: function (v) {
                return ['Mountain', 'Road', 'Hybrid', 'Electric'].includes(v);
            },
            message: (props) => `${props.value} is not a valid category`,
        },
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [1, 'Description is required'],
        maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity cannot be negative'],
        validate: {
            validator: Number.isInteger,
            message: 'Quantity must be an integer',
        },
    },
    inStock: {
        type: Boolean,
        required: [true, 'inStock is required'],
    },
}, {
    timestamps: true,
    versionKey: false,
});
exports.BikeModel = (0, mongoose_1.model)('Bike', bikeSchema);
