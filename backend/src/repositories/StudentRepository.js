import CrudRepository from "./CrudRepository.js";
import Student from '../models/Student.js';

export default class StudentRepository extends CrudRepository{
    constructor(){
        super(Student);
    }
    findStudents = async (searchQuery)=>{
        try {
            return await Student.find({
                $or: [
                    { name: { $regex: searchQuery, $options: "i" } },
                    { sid: { $regex: searchQuery, $options: "i" } },
                    { batch: { $regex: searchQuery, $options: "i" } },
                    { phone: { $regex: searchQuery, $options: "i" } },
                ],
            })
        } catch (error) {
            console.error(`Error findign student : ${error.message}`);
        }
    }

}
