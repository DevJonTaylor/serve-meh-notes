import { Router } from "express";
import { restApiHandler } from "../middleware";
import { get } from 'lodash';
import { getById, getAll, post, put, deleteById, deleteAll } from './logic/notes';

const router = Router();

router.use(restApiHandler);

router.use((req, res, next) => {
  if(req.method === 'get') return next();

})

router.route('/')
  .get(getAll)
  .post(post)
  .delete(deleteAll)

router.route('/:id')
  .get(getById)
  .put(put)
  .delete(deleteById);

export default router;