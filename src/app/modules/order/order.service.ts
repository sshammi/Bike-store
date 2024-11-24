import { BikeModel } from '../product/product.model';
import { OrderModel } from './order.model';

export const createOrder = async (
  email: string,
  product: string,
  quantity: number,
  totalPrice: number,
) => {
  const existingProduct = await BikeModel.findById(product);
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
  await existingProduct.save();
  const newOrder = await OrderModel.create({
    email,
    product,
    quantity,
    totalPrice,
  });

  return newOrder;
};
export const calculateTotalRevenue = async () => {
  const result = await OrderModel.aggregate([
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
};

export const orderService = { createOrder, calculateTotalRevenue };
