export type User = {
  name: string;
  email: string;
  password: string;
  user_id?: 1;
  salt?: string;
  createdAt?: string;
};

export type Login = {
  email: string;
  password: string;
};

export type JwtPayload = {
  payload: {
    user_id: number;
    name: string;
    email: string;
    createdAt: string;
  };
  iat: number;
  exp: number;
};
