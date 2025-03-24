import express from "express";
import { getAssignmentsByFolder, submitResponse } from "../../controllers/content/AssignmentController.js";


const router = express.Router();

router.get("/assignment", getAssignmentsByFolder);
router.post("/assignment/submit-response", submitResponse);

export default router;
