export interface IUser {
  deleted: boolean;
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  phone?: string;
  passport_number?: string;
  value?: string;
  currentValue?: string;
  cpf: string;
  rg: string;
  birthdate_at: Date;
  role: Role;
  fidelity: Fidelity,
  fidelity_level: string,
  fidelity_level_last: string,
  fidelity_level_next: string,
  fidelity_started_at: string,
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  avatar_url?: any;
  id: string;
}

export interface Fidelity {
  _id: string,
  deleted: boolean,
  name: string,
  slug: string,
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
