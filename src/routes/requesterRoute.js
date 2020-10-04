import Router from 'express';
import multiparty from 'connect-multiparty';
import requesterController from '../controllers/requesterController';
import { validateRequest, validateFilter } from '../middlewares/validateMiddlewares';

const multipart = multiparty();
const router = Router();
router
  .get('/fetch-tasks', requesterController.viewTasks)
  .get('/fetch-task/:id', requesterController.viewTask)
  .delete('/delete-task/:id', requesterController.deleteTask)
  .post('/filter-tasks', validateFilter, requesterController.filterTask)
  .post('/request-task', multipart, validateRequest, requesterController.requestTask);

export default router;
