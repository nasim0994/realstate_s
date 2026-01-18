import { Types } from 'mongoose';

export type IProject = {
  thumbnail: string;
  galleries?: string[];
  title: string;
  slug: string;
  description: string;

  type: Types.ObjectId;
  status: 'ongoing' | 'upcoming' | 'completed';

  location: string;
  landArea: string;
  facing: string;
  storied: string;
  layout: string;
  aptSize: string;
  handoverDate: Date;
  googleMapEmbedLink: string;

  isHighlight: boolean;
  isFeatured: boolean;
  isActive: boolean;
};
