import StudentRepository from '../repositories/StudentRepository.js'
export default class StudentService{
    constructor(){
        this.repository = new StudentRepository();
    }
    create = async (data) => {
        try {
          return await this.repository.create(data); 
        } catch (error) {
          throw Error(`Error while creating Student :${error.message} `);
        }
      };


    find = async (data)=>{
        try {
            return this.repository.find(data);
        } catch (error) {
          throw Error(`Error while Finding Students :${error.message} `);
        }
    }

    findOne = async (data)=>{
        try {
            return this.repository.findOne(data);
        } catch (error) {
          throw Error(`Error while Finding Student :${error.message} `);
        }
    }

    findById =async (id)=>{
        try {
            return await this.repository.findById(id);
        } catch (error) {
            throw Error(`Error while finding student by id : ${error.message}`);
        }
    }

    findByIdAndUpdate = async(id , data)=>{
        try {
            return await this.repository.findByIdAndUpdate(id , data);
        } catch (error) {
            throw Error(`Error while finding and updating student by id  : ${error.message}`);
        }
    }
    
    findByIdAndDelete =async (id) => {
        try {
            return await this.repository.findByIdAndDelete(id);
        } catch (error) {
            throw Error(`Error while finding and deleting student by id  : ${error.message}`);
        }
    }
    deleteOne = async(data)=>{
        try {
            return await this.repository.delete(data);
        } catch (error) {
            throw Error(`Error while deleting student by given data : ${error.message}`);
        }
    }
    deleteMany = async(data)=>{
        try {
            return await this.repository.delete(data);
        } catch (error) {
            throw Error(`Error while deleting student by given data : ${error.message}`);
        }
    }
    searchStudents = async (searchQuery)=>{
        try {
            if(!searchQuery) return [];
            return await this.repository.findStudents(searchQuery);
        } catch (error) {
            console.log(`Erroer searching students ${error.message}`);
        }
    }
}