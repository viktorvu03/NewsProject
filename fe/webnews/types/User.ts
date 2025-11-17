export type UserLoginReuest = {
  user: string;
  password: string;
};
export type UserLoginmResponse = {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  status: string;
  createTime: string;
  updateTime: string;
};
export type UserRegisReuest = {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  role: string;
  status: string;
  createTime: string;
  updateTime: string;
};
