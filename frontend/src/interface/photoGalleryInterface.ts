export type IPhotoGallery = {
  _id: string;
  thumbnail: string;
  galleries?: string[];
  title: string;
  slug: string;
  description: string;
  location: string;
  date: Date;
};
