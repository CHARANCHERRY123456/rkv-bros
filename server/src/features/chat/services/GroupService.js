import GroupRepository from '../repository/GroupRepository.js';
import MessageRepository from '../repository/MessageRepository.js';
import { NotFoundError, ForbiddenError, ValidationError } from '../../../middlewares/errorHandler.js';

class GroupService {
  constructor() {
    this.groupRepository = new GroupRepository();
    this.messageRepository = new MessageRepository();
  }

  // Get user's groups ordered by activity (WhatsApp-style)
  async getUserGroupsOrderedByActivity(userEmail) {
    const trimmedEmail = userEmail.trim().toLowerCase();
    const groups = await this.groupRepository.findGroupsByUserWithLastMessage(trimmedEmail);

    return {
      groups: groups.map(group => this._formatGroupResponse(group)),
      total: groups.length,
      userEmail: trimmedEmail
    };
  }

  // Create a new group
  async createGroup(groupData, creatorEmail) {
    const { name, members, description } = groupData;
    
    // Clean and prepare data
    const cleanMembers = members.map(email => email.trim().toLowerCase());
    const creatorEmailLower = creatorEmail?.toLowerCase();
    
    // Ensure creator is in members list
    if (creatorEmailLower && !cleanMembers.includes(creatorEmailLower)) {
      cleanMembers.push(creatorEmailLower);
    }

    const groupToCreate = {
      name: name.trim(),
      members: cleanMembers,
      createdBy: creatorEmailLower,
      description: description?.trim() || null
    };

    const newGroup = await this.groupRepository.createGroup(groupToCreate);

    return {
      group: this._formatGroupResponse(newGroup),
      message: 'Group created successfully'
    };
  }

  // Update group activity (called when a message is sent)
  async updateGroupActivity(groupId, userEmail) {
    const isMember = await this.groupRepository.isUserMemberOfGroup(groupId, userEmail);
    if (!isMember) {
      throw new ForbiddenError('User is not a member of this group');
    }

    const updatedGroup = await this.groupRepository.updateLastActivity(groupId);
    
    return {
      group: this._formatGroupResponse(updatedGroup),
      message: 'Group activity updated'
    };
  }

  // Get group details with statistics
  async getGroupDetails(groupId, userEmail) {
    const isMember = await this.groupRepository.isUserMemberOfGroup(groupId, userEmail);
    if (!isMember) {
      throw new ForbiddenError('Access denied: User is not a member of this group');
    }

    const group = await this.groupRepository.findGroupWithMembers(groupId);
    if (!group) {
      throw new NotFoundError('Group not found');
    }

    const stats = await this.groupRepository.getGroupStats(groupId);
    const messageStats = await this.messageRepository.getGroupMessageStats(groupId);

    return {
      group: this._formatGroupResponse(group),
      statistics: {
        ...stats,
        ...messageStats
      }
    };
  }

  // Add members to group (future feature)
  async addMembersToGroup(groupId, newMembers, userEmail) {
    const isMember = await this.groupRepository.isUserMemberOfGroup(groupId, userEmail);
    if (!isMember) {
      throw new ForbiddenError('Access denied: User is not a member of this group');
    }

    const group = await this.groupRepository.findById(groupId);
    if (!group) {
      throw new NotFoundError('Group not found');
    }

    // Clean and filter new members
    const cleanMembers = newMembers.map(email => email.trim().toLowerCase());
    const membersToAdd = cleanMembers.filter(email => !group.members.includes(email));

    if (membersToAdd.length === 0) {
      throw new ValidationError('All provided emails are already group members');
    }

    const updatedMembers = [...group.members, ...membersToAdd];
    const updatedGroup = await this.groupRepository.update(groupId, {
      members: updatedMembers,
      lastActivity: new Date()
    });

    return {
      group: this._formatGroupResponse(updatedGroup),
      addedMembers: membersToAdd,
      message: `${membersToAdd.length} member(s) added successfully`
    };
  }

  _formatGroupResponse(group) {
    return {
      id: group._id,
      name: group.name,
      description: group.description,
      members: group.members,
      memberCount: Array.isArray(group.members) ? group.members.length : 0,
      createdAt: group.createdAt,
      lastActivity: group.lastActivity,
      createdBy: group.createdBy,
      lastMessage: group.lastMessage || null
    };
  }
}

export default GroupService;
