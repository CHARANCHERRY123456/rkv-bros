import User from "../../../models/User.js";
import CrudRepository from "../../../repositories/CrudRepository.js";

class UserSearchRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  async searchByEmail(email) {
    try {
      return await this.model.findOne({ email });
    } catch (error) {
      console.error(`Error searching user by email: ${error.message}`);
      throw error;
    }
  }

  async searchByName(name) {
    try {
      return await this.model.find({ name: new RegExp(name, 'i') });
    } catch (error) {
      console.error(`Error searching user by name: ${error.message}`);
      throw error;
    }
  }

  // New enhanced search methods
  async searchUsers(query, options = {}) {
    try {
      const { excludeUserId = null, limit = 20 } = options;
      
      if (!query || typeof query !== 'string') {
        throw new Error('Search query is required and must be a string');
      }

      const searchRegex = new RegExp(query, 'i');
      
      const filter = {
        $and: [
          {
            $or: [
              { email: searchRegex },
              { name: searchRegex }
            ]
          }
        ]
      };

      if (excludeUserId) {
        filter.$and.push({ _id: { $ne: excludeUserId } });
      }

      return await this.model
        .find(filter)
        .select('email name _id')
        .limit(limit)
        .lean()
        .exec();
    } catch (error) {
      console.error(`Error searching users: ${error.message}`);
      throw error;
    }
  }

  async suggestUsers(query, options = {}) {
    try {
      const { excludeUserId = null, limit = 10 } = options;
      
      if (!query || typeof query !== 'string' || query.length < 2) {
        return [];
      }

      const searchRegex = new RegExp(`^${this._escapeRegex(query)}`, 'i');
      
      const filter = {
        $and: [
          {
            $or: [
              { email: searchRegex },
              { name: searchRegex }
            ]
          }
        ]
      };

      if (excludeUserId) {
        filter.$and.push({ _id: { $ne: excludeUserId } });
      }

      return await this.model
        .find(filter)
        .select('email name _id')
        .limit(limit)
        .sort({ name: 1 })
        .lean()
        .exec();
    } catch (error) {
      console.error(`Error suggesting users: ${error.message}`);
      throw error;
    }
  }

  async getUsersByEmails(emails) {
    try {
      if (!Array.isArray(emails) || emails.length === 0) {
        return [];
      }

      // Filter out invalid emails
      const validEmails = emails.filter(email => 
        email && typeof email === 'string' && this._isValidEmail(email)
      );

      if (validEmails.length === 0) {
        return [];
      }

      return await this.model
        .find({ email: { $in: validEmails } })
        .select('email name _id')
        .lean()
        .exec();
    } catch (error) {
      console.error(`Error getting users by emails: ${error.message}`);
      throw error;
    }
  }

  async findUsersWithPagination(query, options = {}) {
    try {
      const { 
        page = 1, 
        limit = 20, 
        sortBy = 'name', 
        sortOrder = 'asc',
        excludeUserId = null 
      } = options;

      const skip = (page - 1) * limit;
      const searchRegex = query ? new RegExp(query, 'i') : null;

      let filter = {};
      if (searchRegex) {
        filter = {
          $or: [
            { email: searchRegex },
            { name: searchRegex }
          ]
        };
      }

      if (excludeUserId) {
        filter._id = { $ne: excludeUserId };
      }

      const sortOptions = {};
      sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

      const [users, total] = await Promise.all([
        this.model
          .find(filter)
          .select('email name _id')
          .sort(sortOptions)
          .skip(skip)
          .limit(limit)
          .lean()
          .exec(),
        this.model.countDocuments(filter)
      ]);

      return {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      console.error(`Error finding users with pagination: ${error.message}`);
      throw error;
    }
  }

  // Utility methods
  _escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  _isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default UserSearchRepository;
