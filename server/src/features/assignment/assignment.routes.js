import express from 'express';
import * as assignmentController from './assignment.controller.js';
import { validate } from '../../middlewares/validate.js';
import * as schemas from './assignment.validation.js';

const router = express.Router();

// CREATE - Add new assignment (Admin only)
router.post(
  '/',
  validate(schemas.createAssignmentSchema),
  assignmentController.createAssignment
);

// READ - Get all assignments
router.get('/', assignmentController.getAllAssignments);

// READ - Get specific assignment
router.get(
  '/:assignmentName',
  validate(schemas.getAssignmentSchema),
  assignmentController.getAssignmentByName
);

// UPDATE - Submit vote (toggle vote)
router.post(
  '/:assignmentName/vote',
  validate(schemas.submitVoteSchema),
  assignmentController.submitVote
);

// UPDATE - Reset all votes
router.put(
  '/:assignmentName/reset-votes',
  validate(schemas.resetVotesSchema),
  assignmentController.resetVotes
);

// UPDATE - Modify assignment (Admin only)
router.put(
  '/:assignmentName',
  validate(schemas.updateAssignmentSchema),
  assignmentController.updateAssignment
);

// DELETE - Remove assignment (Admin only)
router.delete(
  '/:assignmentName',
  validate(schemas.deleteAssignmentSchema),
  assignmentController.deleteAssignment
);

export default router;
