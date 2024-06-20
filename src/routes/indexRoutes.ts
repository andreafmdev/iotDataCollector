import { Request, Response } from 'express';
import { Router } from 'express';

const routes = Router();

routes.get('/', ( res: Response) => {
    res.send('Api response');
});
routes.get('/status', ( res: Response) => {
    res.send('Active');
});
routes.post('/postData', (req: Request, res: Response) => {
    console.log('PostData');
    res.send(req.body);

});

export default routes;
