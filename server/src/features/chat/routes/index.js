import express from 'express';
import GroupController from '../controllers/GroupController.js';
import MessageController from '../controllers/MessageController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';

const router = express.Router();

const groupController = new GroupController();
const messageController = new MessageController();

router.get('/groups/:email', groupController.getUserGroups);
router.post('/groups', authMiddleware, groupController.createGroup);
router.get('/groups/:groupId/details', authMiddleware, groupController.getGroupDetails);
router.put('/groups/:groupId/activity', authMiddleware, groupController.updateGroupActivity);
router.post('/groups/:groupId/members', authMiddleware, groupController.addMembersToGroup);

router.get('/groups/:groupId/messages', authMiddleware, messageController.getGroupMessages);
router.post('/messages', authMiddleware, messageController.sendMessage);
router.get('/groups/:groupId/messages/latest', authMiddleware, messageController.getLatestGroupMessage);
router.put('/messages/:messageId/read', authMiddleware, messageController.markMessageAsRead);
router.delete('/messages/:messageId', authMiddleware, messageController.deleteMessage);

router.get('/groups/health', groupController.healthCheck);
router.get('/messages/health', messageController.healthCheck);

// Legacy support routes (for backward compatibility)
router.get('/group/:email', groupController.getUserGroups);
router.post('/group', authMiddleware, groupController.createGroup);
router.get('/messages/:groupId', authMiddleware, messageController.getGroupMessages);

export default router;
