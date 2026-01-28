import httpStatus from 'http-status';
import AppError from '../../../errors/AppError';
import { deleteFile } from '../../../utils/deleteFile';
import { IChairmanQuote } from './chairmanQuoteInterface';
import { ChairmanQuote } from './chairmanQuoteModel';

export const addChairmanQuoteService = async (data: IChairmanQuote) => {
  const result = await ChairmanQuote.create(data);
  return result;
};

export const getAllChairmanQuoteService = async () => {
  const result = await ChairmanQuote.find({});
  return result;
};

export const getSingleChairmanQuoteService = async (id: string) => {
  const result = await ChairmanQuote.findById(id);
  return result;
};

export const updateChairmanQuoteService = async (
  id: string,
  data: IChairmanQuote,
) => {
  const isExist = await ChairmanQuote.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'ChairmanQuote not found !');

  const result = await ChairmanQuote.findByIdAndUpdate(id, data, { new: true });
  if (result && data?.image) deleteFile(`./uploads/${isExist?.image}`);
  return result;
};

export const deleteChairmanQuoteService = async (id: string) => {
  const isExist = await ChairmanQuote.findById(id);
  if (!isExist)
    throw new AppError(httpStatus.NOT_FOUND, 'ChairmanQuote not found !');

  await ChairmanQuote.findByIdAndDelete(id);

  if (isExist.image) deleteFile(`./uploads/${isExist?.image}`);

  return true;
};
