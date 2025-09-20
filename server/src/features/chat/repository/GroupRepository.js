import Group from "../../../models/chat/group.js";
import Message from "../../../models/chat/message.js";
import CrudRepository from "../../../repositories/CrudRepository.js";
import mongoose from "mongoose";

class GroupRepository extends CrudRepository {
  constructor() {
    super(Group);
  }

  async findGroupsByUserWithLastMessage(userEmail) {
    try {
      const pipeline = [
        {
          $match: { members: userEmail }
        },
        {
          $lookup: {
            from: "messages",
            localField: "_id",
            foreignField: "groupId",
            as: "messages",
            pipeline: [
              { $sort: { createdAt: -1 } },
              { $limit: 1 }
            ]
          }
        },
        {
          $addFields: {
            lastActivity: {
              $cond: {
                if: { $gt: [{ $size: "$messages" }, 0] },
                then: { $arrayElemAt: ["$messages.createdAt", 0] },
                else: "$createdAt"
              }
            },
            lastMessage: { $arrayElemAt: ["$messages", 0] }
          }
        },
        { $sort: { lastActivity: -1 } },
        // Remove the messages array (we only needed it for sorting)
        {
          $project: {
            messages: 0
          }
        }
      ];

      return await this.model.aggregate(pipeline).exec();
    } catch (error) {
      console.error(`Error finding groups with last message: ${error.message}`);
      throw error;
    }
  }

  // Find groups by user (legacy method for backward compatibility)
  async findGroupsByUser(userEmail) {
    try {
      return await this.model
        .find({ members: userEmail })
        .sort({ createdAt: -1 })
        .lean()
        .exec();
    } catch (error) {
      console.error(`Error finding groups by user: ${error.message}`);
      throw error;
    }
  }

  // Create a new group
  async createGroup(groupData) {
    try {
      const group = new this.model({
        ...groupData,
        createdAt: new Date(),
        lastActivity: new Date()
      });
      return await group.save();
    } catch (error) {
      console.error(`Error creating group: ${error.message}`);
      throw error;
    }
  }

  // Update group last activity timestamp
  async updateLastActivity(groupId, timestamp = new Date()) {
    try {
      return await this.model.findByIdAndUpdate(
        groupId,
        { lastActivity: timestamp },
        { new: true }
      );
    } catch (error) {
      console.error(`Error updating group last activity: ${error.message}`);
      throw error;
    }
  }

  // Get group by ID with member details
  async findGroupWithMembers(groupId) {
    try {
      return await this.model
        .findById(groupId)
        .populate('members', 'name email')
        .lean()
        .exec();
    } catch (error) {
      console.error(`Error finding group with members: ${error.message}`);
      throw error;
    }
  }

  // Check if user is member of group
  async isUserMemberOfGroup(groupId, userEmail) {
    try {
      const group = await this.model.findById(groupId, 'members').lean();
      return group ? group.members.includes(userEmail) : false;
    } catch (error) {
      console.error(`Error checking group membership: ${error.message}`);
      throw error;
    }
  }

  // Get group statistics
  async getGroupStats(groupId) {
    try {
      const objectId = mongoose.Types.ObjectId.isValid(groupId) 
        ? new mongoose.Types.ObjectId(groupId) 
        : groupId;
        
      const pipeline = [
        { $match: { _id: objectId } },
        {
          $lookup: {
            from: "messages",
            localField: "_id",
            foreignField: "groupId",
            as: "messages"
          }
        },
        {
          $project: {
            name: 1,
            memberCount: { $size: "$members" },
            messageCount: { $size: "$messages" },
            createdAt: 1,
            lastActivity: 1
          }
        }
      ];

      const result = await this.model.aggregate(pipeline).exec();
      return result[0] || null;
    } catch (error) {
      console.error(`Error getting group stats: ${error.message}`);
      throw error;
    }
  }
}

export default GroupRepository;
