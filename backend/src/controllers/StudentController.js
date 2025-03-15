import StudentService from "../services/StudentService.js";

export default class StudentController {
    constructor() {
        this.service = new StudentService();
    }

    getAllStudents = async (req, res) => {
        try {
            const students = await this.service.find(req.query);
            return res.status(200).json(students);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    advancedSearch = async (req, res) => {
        try {
            console.log("advanced search");
            const searchQuery = req.query.q;
            const students = await this.service.searchStudents(searchQuery);
            res.status(200).json(students);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getSingleStudent = async (req, res) => {
        try {
            console.log(req.params , "in the get SIngle student");
            const student = await this.service.findOne({"name" : req.params.sid});
            console.log(student , " is sending");
            return res.status(200).json(student);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    updateStudentWithId = async (req, res) => {
        try {
            const student = await this.service.findByIdAndUpdate(req.params.id, req.body);
            return res.status(200).json(student);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    addStudent = async (req, res) => {
        try {
            console.log(req.body);
            const student = await this.service.create(req.body);
            return res.status(201).json(student);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };

    deleteStudentById = async (req, res) => {
        try {
            const student = await this.service.findByIdAndDelete(req.params.id);
            return res.status(200).json(student);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    deleteStudents = async (req , res)=>{
        try {
            console.log("deleting the student " , req.body);
            const student = await this.service.deleteMany(req.body);
            return res.status(204).json(student);
        } catch (error) {
            throw Error(`Error deleting student ${error.message}`);
        }
    }
}
