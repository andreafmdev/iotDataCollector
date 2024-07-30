import { Request, Response, NextFunction } from 'express';
import { injectable } from 'tsyringe';
import { BaseController } from '@controllers/BaseController';
import { UserService } from '@services/UserService';

@injectable()
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  public async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user = await this.userService.getUser(parseInt(req.params.id, 10));
      if (!user) {
        this.handleNotFound(res, 'User not found');
        return;
      }
      this.handleSuccess(res, user);
    } catch (error) {
      this.handleError(res, error);
      next(error);
    }
  }

  public async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await this.userService.getAllUser();
      this.handleSuccess(res, users);
    } catch (error) {
      this.handleError(res, error);
      next(error);
    }
  }
}
