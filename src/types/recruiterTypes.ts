import { ObjectId } from "mongoose";

export interface recruiterProps {
  active: boolean;
  avatar: string | null;
  email: string;
  name: string;
  password: string;
  role: string;
  company: ObjectId;
}
