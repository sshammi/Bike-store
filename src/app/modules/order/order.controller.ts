import { Request, Response } from 'express';
import { createOrder, calculateTotalRevenue } from './order.service';

const getOrderBike = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice } = req.body;
    const newOrder = await createOrder(email, product, quantity, totalPrice);
    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: newOrder,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message || 'Failed to create order',
      status: false,
    });
  }
};
const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await calculateTotalRevenue();
    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to calculate revenue',
      status: false,
      error: error.message,
    });
  }
};

export const orderController = { getOrderBike, calculateRevenue };
