export type IAwards = {
  _id: string;
  image: string;
  title: string;
  slug: string;
  description?: string;
  organization?: string;
  year?: number;
  order: number;
};
