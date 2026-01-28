import { model, Schema } from 'mongoose';
import { IPhotoGallery } from './photoGalleryInterface';

const projectSchema = new Schema<IPhotoGallery>(
  {
    thumbnail: {
      type: String,
      required: true,
    },
    galleries: {
      type: [String],
    },
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const PhotoGallery = model<IPhotoGallery>('PhotoGallery', projectSchema);
