import GroupRepository from '../repository/GroupRepository.js';
import MessageRepository from '../repository/MessageRepository.js';

class GroupService {
  constructor() {
    this.groupRepository = new GroupRepository();
    this.messageRepository = new MessageRepository();
  }

  // Get user's groups ordered by activity (WhatsApp-style)
  async getUserGroupsOrderedByActivity(userEmail) {
    try {
      // Input validation
      if (!userEmail || typeof userEmail !== 'string') {
        throw new Error('User email is required and must be a string');
      }

      const trimmedEmail = userEmail.trim().toLowerCase();
      if (!this._isValidEmail(trimmedEmail)) {
        throw new Error('Invalid email format');
      }

      // Get groups with last message activity
      const groups = await this.groupRepository.findGroupsByUserWithLastMessage(trimmedEmail);

      // Format response with additional info
      return {
        groups: groups.map(group => this._formatGroupResponse(group)),
        total: groups.length,
        userEmail: trimmedEmail
      };

    } catch (error) {
      console.error(`Error in getUserGroupsOrderedByActivity: ${error.message}`);
      throw error;
    }
  }

  // Create a new group
  async createGroup(groupData, creatorEmail) {
    try {
      // Input validation
      const { name, members = [] } = groupData;

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        throw new Error('Group name is required and must be a non-empty string');
      }

      if (!Array.isArray(members) || members.length === 0) {
        throw new Error('Group must have at least one member');
      }

      // Validate all member emails
      const validatedMembers = this._validateAndCleanEmails(members);
      
      // Ensure creator is included in members
      if (creatorEmail && !validatedMembers.includes(creatorEmail.toLowerCase())) {
        validatedMembers.push(creatorEmail.toLowerCase());
      }

      if (validatedMembers.length < 2) {
        throw new Error('Group must have at least 2 members');
      }

      // Validate group name length
      if (name.trim().length > 100) {
        throw new Error('Group name cannot exceed 100 characters');
      }

      // Create group
      const groupToCreate = {
        name: name.trim(),
        members: validatedMembers,
        createdBy: creatorEmail?.toLowerCase(),
        description: groupData.description?.trim() || null
      };

      const newGroup = await this.groupRepository.createGroup(groupToCreate);

      return {
        group: this._formatGroupResponse(newGroup),
        message: 'Group created successfully'
      };

    } catch (error) {
      console.error(`Error in createGroup: ${error.message}`);
      throw error;
    }
  }

  // Update group activity (called when a message is sent)
  async updateGroupActivity(groupId, userEmail) {
    try {
      // Validate inputs
      if (!groupId) {
        throw new Error('Group ID is required');
      }

      if (!userEmail) {
        throw new Error('User email is required');
      }

      // Check if user is member of the group
      const isMember = await this.groupRepository.isUserMemberOfGroup(groupId, userEmail);
      if (!isMember) {
        throw new Error('User is not a member of this group');
      }

      // Update last activity
      const updatedGroup = await this.groupRepository.updateLastActivity(groupId);
      
      return {
        group: this._formatGroupResponse(updatedGroup),
        message: 'Group activity updated'
      };

    } catch (error) {
      console.error(`Error in updateGroupActivity: ${error.message}`);
      throw error;
    }
  }

  // Get group details with statistics
  async getGroupDetails(groupId, userEmail) {
    try {
      // Check if user is member
      const isMember = await this.groupRepository.isUserMemberOfGroup(groupId, userEmail);
      if (!isMember) {
        throw new Error('Access denied: User is not a member of this group');
      }

      // Get group with members
      const group = await this.groupRepository.findGroupWithMembers(groupId);
      if (!group) {
        throw new Error('Group not found');
      }

      // Get group statistics
      const stats = await this.groupRepository.getGroupStats(groupId);
      const messageStats = await this.messageRepository.getGroupMessageStats(groupId);

      return {
        group: this._formatGroupResponse(group),
        statistics: {
          ...stats,
          ...messageStats
        }
      };

    } catch (error) {
      console.error(`Error in getGroupDetails: ${error.message}`);
      throw error;
    }
  }

  // Add members to group (future feature)
  async addMembersToGroup(groupId, newMembers, userEmail) {
    try {
      // Check if user is member
      const isMember = await this.groupRepository.isUserMemberOfGroup(groupId, userEmail);
      if (!isMember) {
        throw new Error('Access denied: User is not a member of this group');
      }

      // Validate new members
      const validatedMembers = this._validateAndCleanEmails(newMembers);

      // Get current group
      const group = await this.groupRepository.findById(groupId);
      if (!group) {
        throw new Error('Group not found');
      }

      // Filter out existing members
      const membersToAdd = validatedMembers.filter(email => 
        !group.members.includes(email)
      );

      if (membersToAdd.length === 0) {
        throw new Error('All provided emails are already group members');
      }

      // Update group members
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

    } catch (error) {
      console.error(`Error in addMembersToGroup: ${error.message}`);
      throw error;
    }
  }

  // Private helper methods
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

  _validateAndCleanEmails(emails) {
    if (!Array.isArray(emails)) {
      throw new Error('Members must be provided as an array');
    }

    const cleanedEmails = [];
    const seenEmails = new Set();

    for (const email of emails) {
      if (typeof email !== 'string') {
        throw new Error('All member emails must be strings');
      }

      const trimmedEmail = email.trim().toLowerCase();
      
      if (!this._isValidEmail(trimmedEmail)) {
        throw new Error(`Invalid email format: ${email}`);
      }

      // Avoid duplicates
      if (!seenEmails.has(trimmedEmail)) {
        cleanedEmails.push(trimmedEmail);
        seenEmails.add(trimmedEmail);
      }
    }

    return cleanedEmails;
  }

  _isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default GroupService;
