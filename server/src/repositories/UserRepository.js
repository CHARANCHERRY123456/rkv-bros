import CrudRepository from "./CrudRepository.js";
import User from "../models/User.js";
export default class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }
    createUser = async (data) => {
        try {
            const user = new User(data);
            return await user.save();
        } catch (error) {
            console.error(`Error Creating student : ${error.message}`);

        }
    };
    
    


}
















