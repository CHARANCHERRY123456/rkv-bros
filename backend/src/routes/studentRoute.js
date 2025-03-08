import express from 'express';
import StudentController from '../controllers/StudentController.js';

const studentRouter = express.Router();
const studentController = new StudentController();

studentRouter.get("/" , studentController.getAllStudents); // working
studentRouter.get("/filter" ,studentController.advancedSearch); //working
studentRouter.get("/:id" , studentController.getSingleStudent); // working
studentRouter.put("/:id" , studentController.updateStudentWithId); //working
studentRouter.post("/" , studentController.addStudent); //working
studentRouter.delete("/:id" , studentController.deleteStudentById);//working
studentRouter.delete("/" , studentController.deleteStudents); //working

export default studentRouter;