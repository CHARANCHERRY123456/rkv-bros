import Group from "../../../models/chat/group.js";
import CrudRepository from "../../../repositories/CrudRepository.js";
import mongoose from "mongoose";

class GroupRepository extends CrudRepository {
  constructor() {
    super(Group);
  }

  // return groups with last message and last message time
  async findGroupsByUserWithLastMessage(userEmail) {
    const pipeline = [
      { $match: { members: userEmail } },
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "groupId",
          as: "messages",
          pipeline: [
            // messages are immutalbe so using createdonly instead of updated
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
      { $project: { messages: 0 } }
    ];

    return await this.model.aggregate(pipeline).exec();
  }

  async createGroup(groupData) {
    const group = new this.model({
      ...groupData,
      createdAt: new Date(),
      lastActivity: new Date()
    });
    return await group.save();
  }

  async updateLastActivity(groupId, timestamp = new Date()) {
    return await this.model.findByIdAndUpdate(
      groupId,
      { lastActivity: timestamp },
      { new: true }
    );
  }

  async findGroupWithMembers(groupId) {
    // lean used to remove unwanted fields of mongodb from query
    // finally these both together help to optimsie
    return await this.model.findById(groupId).lean().exec();
  }

  async isUserMemberOfGroup(groupId, userEmail) {
    // second parameter is projection
    const group = await this.model.findById(groupId, 'members').lean();
    return group ? group.members.includes(userEmail) : false;
  }

  async getGroupStats(groupId) {
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
  }
}

export default GroupRepository;
