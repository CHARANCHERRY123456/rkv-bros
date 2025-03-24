import AssignmentController from '../../controllers/content/AssignmentController.js';


import express from 'express';

const assignmenrRouter = express.Router();
const assignment = new AssignmentController();

assignmenrRouter.post("/" , assignment.createAssignment);
assignmenrRouter.get("/" , assignment.getAssignments);
assignmenrRouter.post("/submit-response" , assignment.submitResponse);


export default assignmenrRouter;
