import { Request, Response } from 'express';
import { Router } from 'express';
import  userRouter  from '@routes/userRoutes';
import rawDataRoutes from './rawDataRoutes';
import '@config/container'; // Assicurati che il container venga importato

const routes = Router();
routes.get('/', ( req: Request,res: Response) => {
    console.log('received data on master path');

    res.send('Api response');
});
routes.get('/status', ( req: Request,res: Response) => {
    console.log('received data ');

    res.send('Active');
});
routes.post('/postData', (req: Request, res: Response) => {
    console.log('PostData');
    res.send(req.body);

});
//Raw DATA ROUTES

routes.use('/rawdata',rawDataRoutes);
routes.use('/user',userRouter);
export default routes;
