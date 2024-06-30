
/*import { Request, Response } from 'express';
import UserService from '@services/UserService';
import UserController from '@controllers/UserController';
import { UserCreationAttributes } from '@models/User';
*/
/*describe('UserController', () => {
  let userService: UserService;
  let userController: UserController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    userService = new UserService();
    userController = new UserController(userService);
    
    req = {
      body: {} as UserCreationAttributes
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should create a new user', async () => {
    const userDetails = { email: 'test@example.com', password: 'password' };
    req.body = userDetails;

    jest.spyOn(userService, 'createUser').mockResolvedValue(userDetails as any);

    await userController.createUser(req as Request, res as Response);

    expect(userService.createUser).toHaveBeenCalledWith(userDetails);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(userDetails);
  });

  // Additional tests...
});
*/