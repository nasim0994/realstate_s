import type { IProjectType } from "./projectTypeInterface";

export type IProject = {
  _id: string;
  thumbnail: string;
  galleries?: string[];
  title: string;
  slug: string;
  description: string;

  type: IProjectType;
  status: "ongoing" | "upcoming" | "completed";

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
