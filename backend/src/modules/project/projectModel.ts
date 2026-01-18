import { model, Schema } from 'mongoose';
import { IProject } from './projectInterface';

const projectSchema = new Schema<IProject>(
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
    type: {
      type: Schema.Types.ObjectId,
      ref: 'ProjectType',
      required: true,
    },
    status: {
      type: String,
      enum: ['ongoing', 'upcoming', 'completed'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    landArea: {
      type: String,
      required: true,
    },
    facing: {
      type: String,
      required: true,
    },
    storied: {
      type: String,
      required: true,
    },
    layout: {
      type: String,
      required: true,
    },
    aptSize: {
      type: String,
      required: true,
    },
    handoverDate: {
      type: Date,
      required: true,
    },
    googleMapEmbedLink: {
      type: String,
      required: true,
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
    isHighlight: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Project = model<IProject>('Project', projectSchema);
