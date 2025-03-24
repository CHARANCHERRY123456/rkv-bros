import {useQuery} from 'react-query';
import ContentApi from '../../../utils/api.js';

const FolderList = ({parentId , onSelectFolder}) =>{
    const { data: folders, isLoading } = 
    useQuery(["folders", parentId], () =>ContentApi.fetchFolders(parentId));

    if(isLoading) return <p>Loading FOlders</p>;

    return (
        <div>
            {folders.map(folder=>{
                <button
                    key={folder.id}
                    onClick={onSelectFolder}
                    className="block p-2 bg-gray-200 rounded-md m-2"
                >
                    {folder.name}
                </button>
            })}
        </div>
    )
}

export default FolderList;
