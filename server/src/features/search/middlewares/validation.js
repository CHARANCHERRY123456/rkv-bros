class SearchValidation {
  
  static validateSearchQuery = (req, res, next) => {
    const { q: query, page, limit, sortBy, sortOrder } = req.query;

    if (!query || typeof query !== 'string' || query.trim().length < 1) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required and must be at least 1 character',
        error: 'INVALID_QUERY'
      });
    }

    if (query.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Search query cannot exceed 100 characters',
        error: 'QUERY_TOO_LONG'
      });
    }

    if (page && (isNaN(page) || parseInt(page) < 1)) {
      return res.status(400).json({
        success: false,
        message: 'Page must be a positive number',
        error: 'INVALID_PAGE'
      });
    }

    if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 50)) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 50',
        error: 'INVALID_LIMIT'
      });
    }

    const validSortFields = ['name', 'email', 'createdAt'];
    if (sortBy && !validSortFields.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: `Sort field must be one of: ${validSortFields.join(', ')}`,
        error: 'INVALID_SORT_FIELD'
      });
    }

    if (sortOrder && !['asc', 'desc'].includes(sortOrder)) {
      return res.status(400).json({
        success: false,
        message: 'Sort order must be either "asc" or "desc"',
        error: 'INVALID_SORT_ORDER'
      });
    }

    next();
  };

  static validateSuggestQuery = (req, res, next) => {
    console.log("checking validation");
    
    const { q: query, limit } = req.query;

    if (query && (typeof query !== 'string' || query.length > 100)) {
      return res.status(400).json({
        success: false,
        message: 'Query must be a string and cannot exceed 100 characters',
        error: 'INVALID_QUERY'
      });
    }

    if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 10)) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 10 for suggestions',
        error: 'INVALID_LIMIT'
      });
    }

    next();
  };

  static validateEmailsRequest = (req, res, next) => {
    const { emails } = req.body;

    if (!emails) {
      return res.status(400).json({
        success: false,
        message: 'Emails array is required in request body',
        error: 'MISSING_EMAILS'
      });
    }

    if (!Array.isArray(emails)) {
      return res.status(400).json({
        success: false,
        message: 'Emails must be an array',
        error: 'INVALID_EMAILS_FORMAT'
      });
    }

    if (emails.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Emails array cannot be empty',
        error: 'EMPTY_EMAILS'
      });
    }

    if (emails.length > 20) {
      return res.status(400).json({
        success: false,
        message: 'Cannot validate more than 20 emails at once',
        error: 'TOO_MANY_EMAILS'
      });
    }

    next();
  };

  static validateUserIdsRequest = (req, res, next) => {
    const { ids } = req.body;

    if (!ids) {
      return res.status(400).json({
        success: false,
        message: 'IDs array is required in request body',
        error: 'MISSING_IDS'
      });
    }

    if (!Array.isArray(ids)) {
      return res.status(400).json({
        success: false,
        message: 'IDs must be an array',
        error: 'INVALID_IDS_FORMAT'
      });
    }

    if (ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'IDs array cannot be empty',
        error: 'EMPTY_IDS'
      });
    }

    if (ids.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Cannot fetch more than 50 users at once',
        error: 'TOO_MANY_IDS'
      });
    }

    next();
  };

  static validateEmailParam = (req, res, next) => {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email parameter is required',
        error: 'MISSING_EMAIL'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
        error: 'INVALID_EMAIL_FORMAT'
      });
    }

    next();
  };

  static createRateLimit = (maxRequests = 100, windowMs = 60000) => {
    const requests = new Map();

    return (req, res, next) => {
      const clientId = req.user?.id || req.ip;
      const now = Date.now();
      
  
      const cutoff = now - windowMs;
      if (requests.has(clientId)) {
        requests.set(clientId, requests.get(clientId).filter(time => time > cutoff));
      }

      const clientRequests = requests.get(clientId) || [];
      
      if (clientRequests.length >= maxRequests) {
        return res.status(429).json({
          success: false,
          message: 'Too many requests, please try again later',
          error: 'RATE_LIMIT_EXCEEDED',
          retryAfter: Math.ceil(windowMs / 1000)
        });
      }


      clientRequests.push(now);
      requests.set(clientId, clientRequests);

      next();
    };
  };
}

export default SearchValidation;
