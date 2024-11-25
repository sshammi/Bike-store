import { Request, Response } from 'express';
import { BikeService } from './product.service';
import { BikeModel } from './product.model';

const createBike = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bike: bikeData } = req.body;
    const newBike = new BikeModel(bikeData);
    const result = await newBike.save();
    res.status(200).json({
      message: 'Bike created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to create bikes',
      success: false,
      error,
    });
  }
};

const getAllBikes = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    let filter: any = {};
    const validFilterFields = ['name', 'brand', 'category'];
    if (
      searchTerm &&
      typeof searchTerm === 'string' &&
      searchTerm.trim().length > 0
    ) {
      filter = {
        $or: validFilterFields.map((field) => ({
          [field]: searchTerm,
        })),
      };
    }

    const result = await BikeService.getAllBikeFromDB(filter);
    res.status(200).json({
      message: 'Bikes retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to retrieve bikes',
      success: false,
      error,
    });
  }
};

const getSingleBike = async (req: Request, res: Response) => {
  try {
    const { bikeID } = req.params;
    const result = await BikeService.getSingleBikeFromDB(bikeID);
    res.status(200).json({
      success: true,
      message: 'Bike retrieved successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve bike',
      error,
    });
  }
};

const updateBike = async (req: Request, res: Response) => {
  try {
    const { bikeID } = req.params;
    const updatedBikeData = req.body;
    const updatedBike = await BikeService.updateBike(bikeID, updatedBikeData);
    res.status(200).json({
      message: 'Bike updated successfully',
      success: true,
      data: updatedBike,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to update bike',
      success: false,
      error,
    });
  }
};

const DeleteBike = async (req: Request, res: Response) => {
  try {
    const { bikeID } = req.params;
    const deletedBike = await BikeService.deleteBike(bikeID);
    res.status(200).json({
      message: 'Bike deleted successfully',
      status: true,
      data: {},
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: 'Failed to delete bike',
      status: false,
      error: error.message || 'Internal server error',
    });
  }
};

export const BikeController = {
  createBike,
  getAllBikes,
  getSingleBike,
  updateBike,
  DeleteBike,
};
