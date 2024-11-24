import { Bike } from './product.interface';
import { BikeModel } from './product.model';

const createBikeobDB = async (bikeData: Bike) => {
  const result = await BikeModel.create(bikeData);
  return result;
};

const getAllBikeFromDB = async (filter: object = {}) => {
  const result = await BikeModel.find(filter);
  return result;
};

const getSingleBikeFromDB = async (id: string) => {
  const result = await BikeModel.findOne({ _id: id });
  return result;
};

const updateBike = async (id: string, updatedBikeData: any) => {
  const result = await BikeModel.findByIdAndUpdate(id, updatedBikeData, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new Error(`Bike with ID ${id} not found`);
  }
  return result;
};

const deleteBike = async (id: string) => {
  const result = await BikeModel.findByIdAndDelete(id);
  return result;
};

export const BikeService = {
  createBikeobDB,
  getAllBikeFromDB,
  getSingleBikeFromDB,
  updateBike,
  deleteBike,
};
