import httpStatus from 'http-status';
import {
  createPhotoGalleryService,
  deletePhotoGalleryService,
  getAllPhotoGalleryService,
  getByIdPhotoGalleryService,
  getBySlugPhotoGalleryService,
  updatePhotoGalleryService,
} from './photoGalleryService';
import { makeSlug } from '../../../utils/makeSlug';
import { catchAsync } from '../../../utils/catchAsync';
import { deleteFile } from '../../../utils/deleteFile';
import AppError from '../../../errors/AppError';
import { PhotoGallery } from './photoGalleryModel';

export const createPhotoGalleryController = catchAsync(
  async (req, res, next) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    console.log('data', req.body);

    const thumbnail = files.thumbnail[0].filename;
    const galleries = files.gallery ? files.gallery.map((f) => f.filename) : [];

    try {
      const { title } = req.body;

      const PhotoGallery = {
        ...req.body,
        thumbnail: `/photoGallery/${thumbnail}`,
        galleries:
          galleries?.length > 0
            ? galleries.map((gallery: string) => `/photoGallery/${gallery}`)
            : [],
        slug: makeSlug(title),
      };

      const result = await createPhotoGalleryService(PhotoGallery);

      res.status(200).json({
        success: true,
        message: 'PhotoGallery add successfully',
        data: result,
      });
    } catch (error) {
      next(error);
      if (thumbnail) deleteFile(`./uploads/photoGallery/${thumbnail}`);
      if (galleries?.length > 0) {
        galleries.forEach((gallery: string) => {
          deleteFile(`./uploads/photoGallery/${gallery}`);
        });
      }
    }
  },
);

export const getAllPhotoGalleryController = catchAsync(async (req, res) => {
  const { meta, data } = await getAllPhotoGalleryService(req.query);

  res.status(200).json({
    success: true,
    message: 'PhotoGallery get successfully',
    meta,
    data,
  });
});

export const getByIdPhotoGalleryController = catchAsync(async (req, res) => {
  const result = await getByIdPhotoGalleryService(req.params.id);
  if (!result)
    throw new AppError(httpStatus.NOT_FOUND, 'PhotoGallery not found');

  res.status(200).json({
    success: true,
    message: 'PhotoGallery get successfully',
    data: result,
  });
});

export const getBySlugPhotoGalleryController = catchAsync(async (req, res) => {
  const result = await getBySlugPhotoGalleryService(req.params.slug);
  if (!result)
    throw new AppError(httpStatus.NOT_FOUND, 'PhotoGallery not found');

  res.status(200).json({
    success: true,
    message: 'PhotoGallery get successfully',
    data: result,
  });
});

export const updatePhotoGalleryController = catchAsync(
  async (req, res, next) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // 1. New Files handle kora
    const thumbnailFile = files?.thumbnail
      ? files?.thumbnail[0].filename
      : null;
    const newGalleryFiles = files?.gallery
      ? files.gallery.map((f) => f.filename)
      : [];

    try {
      const isExits = await PhotoGallery.findById(req.params.id);
      if (!isExits) {
        // delete uploaded filw if any
        if (newGalleryFiles.length > 0) {
          newGalleryFiles.forEach((f) =>
            deleteFile(`./uploads/photoGallery/${f}`),
          );
        }
        if (thumbnailFile) {
          deleteFile(`./uploads/photoGallery/${thumbnailFile}`);
        }
        throw new AppError(httpStatus.NOT_FOUND, 'PhotoGallery not found');
      }

      // Frontend theke asha data (Stringify kora JSON ke parse kora)
      const bodyData = req.body;
      const existingGalleries = bodyData?.existingGalleries || [];

      // 2. Thumbnail Logic
      const updatedThumbnail = thumbnailFile
        ? `/photoGallery/${thumbnailFile}`
        : isExits?.thumbnail;

      // 3. Galleries Logic
      // Prothome frontend theke asha 'existingGalleries' gulo rakhbo (ja user delete kore nai)
      let finalGalleries: string[] = [...existingGalleries];

      // Tarpor notun upload kora chobi gulo add korbo
      if (newGalleryFiles.length > 0) {
        const newImages = newGalleryFiles.map(
          (filename) => `/photoGallery/${filename}`,
        );
        finalGalleries = [...finalGalleries, ...newImages];
      }

      // 4. Update Object Prepare
      const PhotoGalleryUpdateData = {
        ...bodyData,
        slug: makeSlug(bodyData?.title),
        thumbnail: updatedThumbnail,
        galleries: finalGalleries,
      };

      const result = await updatePhotoGalleryService(
        req.params.id,
        PhotoGalleryUpdateData,
      );

      res.status(200).json({
        success: true,
        message: 'PhotoGallery updated successfully',
        data: result,
      });

      // 5. File System theke purono files delete kora (Success hobar por)
      if (result) {
        if (thumbnailFile && isExits?.thumbnail) {
          deleteFile(`./uploads${isExits.thumbnail}`);
        }

        // Gallery images delete (database-e chilo kintu final list-e nai)
        const imagesToDelete = isExits?.galleries?.filter(
          (oldImg: string) => !existingGalleries.includes(oldImg),
        );

        imagesToDelete?.forEach((image: string) => {
          deleteFile(`./uploads${image}`);
        });
      }
    } catch (error) {
      // Error hole notun upload kora file gulo delete kore dewa
      if (newGalleryFiles.length > 0) {
        newGalleryFiles.forEach((f) =>
          deleteFile(`./uploads/photoGallery/${f}`),
        );
      }
      if (thumbnailFile) {
        deleteFile(`./uploads/photoGallery/${thumbnailFile}`);
      }
      next(error);
    }
  },
);

export const deletePhotoGalleryController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deletePhotoGalleryService(id);

  res.status(200).json({
    success: true,
    message: 'PhotoGallery deleted successfully',
  });
});
