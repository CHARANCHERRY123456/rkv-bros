import AssignmentService from '../../services/content/AssignmentService.js';

export default class AssignmentController{
    constructor(){
        this.service = new AssignmentService();
    }

    createAssignment = async (req , res)=>{
        try {
            const assignment = await this.service.createAssignment(req.body);
            return res.status(201).json(assignment);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    getAssignments = async (req , res)=>{
        try {
            const assignments = await this.service.getAssignments(req.query.folder);
            return res.status(200).json(assignments);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    submitResponse = async (req , res)=>{
        try {
            console.log(req.body);
            const assignments = await this.service.submitResponse(req.body);
            return res.status(200).json({message : "Response submitte successfully"});
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}