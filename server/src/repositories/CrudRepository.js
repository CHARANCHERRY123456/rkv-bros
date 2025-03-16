// use this class and easily implement any crud without actually reapeating
export default class CrudRepository {
    constructor(model) {
      this.model = model;
    }
  
    create = async (data) => {
      try {
        const doc = await this.model.create(data);
        return doc;
      } catch (error) {
        throw Error(`Error while creating document: ${error.message}`);
      }
    }
  
    findOne = async (query) => {
      try {
        const doc = await this.model.findOne(query);
        return doc;
      } catch (error) {
        throw Error(`Error while finding document: ${error.message}`);
      }
    }
  
    findById = async (id) => {
      try {
        const doc = await this.model.findById(id);
        return doc;
      } catch (error) {
        throw Error(`Error while finding  document by Id: ${error.message}`);
      }
    }
  
    find = async (query) => {
      try {
        const docs = await this.model.find(query);
        return docs;
      } catch (error) {
        throw Error(`Error while finding documents: ${error.message}`);
      }
    }
  
    findByIdAndUpdate = async (id, data) => {
      try {
        const doc = await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        return doc;
      } catch (error) {
        throw Error(`Error while updating document: ${error.message}`);
      }
    };    
  
    findByIdAndDelete = async (id) => {
      try {
        const doc = await this.model.findByIdAndDelete(id);
        return doc;
      } catch (error) {
        throw Error(`Error while deleting document: ${error.message}`);
      }
    }


    delete = async (query) => {
      try {
        const doc = await this.model.deleteOne(query);
        return doc;
      } catch (error) {
        throw Error(`Error while deleting the document: ${error.message}`);
      }
    };
    deleteMany = async (quer)=>{
      try {
        const doc = await this.model.deleteMany(quer);
        return doc;
      } catch (error) {
        throw Error(`Error while deleting many docs ${error.message}`);
      }
    }
  }