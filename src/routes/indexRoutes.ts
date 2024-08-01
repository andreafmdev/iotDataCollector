import { Request, Response } from 'express';
import { Router } from 'express';
import  userRouter  from '@routes/userRoutes';
import  authRouter  from '@routes/authRoutes';

import measureDataRouter from './measureDataRoutes';
import '@config/container'; // Assicurati che il container venga importato

const routes = Router();
routes.get('/', ( req: Request,res: Response) => {
    res.send('Api response');
});
routes.get('/status', ( req: Request,res: Response) => {
    res.send('Active');
});
routes.post('/postData', (req: Request, res: Response) => {
    res.send(req.body);

});

routes.use('/measure',measureDataRouter);
routes.use('/user',userRouter);
routes.use('/auth',authRouter);

export default routes;
