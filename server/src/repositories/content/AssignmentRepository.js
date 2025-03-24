import CrudRepository from '../CrudRepository.js';
import Assignment from '../../models/content/Assignment.js';

export default class AssignmentRepository extends CrudRepository{
    constructor(){
        super(Assignment);
    }

}