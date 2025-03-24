import AssignmentRepository from '../../repositories/content/AssignmentRepository.js';

export default class AssignmentService{
    constructor(){
        this.repository = new AssignmentRepository();
    }

    createAssignment = async(data)=>{
        try {
            const assignment =await this.repository.create(data);
            return assignment;
        } catch (error) {
            throw new Error("Error creating Assignment" , error.message);
        }
    }

    getAssignments = async(folderName)=>{
        try {
            const assignment = await this.repository.find({folder:folderName });
            return assignment;
        } catch (error) {
            throw new Error("Error getting assignment" , error.message);
        }
    }
    submitResponse = async (data)=>{
        try {
            const { assignmentId, questionIndex, selectedOption } = data;
            const assignment = await this.repository.findById(assignmentId);
            if(!assignment) throw new Error("Assignment not found");

            const question = assignment.questions[questionIndex];
            if(!question) throw new Error("Question not found");

            const responseIndex = question.responses.findIndex(r => r.optionIndex === selectedOption);
            if(responseIndex !== -1){
                question.response[responseIndex].count += 1;
            }else{
                question.responses.push({
                    optionIndex : selectedOption,
                    count : 1
                });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }   


}