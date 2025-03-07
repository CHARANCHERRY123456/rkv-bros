import express from 'express';
import StudentController from '../controllers/StudentController.js';

const studentRouter = express.Router();
const studentController = new StudentController();

studentRouter.get("/" , studentController.getAllStudents);
studentRouter.get("/filter" ,studentController.advancedSearch);
studentRouter.get("/:id" , studentController.getSingleStudent);
studentRouter.put("/:id" , studentController.updateStudentWithId);
studentRouter.post("/" , studentController.addStudent);
studentRouter.delete("/:id" , studentController.deleteStudentById);

export default studentRouter;