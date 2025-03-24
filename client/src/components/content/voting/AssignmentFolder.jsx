import { useQuery } from "react-query";
import ContentApi from "../../../utils/api.js";
import {Link} from 'react-router-dom';


const AssignmentList = ({folderId}) =>{
    const {data : assignments , isLoading} = 
    useQuery(['assignments' , folderId] , 
    ()=> ContentApi.fetchAssignments(folderId)
    );

    if(isLoading) return <p>Loading Assignment....</p>

    return (
        <div>
            {assignments.map(assignment=>(
                <Link 
                    key={assignment.id}
                    to={`/assignment/${assignment._id}`}
                    className="block p-2 bg-blue-200 rounded-md m-2"
                >
                    {assignment.name}
                </Link>
            ))}
        </div>
    );
}

export default AssignmentList;
