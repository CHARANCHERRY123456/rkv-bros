import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
    name : {
        type : String,
        required:true
    },
    parent : {
        type : mongoose.Schema.Types.ObjectId , 
        ref  : "Folder" ,
        default: null
    }
});


const Folder = mongoose.model("Folder", FolderSchema);
export default Folder;

