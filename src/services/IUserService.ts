import  {UserDTO}  from '@dto/User/UserDTO';

export interface IUserService {
  getUser(id: number): Promise<UserDTO | null>;
  getAllUser(): Promise<UserDTO[]>;
}
