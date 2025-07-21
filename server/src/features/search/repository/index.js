import User from "../../../models/User.js";
import CrudRepository from "../../../repositories/CrudRepository.js";

class UserSearchRepository extends CrudRepository {
  constructor() {
    super(User);
  }

  // Legacy methods - keep for backward compatibility
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

  // Pure data access methods - no business logic
  async findByQuery(filter, options = {}) {
    try {
      const { 
        select = 'email name _id', 
        limit = 20, 
        sort = null,
        skip = 0 
      } = options;

      let query = this.model.find(filter).select(select).limit(limit);
      
      if (sort) {
        query = query.sort(sort);
      }
      
      if (skip > 0) {
        query = query.skip(skip);
      }

      return await query.lean().exec();
    } catch (error) {
      console.error(`Error finding users by query: ${error.message}`);
      throw error;
    }
  }

  async findByEmails(emails) {
    try {
      return await this.model
        .find({ email: { $in: emails } })
        .select('email name _id')
        .lean()
        .exec();
    } catch (error) {
      console.error(`Error finding users by emails: ${error.message}`);
      throw error;
    }
  }

  async countByQuery(filter) {
    try {
      return await this.model.countDocuments(filter);
    } catch (error) {
      console.error(`Error counting users: ${error.message}`);
      throw error;
    }
  }

  async findWithPagination(filter, options = {}) {
    try {
      const { 
        page = 1, 
        limit = 20, 
        select = 'email name _id',
        sort = { name: 1 }
      } = options;

      const skip = (page - 1) * limit;

      const [users, total] = await Promise.all([
        this.model
          .find(filter)
          .select(select)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean()
          .exec(),
        this.model.countDocuments(filter)
      ]);

      return { users, total };
    } catch (error) {
      console.error(`Error finding users with pagination: ${error.message}`);
      throw error;
    }
  }

  // Raw query methods for specific patterns
  async findByEmailPattern(emailRegex, options = {}) {
    try {
      return await this.findByQuery({ email: emailRegex }, options);
    } catch (error) {
      console.error(`Error finding users by email pattern: ${error.message}`);
      throw error;
    }
  }

  async findByNamePattern(nameRegex, options = {}) {
    try {
      return await this.findByQuery({ name: nameRegex }, options);
    } catch (error) {
      console.error(`Error finding users by name pattern: ${error.message}`);
      throw error;
    }
  }

  async findByEmailOrNamePattern(searchRegex, options = {}) {
    try {
      const filter = {
        $or: [
          { email: searchRegex },
          { name: searchRegex }
        ]
      };
      return await this.findByQuery(filter, options);
    } catch (error) {
      console.error(`Error finding users by email or name pattern: ${error.message}`);
      throw error;
    }
  }
}

export default UserSearchRepository;