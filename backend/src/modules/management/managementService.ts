import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { deleteFile } from '../../utils/deleteFile';
import QueryBuilder from '../../builders/QueryBuilder';
import { IManagement } from './managementInterface';
import { Management } from './managementModel';

export const addManagementService = async (data: IManagement) => {
  const result = await Management.create(data);
  return result;
};

export const getAllManagementService = async (
  query: Record<string, unknown>,
) => {
  const result = new QueryBuilder(Management.find(), query)
    .search(['name', 'designation'])
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

export const getSingleManagementService = async (id: string) => {
  const result = await Management.findById(id);
  return result;
};

export const updateManagementService = async (
  id: string,
  data: IManagement,
) => {
  const isExist = await Management.findById(id);
  if (!isExist) {
    deleteFile(`./uploads/${data?.image}`);
    throw new AppError(httpStatus.NOT_FOUND, 'Management not found !');
  }

  const result = await Management.findByIdAndUpdate(id, data, { new: true });
  if (result && data?.image) deleteFile(`./uploads/${isExist?.image}`);
  return result;
};

export const deleteManagementService = async (id: string) => {
  const isExist = await Management.findById(id);
  if (!isExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Management not found !');
  }

  await Management.findByIdAndDelete(id);
  deleteFile(`./uploads/${isExist?.image}`);
  return true;
};

export const getManagementCountService = async () => {
  const totalManagements = await Management.countDocuments();
  return { totalManagements };
};
