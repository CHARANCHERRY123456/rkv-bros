import StudentService from "../services/StudentService.js";

export default class StudentController {
    constructor() {
        this.service = new StudentService();
    }
    getNames = async (req , res)=>{
        try {
            const names = await this.service.getNames({});
            console.log(names);
            return res.status(200).json(names);
        } catch (error) {
            res.status(400).json({error : error.message});
        }
    }
    getAllStudents = async (req, res) => {
        try {
            console.log("in Get all students");
            const students = await this.service.find(req.query);
            return res.status(200).json(students);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    advancedSearch = async (req, res) => {
        try {
            console.log("advanced search");
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

            const students = await this.service.find(filter);
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
