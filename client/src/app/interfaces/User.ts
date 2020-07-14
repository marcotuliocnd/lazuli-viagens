export interface IUser {
  deleted: boolean;
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  cpf: string;
  rg: string;
  birthdate_at: Date;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  avatar_url?: any;
  id: string;
}

export interface Role {
  _id: string;
  deleted: boolean;
  slug_history: string[];
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
