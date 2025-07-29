import GroupService from '../services/GroupService.js';

class GroupController {
  constructor() {
    this.groupService = new GroupService();
  }

  // Get user's groups ordered by activity (WhatsApp-style)
  getUserGroups = async (req, res) => {
    try {
      const { email } = req.params;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: 'Email parameter is required',
          error: 'MISSING_EMAIL'
        });
      }

      const result = await this.groupService.getUserGroupsOrderedByActivity(email);

      res.status(200).json({
        success: true,
        message: 'Groups retrieved successfully',
        data: result
      });

    } catch (error) {
      console.error(`Error in getUserGroups controller: ${error.message}`);
      
      if (error.message.includes('Invalid email') || error.message.includes('required')) {
        return res.status(400).json({
          success: false,
          message: error.message,
          error: 'VALIDATION_ERROR'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching groups',
        error: 'FETCH_ERROR'
      });
    }
  };

  // Create a new group
  createGroup = async (req, res) => {
    try {
      const { name, members, description } = req.body;
      
      // Get creator email from auth middleware
      const creatorEmail = req.user?.email;

      if (!creatorEmail) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'AUTH_REQUIRED'
        });
      }

      const groupData = { name, members, description };
      const result = await this.groupService.createGroup(groupData, creatorEmail);

      res.status(201).json({
        success: true,
        message: result.message,
        data: result
      });

    } catch (error) {
      console.error(`Error in createGroup controller: ${error.message}`);
      
      if (error.message.includes('required') || 
          error.message.includes('must be') || 
          error.message.includes('Invalid') ||
          error.message.includes('cannot exceed')) {
        return res.status(400).json({
          success: false,
          message: error.message,
          error: 'VALIDATION_ERROR'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error while creating group',
        error: 'CREATE_ERROR'
      });
    }
  };

  // Get group details with statistics
  getGroupDetails = async (req, res) => {
    try {
      const { groupId } = req.params;
      const userEmail = req.user?.email;

      if (!groupId) {
        return res.status(400).json({
          success: false,
          message: 'Group ID parameter is required',
          error: 'MISSING_GROUP_ID'
        });
      }

      if (!userEmail) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'AUTH_REQUIRED'
        });
      }

      const result = await this.groupService.getGroupDetails(groupId, userEmail);

      res.status(200).json({
        success: true,
        message: 'Group details retrieved successfully',
        data: result
      });

    } catch (error) {
      console.error(`Error in getGroupDetails controller: ${error.message}`);
      
      if (error.message.includes('Access denied') || error.message.includes('not a member')) {
        return res.status(403).json({
          success: false,
          message: error.message,
          error: 'ACCESS_DENIED'
        });
      }

      if (error.message.includes('not found')) {
        return res.status(404).json({
          success: false,
          message: error.message,
          error: 'GROUP_NOT_FOUND'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching group details',
        error: 'FETCH_ERROR'
      });
    }
  };

  // Update group activity (called when a message is sent)
  updateGroupActivity = async (req, res) => {
    try {
      const { groupId } = req.params;
      const userEmail = req.user?.email;

      if (!groupId) {
        return res.status(400).json({
          success: false,
          message: 'Group ID parameter is required',
          error: 'MISSING_GROUP_ID'
        });
      }

      if (!userEmail) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'AUTH_REQUIRED'
        });
      }

      const result = await this.groupService.updateGroupActivity(groupId, userEmail);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result
      });

    } catch (error) {
      console.error(`Error in updateGroupActivity controller: ${error.message}`);
      
      if (error.message.includes('not a member')) {
        return res.status(403).json({
          success: false,
          message: error.message,
          error: 'ACCESS_DENIED'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error while updating group activity',
        error: 'UPDATE_ERROR'
      });
    }
  };

  // Add members to group (future feature)
  addMembersToGroup = async (req, res) => {
    try {
      const { groupId } = req.params;
      const { members } = req.body;
      const userEmail = req.user?.email;

      if (!groupId) {
        return res.status(400).json({
          success: false,
          message: 'Group ID parameter is required',
          error: 'MISSING_GROUP_ID'
        });
      }

      if (!members || !Array.isArray(members)) {
        return res.status(400).json({
          success: false,
          message: 'Members array is required',
          error: 'MISSING_MEMBERS'
        });
      }

      if (!userEmail) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'AUTH_REQUIRED'
        });
      }

      const result = await this.groupService.addMembersToGroup(groupId, members, userEmail);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result
      });

    } catch (error) {
      console.error(`Error in addMembersToGroup controller: ${error.message}`);
      
      if (error.message.includes('Access denied') || error.message.includes('not a member')) {
        return res.status(403).json({
          success: false,
          message: error.message,
          error: 'ACCESS_DENIED'
        });
      }

      if (error.message.includes('not found')) {
        return res.status(404).json({
          success: false,
          message: error.message,
          error: 'GROUP_NOT_FOUND'
        });
      }

      if (error.message.includes('already group members') || error.message.includes('Invalid email')) {
        return res.status(400).json({
          success: false,
          message: error.message,
          error: 'VALIDATION_ERROR'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error while adding members',
        error: 'ADD_MEMBERS_ERROR'
      });
    }
  };

  // Health check endpoint
  healthCheck = async (req, res) => {
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
      console.error(`Error in healthCheck controller: ${error.message}`);
      
      res.status(503).json({
        success: false,
        message: 'Group service is unhealthy',
        error: 'SERVICE_UNAVAILABLE'
      });
    }
  };
}

export default GroupController;
