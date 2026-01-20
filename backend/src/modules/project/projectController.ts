import httpStatus from 'http-status';
import {
  createProjectService,
  deleteProjectService,
  getAllProjectService,
  getByIdProjectService,
  getBySlugProjectService,
  getProjectCountService,
  updateProjectActiveService,
  updateProjectFeatureService,
  updateProjectHighlightService,
  updateProjectService,
} from './projectService';
import { catchAsync } from '../../utils/catchAsync';
import { makeSlug } from '../../utils/makeSlug';
import AppError from '../../errors/AppError';
import { deleteFile } from '../../utils/deleteFile';
import { Project } from './projectModel';

export const createProjectController = catchAsync(async (req, res, next) => {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  console.log('data', req.body);

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

  // 1. New Files handle kora
  const thumbnailFile = files?.thumbnail ? files?.thumbnail[0].filename : null;
  const newGalleryFiles = files?.gallery
    ? files.gallery.map((f) => f.filename)
    : [];

  try {
    const isExits = await Project.findById(req.params.id);
    if (!isExits) {
      // delete uploaded filw if any
      if (newGalleryFiles.length > 0) {
        newGalleryFiles.forEach((f) => deleteFile(`./uploads/project/${f}`));
      }
      if (thumbnailFile) {
        deleteFile(`./uploads/project/${thumbnailFile}`);
      }
      throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
    }

    // Frontend theke asha data (Stringify kora JSON ke parse kora)
    const bodyData = req.body;
    const existingGalleries = bodyData?.existingGalleries || [];

    // 2. Thumbnail Logic
    const updatedThumbnail = thumbnailFile
      ? `/project/${thumbnailFile}`
      : isExits?.thumbnail;

    // 3. Galleries Logic
    // Prothome frontend theke asha 'existingGalleries' gulo rakhbo (ja user delete kore nai)
    let finalGalleries: string[] = [...existingGalleries];

    // Tarpor notun upload kora chobi gulo add korbo
    if (newGalleryFiles.length > 0) {
      const newImages = newGalleryFiles.map(
        (filename) => `/project/${filename}`,
      );
      finalGalleries = [...finalGalleries, ...newImages];
    }

    // 4. Update Object Prepare
    const projectUpdateData = {
      ...bodyData,
      slug: makeSlug(bodyData?.title),
      thumbnail: updatedThumbnail,
      galleries: finalGalleries,
    };

    const result = await updateProjectService(req.params.id, projectUpdateData);

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: result,
    });

    // 5. File System theke purono files delete kora (Success hobar por)
    if (result) {
      // Thumbnail delete
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
      newGalleryFiles.forEach((f) => deleteFile(`./uploads/project/${f}`));
    }
    if (thumbnailFile) {
      deleteFile(`./uploads/project/${thumbnailFile}`);
    }
    next(error);
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

export const getProjectCountController = catchAsync(async (req, res) => {
  const result = await getProjectCountService();

  res.status(200).json({
    success: true,
    message: 'Project count fetched successfully',
    data: result,
  });
});

export const toggleProjectHighlightController = catchAsync(async (req, res) => {
  const result = await updateProjectHighlightService(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Project highlight updated successfully',
    data: result,
  });
});
