import { Request, Response,NextFunction  } from 'express';
import UserService from '@services/UserService';

class UserController {
  private userService:  UserService;
//dependency injection design pattern
  constructor(userService:  UserService) {
    this.userService = userService;
  }
  /**
   * Crea un nuovo utente.
   * @param req - La richiesta HTTP.
   * @param res - La risposta HTTP.
   */
  public async createUser(req: Request, res: Response,next: NextFunction): Promise<void> {
    try {
      const userDetails = req.body;
      const newUser = await this.userService.createUser(userDetails);
      res.status(201).json({
        status: 'success',
        data: newUser
      });
    } catch (error) {
      next(error);
    }
  }

  // Altri metodi possono essere aggiunti qui
}

const userService = new UserService();
const userController = new UserController(userService);
export default userController;
