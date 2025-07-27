import UserSearchService from '../services/index.js';

class SearchController {
  constructor() {
    this.userSearchService = new UserSearchService();
  }

  // General user search endpoint
  search = async (req, res) => {
    try {
      const { 
        q: query, 
        page, 
        limit,
        sortBy,
        sortOrder,
        searchType,
        exactMatch 
      } = req.query;

      console.log("in the serch controller");
      
      // Get current user ID from auth middleware
      const currentUserId = req.user?.id || req.user?._id;

      // Handle advanced search if additional parameters are provided
      if (searchType || exactMatch !== undefined) {
        const result = await this.userSearchService.advancedSearch(
          { query, searchType, exactMatch: exactMatch === 'true' },
          currentUserId,
          { page: parseInt(page) || 1, limit: parseInt(limit) || 20, sortBy, sortOrder }
        );
        
        console.log("the result in search rotuer" , result);
        
        return res.status(200).json({
          success: true,
          message: 'Advanced search completed successfully',
          data: result
        });
      }

      // Handle regular search
      const options = {};
      if (page) options.page = parseInt(page);
      if (limit) options.limit = parseInt(limit);

      const result = await this.userSearchService.searchUsers(query, currentUserId, options);

      res.status(200).json({
        success: true,
        message: 'Search completed successfully',
        data: result
      });

    } catch (error) {
      console.error(`Error in search controller: ${error.message}`);
      
      // Handle specific error types
      if (error.message.includes('required') || error.message.includes('must be')) {
        return res.status(400).json({
          success: false,
          message: error.message,
          error: 'VALIDATION_ERROR'
        });
      }

      if (error.message.includes('exceed')) {
        return res.status(400).json({
          success: false,
          message: error.message,
          error: 'LIMIT_EXCEEDED'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error during search',
        error: 'SEARCH_ERROR'
      });
    }
  };

  // Autocomplete suggestions endpoint
  suggest = async (req, res) => {
    try {
      console.log("i am in search route");
      
      const { q: query, limit } = req.query;

      // Get current user ID from auth middleware
      const currentUserId = req.user?.id || req.user?._id;

      const options = {};
      if (limit) options.limit = parseInt(limit);

      const result = await this.userSearchService.suggestUsers(query, currentUserId, options);
      console.log('[SUGGESTIONS SENT TO FRONTEND]:', JSON.stringify(result));
      res.status(200).json({
        success: true,
        message: 'Suggestions retrieved successfully',
        data: result
      });

    } catch (error) {
      console.error(`Error in suggest controller: ${error.message}`);
      // Suggestions should never fail completely - return empty if error
      res.status(200).json({
        success: true,
        message: 'Suggestions retrieved with errors',
        data: { suggestions: [], error: 'Failed to load suggestions' }
      });
    }
  };

  // Validate multiple emails endpoint (for group creation)
  validateEmails = async (req, res) => {
    try {
      const { emails } = req.body;

      if (!emails) {
        return res.status(400).json({
          success: false,
          message: 'Emails array is required in request body',
          error: 'MISSING_EMAILS'
        });
      }

      // Get current user ID from auth middleware
      const currentUserId = req.user?.id || req.user?._id;

      const result = await this.userSearchService.validateUserEmails(emails, currentUserId);

      res.status(200).json({
        success: true,
        message: 'Email validation completed successfully',
        data: result
      });

    } catch (error) {
      console.error(`Error in validateEmails controller: ${error.message}`);
      
      if (error.message.includes('array') || error.message.includes('more than')) {
        return res.status(400).json({
          success: false,
          message: error.message,
          error: 'VALIDATION_ERROR'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error during email validation',
        error: 'VALIDATION_ERROR'
      });
    }
  };

  // Get user by specific email (legacy support)
  getUserByEmail = async (req, res) => {
    try {
      const { email } = req.params;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email parameter is required',
          error: 'MISSING_EMAIL'
        });
      }

      // Use service layer for consistency
      const result = await this.userSearchService.validateUserEmails([email]);

      if (result.validUsers.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found with provided email',
          error: 'USER_NOT_FOUND'
        });
      }

      res.status(200).json({
        success: true,
        message: 'User found successfully',
        data: { user: result.validUsers[0] }
      });

    } catch (error) {
      console.error(`Error in getUserByEmail controller: ${error.message}`);
      
      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching user',
        error: 'FETCH_ERROR'
      });
    }
  };

  // Batch user lookup by IDs
  getUsersByIds = async (req, res) => {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'IDs array is required in request body',
          error: 'MISSING_IDS'
        });
      }

      if (ids.length > 50) {
        return res.status(400).json({
          success: false,
          message: 'Cannot fetch more than 50 users at once',
          error: 'LIMIT_EXCEEDED'
        });
      }

      // Build filter for repository
      const filter = { _id: { $in: ids } };
      const users = await this.userSearchService.userRepository.findByQuery(filter);

      res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        data: {
          users: users.map(user => ({
            id: user._id,
            email: user.email,
            name: user.name || user.email.split('@')[0]
          })),
          total: users.length,
          requested: ids.length
        }
      });

    } catch (error) {
      console.error(`Error in getUsersByIds controller: ${error.message}`);
      
      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching users',
        error: 'FETCH_ERROR'
      });
    }
  };

  // Health check endpoint
  healthCheck = async (req, res) => {
    try {
      // Simple query to test database connection
      const testResult = await this.userSearchService.userRepository.countByQuery({});
      
      res.status(200).json({
        success: true,
        message: 'Search service is healthy',
        data: {
          totalUsers: testResult,
          timestamp: new Date().toISOString(),
          service: 'UserSearchService'
        }
      });

    } catch (error) {
      console.error(`Error in healthCheck controller: ${error.message}`);
      
      res.status(503).json({
        success: false,
        message: 'Search service is unhealthy',
        error: 'SERVICE_UNAVAILABLE'
      });
    }
  };
}

export default SearchController;
