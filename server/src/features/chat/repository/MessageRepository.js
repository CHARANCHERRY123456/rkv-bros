import Message from "../../../models/chat/message.js";
import CrudRepository from "../../../repositories/CrudRepository.js";

class MessageRepository extends CrudRepository {
  constructor() {
    super(Message);
  }

  // Find messages by group ID with pagination
  async findMessagesByGroup(groupId, options = {}) {
    try {
      const { 
        limit = 50, 
        page = 1, 
        sortOrder = 1  // 1 for ascending (oldest first), -1 for descending
      } = options;

      const skip = (page - 1) * limit;

      return await this.model
        .find({ groupId })
        .sort({ createdAt: sortOrder })
        .skip(skip)
        .limit(limit)
        .populate('sender', 'name email')
        .lean()
        .exec();
    } catch (error) {
      console.error(`Error finding messages by group: ${error.message}`);
      throw error;
    }
  }

  // Get latest message for a group
  async getLatestMessageByGroup(groupId) {
    try {
      return await this.model
        .findOne({ groupId })
        .sort({ createdAt: -1 })
        .populate('sender', 'name email')
        .lean()
        .exec();
    } catch (error) {
      console.error(`Error getting latest message: ${error.message}`);
      throw error;
    }
  }

  // Create a new message
  async createMessage(messageData) {
    try {
      const message = new this.model({
        ...messageData,
        createdAt: new Date()
      });
      
      const savedMessage = await message.save();
      
      // Populate sender info before returning
      return await this.model
        .findById(savedMessage._id)
        .populate('sender', 'name email')
        .lean()
        .exec();
    } catch (error) {
      console.error(`Error creating message: ${error.message}`);
      throw error;
    }
  }

  // Count messages in a group
  async countMessagesByGroup(groupId) {
    try {
      return await this.model.countDocuments({ groupId });
    } catch (error) {
      console.error(`Error counting messages: ${error.message}`);
      throw error;
    }
  }

  // Delete messages by group (when group is deleted)
  async deleteMessagesByGroup(groupId) {
    try {
      return await this.model.deleteMany({ groupId });
    } catch (error) {
      console.error(`Error deleting messages by group: ${error.message}`);
      throw error;
    }
  }

  // Get message statistics for a group
  async getGroupMessageStats(groupId) {
    try {
      const pipeline = [
        { $match: { groupId } },
        {
          $group: {
            _id: null,
            totalMessages: { $sum: 1 },
            firstMessage: { $min: "$createdAt" },
            lastMessage: { $max: "$createdAt" },
            uniqueSenders: { $addToSet: "$sender" }
          }
        },
        {
          $project: {
            _id: 0,
            totalMessages: 1,
            firstMessage: 1,
            lastMessage: 1,
            activeMembersCount: { $size: "$uniqueSenders" }
          }
        }
      ];

      const result = await this.model.aggregate(pipeline).exec();
      return result[0] || {
        totalMessages: 0,
        firstMessage: null,
        lastMessage: null,
        activeMembersCount: 0
      };
    } catch (error) {
      console.error(`Error getting message stats: ${error.message}`);
      throw error;
    }
  }
}

export default MessageRepository;
