import FolderService from '../../services/content/FolderService.js'

export default class FolderController{
    constructor(){
        this.service = new FolderService();
    }

    createFolder = async(req , res)=>{
        try {
            const folder = await this.service.create(req.body);
            res.status(201).json(folder);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message : error.message});
        }
    }

    getFolders = async(req , res)=>{
        try {
            const folders = await this.service.find(req.query);
            return res.status(200).json(folders);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}