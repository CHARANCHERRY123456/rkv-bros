import express from 'express';
import folderController from '../../controllers/content/FolderController.js';

const folderRouter = express.Router();

const folder = new folderController();

folderRouter.post("/" , folder.createFolder);
folderRouter.get("/" , folder.getFolders);

export default folderRouter;