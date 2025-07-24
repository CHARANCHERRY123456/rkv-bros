import express from 'express';
import SearchController from '../controllers/index.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';
import SearchValidation from '../middlewares/validation.js';

const router = express.Router();
const searchController = new SearchController();


router.use(authMiddleware);

router.use(SearchValidation.createRateLimit(100, 60000)); // 100 requests per minute


router.get('/search', 
  SearchValidation.validateSearchQuery, 
  searchController.search
);

router.get('/suggest', 
  SearchValidation.validateSuggestQuery, 
  searchController.suggest
);


export default router;
