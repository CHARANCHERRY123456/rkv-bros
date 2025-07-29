import MessageService from '../services/MessageService.js';

class MessageController {
  constructor() {
    this.messageService = new MessageService();
  }

  // Get messages for a group with pagination
  getGroupMessages = async (req, res) => {
    try {
      const { groupId } = req.params;
      const { page, limit } = req.query;
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

      const options = {};
      if (page) options.page = parseInt(page);
      if (limit) options.limit = parseInt(limit);

      const result = await this.messageService.getGroupMessages(groupId, userEmail, options);

      res.status(200).json({
        success: true,
        message: 'Messages retrieved successfully',
        data: result
      });

    } catch (error) {
      console.error(`Error in getGroupMessages controller: ${error.message}`);
      
      if (error.message.includes('Access denied') || error.message.includes('not a member')) {
        return res.status(403).json({
          success: false,
          message: error.message,
          error: 'ACCESS_DENIED'
        });
      }

      if (error.message.includes('Invalid pagination')) {
        return res.status(400).json({
          success: false,
          message: error.message,
          error: 'VALIDATION_ERROR'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching messages',
        error: 'FETCH_ERROR'
      });
    }
  };

  // Send a message to a group
  sendMessage = async (req, res) => {
    try {
      const { content, groupId, type } = req.body;
      const senderEmail = req.user?.email;

      if (!senderEmail) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'AUTH_REQUIRED'
        });
      }

      const messageData = { content, groupId, type };
      const result = await this.messageService.sendMessage(messageData, senderEmail);

      res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: result
      });

    } catch (error) {
      console.error(`Error in sendMessage controller: ${error.message}`);
      
      if (error.message.includes('Access denied') || error.message.includes('not a member')) {
        return res.status(403).json({
          success: false,
          message: error.message,
          error: 'ACCESS_DENIED'
        });
      }

      if (error.message.includes('required') || 
          error.message.includes('must be') || 
          error.message.includes('cannot exceed')) {
        return res.status(400).json({
          success: false,
          message: error.message,
          error: 'VALIDATION_ERROR'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error while sending message',
        error: 'SEND_ERROR'
      });
    }
  };

  // Get latest message for a group
  getLatestGroupMessage = async (req, res) => {
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

      const result = await this.messageService.getLatestGroupMessage(groupId, userEmail);

      res.status(200).json({
        success: true,
        message: 'Latest message retrieved successfully',
        data: result
      });

    } catch (error) {
      console.error(`Error in getLatestGroupMessage controller: ${error.message}`);
      
      if (error.message.includes('Access denied') || error.message.includes('not a member')) {
        return res.status(403).json({
          success: false,
          message: error.message,
          error: 'ACCESS_DENIED'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error while fetching latest message',
        error: 'FETCH_ERROR'
      });
    }
  };

  // Mark message as read (future feature)
  markMessageAsRead = async (req, res) => {
    try {
      const { messageId } = req.params;
      const userEmail = req.user?.email;

      if (!messageId) {
        return res.status(400).json({
          success: false,
          message: 'Message ID parameter is required',
          error: 'MISSING_MESSAGE_ID'
        });
      }

      if (!userEmail) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'AUTH_REQUIRED'
        });
      }

      const result = await this.messageService.markMessageAsRead(messageId, userEmail);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result
      });

    } catch (error) {
      console.error(`Error in markMessageAsRead controller: ${error.message}`);
      
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
          error: 'MESSAGE_NOT_FOUND'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error while marking message as read',
        error: 'UPDATE_ERROR'
      });
    }
  };

  // Delete a message (future feature)
  deleteMessage = async (req, res) => {
    try {
      const { messageId } = req.params;
      const userEmail = req.user?.email;

      if (!messageId) {
        return res.status(400).json({
          success: false,
          message: 'Message ID parameter is required',
          error: 'MISSING_MESSAGE_ID'
        });
      }

      if (!userEmail) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          error: 'AUTH_REQUIRED'
        });
      }

      const result = await this.messageService.deleteMessage(messageId, userEmail);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result
      });

    } catch (error) {
      console.error(`Error in deleteMessage controller: ${error.message}`);
      
      if (error.message.includes('Access denied')) {
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
          error: 'MESSAGE_NOT_FOUND'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Internal server error while deleting message',
        error: 'DELETE_ERROR'
      });
    }
  };

  // Health check endpoint
  healthCheck = async (req, res) => {
    try {
      res.status(200).json({
        success: true,
        message: 'Message service is healthy',
        data: {
          service: 'MessageService',
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      console.error(`Error in healthCheck controller: ${error.message}`);
      
      res.status(503).json({
        success: false,
        message: 'Message service is unhealthy',
        error: 'SERVICE_UNAVAILABLE'
      });
    }
  };
}

export default MessageController;
