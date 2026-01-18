import httpStatus from 'http-status';
import {
  createProjectService,
  deleteProjectService,
  getAllProjectService,
  getByIdProjectService,
  getBySlugProjectService,
  updateProjectActiveService,
  updateProjectFeatureService,
  updateProjectService,
} from './projectService';
import { catchAsync } from '../../utils/catchAsync';
import { makeSlug } from '../../utils/makeSlug';
import AppError from '../../errors/AppError';
import { deleteFile } from '../../utils/deleteFile';
import { Project } from './projectModel';

export const createProjectController = catchAsync(async (req, res, next) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  const thumbnail = files.thumbnail[0].filename;
  const galleries = files.gallery ? files.gallery.map((f) => f.filename) : [];

  try {
    const { title } = req.body;

    const Project = {
      ...req.body,
      thumbnail: `/project/${thumbnail}`,
      galleries:
        galleries?.length > 0
          ? galleries.map((gallery: string) => `/project/${gallery}`)
          : [],
      slug: makeSlug(title),
    };

    const result = await createProjectService(Project);

    res.status(200).json({
      success: true,
      message: 'Project add successfully',
      data: result,
    });
  } catch (error) {
    next(error);
    if (thumbnail) deleteFile(`./uploads/project/${thumbnail}`);
    if (galleries?.length > 0) {
      galleries.forEach((gallery: string) => {
        deleteFile(`./uploads/project/${gallery}`);
      });
    }
  }
});

export const getAllProjectController = catchAsync(async (req, res) => {
  const { meta, data } = await getAllProjectService(req.query);

  res.status(200).json({
    success: true,
    message: 'Project get successfully',
    meta,
    data,
  });
});

export const getByIdProjectController = catchAsync(async (req, res) => {
  const result = await getByIdProjectService(req.params.id);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Project not found');

  res.status(200).json({
    success: true,
    message: 'Project get successfully',
    data: result,
  });
});

export const getBySlugProjectController = catchAsync(async (req, res) => {
  const result = await getBySlugProjectService(req.params.slug);
  if (!result) throw new AppError(httpStatus.NOT_FOUND, 'Project not found');

  res.status(200).json({
    success: true,
    message: 'Project get successfully',
    data: result,
  });
});

export const updateProjectController = catchAsync(async (req, res, next) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const thumbnail = files?.thumbnail ? files?.thumbnail[0].filename : null;

  const newGalleries = files?.gallery
    ? files.gallery.map((f) => f.filename)
    : [];

  try {
    const isExits = await Project.findById(req.params.id);
    if (!isExits) throw new AppError(httpStatus.NOT_FOUND, 'Project not found');

    const { title, price, isVariant, variants, stock, galleriesUrl } = req.body;

    const project = {
      ...req?.body,
      slug: makeSlug(title),
      thumbnail: thumbnail ? `/project/${thumbnail}` : isExits?.thumbnail,
      variants: isVariant ? variants : [],
      price: isVariant && variants?.length > 0 ? variants[0].price : price,
      stock:
        isVariant && variants?.length > 0
          ? variants?.reduce(
              (acc: number, variant: { stock: string }) =>
                acc + Number(variant.stock),
              0,
            )
          : stock,
    };

    let finalGalleries: string[] = [];

    if (newGalleries?.length > 0) {
      const newImages = newGalleries.map(
        (gallery: string) => `/project/${gallery}`,
      );

      finalGalleries.push(...finalGalleries, ...newImages);
    }

    if (isExits?.galleries) {
      const filterImages = isExits?.galleries?.filter((gallery: string) =>
        galleriesUrl?.includes(gallery),
      );

      finalGalleries = [...filterImages, ...finalGalleries];
    }

    project.galleries = finalGalleries;

    const result = await updateProjectService(req.params.id, project);

    res.status(200).json({
      success: true,
      message: 'Project update successfully',
      data: result,
    });

    if (result) {
      if (thumbnail && isExits?.thumbnail) {
        deleteFile(`./uploads/${isExits?.thumbnail}`);
      }

      if (galleriesUrl && isExits?.galleries) {
        const deletedImages = isExits?.galleries?.filter(
          (gallery) => !galleriesUrl?.includes(gallery),
        );

        deletedImages?.forEach((image) => {
          deleteFile(`./uploads/${image}`);
        });
      }

      if (!galleriesUrl && (isExits?.galleries?.length ?? 0) > 0) {
        isExits?.galleries?.forEach((image) => {
          deleteFile(`./uploads/${image}`);
        });
      }
    }
  } catch (error) {
    next(error);
    if (newGalleries?.length > 0) {
      newGalleries?.forEach((gallery: string) => {
        deleteFile(`./uploads/project/${gallery}`);
      });
    }
    if (thumbnail) {
      deleteFile(`./uploads/project/${thumbnail}`);
    }
  }
});

export const deleteProjectController = catchAsync(async (req, res) => {
  const { id } = req.params;
  await deleteProjectService(id);

  res.status(200).json({
    success: true,
    message: 'Project deleted successfully',
  });
});

export const updateProjectFeatureController = catchAsync(async (req, res) => {
  const result = await updateProjectFeatureService(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Project feature update successfully',
    data: result,
  });
});

export const updateProjectActiveController = catchAsync(async (req, res) => {
  const result = await updateProjectActiveService(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Project active status update successfully',
    data: result,
  });
});
