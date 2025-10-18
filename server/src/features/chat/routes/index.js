import express from 'express';
import GroupController from '../controllers/GroupController.js';
import MessageController from '../controllers/MessageController.js';
import authMiddleware from '../../../middlewares/authMiddleware.js';
import { validate } from '../../../middlewares/validate.js';
import {
  getUserGroupsSchema,
  createGroupSchema,
  getGroupDetailsSchema,
  updateGroupActivitySchema,
  addMembersToGroupSchema
} from '../validation/group.validation.js';

const router = express.Router();

const groupController = new GroupController();
const messageController = new MessageController();

router.get('/groups/:email', validate(getUserGroupsSchema), groupController.getUserGroups);
router.post('/groups', authMiddleware, validate(createGroupSchema), groupController.createGroup);

router.get('/groups/:groupId/details', authMiddleware, validate(getGroupDetailsSchema), groupController.getGroupDetails);
router.put('/groups/:groupId/activity', authMiddleware, validate(updateGroupActivitySchema), groupController.updateGroupActivity);
router.post('/groups/:groupId/members', authMiddleware, validate(addMembersToGroupSchema), groupController.addMembersToGroup);

router.get('/groups/:groupId/messages', authMiddleware, messageController.getGroupMessages);
router.post('/messages', authMiddleware, messageController.sendMessage);
router.get('/groups/:groupId/messages/latest', authMiddleware, messageController.getLatestGroupMessage);
router.put('/messages/:messageId/read', authMiddleware, messageController.markMessageAsRead);
router.delete('/messages/:messageId', authMiddleware, messageController.deleteMessage);

router.get('/groups/health', groupController.healthCheck);
router.get('/messages/health', messageController.healthCheck);

export default router;
