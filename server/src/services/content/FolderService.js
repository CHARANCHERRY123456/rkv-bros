import FolderRepository from '../../repositories/content/FolderRepository.js';

export default class FolderService{
    constructor(){
        this.repository = new FolderRepository();
    }
    create = async (data) => {
        try {
          return await this.repository.create(data); 
        } catch (error) {
          throw Error(`Error while creating Folder :${error.message} `);
        }
      };


    find = async (data)=>{
        try {
            return this.repository.find({parent : data.parent || null});
        } catch (error) {
          throw Error(`Error while Finding Folder :${error.message} `);
        }
    }

    findOne = async (data)=>{
        try {
            return this.repository.findOne(data);
        } catch (error) {
          throw Error(`Error while Finding Folder :${error.message} `);
        }
    }

    findById =async (id)=>{
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw Error(`Error while finding Folder by id : ${error.message}`);
        }
    }

    findByIdAndUpdate = async(id , data)=>{
        try {
            return await this.repository.findByIdAndUpdate(id , data);
        } catch (error) {
            throw Error(`Error while finding and updating folder by id  : ${error.message}`);
        }
    }
    
    findByIdAndDelete =async (id) => {
        try {
            return await this.repository.findByIdAndDelete(id);
        } catch (error) {
            throw Error(`Error while finding and deleting Folder by id  : ${error.message}`);
        }
    }
    deleteOne = async(data)=>{
        try {
            return await this.repository.delete(data);
        } catch (error) {
            throw Error(`Error while deleting Folder by given data : ${error.message}`);
        }
    }
    deleteMany = async(data)=>{
        try {
            return await this.repository.delete(data);
        } catch (error) {
            throw Error(`Error while deleting Folder by given data : ${error.message}`);
        }
    }


}