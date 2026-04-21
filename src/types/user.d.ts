export type User = {
  name: string;
  email: string;
  password: string;
  user_id?: string;
  salt?: string;
  createdAt?: string;
};

export type Login = {
  email: string;
  password: string;
};

export type JwtPayload = {
  payload: {
    user_id: string;
    name: string;
    email: string;
    createdAt: string;
  };
  iat: number;
  exp: number;
};
