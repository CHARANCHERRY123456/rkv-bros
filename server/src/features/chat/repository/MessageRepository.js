import Message from "../../../models/chat/message.js";
import CrudRepository from "../../../repositories/CrudRepository.js";

class MessageRepository extends CrudRepository {
  constructor() {
    super(Message);
  }

  async findMessagesByGroup(groupId, options = {}) {
    const { limit = 50, page = 1, sortOrder = 1 } = options;
    const skip = (page - 1) * limit;

    return await this.model
      .find({ groupId })
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }

  async getLatestMessageByGroup(groupId) {
    return await this.model
      .findOne({ groupId })
      .sort({ createdAt: -1 })
      .lean()
      .exec();
  }

  async createMessage(messageData) {
    const message = new this.model({
      ...messageData,
      createdAt: new Date()
    });
    return await message.save();
  }

  async countMessagesByGroup(groupId) {
    return await this.model.countDocuments({ groupId });
  }

  async deleteMessagesByGroup(groupId) {
    return await this.model.deleteMany({ groupId });
  }

  // get message stats using aggregation
  async getGroupMessageStats(groupId) {
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
  }
}

export default MessageRepository;
