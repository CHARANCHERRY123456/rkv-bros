import CrudRepository from "./CrudRepository.js";
import Student from '../models/Student.js';

export default class StudentRepository extends CrudRepository{
    constructor(){
        super(Student);
    }
    
    // Text search using MongoDB text index (faster than $regex)
    findStudents = async (searchQuery) => {
        try {
            return await Student.find({
                $text: { $search: searchQuery }
            });
        } catch (error) {
            throw new Error(`Error finding student: ${error.message}`);
        }
    }
}
