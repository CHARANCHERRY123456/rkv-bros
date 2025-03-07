import express from 'express';
import StudentController from '../controllers/StudentController';

const router = express.Router();
const studentController = new StudentController();

router.get("/" , studentController.getAllStudent);
router.get("/filter" ,studentController.advancedSearch);
router.get("/:id" , studentController.getSingleStudent);
router.put("/:id" , studentController.updateStudentWithId);
router.post("/" , studentController.addStudent);
router.delete("/:id" , studentController.deleteStudentById);

export default router;