import type { IConcerns } from "./concernsInterface";

export type IConcernProduct = {
  _id: string;
  title: string;
  description: string;
  image: string;
  concern: IConcerns;
};
