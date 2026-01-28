import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { deleteFile } from '../../utils/deleteFile';
import QueryBuilder from '../../builders/QueryBuilder';
import { IConcernProduct } from './concernProductInterface';
import { ConcernProduct } from './concernProductModel';

export const addConcernProductService = async (data: IConcernProduct) => {
  const result = await ConcernProduct.create(data);
  return result;
};

export const getAllConcernProductService = async (
  query: Record<string, unknown>,
) => {
  const result = new QueryBuilder(
    ConcernProduct.find().populate('concern'),
    query,
  )
    .search(['title'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await result.countTotal();
  const data = await result.modelQuery;

  return {
    meta,
    data,
  };
};

export const getSingleConcernProductService = async (id: string) => {
  const result = await ConcernProduct.findById(id).populate('concern');
  return result;
};

export const updateConcernProductService = async (
  id: string,
  data: IConcernProduct,
) => {
  const isExist = await ConcernProduct.findById(id);
  if (!isExist) {
    deleteFile(`./uploads/${data?.image}`);
    throw new AppError(httpStatus.NOT_FOUND, 'ConcernProduct not found !');
  }

  const result = await ConcernProduct.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (result && data?.image) deleteFile(`./uploads/${isExist?.image}`);
  return result;
};

export const deleteConcernProductService = async (id: string) => {
  const isExist = await ConcernProduct.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'ConcernProduct not found !');
  }

  await ConcernProduct.findByIdAndDelete(id);
  deleteFile(`./uploads/${isExist?.image}`);
  return true;
};

export const getConcernProductCountService = async () => {
  const totalConcernProducts = await ConcernProduct.countDocuments();
  return { totalConcernProducts };
};
