import {UserDto}  from '@dto/User/UserDto';

export interface IUserService {
  getUser(id: number): Promise<UserDto | null>;
  getAllUser(): Promise<UserDto[]>;
  saveUser(): Promise<UserDto>;

}
