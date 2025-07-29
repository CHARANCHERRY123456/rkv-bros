import MessageRepository from '../repository/MessageRepository.js';
import GroupRepository from '../repository/GroupRepository.js';

class MessageService {
  constructor() {
    this.messageRepository = new MessageRepository();
    this.groupRepository = new GroupRepository();
  }

  // Get messages for a group with pagination
  async getGroupMessages(groupId, userEmail, options = {}) {
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
        throw new Error('Access denied: User is not a member of this group');
      }

      const { page = 1, limit = 50 } = options;

      // Validate pagination
      if (page < 1 || limit < 1 || limit > 100) {
        throw new Error('Invalid pagination parameters');
      }

      // Get messages
      const messages = await this.messageRepository.findMessagesByGroup(groupId, {
        page,
        limit,
        sortOrder: 1 // Ascending order (oldest first)
      });

      // Get total count for pagination
      const totalMessages = await this.messageRepository.countMessagesByGroup(groupId);
      const totalPages = Math.ceil(totalMessages / limit);

      return {
        messages: messages.map(msg => this._formatMessageResponse(msg)),
        pagination: {
          page,
          limit,
          total: totalMessages,
          pages: totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        },
        groupId
      };

    } catch (error) {
      console.error(`Error in getGroupMessages: ${error.message}`);
      throw error;
    }
  }

  // Send a message to a group
  async sendMessage(messageData, senderEmail) {
    try {
      const { content, groupId, type = 'text' } = messageData;

      // Input validation
      if (!content || typeof content !== 'string' || content.trim().length === 0) {
        throw new Error('Message content is required and must be non-empty');
      }

      if (!groupId) {
        throw new Error('Group ID is required');
      }

      if (!senderEmail) {
        throw new Error('Sender email is required');
      }

      // Validate message length
      if (content.trim().length > 1000) {
        throw new Error('Message content cannot exceed 1000 characters');
      }

      // Check if user is member of the group
      const isMember = await this.groupRepository.isUserMemberOfGroup(groupId, senderEmail);
      if (!isMember) {
        throw new Error('Access denied: User is not a member of this group');
      }

      // Create message
      const messageToCreate = {
        content: content.trim(),
        sender: senderEmail.toLowerCase(),
        groupId,
        type,
        readBy: [senderEmail.toLowerCase()] // Sender has read the message by default
      };

      const newMessage = await this.messageRepository.createMessage(messageToCreate);

      // Update group last activity
      await this.groupRepository.updateLastActivity(groupId, newMessage.createdAt);

      return {
        message: this._formatMessageResponse(newMessage),
        success: true
      };

    } catch (error) {
      console.error(`Error in sendMessage: ${error.message}`);
      throw error;
    }
  }

  // Mark message as read (future feature)
  async markMessageAsRead(messageId, userEmail) {
    try {
      if (!messageId || !userEmail) {
        throw new Error('Message ID and user email are required');
      }

      const message = await this.messageRepository.findById(messageId);
      if (!message) {
        throw new Error('Message not found');
      }

      // Check if user is member of the group
      const isMember = await this.groupRepository.isUserMemberOfGroup(message.groupId, userEmail);
      if (!isMember) {
        throw new Error('Access denied: User is not a member of this group');
      }

      // Add user to readBy array if not already present
      const readBy = message.readBy || [];
      if (!readBy.includes(userEmail.toLowerCase())) {
        readBy.push(userEmail.toLowerCase());
        
        await this.messageRepository.update(messageId, { readBy });
      }

      return {
        messageId,
        readBy,
        message: 'Message marked as read'
      };

    } catch (error) {
      console.error(`Error in markMessageAsRead: ${error.message}`);
      throw error;
    }
  }

  // Get latest message for a group
  async getLatestGroupMessage(groupId, userEmail) {
    try {
      if (!groupId || !userEmail) {
        throw new Error('Group ID and user email are required');
      }

      // Check if user is member of the group
      const isMember = await this.groupRepository.isUserMemberOfGroup(groupId, userEmail);
      if (!isMember) {
        throw new Error('Access denied: User is not a member of this group');
      }

      const latestMessage = await this.messageRepository.getLatestMessageByGroup(groupId);

      return {
        message: latestMessage ? this._formatMessageResponse(latestMessage) : null,
        groupId
      };

    } catch (error) {
      console.error(`Error in getLatestGroupMessage: ${error.message}`);
      throw error;
    }
  }

  // Delete a message (future feature)
  async deleteMessage(messageId, userEmail) {
    try {
      if (!messageId || !userEmail) {
        throw new Error('Message ID and user email are required');
      }

      const message = await this.messageRepository.findById(messageId);
      if (!message) {
        throw new Error('Message not found');
      }

      // Check if user is the sender or has admin rights
      if (message.sender !== userEmail.toLowerCase()) {
        throw new Error('Access denied: You can only delete your own messages');
      }

      await this.messageRepository.delete(messageId);

      return {
        messageId,
        message: 'Message deleted successfully'
      };

    } catch (error) {
      console.error(`Error in deleteMessage: ${error.message}`);
      throw error;
    }
  }

  // Private helper methods
  _formatMessageResponse(message) {
    return {
      id: message._id,
      content: message.content,
      sender: message.sender,
      senderInfo: message.sender || null, // Populated sender info
      groupId: message.groupId,
      type: message.type || 'text',
      createdAt: message.createdAt,
      readBy: message.readBy || [],
      isRead: Array.isArray(message.readBy) && message.readBy.length > 1 // More than just sender
    };
  }
}

export default MessageService;
