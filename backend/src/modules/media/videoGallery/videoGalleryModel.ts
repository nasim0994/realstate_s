import { model, Schema } from 'mongoose';
import { IVideoGallery } from './videoGalleryInterface';

const videoGallerySchema = new Schema<IVideoGallery>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  description: { type: String },
  date: { type: String },
  videoLinks: [{ type: String }],
});

export const VideoGallery = model<IVideoGallery>(
  'VideoGallery',
  videoGallerySchema,
);
