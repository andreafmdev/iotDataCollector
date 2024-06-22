import { Request, Response } from 'express';
import { Router } from 'express';

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

export default routes;
