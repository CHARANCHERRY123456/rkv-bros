import express from 'express';
import SearchController from '../controllers/index.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';
import { validate } from '../../../middlewares/validate.js';
import { suggestQuerySchema } from '../validation/search.validation.js';

const router = express.Router();
const searchController = new SearchController();

router.use(authMiddleware);

router.get('/suggest', 
  validate(suggestQuerySchema), 
  searchController.suggest
);

export default router;
