import UserSearchService from '../services/index.js';

class SearchController {
  constructor() {
    this.userSearchService = new UserSearchService();
  }

  suggest = async (req, res, next) => {
    try {
      const { q: query, limit } = req.query;
      const currentUserId = req.user?.id || req.user?._id;

      const options = {};
      if (limit) options.limit = parseInt(limit);

      const result = await this.userSearchService.suggestUsers(query, currentUserId, options);
      
      res.status(200).json({
        success: true,
        message: 'Suggestions retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };
}

export default SearchController;
