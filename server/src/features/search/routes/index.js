import express from 'express';
import SearchController from '../controllers/index.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';
import SearchValidation from '../middlewares/validation.js';

const router = express.Router();
const searchController = new SearchController();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Apply rate limiting
router.use(SearchValidation.createRateLimit(100, 60000)); // 100 requests per minute

// Core search endpoints with validation
router.get('/search', 
  SearchValidation.validateSearchQuery, 
  searchController.search
);

router.get('/suggest', 
  SearchValidation.validateSuggestQuery, 
  searchController.suggest
);

// Email validation endpoints
router.post('/validate-emails', 
  SearchValidation.validateEmailsRequest, 
  searchController.validateEmails
);

// Legacy and additional endpoints
router.get('/user/:email', 
  SearchValidation.validateEmailParam, 
  searchController.getUserByEmail
);

router.post('/users-by-ids', 
  SearchValidation.validateUserIdsRequest, 
  searchController.getUsersByIds
);

// Health check (no validation needed)
router.get('/health', searchController.healthCheck);

export default router;
