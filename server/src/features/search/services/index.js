import User from '../../../models/User.js';

class UserSearchService {
  
  async suggestUsers(query, currentUserId, options = {}) {
    if (!query || query.trim().length < 2) {
      return { suggestions: [] };
    }

    const limit = options.limit || 10;
    const trimmedQuery = query.trim();

    const users = await User.find({
      $or: [
        { email: { $regex: `^${trimmedQuery}`, $options: 'i' } },
        { name: { $regex: `^${trimmedQuery}`, $options: 'i' } }
      ],
      _id: { $ne: currentUserId }
    })
    .select('email name')
    .limit(limit)
    .lean();

    return {
      suggestions: users.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name || user.email.split('@')[0]
      }))
    };
  }
}

export default UserSearchService;
