import { ICourse } from "./course";

export interface IMyCourse {
  _id?: string;
  course?: ICourse;
  percentProgress?: number;
  isPaid?: boolean;
}

