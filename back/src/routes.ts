import { Router, Request, Response } from 'express';
import { authGuard } from './middlewares/authGuard';

type AuthenticatedRequest = Request & {
    userId?: number;
};

const routes = Router();

const userController = {
    show: (req: AuthenticatedRequest, res: Response) => {
        return res.json({ id: req.userId });
    },
};

routes.get('/perfil', authGuard, userController.show);

export { routes };
