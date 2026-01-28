import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { deleteFile } from '../../../utils/deleteFile';
import QueryBuilder from '../../../builders/QueryBuilder';
import { IHappyClient } from './happyClientInterface';
import { HappyClient } from './happyClientModel';

export const addHappyClientService = async (data: IHappyClient) => {
  const result = await HappyClient.create(data);
  return result;
};

export const getAllHappyClientService = async (
  query: Record<string, unknown>,
) => {
  const result = new QueryBuilder(HappyClient.find(), query)
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

export const getSingleHappyClientService = async (id: string) => {
  const result = await HappyClient.findById(id);
  return result;
};

export const updateHappyClientService = async (
  id: string,
  data: IHappyClient,
) => {
  const isExist = await HappyClient.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'HappyClient not found !');

  const result = await HappyClient.findByIdAndUpdate(id, data, { new: true });
  if (result && data?.image) deleteFile(`./uploads/${isExist?.image}`);
  return result;
};

export const deleteHappyClientService = async (id: string) => {
  const isExist = await HappyClient.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'HappyClient not found !');

  await HappyClient.findByIdAndDelete(id);

  if (isExist.image) deleteFile(`./uploads/${isExist?.image}`);

  return true;
};
