import { model, Schema } from 'mongoose';
import { Bike } from './product.interface';

const bikeSchema = new Schema<Bike>(
  {
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
        validator: function (v: string) {
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
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const BikeModel = model<Bike>('Bike', bikeSchema);
