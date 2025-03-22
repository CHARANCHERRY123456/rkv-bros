import CrudRepository from "../CrudRepository.js";
import Folder from '../../models/content/Folder.js';
export default class FolderRepository extends CrudRepository {
    constructor(){
        super(Folder);
    }
}