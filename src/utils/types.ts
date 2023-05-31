export type CreateUserParams = {
  username: string;
  password: string;
};

export type UpdateUserParams = {
  username: string;
  password: string;
};

export type CreateScooterParams = {
  dateOfManufacture: string;
};

export type UpdateScooterParams = {
  dateOfManufacture: string;
};

export type CreateRentParams = {
  user: number;
  scooter: number;
};
