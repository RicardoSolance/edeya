export const userTypes = ["jobSeeker", "recruiter", "business"] as const;
export type UserType = (typeof userTypes)[number];

export type genderType = "man" | "woman" | "unknown";
export interface UserProps {
  email: string;
  password: string;
  role: UserType;
  active: boolean;
  name: string;
  surname: string;
  profilePhoto: string | null;
  phone: number | null;
  userType: UserType;
  gender: genderType;
  dateOfBirth: Date;
}
