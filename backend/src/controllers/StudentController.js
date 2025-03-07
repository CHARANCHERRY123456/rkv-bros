import StudentService from "../services/StudentService.js";

export default class StudentController {
    constructor() {
        this.service = new StudentService();
    }

    getAllStudents = async (req, res) => {
        try {
            const students = await this.service.getAllStudents(req.query);
            res.status(200).json(students);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    advancedSearch = async (req, res) => {
        try {
            const filter = {};
            // Extract queries and add them to the filter
            for (let key in req.query) {
                if (req.query[key]) {
                    filter[key] = {
                        $regex: req.query[key],
                        $options: 'i' // Case-insensitive search
                    };
                }
            }

            const students = await this.service.getAllStudents(filter);
            res.status(200).json(students);

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    getSingleStudent = async (req, res) => {
        try {
            const student = await this.service.findById(req.params.id); 
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
            const studentData = {
                ...req.body,
                createdBy: req.user.id
            };
            const student = await this.service.create(studentData);
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
}
