import GroupService from '../services/GroupService.js';

class GroupController {
  constructor() {
    this.groupService = new GroupService();
  }

  // Get user's groups ordered by activity (WhatsApp-style)
  getUserGroups = async (req, res, next) => {
    try {
      const { email } = req.params;
      const result = await this.groupService.getUserGroupsOrderedByActivity(email);

      res.status(200).json({
        success: true,
        message: 'Groups retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

  // Create a new group
  createGroup = async (req, res, next) => {
    try {
      const { name, members, description } = req.body;
      const creatorEmail = req.user?.email;

      const groupData = { name, members, description };
      const result = await this.groupService.createGroup(groupData, creatorEmail);

      res.status(201).json({
        success: true,
        message: result.message,
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

  // Get group details with statistics
  getGroupDetails = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const userEmail = req.user?.email;

      const result = await this.groupService.getGroupDetails(groupId, userEmail);

      res.status(200).json({
        success: true,
        message: 'Group details retrieved successfully',
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

  // Update group activity (called when a message is sent)
  updateGroupActivity = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const userEmail = req.user?.email;

      const result = await this.groupService.updateGroupActivity(groupId, userEmail);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

  // Add members to group (future feature)
  addMembersToGroup = async (req, res, next) => {
    try {
      const { groupId } = req.params;
      const { members } = req.body;
      const userEmail = req.user?.email;

      const result = await this.groupService.addMembersToGroup(groupId, members, userEmail);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result
      });
    } catch (error) {
      next(error);
    }
  };

  // Health check endpoint
  healthCheck = async (req, res, next) => {
    try {
      res.status(200).json({
        success: true,
        message: 'Group service is healthy',
        data: {
          service: 'GroupService',
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      next(error);
    }
  };
}

export default GroupController;
