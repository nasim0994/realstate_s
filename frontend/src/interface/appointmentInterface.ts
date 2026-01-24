import type { IProject } from "./projectInterface";

export type IAppointment = {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  occupation: string;
  project: IProject;
  date: Date;
};
