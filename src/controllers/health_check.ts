import { Request, Response, NextFunction } from 'express';
import logging from '../logger/logging';

const NAMESPACE = 'Sample Controller';

const health_check = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `Health check route called.`);

    return res.status(200).json({ message: 'pong' });
};

export default { health_check };
