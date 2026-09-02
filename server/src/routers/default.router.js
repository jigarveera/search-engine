import { Router } from 'express';
import { defaultController } from '../controllers/default.controller.js';

const defaultRouter = Router();

defaultRouter.get('/', defaultController)

export default defaultRouter;