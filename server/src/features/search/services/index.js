import UserSearchRepository from '../repository/index.js';

class UserSearchService {
  constructor() {
    this.userRepository = new UserSearchRepository();
  }

  // Business logic for general user search
  async searchUsers(query, currentUserId = null, options = {}) {
    try {
      // Input validation
      if (!query || typeof query !== 'string') {
        throw new Error('Search query is required and must be a string');
      }

      if (query.trim().length < 1) {
        throw new Error('Search query must be at least 1 character long');
      }

      const { limit = 20, page = null } = options;

      // Validate limits
      if (limit > 50) {
        throw new Error('Search limit cannot exceed 50 results');
      }

      // Build search regex with escaping
      const escapedQuery = this._escapeRegex(query.trim());
      const searchRegex = new RegExp(escapedQuery, 'i');

      // Build filter with exclusion
      const filter = this._buildSearchFilter(searchRegex, currentUserId);

      // Execute search with or without pagination
      let result;
      if (page) {
        result = await this._searchWithPagination(filter, { page, limit });
      } else {
        const users = await this.userRepository.findByQuery(filter, {
          limit,
          sort: { name: 1 }
        });
        result = { users };
      }

      // Format response
      return this._formatSearchResponse(result);

    } catch (error) {
      console.error(`Error in searchUsers service: ${error.message}`);
      throw error;
    }
  }

  // Business logic for autocomplete suggestions
  async suggestUsers(query, currentUserId = null, options = {}) {
    try {
      // Strict validation for suggestions
      if (!query || typeof query !== 'string') {
        return { suggestions: [] };
      }

      const trimmedQuery = query.trim();
      
      // Minimum length requirement for suggestions
      if (trimmedQuery.length < 2) {
        return { suggestions: [] };
      }

      const { limit = 10 } = options;

      // Build "starts with" regex for better autocomplete
      const escapedQuery = this._escapeRegex(trimmedQuery);
      const startsWithRegex = new RegExp(`^${escapedQuery}`, 'i');

      // Build filter
      const filter = this._buildSearchFilter(startsWithRegex, currentUserId);

      // Execute optimized suggestion query
      const users = await this.userRepository.findByQuery(filter, {
        limit: Math.min(limit, 10), // Cap at 10 for performance
        sort: { name: 1 }
      });

      return {
        suggestions: users.map(user => this._formatUserSuggestion(user)),
        query: trimmedQuery
      };

    } catch (error) {
      console.error(`Error in suggestUsers service: ${error.message}`);
      // Return empty suggestions on error instead of throwing
      return { suggestions: [], error: 'Failed to load suggestions' };
    }
  }

  // Business logic for batch email validation
  async validateUserEmails(emails, currentUserId = null) {
    try {
      if (!Array.isArray(emails)) {
        throw new Error('Emails must be provided as an array');
      }

      if (emails.length === 0) {
        return { validUsers: [], invalidEmails: [] };
      }

      if (emails.length > 20) {
        throw new Error('Cannot validate more than 20 emails at once');
      }

      // Filter and validate emails
      const validEmails = [];
      const invalidEmails = [];

      emails.forEach(email => {
        if (typeof email === 'string' && this._isValidEmail(email.trim())) {
          const trimmedEmail = email.trim().toLowerCase();
          if (!validEmails.includes(trimmedEmail)) { // Remove duplicates
            validEmails.push(trimmedEmail);
          }
        } else {
          invalidEmails.push(email);
        }
      });

      // Find existing users
      const existingUsers = await this.userRepository.findByEmails(validEmails);

      // Identify missing emails
      const foundEmails = existingUsers.map(user => user.email.toLowerCase());
      const missingEmails = validEmails.filter(email => !foundEmails.includes(email));

      // Exclude current user if specified
      const filteredUsers = currentUserId 
        ? existingUsers.filter(user => user._id.toString() !== currentUserId.toString())
        : existingUsers;

      return {
        validUsers: filteredUsers.map(user => this._formatUserSuggestion(user)),
        invalidEmails: [...invalidEmails, ...missingEmails],
        totalProvided: emails.length,
        totalValid: filteredUsers.length
      };

    } catch (error) {
      console.error(`Error in validateUserEmails service: ${error.message}`);
      throw error;
    }
  }

  // Advanced search with filters
  async advancedSearch(searchCriteria, currentUserId = null, options = {}) {
    try {
      const { 
        query = '', 
        searchType = 'both', // 'email', 'name', 'both'
        exactMatch = false 
      } = searchCriteria;

      const { page = 1, limit = 20, sortBy = 'name', sortOrder = 'asc' } = options;

      // Build advanced filter
      let filter = {};
      
      if (query && query.trim()) {
        const escapedQuery = this._escapeRegex(query.trim());
        const regex = exactMatch 
          ? new RegExp(`^${escapedQuery}$`, 'i')
          : new RegExp(escapedQuery, 'i');

        switch (searchType) {
          case 'email':
            filter.email = regex;
            break;
          case 'name':
            filter.name = regex;
            break;
          case 'both':
          default:
            filter = { $or: [{ email: regex }, { name: regex }] };
        }
      }

      // Add user exclusion
      if (currentUserId) {
        filter = filter.$or 
          ? { $and: [{ $or: filter.$or }, { _id: { $ne: currentUserId } }] }
          : { ...filter, _id: { $ne: currentUserId } };
      }

      // Execute paginated search
      const result = await this._searchWithPagination(filter, {
        page,
        limit,
        sortBy,
        sortOrder
      });

      return this._formatSearchResponse(result);

    } catch (error) {
      console.error(`Error in advancedSearch service: ${error.message}`);
      throw error;
    }
  }

  // Private helper methods
  _buildSearchFilter(searchRegex, excludeUserId = null) {
    const filter = {
      $or: [
        { email: searchRegex },
        { name: searchRegex }
      ]
    };

    if (excludeUserId) {
      return {
        $and: [
          filter,
          { _id: { $ne: excludeUserId } }
        ]
      };
    }

    return filter;
  }

  async _searchWithPagination(filter, options) {
    const { page, limit, sortBy = 'name', sortOrder = 'asc' } = options;
    
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const { users, total } = await this.userRepository.findWithPagination(filter, {
      page,
      limit,
      sort: sortOptions
    });

    return {
      users,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    };
  }

  _formatSearchResponse(result) {
    return {
      users: result.users.map(user => this._formatUserSuggestion(user)),
      pagination: result.pagination || null,
      total: result.pagination ? result.pagination.total : result.users.length
    };
  }

  _formatUserSuggestion(user) {
    return {
      id: user._id,
      email: user.email,
      name: user.name || user.email.split('@')[0],
      displayName: user.name ? `${user.name} <${user.email}>` : user.email
    };
  }

  // Utility methods moved from repository
  _escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  _isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default UserSearchService;
