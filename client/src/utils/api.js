import axios from "axios";
import envVars from '../config/config.js';


//get the folder 
export default class ContentApi{
    constructor(){
      this.CONTENT_API_URL = `${envVars.VITE_BASE_URL}/content`;
    }

    fetchFolders = async (parentId = null)=>{
      const res = await axios.get(`${this.CONTENT_API_URL}/folders` ,
        {
          params : parentId
        }
      );

      return res.data;
    }

    fetchAssignments = async (folderId) =>{
      const res = await axios.get(`${this.CONTENT_API_URL}/assignments` ,
        {
          params : {
            folder : folderId   
          }
        }
      );

      return res.data;
    }

    submitResponse = async (data)=>{
      await axios.post(`${this.CONTENT_API_URL}/submit-response` , data);
    }
}