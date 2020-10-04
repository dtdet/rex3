import Router from 'express';

import requesterRoute from './requesterRoute';

const router = Router();
router.use(requesterRoute);

export default router;
