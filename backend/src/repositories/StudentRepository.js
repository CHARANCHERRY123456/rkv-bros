import CrudRepository from "./CrudRepository.js";
import Student from '../models/Student.js';

export default class StudentRepository extends CrudRepository{
    constructor(){
        super(Student);
    }
}
